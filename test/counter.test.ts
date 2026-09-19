/**
 * ## Counter test
 *
 * Checks adding to the counter and its encryption.
 */

import { test } from "node:test";
import { equal, throws } from "node:assert/strict";
import { Buffer } from "node:buffer";
import { counterAdd, counterEncrypt, counterStorno, counterTraining } from "../src/RKSV/counter.ts";


/**
 * AES test key of 32 bytes, each with the value 1, never used in the cash register.
 */
const key: Buffer = Buffer.alloc(32, 1);

test("storno and training receipts carry STO and TRA in Base64", (): void => {
    equal(counterStorno, "U1RP");
    equal(counterTraining, "VFJB");
});

test("a receipt adds its total, a training receipt adds nothing, a storno subtracts its value", (): void => {
    equal(counterAdd(100000, 4070, false), 104070);
    equal(counterAdd(100000, 4070, true), 100000);
    equal(counterAdd(104070, -4070, false), 100000);
});

test("the counter is encrypted with AES-256-CTR and written in Base64", (): void => {
    equal(counterEncrypt(4070, key, "WOKFLOW-1", 83), "l0Hl3jH+Poo=");
});

test("the same counter looks different on the next receipt", (): void => {
    equal(counterEncrypt(4070, key, "WOKFLOW-1", 84), "Q6X/focKOUw=");
});

test("a negative counter is also encrypted", (): void => {
    equal(counterEncrypt(-100, key, "WOKFLOW-1", 85), "G4Dg6UHlpM8=");
});

test("a counter in euros instead of cents and a key of the wrong length fail", (): void => {
    throws((): string => counterEncrypt(40.7, key, "WOKFLOW-1", 86), /not an integer/);
    throws((): string => counterEncrypt(4070, Buffer.alloc(16, 1), "WOKFLOW-1", 86), /Invalid key length/);
});
