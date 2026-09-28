/**
 * ## Cashbox test
 *
 * Checks receipts of the cash register, from the items to the entry in the DEP.
 */

import { beforeEach, test } from "node:test";
import { deepEqual, equal, match, throws } from "node:assert/strict";
import { Buffer } from "node:buffer";
import { DatabaseSync } from "node:sqlite";
import { receiptCreate } from "../src/rksv/cashbox.ts";
import { depDatabaseCreate, depRead } from "../src/rksv/dep.ts";

import type { Cashbox } from "../src/rksv/cashbox.ts";
import type { DepEntry } from "../src/rksv/dep.ts";
import type { Item } from "../src/rksv/receipt.ts";
import type { Signer } from "../src/rksv/signature.ts";


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

test("a start receipt comes before the first bill, both numbered, counted, chained, stored", (): void => {
    const bill: DepEntry = receiptCreate(cashbox, items, "normal", time);
    const dep: string[] = depRead(cashbox.database);
    equal(dep.length, 2);
    equal(
        dataLineOf(dep[0]),
        "_R1-AT1_WOKFLOW-1_1_2026-09-22T20:30:00_0,00_0,00_0,00_0,00_0,00_wR7hXrYDXB0=_1a2b3c4d_A9uoGMk1JrA=");
    equal(
        dataLineOf(dep[1]),
        "_R1-AT1_WOKFLOW-1_2_2026-09-22T20:30:00_7,00_12,90_0,00_0,00_0,00_AoC9QVGBkH0=_1a2b3c4d_sNKAk7giKHw=");
    equal(dep[1], bill.jws);
    equal(bill.state, 1990);
});

test("without a working signature device there is no start receipt and no bill", (): void => {
    cashbox.signer = null;
    throws((): DepEntry => receiptCreate(cashbox, items, "normal", time));
    deepEqual(depRead(cashbox.database), []);
});

test("a new month starts with a monthly receipt, also at the turn of the year", (): void => {
    receiptCreate(cashbox, items, "normal", new Date("2026-12-31T21:14:00Z"));
    const january1: DepEntry = receiptCreate(cashbox, items, "normal", new Date("2027-01-02T10:30:00Z"));
    const january2: DepEntry = receiptCreate(cashbox, items, "normal", new Date("2027-01-15T10:30:00Z"));
    const february: DepEntry = receiptCreate(cashbox, items, "normal", new Date("2027-02-01T10:30:00Z"));
    match(dataLineOf(depRead(cashbox.database)[2]), /_3_2027-01-02T11:30:00_0,00_0,00_0,00_0,00_0,00_/);
    equal(january1.number, 4);
    equal(january2.number, 5);
    equal(february.number, 7);
});

test("a failure ends with a collective receipt as soon as the signature device works again", (): void => {
    const card: Signer | null = cashbox.signer;
    receiptCreate(cashbox, items, "normal", time);
    cashbox.signer = null;
    const failed1: DepEntry = receiptCreate(cashbox, items, "normal", time);
    const failed2: DepEntry = receiptCreate(cashbox, items, "normal", time);
    cashbox.signer = card;
    const back1: DepEntry = receiptCreate(cashbox, items, "normal", time);
    const back2: DepEntry = receiptCreate(cashbox, items, "normal", time);
    match(dataLineOf(depRead(cashbox.database)[4]), /_5_2026-09-22T20:30:00_0,00_0,00_0,00_0,00_0,00_/);
    equal(failed1.number, 3);
    equal(failed2.number, 4);
    equal(back1.number, 6);
    equal(back2.number, 7);
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
