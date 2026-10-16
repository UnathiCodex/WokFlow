/**
 * ## Swipe
 *
 * Switches tabs on horizontal swipes, suppressing their following click.
 * The listeners stay on `document.body`, which the router replaces per screen.
 * - {@link Element#closest}: Tells whether the pointer went down inside the start selector.
 * - {@link Event#stopImmediatePropagation}: Keeps the click from the listeners of the tab or table;
 *   the capture phase (`true`) comes first.
 * - A swipe is at least 48 px wide and 1.5 times wider than high.
 * - `detail` is 0 for a click by keyboard, which is not suppressed.
 *
 * @param startSelector - Selector of where a swipe may begin
 * @param tabShow - Shows the tab a swipe leads to, next or previous sibling of the selected tab
 */
export function swipeStart(startSelector: string, tabShow: (tab: Element) => void): void {
    let start: { x: number; y: number; } | null = null;
    let suppressClick: boolean = false;

    document.body.addEventListener("pointerdown", (event: PointerEvent): void => {
        start = null;
        suppressClick = false;
        if (event.isPrimary && event.button === 0 && (event.target as Element).closest(startSelector)) {
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
        const next: Element | null =
            (x < 0 ? tab?.nextElementSibling : tab?.previousElementSibling) ?? null;
        if (next !== null) tabShow(next);
    });

    document.body.addEventListener("click", (event: MouseEvent): void => {
        if (suppressClick && event.detail !== 0) {
            suppressClick = false;
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }, true);
}
