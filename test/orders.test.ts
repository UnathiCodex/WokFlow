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
import { databaseTest, colaSmall1, colaBig1, colaBig2, colaBig3, redBull0, redBull1 } from "./setup.ts";
import type { DatabaseSync } from "node:sqlite";


let database: DatabaseSync;

// Fresh database in memory before each test
beforeEach((): void => { database = databaseTest(); });


test(
    "Orders and occupied tables are read from first orders to closing",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1, colaSmall1, redBull1], remove: [] });
        orders.ordersUpdate(database, "14", { add: [colaBig2], remove: [] });
        deepEqual(orders.tablesRead(database), ["14"]);

        orders.ordersUpdate(database, "G3", { add: [redBull1], remove: [] });
        deepEqual(orders.ordersRead(database, "14"), [colaBig3, colaSmall1, redBull1]);

        orders.ordersUpdate(database, "14", { add: [], remove: [colaBig2, redBull1] });
        deepEqual(orders.ordersRead(database, "14"), [colaBig1, colaSmall1]);

        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        deepEqual(orders.ordersRead(database, "G3"), [redBull1]);
        deepEqual(orders.tablesRead(database), ["G3"]);
    }
);

test(
    "A quantity below 1 changes nothing",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] });
        throws((): void => orders.ordersUpdate(database, "14", {
            add: [colaBig2, redBull0],
            remove: [colaBig1],
        }), /quantity/);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);

test(
    "Only portions from before an update can be removed",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] });
        throws((): void => orders.ordersUpdate(database, "14", {
            add: [colaBig1],
            remove: [colaBig2],
        }), /remove/);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);

test(
    "A free table has nothing to remove or to close",
    (): void => {
        orders.ordersUpdate(database, "14", { add: [colaBig2], remove: [] });
        orders.tableClose(database, "14");
        deepEqual(orders.ordersRead(database, "14"), []);
        throws((): void => orders.ordersUpdate(database, "14", {
            add: [],
            remove: [colaBig1],
        }), /remove/);
        throws((): void => orders.tableClose(database, "14"), /open/);
    }
);

test(
    "Price and tax rate come from the menu",
    (): void => {
        const colaCheap1: orders.Order = { ...colaBig1, price: 1, tax: 0 };
        orders.ordersUpdate(database, "14", { add: [colaCheap1], remove: [] });
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);
