/**
 * ## Table plan
 *
 * Shows occupied tables, switches areas, opens tables.
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
 * Starts table plan after router has put its HTML into page.
 * Shows the area that was open last time.
 *
 * @param orderOpen - Opens order screen of a table
 */
export function planStart(orderOpen: (tableId: string) => void): void {
    document.querySelectorAll(".tabs button").forEach((tab: Element): void => {
        tab.addEventListener("click", (): void => areaShow(tab));
        if (tab.getAttribute("data-area") === areaOpen) areaShow(tab);
    });

    document.querySelectorAll("[data-table]").forEach((table: Element): void => {
        const tableId: string = table.getAttribute("data-table") ?? "";
        table.addEventListener("click", (): void => {
            tableOpen(tableId, orderOpen).catch(offlineShow);
        });
    });

    swipeStart(".tabs, .area", areaShow);
    tablesShow().catch(offlineShow);
}
