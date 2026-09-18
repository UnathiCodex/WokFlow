/**
 * ## Menu
 *
 * Groups the restaurant articles and defines category tax rates.
 *
 * - `./buffet.ts`: Defines the buffet articles.
 * - `./food.ts`: Defines the food articles.
 * - `./drinks.ts`: Defines the drink articles.
 * - `dinero.js`: Handles money amounts with currency.
 */

import { toSnapshot } from "dinero.js";
import * as articlesBuffet from "./buffet.ts";
import * as articlesFood from "./food.ts";
import * as articlesDrink from "./drinks.ts";
import type { Article, Variant } from "./articles.ts";


//#region Menu

/**
 * Groups of {@link Article}s of one main {@link Category}.
 */
export type Groups = {
    [name: string]: Article[]
};

/**
 * One main category with its default tax rate and article {@link Groups}.
 *
 * - `tax`: Default tax rate in percent.
 * - `print`: Whether orders of this category are printed on the order ticket.
 * - `groups`: Groups of articles in this category.
 */
export type Category = {
    tax: number;
    print: boolean;
    groups: Groups;
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
 * {@link Menu} groups with the default tax rate for each main {@link Category}.
 * The group `extras` holds additions like the lemon, which the screen does not show as a group.
 */
export const menu: Menu = {
    buffet: {
        tax: 10,
        print: false,
        groups: {
            buffets: articlesBuffet.buffets,
        },
    },
    food: {
        tax: 10,
        print: true,
        groups: {
            soups: articlesFood.soups,
            salads: articlesFood.salads,
            snacks: articlesFood.snacks,
            sushi: articlesFood.sushi,
            maki: articlesFood.maki,
            seafood: articlesFood.seafood,
            vegetables: articlesFood.vegetables,
            chicken: articlesFood.chicken,
            duck: articlesFood.duck,
            beef: articlesFood.beef,
            pork: articlesFood.pork,
            rice: articlesFood.rice,
            noodles: articlesFood.noodles,
        },
    },
    drinks: {
        tax: 20,
        print: true,
        groups: {
            lemonades: articlesDrink.lemonades,
            juices: articlesDrink.juices,
            water: articlesDrink.water,
            beer: articlesDrink.beer,
            wines: articlesDrink.wines,
            warmDrinks: articlesDrink.warmDrinks,
            spirits: articlesDrink.spirits,
            extras: [articlesDrink.lemon],
        },
    },
};

//#endregion Menu


//#region Lookup

/**
 * One variant of the {@link menu} with everything an order needs.
 *
 * - `articleId`: German article name.
 * - `variantId`: German variant name (nullable).
 * - `price`: Gross price of one portion.
 * - `tax`: Tax rate in percent.
 */
export type MenuEntry = {
    articleId: string;
    variantId: string | null;
    price: number;
    tax: number;
};

/**
 * Every variant of the {@link Menu} as {@link MenuEntry} in one flat list.
 * Built once when this menu file loads.
 */
const entries: MenuEntry[] =
    Object.values(menu).flatMap((category: Category): MenuEntry[] => {
        return Object.values(category.groups).flat().flatMap((article: Article): MenuEntry[] => {
            return article.variants.map((variant: Variant): MenuEntry => {
                return {
                    articleId: article.name.de,
                    variantId: variant.name?.de ?? null,
                    price: toSnapshot(variant.price).amount,
                    tax: article.name.de === "Leitungswasser" ? 10 : category.tax,
                };
            });
        });
    });

/**
 * {@link MenuEntry} of a variant.
 *
 * @param articleId - German article name
 * @param variantId - German variant name (nullable)
 * @returns {@link MenuEntry} with price and tax rate
 * @throws {Error} - When the menu has no such article or variant
 */
export function entryOf(articleId: string, variantId: string | null): MenuEntry {
    const entry: MenuEntry | undefined = entries.find((e: MenuEntry): boolean =>
        e.articleId === articleId && e.variantId === variantId,
    );
    if (entry === undefined)
        throw new Error(`The menu has no ${articleId} ${variantId}`);
    return entry;
}

//#endregion Lookup
