/**
 * ## Table plan
 *
 * Shows the occupied tables on the plan, as the server knows them.
 *
 * - {@link fetch}: Sends an HTTP request.
 * - `occupied`: Identifiers of the occupied tables.
 * - {@link DOMTokenList#toggle}: Adds the class when its condition is true,
 *   else removes it.
 *
 * @throws {Error} - When the server gives no valid answer
 */
async function tablesShow(): Promise<void> {
    const response: Response = await fetch("/tables");
    const occupied: string[] = await response.json();

    document.querySelectorAll("[data-table]").forEach((table: Element): void => {
        const tableId: string = table.getAttribute("data-table") ?? "";
        table.classList.toggle("occupied", occupied.includes(tableId));
    });
}

/**
 * Shows the area of a tab and hides the other area.
 * - {@link Element#toggleAttribute}: Adds the attribute when its condition
 *   is true, else removes it.
 *
 * @param tab - Pressed tab
 */
function areaShow(tab: Element): void {
    document.querySelectorAll(".tabs button").forEach((other: Element): void => {
        other.classList.toggle("selected", other === tab);
    });
    document.querySelectorAll(".area").forEach((area: Element): void => {
        area.toggleAttribute("hidden", area.id !== tab.getAttribute("data-area"));
    });
}

/**
 * Starts the table plan, after the router has put its html into the page.
 */
export function planStart(): void {
    document.querySelectorAll(".tabs button").forEach((tab: Element): void => {
        tab.addEventListener("click", (): void => areaShow(tab));
    });

    tablesShow().catch((error: unknown): void => {
        console.error(error);
        document.querySelector(".offline")?.removeAttribute("hidden");
    });
}
