/**
 * ## Queue test
 *
 * Checks the print queue against an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { test, beforeEach } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import * as queue from "../src/print/queue.ts";


/**
 * Bytes of the first job, short as they are only stored and read back.
 */
const bytes1: Uint8Array = new Uint8Array([1, 2, 3]);

/**
 * Bytes of the second job.
 */
const bytes2: Uint8Array = new Uint8Array([4, 5]);

let database: DatabaseSync;

// Fresh database in memory with the print queue before each test
beforeEach((): void => {
    database = new DatabaseSync(":memory:");
    queue.queueCreate(database);
});


test(
    "Jobs are printed from the oldest, a failed job stays the next one",
    (): void => {
        queue.jobAdd(database, bytes1);
        queue.jobAdd(database, bytes2);
        deepEqual(queue.jobNext(database), { id: 1, bytes: bytes1, tries: 0, error: null });

        queue.jobPrinted(database, 1);
        deepEqual(queue.jobNext(database), { id: 2, bytes: bytes2, tries: 0, error: null });

        queue.jobFailed(database, 2, "Paper out");
        deepEqual(queue.jobNext(database), { id: 2, bytes: bytes2, tries: 1, error: "Paper out" });

        queue.jobPrinted(database, 2);
        equal(queue.jobNext(database), null);
    }
);
