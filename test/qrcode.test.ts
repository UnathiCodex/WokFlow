/**
 * ## QR code test
 *
 * Checks the QR code text built from signed receipts.
 * Run with `node --test`.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly, down to the kind of object, and throws when they differ.
 * - `../src/RKSV/qrcode.ts`: Builds the text of the RKSV QR code from a signed receipt.
 */

import { test } from "node:test";
import { equal, throws } from "node:assert/strict";
import { qrcodeCreate } from "../src/rksv/qrcode.ts";


test("a signed receipt becomes data line, underscore, signature in Base64", (): void => {
    equal(
        qrcodeCreate("eyJhbGciOiJFUzI1NiJ9.X1IxLUFUMV9XT0tGTE9XLTFfODM.CzBVep_E6Q4zWH2ix-wRNg"),
        "_R1-AT1_WOKFLOW-1_83_CzBVep/E6Q4zWH2ix+wRNg==");
});

test("a failed signature device shows its failure text in Base64", (): void => {
    equal(
        qrcodeCreate("eyJhbGciOiJFUzI1NiJ9.X1IxLUFUMV9XT0tGTE9XLTFfODM.U2ljaGVyaGVpdHNlaW5yaWNodHVuZyBhdXNnZWZhbGxlbg"),
        "_R1-AT1_WOKFLOW-1_83_U2ljaGVyaGVpdHNlaW5yaWNodHVuZyBhdXNnZWZhbGxlbg==");
});

test("a JWS without three parts fails", (): void => {
    throws((): string => qrcodeCreate("aaa.bbb"), /has 2 parts instead of 3/);
    throws((): string => qrcodeCreate("aaa.bbb.ccc.ddd"), /has 4 parts instead of 3/);
});

test("a complete receipt keeps every field of its data line", (): void => {
    const jws: string = [
        "eyJhbGciOiJFUzI1NiJ9",
        "X1IxLUFUMV9XT0tGTE9XLTFfODNfMjAyNi0wOS0xN1QxMjozMDowMF84LDkwXzMxLDgwXzAsMDBfMCwwMF8wLDAwX0REY3JGeTZ5QjRNPV8xYTJiM2M0ZF9nRTVYbllvMHlMZz0",
        "CzBVep_E6Q4zWH2ix-wRNluApcrvFDleg6jN8hc8YYar0PUaP2SJrtP4HUJnjLHW-yBFao-02f4jSG2St9wBJg",
    ].join(".");
    equal(
        qrcodeCreate(jws),
        "_R1-AT1_WOKFLOW-1_83_2026-09-17T12:30:00_8,90_31,80_0,00_0,00_0,00_DDcrFy6yB4M=_1a2b3c4d_gE5XnYo0yLg=" +
        "_CzBVep/E6Q4zWH2ix+wRNluApcrvFDleg6jN8hc8YYar0PUaP2SJrtP4HUJnjLHW+yBFao+02f4jSG2St9wBJg==");
});
