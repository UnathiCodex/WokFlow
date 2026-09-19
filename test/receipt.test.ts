/**
 * ## Receipt test
 *
 * Checks the amounts per tax rate and the data line of a receipt.
 */

import { test } from "node:test";
import { deepEqual, equal, throws } from "node:assert/strict";
import { amountFormat, dataLineCreate, taxAmountsSum, timeFormat } from "../src/./rksv/receipt.ts";


test("the items are summed per tax rate", (): void => {
    deepEqual(taxAmountsSum([
        { quantity: 2, price: 445, tax: 20 },
        { quantity: 1, price: 1990, tax: 10 },
        { quantity: 1, price: 1190, tax: 10 },
        { quantity: 3, price: 100, tax: 13 },
        { quantity: 1, price: 500, tax: 0 },
    ]), { taxNormal: 890, taxReduced1: 3180, taxReduced2: 300, taxZero: 500, taxSpecial: 0 });
    deepEqual(taxAmountsSum([]), { taxNormal: 0, taxReduced1: 0, taxReduced2: 0, taxZero: 0, taxSpecial: 0 });
});

test("an unknown tax rate fails", (): void => {
    throws((): void => { taxAmountsSum([{ quantity: 1, price: 100, tax: 19 }]); }, /Tax rate 19% is not allowed/);
    throws((): void => { taxAmountsSum([{ quantity: 1, price: 100, tax: 4.9 }]); }, /Tax rate 4.9% is not allowed/);
});

test("amounts are written in euros with a decimal comma", (): void => {
    equal(amountFormat(3180), "31,80");
    equal(amountFormat(5), "0,05");
    equal(amountFormat(0), "0,00");
    equal(amountFormat(-3180), "-31,80");
    equal(amountFormat(123450), "1234,50");
});

test("the time is written as Austrian local time in rksv format", (): void => {
    equal(timeFormat(new Date("2026-09-17T10:30:00Z")), "2026-09-17T12:30:00");
    equal(timeFormat(new Date("2026-01-15T11:05:09Z")), "2026-01-15T12:05:09");
    equal(timeFormat(new Date("2026-12-31T23:00:00Z")), "2027-01-01T00:00:00");
});

test("the data line joins all fields in the order of the RKSV", (): void => {
    equal(dataLineCreate({
        cashboxId: "WOKFLOW-1",
        number: 83,
        time: new Date("2026-09-17T10:30:00Z"),
        taxAmounts: { taxNormal: 890, taxReduced1: 3180, taxReduced2: 0, taxZero: 0, taxSpecial: 0 },
        counter: "l0Hl3jH+Poo=",
        certificateSerial: "1a2b3c4d",
        chaining: "o6ocitE7oo4=",
    }), "_R1-AT1_WOKFLOW-1_83_2026-09-17T12:30:00_8,90_31,80_0,00_0,00_0,00_l0Hl3jH+Poo=_1a2b3c4d_o6ocitE7oo4=");
});
