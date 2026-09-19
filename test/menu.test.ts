/**
 * ## Menu test
 *
 * Checks the prices and tax rates that {@link entryOf} finds in the {@link menu}.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `dinero.js`: Handles money amounts with currency.
 */

import { test } from "node:test";
import { equal, throws } from "node:assert/strict";
import { toSnapshot } from "dinero.js";
import { menu, entryOf } from "../src/catalog/menu.ts";

import type { Article, Variant } from "../src/catalog/articles.ts";
import type { Category } from "../src/catalog/menu.ts";


test(
    "Every variant of the menu has its own price",
    (): void => {
        Object.values(menu).forEach((category: Category): void => {
            Object.values(category.groups).flat().forEach((article: Article): void => {
                article.variants.forEach((variant: Variant): void => {
                    equal(
                        entryOf(article.name.de, variant.name?.de ?? null).price,
                        toSnapshot(variant.price).amount,
                    );
                });
            });
        });
    }
);

test(
    "The tax rate comes from the category",
    (): void => {
        equal(entryOf("Cola", "0.5").tax, menu.drinks.tax);
        equal(entryOf("Pikante Suppe", null).tax, menu.food.tax);
    }
);

test(
    "Tap water is taxed like food",
    (): void => {
        equal(entryOf("Leitungswasser", "0.25").tax, menu.food.tax);
    }
);

test(
    "Unknown articles and variants are rejected",
    (): void => {
        throws((): void => { entryOf("Cola", "0.3"); }, /menu/);
    }
);
