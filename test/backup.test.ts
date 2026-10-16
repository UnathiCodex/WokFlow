/**
 * ## Backup test
 *
 * Checks that a backup file holds the orders of the database.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `node:fs`: Works with files and folders on the disk.
 * - `node:path`: Builds file paths for the operating system.
 * - `node:os`: Gives the folder for temporary files of the operating system.
 */

import { test, beforeEach, afterEach } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { backupWrite } from "../src/backup/backup.ts";
import { ordersUpdate, ordersRead } from "../src/tables/orders.ts";
import { databaseTest, colaBig1 } from "./setup.ts";
import type { Order } from "../src/tables/orders.ts";


let database: DatabaseSync;
let folder: string;

// Fresh database in memory and fresh temporary folder before each test
beforeEach((): void => {
    database = databaseTest();
    folder = mkdtempSync(join(tmpdir(), "wokflow-"));
});

// Temporary folder with its backup files removed after each test
afterEach((): void => { rmSync(folder, { recursive: true }); });


test(
    "A backup in a new folder is named after the UTC time and holds the orders",
    (): void => {
        ordersUpdate(database, "14", { add: [colaBig1], remove: [] });

        const time: Date = new Date("2026-09-22T20:30:15+02:00");
        const file: string = backupWrite(database, join(folder, "new"), time);
        equal(file, join(folder, "new", "wokflow-2026-09-22T18-30.db"));

        const copy: DatabaseSync = new DatabaseSync(file);
        const orders: Order[] = ordersRead(copy, "14");
        copy.close();
        deepEqual(orders, [colaBig1]);
    }
);
