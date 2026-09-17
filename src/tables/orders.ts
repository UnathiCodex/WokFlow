/**
 * ## Orders
 *
 * Stores the orders of the tables in SQLite, each with name, price,
 * tax rate as they were at booking time.
 * Orders are saved when the phone sends them, one row for each portion,
 * so a quantity is counted and never stored.
 * A portion is open until its table is closed
 * and then stays stored for the records.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 * - `../catalog/articles.ts`: Defines the article type with its variants.
 */

import { entryOf } from "../catalog/menu.ts";
import type { DatabaseSync, StatementResultingChanges } from "node:sqlite";
import type { MenuEntry } from "../catalog/menu.ts";
import type { Article, Variant } from "../catalog/articles.ts";


//#region Setup

/**
 * A order of a table: A {@link Variant} of an {@link Article} with its quantity.
 *
 * - `articleId`: German article name, the identity of the article.
 * - `variantId`: German variant name (nullable).
 * - `price`: Gross price of one portion, fixed at booking time.
 * - `tax`: Tax rate in percent, fixed at booking time.
 */
export type Order = {
    articleId: string;
    variantId: string | null;
    quantity: number;
    price: number;
    tax: number;
};

/**
 * An {@link Order} chosen on the phone that is not saved yet, without price and tax rate.
 * Also names the portions to take off in {@link ordersRemove}.
 */
export type OrderNew = Omit<Order, "price" | "tax">;


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
 */
function transaction(database: DatabaseSync, work: () => void): void {
    database.exec("BEGIN");
    try {
        work();
        database.exec("COMMIT");
    } catch (error: unknown) {
        database.exec("ROLLBACK");
        throw error;
    }
}

//#endregion Setup


//#region Ordering

/**
 * Turns an {@link OrderNew} into an {@link Order}
 * with price and tax rate from {@link MenuEntry}.
 * {@link entryOf} throws when the menu has no such article or variant.
 *
 * @param order - Order chosen on the phone
 * @returns Order ready to save
 */
export function orderOf(order: OrderNew): Order {
    const entry: MenuEntry = entryOf(order.articleId, order.variantId);
    return { ...order, price: entry.price, tax: entry.tax };
}

/**
 * Saves the {@link Order}s of a table, one row for each portion, all of them or none.
 * Throws when a quantity is not a whole number of at least 1.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @param orderlist - Orders to save, each from {@link orderOf}
 */
export function ordersSend(database: DatabaseSync, tableId: string, orderlist: Order[]): void {
    function work(): void {

        orderlist.forEach((order: Order): void => {
            if (!Number.isInteger(order.quantity) || order.quantity < 1)
                throw new Error(`${order.articleId} needs a valid quantity of at least 1`);

            for (let portion: number = 1; portion <= order.quantity; portion++)
                database.prepare(`
                    INSERT INTO orders (table_id, article_id, variant_id, price, tax)
                    VALUES (?, ?, ?, ?, ?)
                `).run(tableId, order.articleId, order.variantId, order.price, order.tax);
        });
    }

    transaction(database, work);
}

/**
 * Takes portions off a table, all of them or none.
 * Takes the newest portions of a variant first, so {@link ordersRead} keeps its order.
 * Throws when the table has fewer open portions of a variant than the quantity to take off.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @param orderlist - Variants with the quantity to take off
 */
export function ordersRemove(database: DatabaseSync, tableId: string, orderlist: OrderNew[]): void {
    function work(): void {

        orderlist.forEach((order: OrderNew): void => {
            const removed: StatementResultingChanges = database.prepare(`
                DELETE
                FROM orders
                WHERE id IN (SELECT id
                             FROM orders
                             WHERE table_id = ?
                               AND closed IS NULL
                               AND article_id = ?
                               AND variant_id IS ?
                             ORDER BY id DESC
                             LIMIT ?)
            `).run(tableId, order.articleId, order.variantId, order.quantity);

            if (removed.changes !== order.quantity)
                throw new Error(`Not enough ${order.articleId} to remove ${order.quantity}`);
        });
    }

    transaction(database, work);
}

/**
 * Counts the open portions of each variant as its quantity.
 * Copies each row into a normal object, as SQLite returns bare rows.
 * Sorts the {@link Order}s by their oldest open portion,
 * so a variant keeps its place while portions are sent or removed.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @returns Open {@link Order}s of a table in booking order, none when the table is free
 */
export function ordersRead(database: DatabaseSync, tableId: string): Order[] {
    const entries = database.prepare(`
        SELECT article_id AS articleId, variant_id AS variantId, COUNT(*) AS quantity, price, tax
        FROM orders
        WHERE table_id = ?
          AND closed IS NULL
        GROUP BY article_id, variant_id, price, tax
        ORDER BY MIN(id)
    `).all(tableId) as Order[];

    return entries.map((entry: Order): Order => ({ ...entry }));
}

/**
 * Closes a table by marking its open {@link Order}s as closed.
 * Orders stay stored for the records.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 */
export function tableClose(database: DatabaseSync, tableId: string): void {
    const closed: StatementResultingChanges = database
        .prepare(`
            UPDATE orders
            SET closed = ?
            WHERE table_id = ?
              AND closed IS NULL
        `).run(new Date().toISOString(), tableId);

    if (closed.changes === 0)
        throw new Error(`No open orders`);
}

//#endregion Ordering
