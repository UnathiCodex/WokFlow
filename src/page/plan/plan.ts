/**
 * ## Table plan
 *
 * Shows occupied tables reported by server.
 *
 * - {@link fetch}: Sends an HTTP request.
 * - `occupied`: IDs of occupied tables.
 * - {@link DOMTokenList#toggle}: Adds class when condition is true,
 *   else removes it.
 *
 * @throws {Error} - When server gives no valid answer
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
 * Shows selected area and hides other area.
 * - {@link Element#toggleAttribute}: Adds attribute when condition
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
 * Switches areas on horizontal swipes, suppressing their following click.
 */
function areaSwipeStart(): void {
    let start: { x: number; y: number; } | null = null;
    let suppressClick: boolean = false;

    document.body.addEventListener("pointerdown", (event: PointerEvent): void => {
        start = null;
        suppressClick = false;
        if (event.isPrimary && event.button === 0 && (event.target as Element).closest(".tabs, .area")) {
            start = { x: event.clientX, y: event.clientY };
        }
    });

    document.body.addEventListener("pointercancel", (): void => { start = null; });

    document.body.addEventListener("pointerup", (event: PointerEvent): void => {
        if (start === null) return;
        const x: number = event.clientX - start.x;
        const y: number = event.clientY - start.y;
        start = null;
        if (Math.abs(x) < 48 || Math.abs(x) < Math.abs(y) * 1.5) return;

        suppressClick = true;
        const tab: Element | null = document.querySelector(".tabs .selected");
        const next: Element | null = (x < 0 ? tab?.nextElementSibling : tab?.previousElementSibling) ?? null;
        if (next !== null) areaShow(next);
    });

    document.body.addEventListener("click", (event: MouseEvent): void => {
        if (suppressClick && event.detail !== 0) {
            suppressClick = false;
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }, true);
}

/**
 * Starts table plan after router has put its HTML into page.
 */
export function planStart(): void {
    document.querySelectorAll(".tabs button").forEach((tab: Element): void => {
        tab.addEventListener("click", (): void => areaShow(tab));
    });

    areaSwipeStart();
    tablesShow().catch((error: unknown): void => {
        console.error(error);
        document.querySelectorAll("body > :not(.offline)").forEach((block: Element): void => block.remove());
        document.querySelector(".offline")?.removeAttribute("hidden");
    });
}
