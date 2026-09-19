/**
 * ## Test setup
 *
 * Prepares an empty database in memory and the orders for the tests.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { DatabaseSync } from "node:sqlite";
import { orderbookCreate } from "../src/tables/orderbook.ts";
import { orderOf } from "../src/tables/orders.ts";
import type { Order } from "../src/tables/orders.ts";


/**
 * Opens an empty database in memory with the `orderbook`.
 *
 * @returns {@link DatabaseSync} connection object
 */
export function databaseTest(): DatabaseSync {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    orderbookCreate(database);
    return database;
}

export const colaSmall1: Order = orderOf({ articleId: "Cola", variantId: "0.25", quantity: 1 });
export const colaBig1: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 1 });
export const colaBig2: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 2 });
export const colaBig3: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 3 });
export const redBull0: Order = orderOf({ articleId: "Red Bull", variantId: null, quantity: 0 });
export const redBull1: Order = orderOf({ articleId: "Red Bull", variantId: null, quantity: 1 });
