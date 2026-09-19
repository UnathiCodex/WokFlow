/**
 * ## Receipt
 *
 * Builds the data line of a receipt from its fields.
 * Sums the orders per tax rate and writes amounts and time.
 *
 * ```
 * _R1-AT1_cashboxId_number_time_taxNormal_taxReduced1_taxReduced2_taxZero_taxSpecial_counter_certificateSerial_chaining
 * ```
 */

/**
 * One ordered item on the receipt.
 *
 * - `price`: Gross price of one portion in cents.
 * - `tax`: Tax rate in percent.
 */
export type Item = {
    quantity: number;
    price: number;
    tax: number;
};

/**
 * Gross amounts of a receipt per tax rate in cents.
 *
 * - `taxNormal`: 20%
 * - `taxReduced1`: 10%
 * - `taxReduced2`: 13%
 * - `taxZero`: 0%
 * - `taxSpecial`: 19% (only in Tirol and Vorarlberg)
 */
export type TaxAmounts = {
    taxNormal: number;
    taxReduced1: number;
    taxReduced2: number;
    taxZero: number;
    taxSpecial: number;
};

/**
 * Sums the items of a receipt per tax rate.
 *
 * @param items - Ordered items of the receipt
 * @returns Gross amounts per tax rate in cents
 */
export function taxAmountsSum(items: Item[]): TaxAmounts {
    const amounts: TaxAmounts = { taxNormal: 0, taxReduced1: 0, taxReduced2: 0, taxZero: 0, taxSpecial: 0 };
    for (const item of items) {
        const total: number = item.quantity * item.price;
        if (item.tax === 20)
            amounts.taxNormal += total;
        else if (item.tax === 10)
            amounts.taxReduced1 += total;
        else if (item.tax === 13)
            amounts.taxReduced2 += total;
        else if (item.tax === 0)
            amounts.taxZero += total;
        else
            throw new Error(`Tax rate ${item.tax}% is not allowed.`);
    }
    return amounts;
}

/**
 * Writes an amount in cents as euros.
 *
 * @param cents - Amount in cents, negative for storno
 * @returns Amount in euros as the data line requires it
 */
export function amountFormat(cents: number): string {
    const sign: string = cents < 0 ? "-" : "";
    const euros: number = Math.floor(Math.abs(cents) / 100); // Euro
    const rest: number = Math.abs(cents) % 100; // Cent
    return `${sign}${euros},${String(rest).padStart(2, "0")}`;
}

/**
 * Writes a point in time as Austrian local time without time zone.
 *
 * @param time - Point in time of the receipt
 * @returns Date and time
 */
export function timeFormat(time: Date): string {
    return time
        .toLocaleString("sv-SE", { timeZone: "Europe/Vienna" })
        .replace(" ", "T");
}

/**
 * Fields of a receipt that go into its data line.
 *
 * - `number`: Receipt number, never used twice.
 * - `counter`: Encrypted counter, or text for STO or TRA.
 * - `certificateSerial`: Serial number of the signature certificate.
 * - `chaining`: Fingerprint of the previous receipt.
 */
export type Receipt = {
    cashboxId: string;
    number: number;
    time: Date;
    taxAmounts: TaxAmounts;
    counter: string;
    certificateSerial: string;
    chaining: string;
};

/**
 * Joins the fields of a receipt to its data line, which then gets signed.
 *
 * @param receipt - Fields of the receipt
 * @returns Data line starting with `_R1-AT1_`
 */
export function dataLineCreate(receipt: Receipt): string {
    return "_R1-AT1_" + [
        receipt.cashboxId,
        receipt.number,
        timeFormat(receipt.time),
        amountFormat(receipt.taxAmounts.taxNormal),
        amountFormat(receipt.taxAmounts.taxReduced1),
        amountFormat(receipt.taxAmounts.taxReduced2),
        amountFormat(receipt.taxAmounts.taxZero),
        amountFormat(receipt.taxAmounts.taxSpecial),
        receipt.counter,
        receipt.certificateSerial,
        receipt.chaining,
    ].join("_");
}