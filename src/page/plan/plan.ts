/**
 * ## Table plan
 *
 * Shows occupied tables, switches areas, opens tables, moves a table.
 *
 * - `../lock.ts`: Holds a table open on this device only.
 * - `../offline.ts`: Shows hint in place of screen, when connection to server is gone.
 * - `../swipe.ts`: Switches tabs on horizontal swipes.
 */

import { lockSend } from "../lock.ts";
import { offlineShow } from "../offline.ts";
import { swipeStart } from "../swipe.ts";


/**
 * Area shown when table plan opens again, `indoor` or `garden`.
 */
let areaOpen: string = "indoor";

/**
 * Shows occupied tables reported by server.
 *
 * - {@link fetch}: Sends an HTTP request.
 * - `occupied`: IDs of occupied tables.
 * - {@link DOMTokenList#toggle}: Adds class when condition is true,
 *   else removes it.
 *
 * @throws {Error} - When server gives no valid answer
 */
async function tablesShow(): Promise<void> {
    const response: Response = await fetch("/tables");
    const occupied: string[] = await response.json();

    document.querySelectorAll("[data-table]").forEach((table: Element): void => {
        const tableId: string = table.getAttribute("data-table") ?? "";
        table.classList.toggle("occupied", occupied.includes(tableId));
    });
}

/**
 * Shows selected area and hides other area.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
 *   is true, else removes it.
 *
 * @param tab - Pressed tab
 */
function areaShow(tab: Element): void {
    areaOpen = tab.getAttribute("data-area") ?? "indoor";
    document.querySelectorAll(".tabs button").forEach((other: Element): void => {
        other.classList.toggle("selected", other === tab);
    });
    document.querySelectorAll(".area").forEach((area: Element): void => {
        area.toggleAttribute("hidden", area.id !== areaOpen);
    });
}

/**
 * Opens a table when this device gets its table-lock,
 * else shows that the table is open on another device.
 *
 * @param tableId - Table identifier
 * @param orderOpen - Opens order screen of a table
 * @throws {Error} - When server gives no valid answer
 */
async function tableOpen(tableId: string, orderOpen: (tableId: string) => void): Promise<void> {
    if (await lockSend("POST", tableId))
        orderOpen(tableId);
    else
        document.querySelector(".busy")?.removeAttribute("hidden");
}

/**
 * Moves a table to another table, then takes the step of the move mode back,
 * so the table plan opens again.
 * - {@link fetch}: Sends an HTTP request.
 * - {@link History#back}: Takes back the step of the move mode, `popstate` follows.
 *
 * @param moveFrom - Identifier of the table to move
 * @param targetId - Identifier of the table to move to
 * @throws {Error} - When server gives no valid answer
 */
async function moveSend(moveFrom: string, targetId: string): Promise<void> {
    await fetch(`/tables/${moveFrom}/move`, { method: "POST", body: JSON.stringify(targetId) });
    history.back();
}

/**
 * Asks whether to move the table to the tapped table.
 * An occupied target is joined, so question and button say so.
 * The button carries the target in its value.
 * - {@link Element#replaceChildren}: Puts the new text in place of the old one.
 * - {@link HTMLDialogElement#showModal}: Opens the dialog above the page,
 *   Escape closes only the dialog.
 *
 * @param moveFrom - Identifier of the table to move
 * @param tableId - Identifier of the tapped table
 * @param occupied - Whether the tapped table has orders
 */
function moveAsk(moveFrom: string, tableId: string, occupied: boolean): void {
    const confirm: HTMLButtonElement | null = document.querySelector(".move-confirm");

    document.querySelector(".move-question")?.replaceChildren(occupied
        ? `Tisch ${moveFrom} mit Tisch ${tableId} zusammenführen?`
        : `Tisch ${moveFrom} auf Tisch ${tableId} schieben?`);
    if (confirm !== null) {
        confirm.innerHTML = occupied
            ? `Zusammenführen <span lang="zh-Hans">合并</span>`
            : `Schieben <span lang="zh-Hans">移动</span>`;
        confirm.value = tableId;
    }
    document.querySelector("dialog")?.showModal();
}

/**
 * Starts the move mode: the strip names the table to move, which is dashed.
 * It and Mitnehmen, which is never a target, are not tappable.
 * Every way out goes through the history of the browser, like the order screen,
 * so Abbrechen and Android back leave the same way and open the table plan.
 * - {@link Element#replaceChildren}: Puts the table number in place of the old one.
 * - {@link DOMTokenList#toggle}: Adds class when condition is true,
 *   else removes it.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
 *   is true, else removes it.
 * - {@link History#pushState}: Adds a step, which Android back takes back.
 * - `popstate`: Fires when a step of the history is taken back,
 *   then opens the table plan.
 *
 * @param moveFrom - Identifier of the table to move
 * @param planOpen - Opens table plan
 */
function moveStart(moveFrom: string, planOpen: () => void): void {
    document.querySelector(".move-source")?.replaceChildren(moveFrom);
    document.querySelectorAll("[data-table]").forEach((table: Element): void => {
        const tableId: string = table.getAttribute("data-table") ?? "";
        table.classList.toggle("moving", tableId === moveFrom);
        table.toggleAttribute("disabled", tableId === moveFrom || tableId === "M");
    });

    history.pushState(null, "");
    window.addEventListener("popstate", planOpen, { once: true });
    document.querySelector(".move-cancel")?.addEventListener("click", (): void => history.back());

    const confirm: HTMLButtonElement | null = document.querySelector(".move-confirm");
    confirm?.addEventListener("click", (): void => {
        moveSend(moveFrom, confirm.value).catch(offlineShow);
    });
}

/**
 * Starts table plan after router has put its HTML into page.
 * Shows the area that was open last time.
 * With a table to move it is in move mode: the strip of the move
 * replaces the reservations bar, a tap on a table asks to move there.
 * - {@link Element#remove}: Takes the strip that is not needed out of the page.
 *
 * @param orderOpen - Opens order screen of a table
 * @param planOpen - Opens table plan
 * @param moveFrom - Identifier of the table to move, `null` for the normal table plan
 */
export function planStart(orderOpen: (tableId: string) => void,
                          planOpen: () => void,
                          moveFrom: string | null): void {

    document.querySelector(moveFrom === null ? ".move-bar" : ".reservations-bar")?.remove();

    document.querySelectorAll(".tabs button").forEach((tab: Element): void => {
        tab.addEventListener("click", (): void => areaShow(tab));
        if (tab.getAttribute("data-area") === areaOpen) areaShow(tab);
    });

    document.querySelectorAll("[data-table]").forEach((table: Element): void => {
        const tableId: string = table.getAttribute("data-table") ?? "";
        table.addEventListener("click", (): void => {
            if (moveFrom === null)
                tableOpen(tableId, orderOpen).catch(offlineShow);
            else
                moveAsk(moveFrom, tableId, table.classList.contains("occupied"));
        });
    });

    if (moveFrom !== null) moveStart(moveFrom, planOpen);
    swipeStart(".tabs, .area", areaShow);
    tablesShow().catch(offlineShow);
}
