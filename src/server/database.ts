/**
 * ## Database
 *
 * Opens and manages the local SQLite database.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `node:path`: Builds file paths for the operating system.
 */

import { DatabaseSync } from "node:sqlite";
import { join } from "node:path";


/**
 * Opens and returns a connection to the local SQLite database.
 * Absolute path to the SQLite database file is built with the operating system's path rules.
 *
 * @returns {@link DatabaseSync} connection object
 */
export function databaseOpen(): DatabaseSync {
    const databasePath: string = join(import.meta.dirname, "../../wokflow.db");
    return new DatabaseSync(databasePath);
}
