/**
 * ## Articles
 *
 * - Defines article names, variants, tax exceptions.
 * - Stores variant prices as Dinero amounts, including tax.
 *
 * ### Modules
 * - {@link dinero}: Function used to create a money object.
 * - {@link EUR}: Currency constant used to create prices in euros.
 * - {@link Dinero}: Type used by TypeScript to check variant prices.
 */

import { dinero, EUR } from "dinero.js";
import type { Dinero } from "dinero.js";

/**
 * One sellable item from the restaurant menu.
 *
 * - `name`: German and Chinese names used by staff.
 * - `variants`: Available servings or choices, each with its own price.
 * - `tax`: Tax rate override in percent; omitted to use the category rate.
 */
export type Article = {
    name: { de: string; zh: string; };
    variants: Variant[];
    tax?: number;
};

/**
 * One selectable serving or choice of an article.
 *
 * - `name`: German and Chinese labels, null for a single unnamed variant.
 * - `price`: Gross price as a Dinero amount in euros.
 */
export type Variant = {
    name: { de: string; zh: string; } | null;
    price: Dinero<number, "EUR">;
};

export const lunchAdult: Article = {
    name: { de: "Mittagsbuffet Erwachsene", zh: "成人午餐自助餐" },
    variants: [
        { name: null, price: dinero({ amount: 1590, currency: EUR }) },
    ],
};

export const spicySoup: Article = {
    name: { de: "Pikante Suppe", zh: "酸辣汤" },
    variants: [
        { name: null, price: dinero({ amount: 350, currency: EUR }) },
    ],
};

export const cola: Article = {
    name: { de: "Cola", zh: "可乐" },
    variants: [
        { name: { de: "0.5", zh: "0.5" }, price: dinero({ amount: 450, currency: EUR }) },
    ],
};

export const tea: Article = {
    name: { de: "Tee", zh: "茶" },
    variants: [
        { name: { de: "Grün", zh: "绿茶" }, price: dinero({ amount: 370, currency: EUR }) },
    ],
};

export const coffee: Article = {
    name: { de: "Kaffee", zh: "咖啡" },
    variants: [
        { name: { de: "Klein", zh: "小" }, price: dinero({ amount: 300, currency: EUR }) },
    ],
};
