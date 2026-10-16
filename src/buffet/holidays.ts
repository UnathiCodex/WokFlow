/**
 * ## Holidays
 *
 * Finds the Austrian public holidays of a year.
 */

/**
 * Public holidays with a fixed date as `MM-DD`.
 */
const holidaysFixed: string[] = [
    "01-01", // Neujahr
    "01-06", // Heilige Drei Könige
    "05-01", // Staatsfeiertag
    "08-15", // Mariä Himmelfahrt
    "10-26", // Nationalfeiertag
    "11-01", // Allerheiligen
    "12-08", // Mariä Empfängnis
    "12-25", // Christtag
    "12-26", // Stefanitag
];

/**
 * Public holidays that move with Easter, as days after Easter Sunday.
 */
const holidaysAfterEaster: number[] = [
    1, // Ostermontag
    39, // Christi Himmelfahrt
    50, // Pfingstmontag
    60, // Fronleichnam
];

/**
 * Finds Easter Sunday of a year by the Meeus/Jones/Butcher algorithm.
 * - {@link Math.floor}: Rounds a division down, as TypeScript has no whole-number division.
 * - {@link Date.UTC}: Builds the date in UTC,
 *   so the time zone of the machine cannot shift the day.
 *
 * The letters `a` to `m` are named as in the algorithm.
 *
 * @param year - Year in the Gregorian calendar
 * @returns Easter Sunday at midnight UTC
 */
function easterOf(year: number): Date {
    const a: number = year % 19;
    const b: number = Math.floor(year / 100);
    const c: number = year % 100;
    const d: number = Math.floor(b / 4);
    const e: number = b % 4;
    const f: number = Math.floor((b + 8) / 25);
    const g: number = Math.floor((b - f + 1) / 3);
    const h: number = (19 * a + b - d - g + 15) % 30;
    const i: number = Math.floor(c / 4);
    const k: number = c % 4;
    const l: number = (32 + 2 * e + 2 * i - h - k) % 7;
    const m: number = Math.floor((a + 11 * h + 22 * l) / 451);
    const month: number = Math.floor((h + l - 7 * m + 114) / 31);
    const day: number = (h + l - 7 * m + 114) % 31 + 1;
    return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Finds the 13 public holidays of a year in calendar order.
 * - {@link easterOf}: Finds the Easter Sunday that the moving holidays follow.
 * - {@link Date.UTC}: Builds the date in UTC, a day beyond the month rolls over.
 * - {@link Date#toISOString}: Writes the date as `YYYY-MM-DD` and the time.
 * - {@link String#slice}: Cuts off the time.
 * - {@link Array#sort}: Orders the dates as text, which is calendar order.
 *
 * @param year - Year in the Gregorian calendar
 * @returns Dates as `YYYY-MM-DD` text
 */
export function holidaysOf(year: number): string[] {
    const easter: Date = easterOf(year);
    const fixed: string[] = holidaysFixed.map((date: string): string => `${year}-${date}`);
    const moving: string[] = holidaysAfterEaster.map((days: number): string => {
        const date: Date = new Date(Date.UTC(year, easter.getUTCMonth(), easter.getUTCDate() + days));
        return date.toISOString().slice(0, 10);
    });
    return [...fixed, ...moving].sort();
}
