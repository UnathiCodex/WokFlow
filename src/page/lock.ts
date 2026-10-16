/**
 * ## Table-lock of the page
 *
 * Holds a table open on this device only.
 */

/**
 * Device identifier, chosen anew at each page load.
 * - {@link Math.random}: Random number between 0 and 1.
 * - {@link Number#toString}: With `36` writes the number in digits and letters.
 * - {@link String#slice}: Cuts off the leading `0.`.
 */
const deviceId: string = Math.random().toString(36).slice(2);

/**
 * Sends a lock or an unlock of a table to the server.
 *
 * @param method - `POST` locks or renews, `DELETE` unlocks
 * @param tableId - Table identifier
 * @returns `true` or `false` for a lock, `null` for an unlock
 * @throws {Error} - When server gives no valid answer
 */
export async function lockSend(method: string, tableId: string): Promise<boolean | null> {
    const response: Response = await fetch(`/tables/${tableId}/lock`, {
        method, // POST or DELETE
        body: JSON.stringify(deviceId),
    });
    return response.json();
}
