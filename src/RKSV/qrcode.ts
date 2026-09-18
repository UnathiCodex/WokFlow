/**
 * ## QR code
 *
 *
 * Builds the text of the RKSV QR code from a signed receipt.
 *
 * ```
 * _SignaturAnbieter_Kassen-ID_BelegNr_DatumUhrzeit_BeträgeSteuersätze_Umsatzzähler_Seriennummer_Fingerabdruck_Signatur
 * ```
 */

import { Buffer } from "node:buffer";

/**
 * Turns a signed receipt into the text of its QR code.
 *
 * @param jws - JSON Web Signature
 *
 * The signed receipt: header, data line, signature, in Base64URL, joined by dots
 *
 * @returns Text for the QR code in the format from the file header
 */

export function qrcodeCreate(jws: string): string {
    const parts: string[] = jws.split(".");
    if (parts.length !== 3)
        throw new Error(`JWS has ${parts.length} parts instead of 3`);
    const dataLine: string = Buffer.from(parts[1], "base64url").toString("utf8");
    const signature: string = Buffer.from(parts[2], "base64url").toString("base64");
    return `${dataLine}_${signature}`;
}