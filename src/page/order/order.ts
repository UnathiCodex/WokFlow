/**
 * ## Order screen
 *
 * Shows menus and open orders of a table, while this device holds its table-lock,
 * and sends the changes on the way back.
 *
 * - `../lock.ts`: Holds a table open on this device only.
 * - `../offline.ts`: Shows hint in place of screen, when connection to server is gone.
 * - `../swipe.ts`: Switches tabs on horizontal swipes.
 * - `./ordered.ts`: Holds the ordered list of an open table on the phone until the way back to the plan.
 * - `./orderedView.ts`: Shows the ordered list of an open table
 *   with a minus button per line and the undo bar.
 * - `./menuView.ts`: Shows the drinks or food menu of the order screen,
 *   first its group list, then one group.
 * - `./groups.ts`: Tells which catalog lists form which group row in the drinks and food menus.
 */

import { lockSend } from "../lock.ts";
import { offlineShow } from "../offline.ts";
import { swipeStart } from "../swipe.ts";
import { orderedOf, updateOf } from "./ordered.ts";
import { orderedShow } from "./orderedView.ts";
import { menuShow } from "./menuView.ts";
import { groupsDrinks, groupsFood } from "./groups.ts";

import type { Menu } from "../../catalog/menu.ts";
import type { OrdersUpdate } from "../../tables/orders.ts";
import type { Ordered } from "./ordered.ts";


/**
 * Time in milliseconds between two renewals of the table-lock.
 * Well below `lockDuration` of the server,
 * so one lost renewal does not free the table.
 */
const lockRenewal: number = 2000;

/**
 * The open table on the phone.
 *
 * - `menu`: Menu as the server sends it.
 * - `ordered`: Ordered list of the table with the changes not sent yet.
 */
type TableOpen = {
    menu: Menu;
    ordered: Ordered;
};

/**
 * Reads menu and open orders of a table.
 * - {@link Promise.all}: Waits for both answers, asked at the same time.
 * - {@link orderedOf}: Makes the ordered list from the open orders.
 *
 * @param tableId - Table identifier
 * @returns {@link TableOpen} without changes yet
 * @throws {Error} - When server gives no valid answer
 */
async function tableRead(tableId: string): Promise<TableOpen> {
    const [menuResponse, ordersResponse]: Response[] = await Promise.all([
        fetch("/menu"),
        fetch(`/tables/${tableId}/orders`),
    ]);
    return { menu: await menuResponse.json(), ordered: orderedOf(await ordersResponse.json()) };
}

/**
 * Sends the changes of a table, then unlocks the table.
 * Renews the table-lock first, so changes are sent only while no other device has the table.
 * Sends nothing when nothing changed.
 *
 * @param tableId - Table identifier
 * @param update - Orders to add and variants to remove, from {@link updateOf}
 * @throws {Error} - When server gives no valid answer or does not save the update
 */
async function tableLeave(tableId: string, update: OrdersUpdate): Promise<void> {
    if (update.add.length + update.remove.length > 0 && await lockSend("POST", tableId)) {
        const response: Response = await fetch(`/tables/${tableId}/orders`, {
            method: "POST",
            body: JSON.stringify(update),
        });
        if (!response.ok) throw new Error(`The server did not save the orders of ${tableId}`);
    }
    await lockSend("DELETE", tableId);
}

/**
 * Shows selected view, filled anew, and hides other views.
 * Filling anew opens a menu at its group list,
 * and counters and lines show the bookings of the other views.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
 *   is true, else removes it.
 * - {@link menuShow}: Shows the group list of drinks or food.
 * - {@link orderedShow}: Shows the ordered list with its undo bar.
 *
 * @param tab - Pressed tab
 * @param table - Open table
 */
function viewShow(tab: Element, table: TableOpen): void {
    const viewOpen: string = tab.getAttribute("data-view") ?? "drinks";
    document.querySelectorAll(".tabs button").forEach((other: Element): void => {
        other.classList.toggle("selected", other === tab);
    });
    document.querySelectorAll(".view").forEach((view: Element): void => {
        view.toggleAttribute("hidden", view.id !== viewOpen);
    });

    const view: Element = document.getElementById(viewOpen) as Element;
    if (viewOpen === "drinks") menuShow(view, table.menu.drinks, groupsDrinks, table.ordered);
    if (viewOpen === "food") menuShow(view, table.menu.food, groupsFood, table.ordered);
    if (viewOpen === "ordered")
        orderedShow(view, document.querySelector(".undo-bar") as Element, table.menu, table.ordered);
}

/**
 * Starts the tabs once the table is read.
 * Opens at drinks, but table `M` has no drinks tab and opens at food.
 *
 * @param tableId - Table identifier
 * @param table - Open table
 */
function tabsStart(tableId: string, table: TableOpen): void {
    if (tableId === "M") document.querySelector("[data-view=drinks]")?.remove();
    const firstView: string = tableId === "M" ? "food" : "drinks";
    document.querySelectorAll(".tabs button").forEach((tab: Element): void => {
        tab.addEventListener("click", (): void => viewShow(tab, table));
        if (tab.getAttribute("data-view") === firstView) viewShow(tab, table);
    });

    swipeStart(".tabs, .view", (tab: Element): void => viewShow(tab, table));
}

/**
 * Starts order screen after router has put its HTML into page.
 * Every way back goes through the history of the browser,
 * so table number, Escape and Android back leave the same way.
 * - {@link History#pushState}: Adds a step, which Android back takes back.
 * - {@link window.setInterval}: Renews the table-lock until the table is left.
 *   A lost table-lock leaves the table.
 * - `popstate`: Fires when a step of the history is taken back,
 *   then stops renewing, sends the changes, unlocks the table, opens the table plan.
 * - `ordered`: Empty until the server answers, so a way back before sends nothing.
 *
 * @param tableId - Table identifier
 * @param planOpen - Opens table plan
 */
export function orderStart(tableId: string, planOpen: () => void): void {
    const tableNumber: Element | null = document.querySelector(".table-number");
    if (tableNumber !== null) tableNumber.textContent = tableId;
    let ordered: Ordered = orderedOf([]);

    history.pushState(null, "");
    const renewal: number = window.setInterval(async (): Promise<void> => {
        if (!await lockSend("POST", tableId)) history.back();
    }, lockRenewal);

    window.addEventListener("popstate", (): void => {
        clearInterval(renewal);
        tableLeave(tableId, updateOf(ordered)).then(planOpen).catch(offlineShow);
    }, { once: true });

    tableNumber?.addEventListener("click", (): void => history.back());
    document.body.addEventListener("keydown", (event: KeyboardEvent): void => {
        if (event.key === "Escape") history.back();
    });

    tableRead(tableId).then((table: TableOpen): void => {
        ordered = table.ordered;
        tabsStart(tableId, table);
    }).catch(offlineShow);
}
