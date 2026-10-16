/**
 * ## Print queue
 *
 * Stores the print jobs in SQLite until they are printed, with the tries and errors as log.
 */

import type { DatabaseSync } from "node:sqlite";


/**
 * A print job: The finished bytes for the printer, kept so a reprint is identical.
 *
 * - `id`: Identifier, grows with each job, so the lowest `id` of the unprinted jobs is the oldest.
 * - `bytes`: What the printer receives.
 * - `tries`: How often printing failed.
 * - `error`: Text of the last failed try (nullable).
 */
export type Job = {
    id: number;
    bytes: Uint8Array;
    tries: number;
    error: string | null;
};

/**
 * Creates the `print_jobs` table when it is missing.
 * Each row is one print job, unprinted while `printed` is null.
 * Jobs stay stored as the log of the printing.
 *
 * @param database - Open database
 */
export function queueCreate(database: DatabaseSync): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS print_jobs
        (
            id      INTEGER PRIMARY KEY,
            bytes   BLOB    NOT NULL,
            created TEXT    NOT NULL,
            printed TEXT,
            tries   INTEGER NOT NULL DEFAULT 0,
            error   TEXT
        ) STRICT;
    `);
}

/**
 * Adds a {@link Job} at the end of the queue.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param bytes - Finished bytes for the printer
 */
export function jobAdd(database: DatabaseSync, bytes: Uint8Array): void {
    database.prepare(`
        INSERT INTO print_jobs (bytes, created)
        VALUES (?, ?)
    `).run(bytes, new Date().toISOString());
}

/**
 * Reads the oldest job that is not printed yet.
 * Copies the row into a normal object, as SQLite returns bare rows.
 * A failed job stays the next one until {@link jobPrinted} marks it.
 *
 * @param database - Open database
 * @returns Oldest unprinted {@link Job}, null when the queue is empty
 */
export function jobNext(database: DatabaseSync): Job | null {
    const job = database.prepare(`
        SELECT id, bytes, tries, error
        FROM print_jobs
        WHERE printed IS NULL
        ORDER BY id
        LIMIT 1
    `).get() as Job | undefined;

    return job === undefined ? null : { ...job };
}

/**
 * Marks a {@link Job} as printed, so {@link jobNext} skips it.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param id - Identifier of the job
 */
export function jobPrinted(database: DatabaseSync, id: number): void {
    database.prepare(`
        UPDATE print_jobs
        SET printed = ?
        WHERE id = ?
    `).run(new Date().toISOString(), id);
}

/**
 * Counts a failed try of a {@link Job} and keeps its error as log.
 * The job stays in the queue.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param id - Identifier of the job
 * @param error - Text of the error
 */
export function jobFailed(database: DatabaseSync, id: number, error: string): void {
    database.prepare(`
        UPDATE print_jobs
        SET tries = tries + 1,
            error = ?
        WHERE id = ?
    `).run(error, id);
}
