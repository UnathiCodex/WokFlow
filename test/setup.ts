/**
 * ## Test setup
 *
 * Prepares an empty database in memory for the tests.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 */

import { DatabaseSync } from "node:sqlite";
import * as orders from "../src/tables/orders.ts";


/**
 * Opens an empty database in memory with the `orderbook`.
 *
 * @returns {@link DatabaseSync} connection object
 */
export function databaseTest(): DatabaseSync {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    orders.orderbookCreate(database);
    return database;
}
