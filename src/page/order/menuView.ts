/**
 * ## Menu view
 *
 * Shows the drinks or food menu of the order screen, first its group list, then one group.
 *
 * - `../element.ts`: Makes elements, the Chinese name and the label of both names.
 * - `../panel.ts`: A window sliding up from below, over a light veil.
 * - `./ordered.ts`: Holds the ordered list of an open table on the phone until the way back to the plan.
 */

import { chineseOf, elementOf, labelOf } from "../element.ts";
import { panelOpen } from "../panel.ts";
import { lineAdd, quantityOf } from "./ordered.ts";

import type { Category } from "../../catalog/menu.ts";
import type { Article, Variant } from "../../catalog/articles.ts";
import type { GroupRow } from "./groups.ts";
import type { Line, Ordered } from "./ordered.ts";


/**
 * German names of the Cola sorts, which share one tile and one size window.
 */
const colaSorts: string[] = ["Cola", "Cola Zero", "Cola Light"];

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
export function countOf(ordered: Ordered, counted: (line: Line) => boolean): string {
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
    const lineOfVariant: (line: Line) => boolean = (line: Line): boolean =>
        line.articleId === article.name.de && line.variantId === variantId;

    const count: HTMLElement = elementOf("span", "menu-count", countOf(ordered, lineOfVariant));
    const tile: HTMLElement = elementOf(
        "button",
        "menu-tile",
        elementOf("span", "menu-german", name.de),
        chineseOf(name.zh),
        count,
    );
    tile.addEventListener("click", (): void => {
        lineAdd(ordered, article.name.de, variantId);
        count.textContent = countOf(ordered, lineOfVariant);
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
 * Joins the {@link Article}s that share one tile and one size window.
 * The {@link colaSorts} stand together at the place of the first, every other article stands alone.
 * - {@link Array#filter}: Keeps the Cola sorts, or the articles that are no later Cola sort.
 * - {@link Array#includes}: Tells whether an article is a Cola sort.
 * - {@link Array#map}: Turns each kept article into its sorts.
 *
 * @param articles - Articles of the group in catalog order
 * @returns Sorts per tile in catalog order, the first sort names the tile
 */
function sortsOf(articles: Article[]): Article[][] {
    const colas: Article[] = articles.filter((article: Article): boolean =>
        colaSorts.includes(article.name.de));
    return articles
        .filter((article: Article): boolean => article === colas[0] || !colas.includes(article))
        .map((article: Article): Article[] => article === colas[0] ? colas : [article]);
}

/**
 * Makes the size tiles of one sort, a tap books one portion like on every {@link tileOf}.
 * - {@link Array#map}: Turns each variant into a tile.
 * - {@link Element#addEventListener}: Calls `bookingDone` after the booking of the tile.
 *
 * @param sort - Article of the sizes
 * @param ordered - Ordered list of the table
 * @param bookingDone - Called after each booking
 * @returns Tile per variant in screen order
 */
function sizesOf(sort: Article, ordered: Ordered, bookingDone: () => void): HTMLElement[] {
    return sort.variants.map((variant: Variant): HTMLElement => {
        const tile: HTMLElement = tileOf(sort, variant, ordered);
        tile.addEventListener("click", bookingDone);
        return tile;
    });
}

/**
 * Makes the content of a size window: the title, the sort buttons when there are several sorts,
 * the size tiles of the selected sort and the lemon button.
 * The lemon button is grey. A booking makes it usable for one tap, a tap books one lemon
 * and makes it grey again, a sort switch makes it grey, and so does a new window.
 * - {@link Array#map}: Turns each sort into a button.
 * - {@link DOMTokenList#toggle}: Marks the selected sort by the class `selected`.
 * - {@link Element#replaceChildren}: Puts the size tiles of the sort in place of the old ones.
 * - {@link lineAdd}: Books the lemon, which has no variant.
 *
 * @param sorts - Articles of the window, the first names it
 * @param ordered - Ordered list of the table
 * @param lemon - Lemon article of the `extras` list
 * @param countShow - Shows the counter of the tile that opened the window, called after each booking
 * @returns Content for {@link panelOpen}
 */
function windowOf(sorts: Article[], ordered: Ordered, lemon: Article,
                  countShow: () => void): HTMLElement {

    const lemonButton: HTMLButtonElement = elementOf(
        "button",
        "menu-lemon",
        `+ ${lemon.name.de} `,
        chineseOf(lemon.name.zh),
    ) as HTMLButtonElement;
    lemonButton.addEventListener("click", (): void => {
        lineAdd(ordered, lemon.name.de, null);
        lemonButton.disabled = true;
    });

    const sizes: HTMLElement = elementOf("div", "menu-grid");
    const picks: HTMLElement[] = sorts.map((sort: Article): HTMLElement => {
        const pick: HTMLElement = elementOf(
            "button",
            "menu-pick menu-sort",
            elementOf("span", "menu-german", sort.name.de),
            chineseOf(sort.name.zh),
        );
        pick.addEventListener("click", (): void => sortShow(sort));
        return pick;
    });

    const sortShow: (sort: Article) => void = (sort: Article): void => {
        picks.forEach((pick: HTMLElement, index: number): void => {
            pick.classList.toggle("selected", sorts[index] === sort);
        });
        lemonButton.disabled = true;
        sizes.replaceChildren(...sizesOf(sort, ordered, (): void => {
            lemonButton.disabled = false;
            countShow();
        }));
    };
    sortShow(sorts[0]);

    return elementOf(
        "div",
        "menu-window",
        elementOf("h3", "menu-names menu-heading", sorts[0].name.de, chineseOf(sorts[0].name.zh)),
        ...(sorts.length > 1 ? [elementOf("nav", "menu-bar", ...picks)] : []),
        sizes,
        lemonButton,
    );
}

/**
 * Makes the tile of an article with several sizes, a tap opens its size window in a panel.
 * The tile shows a small arrow and the unpaid quantity of all its sorts,
 * which changes with every booking in the window.
 * - {@link Element#addEventListener}: Calls the lambda at each tap.
 * - {@link panelOpen}: Opens the window.
 *
 * @param sorts - Articles of the tile, the first names it
 * @param ordered - Ordered list of the table
 * @param lemon - Lemon article of the `extras` list
 * @returns Tile button
 */
function windowTileOf(sorts: Article[], ordered: Ordered, lemon: Article): HTMLElement {
    const articleIds: string[] = sorts.map((sort: Article): string => sort.name.de);
    const lineOfSort: (line: Line) => boolean = (line: Line): boolean =>
        articleIds.includes(line.articleId);

    const count: HTMLElement = elementOf("span", "menu-count", countOf(ordered, lineOfSort));
    const tile: HTMLElement = elementOf(
        "button",
        "menu-tile menu-open",
        elementOf("span", "menu-german", sorts[0].name.de),
        chineseOf(sorts[0].name.zh),
        count,
    );
    const countShow: () => void = (): void => {
        count.textContent = countOf(ordered, lineOfSort);
    };
    tile.addEventListener("click", (): void => panelOpen(windowOf(sorts, ordered, lemon, countShow)));
    return tile;
}

/**
 * Makes the tiles of the Limonaden: a window tile per article with several variants,
 * the tile of {@link tilesOf} for an article without a choice.
 * - {@link Array#flatMap}: Turns each tile's sorts into its tiles.
 *
 * @param category - Drinks category of the menu
 * @param group - Group row of the Limonaden
 * @param ordered - Ordered list of the table
 * @returns Tiles in screen order
 */
function windowTilesOf(category: Category, group: GroupRow, ordered: Ordered): HTMLElement[] {
    const lemon: Article = category.groups.extras[0];
    return sortsOf(articlesOf(category, group)).flatMap((sorts: Article[]): HTMLElement[] =>
        sorts[0].variants.length === 1
            ? tilesOf(sorts[0], ordered)
            : [windowTileOf(sorts, ordered, lemon)]);
}

/**
 * Makes the heading row of the open food group, a tap leads back to the group list.
 *
 * @param group - Open group row
 * @param listShow - Shows the group list
 * @returns Heading button with the names of the group
 */
function headingOf(group: GroupRow, listShow: () => void): HTMLElement {
    const heading: HTMLElement = elementOf("button", "menu-row menu-back", labelOf(group.name));
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
 * In the Limonaden an article with several sizes is a tile that opens its size window.
 * - {@link Element#replaceChildren}: Puts the new content in place of the old one.
 * - {@link Array#includes}: Tells whether the group shows the catalog list `lemonades`.
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
        ? barOf(
            rows,
            group,
            listShow,
            (other: GroupRow): void => groupShow(view, category, rows, ordered, other),
        )
        : headingOf(group, listShow);

    const tiles: HTMLElement[] = group.lists.includes("lemonades")
        ? windowTilesOf(category, group, ordered)
        : articlesOf(category, group).flatMap((article: Article): HTMLElement[] =>
            tilesOf(article, ordered));
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
        const button: HTMLElement = elementOf(
            "button",
            "menu-row menu-group",
            pictureOf(group),
            labelOf(group.name),
            elementOf(
                "span",
                "menu-count",
                countOf(ordered, (line: Line): boolean => articleIds.includes(line.articleId)),
            ),
        );
        button.addEventListener("click", (): void => groupShow(view, category, rows, ordered, group));
        return button;
    });
    view.replaceChildren(...buttons);
    view.scrollTop = 0;
}
