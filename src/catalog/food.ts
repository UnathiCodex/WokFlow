/**
 * ## Food
 *
 * - `./articles.ts`: Defines the article type with its variants.
 */

import { article, variant } from "./articles.ts";
import type { Article, Variant } from "./articles.ts";


//#region Variants

/**
 * Creates the variants of sushi and maki with piece counts.
 *
 * @param cents1 - Price of 6 pieces
 * @param cents2 - Price of 12 pieces
 */
export function variantPieces(cents1: number, cents2: number): Variant[] {
    return [
        variant("6 Stück", "6个", cents1),
        variant("12 Stück", "12个", cents2),
    ];
}

//#endregion Variants


export const soups: Article[] = [
    article("Pikante Suppe", "酸辣汤", 350),
    article("Miso Suppe", "味噌汤", 410),
];

export const salads: Article[] = [
    article("Sojasprossen Salat", "豆芽沙拉", 350),
    article("Gemischter Salat", "什锦沙拉", 350),
    article("Grüner Salat", "绿叶沙拉", 350),
    article("Pikanter Salat", "辣味沙拉", 350),
];

export const snacks: Article[] = [
    article("Frühlingsrollen", "春卷", 350),
    article("Hummerchips", "虾片", 390),
    article("Gebackene Banane", "炸香蕉", 310),
    article("Knoblauchsauce", "蒜蓉酱", 250),
];

export const sushi: Article[] = [
    article("Sushi-Set klein", "寿司套餐 小", 1290),
    article("Sushi-Set mittel", "寿司套餐 中", 1490),
    article("Sushi-Set groß", "寿司套餐 大", 1690),
    article("Lachs Sushi", "三文鱼寿司", 1290),
];

export const maki: Article[] = [
    article("Lachs Maki", "三文鱼卷", variantPieces(450, 830)),
    article("Gurke Maki", "黄瓜卷", variantPieces(390, 690)),
    article("California Maki", "加州卷", variantPieces(710, 1050)),
    article("Avocado Maki", "牛油果卷", variantPieces(690, 990)),
    article("Futo Maki", "太卷", 1050),
    article("Maki im Set", "什锦卷套餐", 1450),
];

export const seafood: Article[] = [
    article("Meeresfrüchte", "海鲜炒蔬菜", 1590),
    article("Gegrillte Garnelen", "铁板虾", 1990),
    article("Gegrillter Fisch", "铁板鱼配蔬菜", 1590),
    article("Gebackener Tintenfisch", "炸鱿鱼", 590),
    article("Gebackene Garnelen", "炸虾", 620),
];

export const vegetables: Article[] = [
    article("Buddhistische Speise", "罗汉斋", 1190),
    article("Tofu mit Gemüse", "蔬菜豆腐", 1190),
];

export const chicken: Article[] = [
    article("Huhn mit Gemüse", "什锦蔬菜鸡", 1490),
    article("Huhn süß-sauer", "糖醋鸡", 1490),
    article("Sichuan Huhn", "川味鸡", 1490),
    article("Knuspriges Huhn", "香酥鸡", 1490),
    article("Huhn mit Bambus", "竹笋鸡", 1490),
    article("Gong Bao Huhn", "宫保鸡丁", 1490),
    article("Sesam Huhn", "芝麻鸡", 1490),
    article("Thai Curry Chicken", "泰式咖喱鸡", 1490),
];

export const duck: Article[] = [
    article("Knusprige Ente", "香酥鸭", 1690),
];

export const beef: Article[] = [
    article("Rind mit Gemüse", "什锦蔬菜牛肉", 1490),
    article("La-Za Rind", "辣子牛肉", 1490),
    article("Rind mit Zwiebeln", "洋葱牛肉", 1490),
    article("Acht Schätze", "八宝", 1490),
];

export const pork: Article[] = [
    article("Gan-Bian Schwein", "干煸猪肉", 1490),
    article("Fleischtaschen", "饺子", 1490),
];

export const rice: Article[] = [
    article("Reis mit Ei", "蛋炒饭", 1090),
    article("Reis mit Huhn", "鸡肉炒饭", 1190),
    article("Reis mit Garnelen", "虾仁炒饭", 1290),
    article("Gebratener Reis", "炒饭", 550),
    article("Extra Portion Reis", "加饭", 250),
];

export const noodles: Article[] = [
    article("Nudeln mit Gemüse", "蔬菜炒面", 1090),
    article("Nudeln mit Huhn", "鸡肉炒面", 1190),
    article("Gebratene Nudeln", "炒面", 550),
];
