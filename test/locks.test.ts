/**
 * ## Locks test
 *
 * Checks that a table is open on one device only.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test, beforeEach } from "node:test";
import { equal } from "node:assert/strict";
import { locks, tableLock, tableUnlock, lockDuration } from "../src/tables/locks.ts";
import type { TestContext } from "node:test";


// Empty table-locks before each test
beforeEach((): void => { locks.clear(); });


test(
    "A table is open on one device until it is unlocked",
    (): void => {
        equal(tableLock("14", "phone"), true);
        equal(tableLock("14", "pc"), false);
        equal(tableLock("14", "phone"), true);
        equal(tableLock("G3", "pc"), true);

        tableUnlock("14", "phone");
        equal(tableLock("14", "pc"), true);
    }
);

test(
    "A lock runs out by itself unless its device renews it",
    (t: TestContext): void => {
        t.mock.timers.enable({ apis: ["Date"] }); // clock 0
        tableLock("14", "phone"); // lock obtained (at 0)

        t.mock.timers.tick(lockDuration - 1); // clock 4999
        equal(tableLock("14", "pc"), false); // lock refused (5000 > 4999)
        tableLock("14", "phone"); // lock renewed (at 4999)

        t.mock.timers.tick(lockDuration - 1); // clock 9998
        equal(tableLock("14", "pc"), false); // lock refused (9999 > 9998)

        t.mock.timers.tick(1); // clock 9999
        equal(tableLock("14", "pc"), true); // lock obtained (at 9999)
    }
);

test(
    "Only the device of a lock can unlock it",
    (): void => {
        tableLock("14", "phone"); // phone locked table
        tableUnlock("14", "pc"); // pc unlock does not fire
        equal(tableLock("14", "pc"), false); // phone still locked table
    }
);
