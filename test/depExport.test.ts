/**
 * ## DEP export test
 *
 * Checks the text of the export file.
 */

import { test } from "node:test";
import { equal } from "node:assert/strict";
import { depExportCreate } from "../src/rksv/depExport.ts";


test("the export holds the certificates and every receipt in order", (): void => {
    equal(
        depExportCreate(["jws-1", "jws-2"], "MIIC-card", ["MIID-atrust", "MIID-root"]),
        '{"Belege-Gruppe":[{"Signaturzertifikat":"MIIC-card",'
        + '"Zertifizierungsstellen":["MIID-atrust","MIID-root"],'
        + '"Belege-kompakt":["jws-1","jws-2"]}]}');
});

test("an empty DEP gives a group without receipts", (): void => {
    equal(
        depExportCreate([], "MIIC-card", ["MIID-atrust", "MIID-root"]),
        '{"Belege-Gruppe":[{"Signaturzertifikat":"MIIC-card",'
        + '"Zertifizierungsstellen":["MIID-atrust","MIID-root"],'
        + '"Belege-kompakt":[]}]}');
});
