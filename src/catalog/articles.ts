/**
 * ## Articles
 *
 * Defines the article type with its variants and
 * stores variant prices as Dinero amounts.
 *
 * ### Modules
 * - {@link dinero}: Function used to create a money object.
 * - {@link EUR}: Currency constant used to create prices in euros.
 * - {@link Dinero}: Type used by TypeScript to check variant prices.
 */

import { dinero, EUR } from "dinero.js";
import type { Dinero } from "dinero.js";


//#region Typedefinitions

/**
 * One sellable item from the restaurant menu.
 *
 * - `name`: German and Chinese names used by staff.
 * - `variants`: Available servings or choices, each with its own price.
 */
export type Article = {
    name: { de: string; zh: string; };
    variants: Variant[];
};

/**
 * One selectable serving or choice of an article.
 *
 * - `name`: German and Chinese labels, null when there is no choice.
 * - `price`: Gross price as a Dinero amount in euros.
 */
export type Variant = {
    name: { de: string; zh: string; } | null;
    price: Dinero<number, "EUR">;
};

//#endregion Typedefinitions


//#region Typefactories

/**
 * Creates an article from its names and variants.
 *
 * @param de - German name
 * @param zh - Chinese name
 * @param variants - Servings or choices with prices, or only the price in euro cents without choice
 */
export function article(de: string, zh: string, variants: Variant[] | number): Article {
    if (Array.isArray(variants))
        return { name: { de, zh }, variants };
    const variantSingle: Variant = { name: null, price: dinero({ amount: variants, currency: EUR }) }
    return { name: { de, zh }, variants: [variantSingle] };
}

/**
 * Creates a variant from its names and price.
 *
 * @param de - German name
 * @param zh - Chinese name
 * @param cents - Price in euro cents
 */
export function variant(de: string, zh: string, cents: number): Variant {
    return { name: { de, zh }, price: dinero({ amount: cents, currency: EUR }) };
}

//#endregion Typefactories
