/**
 * ## Chaining
 *
 * Links each receipt to the one before with a fingerprint of the previous JWS.
 * The start receipt has no previous JWS and uses the cash register ID instead.
 *
 * ```
 * fingerprint = Base64(first 8 bytes of SHA-256(previous JWS))
 * ```
 */

import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";

/**
 * Builds the fingerprint that links a receipt to the one before it.
 *
 * @param previousJws - JWS of the previous receipt, null for the start receipt
 * @param cashboxId - Cash register ID, for the first receipt
 * @returns First 8 bytes of the SHA-256 hash in Base64
 */
export function chainingCreate(previousJws: string | null, cashboxId: string): string {
    const input: string = previousJws ?? cashboxId;
    const hash: Buffer = createHash("sha256").update(input).digest();
    return hash.subarray(0, 8).toString("base64");
}