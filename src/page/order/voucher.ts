/**
 * ## Voucher window
 *
 * Takes the value of a voucher and shows what remains of the amount due.
 * Nothing typed is stored or sent, the caller decides what a credited voucher becomes.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `../money.ts`: Shows an amount of money as euros with two decimals.
 * - `./cash.ts`: Reads a typed amount into whole cents and types a number key into a field.
 */

/// <reference types="vite/client" />
import { money } from "../money.ts";
import { centsOf, keyType } from "./cash.ts";


/**
 * Shows the line below the voucher value and the state of the Anrechnen button.
 * The line is Rest with the amount still due, or Gutscheinrest with the excess
 * when the value is above the amount due. Anrechnen works for a value above 0 only.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
 *   is true, else removes it.
 * - {@link Element#replaceChildren}: Puts the amount in place of the old one.
 * - {@link Math.abs}: Makes the excess a positive amount.
 * - {@link money}: Shows the amount as euros.
 *
 * @param dialog - Voucher window
 * @param due - Amount due in whole cents, like `2790`
 * @param cents - Voucher value in whole cents, `0` while nothing valid is typed
 */
function restShow(dialog: HTMLDialogElement, due: number, cents: number): void {
    const excess: boolean = cents > due;
    dialog.querySelector(".voucher-rest-text")?.toggleAttribute("hidden", excess);
    dialog.querySelector(".voucher-excess-text")?.toggleAttribute("hidden", !excess);
    dialog.querySelector(".voucher-rest-value")?.replaceChildren(money(Math.abs(due - cents)));
    dialog.querySelector(".voucher-credit")?.toggleAttribute("disabled", cents === 0);
}

/**
 * Opens the voucher window above the current screen and removes it when it closes.
 * The value is empty and chosen, the number keys type into it,
 * the rest line shows the whole amount due until a value is typed.
 * Escape closes the window and nothing happens, Anrechnen closes it and calls `credit`.
 * Loads the HTML only now, like `cashOpen`.
 * - `import()`: Loads `voucher.html` as text, packed into built code by Vite.
 * - {@link Element#insertAdjacentHTML}: Puts the window at the end of the body.
 * - {@link HTMLDialogElement#showModal}: Opens the dialog above the page and chooses
 *   the value, Escape closes only the dialog.
 * - {@link centsOf}: Reads the typed value, a text that is no amount counts as 0.
 * - `input`: Fires on every change of the value, typed, pasted or by number key,
 *   then shows the rest line.
 * - `keydown`: Stopped at the window, so the Escape that closes it
 *   does not leave the screen below.
 * - `close`: Fires on every close, then removes the window.
 *
 * @param due - Amount due in whole cents, like `2790`
 * @param credit - Called after Anrechnen with the voucher value in whole cents, like `3000`
 * @throws {Error} - When the HTML of the window cannot be loaded
 */
export async function voucherOpen(due: number, credit: (cents: number) => void): Promise<void> {
    const { default: html }: { default: string } = await import("./voucher.html?raw");
    document.body.insertAdjacentHTML("beforeend", html);
    const dialog: HTMLDialogElement = document.querySelector(".voucher") as HTMLDialogElement;
    const value: HTMLInputElement = dialog.querySelector(".voucher-value") as HTMLInputElement;
    let cents: number = 0;

    restShow(dialog, due, cents);
    dialog.showModal();

    dialog.addEventListener("input", (): void => {
        cents = centsOf(value.value) ?? 0;
        restShow(dialog, due, cents);
    });

    dialog.querySelectorAll("[data-key]").forEach((key: Element): void => {
        key.addEventListener("click", (): void => keyType(value, key.getAttribute("data-key") ?? ""));
    });

    dialog.querySelector(".voucher-credit")?.addEventListener("click", (): void => {
        dialog.close();
        credit(cents);
    });

    dialog.addEventListener("keydown", (event: KeyboardEvent): void => event.stopPropagation());
    dialog.addEventListener("close", (): void => dialog.remove());
}
