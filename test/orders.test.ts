/**
 * ## Orders test
 *
 * Checks the orders of the tables against an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { test, beforeEach } from "node:test";
import { deepEqual, throws } from "node:assert/strict";
import * as orders from "../src/tables/orders.ts";
import { databaseTest } from "./setup.ts";
import type { DatabaseSync } from "node:sqlite";


let database: DatabaseSync;
beforeEach((): void => { database = databaseTest(); });

const colaSmall1: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.25", quantity: 1 });
const colaBig1: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.5", quantity: 1 });
const colaBig2: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.5", quantity: 2 });
const colaBig3: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.5", quantity: 3 });
const redBull0: orders.Order = orders.orderOf({ articleId: "Red Bull", variantId: null, quantity: 0 });
const redBull1: orders.Order = orders.orderOf({ articleId: "Red Bull", variantId: null, quantity: 1 });


test(
    "A table goes from its first orders to closing",
    (): void => {
        orders.ordersSend(database, "14", [colaBig1, colaSmall1, redBull1]);
        orders.ordersSend(database, "14", [colaBig2]);
        orders.ordersSend(database, "G3", [redBull1]);
        deepEqual(orders.ordersRead(database, "14"), [colaBig3, colaSmall1, redBull1]);

        orders.ordersRemove(database, "14", [colaBig2, redBull1]);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1, colaSmall1]);

        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        deepEqual(orders.ordersRead(database, "G3"), [redBull1]);
    }
);

test(
    "Sending saves all orders or none",
    (): void => {
        throws((): void => orders.ordersSend(database, "14", [colaBig2, redBull0]));
        deepEqual(orders.ordersRead(database, "14"), []);
    }
);

test(
    "Removing takes all portions or none",
    (): void => {
        orders.ordersSend(database, "14", [colaBig2, redBull1]);
        throws((): void => orders.ordersRemove(database, "14", [redBull1, colaBig3]));
        deepEqual(orders.ordersRead(database, "14"), [colaBig2, redBull1]);
    }
);

test(
    "A free table has nothing to remove or to close",
    (): void => {
        orders.ordersSend(database, "14", [colaBig2]);
        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        throws((): void => orders.ordersRemove(database, "14", [colaBig1]));
        throws((): void => orders.tableClose(database, "14"));
    }
);
