/**
 * ## Cash test
 *
 * Checks that a typed amount is read into whole cents.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { equal } from "node:assert/strict";
import { centsOf } from "../src/page/order/cash.ts";


test(
    "Typed amounts become whole cents",
    (): void => {
        equal(centsOf("60"), 6000);
        equal(centsOf("59.7"), 5970);
        equal(centsOf("59.70"), 5970);
        equal(centsOf("59,70"), 5970);
        equal(centsOf("0.05"), 5);
        equal(centsOf("60."), 6000);
    }
);

test(
    "Texts that are no amount give null",
    (): void => {
        equal(centsOf(""), null);
        equal(centsOf("1.2.3"), null);
        equal(centsOf("1,2.3"), null);
        equal(centsOf("abc"), null);
        equal(centsOf("1.234"), null);
        equal(centsOf("-5"), null);
    }
);
