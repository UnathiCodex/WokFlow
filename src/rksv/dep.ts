/**
 * ## DEP
 *
 * Data collection protocol of the RKSV.
 * Stores every receipt of the cash register in order.
 *
 * ```
 * number | jws | state
 * ```
 */

import type { DatabaseSync } from "node:sqlite";
import { fdatasync } from "node:fs";

/**
 * One receipt in the DEP.
 *
 * - `number`: Receipt number, never used twice.
 * - `jws`: Signed receipt with header, data line, signature.
 * - `state`: Counter including this receipt in cents, unencrypted.
 */
export type DepEntry = {
    number: number;
    jws: string;
    state: number;
};

/**
 * Creates the DEP database table.
 *
 * @param database - Open database
 */
export function depDatabaseCreate(database: DatabaseSync): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS dep (
            number INTEGER PRIMARY KEY,
            jws TEXT NOT NULL,
            state INTEGER NOT NULL
        ) STRICT;

        CREATE TRIGGER IF NOT EXISTS dep_no_update
            BEFORE UPDATE ON dep
            BEGIN SELECT RAISE(ABORT, 'DEP entries cannot be changed'); END;

        CREATE TRIGGER IF NOT EXISTS dep_no_delete
            BEFORE DELETE ON dep
            BEGIN SELECT RAISE(ABORT, 'DEP entries cannot be deleted'); END;                                                                
    `);
}

/**
 * Appends a receipt to the DEP.
 *
 * @param database - Open database
 * @param entry - Receipt with number, JWS, counter
 */
export function depAppend(database: DatabaseSync, entry: DepEntry): void {
    database.prepare("INSERT INTO dep (number, jws, state) VALUES (?, ?, ?)")
        .run(entry.number, entry.jws, entry.state);
}

/**
 * Reads the last receipt of the DEP.
 *
 * @param database - Open database
 * @returns Last receipt, null when the DEP is still empty
 */
export function depLast(database: DatabaseSync): DepEntry | null {
    const row = database.prepare("SELECT number, jws, state " +
        "FROM dep " +
        "ORDER BY number " +
        "DESC LIMIT 1")
        .get() as DepEntry | undefined;
    if (row === undefined)
        return null;
    return {number: row.number, jws: row.jws, state: row.state };
}

/**
 * Reads all receipt of the DEP in their order.
 *
 * @param database - Open database
 * @returns Every JWS, oldest first
 */
export function depRead(database: DatabaseSync): string[] {
    const rows = database
        .prepare("SELECT jws FROM dep ORDER BY number ASC")
        .all() as { jws: string; }[];
    return rows.map((row: { jws: string; }): string => row.jws);
}