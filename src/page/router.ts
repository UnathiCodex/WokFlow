/**
 * ## Router
 *
 * Opens screens of page in empty body of `index.html`.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `./plan/plan.html?raw`: Html as text, packed into built code by Vite.
 * - `./order/order.html?raw`: Html as text, packed into built code by Vite.
 * - `./plan/plan.ts`: Shows occupied tables, switches areas, opens tables.
 * - `./order/order.ts`: Shows open orders of a table.
 */

/// <reference types="vite/client" />
import planHtml from "./plan/plan.html?raw";
import orderHtml from "./order/order.html?raw";
import { planStart } from "./plan/plan.ts";
import { orderStart } from "./order/order.ts";


/**
 * Puts a screen into a fresh body in place of the old one,
 * so the listeners of the old screen go with its body.
 *
 * @param html - Html of the screen
 */
function screenPut(html: string): void {
    document.body = document.createElement("body");
    document.body.innerHTML = html;
}

/**
 * Opens table plan, where a tap on a table opens its order screen.
 */
function planOpen(): void {
    screenPut(planHtml);
    planStart(orderOpen);
}

/**
 * Opens order screen of a table, whose way back opens table plan.
 *
 * @param tableId - Table identifier
 */
function orderOpen(tableId: string): void {
    screenPut(orderHtml);
    orderStart(tableId, planOpen);
}

planOpen();
