/**
 * ## Router
 *
 * Opens screens of page in empty body of `index.html`.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `./plan/plan.html?raw`: Html as text, packed into built code by Vite.
 * - `./order/order.html?raw`: Html as text, packed into built code by Vite.
 * - `./plan/plan.ts`: Shows occupied tables, switches areas, opens tables, moves a table.
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
    planStart(orderOpen, planOpen, null);
}

/**
 * Opens table plan in move mode, where a tap on a target table moves the table there.
 * Not called yet, the order screen has no move button so far.
 *
 * @param tableId - Identifier of the table to move
 */
function moveOpen(tableId: string): void {
    screenPut(planHtml);
    planStart(orderOpen, planOpen, tableId);
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
