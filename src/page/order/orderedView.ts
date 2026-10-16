/**
 * ## Ordered view
 *
 * Shows the ordered list of an open table with a minus button per line and the undo bar.
 *
 * - `./ordered.ts`: Holds the ordered list of an open table on the phone until the way back to the plan.
 */

import { lineRemove, quantityOf, removalUndo } from "./ordered.ts";
import type { Menu, Category } from "../../catalog/menu.ts";
import type { Article, Variant } from "../../catalog/articles.ts";
import type { Line, Ordered, Removal } from "./ordered.ts";


/**
 * German and Chinese label of a {@link Line}, the article name and the variant name.
 * Takes both names from the {@link Menu}, never from the ids.
 *
 * @param menu - Menu as the server sends it
 * @param line - Line of the ordered list
 * @returns Names like `Cola 0.5` and `可乐 0.5`, or only the article names without a choice
 * @throws {Error} - When the menu has no such article or variant
 */
export function namesOf(menu: Menu, line: Line): { de: string; zh: string; } {
    const articles: Article[] = Object.values(menu).flatMap((category: Category): Article[] =>
        Object.values(category.groups).flat());
    const article: Article | undefined = articles.find((article: Article): boolean =>
        article.name.de === line.articleId);
    const variant: Variant | undefined = article?.variants.find((variant: Variant): boolean =>
        (variant.name?.de ?? null) === line.variantId);

    if (article === undefined || variant === undefined)
        throw new Error(`The menu has no ${line.articleId} ${line.variantId}`);
    return {
        de: variant.name === null ? article.name.de : `${article.name.de} ${variant.name.de}`,
        zh: variant.name === null ? article.name.zh : `${article.name.zh} ${variant.name.zh}`,
    };
}

/**
 * Shows the ordered list and the undo bar, again after every tap.
 * A {@link Line} without portions has no row. The bar names the newest {@link Removal}
 * and is hidden while there is none.
 * - {@link Array#filter}: Keeps the lines with portions.
 * - {@link Array#map}: Turns each kept line into a row.
 * - {@link Array#at}: Takes the newest removal, `undefined` without any.
 * - {@link Element#replaceChildren}: Puts the new rows in place of the old ones.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
 *   is true, else removes it.
 * - {@link GlobalEventHandlers#onclick}: Sets the handler of the undo button,
 *   a later show replaces it, so a tap undoes only once.
 *
 * @param list - List of the rows
 * @param bar - Undo bar after the list
 * @param menu - Menu as the server sends it
 * @param ordered - Ordered list of the table
 * @throws {Error} - When the menu has no article or variant of a line
 */
export function orderedShow(list: Element, bar: Element, menu: Menu, ordered: Ordered): void {
    const rows: HTMLLIElement[] = ordered.lines
        .filter((line: Line): boolean => quantityOf(line) > 0)
        .map((line: Line): HTMLLIElement => {
            const row: HTMLLIElement = document.createElement("li");
            const quantity: HTMLSpanElement = document.createElement("span");
            quantity.className = "quantity";
            quantity.textContent = String(quantityOf(line));
            const minus: HTMLButtonElement = document.createElement("button");
            minus.className = "minus";
            minus.setAttribute("aria-label", "Weniger 减少");
            minus.addEventListener("click", (): void => {
                lineRemove(ordered, line);
                orderedShow(list, bar, menu, ordered);
            });
            row.append(quantity, namesOf(menu, line).de, minus);
            return row;
        });
    list.replaceChildren(...rows);

    const removal: Removal | undefined = ordered.removals.at(-1);
    bar.toggleAttribute("hidden", removal === undefined);
    if (removal === undefined) return;

    const names: { de: string; zh: string; } = namesOf(menu, removal.line);
    const chinese: HTMLSpanElement = document.createElement("span");
    chinese.lang = "zh-Hans";
    chinese.textContent = names.zh;
    bar.querySelector(".undo-name")?.replaceChildren(names.de, chinese);
    (bar.querySelector(".undo") as HTMLButtonElement).onclick = (): void => {
        removalUndo(ordered);
        orderedShow(list, bar, menu, ordered);
    };
}
