/**
 * ## Service test
 *
 * Checks the print service against an empty print queue in memory and a test printer.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { test, beforeEach } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { queueCreate, jobAdd, jobNext } from "../src/print/queue.ts";
import { printNext } from "../src/print/service.ts";


/**
 * Bytes of the first job, short as they are only stored and sent.
 */
const bytes1: Uint8Array = new Uint8Array([1, 2, 3]);

/**
 * Bytes of the second job.
 */
const bytes2: Uint8Array = new Uint8Array([4, 5]);

let database: DatabaseSync;
let received: Uint8Array[];
let paperOut: boolean;

// Fresh database in memory with the print queue and a test printer with paper before each test
beforeEach((): void => {
    database = new DatabaseSync(":memory:");
    queueCreate(database);
    received = [];
    paperOut = false;
});


/**
 * Test printer: Remembers the bytes it receives and fails while `paperOut` is set.
 *
 * @param bytes - Bytes of the job
 * @throws {Error} - When `paperOut` is set
 */
async function sendTest(bytes: Uint8Array): Promise<void> {
    received.push(bytes);
    if (paperOut) throw new Error("Paper out");
}

test(
    "Jobs are printed oldest first and a failed one is tried again",
    async (): Promise<void> => {
        jobAdd(database, bytes1);
        jobAdd(database, bytes2);

        paperOut = true;
        equal(await printNext(database, sendTest), false);
        deepEqual(jobNext(database), { id: 1, bytes: bytes1, tries: 1, error: "Paper out" });

        paperOut = false;
        equal(await printNext(database, sendTest), true);
        deepEqual(jobNext(database), { id: 2, bytes: bytes2, tries: 0, error: null });

        equal(await printNext(database, sendTest), true);
        equal(jobNext(database), null);
        deepEqual(received, [bytes1, bytes1, bytes2]);

        equal(await printNext(database, sendTest), false);
        deepEqual(received, [bytes1, bytes1, bytes2]);
    }
);
