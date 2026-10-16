/**
 * ## Day closing
 *
 * Shows the figures of today: turnover, card and cash large, below them the vouchers
 * and the turnover of each tax rate, as far as they are not 0.
 *
 * - `../offline.ts`: Shows hint in place of screen, when connection to server is gone.
 * - `../money.ts`: Shows an amount of money as euros with two decimals.
 */

import { offlineShow } from "../offline.ts";
import { money } from "../money.ts";
import type { Payment, PaymentKind } from "../../tables/payments.ts";
import type { Turnover } from "../../closing/turnover.ts";


/**
 * Answer of `GET /closing`.
 *
 * - `turnover`: {@link Turnover} of each tax rate of today.
 * - `payments`: {@link Payment}s of today.
 */
type Closing = {
    turnover: Turnover[];
    payments: Payment[];
};

/**
 * Line below the large figures.
 *
 * - `name`: Html of the label, German with Chinese beside.
 * - `cents`: Amount in whole cents.
 */
type Line = {
    name: string;
    cents: number;
};

/**
 * Reads the figures of today.
 * - {@link fetch}: Sends an HTTP request.
 *
 * @returns {@link Closing} as the server sends it
 * @throws {Error} - When server gives no valid answer
 */
async function closingRead(): Promise<Closing> {
    const response: Response = await fetch("/closing");
    return response.json();
}

/**
 * Adds up the amounts of the {@link Payment}s of one kind.
 * - {@link Array#filter}: Keeps the payments of the kind.
 * - {@link Array#reduce}: Adds up their amounts.
 *
 * @param payments - Payments of today
 * @param kind - {@link PaymentKind} to add up
 * @returns Sum in whole cents
 */
function paymentsSum(payments: Payment[], kind: PaymentKind): number {
    return payments
        .filter((payment: Payment): boolean => payment.kind === kind)
        .reduce((sum: number, payment: Payment): number => sum + payment.amount, 0);
}

/**
 * Shows an amount in the large figure of a selector.
 * - {@link money}: Writes the amount with the euro sign.
 * - {@link Element#replaceChildren}: Puts the new amount in place of the old one.
 *
 * @param selector - Selector of the figure
 * @param cents - Amount in whole cents
 */
function figureShow(selector: string, cents: number): void {
    document.querySelector(selector)?.replaceChildren(money(cents));
}

/**
 * Makes the row of a {@link Line}: the label left and the amount right.
 * - {@link money}: Writes the amount with the euro sign.
 *
 * @param line - Line below the large figures
 * @returns Row of the list
 */
function rowOf(line: Line): HTMLLIElement {
    const row: HTMLLIElement = document.createElement("li");
    row.innerHTML = `<span>${line.name}</span><output>${money(line.cents)}</output>`;
    return row;
}

/**
 * Shows the large figures and the lines below them.
 * Turnover is the sum of the gross turnovers of all tax rates.
 * A {@link Line} of 0 has no row.
 * - {@link Array#reduce}: Adds up the gross turnovers.
 * - {@link Array#map}: Turns each tax rate into a line, each kept line into a row.
 * - {@link Array#filter}: Keeps the lines that are not 0.
 * - {@link Element#replaceChildren}: Puts the new rows in place of the old ones.
 *
 * @param closing - Figures of today
 */
function closingShow(closing: Closing): void {
    const turnover: number = closing.turnover
        .reduce((sum: number, entry: Turnover): number => sum + entry.gross, 0);
    figureShow(".closing-turnover", turnover);
    figureShow(".closing-card", paymentsSum(closing.payments, "card"));
    figureShow(".closing-cash", paymentsSum(closing.payments, "cash"));

    const lines: Line[] = [
        {
            name: `Gutscheine <span lang="zh-Hans">代金券</span>`,
            cents: paymentsSum(closing.payments, "voucher"),
        },
        ...closing.turnover.map((entry: Turnover): Line => ({
            name: `${entry.tax} %`,
            cents: entry.gross,
        })),
    ];
    document.querySelector(".closing-lines")?.replaceChildren(...lines
        .filter((line: Line): boolean => line.cents !== 0)
        .map(rowOf));
}

/**
 * Starts day closing after router has put its HTML into page.
 * The back button opens the table plan.
 * - {@link Element#addEventListener}: Calls the table plan at each tap.
 *
 * @param planOpen - Opens table plan
 */
export function closingStart(planOpen: () => void): void {
    document.querySelector(".closing-back")?.addEventListener("click", planOpen);
    closingRead().then(closingShow).catch(offlineShow);
}
