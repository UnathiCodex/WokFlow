/**
 * ## Catalog
 *
 * Groups the restaurant articles and defines category tax rates.
 *
 * ### Modules
 * - {@link lunchAdult}, {@link spicySoup}, {@link cola}, {@link tea}, {@link coffee}:
 *   Article constants assigned to their menu groups.
 * - {@link Article}: Type used to check the articles in each group.
 */

import { lunchAdult, spicySoup, cola, tea, coffee } from "./articles.ts";
import type { Article } from "./articles.ts";

/**
 * Group of articles indexed by internal names.
 */
export type Group = {
    [name: string]: Article;
};

/**
 * One main category with its default tax rate and article groups.
 *
 * - `tax`: Default tax rate in percent.
 * - `groups`: Groups of articles in this category.
 */
export type Category = {
    tax: number;
    groups: { [name: string]: Group };
};

/**
 * The three main categories of the restaurant menu.
 */
export type Catalog = {
    buffet: Category;
    food: Category;
    drinks: Category;
};

/**
 * Menu groups with the default tax rate for each main category.
 */
export const catalog: Catalog = {
    buffet: {
        tax: 10,
        groups: {
            lunch: { lunchAdult },
        },
    },
    food: {
        tax: 10,
        groups: {
            soups: { spicySoup },
        },
    },
    drinks: {
        tax: 20,
        groups: {
            lemonades: { cola },
            warmDrinks: { tea, coffee },
        },
    },
};
