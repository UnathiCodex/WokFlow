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
 * - `groups`: Groups of articles in this category.
 */
export type Category = {
    tax: number;
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
        groups: {
            buffets,
        },
    },
    food: {
        tax: 10,
        groups: {
            soups, salads, snacks, sushi, maki, seafood, vegetables, chicken, duck, beef, pork, rice, noodles,
        },
    },
    drinks: {
        tax: 20,
        groups: {
            lemonades, juices, water, beer, wines, warmDrinks, spirits,
        },
    },
};

/**
 * Names of drinks taxed like food.
 */
export const reducedTax: string[] = ["Leitungswasser"];
