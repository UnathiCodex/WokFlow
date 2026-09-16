/**
 * ## Drinks
 *
 * - `./articles.ts`: Defines the article type with its variants.
 */

import { article, variant } from "./articles.ts";
import type { Article, Variant } from "./articles.ts";


//#region Variants

export const variantsFull: Variant[] = [
    variant("0.25", "0.25", 310),
    variant("0.5", "0.5", 450),
    variant("0.3 + Wasser", "0.3 + 水", 330),
    variant("0.5 + Wasser", "0.5 + 水", 400),
    variant("0.3 + Soda", "0.3 + 苏打水", 380),
    variant("0.5 + Soda", "0.5 + 苏打水", 420),
];

export const variantsBottle: Variant[] = [
    variant("Flasche 0.35", "瓶装 0.35", 410),
];

export const variantsJuices: Variant[] = [
    variant("0.2", "0.2", 350),
    variant("0.3 + Wasser", "0.3 + 水", 360),
    variant("0.5 + Wasser", "0.5 + 水", 390),
    variant("0.3 + Soda", "0.3 + 苏打水", 390),
    variant("0.5 + Soda", "0.5 + 苏打水", 430),
];

export const variantsWines: Variant[] = [
    variant("1/8", "1/8", 380),
    variant("1/4", "1/4", 550),
    variant("1/4 + Soda", "1/4 + 苏打水", 400),
    variant("1/2 + Soda", "1/2 + 苏打水", 650),
];

//#endregion Variants


export const lemonades: Article[] = [
    article("Cola", "可乐", [...variantsFull, ...variantsBottle]),
    article("Cola Zero", "零度可乐", [...variantsFull, ...variantsBottle]),
    article("Cola Light", "健怡可乐", variantsBottle),
    article("Spezi", "可乐橙汁", variantsFull),
    article("Fanta", "芬达", [...variantsFull, ...variantsBottle]),
    article("Sprite", "雪碧", [...variantsFull, ...variantsBottle]),
    article("Eistee", "冰茶", variantsFull),
    article("Almdudler", "草本汽水", variantsFull),
    article("Red Bull", "红牛", 400),
];

export const juices: Article[] = [
    article("Apfelsaft", "苹果汁", variantsFull),
    article("Orangensaft", "橙汁", variantsFull),
    article("Erdbeere", "草莓汁", variantsJuices),
    article("Mango", "芒果汁", variantsJuices),
    article("Marille", "杏汁", variantsJuices),
    article("Johannisbeere", "黑加仑汁", variantsJuices),
    article("Aloe Vera", "芦荟汁", [
        variant("0.25", "0.25", 370),
        variant("0.5", "0.5", 510),
    ]),
    article("Lycheesaft", "荔枝汁", [
        variant("0.25", "0.25", 360),
        variant("0.5", "0.5", 460),
    ]),
];

export const water: Article[] = [
    article("Mineralwasser", "矿泉水", [
        variant("prickelnd", "有气", 330),
        variant("still", "无气", 330),
    ]),
    article("Soda", "苏打水", [
        variant("0.25", "0.25", 270),
        variant("0.5", "0.5", 350),
    ]),
    article("Leitungswasser", "自来水", [
        variant("0.25", "0.25", 70),
        variant("0.5", "0.5", 130),
    ]),
];

export const beer: Article[] = [
    article("Villacher", "生啤酒", [
        variant("0.3", "0.3", 410),
        variant("0.5", "0.5", 500),
    ]),
    article("Radler", "啤酒汽水", [
        variant("0.3", "0.3", 410),
        variant("0.5", "0.5", 500),
    ]),
    article("Hefetrüb", "小麦啤酒", [
        variant("0.5", "0.5", 500),
    ]),
    article("Alkoholfrei", "无醇啤酒", [
        variant("0.5", "0.5", 500),
    ]),
    article("Tsingtao", "青岛啤酒", [
        variant("0.33", "0.33", 450),
    ]),
];

export const wines: Article[] = [
    article("Weißwein", "白葡萄酒", variantsWines),
    article("Rotwein", "红葡萄酒", variantsWines),
    article("Aperol Spritz", "阿佩罗", 560),
    article("Hugo", "接骨木酒", 560),
    article("Prosecco", "普罗塞克", 600),
];

export const warmDrinks: Article[] = [
    article("Tee", "茶", [
        variant("Schwarz", "红茶", 370),
        variant("Früchte", "果茶", 370),
        variant("Kamille", "洋甘菊", 370),
        variant("Pfefferminz", "薄荷", 370),
        variant("Jasmin", "茉莉", 370),
        variant("Grün", "绿茶", 370),
    ]),
    article("Kaffee", "咖啡", [
        variant("Klein", "小", 300),
        variant("Groß", "大", 410),
    ]),
    article("Verlängerter", "美式咖啡", 330),
    article("Melange", "奶泡咖啡", 330),
    article("Cappuccino", "卡布奇诺", 400),
    article("Latte Macchiato", "拿铁", 430),
];

export const spirits: Article[] = [
    article("Campari", "金巴利", [
        variant("Orange", "橙汁", 400),
        variant("Soda", "苏打", 400),
    ]),
    article("Whisky", "威士忌", 410),
    article("Wodka", "伏特加", 310),
    article("Bacardi", "百加得", 310),
    article("Underberg", "草本苦酒", 330),
    article("Jägermeister", "野格", 420),
    article("Reisschnaps", "米酒", 410),
    article("Bambusschnaps", "竹叶青", 410),
    article("Wurzelschnaps", "草根酒", 410),
    article("Ginsengschnaps", "人参酒", 410),
    article("Pflaumenwein", "梅酒", 320),
    article("Sake", "清酒", 320),
];

export const lemon: Article = article("Zitrone", "柠檬", 20);
