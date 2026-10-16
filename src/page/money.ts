/**
 * ## Money
 *
 * Shows an amount of money as euros with two decimals.
 *
 * - {@link Number#toFixed}: Writes `cents / 100` with two decimals and a dot,
 *   whatever the language of the device.
 * - `\u202F`: Narrow no-break space before the euro sign,
 *   so the euro sign never wraps to the next line.
 *
 * @param cents - Amount in whole cents
 * @returns Amount due with the euro sign
 */
export function money(cents: number): string {
    return `${(cents / 100).toFixed(2)}\u202F€`;
}
