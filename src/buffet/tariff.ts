/**
 * ## Tariff
 *
 * Chooses the buffet by clock, weekday, public holiday.
 *
 * - `./holidays.ts`: Finds the public holidays of a year.
 */

import { holidaysOf } from "./holidays.ts";


/**
 * Opening times of the buffet as `HH:MM` on the clock of the restaurant,
 * start included and end excluded: midday first, then evening.
 * Such text is ordered like the time of day.
 */
const buffetTimes: string[][] = [
    ["11:30", "14:30"],
    ["17:00", "21:30"],
];

/**
 * Finds the buffet that applies at a moment, or `null` when the buffet is closed.
 * - {@link Intl.DateTimeFormat}: Writes a moment in parts of the Vienna clock.
 * - {@link Intl.DateTimeFormatOptions.timeZone}: `Europe/Vienna` reads the clock
 *   of the restaurant, whatever the time zone of the machine.
 * - {@link Intl.DateTimeFormatOptions.hourCycle}: `h23` counts the hours 00 to 23,
 *   so midnight is not `24`.
 * - {@link Intl.DateTimeFormat#formatToParts}: Splits the moment into parts,
 *   each with a type and a value.
 * - {@link Object.fromEntries}: Turns the parts into an object by their type.
 * - {@link holidaysOf}: Finds the holidays of the year,
 *   which open the buffet even on Tuesday.
 *
 * `slot` is the position in {@link buffetTimes}:
 * 0 at midday, 1 in the evening, -1 when closed.
 * The buffet is named as in `../catalog/buffet.ts`.
 *
 * @param time - Moment to look at
 * @returns German name of the buffet article, or `null` when closed
 */
export function buffetOf(time: Date): string | null {
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Vienna",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    });
    const parts: Record<string, string> = Object.fromEntries(
        formatter.formatToParts(time).map(
            (part: Intl.DateTimeFormatPart): [string, string] => [part.type, part.value],
        ),
    );
    const date: string = `${parts.year}-${parts.month}-${parts.day}`;
    const clock: string = `${parts.hour}:${parts.minute}`;
    const slot: number = buffetTimes.findIndex(
        ([start, end]: string[]): boolean => clock >= start && clock < end,
    );
    if (slot === -1)
        return null;

    if (holidaysOf(Number(parts.year)).includes(date))
        return "Feiertagsbuffet";

    if (parts.weekday === "Sun")
        return "Sonntagsbuffet";

    if (parts.weekday === "Tue")
        return null;

    return slot === 0 ? "Mittagsbuffet" : "Abendbuffet";
}
