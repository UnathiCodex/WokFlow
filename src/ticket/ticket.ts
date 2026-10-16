/**
 * ## Ticket
 *
 * Writes the text of the order ticket, which the printer code later turns into printer bytes.
 *
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 */

import { menu } from "../catalog/menu.ts";
import type { Article, Variant } from "../catalog/articles.ts";
import type { Category } from "../catalog/menu.ts";
import type { OrderNew } from "../tables/orders.ts";


/**
 * One variant of the {@link menu} as the ticket needs it.
 *
 * - `articleName`: German article name.
 * - `variantName`: German variant name (nullable).
 * - `print`: Whether orders of its {@link Category} are printed on the order ticket.
 */
type TicketEntry = {
    articleName: string;
    variantName: string | null;
    print: boolean;
};

/**
 * Every variant of the {@link menu} as {@link TicketEntry} in one flat list.
 * Built once when this file loads.
 */
const entries: TicketEntry[] =
    Object.values(menu).flatMap((category: Category): TicketEntry[] =>
        Object.values(category.groups).flat().flatMap((article: Article): TicketEntry[] =>
            article.variants.map((variant: Variant): TicketEntry =>
                ({
                    articleName: article.name.de,
                    variantName: variant.name?.de ?? null,
                    print: category.print,
                })
            )
        )
    );

/**
 * Writes the lines of the order ticket of the orders a phone adds to a table.
 * Keeps the orders as they were sent and leaves out the categories that are not printed.
 * Removals are never printed, so the caller passes only the `add` list of the update.
 * - {@link Intl.DateTimeFormat}: Writes a moment as clock text, with these options:
 *   - `"de-AT"`: Gives `HH:MM` on a 24-hour clock.
 *   - `timeZone`: `Europe/Vienna` reads the clock of the restaurant,
 *     whatever the time zone of the machine.
 *   - `hour`, `minute`: Give two digits each.
 * - {@link Intl.DateTimeFormat.prototype.format}: Writes the moment as clock text.
 *
 * The names come from the {@link menu}, never from the ids, as the printer has no Chinese.
 * Mitnehmen (`M`) is named on paper, the other tables as `Tisch 14`.
 *
 * @param tableId - Table identifier
 * @param ordersAdded - Orders added by the update of the phone
 * @param time - Moment of the update
 * @returns Table line, time line and one line for each printed order,
 * or an empty list when nothing is printed
 * @throws {Error} - When the menu has no such article or variant
 */
export function ticketOf(tableId: string, ordersAdded: OrderNew[], time: Date): string[] {
    const lines: string[] = ordersAdded.flatMap((order: OrderNew): string[] => {
        const entry: TicketEntry | undefined = entries.find((e: TicketEntry): boolean =>
            e.articleName === order.articleId && e.variantName === order.variantId,
        );
        if (entry === undefined)
            throw new Error(`The menu has no ${order.articleId} ${order.variantId}`);

        const name: string =
            entry.variantName === null ? entry.articleName : `${entry.articleName} ${entry.variantName}`;
        return entry.print ? [`${order.quantity} ${name}`] : [];
    });
    if (lines.length === 0)
        return [];

    const clock: string = new Intl.DateTimeFormat("de-AT", {
        timeZone: "Europe/Vienna",
        hour: "2-digit",
        minute: "2-digit",
    }).format(time);
    return [tableId === "M" ? "Mitnehmen" : `Tisch ${tableId}`, clock, ...lines];
}
