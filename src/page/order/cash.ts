/**
 * ## Cash window
 *
 * Takes the money of a cash payment: amount, money given and change.
 * Nothing typed is stored or sent, a tip is not recorded.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `../money.ts`: Shows an amount of money as euros with two decimals.
 */

/// <reference types="vite/client" />
import { money } from "../money.ts";


/**
 * Reads a typed amount into whole cents.
 * A comma counts as the decimal dot, a dot without decimals is allowed
 * while typing, more than two decimals is no amount.
 * - {@link String#replace}: Turns the comma into a dot.
 * - {@link String#match}: Splits the text into euros and cents,
 *   gives `null` when it is no amount.
 * - {@link String#padEnd}: Makes the cents `70` of the decimals `7`.
 *
 * @param text - Typed text, like `60`, `59.7`, `59.70` or `59,70`
 * @returns Amount in whole cents, `null` when the text is no amount
 */
export function centsOf(text: string): number | null {
    const parts: RegExpMatchArray | null = text.replace(",", ".").match(/^(\d+)(?:\.(\d{0,2}))?$/);
    if (parts === null) return null;
    return Number(parts[1]) * 100 + Number((parts[2] ?? "").padEnd(2, "0"));
}

/**
 * Types a number key into the chosen field, in place of the selected text.
 * Backspace deletes the selected text, or the sign before the cursor.
 * - {@link HTMLInputElement#setRangeText}: Replaces a range of the text
 *   and puts the cursor behind it.
 * - {@link EventTarget#dispatchEvent}: Tells the window that the field changed,
 *   as if it was typed with the PC keyboard.
 * - {@link HTMLElement#focus}: Gives the field back its focus, which the key took.
 *
 * @param field - Chosen field
 * @param key - Digit or `.`, or `back` for backspace
 */
export function keyType(field: HTMLInputElement, key: string): void {
    const start: number = field.selectionStart ?? 0;
    const end: number = field.selectionEnd ?? 0;
    if (key === "back")
        field.setRangeText("", start === end ? Math.max(start - 1, 0) : start, end, "end");
    else
        field.setRangeText(key, start, end, "end");
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.focus();
}

/**
 * Opens the cash window above the current screen and removes it when it closes.
 * The amount is filled with the amount due and selected, so the first key replaces it.
 * Escape closes the window and nothing happens, Abschließen closes it and calls `done`.
 * Loads the HTML only now, since the test of {@link centsOf} imports this file without Vite.
 * - `import()`: Loads `cash.html` as text, packed into built code by Vite.
 * - {@link Element#insertAdjacentHTML}: Puts the window at the end of the body.
 * - {@link Number#toFixed}: Writes `cents / 100` with two decimals and a dot,
 *   so `2790` becomes `27.90`.
 * - {@link HTMLDialogElement#showModal}: Opens the dialog above the page,
 *   Escape closes only the dialog.
 * - {@link HTMLInputElement#select}: Selects the whole text of the amount.
 * - `input`: Fires on every change of a field, typed, pasted or by number key,
 *   then shows the change: money given minus amount, empty while one of them
 *   is no amount or the money given is below the amount.
 * - `focusin`: Fires when a field is tapped, then the number keys type into it.
 * - `keydown`: Stopped at the window, so the Escape that closes it
 *   does not leave the screen below.
 * - `close`: Fires on every close, then removes the window.
 *
 * @param due - Amount due in whole cents, like `2790`
 * @param done - Called after Abschließen
 * @throws {Error} - When the HTML of the window cannot be loaded
 */
export async function cashOpen(due: number, done: () => void): Promise<void> {
    const { default: html }: { default: string } = await import("./cash.html?raw");
    document.body.insertAdjacentHTML("beforeend", html);
    const dialog: HTMLDialogElement = document.querySelector(".cash") as HTMLDialogElement;
    const amount: HTMLInputElement = dialog.querySelector(".cash-amount") as HTMLInputElement;
    const given: HTMLInputElement = dialog.querySelector(".cash-given") as HTMLInputElement;
    let field: HTMLInputElement = amount;

    amount.value = (due / 100).toFixed(2);
    dialog.showModal();
    amount.select();

    dialog.addEventListener("input", (): void => {
        const amountCents: number | null = centsOf(amount.value);
        const givenCents: number | null = centsOf(given.value);
        dialog.querySelector(".cash-change-value")?.replaceChildren(
            amountCents === null || givenCents === null || givenCents < amountCents
                ? "" : money(givenCents - amountCents));
    });

    dialog.addEventListener("focusin", (event: FocusEvent): void => {
        if (event.target instanceof HTMLInputElement) field = event.target;
    });

    dialog.querySelectorAll("[data-key]").forEach((key: Element): void => {
        key.addEventListener("click", (): void => keyType(field, key.getAttribute("data-key") ?? ""));
    });

    dialog.querySelector(".cash-finish")?.addEventListener("click", (): void => {
        dialog.close();
        done();
    });

    dialog.addEventListener("keydown", (event: KeyboardEvent): void => event.stopPropagation());
    dialog.addEventListener("close", (): void => dialog.remove());
}
