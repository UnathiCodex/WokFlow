/**
 * ## Order item
 *
 * An item ordered from the restaurant menu.
 *
 * ### Modules
 * - {@link Article}: Type used to identify the ordered product.
 * - {@link Variant}: Type used to record the selected serving and price.
 */

import type { Article, Variant } from "../catalog/articles.ts";

/**
 * One line of an order.
 *
 * - `article`: The article ordered by the guest.
 * - `variant`: The selected serving or choice.
 * - `quantity`: Number of units ordered.
 */
export type OrderItem = {
    article: Article;
    variant: Variant;
    quantity: number;
};
