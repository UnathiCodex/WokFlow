/**
 * ## Orders
 *
 * Stores the orders of the tables in SQLite, one row for each portion.
 *
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 * - `./orderbook.ts`: Creates the database table of the orders.
 */

import { entryOf } from "../catalog/menu.ts";
import { transaction } from "./orderbook.ts";

import type { DatabaseSync, StatementResultingChanges } from "node:sqlite";
import type { MenuEntry } from "../catalog/menu.ts";
import type { Article, Variant } from "../catalog/articles.ts";


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
 * Also names the portions to remove in {@link orderRemove}.
 */
export type OrderNew = Omit<Order, "price" | "tax">;

/**
 * Update of the {@link Order}s of a table, as the phone sends it.
 *
 * - `add`: Orders to add.
 * - `remove`: Variants with the quantity to remove.
 */
export type OrdersUpdate = {
    add: OrderNew[];
    remove: OrderNew[];
};

/**
 * Turns an {@link OrderNew} into an {@link Order}
 * with price and tax rate from {@link MenuEntry}.
 *
 * @param order - Order chosen on the phone
 * @returns Order ready to save
 * @throws {Error} - When {@link entryOf} finds no such article or variant
 */
export function orderOf(order: OrderNew): Order {
    const entry: MenuEntry = entryOf(order.articleId, order.variantId);
    return { ...order, price: entry.price, tax: entry.tax };
}

/**
 * Adds an {@link Order} to a table, one row for each portion,
 * with price and tax rate from {@link orderOf}.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @param orderNew - Order to add
 * @throws {Error} - When the order has no menu entry or no valid quantity
 */
function orderAdd(database: DatabaseSync, tableId: string, orderNew: OrderNew): void {
    const order: Order = orderOf(orderNew);
    if (!Number.isInteger(order.quantity) || order.quantity < 1)
        throw new Error(`${order.articleId} needs a valid quantity of at least 1`);

    for (let portion: number = 1; portion <= order.quantity; portion++)
        database.prepare(`
            INSERT INTO orders (table_id, article_id, variant_id, price, tax)
            VALUES (?, ?, ?, ?, ?)
        `).run(tableId, order.articleId, order.variantId, order.price, order.tax);
}

/**
 * Remove portions of a variant off a table.
 * Takes the newest portions of a variant first, so {@link ordersRead} keeps its order.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @param order - Variant with the quantity to remove
 * @throws {Error} - When table has too few open portions to remove
 */
function orderRemove(database: DatabaseSync, tableId: string, order: OrderNew): void {
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
}

/**
 * Updates a table as the phone sends it, all of it or nothing.
 * Removes portions with {@link orderRemove} first,
 * so only portions from before this update can be removed,
 * then adds the new orders with {@link orderAdd}.
 *
 * @param database - Open database
 * @param tableId - Table identifier
 * @param update - Orders to add and variants to remove
 * @throws {Error} - When a part of the update throws
 */
export function ordersUpdate(database: DatabaseSync, tableId: string, update: OrdersUpdate): void {
    transaction(database, (): void => {
        update.remove.forEach((order: OrderNew): void => orderRemove(database, tableId, order));
        update.add.forEach((order: OrderNew): void => orderAdd(database, tableId, order));
    });
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
 * @throws {Error} - When the table has no open orders
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

