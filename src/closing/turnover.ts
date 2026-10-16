/**
 * ## Turnover
 *
 * Sums up the turnover of the paid portions for the day closing.
 */

import type { DatabaseSync } from "node:sqlite";


/**
 * Gross turnover of one tax rate.
 *
 * - `tax`: Tax rate in percent.
 * - `gross`: Sum of the gross prices in cents.
 */
export type Turnover = {
    tax: number;
    gross: number;
};

/**
 * Sums the gross prices of the portions closed in a time range for each tax rate.
 * Net and tax amounts are not computed here, rounding is decided with the bill flow.
 * Open portions have no `closed` time, so they never count.
 * Copies each row into a normal object, as SQLite returns bare rows.
 *
 * @param database - Open database
 * @param from - Start of the range, included, as ISO time in UTC like `closed`
 * @param to - End of the range, excluded, as ISO time in UTC like `closed`
 * @returns {@link Turnover} of each tax rate, ordered by tax rate
 */
export function turnoverOf(database: DatabaseSync, from: string, to: string): Turnover[] {
    const entries = database.prepare(`
        SELECT tax, SUM(price) AS gross
        FROM orders
        WHERE closed >= ?
          AND closed < ?
        GROUP BY tax
        ORDER BY tax
    `).all(from, to) as Turnover[];

    return entries.map((entry: Turnover): Turnover => ({ ...entry }));
}
