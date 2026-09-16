/** Find an element by its unique HTML id. */
const byId = id => document.getElementById(id);

/** Find all elements matching a CSS selector. */
const elements = selector => document.querySelectorAll(selector);

/** Reuse the same table plans and number keys on every screen. */
const mountTemplates = () => {
    elements("[data-map-panel]").forEach(panel => {
        panel.append(byId(panel.dataset.mapPanel + "-map").content.cloneNode(true));
        if (panel.closest(".table-desktop")) {
            panel.querySelector(".garden-tables")?.classList.replace("garden-tables", "garden-desktop");
        }
    });
    elements(".cash-keypad").forEach(keypad => {
        keypad.append(byId("amount-keypad").content.cloneNode(true));
    });
    elements(".table-preview>.top,.table-desktop>.top").forEach(top => {
        top.after(byId("move-bars").content.cloneNode(true));
    });
};

/** All draft orders and payments belong to this local prototype session. */
const previewTables = new Map([["14", {
    orders: [{
        name: "Cola 0.5",
        itemName: "Cola",
        catalogName: "Cola",
        choiceIndex: 1,
        chinese: "可乐",
        quantity: 2,
        sent: 0,
        price: 450
    }, {
        name: "Villacher 0.5",
        itemName: "Villacher",
        catalogName: "Villacher",
        choiceIndex: 1,
        chinese: "生啤酒",
        quantity: 1,
        sent: 0,
        price: 500
    }],
    buffet: {
        sunday: [2, 1, 0],
        lunch: [0, 0, 0],
        dinner: [0, 0, 0],
        holiday: [0, 0, 0]
    }
}]]);
const buffetPeople = [["Erwachsene", "成人"], ["6–9", "儿童"], ["3–5", "小童"]];
const buffetPeriods = {
    sunday: ["Sonntagsbuffet", "周日自助餐"],
    lunch: ["Mittagsbuffet", "午餐自助"],
    dinner: ["Abendbuffet", "晚餐自助"],
    holiday: ["Feiertagsbuffet", "节假日自助餐"]
};
const undoRemovals = [];
const selectedGroups = {
    drinks: 0,
    food: 0
};
let activeTable = "14";
let selectedItem = colaFlavors[0];
let selectedKind = "drinks";
let colaOpen = true;
let lastVariantBooking = null;
let catalogScrollTop = 0;

/** The table being moved and, once a target is tapped, the table named in the confirmation. */
let moveSource = null;
let moveTarget = null;

/** The chef URL selects a design preview, not a real authorization mechanism. */
const previewParameters = new URLSearchParams(location.search);
const previewMode = previewParameters.get("uebersicht") !== "1";
const chefPreview = previewParameters.get("chef") === "1";
const variantDialog = byId("variant-dialog");
const cashDialog = byId("cash-dialog");
const cashGiven = byId("cash-given");
const cashTarget = byId("cash-target");
let cashActiveInput = cashTarget;
const voucherDialog = byId("voucher-dialog");
const voucherAmount = byId("voucher-amount");
const moveDialog = byId("move-dialog");

/** The voucher belongs only to the current checkout, until that preview receipt is completed. */
let voucherValue = 0;

/** Checkout snapshots point back to the actual table lines and buffet counters. */
let invoiceItems = [];
let splitSelection = [];
let checkoutSelection = [];
let checkoutTable = null;
let invoiceDirty = true;

/** Existing sample receipts and newly completed preview receipts share the same read-only list. */
const todayReceipts = [{
    table: "14",
    time: "21:12",
    total: 6670,
    method: "card"
}, {
    table: "4",
    time: "21:05",
    total: 11860,
    method: "cash"
}, {
    table: "22",
    time: "20:58",
    total: 3520,
    method: "card"
}, {
    table: "9",
    time: "20:51",
    total: 5240,
    method: "cash"
}, {
    table: "2",
    time: "20:44",
    total: 9180,
    method: "card"
}, {
    table: "17",
    time: "20:37",
    total: 2390,
    method: "cash"
}];

/** A table without orders; every buffet tariff starts at zero. */
const emptyTable = () => ({
    buffetPeriod: "sunday",
    orders: [],
    buffet: {
        sunday: [0, 0, 0],
        lunch: [0, 0, 0],
        dinner: [0, 0, 0],
        holiday: [0, 0, 0]
    }
});

/** Return the current table's isolated preview state. */
const currentTable = () => previewTables.get(activeTable);

/** Track the order of unsent additions so a quick correction removes the latest matching serving. */
const pendingAdds = () => {
    const table = currentTable();
    return table.pendingAdds ||= table.orders.flatMap(line => Array(Math.max(0, line.quantity - line.sent)).fill(line));
};

/** Format integer cents with the user's decimal point and euro sign. */
const money = cents => Math.floor(cents / 100) + "." + String(cents % 100).padStart(2, "0") + "\u00a0€";

/** German or Chinese name of a table; the take-away tile has no number. */
const tableName = (number, chinese = false) => number === "M" ? (chinese ? "外带" : "Mitnehmen") : chinese ? number + "号桌" : "Tisch " + number;

/** Count actual items without treating zero-quantity undo entries as occupied. */
const hasTableItems = state => Boolean(state && (state.orders.some(line => line.quantity > 0) || Object.values(state.buffet).flat().some(quantity => quantity > 0)));

/** The group overview is only a list; the title and back arrow belong to a selected group. */
const showGroups = (kind, open) => {
    const name = menus[kind][selectedGroups[kind]][0];
    const heading = byId(kind + "-group-name");
    heading.innerHTML = name + " <small lang=\"zh-Hans\">" + groupChinese[name] + "</small>";
    heading.closest(".menu-heading").hidden = open;
    byId(kind + "-groups").hidden = !open;
    byId(kind + "-items").hidden = open;
    byId("catalog-scroll").scrollTop = 0;
};

/** Render group rows and bilingual article tiles without fixing their text height. */
const renderMenu = (kind, group = 0) => {
    selectedGroups[kind] = group;
    byId(kind + "-groups").innerHTML = menus[kind].map(([name], index) => `
        <button class="taste"
            type="button"
            data-menu="${kind}"
            data-group="${index}"><span class="de">${name}</span><span class="zh" lang="zh-Hans">${groupChinese[name]}</span><img class="group-icon"
            src="../icons/wokflow/${groupIcons[name]}.svg?v=13"
            alt=""
            width="32"
            height="32"></button>
    `).join("");
    byId(kind + "-items").innerHTML = menus[kind][group][1].map(([name, chinese, key], index) => {
        const hasOptions = key === "cola" || variants[key]?.length > 1;
        const portion = articlePortions[name];
        const isSushiSet = portion?.includes("Sushi");
        const portionLabel = isSushiSet ? portion.replace("Sushi", "Sushi <span lang=\"zh-Hans\">寿司</span>").replace("Maki", "Maki <span lang=\"zh-Hans\">卷</span>") : "(" + portion + ")";
        return `
            <div class="article-tile">
                <button class="taste${hasOptions ? " has-options" : ""}"
                    type="button"${hasOptions ? " aria-haspopup=\"dialog\"" : ""}
                    data-item-kind="${kind}"
                    data-item-group="${group}"
                    data-item="${index}"><span class="de">${articleLabels[name] || name}</span><span class="zh" lang="zh-Hans">${articleChineseLabels[name] || chinese}</span>${portion ? `<small class="portion${isSushiSet ? " set-portion" : ""}">${portionLabel}</small>` : ""}</button>
                <button class="item-count${hasOptions ? " is-summary" : ""}"
                    type="button"
                    data-reduce-kind="${kind}"
                    data-reduce-group="${group}"
                    data-reduce-item="${index}" hidden><span
                    aria-hidden="true"></span></button>
            </div>
        `;
    }).join("");
    showGroups(kind, false);
    renderItemCounts();
};

/** Update quantities in place, so each tap gives immediate feedback without an animation or scroll reset. */
const renderItemCounts = () => {
    elements("[data-item]").forEach(button => {
        const item = menus[button.dataset.itemKind][Number(button.dataset.itemGroup)][1][Number(button.dataset.item)];
        const quantity = currentTable().orders.reduce((sum, line) => sum + (line.catalogName === item[0] ? line.quantity : 0), 0);
        const badge = button.parentElement.querySelector(".item-count");
        const hasOptions = button.classList.contains("has-options");
        const canReduce = !hasOptions && currentTable().orders.some(line => line.catalogName === item[0] && line.quantity > line.sent);
        badge.hidden = quantity === 0;
        badge.firstElementChild.textContent = String(quantity);
        badge.disabled = !canReduce;
        badge.setAttribute("aria-label", item[0] + ": " + quantity + " bestellt" + (hasOptions ? ", Ausführung im Menü ändern" : canReduce ? ", letzte neue Portion zurücknehmen · 撤销一份" : ", keine neue Portion · 无待发送餐品"));
        button.setAttribute("aria-label", item[0] + " " + item[1] + (articlePortions[item[0]] ? ", " + articlePortions[item[0]] : "") + (quantity ? ", " + quantity + " bestellt" : ""));
    });
};

/** Switch the selected catalog section without submitting or changing the order view. */
const showSection = kind => {
    elements("[data-section]").forEach(button => {
        const selected = button.dataset.section === kind;
        button.classList.toggle("on", selected);
        button.setAttribute("aria-selected", String(selected));
    });
    elements(".order-panel").forEach(panel => panel.hidden = panel.id !== kind + "-panel");
    byId("catalog-scroll").scrollTop = 0;
    if (kind === "food" || kind === "drinks") {
        showGroups(kind, true);
    }
};

/** Keep the full catalog and the full order in separate tabs, preserving the catalog position. */
const showOrderView = view => {
    const scroll = byId("catalog-scroll");
    if (!byId("catalog-view").hidden) {
        catalogScrollTop = scroll.scrollTop;
    }
    elements("[data-order-view]").forEach(button => {
        const selected = button.dataset.orderView === view;
        button.classList.toggle("on", selected);
        button.setAttribute("aria-selected", String(selected));
    });
    byId("catalog-view").hidden = view !== "catalog";
    byId("ordered-view").hidden = view !== "ordered";
    byId("invoice-action").hidden = view !== "ordered";
    byId("undo-bar").hidden = view !== "ordered" || undoRemovals.length === 0;
    if (view === "catalog") {
        scroll.scrollTop = catalogScrollTop;
    } else {
        fitOrderLabels();
    }
};

/** Render the counters of the table's buffet tariff and mark that tariff in the list. */
const renderBuffets = () => {
    const table = currentTable();
    const period = table.buffetPeriod || "sunday";
    byId("period-name").innerHTML = buffetPeriods[period][0] + " <span lang=\"zh-Hans\">" + buffetPeriods[period][1] + "</span>";
    byId("period-time").textContent = document.querySelector("[data-period=\"" + period + "\"] time").textContent;
    elements("[data-period]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.period === period)));
    const container = byId("buffet-counters");
    container.dataset.buffet = period;
    container.innerHTML = buffetPeople.map(([name, chinese], index) => {
        const quantity = table.buffet[period][index];
        return `
            <div class="counter-row">
                <div class="counter-label">
                    ${name}<small lang="zh-Hans">${chinese}</small>
                </div>
                <button class="step-button"
                    type="button"
                    data-buffet-person="${index}"
                    data-change="-1"
                    aria-label="${name} verringern"${quantity === 0 ? " disabled" : ""}>−</button>
                <output aria-label="Personen">${quantity}</output>
                <button class="step-button"
                    type="button"
                    data-buffet-person="${index}"
                    data-change="1"
                    aria-label="${name} erhöhen">+</button>
            </div>
        `;
    }).join("");
    renderOrder();
};

/** One buffet tariff per table: choosing another moves every counted person to it. */
const setBuffetPeriod = period => {
    const table = currentTable();
    Object.keys(table.buffet).forEach(other => {
        if (other !== period) {
            table.buffet[other].forEach((count, index) => table.buffet[period][index] += count);
            table.buffet[other].fill(0);
        }
    });
    table.buffetPeriod = period;
    undoRemovals.length = 0;
    byId("period-choice").open = false;
    renderBuffets();
};

/** Keep sizes and compact preparation labels visible when the order list displays Chinese alone. */
const chineseOrderLabel = line => {
    const item = colaFlavors.find(item => item[0] === line.itemName) || Object.values(menus).flatMap(groups => groups.flatMap(group => group[1])).find(item => item[0] === line.itemName);
    if (!item || !line.chinese.startsWith(item[1])) {
        return line.chinese;
    }
    const choice = variants[item[2]]?.[line.choiceIndex] || [];
    const size = choice[0] === "Flasche" ? choice[1] : /^\d/.test(choice[0] || "") ? choice[0].replace(" Stück", "个") : "";
    const detail = line.chinese.slice(item[1].length).trim().replace(/(^|\s)加(苏打水|水|柠檬)(?=\s|$)/g, "$1+ $2");
    return [item[1], size, detail].filter(Boolean).join(" ");
};

/** Short buffet names for the order list; adult labels remain at the ordering counters. */
const buffetOrderLabel = (period, person, language) => buffetPeriods[period][language] + (person ? " (" + buffetPeople[person][0] + ")" : "");

/** Keep service names concise and identifiable; recorded article names stay complete. */
const serviceLabel = name => name
    .replaceAll("+ Zitrone", "+ Zit")
    .replace(/Flasche (\d+(?:\.\d+)?)/g, "$1 Fl.")
    .replaceAll("Hühnerfleisch", "Huhn")
    .replaceAll("Rindfleisch", "Rind")
    .replaceAll("Schweinefleisch", "Schwein")
    .replace("Gebratener Reis mit", "Reis mit")
    .replace("Gebratene Nudeln mit", "Nudeln mit");

/** Fit each visible order label to its own available width without truncating the text. */
const fitOrderLabels = () => {
    const labels = [...elements("#ordered-view .ordered-label>span")].filter(label => label.getClientRects().length);
    labels.forEach(label => label.style.fontSize = "20px");
    const sizes = labels.map(label => {
        const range = document.createRange();
        range.selectNodeContents(label);
        return Math.min(20, Math.floor(200 * label.getBoundingClientRect().width / Math.max(1, range.getBoundingClientRect().width)) / 10);
    });
    labels.forEach((label, index) => label.style.fontSize = sizes[index] + "px");
};

/** Keep the order list, invoice action and payment steps in the same selected language. */
const setLanguage = language => {
    const german = language === "de";
    document.body.dataset.checkoutLanguage = language;
    byId("ordered-view").dataset.language = language;

    elements("[data-order-language],[data-payment-language]").forEach(button => {
        const key = button.hasAttribute("data-order-language") ? "orderLanguage" : "paymentLanguage";
        button.dataset[key] = german ? "zh" : "de";
        button.textContent = german ? "DE" : "CN";
        button.setAttribute("aria-label", german ? "Sprache wechseln: 中文" : "切换语言：Deutsch");
    });
    fitOrderLabels();
};

/** Render every ordered item without repeating the active tab's title or item count. */
const renderOrder = () => {
    const lines = currentTable().orders.map((line, index) => line.quantity === 0 ? "" : `
        <div class="z">
            <b>${line.quantity}</b>
            <div class="ordered-label">
                <span class="de">${serviceLabel(line.name)}</span><span class="zh" lang="zh-Hans">${chineseOrderLabel(line)}</span>
            </div>
            <button class="step-button"
                type="button"
                data-remove="${index}"
                aria-label="Einmal ${line.name} entfernen">−</button>
        </div>
    `).join("");
    const buffets = Object.entries(currentTable().buffet).map(([period, counts]) => counts.map((quantity, index) => {
        if (!quantity) {
            return "";
        }
        const name = buffetOrderLabel(period, index, 0);
        return `
            <div class="z" data-buffet="${period}">
                <b>${quantity}</b>
                <div class="ordered-label">
                    <span class="de">${name}</span><span class="zh" lang="zh-Hans">${buffetOrderLabel(period, index, 1)}</span>
                </div>
                <button class="step-button"
                    type="button"
                    data-buffet-person="${index}"
                    data-change="-1"
                    aria-label="${name} verringern">−</button>
            </div>
        `;
    }).join("")).join("");
    byId("order-lines").innerHTML = lines || (buffets ? "" : "<p class=\"empty\"><span lang=\"de\">Noch nichts bestellt</span><span lang=\"zh-Hans\">尚未点单</span></p>");
    byId("ordered-buffets").innerHTML = buffets;
    byId("move-table").disabled = !hasTableItems(currentTable());
    renderUndo();
    renderItemCounts();
    fitOrderLabels();
    invoiceDirty = true;
};

/** Offer undo for order-list cancellations and already-sent portions corrected in the dialog. */
const renderUndo = () => {
    const last = undoRemovals.at(-1);
    const message = last ? "<span lang=\"de\">" + serviceLabel(last.line.name) + "</span><small lang=\"zh-Hans\">" + chineseOrderLabel(last.line) + "</small>" : "";
    byId("undo-bar").hidden = !last || byId("ordered-view").hidden;
    byId("undo-message").innerHTML = message;
    byId("variant-undo").hidden = !last || last.wasPending !== false || last.line.itemName !== selectedItem[0];
    byId("variant-undo-message").innerHTML = message;
};

/** Book one concrete serving at its menu price and group its tile feedback by article family. */
const addItem = (item, choice = [], lemon = false) => {
    const pending = pendingAdds();
    const choiceIndex = Math.max(0, (variants[item[2]] || []).indexOf(choice));
    const price = priceFor(item, choiceIndex, lemon);
    const name = [item[0], choice[0], choice[1], lemon ? "+ Zitrone" : ""].filter(Boolean).join(" ");
    const chinese = [item[1], choice[2], lemon ? "加柠檬" : ""].filter(Boolean).join(" ");
    const catalogName = colaFlavors.some(flavor => flavor[0] === item[0]) ? "Cola" : item[0];
    let line = currentTable().orders.find(line => line.name === name && line.price === price);
    if (line) {
        line.quantity++;
    } else {
        line = {
            name,
            itemName: item[0],
            catalogName,
            choiceIndex,
            chinese,
            quantity: 1,
            sent: 0,
            price
        };
        currentTable().orders.push(line);
    }
    pending.push(line);
    renderOrder();
    return line;
};

/** Correct quantities and offer undo only for removals from the order list. */
const removeOrderItem = (line, allowUndo = true) => {
    if (!line || line.quantity <= 0) {
        return;
    }
    if (lastVariantBooking?.line === line) {
        lastVariantBooking = null;
    }
    const pending = pendingAdds();
    const wasPending = line.quantity > line.sent;
    const pendingIndex = wasPending ? pending.lastIndexOf(line) : -1;
    if (pendingIndex >= 0) {
        pending.splice(pendingIndex, 1);
    }
    line.quantity--;
    if (!wasPending) {
        line.sent--;
    }
    if (allowUndo) {
        undoRemovals.push({
            line,
            wasPending,
            pendingIndex
        });
    }
    renderOrder();
};

/** Allow lemon only for the last serving added in this dialog and still waiting to be sent. */
const canAddLemon = () => Boolean(
    lastVariantBooking
    && lastVariantBooking.table === activeTable
    && selectedKind === "drinks"
    && selectedItem[2] !== "soda"
    && lastVariantBooking.item[0] === selectedItem[0]
    && lastVariantBooking.line.quantity > lastVariantBooking.line.sent
    && pendingAdds().at(-1) === lastVariantBooking.line
    && currentTable().orders.includes(lastVariantBooking.line)
);

/** Show flavor tabs when appropriate, followed by aligned size and preparation rows. */
const renderVariants = (resetLastBooking = true) => {
    if (resetLastBooking) {
        lastVariantBooking = null;
    }
    const title = colaOpen ? colaFlavors[0] : selectedItem;
    byId("variant-title").innerHTML = title[0] + " <span lang=\"zh-Hans\">" + title[1] + "</span>";
    const flavors = byId("cola-flavors");
    flavors.hidden = !colaOpen;
    flavors.innerHTML = colaOpen ? colaFlavors.map((flavor, index) => `
        <button
            type="button"
            data-cola-flavor="${index}"
            aria-pressed="${flavor[0] === selectedItem[0]}">${["Cola", "Zero", "Light"][index]}<small lang="zh-Hans">${flavor[1]}</small></button>
    `).join("") : "";
    const rows = [];
    (variants[selectedItem[2]] || []).forEach(([size, extra, chinese], index) => {
        const bottle = size === "Flasche";
        const key = bottle ? "bottle" : extra || "";
        if (rows.at(-1)?.key !== key) {
            rows.push({
                key,
                buttons: []
            });
        }
        const top = bottle ? size + " " + extra : size;
        const detail = bottle ? "" : (extra || "").replace(/^\+\s*/, "");
        const translated = chinese === "加水" ? "水" : chinese === "加苏打水" ? "苏打水" : chinese;
        const quantity = currentTable().orders.reduce((sum, line) => sum + (line.itemName === selectedItem[0] && line.choiceIndex === index ? line.quantity : 0), 0);
        const label = [selectedItem[0], size, extra].filter(Boolean).join(" ");
        rows.at(-1).buttons.push(`
            <div class="variant-option">
                <button class="o${bottle ? " bottle-choice" : /\p{L}/u.test(top) ? " word-choice" : ""}"
                    type="button"
                    data-variant="${index}"
                    aria-label="${label}${quantity ? ", " + quantity + " bestellt" : ""}"><span class="m${/^[0-9]/.test(top) ? "" : " words"}">${bottle ? `<span class="bottle-label">${top}</span>` : top}</span>${detail || translated ? `<small>${detail}${translated ? ` <span lang="zh-Hans">${translated}</span>` : ""}</small>` : ""}</button>
                <button class="item-count"
                    type="button"
                    data-reduce-variant="${index}"
                    aria-label="Einmal ${label} entfernen · 撤销一份"${quantity ? "" : " hidden"}><span
                    aria-hidden="true">${quantity}</span></button>
            </div>
        `);
    });
    byId("variant-options").innerHTML = rows.map(row => `
        <div class="variant-row">
            ${row.buttons.join("")}
        </div>
    `).join("");
    byId("lemon-option").hidden = selectedKind !== "drinks" || selectedItem[2] === "soda";
    byId("lemon-option").disabled = !canAddLemon();
    byId("lemon-status").textContent = "";
    renderUndo();
};

/** Move one newly booked serving to its lemon variant without changing the total quantity. */
const addLastLemon = () => {
    if (!canAddLemon()) {
        return;
    }
    const booking = lastVariantBooking;
    pendingAdds().pop();
    booking.line.quantity--;
    lastVariantBooking = null;
    const line = addItem(booking.item, variants[booking.item[2]][booking.choiceIndex], true);
    renderVariants(false);
    document.querySelector("[data-reduce-variant=\"" + booking.choiceIndex + "\"]>span").classList.add("lemon-feedback");
    byId("lemon-status").textContent = serviceLabel(line.name) + " · " + chineseOrderLabel(line);
    navigator.vibrate?.(20);
};

/** Keep the new-positions-only return behavior while preserving every unpaid table line. */
const returnToTables = () => {
    lastVariantBooking = null;
    const orders = currentTable().orders;
    const added = orders.reduce((total, line) => total + Math.max(0, line.quantity - line.sent), 0);
    orders.forEach(line => line.sent = line.quantity);
    currentTable().pendingAdds = [];
    currentTable().orders = orders.filter(line => line.quantity > 0);
    undoRemovals.length = 0;
    renderOrder();
    renderTables();
    byId("demo-status").textContent = added ? "Demo: " + tableName(activeTable) + " – " + added + " neue Artikel würden auf den Bestellbon kommen." : "Demo: " + tableName(activeTable) + " – keine neuen Artikel, kein weiterer Bestellbon.";
    location.hash = "tables";
};

/** Draw occupancy from the same order state used for ordering and checkout; a moving table waits for its target. */
const renderTables = () => {
    elements("[data-table]").forEach(button => {
        const occupied = hasTableItems(previewTables.get(button.dataset.table));
        const moving = button.dataset.table === moveSource;
        button.classList.toggle("b", occupied);
        button.classList.toggle("moving", moving);
        button.disabled = moving || Boolean(moveSource) && button.dataset.table === "M";
        button.setAttribute("aria-label", tableName(button.dataset.table) + (moving ? ", wird geschoben" : occupied ? ", belegt" : ", frei") + (moveSource && !moving ? ", als Ziel wählen" : ", öffnen"));
    });
};

/** Show one table's draft order without mixing it with another table; opening ends any move. */
const loadTable = number => {
    if (!previewTables.has(number)) {
        previewTables.set(number, emptyTable());
    }
    activeTable = number;
    moveSource = null;
    undoRemovals.length = 0;
    renderMenu("drinks");
    renderMenu("food");
    showGroups("food", true);
    catalogScrollTop = 0;
    showOrderView("catalog");
    elements("[data-active-table]").forEach(label => {
        if (label.hasAttribute("data-payment-table")) {
            label.innerHTML = paymentLabel(tableName(number), tableName(number, true));
        } else {
            label.textContent = label.hasAttribute("data-compact-table") ? number : tableName(number);
        }
        if (label.hasAttribute("data-compact-table")) {
            label.setAttribute("aria-label", tableName(number) + " · Zurück zum Tischplan · 返回桌位");
        }
    });
    byId("buffet-tab").hidden = number === "M";
    renderBuffets();
    showSection("drinks");
};

/** Open a table for ordering. */
const openTable = number => {
    loadTable(number);
    renderMoveBar();
    location.hash = "order";
};

/** Fill the move banner on every table plan. */
const renderMoveBar = () => {
    elements("[data-move-bar]").forEach(bar => bar.hidden = !moveSource);
    elements("[data-move-message]").forEach(message => message.innerHTML = moveSource ? "<b>" + moveSource + "</b> schieben <small lang=\"zh-Hans\">换桌</small>" : "");
};

/** Start moving the open table: the plan waits for a target, the source stays marked. */
const startMove = () => {
    if (!hasTableItems(currentTable())) {
        return;
    }
    moveSource = activeTable;
    renderTables();
    renderMoveBar();
    location.hash = "tables";
};

/** Leave the table plan as it was. */
const cancelMove = () => {
    moveSource = null;
    renderTables();
    renderMoveBar();
};

/** Ask before moving; an occupied target is asked as joining both orders. */
const askMove = to => {
    const merged = hasTableItems(previewTables.get(to));
    moveTarget = to;
    byId("move-question").innerHTML = merged
        ? tableName(moveSource) + " mit " + tableName(to) + " zusammenführen?<small lang=\"zh-Hans\">" + tableName(moveSource, true) + "与" + tableName(to, true) + "合并？</small>"
        : tableName(moveSource) + " auf " + tableName(to) + " schieben?<small lang=\"zh-Hans\">" + tableName(moveSource, true) + "换到" + tableName(to, true) + "？</small>";
    byId("move-confirm").innerHTML = merged ? "Zusammenführen<small lang=\"zh-Hans\">合桌</small>" : "Schieben<small lang=\"zh-Hans\">换桌</small>";
    moveDialog.showModal();
};

/** Move every order line and buffet person to the confirmed target; an occupied target keeps both orders together. */
const moveTable = () => {
    const from = moveSource;
    const to = moveTarget;
    const source = previewTables.get(from);
    const target = previewTables.get(to) || emptyTable();
    const merged = hasTableItems(target);
    previewTables.set(to, target);
    previewTables.set(from, emptyTable());
    target.orders.push(...source.orders);
    Object.keys(buffetPeriods).forEach(period => source.buffet[period].forEach((count, index) => target.buffet[period][index] += count));
    delete target.pendingAdds;
    moveDialog.close();
    loadTable(to);
    renderTables();
    renderMoveBar();
    byId("demo-status").textContent = "Demo: " + tableName(from) + " nach " + tableName(to) + " geschoben" + (merged ? ", beide Bestellungen liegen jetzt zusammen." : ".");
};

/** Snapshot all unpaid items without substituting a different table's sample bill. */
const refreshInvoice = () => {
    invoiceItems = currentTable().orders.filter(line => line.quantity > 0).map(line => ({
        name: line.name,
        chinese: chineseOrderLabel(line),
        quantity: line.quantity,
        price: line.price,
        source: line
    }));
    Object.entries(currentTable().buffet).forEach(([period, counts]) => counts.forEach((quantity, index) => {
        if (quantity > 0) {
            invoiceItems.push({
                name: buffetOrderLabel(period, index, 0),
                chinese: buffetOrderLabel(period, index, 1),
                quantity,
                price: buffetPrices[period][index],
                period,
                person: index
            });
        }
    }));
    checkoutTable = activeTable;
    invoiceDirty = false;
    splitSelection = invoiceItems.map(() => 0);
    renderSplit();
    prepareBill(invoiceItems.map(item => item.quantity));
};

/** Keep modifiers, amounts and connecting words together across checkout line breaks. */
const paymentText = text => text.replace(/(\bmit|\bund) /g, "$1\u00a0").replaceAll("süß-sauer", "süß\u2011sauer").replace(/(Bambus|Ginseng)schnaps/g, "$1\u00adschnaps").replace(/(?:\+|&) \S+|\b(?:\d+(?:\.\d+)?|1\/\d) (?:Fl\.|Stück|Sushi|Maki)/g, part => `<span class="payment-part">${part}</span>`);

/** Keep both translations available while the checkout language displays just one. */
const paymentLabel = (de, zh) => `<span lang="de">${paymentText(de)}</span><span lang="zh-Hans">${paymentText(zh)}</span>`;

/** Render the current unpaid quantities and selected portion in the active checkout language. */
const renderSplit = () => {
    byId("split-lines").innerHTML = invoiceItems.map((item, index) => `
        <div class="counter-row${splitSelection[index] ? " has-selection" : ""}">
            <span class="remaining-count"
                aria-label="${item.quantity} noch unbezahlt">${item.quantity}</span><span class="split-name">${paymentLabel(serviceLabel(item.name), item.chinese)}</span>
            <button class="step-button"
                type="button"
                data-split="${index}"
                data-change="-1"
                aria-label="${item.name} abwählen"${splitSelection[index] === 0 ? " disabled" : ""}><span class="step-face"
                aria-hidden="true"></span></button>
            <output aria-label="Ausgewählte Menge">${splitSelection[index]}</output>
            <button class="step-button"
                type="button"
                data-split="${index}"
                data-change="1"
                aria-label="${item.name} auswählen"${splitSelection[index] >= item.quantity ? " disabled" : ""}><span class="step-face"
                aria-hidden="true"></span></button>
        </div>
    `).join("");
    const chosen = invoiceItems.reduce((sum, item, index) => sum + item.price * splitSelection[index], 0);
    byId("split-total").textContent = money(chosen);
    byId("checkout-selection").disabled = chosen === 0;
};

/** Prepare a whole bill or the selected quantities, keeping the split return path. */
const prepareBill = (selection, fromSplit = false) => {
    if (cashDialog.open) {
        cashDialog.close();
    }
    if (voucherDialog.open) {
        voucherDialog.close();
    }
    voucherValue = 0;
    checkoutSelection = [...selection];
    byId("split-entry").hidden = fromSplit || !invoiceItems.length;
    byId("payment-back").href = fromSplit ? "#split-choice" : "#order";
    byId("invoice-lines").innerHTML = invoiceItems.map((item, index) => !selection[index] ? "" : `
        <div class="invoice-line">
            <span class="invoice-quantity">${selection[index]}</span><span class="invoice-name">${paymentLabel(serviceLabel(item.name), item.chinese)}</span><span class="invoice-amount">${money(item.price * selection[index])}</span>
        </div>
    `).join("");
    renderPaymentAmounts();
};

/** Read the selected invoice amount in integer cents. */
const checkoutTotal = () => invoiceItems.reduce((sum, item, index) => sum + item.price * checkoutSelection[index], 0);

/** Subtract only the voucher value needed for this bill. */
const checkoutDue = () => Math.max(0, checkoutTotal() - voucherValue);

/** Keep the full invoice intact while cash or card pays only its uncovered amount. */
const renderPaymentAmounts = () => {
    const total = checkoutTotal();
    const used = Math.min(total, voucherValue);
    const due = checkoutDue();
    const covered = total > 0 && due === 0;
    elements("[data-invoice-total]").forEach(label => label.textContent = money(due));
    elements("[data-voucher-caption],[data-voucher-summary]").forEach(element => element.hidden = used === 0);
    elements("[data-voucher-deduction]").forEach(label => label.textContent = "− " + money(used));
    elements("[data-voucher-balance]").forEach(element => element.hidden = voucherValue <= total);
    elements("[data-voucher-remaining]").forEach(label => label.textContent = money(Math.max(0, voucherValue - total)));
    byId("voucher-open").disabled = total === 0;
    byId("voucher-finish").hidden = !covered;
    for (const id of ["cash-open", "card-start"]) {
        byId(id).hidden = covered;
        byId(id).disabled = due === 0;
    }
    byId("card-preview-total").textContent = money(due + (due ? 330 : 0));
    byId("card-preview-tip").textContent = money(due ? 330 : 0);
    elements("[data-finish-bill]").forEach(button => button.disabled = due === 0);
};

/** Parse a decimal amount without floating-point money arithmetic. */
const parseAmount = value => {
    if (!/^\d{1,5}(?:\.\d{0,2})?$/.test(value)) {
        return null;
    }
    const [whole, fraction = ""] = value.split(".");
    return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
};

/** Preview a voucher deduction and any unused credit without applying an unfinished input. */
const renderVoucher = () => {
    const total = checkoutTotal();
    const value = parseAmount(voucherAmount.value);
    const valid = checkoutTable === activeTable && !invoiceDirty && total > 0 && value !== null && value > 0;
    const invalid = voucherAmount.value !== "" && (value === null || value <= 0);
    voucherAmount.setAttribute("aria-invalid", String(invalid));
    byId("voucher-bill-total").textContent = money(total);
    byId("voucher-due").textContent = invalid ? "—" : money(Math.max(0, total - (value || 0)));
    byId("voucher-rest").hidden = !valid || value <= total;
    byId("voucher-rest-amount").textContent = money(Math.max(0, (value || 0) - total));
    byId("voucher-error").hidden = !invalid;
    byId("voucher-apply").disabled = !valid;
    byId("voucher-remove").hidden = voucherValue === 0;
    return valid;
};

/** Open the existing voucher for editing, or an empty amount for a new one. */
const openVoucher = () => {
    if (checkoutTable !== activeTable || invoiceDirty || checkoutTotal() <= 0) {
        return;
    }
    voucherAmount.value = voucherValue ? money(voucherValue).split("\u00a0")[0] : "";
    renderVoucher();
    voucherDialog.showModal();
    voucherAmount.focus({
        preventScroll: true
    });
    voucherAmount.select();
};

/** Calculate change from the guest's chosen amount; omitted tender allows manual cash checkout. */
const renderCash = () => {
    const total = checkoutDue();
    const given = parseAmount(cashGiven.value);
    const target = parseAmount(cashTarget.value);
    const manual = cashGiven.value === "";
    const invalidGiven = cashGiven.value !== "" && given === null;
    const targetValid = target !== null && target >= total;
    const invalidTarget = cashTarget.value !== "" && !targetValid;
    const ready = given !== null && targetValid;
    const shortfall = ready && given < target;
    const current = checkoutTable === activeTable && !invoiceDirty && total > 0;
    const valid = current && targetValid && (manual || ready && !shortfall);
    cashGiven.setAttribute("aria-invalid", String(invalidGiven));
    cashTarget.setAttribute("aria-invalid", String(invalidTarget));
    byId("cash-bill-total").textContent = money(total);
    byId("cash-result").classList.toggle("shortfall", shortfall);
    byId("cash-result-label").innerHTML = shortfall ? paymentLabel("Fehlt", "还差") : paymentLabel("Rückgeld", "找零");
    byId("cash-change").textContent = ready ? money(Math.abs(given - target)) : "—";
    const error = byId("cash-error");
    error.hidden = !invalidGiven && !invalidTarget;
    error.innerHTML = invalidTarget && target !== null && target < total ? paymentLabel("Mindestens " + money(total), "不低于 " + money(total)) : paymentLabel("Betrag prüfen", "检查金额");
    byId("cash-accept").disabled = !current || !targetValid;
    byId("cash-finish").disabled = !valid;
    return valid;
};

/** Start with the invoice amount, then ask for tender after the guest's amount is accepted. */
const resetCash = () => {
    cashGiven.value = "";
    cashTarget.value = money(checkoutDue()).split("\u00a0")[0];
    cashActiveInput = cashTarget;
    byId("cash-given-field").hidden = true;
    byId("cash-result").hidden = true;
    byId("cash-accept").hidden = false;
    byId("cash-accept").setAttribute("aria-expanded", "false");
    renderCash();
};

/** Open the same cash step for whole bills and selected split quantities. */
const openCash = () => {
    if (checkoutTable !== activeTable || invoiceDirty || checkoutDue() <= 0) {
        return;
    }
    resetCash();
    cashDialog.showModal();
    cashTarget.focus({
        preventScroll: true
    });
    cashTarget.select();
};

/** Keep the chosen amount visible and move the keypad to the cash received. */
const acceptCashTarget = () => {
    const target = parseAmount(cashTarget.value);
    if (!cashDialog.open || checkoutTable !== activeTable || invoiceDirty || target === null || target < checkoutDue()) {
        return;
    }
    cashTarget.value = money(target).split("\u00a0")[0];
    byId("cash-accept").hidden = true;
    byId("cash-accept").setAttribute("aria-expanded", "true");
    byId("cash-given-field").hidden = false;
    byId("cash-result").hidden = false;
    cashActiveInput = cashGiven;
    cashGiven.focus({
        preventScroll: true
    });
    renderCash();
};

/** Edit the focused amount using the on-screen keypad without opening a second phone keyboard. */
const typeAmountKey = (input, key) => {
    let start = input.selectionStart;
    const end = input.selectionEnd;
    let replacement = key;
    if (key === "backspace") {
        if (start === end) {
            start = Math.max(0, start - 1);
        }
        replacement = "";
    }
    let next = input.value.slice(0, start) + replacement + input.value.slice(end);
    if (next === ".") {
        next = "0.";
        replacement = "0.";
    }
    if (!/^\d{0,5}(?:\.\d{0,2})?$/.test(next) || next.length > input.maxLength) {
        return;
    }
    input.setRangeText(replacement, start, end, "end");
    input.focus({
        preventScroll: true
    });
    input.dispatchEvent(new Event("input", {
        bubbles: true
    }));
};

/** Finish exactly the selected quantities and retain the unpaid remainder on that same table. */
const finishBill = method => {
    if (checkoutTable !== activeTable || invoiceDirty || !checkoutSelection.some(quantity => quantity > 0)) {
        return;
    }
    if (method === "voucher" ? checkoutDue() !== 0 : !["cash", "card"].includes(method) || checkoutDue() <= 0) {
        return;
    }
    const pending = pendingAdds();
    const items = invoiceItems.filter((item, index) => checkoutSelection[index] > 0).map(item => {
        const index = invoiceItems.indexOf(item);
        return {
            name: item.name,
            chinese: item.chinese,
            quantity: checkoutSelection[index],
            price: item.price
        };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const voucher = Math.min(total, voucherValue);
    const payments = {
        voucher,
        cash: method === "cash" ? total - voucher : 0,
        card: method === "card" ? total - voucher : 0
    };
    const voucherRemaining = Math.max(0, voucherValue - voucher);
    invoiceItems.forEach((item, index) => {
        const quantity = checkoutSelection[index];
        if (item.source) {
            const paidPending = Math.min(quantity, Math.max(0, item.source.quantity - item.source.sent));
            for (let i = 0; i < paidPending; i++) {
                const pendingIndex = pending.lastIndexOf(item.source);
                if (pendingIndex >= 0) {
                    pending.splice(pendingIndex, 1);
                }
            }
            item.source.quantity -= quantity;
            item.source.sent = Math.min(item.source.sent, item.source.quantity);
        } else {
            currentTable().buffet[item.period][item.person] -= quantity;
        }
    });
    currentTable().orders = currentTable().orders.filter(line => line.quantity > 0);
    undoRemovals.length = 0;
    todayReceipts.unshift({
        table: activeTable,
        time: new Date().toLocaleTimeString("de-AT", {
            hour: "2-digit",
            minute: "2-digit"
        }),
        total,
        method,
        items,
        payments,
        voucherRemaining
    });
    renderBuffets();
    renderTables();
    renderToday();
    refreshInvoice();
    const complete = invoiceItems.length === 0;
    prepareBill(invoiceItems.map(() => 0), true);
    byId("demo-status").textContent = complete ? "Demo: " + tableName(activeTable) + " vollständig bezahlt. Die Rechnung würde gedruckt." : "Demo: Teilrechnung abgeschlossen. Nur die bezahlten Mengen wurden abgezogen.";
    location.hash = complete ? "tables" : "split-choice";
};

/** Payment methods are informational on the service phone; no accidental one-tap correction. */
const renderToday = () => {
    byId("today-list").innerHTML = todayReceipts.map(receipt => `
        <div class="r">
            <span>${receipt.time}</span><span>${receipt.table === "M" ? "M" : "T" + receipt.table}</span><span class="a">${money(receipt.total)}</span><span class="payment-badge"${receipt.payments?.voucher ? " title=\"Gutschein " + money(receipt.payments.voucher) + "; Bar " + money(receipt.payments.cash) + "; Karte " + money(receipt.payments.card) + "\"" : ""}>${receipt.method === "voucher" ? "Gutschein" : (receipt.method === "card" ? "Karte" : "Bar") + (receipt.payments?.voucher ? "<small>+ Gutschein</small>" : "")}</span>
        </div>
    `).join("");
};
document.addEventListener("click", event => {
    if (event.target === variantDialog || event.target === cashDialog || event.target === voucherDialog || event.target === moveDialog) {
        const dialog = event.target;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            dialog.close();
        }
        return;
    }
    const button = event.target.closest("button,a");
    if (!button || button.disabled) {
        return;
    }
    if (button.hasAttribute("data-return-tables")) {
        event.preventDefault();
        returnToTables();
    } else if (button.hasAttribute("data-move-start")) {
        startMove();
    } else if (button.hasAttribute("data-move-cancel")) {
        cancelMove();
    } else if (button.hasAttribute("data-move-confirm")) {
        moveTable();
    } else if (button.hasAttribute("data-move-decline")) {
        moveDialog.close();
    } else if (button.dataset.period) {
        setBuffetPeriod(button.dataset.period);
    } else if (button.dataset.mapArea) {
        elements("[data-map-panel]").forEach(panel => panel.hidden = panel.dataset.mapPanel !== button.dataset.mapArea);
        elements("[data-map-area]").forEach(tab => {
            const selected = tab.dataset.mapArea === button.dataset.mapArea;
            tab.classList.toggle("on", selected);
            tab.setAttribute("aria-pressed", String(selected));
        });
    } else if (button.dataset.table) {
        if (moveSource) {
            askMove(button.dataset.table);
        } else {
            openTable(button.dataset.table);
        }
    } else if (button.dataset.orderView) {
        showOrderView(button.dataset.orderView);
    } else if (button.dataset.orderLanguage || button.dataset.paymentLanguage) {
        setLanguage(button.dataset.orderLanguage || button.dataset.paymentLanguage);
    } else if (button.dataset.section) {
        showSection(button.dataset.section);
    } else if (button.dataset.openGroups) {
        const kind = button.dataset.openGroups;
        showGroups(kind, true);
    } else if (button.dataset.menu) {
        renderMenu(button.dataset.menu, Number(button.dataset.group));
        document.querySelector("[data-open-groups=\"" + button.dataset.menu + "\"]").focus({
            preventScroll: true
        });
    } else if (button.dataset.reduceItem !== undefined) {
        const item = menus[button.dataset.reduceKind][Number(button.dataset.reduceGroup)][1][Number(button.dataset.reduceItem)];
        const line = pendingAdds().findLast(line => line.catalogName === item[0] && line.quantity > line.sent && currentTable().orders.includes(line));
        if (line) {
            removeOrderItem(line, false);
        }
    } else if (button.dataset.item !== undefined) {
        const kind = button.dataset.itemKind;
        const item = menus[kind][Number(button.dataset.itemGroup)][1][Number(button.dataset.item)];
        const choices = variants[item[2]] || [];
        colaOpen = item[2] === "cola";
        if (!colaOpen && choices.length < 2) {
            addItem(item, choices[0]);
        } else {
            selectedKind = kind;
            selectedItem = colaOpen ? colaFlavors[0] : item;
            renderVariants();
            variantDialog.showModal();
        }
    } else if (button.dataset.colaFlavor !== undefined) {
        selectedItem = colaFlavors[Number(button.dataset.colaFlavor)];
        renderVariants();
    } else if (button.dataset.reduceVariant !== undefined) {
        const index = Number(button.dataset.reduceVariant);
        const matches = line => line.itemName === selectedItem[0] && line.choiceIndex === index && line.quantity > 0 && currentTable().orders.includes(line);
        const line = pendingAdds().findLast(line => matches(line) && line.quantity > line.sent) || currentTable().orders.findLast(matches);
        if (line) {
            removeOrderItem(line, line.quantity <= line.sent);
            renderVariants(false);
            document.querySelector("[data-variant=\"" + index + "\"]").focus({
                preventScroll: true
            });
        }
    } else if (button.dataset.variant !== undefined) {
        const index = Number(button.dataset.variant);
        const line = addItem(selectedItem, variants[selectedItem[2]][index]);
        lastVariantBooking = {
            line,
            item: selectedItem,
            choiceIndex: index,
            table: activeTable
        };
        renderVariants(false);
        document.querySelector("[data-variant=\"" + index + "\"]").focus({
            preventScroll: true
        });
    } else if (button.hasAttribute("data-add-lemon")) {
        addLastLemon();
    } else if (button.hasAttribute("data-close-variant")) {
        variantDialog.close();
    } else if (button.dataset.remove !== undefined) {
        removeOrderItem(currentTable().orders[Number(button.dataset.remove)]);
    } else if (button.hasAttribute("data-undo-removal")) {
        const removed = undoRemovals.pop();
        if (removed) {
            if (removed.buffet) {
                removed.buffet[removed.person]++;
            } else {
                removed.line.quantity++;
                if (removed.wasPending) {
                    pendingAdds().splice(Math.max(0, removed.pendingIndex), 0, removed.line);
                } else {
                    removed.line.sent++;
                }
            }
        }
        renderBuffets();
        if (variantDialog.open) {
            renderVariants(false);
        }
    } else if (button.dataset.buffetPerson !== undefined) {
        const period = button.closest("[data-buffet]").dataset.buffet;
        const counts = currentTable().buffet[period];
        const index = Number(button.dataset.buffetPerson);
        if (button.closest("#ordered-view") && counts[index] > 0) {
            undoRemovals.push({
                buffet: counts,
                person: index,
                line: {
                    name: buffetOrderLabel(period, index, 0),
                    chinese: buffetOrderLabel(period, index, 1)
                }
            });
        }
        counts[index] = Math.max(0, counts[index] + Number(button.dataset.change));
        renderBuffets();
    } else if (button.dataset.split !== undefined) {
        const index = Number(button.dataset.split);
        splitSelection[index] = Math.min(invoiceItems[index].quantity, Math.max(0, splitSelection[index] + Number(button.dataset.change)));
        renderSplit();
    } else if (button.id === "checkout-selection") {
        prepareBill(splitSelection, true);
        location.hash = "billing";
    } else if (button.id === "cash-open") {
        openCash();
    } else if (button.id === "cash-close") {
        cashDialog.close();
    } else if (button.id === "cash-accept") {
        acceptCashTarget();
    } else if (button.dataset.amountKey !== undefined) {
        const input = button.closest("dialog") === cashDialog ? cashActiveInput : voucherAmount;
        typeAmountKey(input, button.dataset.amountKey);
    } else if (button.id === "cash-finish" && cashDialog.open && renderCash()) {
        cashDialog.close();
        finishBill("cash");
    } else if (button.id === "voucher-open") {
        openVoucher();
    } else if (button.id === "voucher-close") {
        voucherDialog.close();
    } else if (button.id === "voucher-apply" && voucherDialog.open && renderVoucher()) {
        voucherValue = parseAmount(voucherAmount.value);
        voucherDialog.close();
        renderPaymentAmounts();
    } else if (button.id === "voucher-remove" && voucherDialog.open) {
        voucherValue = 0;
        voucherDialog.close();
        renderPaymentAmounts();
    } else if (button.id === "voucher-finish") {
        finishBill("voucher");
    } else if (button.id === "card-start" && checkoutDue() > 0) {
        location.hash = "card-payment";
    } else if (button.hasAttribute("data-whole-bill")) {
        refreshInvoice();
    } else if (button.hasAttribute("data-finish-bill")) {
        finishBill(button.dataset.finishBill);
    }
});
document.addEventListener("keydown", event => {
    if (event.key !== "Escape" || variantDialog.open || moveDialog.open) {
        return;
    }
    if (moveSource) {
        event.preventDefault();
        cancelMove();
    } else if (event.target.closest("#order-phone")) {
        event.preventDefault();
        returnToTables();
    }
});

/** Follow local links without reloading the page or losing a table's draft. */
const syncScreen = () => {
    let route = location.hash.slice(1) || "tables";
    if (route === "cola-choice") {
        route = "order";
        location.hash = "order";
        showOrderView("catalog");
        colaOpen = true;
        selectedItem = colaFlavors[0];
        renderVariants();
        if (!variantDialog.open) {
            variantDialog.showModal();
        }
    }
    if (route === "closing" && previewMode && !chefPreview) {
        route = "tables";
        location.hash = "tables";
    }
    if (moveDialog.open && route !== "tables") {
        moveDialog.close();
    }
    if (moveSource && route !== "tables") {
        cancelMove();
    }
    if (["billing", "card-payment", "split-choice"].includes(route) && (invoiceDirty || checkoutTable !== activeTable)) {
        refreshInvoice();
    }
    const screen = route === "card-payment" ? "billing" : route;
    const known = ["tables", "order", "split-choice", "billing", "today", "closing"].includes(screen);
    elements("[data-screen]").forEach(row => row.classList.toggle("active-preview", row.dataset.screen === (known ? screen : "tables")));
    byId("billing-phone").hidden = previewMode && route === "card-payment";
    byId("card-payment").hidden = previewMode && route !== "card-payment";
    if (variantDialog.open && route !== "order") {
        variantDialog.close();
    }
    if (cashDialog.open && route !== "billing") {
        cashDialog.close();
    }
    if (voucherDialog.open && route !== "billing") {
        voucherDialog.close();
    }
    if (!["billing", "card-payment"].includes(route) && voucherValue) {
        voucherValue = 0;
        renderPaymentAmounts();
    }
    if (route === "order") {
        fitOrderLabels();
    }
};
document.body.classList.toggle("single-screen", previewMode);
variantDialog.addEventListener("close", () => lastVariantBooking = null);
cashDialog.addEventListener("close", () => {
    if (!cashDialog.open) {
        resetCash();
    }
});
cashDialog.addEventListener("focusin", event => {
    if (event.target === cashGiven || event.target === cashTarget) {
        cashActiveInput = event.target;
    }
});
for (const [dialog, render] of [[cashDialog, renderCash], [voucherDialog, renderVoucher]]) {
    dialog.addEventListener("input", event => {
        if (!event.target.matches("input")) {
            return;
        }
        event.target.value = event.target.value.replace(/,/g, ".");
        render();
    });
    dialog.addEventListener("pointerdown", event => {
        if (event.target.closest("[data-amount-key]")) {
            event.preventDefault();
        }
    });
}
window.addEventListener("hashchange", syncScreen);
window.addEventListener("resize", fitOrderLabels);
document.fonts.ready.then(fitOrderLabels);
mountTemplates();
renderTables();
renderMenu("drinks");
renderMenu("food");
showGroups("drinks", true);
showGroups("food", true);
renderBuffets();
renderVariants();
refreshInvoice();
renderToday();
syncScreen();
