/**
 * ## Chaining test
 *
 * Checks the fingerprint that links each receipt to the one before.
 * The expected values were computed separately with `sha256sum`.
 * Run with `node --test`.
 */

import { test } from "node:test";
import { equal } from "node:assert/strict";
import { chainingCreate } from "../src/./rksv/chaining.ts";


test("the start receipt takes the fingerprint of the cash register ID", (): void => {
    equal(chainingCreate(null, "WOKFLOW-1"), "A9uoGMk1JrA=");
});

test("every other receipt takes the fingerprint of the previous JWS", (): void => {
    const previousJws: string = "eyJhbGciOiJFUzI1NiJ9.X1IxLUFUMV9XT0tGTE9XLTFfODM.CzBVep_E6Q4zWH2ix-wRNg";
    equal(chainingCreate(previousJws, "WOKFLOW-1"), "o6ocitE7oo4=");
});

test("the cash register ID does not matter once there is a previous JWS", (): void => {
    const previousJws: string = "eyJhbGciOiJFUzI1NiJ9.X1IxLUFUMV9XT0tGTE9XLTFfODM.CzBVep_E6Q4zWH2ix-wRNg";
    equal(chainingCreate(previousJws, "KASSE-2"), "o6ocitE7oo4=");
});
