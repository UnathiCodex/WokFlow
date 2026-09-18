/**
 * ## Signature test
 *
 * Checks the JWS built from a data line and signed with a key of this computer.
 * Run with `node --test`.
 *
 * ```
 * header.dataline.signature
 * ```
 */

import { test } from "node:test";
import { equal, ok, throws } from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import { Buffer } from "node:buffer";
import { jwsCreate, signerKey } from "../src/RKSV/signature.ts";
import type { KeyObject } from "node:crypto";


const keys: { privateKey: KeyObject; publicKey: KeyObject; }
    = generateKeyPairSync("ec", { namedCurve: "prime256v1" });

test("the JWS has three parts with the header and the data line", (): void => {
    const jws: string = jwsCreate("_R1-AT1_WOKFLOW-1_83", signerKey(keys.privateKey));
    const parts: string[] = jws.split(".");
    equal(parts.length, 3);
    equal(parts[0], "eyJhbGciOiJFUzI1NiJ9");
    equal(Buffer.from(parts[1], "base64url").toString("utf8"), "_R1-AT1_WOKFLOW-1_83");
});

test("the signature has 64 bytes and belongs to header and data line", (): void => {
    const jws: string = jwsCreate("_R1-AT1_WOKFLOW-1_83", signerKey(keys.privateKey));
    const parts: string[] = jws.split(".");
    const signature: Buffer = Buffer.from(parts[2], "base64url");
    equal(signature.length, 64);
    ok(verify(
        "sha256",
        Buffer.from(`${parts[0]}.${parts[1]}`),
        { key: keys.publicKey, dsaEncoding: "ieee-p1363" },
        signature));
});

test("a failed signature device puts its error text in place of the signature", (): void => {
    const parts: string[] = jwsCreate("_R1-AT1_WOKFLOW-1_83", null).split(".");
    equal(parts.length, 3);
    equal(parts[0], "eyJhbGciOiJFUzI1NiJ9");
    equal(Buffer.from(parts[2], "base64url").toString("utf8"), "Sicherheitseinrichtung ausgefallen");
});

test("a signature of the wrong length fails", (): void => {
    throws(
        (): string => jwsCreate("_R1-AT1_WOKFLOW-1_83", (): Buffer => Buffer.alloc(70)),
        /has 70 bytes instead of 64/);
});

test("a changed data line no longer matches the signature", (): void => {
    const parts: string[] = jwsCreate("_R1-AT1_WOKFLOW-1_83_31,80", signerKey(keys.privateKey)).split(".");
    const changed: string = Buffer.from("_R1-AT1_WOKFLOW-1_83_3,18").toString("base64url");
    equal(verify(
        "sha256",
        Buffer.from(`${parts[0]}.${changed}`),
        { key: keys.publicKey, dsaEncoding: "ieee-p1363" },
        Buffer.from(parts[2], "base64url")), false);
});
