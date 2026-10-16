/**
 * ## Payments
 *
 * Stores the payments of the tables in SQLite, one row for each payment.
 */

import type { DatabaseSync } from "node:sqlite";


/**
 * How a guest paid: with `cash`, with `card` as Nexi confirmed it or with a `voucher`.
 */
export type PaymentKind = "cash" | "card" | "voucher";

/**
 * A payment of a table.
 *
 * - `tableId`: Table identifier.
 * - `kind`: {@link PaymentKind} of the payment.
 * - `amount`: Paid amount in cents.
 * - `time`: Time of the payment as ISO text.
 */
export type Payment = {
    tableId: string;
    kind: PaymentKind;
    amount: number;
    time: string;
};

/**
 * Creates the `payments` table when it is missing.
 * Each row is one {@link Payment}, SQLite refuses any other `kind`.
 * A tip is not stored.
 *
 * @param database - Open database
 */
export function paymentsCreate(database: DatabaseSync): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS payments
        (
            id       INTEGER PRIMARY KEY,
            table_id TEXT    NOT NULL,
            kind     TEXT    NOT NULL CHECK (kind IN ('cash', 'card', 'voucher')),
            amount   INTEGER NOT NULL,
            time     TEXT    NOT NULL
        ) STRICT;
    `);
}

/**
 * Adds a {@link Payment}.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param payment - Payment to add
 * @throws {Error} - When the kind is none of the {@link PaymentKind}s
 */
export function paymentAdd(database: DatabaseSync, payment: Payment): void {
    database.prepare(`
        INSERT INTO payments (table_id, kind, amount, time)
        VALUES (?, ?, ?, ?)
    `).run(payment.tableId, payment.kind, payment.amount, payment.time);
}

/**
 * Reads the {@link Payment}s of a time range.
 * Copies each row into a normal object, as SQLite returns bare rows.
 *
 * @param database - Open database
 * @param from - Start of the range as ISO text, included
 * @param to - End of the range as ISO text, excluded
 * @returns Payments in the order of their time
 */
export function paymentsOf(database: DatabaseSync, from: string, to: string): Payment[] {
    const entries = database.prepare(`
        SELECT table_id AS tableId, kind, amount, time
        FROM payments
        WHERE time >= ?
          AND time < ?
        ORDER BY time
    `).all(from, to) as Payment[];

    return entries.map((entry: Payment): Payment => ({ ...entry }));
}
