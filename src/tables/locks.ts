/**
 * ## Table-lock
 *
 * The device that has the table open holds a table-lock.
 *
 * - `deviceId`: Device identifier, chosen by the device itself.
 * - `expires`: Time in milliseconds when the lock runs out.
 */
export type Lock = {
    deviceId: string;
    expires: number;
};

/**
 * Time in milliseconds a {@link Lock} lasts, unless its device renews it.
 */
export const lockDuration: number = 5000;

/**
 * Table-locks in server memory, at most one {@link Lock} for each table.
 */
export const locks: Map<string, Lock> = new Map();

/**
 * Locks a table for a device, so a table is open on one device only.
 * - Lock of a device runs out by itself after {@link lockDuration}.
 * - If the device holds the {@link Lock} already, the lock is renewed.
 *
 * @param tableId - Table identifier
 * @param deviceId - Device identifier
 * @returns `false` when another device has the table
 */
export function tableLock(tableId: string, deviceId: string): boolean {
    const lock: Lock | undefined = locks.get(tableId);
    if (lock !== undefined && lock.deviceId !== deviceId && lock.expires > Date.now())
        return false;

    locks.set(tableId, { deviceId, expires: Date.now() + lockDuration });
    return true;
}

/**
 * Unlocks a table, when the device has its {@link Lock}.
 *
 * @param tableId - Table identifier
 * @param deviceId - Device identifier
 */
export function tableUnlock(tableId: string, deviceId: string): void {
    if (locks.get(tableId)?.deviceId === deviceId)
        locks.delete(tableId);
}
