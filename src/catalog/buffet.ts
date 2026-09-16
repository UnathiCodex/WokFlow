/**
 * ## Buffet
 *
 * - `./articles.ts`: Defines the article type with its variants.
 */

import { article, variant } from "./articles.ts";
import type { Article, Variant } from "./articles.ts";


export const buffetSmall: Variant[] = [
    variant("Erwachsene", "成人", 1590),
    variant("6–9", "儿童", 990),
    variant("3–5", "小童", 590),
];

export const buffetBig: Variant[] = [
    variant("Erwachsene", "成人", 1990),
    variant("6–9", "儿童", 1290),
    variant("3–5", "小童", 790),
];

export const buffets: Article[] = [
    article("Mittagsbuffet", "午餐自助", buffetSmall),
    article("Abendbuffet", "晚餐自助", buffetBig),
    article("Sonntagsbuffet", "周日自助餐", buffetBig),
    article("Feiertagsbuffet", "节假日自助餐", buffetBig),
];
