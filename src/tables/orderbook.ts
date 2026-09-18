/**
 * ## Orderbook
 *
 * Creates the database table of the orders and runs SQLite transactions.
 */

import type { DatabaseSync } from "node:sqlite";


/**
 * Creates the `orderbook` table when it is missing.
 * Each row is one portion of an `order`, open while `closed` is null.
 * The index finds the open orders automatically by SQLite by `closed`.
 *
 * @param database - Open database
 */
export function orderbookCreate(database: DatabaseSync): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS orders
        (
            id         INTEGER PRIMARY KEY,
            table_id   TEXT    NOT NULL,
            article_id TEXT    NOT NULL,
            variant_id TEXT,
            price      INTEGER NOT NULL,
            tax        INTEGER NOT NULL,
            closed     TEXT
        ) STRICT;

        CREATE INDEX IF NOT EXISTS tables_open
            ON orders (table_id)
            WHERE closed IS NULL;
    `);
}


/**
 * Runs several orders as one SQLite transaction.
 * - `BEGIN` of the transactions.
 * - `COMMIT` end of the transaction, if everything worked.
 * - `ROLLBACK` undoes every order until BEGIN.
 *
 * @param database - Open database
 * @param work - Changes to run between BEGIN and COMMIT
 * @throws {unknown} - Error of the work thrown again
 */
export function transaction(database: DatabaseSync, work: () => void): void {
    database.exec("BEGIN");
    try {
        work();
        database.exec("COMMIT");
    } catch (error: unknown) {
        database.exec("ROLLBACK");
        throw error;
    }
}
