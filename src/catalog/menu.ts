/**
 * ## Menu
 *
 * Groups the restaurant articles and defines category tax rates.
 *
 * - `./articles.ts`: Defines the article type with its variants.
 * - `./buffet.ts`: Defines the buffet articles.
 * - `./food.ts`: Defines the food articles.
 * - `./drinks.ts`: Defines the drink articles.
 */

import {
    buffets
} from "./buffet.ts";

import {
    soups, salads, snacks, sushi, maki, seafood, vegetables, chicken, duck, beef, pork, rice, noodles,
} from "./food.ts";

import {
    lemonades, juices, water, beer, wines, warmDrinks, spirits
} from "./drinks.ts";

import type { Article } from "./articles.ts";


/**
 * One main category with its default tax rate and article groups.
 *
 * - `tax`: Default tax rate in percent.
 * - `print`: Whether orders of this category are printed on the order ticket.
 * - `groups`: Groups of articles in this category.
 */
export type Category = {
    tax: number;
    print: boolean;
    groups: { [name: string]: Article[] };
};

/**
 * The three main categories of the restaurant menu.
 */
export type Menu = {
    buffet: Category;
    food: Category;
    drinks: Category;
};

/**
 * Menu groups with the default tax rate for each main category.
 */
export const menu: Menu = {
    buffet: {
        tax: 10,
        print: false,
        groups: {
            buffets,
        },
    },
    food: {
        tax: 10,
        print: true,
        groups: {
            soups, salads, snacks, sushi, maki, seafood, vegetables, chicken, duck, beef, pork, rice, noodles,
        },
    },
    drinks: {
        tax: 20,
        print: true,
        groups: {
            lemonades, juices, water, beer, wines, warmDrinks, spirits,
        },
    },
};

/**
 * Tax rates in % of articles taxed differently from their main category.
 */
const taxExceptions: { [article: string]: number } = {
    Leitungswasser: 10,
};

/**
 * Tax rate of an article in percent.
 *
 * @param category - Main category of the article
 * @param article - Article to look up
 * @returns Tax rate according to the category, otherwise tax rate from {@link taxExceptions}.
 */
export function taxOf(category: Category, article: Article): number {
    return taxExceptions[article.name.de] ?? category.tax;
}
