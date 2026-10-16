/**
 * ## Tariff test
 *
 * Checks that the buffet is chosen by the time, the weekday, the holidays in Vienna.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { equal } from "node:assert/strict";
import { buffetOf } from "../src/buffet/tariff.ts";


test(
    "The buffet follows the weekday and the time of day over one week",
    (): void => {
        equal(buffetOf(new Date("2026-10-12T09:29:00Z")), null); // Monday 11:29, before opening
        equal(buffetOf(new Date("2026-10-12T09:30:00Z")), "Mittagsbuffet"); // Monday 11:30, open
        equal(buffetOf(new Date("2026-10-12T12:29:00Z")), "Mittagsbuffet"); // Monday 14:29
        equal(buffetOf(new Date("2026-10-12T12:30:00Z")), null); // Monday 14:30, closed
        equal(buffetOf(new Date("2026-10-12T14:00:00Z")), null); // Monday 16:00, gap
        equal(buffetOf(new Date("2026-10-12T15:00:00Z")), "Abendbuffet"); // Monday 17:00, open
        equal(buffetOf(new Date("2026-10-12T19:29:00Z")), "Abendbuffet"); // Monday 21:29
        equal(buffetOf(new Date("2026-10-12T19:30:00Z")), null); // Monday 21:30, closed

        equal(buffetOf(new Date("2026-10-13T10:00:00Z")), null); // Tuesday 12:00
        equal(buffetOf(new Date("2026-10-13T17:00:00Z")), null); // Tuesday 19:00

        equal(buffetOf(new Date("2026-10-14T10:00:00Z")), "Mittagsbuffet"); // Wednesday 12:00
        equal(buffetOf(new Date("2026-10-17T17:00:00Z")), "Abendbuffet"); // Saturday 19:00

        equal(buffetOf(new Date("2026-10-18T10:00:00Z")), "Sonntagsbuffet"); // Sunday 12:00
        equal(buffetOf(new Date("2026-10-18T17:00:00Z")), "Sonntagsbuffet"); // Sunday 19:00
        equal(buffetOf(new Date("2026-10-18T13:00:00Z")), null); // Sunday 15:00, gap
    }
);

test(
    "A holiday gets the holiday buffet, also on Tuesday and Sunday",
    (): void => {
        equal(buffetOf(new Date("2026-12-08T11:00:00Z")), "Feiertagsbuffet"); // Tuesday 12:00, UTC+1
        equal(buffetOf(new Date("2026-12-08T18:00:00Z")), "Feiertagsbuffet"); // Tuesday 19:00
        equal(buffetOf(new Date("2027-08-15T10:00:00Z")), "Feiertagsbuffet"); // Sunday 12:00, UTC+2
    }
);

test(
    "Winter time is read in Vienna time",
    (): void => {
        equal(buffetOf(new Date("2027-01-11T10:29:00Z")), null); // Monday 11:29, UTC+1
        equal(buffetOf(new Date("2027-01-11T10:30:00Z")), "Mittagsbuffet"); // Monday 11:30
    }
);
