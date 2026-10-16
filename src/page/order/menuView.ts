/**
 * ## Menu view
 *
 * Shows the drinks or food menu of the order screen, first its group list, then one group.
 *
 * - `./ordered.ts`: Holds the ordered list of an open table on the phone until the way back to the plan.
 */

import { lineAdd, quantityOf } from "./ordered.ts";
import type { Category } from "../../catalog/menu.ts";
import type { Article, Variant } from "../../catalog/articles.ts";
import type { GroupRow } from "./groups.ts";
import type { Line, Ordered } from "./ordered.ts";


/**
 * Makes an element with a class and its children.
 * - {@link Element#append}: Puts the children into the element, texts as text nodes.
 *
 * @param tag - Tag name, like `button`
 * @param className - Class of the element
 * @param children - Elements or texts inside the element
 * @returns The element
 */
function elementOf(tag: string, className: string, ...children: (Node | string)[]): HTMLElement {
    const element: HTMLElement = document.createElement(tag);
    element.className = className;
    element.append(...children);
    return element;
}

/**
 * Makes the Chinese name, which the page shows grey beside or below the German name.
 *
 * @param text - Chinese name
 * @returns Span in Chinese language
 */
function chineseOf(text: string): HTMLElement {
    const chinese: HTMLElement = elementOf("span", "menu-chinese", text);
    chinese.lang = "zh-Hans";
    return chinese;
}

/**
 * Makes the picture of a {@link GroupRow}.
 *
 * @param group - Group row of the menu
 * @returns Image of the group
 */
function pictureOf(group: GroupRow): HTMLImageElement {
    const picture: HTMLImageElement = document.createElement("img");
    picture.className = "menu-picture";
    picture.src = group.picture;
    return picture;
}

/**
 * Makes the text of a counter field: the unpaid quantity of the counted {@link Line}s.
 * - {@link Array#filter}: Keeps the counted lines.
 * - {@link Array#reduce}: Adds up their quantities.
 *
 * @param ordered - Ordered list of the table
 * @param counted - Tells whether a line belongs to the counter
 * @returns The quantity, or an empty text at 0
 */
function countOf(ordered: Ordered, counted: (line: Line) => boolean): string {
    const quantity: number = ordered.lines
        .filter(counted)
        .reduce((sum: number, line: Line): number => sum + quantityOf(line), 0);
    return quantity === 0 ? "" : String(quantity);
}

/**
 * Collects the {@link Article}s of a {@link GroupRow} from the catalog lists it shows.
 *
 * @param category - Drinks or food category of the menu
 * @param group - Group row of the menu
 * @returns Articles of the group in catalog order
 */
function articlesOf(category: Category, group: GroupRow): Article[] {
    return group.lists.flatMap((list: string): Article[] => category.groups[list]);
}

/**
 * Makes the tile of one variant, a tap books one portion.
 * The counter changes at once and the tile flashes by the class `booked`,
 * until its `animationend`.
 * - {@link Element#addEventListener}: Calls the lambda at each tap, or at the end of the flash.
 * - {@link DOMTokenList#add}: Starts the flash.
 * - {@link DOMTokenList#remove}: Ends the flash.
 *
 * @param article - Article of the tile
 * @param variant - Variant of the tile, named by the article itself when it has no choice
 * @param ordered - Ordered list of the table
 * @returns Tile button
 */
function tileOf(article: Article, variant: Variant, ordered: Ordered): HTMLElement {
    const name: { de: string; zh: string; } = variant.name ?? article.name;
    const variantId: string | null = variant.name?.de ?? null;
    const isVariant: (line: Line) => boolean = (line: Line): boolean =>
        line.articleId === article.name.de && line.variantId === variantId;

    const count: HTMLElement = elementOf("span", "menu-count", countOf(ordered, isVariant));
    const tile: HTMLElement = elementOf("button", "menu-tile",
        elementOf("span", "menu-german", name.de), chineseOf(name.zh), count);
    tile.addEventListener("click", (): void => {
        lineAdd(ordered, article.name.de, variantId);
        count.textContent = countOf(ordered, isVariant);
        tile.classList.add("booked");
    });
    tile.addEventListener("animationend", (): void => tile.classList.remove("booked"));
    return tile;
}

/**
 * Makes the tiles of an {@link Article}: one tile, or a heading with the article name
 * and one tile per variant when the article has several.
 * - {@link Array#map}: Turns each variant into a tile.
 *
 * @param article - Article of the group
 * @param ordered - Ordered list of the table
 * @returns Heading and tiles in screen order
 */
function tilesOf(article: Article, ordered: Ordered): HTMLElement[] {
    const tiles: HTMLElement[] = article.variants.map((variant: Variant): HTMLElement =>
        tileOf(article, variant, ordered));
    if (article.variants.length === 1)
        return tiles;
    const heading: HTMLElement =
        elementOf("h3", "menu-names menu-heading", article.name.de, chineseOf(article.name.zh));
    return [heading, ...tiles];
}

/**
 * Makes the heading row of the open food group, a tap leads back to the group list.
 *
 * @param group - Open group row
 * @param listShow - Shows the group list
 * @returns Heading button with the names of the group
 */
function headingOf(group: GroupRow, listShow: () => void): HTMLElement {
    const heading: HTMLElement = elementOf("button", "menu-row menu-back",
        elementOf("span", "menu-names", group.name.de, chineseOf(group.name.zh)));
    heading.addEventListener("click", listShow);
    return heading;
}

/**
 * Makes the bar of the open drinks group: back arrow, then the pictures of all groups.
 * - {@link Element#setAttribute}: Names each button for readers of the screen.
 * - {@link DOMTokenList#toggle}: Marks the open group by the class `selected`.
 *
 * @param rows - Group rows of the menu
 * @param group - Open group row
 * @param listShow - Shows the group list
 * @param groupOpen - Shows another group
 * @returns Bar with a button per group
 */
function barOf(rows: GroupRow[], group: GroupRow, listShow: () => void,
               groupOpen: (group: GroupRow) => void): HTMLElement {

    const back: HTMLElement = elementOf("button", "menu-pick menu-back");
    back.setAttribute("aria-label", "Zurück 返回");
    back.addEventListener("click", listShow);

    const picks: HTMLElement[] = rows.map((other: GroupRow): HTMLElement => {
        const pick: HTMLElement = elementOf("button", "menu-pick", pictureOf(other));
        pick.setAttribute("aria-label", `${other.name.de} ${other.name.zh}`);
        pick.classList.toggle("selected", other === group);
        pick.addEventListener("click", (): void => groupOpen(other));
        return pick;
    });
    return elementOf("nav", "menu-bar", back, ...picks);
}

/**
 * Shows the articles of one group, with a bar of the group pictures in drinks,
 * else with a heading row that leads back. A booking leaves the group open.
 * The view is the drinks view when its id is `drinks`.
 * - {@link Element#replaceChildren}: Puts the new content in place of the old one.
 * - {@link Array#flatMap}: Turns each article into its tiles.
 *
 * @param view - View of the drinks or food tab
 * @param category - Drinks or food category of the menu
 * @param rows - Group rows of the menu
 * @param ordered - Ordered list of the table
 * @param group - Group row to open
 */
function groupShow(view: Element, category: Category, rows: GroupRow[], ordered: Ordered,
                   group: GroupRow): void {

    const listShow: () => void = (): void => menuShow(view, category, rows, ordered);
    const head: HTMLElement = view.id === "drinks"
        ? barOf(rows, group, listShow, (other: GroupRow): void =>
            groupShow(view, category, rows, ordered, other))
        : headingOf(group, listShow);

    const tiles: HTMLElement[] = articlesOf(category, group)
        .flatMap((article: Article): HTMLElement[] => tilesOf(article, ordered));
    view.replaceChildren(head, elementOf("div", "menu-grid", ...tiles));
    view.scrollTop = 0;
}

/**
 * Shows the group list of a menu, one row per {@link GroupRow}.
 * A row shows the picture, the names and the unpaid quantity of the whole group,
 * a tap opens the group. A tab opens here, at the top.
 * - {@link Array#map}: Turns each group row into a button.
 * - {@link Array#includes}: Tells whether a line belongs to the group.
 * - {@link Element#replaceChildren}: Puts the new rows in place of the old content.
 *
 * @param view - View of the drinks or food tab, its id is `drinks` or `food`
 * @param category - Drinks or food category of the menu
 * @param rows - Group rows of the menu
 * @param ordered - Ordered list of the table
 */
export function menuShow(view: Element, category: Category, rows: GroupRow[], ordered: Ordered): void {
    const buttons: HTMLElement[] = rows.map((group: GroupRow): HTMLElement => {
        const articleIds: string[] = articlesOf(category, group)
            .map((article: Article): string => article.name.de);
        const button: HTMLElement = elementOf("button", "menu-row menu-group",
            pictureOf(group),
            elementOf("span", "menu-names", group.name.de, chineseOf(group.name.zh)),
            elementOf("span", "menu-count",
                countOf(ordered, (line: Line): boolean => articleIds.includes(line.articleId))));
        button.addEventListener("click", (): void => groupShow(view, category, rows, ordered, group));
        return button;
    });
    view.replaceChildren(...buttons);
    view.scrollTop = 0;
}
