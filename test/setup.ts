/**
 * ## Test setup
 *
 * Prepares an empty database in memory for the tests.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { DatabaseSync } from "node:sqlite";
import { orderbookCreate } from "../src/tables/orderbook.ts";


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
