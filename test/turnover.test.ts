/**
 * ## Turnover test
 *
 * Checks the turnover per tax rate against an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test, beforeEach } from "node:test";
import { deepEqual } from "node:assert/strict";
import { ordersUpdate, ordersPay, tableClose } from "../src/tables/orders.ts";
import { turnoverOf } from "../src/closing/turnover.ts";
import { databaseTest, colaBig1, colaBig2, redBull1 } from "./setup.ts";

import type { DatabaseSync } from "node:sqlite";
import type { OrderNew } from "../src/tables/orders.ts";


/**
 * Start of 16.10.2026 in UTC, the first moment of the range.
 */
const from: string = "2026-10-16T00:00:00.000Z";

/**
 * Start of 17.10.2026 in UTC, the first moment after the range.
 */
const to: string = "2026-10-17T00:00:00.000Z";

/**
 * Miso Suppe at 4,10 € with 10 %, the drinks of the setup have 20 %.
 */
const soup1: OrderNew = { articleId: "Miso Suppe", variantId: null, quantity: 1 };

/**
 * Two Miso Suppe.
 */
const soup2: OrderNew = { ...soup1, quantity: 2 };

let database: DatabaseSync;

// Fresh database in memory before each test
beforeEach((): void => { database = databaseTest(); });


/**
 * Sets the `closed` time of the paid portions of a table, as a test cannot wait for another day.
 *
 * @param tableId - Table identifier
 * @param closed - ISO time in UTC
 */
function closedSet(tableId: string, closed: string): void {
    database.prepare(`
        UPDATE orders
        SET closed = ?
        WHERE table_id = ?
          AND closed IS NOT NULL
    `).run(closed, tableId);
}


test(
    "Turnover sums the paid portions of the range for each tax rate",
    (): void => {
        ordersUpdate(database, "14", { add: [soup2, redBull1], remove: [] });
        tableClose(database, "14");
        closedSet("14", from);

        ordersUpdate(database, "G3", { add: [soup1, colaBig2], remove: [] });
        ordersPay(database, "G3", [soup1, colaBig1]);
        closedSet("G3", "2026-10-16T12:00:00.000Z");

        ordersUpdate(database, "12", { add: [soup1, redBull1], remove: [] });
        tableClose(database, "12");
        closedSet("12", to);

        ordersUpdate(database, "7", { add: [soup1, redBull1], remove: [] });
        tableClose(database, "7");
        closedSet("7", "2026-10-15T23:59:59.999Z");

        deepEqual(turnoverOf(database, from, to), [
            { tax: 10, gross: 1230 },
            { tax: 20, gross: 850 },
        ]);
    }
);
