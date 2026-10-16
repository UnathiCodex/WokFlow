/**
 * ## Order groups
 *
 * Tells which catalog lists form which group row in the drinks and food menus.
 *
 * - `../../../assets/emoji/*.svg`: Noto pictures, packed into built page by Vite as URLs.
 */

import softDrinks from "../../../assets/emoji/soft-drinks.svg";
import juice from "../../../assets/emoji/juice.svg";
import water from "../../../assets/emoji/water.svg";
import beer from "../../../assets/emoji/beer.svg";
import wine from "../../../assets/emoji/wine.svg";
import coffee from "../../../assets/emoji/coffee.svg";
import spirits from "../../../assets/emoji/spirits.svg";
import chicken from "../../../assets/emoji/chicken.svg";
import duck from "../../../assets/emoji/duck.svg";
import beef from "../../../assets/emoji/beef.svg";
import pork from "../../../assets/emoji/pork.svg";
import rice from "../../../assets/emoji/rice.svg";
import noodles from "../../../assets/emoji/noodles.svg";
import seafood from "../../../assets/emoji/seafood.svg";
import sushi from "../../../assets/emoji/sushi.svg";
import maki from "../../../assets/emoji/maki.svg";
import vegetables from "../../../assets/emoji/vegetables.svg";
import soup from "../../../assets/emoji/soup.svg";
import salad from "../../../assets/emoji/salad.svg";
import snacks from "../../../assets/emoji/snacks.svg";


/**
 * One group row of a menu, with the catalog lists it shows.
 *
 * - `lists`: Keys of `menu.drinks.groups` or `menu.food.groups`.
 * - `name`: German and Chinese names of the group.
 * - `picture`: URL of the Noto picture of the group.
 */
export type GroupRow = {
    lists: string[];
    name: { de: string; zh: string; };
    picture: string;
};

/**
 * {@link GroupRow}s of the drinks menu in screen order.
 */
export const groupsDrinks: GroupRow[] = [
    { lists: ["lemonades"], name: { de: "Limonaden", zh: "汽水" }, picture: softDrinks },
    { lists: ["juices"], name: { de: "Säfte", zh: "果汁" }, picture: juice },
    { lists: ["water"], name: { de: "Wasser", zh: "水" }, picture: water },
    { lists: ["beer"], name: { de: "Bier", zh: "啤酒" }, picture: beer },
    { lists: ["wines"], name: { de: "Weine", zh: "葡萄酒" }, picture: wine },
    { lists: ["warmDrinks"], name: { de: "Kaffee & Tee", zh: "咖啡和茶" }, picture: coffee },
    { lists: ["spirits"], name: { de: "Schnaps", zh: "烈酒" }, picture: spirits },
];

/**
 * {@link GroupRow}s of the food menu in screen order.
 */
export const groupsFood: GroupRow[] = [
    { lists: ["chicken"], name: { de: "Huhn", zh: "鸡肉" }, picture: chicken },
    { lists: ["duck"], name: { de: "Ente", zh: "鸭肉" }, picture: duck },
    { lists: ["beef"], name: { de: "Rind", zh: "牛肉" }, picture: beef },
    { lists: ["pork"], name: { de: "Schwein", zh: "猪肉" }, picture: pork },
    { lists: ["rice"], name: { de: "Reis", zh: "米饭" }, picture: rice },
    { lists: ["noodles"], name: { de: "Nudeln", zh: "面条" }, picture: noodles },
    { lists: ["seafood"], name: { de: "Meeresfrüchte", zh: "海鲜" }, picture: seafood },
    { lists: ["sushi"], name: { de: "Sushi", zh: "寿司" }, picture: sushi },
    { lists: ["maki"], name: { de: "Maki", zh: "寿司卷" }, picture: maki },
    { lists: ["vegetables"], name: { de: "Gemüse", zh: "蔬菜" }, picture: vegetables },
    { lists: ["soups"], name: { de: "Suppen", zh: "汤" }, picture: soup },
    { lists: ["salads"], name: { de: "Salate", zh: "沙拉" }, picture: salad },
    { lists: ["snacks"], name: { de: "Snacks", zh: "小吃" }, picture: snacks },
];
