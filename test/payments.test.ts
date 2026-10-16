/**
 * ## Payments test
 *
 * Checks the payments of the tables against an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { test, beforeEach } from "node:test";
import { deepEqual, throws } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { paymentsCreate, paymentAdd, paymentsOf } from "../src/tables/payments.ts";
import type { Payment } from "../src/tables/payments.ts";


let database: DatabaseSync;

// Fresh database in memory before each test
beforeEach((): void => {
    database = new DatabaseSync(":memory:");
    paymentsCreate(database);
});


test(
    "Payments of a time range are read in the order of their time",
    (): void => {
        const cash: Payment =
            { tableId: "14", kind: "cash", amount: 2790, time: "2026-10-16T12:05:00.000Z" };
        const card: Payment =
            { tableId: "G3", kind: "card", amount: 4580, time: "2026-10-16T13:10:00.000Z" };
        const voucher: Payment =
            { tableId: "14", kind: "voucher", amount: 2000, time: "2026-10-16T19:20:00.000Z" };

        paymentAdd(database, voucher);
        paymentAdd(database, cash);
        paymentAdd(database, card);
        deepEqual(paymentsOf(database, "2026-10-16", "2026-10-17"), [cash, card, voucher]);
        deepEqual(paymentsOf(database, cash.time, voucher.time), [cash, card]);
        deepEqual(paymentsOf(database, "2026-10-17", "2026-10-18"), []);
    }
);

test(
    "An unknown kind is refused",
    (): void => {
        const gift = { tableId: "14", kind: "gift", amount: 2790, time: "2026-10-16T12:05:00.000Z" };

        throws((): void => paymentAdd(database, gift as Payment), /kind/);
        deepEqual(paymentsOf(database, "2026-10-16", "2026-10-17"), []);
    }
);
