/**
 * ## Signature
 *
 * Builds the JWS of a receipt from its data line.
 *
 * ```
 * header.dataline.signature
 * ```
 */

import { Buffer } from "node:buffer";
import { sign } from "node:crypto";
import type { KeyObject } from "node:crypto";

/**
 * JWS header of every receipt in Base64URL, names the signature method ES256.
 */
const header: string = Buffer.from(JSON.stringify({ alg: "ES256" })).toString("base64url");

/**
 * Takes the place of the signature in Base64URL when the signature device has failed.
 */
const signatureFailed: string = Buffer.from("Sicherheitseinrichtung ausgefallen").toString("base64url");

/**
 * Signature device that signs bytes in the A-Trust card.
 * Returns the raw signature of 64 bytes.
 */
export type Signer = (data: Buffer) => Buffer;

/**
 * Builds the JWS of a receipt from its data line.
 *
 * @param dataLine - Data line of the receipt
 * @param signer - Signature device, null when it has failed
 * @returns JWS with header, data line, signature, in Base64URL, joined by dots
 */
export function jwsCreate(dataLine: string, signer: Signer | null): string {
    const headerAndData: string = `${header}.${Buffer.from(dataLine).toString("base64url")}`;
    if (signer === null)
        return `${headerAndData}.${signatureFailed}`;
    const signature: Buffer = signer(Buffer.from(headerAndData));
    if (signature.length !== 64)
        throw new Error(`Signature has ${signature.length} bytes instead of 64`);
    return `${headerAndData}.${signature.toString("base64url")}`;
}

/**
 * Creates a signature device that signs with a key of this computer, for development and tests.
 *
 * @param key - Private key on the curve P-256
 * @returns Signature device that returns the raw signature of 64 bytes
 */
export function signerKey(key: KeyObject): Signer {
    return (data: Buffer): Buffer => sign("sha256", data, { key, dsaEncoding: "ieee-p1363" });
}