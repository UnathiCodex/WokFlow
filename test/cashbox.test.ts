/**
 * ## Cashbox test
 *
 * Checks receipts of the cash register, from the items to the entry in the DEP.
 */

import { beforeEach, test } from "node:test";
import { deepEqual, equal, match } from "node:assert/strict";
import { Buffer } from "node:buffer";
import { DatabaseSync } from "node:sqlite";
import { receiptCreate } from "../src/rksv/cashbox.ts";
import { depDatabaseCreate, depRead } from "../src/rksv/dep.ts";

import type { Cashbox } from "../src/rksv/cashbox.ts";
import type { DepEntry } from "../src/rksv/dep.ts";
import type { Item } from "../src/rksv/receipt.ts";


/**
 * Two drinks at 3,50 € with 20 % and one dish at 12,90 € with 10 %, together 19,90 €.
 */
const items: Item[] = [{ quantity: 2, price: 350, tax: 20 }, { quantity: 1, price: 1290, tax: 10 }];

/**
 * 22.09.2026 at 20:30 in Vienna, written in UTC.
 */
const time: Date = new Date("2026-09-22T18:30:00Z");

let cashbox: Cashbox;

beforeEach((): void => {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    depDatabaseCreate(database);
    cashbox = {
        database,
        cashboxId: "WOKFLOW-1",
        key: Buffer.alloc(32, 1),
        certificateSerial: "1a2b3c4d",
        signer: (): Buffer => Buffer.alloc(64),
    };
});

/**
 * Reads the data line back out of a JWS.
 *
 * @param jws - JWS of a receipt
 * @returns Data line of the receipt
 */
function dataLineOf(jws: string): string {
    return Buffer.from(jws.split(".")[1], "base64url").toString("utf8");
}

test("a start receipt and a normal receipt are numbered, counted, chained, stored", (): void => {
    const first: DepEntry = receiptCreate(cashbox, [], "normal", time);
    const second: DepEntry = receiptCreate(cashbox, items, "normal", time);
    equal(
        dataLineOf(first.jws),
        "_R1-AT1_WOKFLOW-1_1_2026-09-22T20:30:00_0,00_0,00_0,00_0,00_0,00_wR7hXrYDXB0=_1a2b3c4d_A9uoGMk1JrA=");
    equal(
        dataLineOf(second.jws),
        "_R1-AT1_WOKFLOW-1_2_2026-09-22T20:30:00_7,00_12,90_0,00_0,00_0,00_AoC9QVGBkH0=_1a2b3c4d_sNKAk7giKHw=");
    equal(second.state, 1990);
    deepEqual(depRead(cashbox.database), [first.jws, second.jws]);
});

test("a storno subtracts its amounts from the counter and has STO in it", (): void => {
    const normal: DepEntry = receiptCreate(cashbox, items, "normal", time);
    const storno: DepEntry = receiptCreate(cashbox, items, "storno", time);
    equal(normal.state, 1990);
    equal(storno.state, 0);
    match(dataLineOf(storno.jws), /_-7,00_-12,90_0,00_0,00_0,00_U1RP_/);
});

test("a training receipt leaves the counter unchanged and has TRA in it", (): void => {
    const normal: DepEntry = receiptCreate(cashbox, items, "normal", time);
    const training: DepEntry = receiptCreate(cashbox, items, "training", time);
    equal(normal.state, 1990);
    equal(training.state, 1990);
    match(dataLineOf(training.jws), /_7,00_12,90_0,00_0,00_0,00_VFJB_/);
});
