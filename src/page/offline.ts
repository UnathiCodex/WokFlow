/**
 * ## Offline
 *
 * Shows hint in place of screen, when connection to server is gone.
 *
 * @param error - Error of the failed request, logged for search
 */
export function offlineShow(error: unknown): void {
    console.error(error);
    document.body.innerHTML = `<p class="hint">Keine Verbindung <span lang="zh-Hans">无连接</span></p>`;
}
