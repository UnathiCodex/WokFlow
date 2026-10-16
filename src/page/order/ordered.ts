/**
 * ## Ordered
 *
 * Holds the ordered list of an open table on the phone until the way back to the plan.
 */

import type { OrderNew, OrdersUpdate } from "../../tables/orders.ts";


/**
 * A line of the ordered list: One variant of an article with its portions on the phone.
 * A line keeps its place in the list while its quantity changes, also at quantity 0.
 *
 * - `articleId`: German article name, the identity of the article.
 * - `variantId`: German variant name (nullable).
 * - `sent`: Portions saved on the server.
 * - `removed`: Saved portions to remove when the update is sent.
 * - `added`: Portions to add when the update is sent.
 */
export type Line = {
    articleId: string;
    variantId: string | null;
    sent: number;
    removed: number;
    added: number;
};

/**
 * A minus tap on a {@link Line}, kept so "Rückgängig" can take it back.
 *
 * - `line`: Line of the tap.
 * - `sent`: `true` when the tap took a saved portion, `false` when it took an unsent one.
 */
export type Removal = {
    line: Line;
    sent: boolean;
};

/**
 * The ordered list of an open table.
 * Nothing is sent before the way back to the plan.
 *
 * - `lines`: {@link Line}s in booking order.
 * - `removals`: {@link Removal}s since the table was opened, the newest last.
 */
export type Ordered = {
    lines: Line[];
    removals: Removal[];
};

/**
 * Makes the ordered list from the open orders of the server, without any change yet.
 * Each order becomes a {@link Line} in the same place, its quantity is `sent`.
 *
 * @param orders - Open {@link OrderNew}s of the table from `GET /tables/:table/orders`
 * @returns Ordered list of the table
 */
export function orderedOf(orders: OrderNew[]): Ordered {
    return {
        lines: orders.map((order: OrderNew): Line => ({
            articleId: order.articleId,
            variantId: order.variantId,
            sent: order.quantity,
            removed: 0,
            added: 0,
        })),
        removals: [],
    };
}

/**
 * Adds one portion to the {@link Line} of a variant.
 * A variant that is not in the list yet gets a new line at the end.
 * - {@link Array#find}: Finds the line of the variant.
 * - {@link Array#push}: Puts the new line at the end.
 *
 * @param ordered - Ordered list of the table
 * @param articleId - German article name
 * @param variantId - German variant name, or `null` without a choice
 */
export function lineAdd(ordered: Ordered, articleId: string, variantId: string | null): void {
    let line: Line | undefined = ordered.lines.find((line: Line): boolean =>
        line.articleId === articleId && line.variantId === variantId);
    if (line === undefined) {
        line = { articleId, variantId, sent: 0, removed: 0, added: 0 };
        ordered.lines.push(line);
    }
    line.added++;
}

/**
 * Takes one portion off a {@link Line} with a minus tap.
 * An unsent portion goes first, a saved portion only when no unsent one is left.
 * - {@link Array#push}: Keeps the {@link Removal} for {@link removalUndo}.
 *
 * @param ordered - Ordered list of the table
 * @param line - Line of the list with a quantity above 0
 */
export function lineRemove(ordered: Ordered, line: Line): void {
    const sent: boolean = line.added === 0;
    if (sent)
        line.removed++;
    else
        line.added--;
    ordered.removals.push({ line, sent });
}

/**
 * Takes back the newest {@link Removal}, so its portion is back on the line.
 * - {@link Array#pop}: Takes the newest removal off the list.
 *
 * @param ordered - Ordered list of the table with at least one removal
 */
export function removalUndo(ordered: Ordered): void {
    const removal: Removal = ordered.removals.pop() as Removal;
    if (removal.sent)
        removal.line.removed--;
    else
        removal.line.added++;
}

/**
 * Counts the portions of a {@link Line} as they stand now.
 *
 * @param line - Line of the ordered list
 * @returns Saved portions minus removed ones plus added ones
 */
export function quantityOf(line: Line): number {
    return line.sent - line.removed + line.added;
}

/**
 * Makes the update the phone sends on the way back to the plan.
 * Lines without portions to add or to remove stay out.
 * - {@link Array#filter}: Keeps the lines with portions to add, or to remove.
 * - {@link Array#map}: Turns each kept line into an {@link OrderNew} with that quantity.
 *
 * @param ordered - Ordered list of the table
 * @returns {@link OrdersUpdate} with `added` of the lines as `add` and `removed` as `remove`
 */
export function updateOf(ordered: Ordered): OrdersUpdate {
    return {
        add: ordered.lines
            .filter((line: Line): boolean => line.added > 0)
            .map((line: Line): OrderNew => ({
                articleId: line.articleId,
                variantId: line.variantId,
                quantity: line.added,
            })),
        remove: ordered.lines
            .filter((line: Line): boolean => line.removed > 0)
            .map((line: Line): OrderNew => ({
                articleId: line.articleId,
                variantId: line.variantId,
                quantity: line.removed,
            })),
    };
}
