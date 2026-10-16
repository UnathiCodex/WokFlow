/**
 * ## Money test
 *
 * Checks that cents are shown as euros with two decimals.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { equal } from "node:assert/strict";
import { money } from "../src/page/money.ts";


test(
    "Cents are shown as euros with two decimals",
    (): void => {
        equal(money(2790), "27.90\u202F€");
        equal(money(5), "0.05\u202F€");
        equal(money(1000), "10.00\u202F€");
        equal(money(0), "0.00\u202F€");
    }
);
