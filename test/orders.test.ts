/**
 * ## Orders test
 *
 * Checks the orders of the tables against an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
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
const pizza1: orders.OrderNew = { articleId: "Pizza", variantId: null, quantity: 1 };


test(
    "A table goes from its first orders to closing",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1, colaSmall1, redBull1], remove: [] });
        orders.ordersUpdate(database, "14", { add: [colaBig2], remove: [] });
        orders.ordersUpdate(database, "G3", { add: [redBull1], remove: [] });
        deepEqual(orders.ordersRead(database, "14"), [colaBig3, colaSmall1, redBull1]);

        orders.ordersUpdate(database, "14", { add: [], remove: [colaBig2, redBull1] });
        deepEqual(orders.ordersRead(database, "14"), [colaBig1, colaSmall1]);

        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        deepEqual(orders.ordersRead(database, "G3"), [redBull1]);
    }
);

test(
    "A quantity below 1 changes nothing",
    (): void => {
        throws((): void => orders.ordersUpdate(database, "14", { add: [colaBig2, redBull0], remove: [] }), /quantity/);
        deepEqual(orders.ordersRead(database, "14"), []);
    }
);

test(
    "An article missing in the menu changes nothing",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] });
        throws((): void => orders.ordersUpdate(database, "14", { add: [pizza1], remove: [colaBig1] }), /menu/);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);

test(
    "Only portions from before an update can be removed",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] });
        throws((): void => orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [colaBig2] }), /remove/);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);

test(
    "A free table has nothing to remove or to close",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig2], remove: [] });
        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        throws((): void => orders.ordersUpdate(database, "14", { add: [], remove: [colaBig1] }), /remove/);
        throws((): void => orders.tableClose(database, "14"), /open/);
    }
);
