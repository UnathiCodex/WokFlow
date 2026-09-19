/**
 * ## Counter
 *
 * Keeps counter of the cash register and encrypts it for the data line.
 * Storno and training receipts carry a fixed text.
 *
 * ```
 * state = previous state + receipt total, training receipt do not count
 * counter = Base64(AES-256-CTR(state as 8 bytes, key, iv))
 * iv = first 16 bytes of SHA-256(cash register ID + receipt number)
 * ```
 */

import { Buffer } from "node:buffer";
import { createCipheriv, createHash } from "node:crypto";
import type { Cipheriv } from "node:crypto";

/**
 * Takes the place of the encrypted counter on storno receipts, "STO" in Base64.
 */
export const counterStorno: string = Buffer.from("STO").toString("base64");

/**
 * Takes the place of the encrypted counter on training receipts, "TRA" in Base64.
 */
export const counterTraining: string = Buffer.from("TRA").toString("base64");

/**
 * Adds the total of a receipt to the counter, training receipts leave it unchanged.
 *
 * @param state - Counter before this receipt, in cents
 * @param total - Sum of all amounts of this receipt in cents, negative for storno
 * @param training - Whether the receipt is a training receipt or not
 * @returns Counter including this receipt, in cents
 */
export function counterAdd(state: number, total: number, training: boolean): number {
    return training ? state : state + total;
}

/**
 * Encrypts the counter for the data line of a receipt.
 *
 * @param state - Counter including this receipt, in cents
 * @param key - AES key of the cash register, 32 bytes
 * @param cashboxId - Cash register ID
 * @param receiptNumber - Number of this receipt
 * @returns Encrypted counter in Base64
 */
export function counterEncrypt(state: number, key: Buffer, cashboxId: string, receiptNumber: number): string {
    const bytes: Buffer = Buffer.alloc(8); // 8 Bytes, all with value 0
    bytes.writeBigInt64BE(BigInt(state));
    const iv: Buffer = createHash("sha256")
        .update(`${cashboxId}${receiptNumber}`)
        .digest()
        .subarray(0, 16);
    const cipher: Cipheriv = createCipheriv("aes-256-ctr", key, iv);
    return Buffer.concat([cipher.update(bytes), cipher.final()]).toString("base64");
}