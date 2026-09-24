/**
 * ## Cashbox
 *
 * Creates one receipt, from the ordered items to the entry in the DEP.
 */

import { chainingCreate } from "./chaining.ts";
import { counterAdd, counterEncrypt, counterStorno, counterTraining } from "./counter.ts";
import { depAppend, depLast } from "./dep.ts";
import { dataLineCreate, taxAmountsNegate, taxAmountsSum } from "./receipt.ts";
import { jwsCreate } from "./signature.ts";
import type { Buffer } from "node:buffer";
import type { DatabaseSync } from "node:sqlite";
import type { DepEntry } from "./dep.ts";
import type { Item, TaxAmounts } from "./receipt.ts";
import type { Signer } from "./signature.ts";

/**
 * Kind of a receipt.
 */
export type ReceiptKind = "normal" | "storno" | "training";

/**
 * Everything the cash register needs for every receipt.
 *
 * - `key`: AES key of the cash register, 32 bytes.
 * - `certificateSerial`: Serial number of the signature certificate.
 * - `signer`: Signature device, null when it has failed.
 */
export type Cashbox = {
    database: DatabaseSync;
    cashboxId: string;
    key: Buffer;
    certificateSerial: string;
    signer: Signer | null;
};

/**
 * Chooses what goes into the counter field of the data line.
 *
 * @param cashbox - Cash register with key and ID
 * @param kind - Kind of the receipt
 * @param state - Counter including this receipt in cents
 * @param number - Receipt number
 * @returns Encrypted counter, or the text for storno or training
 */
function counterField(cashbox: Cashbox, kind: ReceiptKind, state: number, number: number): string {
    if (kind === "storno") return counterStorno;
    if (kind === "training") return counterTraining;
    return counterEncrypt(state, cashbox.key, cashbox.cashboxId, number);
}

/**
 * Creates one receipt and stores it in the DEP.
 *
 * @param cashbox - Cash register with database, key, signature device
 * @param items - Ordered items, empty for a receipt over zero
 * @param kind - Kind of the receipt
 * @param time - Point in time of the receipt
 * @returns The receipt as it was stored in the DEP
 */
export function receiptCreate(cashbox: Cashbox, items: Item[], kind: ReceiptKind, time: Date): DepEntry {
    const previousDepEntry: DepEntry | null = depLast(cashbox.database);
    const number: number = previousDepEntry === null ? 1 : previousDepEntry.number + 1;
    const summed: TaxAmounts = taxAmountsSum(items);
    const taxAmounts: TaxAmounts = kind === "storno" ? taxAmountsNegate(summed) : summed;
    const total: number
        = taxAmounts.taxNormal
        + taxAmounts.taxReduced1
        + taxAmounts.taxReduced2
        + taxAmounts.taxZero
        + taxAmounts.taxSpecial;
    const state: number
        = counterAdd(previousDepEntry === null ? 0 : previousDepEntry.state, total, kind === "training");
    const chaining: string = chainingCreate(previousDepEntry === null ? null : previousDepEntry.jws, cashbox.cashboxId);
    const counter: string = counterField(cashbox, kind, state, number);
    const dataLine: string = dataLineCreate({
        cashboxId: cashbox.cashboxId,
        number,
        time,
        taxAmounts,
        counter,
        certificateSerial: cashbox.certificateSerial,
        chaining,
    });
    const entry: DepEntry = { number, jws: jwsCreate(dataLine, cashbox.signer), state };
    depAppend(cashbox.database, entry);
    return entry;
}
