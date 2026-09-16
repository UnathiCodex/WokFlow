/**
 * ## Orders
 *
 * Stores the orders of the tables in SQLite, each with name, price, tax rate as they were at booking time.
 * Orders are saved when the phone sends them.
 * An order is open until its table is closed and then stays stored for the records.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `dinero.js`: Handles money amounts with currency.
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 * - `../catalog/articles.ts`: Defines the article type with its variants.
 */

import { toSnapshot } from "dinero.js";
import { taxOf } from "../catalog/menu.ts";
import type { DatabaseSync, StatementResultingChanges } from "node:sqlite";
import type { Category } from "../catalog/menu.ts";
import type { Article, Variant } from "../catalog/articles.ts";


/**
 * A order of a table: A variant of an article with its quantity.
 *
 * - `article`: German article name, the identity of the article.
 * - `variant`: German variant name, null when the article has no choice.
 * - `price`: Gross price of one portion, fixed at booking time.
 * - `tax`: Tax rate in percent, fixed at booking time.
 */
export type Order = {
    article: string;
    variant: string | null;
    quantity: number;
    price: number;
    tax: number;
};

/**
 * An order chosen on the phone that is not saved yet.
 *
 * - `category`: Main category of the article, gives the tax rate.
 * - `variant`: Chosen variant, gives the name and the price.
 */
export type OrderNew = {
    category: Category;
    article: Article;
    variant: Variant;
    quantity: number;
};


/**
 * Creates the `orderbook` table when it is missing.
 * An `order` is open while `closed` is null.
 * The index finds the open orders automatically by SQLite by `closed`.
 *
 * @param database - Open database
 */
export function orderbookCreate(database: DatabaseSync): void {
    database.exec(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            table_id TEXT NOT NULL,
            article TEXT NOT NULL,
            variant TEXT,
            quantity INTEGER NOT NULL CHECK (quantity > 0),
            price INTEGER NOT NULL,
            tax INTEGER NOT NULL,
            closed TEXT
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


//#region Ordering

/**
 * Saves the orders that the phone sends for a table.
 * Each sending adds new orders, even for a variant the table already has,
 * so only the new portions get printed.
 *
 * @param database - Open database
 * @param table_id - Table identifier
 * @param orders - Orders chosen on the phone
 */
export function ordersSend(database: DatabaseSync, table_id: string, orders: OrderNew[]): void {
    function work(): void {
        orders.forEach((order: OrderNew): void => {
            database.prepare(`
                INSERT INTO orders (table_id, article, variant, quantity, price, tax)
                VALUES (?, ?, ?, ?, ?, ?)
            `).run(
                table_id,
                order.article.name.de,
                order.variant.name?.de ?? null,
                order.quantity,
                toSnapshot(order.variant.price).amount,
                taxOf(order.category, order.article));
        });
    }

    transaction(database, work);
}

/**
 * Takes one portion of a variant off a table, from its newest order first.
 * An order loses its last portion by being deleted.
 *
 * @param database - Open database
 * @param table_id - Table identifier
 * @param article - German article name
 * @param variant - German variant name (nullable)
 */
export function orderRemove(database: DatabaseSync, table_id: string, article: string, variant: string | null): void {
    function work(): void {
        const order = database.prepare(`
            SELECT id, quantity 
            FROM orders
            WHERE table_id = ? AND closed IS NULL AND article = ? AND variant IS ?
            ORDER BY id DESC
        `).get(table_id, article, variant) as { id: number; quantity: number; } | undefined;

        if (order === undefined)
            throw new Error(`Table ${table_id} has no portion of ${article} to remove`);
        else if (order.quantity === 1)
            database.prepare("DELETE FROM orders WHERE id = ?").run(order.id);
        else
            database.prepare("UPDATE orders SET quantity = quantity - 1 WHERE id = ?").run(order.id);
    }

    transaction(database, work);
}

/**
 * Copies each row into a normal object, as SQLite returns bare rows
 *
 * @param database - Open database
 * @param table_id - Table identifier
 * @returns Open orders of a table in booking order, none when the table is free
 */
export function ordersRead(database: DatabaseSync, table_id: string): Order[] {
    const entries = database.prepare(`
        SELECT article, variant, quantity, price, tax 
        FROM orders
        WHERE table_id = ? AND closed IS NULL ORDER BY id ASC
    `).all(table_id) as Order[];

    return entries.map((entry: Order): Order => ({ ...entry }));
}

/**
 * Closes a table by marking its open orders as closed.
 * Orders stay stored for the records.
 * One statement is a transaction on its own.
 *
 * @param database - Open database
 * @param table_id - Table identifier
 */
export function tableClose(database: DatabaseSync, table_id: string): void {
    const closed: StatementResultingChanges = database
        .prepare("UPDATE orders SET closed = ? WHERE table_id = ? AND closed IS NULL")
        .run(new Date().toISOString(), table_id);
    if (closed.changes === 0)
        throw new Error(`Table ${table_id} has no open orders`);
}

//#endregion Ordering
