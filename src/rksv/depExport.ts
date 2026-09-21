/**
 * ## DEP export
 *
 * Writes all receipts of the DEP as the export file that the RKSV requires.
 * One group per signature certificate.
 *
 * ```
 * {"Belege-Gruppe":[{"Signaturzertifikat":"...", "Zertifizierungsstellen":["..."], "Belege-kompakt":["..."]}]}
 * ```
 *
 * - `Signaturzertifikat`: Certificate of the card in Base64.
 * - `Zertifizierungsstellen`: Certificates above the `Signaturzertifikat` in Base64.
 * - `Belege-kompakt`: The JWS of the receipts, oldest first.
 */
export type DepExport = {
    "Belege-Gruppe": {
        "Signaturzertifikat": string;
        "Zertifizierungsstellen": string[];
        "Belege-kompakt": string[];
    }[];
};

/**
 * Builds the export file of the DEP as text.
 *
 * @param receipts - Every JWS of the DEP, oldest first
 * @param certificate - Certificate of the card in Base64
 * @param authorities - Certificates above the `certificate` in Base64
 * @returns Export file as JSON text
 */
export function depExportCreate(receipts: string[], certificate: string, authorities: string[]): string {
    const depExp: DepExport = {
        "Belege-Gruppe": [{
            "Signaturzertifikat": certificate,
            "Zertifizierungsstellen": authorities,
            "Belege-kompakt": receipts,
        }],
    };
    return JSON.stringify(depExp);
}
