/**
 * ## Buffet view
 *
 * Shows the buffet at the top of the food tab: the tariff line and the tiles for the persons.
 *
 * - `../../buffet/tariff.ts`: Chooses the buffet by clock, weekday, public holiday.
 * - `../element.ts`: Makes elements, the Chinese name and the label of both names.
 * - `./menuView.ts`: Shows the drinks or food menu of the order screen,
 *   first its group list, then one group.
 * - `./ordered.ts`: Holds the ordered list of an open table on the phone until the way back to the plan.
 */

import { buffetOf } from "../../buffet/tariff.ts";
import { chineseOf, elementOf, labelOf } from "../element.ts";
import { countOf } from "./menuView.ts";
import { lineAdd, lineRemove, quantityOf } from "./ordered.ts";

import type { Category } from "../../catalog/menu.ts";
import type { Article, Variant } from "../../catalog/articles.ts";
import type { Line, Ordered } from "./ordered.ts";


/**
 * The buffet kind each table chose by hand, found by the ordered list of the table.
 * A table has its own ordered list, so a choice never reaches another table.
 */
const kindsChosen: WeakMap<Ordered, Article> = new WeakMap();

/**
 * Label of the tile for adults, in place of the variant name `Erwachsene 成人`.
 */
const labelAdults: { de: string; zh: string; } = { de: "Buffet", zh: "自助" };

/**
 * Finds the buffet kind that already has persons on the table.
 * - {@link Array#find}: Finds the first kind with persons.
 * - {@link Array#some}: Tells whether a line of the kind has persons.
 *
 * @param kinds - Buffet articles of the menu
 * @param ordered - Ordered list of the table
 * @returns The buffet article, or `undefined` while no person is booked
 */
function kindBookedOf(kinds: Article[], ordered: Ordered): Article | undefined {
    return kinds.find((kind: Article): boolean =>
        ordered.lines.some((line: Line): boolean =>
            line.articleId === kind.name.de && quantityOf(line) > 0));
}

/**
 * Makes the tile of one age level: a tap on the tile books one person,
 * a tap on its count takes one back, which the undo bar of the ordered list shows.
 * The count changes at once and the tile flashes by the class `booked`, until its `animationend`.
 * Without a kind the tile is grey and does nothing, and so is the count at 0.
 * The add button and the count button are two buttons on top of each other,
 * since a button inside a button is not allowed.
 * - {@link countOf}: Makes the text of the count button.
 * - {@link Array#find}: Finds the line of the tile.
 * - {@link Element#toggleAttribute}: Greys a button, or makes it work again.
 * - {@link Element#setAttribute}: Names the count button for readers of the screen.
 * - {@link lineAdd}: Books one person.
 * - {@link lineRemove}: Takes one person off the line.
 * - {@link Element#addEventListener}: Calls the lambda at each tap, or at the end of the flash.
 * - {@link DOMTokenList#add}: Starts the flash.
 * - {@link DOMTokenList#remove}: Ends the flash.
 *
 * @param name - German and Chinese label of the tile
 * @param variantId - German name of the age level
 * @param kind - Buffet article of the table, `undefined` while none is chosen
 * @param ordered - Ordered list of the table
 * @returns Tile with its two buttons
 */
function tileOf(name: { de: string; zh: string; }, variantId: string, kind: Article | undefined,
                ordered: Ordered): HTMLElement {

    const lineOfTile: (line: Line) => boolean = (line: Line): boolean =>
        line.articleId === kind?.name.de && line.variantId === variantId;

    const add: HTMLElement = elementOf("button", "buffet-add", name.de, chineseOf(name.zh));
    add.toggleAttribute("disabled", kind === undefined);
    const count: HTMLElement = elementOf("button", "buffet-count");
    count.setAttribute("aria-label", "Weniger 减少");
    const tile: HTMLElement = elementOf("div", "buffet-tile", add, count);

    const countShow: () => void = (): void => {
        count.textContent = countOf(ordered, lineOfTile);
        count.toggleAttribute("disabled", count.textContent === "");
    };
    countShow();

    add.addEventListener("click", (): void => {
        lineAdd(ordered, (kind as Article).name.de, variantId);
        countShow();
        tile.classList.add("booked");
    });
    count.addEventListener("click", (): void => {
        lineRemove(ordered, ordered.lines.find(lineOfTile) as Line);
        countShow();
    });
    tile.addEventListener("animationend", (): void => tile.classList.remove("booked"));
    return tile;
}

/**
 * Makes the rows of the four buffet kinds, the kind of the table in bold.
 * A locked row is grey and cannot be tapped.
 * - {@link Array#map}: Turns each kind into a row.
 * - {@link DOMTokenList#toggle}: Marks the kind of the table by the class `selected`.
 * - {@link Element#toggleAttribute}: Greys the row, or makes it work again.
 *
 * @param kinds - Buffet articles of the menu
 * @param kind - Buffet article of the table, `undefined` while none is chosen
 * @param locked - Tells whether the kind may not be changed
 * @param kindChoose - Takes the kind of a tapped row as the kind of the table
 * @returns One row per kind in catalog order
 */
function rowsOf(kinds: Article[], kind: Article | undefined, locked: boolean,
                kindChoose: (kind: Article) => void): HTMLElement[] {

    return kinds.map((other: Article): HTMLElement => {
        const row: HTMLElement = elementOf("button", "menu-row buffet-kind", labelOf(other.name));
        row.classList.toggle("selected", other === kind);
        row.toggleAttribute("disabled", locked);
        row.addEventListener("click", (): void => kindChoose(other));
        return row;
    });
}

/**
 * Makes the tariff line and the list of the kinds under it.
 * A tap on the line unfolds the list or folds it, the arrow turns with it.
 * The rows are made anew at each tap, so they know whether persons are booked by now.
 * - {@link Element#replaceChildren}: Puts the new rows in place of the old ones.
 * - {@link DOMTokenList#toggle}: Turns the arrow by the class `open` and tells whether it is set.
 *
 * @param kinds - Buffet articles of the menu
 * @param kind - Buffet article of the table, `undefined` while none is chosen
 * @param ordered - Ordered list of the table
 * @param kindChoose - Takes the kind of a tapped row as the kind of the table
 * @returns The line and the list of the kinds
 */
function tariffOf(kinds: Article[], kind: Article | undefined, ordered: Ordered,
                  kindChoose: (kind: Article) => void): HTMLElement[] {

    const line: HTMLElement = elementOf(
        "button",
        "menu-row buffet-line",
        labelOf(kind?.name ?? { de: "Buffet wählen", zh: "选择自助" }),
    );
    const list: HTMLElement = document.createElement("div");
    line.addEventListener("click", (): void => {
        const locked: boolean = kindBookedOf(kinds, ordered) !== undefined;
        list.replaceChildren(...rowsOf(kinds, kind, locked, kindChoose));
        list.hidden = !line.classList.toggle("open");
    });
    return [line, list];
}

/**
 * Shows the buffet: the tariff line, under it the tiles for adults and the two ages of children.
 * The kind of the table is the one that already has persons, else the one chosen by hand,
 * else the proposal of {@link buffetOf} for this moment, else none.
 * While persons are booked the kinds cannot be changed.
 * The rule that another kind bills everybody is an open point of the owner.
 * Buffet variants always have names, so the tiles take them as they are.
 * - {@link WeakMap#get}: Finds the kind chosen by hand for this table.
 * - {@link WeakMap#set}: Remembers the kind chosen by hand and shows the buffet anew, folded.
 * - {@link Array#find}: Finds the kind of the proposal.
 * - {@link Array#map}: Turns each variant of the first kind into a tile.
 * - {@link Element#replaceChildren}: Puts the new content in place of the old one.
 *
 * @param container - Element of the buffet, emptied before the new content comes in
 * @param buffet - Buffet category of the menu
 * @param ordered - Ordered list of the table
 */
export function buffetShow(container: Element, buffet: Category, ordered: Ordered): void {
    const kinds: Article[] = buffet.groups.buffets;
    const today: string | null = buffetOf(new Date());
    const proposal: Article | undefined =
        kinds.find((other: Article): boolean => other.name.de === today);
    const kind: Article | undefined =
        kindBookedOf(kinds, ordered) ?? kindsChosen.get(ordered) ?? proposal;
    const kindChoose: (chosen: Article) => void = (chosen: Article): void => {
        kindsChosen.set(ordered, chosen);
        buffetShow(container, buffet, ordered);
    };

    const variants: Variant[] = kinds[0].variants;
    const tiles: HTMLElement[] = variants.map((variant: Variant, index: number): HTMLElement => {
        const name: { de: string; zh: string; } = variant.name as { de: string; zh: string; };
        return tileOf(index === 0 ? labelAdults : name, name.de, kind, ordered);
    });
    container.replaceChildren(
        ...tariffOf(kinds, kind, ordered, kindChoose),
        elementOf("div", "buffet-tiles", ...tiles),
    );
}
