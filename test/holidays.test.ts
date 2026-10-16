/**
 * ## Holidays test
 *
 * Checks that the public holidays of a year are found in calendar order.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { holidaysOf } from "../src/buffet/holidays.ts";


test(
    "The holidays of 2027 are found in calendar order",
    (): void => {
        deepEqual(holidaysOf(2027), [
            "2027-01-01", // Neujahr
            "2027-01-06", // Heilige Drei Könige
            "2027-03-29", // Ostermontag, Easter Sunday is 28 March
            "2027-05-01", // Staatsfeiertag
            "2027-05-06", // Christi Himmelfahrt
            "2027-05-17", // Pfingstmontag
            "2027-05-27", // Fronleichnam
            "2027-08-15", // Mariä Himmelfahrt
            "2027-10-26", // Nationalfeiertag
            "2027-11-01", // Allerheiligen
            "2027-12-08", // Mariä Empfängnis
            "2027-12-25", // Christtag
            "2027-12-26", // Stefanitag
        ]);
    }
);

test(
    "The holidays after Easter move with Easter Sunday",
    (): void => {
        const holidays: string[] = holidaysOf(2049); // Easter Sunday is 18 April, not 25 (exception)
        equal(holidays.includes("2049-04-19"), true); // Ostermontag
        equal(holidays.includes("2049-05-27"), true); // Christi Himmelfahrt
        equal(holidays.includes("2049-06-07"), true); // Pfingstmontag
        equal(holidays.includes("2049-06-17"), true); // Fronleichnam
    }
);
