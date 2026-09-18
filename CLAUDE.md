# Asia Wok Kassensystem: Projektinfos

Stand: 18.09.2026, an diesem Tag auf Wunsch des Nutzers gekürzt (vorher 2.280 Zeilen).

**Alle Meta-Infos stehen nur in dieser Datei.** Keine Handoff- oder Memory-Dateien anlegen, nichts
verteilen. Neue Erkenntnisse und den aktuellen Stand hier nachtragen.
**Kurz halten (Nutzer, 18.09.2026):** Jeder neue Chat liest die ganze Datei. Hier steht nur, was die Arbeit noch
leitet: Regeln, Entscheidungen mit einem Satz Grund, offene Punkte, der Stand, der nächste Schritt. Kein Verlauf,
keine überholten Entwürfe, nichts doppelt, nichts, was Code oder Git schon festhalten.

## Zusammenarbeit

- **Chat-Sprache (Nutzer, 16.09.2026):** Englisch bevorzugt, bei Bedarf Deutsch, etwa bei österreichischen
  Fachbegriffen, Behörden, Steuern. Diese Datei ist deutsch.
- **Der Nutzer ist völliger TypeScript-Anfänger mit Java-Erfahrung (16.09.2026).** Jeden neuen Begriff am
  konkreten Code erklären, auch Grundlagen, gern wiederholt. Java-Vergleiche sind erwünscht, etwa die
  Index-Signatur `{ [name: string]: Group }` wie `Map<String, Group>`. **Nie mit einem Begriff erklären oder
  vergleichen, den er noch nicht kennt** (Nutzer verärgert, 16.09.2026: `Record` und `interface` kamen unerklärt
  als Vergleich); Neues zuerst selbst erklären, am einfachsten Beispiel.
- **Bibliotheksfunktionen am echten Aufruf erklären, nie mit der rohen Signatur aus `.d.ts` beginnen (17.09.2026):**
  Die Signatur von `test` mit `TestFn`, `TestContext`, `done`, `Promise` auf einmal war dem Nutzer zu viel („This is
  nothing but for a beginner“). Zweiter Anlauf: der erste echte Test, dazu eine vereinfachte Nachbildung im Stil von
  `transaction` (Funktion bekommt eine Funktion und ruft sie in `try` auf). Die echte Signatur danach Stück für Stück,
  als Zeilen mit Kommentar je Teil. Eine vereinfachte Nachbildung sofort neben die echte Signatur stellen und jede
  Abweichung nennen (`?`, Parametername, Rückgabetyp), sonst hält der Nutzer sie später für die echte (17.09.2026:
  „some shit signature which didn't have the question mark“). Gibt es Überladungen, zuerst alle zeigen und sagen,
  welche der eigene Aufruf nutzt.
- **Schwieriges von Grund auf aufbauen, mit winzigen Beispielen (Nutzer, 17.09.2026: „this explanation was good. So
  save it“):** Kommt eine Erklärung nicht an, nicht weiter mit Worten, Signaturen oder Java-Vergleichen nachlegen,
  sondern ganz unten neu anfangen und Schritt für Schritt hochbauen, je Antwort ein Schritt. Jedes Beispiel wenige
  Zeilen, Namen aus WokFlow (`"Cola"`), Ergebnis als Kommentar hinter jeder Zeile (`// Article: Cola`), Fehlertexte
  wörtlich wie in IntelliJ und vorher mit `tsc` und `node` in einer Kopie im Scratchpad geprüft. Vorbild, warum eine
  Test-Lambda weniger Parameter haben darf als `TestFn` anbietet: (1) reines JavaScript, `show(article)` mit einem,
  zwei, null Argumenten, zu viele werden ignoriert, fehlende sind `undefined`; (2) dieselbe Funktion in TypeScript,
  selbst aufgerufen muss die Anzahl stimmen, außer bei `?`; (3) `run(work)` ruft `work("Cola")`, übergebene Lambda
  mit gleich vielen, weniger, mehr Parametern: weniger passt, mehr ist ein Fehler. Vorher gescheitert: Worte über
  Aufrufer und Richtung, die `forEach`-Signatur mit vier Parametern, der Satz „JavaScript erlaubt beides“.
- **Schon erklärt, darauf aufbauen, nicht alles neu erklären** (nur Stichworte):
  - Node und Server: Node als Laufzeit, npm und devDependencies, Module und Imports, HTTP-Kopf und Inhalt,
    `setHeader`/`end`/`write`, Ports und localhost, UTF-8, Vererbung, IntelliJs getrennte Prüfungen für Code und
    Kommentar-Links, `request.url`, `readFileSync`, relative Pfade ab dem Startordner, `import.meta.dirname`.
  - TypeScript: `type`, Objekttyp, Union-Typ, Index-Signatur, `Record`, `Map`, `interface` (WokFlow nutzt `type`),
    `import type`, `typeof`, `===`, Narrowing (`Array.isArray` engt ein, `Number.isInteger` nicht), Template
    Literals, Spread `...`, Kurzschreibweise `{ tea }`, Hoisting, `const`/`let`, Semikolons, Komma nach dem letzten
    Eintrag, Shadowing, JSDoc-Tags, `//#region`, Array statt „Liste“, Dinero-Optionen, Strg+Klick, Strg+P, `number`
    wie Javas `double` (kein `int`, nur `bigint`).
  - Tests mit `node:test`: `test(name, lambda)` statt `@Test`, fehlschlagen heißt werfen, `?` am Parameter, `TestFn`
    als Funktionsform wie `work: () => void`, `t: TestContext` wie `order` bei `forEach`, Lambdas mit weniger
    Parametern, Rückgabetyp `void` oder `Promise<void>`, `undefined` gegen `null`, die vier Überladungen von `test`,
    `done`, Funktionen als Werte, `interface` und `type` verschwinden beim Ausführen, `any` gegen `unknown`, Typ vom
    Zieltyp, `deepEqual` mit und ohne `/strict`, `:memory:` und `databaseTest`, `import * as`, `throws` mit
    Suchmuster `/…/` gegen Text, warum Tests überhaupt (ein Test ist das aufgeschriebene Klicken: nach jedem Umbau
    von `menu.ts` sah er in einer Sekunde grüne Zeilen, statt Server und Handy zu starten). Offen: `Promise`,
    `node --test`.
  - SQLite: `StatementSync` mit `run`/`get`/`all` (`run` liefert nur `{ changes, lastInsertRowid }`), jede einzelne
    Anweisung ist schon eine Transaktion, `BEGIN`/`COMMIT`/`ROLLBACK` an der echten SQL-Folge, ohne `ORDER BY` ist
    keine Reihenfolge zugesagt (wie beim Durchlaufen einer `HashMap`), SQL-`AS` gegen TypeScript-`as`, `IS` gegen
    `=` (die Mischung im Code bleibt, Nutzer: „nevermind“), `!==` gegen `!=`, `COUNT` mit `GROUP BY`, `LIMIT ?`, `IN (SELECT …)` (Nutzer, 18.09.2026: in einer anderen
    Session durchgegangen und verstanden).
  - Git: Staging-Bereich, `-m`/`-M`, Branch als Lesezeichen, `parent`, Abzweigung, `origin/main`, `-u`, lokale gegen
    allgemeine `.gitconfig`, `refs/heads/main`, Push (auch abgelehnt: `fetch first`, `non-fast-forward`), `fetch`,
    `merge`, `pull` als `fetch` plus `merge`, fast-forward, blob-tree-commit, `HEAD`, detached HEAD. Offen: Konflikt,
    Zusammenarbeit praktisch üben. Schrittweise Animationen mit „Weiter“ kommen sehr gut an; einfacher sprechen,
    für Grundideen Buchstaben A, B, C statt Commit-Kennungen.
- **Kurz, in Schritten (Nutzer, 17.09.2026: „Your explanation is still too long“):** Höchstens drei bis vier Sätze,
  ein Gedanke, höchstens eine Frage; mehr nur auf Wunsch. Keine unerklärten Fachwörter. Eine Erklärung ist eine
  Folge kleiner Schritte, je Antwort genau einer: ein winziges Beispiel, ein bis zwei Sätze, dann „Questions?“ und
  warten. Nie mehrere Teile eines Ausdrucks in einer Antwort erklären, etwa bei `flatMap`: Schritt 1 nur `flat` an
  zwei Arrays, Schritt 2 `flatMap`, Schritt 3 `Object.values`, Schritt 4 alles zusammen.
- **Gilt für jede Antwort, auch Berichte und Übergaben (Nutzer, 18.09.2026: „too much, paragraph should be SHORT
  … chunking, if there is more then offer continue“):** kurze Absätze, nur das erste Stück zeigen, dann anbieten
  weiterzumachen. Langes gehört in diese Datei, in den Chat nur der Hinweis darauf. Verstoß: eine Übergabe mit sechs
  Abschnitten in einer Antwort.
- **Weiche, aber sehr enge Obergrenze für jede Antwort (Nutzer, 18.09.2026 abends, zum wiederholten Mal: „your
  answers are too long … Even your answer currently is too long“; danach: „not a hard limit but rather a soft limit
  but really really tight“):** Richtwert etwa sechs kurze Zeilen Text und dazu höchstens ein kleiner Codeblock oder
  eine kleine Tabelle; mehr nur, wenn die Sache es wirklich braucht, etwa ein Codeblock, den er ausdrücklich verlangt. Stellt er mehrere Fragen, nur die erste beantworten und die übrigen
  in einer Zeile als „kommt danach“ nennen. Keine Begründungen, Nebenbemerkungen, Alternativen, wenn er nicht danach
  fragt. Verstöße an diesem Abend: Antworten mit drei Überschriften, Tabellen mit acht Zeilen, Seitenbemerkung zu
  Java-Backslashes, die eine halbe Stunde Verwirrung kostete.
- **Langsam, ein Thema je Antwort (Nutzer, 18.09.2026: „too much requests … we have to sort it out slowly
  again“, „I don't know what you removed and what not“):** Beim ersten Lesen von `api.ts` stellte er in fünf
  Nachrichten sieben Fragen; Claude antwortete auf alle zugleich und patchte nebenbei. Richtig: nur ein Thema je
  Antwort, die übrigen Fragen in einer Zeile als „wartet“ nennen. Nach jedem Patch jede geänderte Zeile wörtlich
  zeigen, Datei für Datei: Eine nur beschriebene Entfernung („the `Dinero` line“) verstand er falsch und ließ sie
  zurückholen, obwohl er sie selbst wollte. **Auch der Patch-Bericht kommt in Stücken (Nutzer, 18.09.2026: „this is
  too much to digest … you should explain this chunk by chunk“):** Stück 1 ist nur die eine Zeile, die das
  Verhalten ändert, dazu ein Satz zum Testergebnis; danach je Antwort ein weiteres Stück (was entfernt wurde, was
  sich im Test änderte). Verstoß: ein Bericht mit vier Abschnitten nach dem Menü-Patch.
- **Was ankommt (16. bis 18.09.2026):** Konkretes aus dem Restaurant mit Cola und Red Bull, nummerierte Schritte,
  die echte SQL-Folge (`BEGIN`, zwei `INSERT`, `COMMIT`), ein kleiner Versuch im Arbeitsspeicher, eine
  Gegenüberstellung „heutiger Code“ gegen „anderer Weg“. Nicht angekommen: Abstraktes („SQLite weiß nicht, welche
  Anweisungen zusammengehören“), „Phone A/B“, Spezifikation und Vorher/Nachher in einer Antwort. Erst die Funktionen
  erklären, die einen Helfer benutzen, dann den Helfer (Nutzer, 16.09.2026). Bei Tests besonders kleinschrittig, der
  Nutzer nennt sich dort „really unfamiliar“.
- **„Überall“ heißt im ganzen Projekt (Nutzer, 17.09.2026):** Bei „everywhere“ alle Dateien unter `src/` und `test/`
  durchsuchen, nicht nur die Datei, um die es gerade ging.
- **Ein Wort, eine Bedeutung (16.09.2026):** „order“ hieß im ersten Bau der offene Vorgang, im Prototyp die Position;
  der Nutzer verstand den Code deshalb nicht. „table“ ist im Code der Tisch; Datenbanktabellen im Chat immer „database
  table“ nennen, bei Verwechslung auf Deutsch trennen, Tisch gegen Tabelle.
- **Eine Frage oder ein Wunsch ist kein Auftrag (Nutzer, 16.09.2026):** In Dateien nur auf ausdrückliche Anweisung
  schreiben („patch“, „mach das“, „rename …“). Fragt der Nutzer, wo etwas ist oder woher etwas kommt, oder sagt er,
  wie er etwas haben will („I want to do it above …“), nur antworten und den Code im Chat zeigen; er baut solche
  Stellen oft selbst. Neue Dateien nur nach ausdrücklichem Ja.
- **Stil des Nutzers erhalten:** Was er selbst schreibt oder korrigiert, etwa Code, Namen, Kommentare, nicht glätten,
  nicht zurückbenennen, entfernte Wörter nicht wieder einsetzen. Vor Änderungen den aktuellen Stand lesen,
  Anpassungen auf die betroffenen Angaben begrenzen.
- Aufzählungsstil des Nutzers (15. und 16.09.2026): genau zwei Elemente mit `und`/`and` verbinden, etwa
  `Reads and writes`; ab drei Elementen gleichmäßig, etwa `A, B, C`, `A-B-C`, `A oder B oder C`, ohne
  abschließendes `und`/`and` und ohne ein nur beim letzten Element ergänztes `oder`/`or`. Gilt im Chat, in
  Kommentaren, in der Dokumentation.
- Gesprächsvorbereitungen und Checklisten nur kurz im Chat zeigen, nicht in CLAUDE.md ablegen (15.09.2026).
  Unter Zeitdruck nur die wichtigsten Punkte.
- TOUCHIT dient zum Vergleich von Abläufen und Schwächen, nie als Bauvorlage; keinen Hersteller-Code
  kopieren. Vorschläge mit dem bisherigen Ablauf vergleichen und am tatsächlichen Restaurant begründen.
- Mehrere Sessions schreiben parallel in diese Datei: vor Änderungen frisch lesen, gezielt bearbeiten, den gültigen
  Stand festhalten; Überholtes ersetzen statt Verlauf anzuhängen.
- Hilfswerkzeuge nur vorübergehend nutzen und eigene Hilfsdateien danach entfernen.

## Coden

- So wenig Code, Dateien, Einstellungen und Bibliotheken wie nötig. Keine Vorratslösungen oder
  auskommentierten Reste. Bei einem Konflikt gewinnt Lesbarkeit, sonst Kürze. Jede Funktion hat eine Aufgabe
  (Nutzer, 17.09.2026).
- **Erst einfach, Tempo später (Nutzer, 18.09.2026: „just try to code as easy as possible. And if the speed is
  good, then we just let this be“):** zuerst den einfachsten Weg bauen und am echten Handy ausprobieren;
  Zwischenspeichern, Cache-Einstellungen und ähnliche Feinheiten erst, wenn etwas spürbar langsam ist. Solche
  Themen im Chat nicht vorab ausbreiten: Mit „was der Browser speichert und was nicht“ konnte er nichts anfangen.
- **Ganze Module statt Zeile für Zeile (Entscheidung des Nutzers, 16.09.2026 abends, ersetzt die Regel „eine Zeile
  je Schritt“):** Claude baut ein Modul komplett samt Tests, der Nutzer liest es danach und fragt, was er nicht
  erklären kann (Warum-Liste). Ablauf, Schutz des Bestehenden, Tiefe der Fragen unter „Nächster Chat“ ab
  „Arbeitsweise je Modul“.
  Weiter gültig: Änderungen an bestehenden Dateien zuerst als Vorher/Nachher im Chat zeigen (Nutzer: „Show me the
  code here first, if I understand it, then you patch it“). Lern- und Beispielcode nur im Chat, keine Beispieldateien
  oder Beispielordner (14.09.2026).
- Befehle wie `npm install`, `npm start`, Tests und Serverstart zuerst erklären und dem Nutzer geben;
  nur auf ausdrücklichen Auftrag ausführen. Er möchte diese Schritte selbst lernen. Zur eigenen Kontrolle nach
  Änderungen liefen am 16.09.2026 ohne Einwand eine Typprüfung und ein Ladeversuch, beide im Ordner `WokFlow`:
  `node_modules/.bin/tsc.cmd --noEmit --allowImportingTsExtensions --module nodenext --target esnext --types node src/server/index.ts test/orders.test.ts`
  (die Optionen braucht es ohne `tsconfig.json`, seit TypeScript 6 ist `types` standardmäßig leer) und
  `node -e 'import("./src/catalog/menu.ts").then(m => console.log(Object.keys(m.menu)))'`.
  Gründlich prüfen wie am 18.09.2026: Typprüfung, Tests, dazu absichtlich kaputte Kopien der Quelldatei im
  Scratchpad; jeder eingebaute Fehler muss mindestens einen Test rot machen. Nie in den Ordnern des Nutzers
  ausprobieren.
- **Node 26 führt `.ts` direkt aus (Type Stripping):** kein Kompilieren, aber ein laufender Server liest Code nur
  beim Start. Deshalb Typen immer mit `import type` importieren, sonst bricht Node beim Start ab („does not provide
  an export named …“, zweimal passiert). Kein `enum` und kein `namespace` („not supported in strip-only mode“),
  stattdessen Union-Typen wie `"pure" | "water"`.
- Englisch: Namen von Variablen, Funktionen, Dateien, feste Werte im Code (Nutzer,
  16.09.2026), dazu JSDoc. Deutsch: sichtbare Texte. Artikelnamen immer
  deutsch und chinesisch, keine englischen Artikelübersetzungen. `name.de` und `name.zh` sind die einzige Quelle für
  Taste, „Bestellt“, Rechnung, Druck; nichts aus Bezeichnern ableiten.
- **Namensstil des Nutzers (16.09.2026):** camelCase, das Gemeinsame zuerst, dann das Unterscheidende, etwa
  `buffetSmall`, `buffetBig`, `variantsBottle`, `variantPieces`. Gruppenschlüssel in `menu.ts` sind die Listennamen
  (`soups`, `warmDrinks`). Er benennt oft selbst um (`variantsFull`, `menu.ts`); nicht zurückbenennen.
  Funktionen und Typen ebenso, Substantiv zuerst, dann Verb oder Merkmal (Nutzer, 16.09.2026, ausdrücklich zum
  Ausprobieren, Rückbau auf Wunsch): `orderbookCreate`, `orderAdd`, `orderRemove`, `ordersUpdate`, `ordersRead`,
  `tableClose`, `databaseOpen`, im Test `databaseTest`, Typ `OrderNew`; Nachschlagen und Umwandeln mit `Of`
  (`entryOf`, `orderOf`, Namen von ihm). Unüblich in TypeScript, schadet aber nicht; Namen aus
  Bibliotheken bleiben, wie sie sind (`createServer` und `readFileSync`).
- **Objekt oder Kennung (Nutzer, 17.09.2026, in `orders`):** Ist das Objekt gemeint, heißt es `article` bzw.
  `variant`; ist der deutsche Name als Kennung gemeint, `articleId` bzw. `variantId`. In der Datenbanktabelle
  `article_id` und `variant_id` wie `table_id`; `ordersRead` benennt sie mit `AS articleId` und `AS variantId` um.
- **camelCase in TypeScript, Unterstrich nur in der Datenbank (Nutzer, 17.09.2026: „you should be consistent“):** im
  Code `tableId`, nie `table_id`; Spalten in SQL `table_id`, weil SQLite Groß- und Kleinschreibung in Namen
  ignoriert (`tableId` und `tableid` sind dieselbe Spalte, geprüft).
- Ordner nach Aufgaben, Dateien nach Inhalt, keine Sammeldateien wie `types.ts` oder `types/` (15.09.2026):
  `src/catalog/` Artikelbestand, `src/tables/` Tische und ihre Bestellungen, `src/server/` Server. Typen stehen bei
  ihren Daten.
- Typen ausdrücklich an Konstanten, Parametern und Rückgabewerten, zum Lernen erwünscht; `type` statt `interface`.
  Eine Konstante, die eine Lambda hält, verdoppelt mit ausgeschriebenem Funktionstyp die Parameterliste (`const
  errorRequest: (error: unknown) => void = (error: unknown): void => …`); das hat den Nutzer am 18.09.2026 sehr
  gestört („the name is doubled“). Deshalb Lambdas ohne Namen direkt an der Stelle lassen, wie in `transaction` und
  `serverCreate`; ob eine benannte Lambda den Typ links weglassen darf, ist nicht entschieden.
  Doppelte Anführungszeichen und vier Leerzeichen Einrückung. Kurze verschachtelte Objekttypen in einer Zeile,
  etwa `name: { de: string; zh: string; } | null;`.
- **Formatierung über `WokFlow/.editorconfig`** (16.09.2026, jede Einstellung mit englischem `#`-Kommentar, Namen
  in IntelliJ 2026.1 geprüft): vier Leerzeichen, Leerzeichen innerhalb `{ }` bei Objekten, Objekttypen, Imports,
  bis zu zwei Leerzeilen, kein `max_line_length` (Nutzer, 17.09.2026). Fehlt noch etwas, dort ergänzen, nicht in
  `.idea`. **Komma nach dem letzten Eintrag:** bei Listen über mehrere Zeilen ja (Arrays, Objekte, Imports,
  Argumente, Parameter), bei einzeiligen nein, nie nach `...rest`; in `.editorconfig` als
  `ij_typescript_enforce_trailing_comma = whenmultiline`.
- **Tests (Nutzer, 17. und 18.09.2026; das Muster ist `test/orders.test.ts`):**
  - Aufbau, von ihm am ersten Test vorgemacht: `test(` allein, darunter der Name in eigener Zeile, darunter die
    Lambda, dann `);`. Kurze Lambda in einer Zeile mit Klammern, `(): void => { deepEqual(…); }`; längere mit
    Klammern über mehrere Zeilen. Nach der Lambda kein Komma, wie im Beispiel des Nutzers, obwohl die Komma-Regel
    oben eins verlangt und Strg+Alt+L es einfügen würde; offen, was gilt.
  - **Der Name eines Tests beginnt mit einem Großbuchstaben, ohne Punkt am Ende („the name of a test should start
    big“):** `"Sending saves all orders or none"`.
  - **So viele Tests wie nötig, so wenige wie möglich:** ein Ablauftest für den Hauptweg („much better to go through
    all the send“), dazu je ein kurzer Test für jede Regel, die der Ablauf nicht zeigen kann („alle oder keine“,
    „freier Tisch“). Kein eigener Test für einen Randfall, der schon in einem anderen Test mitgeprüft wird oder keine
    eigene Regel ist. Der Nutzer liest die Testnamen und einen Test ganz, nicht jeden Testkörper.
  - Testdaten als Konstanten auf Dateiebene direkt unter seinem `beforeEach`-Block, gebaut mit `orderOf`, keine
    festen Preise oder Steuersätze. Namen von ihm: Artikel, bei Cola die Größe, dann immer die Menge als Ziffer
    (`colaSmall1`, `colaBig2`, `redBull0`, `redBull1`); keine Namen wie `colaLater` oder `colaTwo`, keine Konstante
    ohne Ziffer.
  - Frischer Zustand je Test (seine Entscheidung gegen Claudes Empfehlung, nicht zurückbauen): auf Dateiebene
    `let database: DatabaseSync;` und `beforeEach((): void => { database = databaseTest(); });`, um den Block je zwei
    Leerzeilen. Nie eine Datenbank über Tests teilen. `test/setup.ts` hält alles, was nur Tests brauchen;
    `node --test` führt sie als eigene, bestandene Datei mit, das stört ihn nicht, deshalb kein Muster wie
    `"test/*.test.ts"`.
  - **Tests prüfen keine Fehlertexte („the wording can change so better to just see if something is thrown“):**
    `throws(lambda)` ohne zweites Argument. Das Risiko, dass aus einem anderen Grund geworfen wird, deckt der
    Ablauftest, der dieselben Funktionen ohne Fehler durchläuft.
  - Eine Test-Lambda mit `(t, done)` ohne Aufruf von `done()` hängt ohne Zeitlimit ewig (geprüft).
  - `node:test` gegen eine Datenbank im Arbeitsspeicher, keine neue Bibliothek, Start mit `node --test` im Ordner
    `WokFlow`, kein Skript in `package.json`.
- **Fehlertexte (Nutzer, 18.09.2026: „one time you put in the table ID, one time not … very shitty“):** in einer
  Datei immer gleich aufgebaut. Ein Fehlertext nennt, was der Aufrufer nicht weiß (Artikel, Menge), nicht was er
  selbst übergeben hat (`tableId`); `api.ts` protokolliert Zeit und Adresse mit dem Tisch dazu. Seine Texte: „…
  needs a valid quantity of at least 1“, „Not enough ${order.articleId} to remove ${order.quantity}“, „No open
  orders“.
- **SQL im Code (Nutzer, 18.09.2026, selbst zurückgebaut, nicht wieder einführen):** keine benannte
  `StatementSync`-Konstante; `database.prepare(…).run(…)` steht direkt an der Stelle, auch in der Schleife, wie in
  `tableClose`. Schleife von ihm `portion = 1; portion <= order.quantity`. `ORDER BY` genau dort, wo die Reihenfolge
  zählt. Nach jeder Änderung an `orderbookCreate` die echte `wokflow.db` anpassen und den Nutzer ans Neueinlesen
  (Refresh) der Datenquelle im Datenbank-Fenster erinnern: IntelliJs SQL-Prüfung liest die Spalten von dort und
  meldet sonst veraltete Fehler im Code. Die Datei lässt sich nicht löschen, solange IntelliJ sie offen hält
  („Device or resource busy“); eine leere Tabelle dann mit `node:sqlite` per `DROP TABLE` entfernen und neu anlegen.
- **Imports (Nutzer, 17.09.2026, für die Lesbarkeit):** Ab vier Namen aus einer eigenen Projektdatei und ab sechs
  Namen aus einem externen Modul (Node oder Bibliothek) `import * as name from …` statt einzelner Namen.
  Die Grenzen gelten je Quelldatei; Name wie die Datei, etwa `orders.ordersUpdate`. Drei Namen aus einer eigenen
  Datei bleiben einzeln importiert, weil sie noch gut lesbar sind, etwa `{ menu, entryOf }` (Nutzer: `menu.menu` ist
  hässlich).
  Reguläre Imports stehen vor `import type`. Genau eine Leerzeile zwischen den Gruppen, wenn die Datei mindestens
  drei reguläre Import-Anweisungen und mindestens zwei `import type`-Anweisungen enthält, **oder wenn die Gruppe der
  `import type` mindestens drei Anweisungen hat (Nutzer, 18.09.2026, an `orders.ts` mit 2 regulären und 3
  Typ-Imports: „has at least three, then split them with a single line too“)**; sonst stehen die Gruppen direkt
  untereinander. **Eine Gruppe mit nur einer Anweisung bekommt nie eine trennende Leerzeile, egal welche (Nutzer,
  18.09.2026: „single import or import type not gets blank line“);** `menu.ts` und `orders.test.ts` (je 4 und 1)
  bleiben deshalb ohne. Kurz: Leerzeile genau dann, wenn beide Gruppen mindestens zwei Anweisungen haben und
  mindestens eine Gruppe drei. Am 18.09.2026 über alle Dateien geprüft, alle stimmen.
- **Aufbau in `src/catalog/`:** nach den Imports und um Regionen zwei Leerzeilen, sonst eine. Regionen als
  `//#region Name` … `//#endregion Name`, ohne Leerzeichen nach `//` (sonst faltet IntelliJ nicht), verschachtelbar;
  nur wo eine Datei mehrere Teile hat (`Typedefinitions` und `Typefactories` in `articles.ts`, `Variants` in
  `food.ts` und `drinks.ts`). Ein `if` mit einer Anweisung darf ohne geschweifte Klammern stehen.
- **Datendateien sehen aus wie Daten (Nutzer, 16.09.2026):** Hilfsfunktionen nur, wo sie viel Wiederholung sparen.
  Eine Kette von Helfern für Getränke (`Serving`, `variantDrink`, `variantsSizes`) war dem Nutzer zu schwer lesbar
  und ist zurückgebaut; Varianten stehen so ausgeschrieben, wie sie auf Taste und Rechnung erscheinen.
- **JSDoc** englisch, ohne Beispiele oder Beispielwerte, nur über Deklarationen, nicht über Anweisungen; bei
  Konstanten beschreibt er den Inhalt. Jede Funktion und jeder Typ bekommt einen, ebenso die Konstanten in
  `menu.ts`. Die Listen in `buffet.ts`, `food.ts`, `drinks.ts` stehen ohne JSDoc, Name und Daten erklären sich selbst.
  - Funktionen wie von IntelliJ generiert: Beschreibung, darunter `@param name - …` für jeden Parameter, sonst
    meldet IntelliJ „Parameter is not described“.
  - **`@throws` wie in Javadoc (Nutzer, 18.09.2026):** Jede Funktion, die wirft oder einen Fehler durchreicht,
    bekommt nach `@param` und `@returns` genau eine Zeile `@throws {Error} - When …`, mit Bindestrich, ohne Punkt, so
    kurz wie möglich, ohne Nebensatz; nichts wiederholen, was die Beschreibung schon sagt (sein Kürzen: „Error of the
    work thrown again“ statt „…, thrown again after the ROLLBACK“). Kein Satz „Throws when …“ mehr in der
    Beschreibung. `transaction` reicht durch: `@throws {unknown}`.
  - **Aus seinen Korrekturen vom 18.09.2026:** Der Kommentar benutzt das Verb des Funktionsnamens (`orderRemove`:
    „remove“, nie „take off“). `@returns` nennt den Typ als Link (`@returns {@link MenuEntry} with price and tax
    rate`, nicht „Entry …“). Eine Beschreibung darf direkt mit dem Link beginnen, ohne „The“.
  - **Namen und Form aus der früheren Fassung von `ordersUpdate` (Nutzer, 18.09.2026, selbst gepatcht):** Listen
    als Parameter heißen `ordersToAdd`, `ordersToRemove` (Verb-Namen nur für Funktionen, kein `orderlist`; seit dem
    Typ `OrdersUpdate` hat die Funktion diese Parameter nicht mehr, die Namensregel gilt weiter); eine Lambda direkt in
    `transaction(database, (): void => { … });` statt einer inneren Funktion `work`; eine zu lange Signatur bricht
    nach dem zweiten Parameter um, die Fortsetzung steht unter dem ersten Parameter. Neuere Form von ihm in
    `requestHandle` (18.09.2026 abends, selbst umgebrochen, nicht zurückbauen): jeder Parameter in eigener Zeile
    unter dem ersten, danach eine Leerzeile vor dem Funktionskörper.
  - Objekttypen: ein JSDoc vor dem Typ, Properties als Liste `` - `name`: … ``, nur die erklärungsbedürftigen;
    keine Kommentare an einzelnen Properties. In `.ts` gibt es dafür kein Tag, `@property` gehört zu `@typedef`
    in JavaScript.
  - Links nur als `{@link Name}`, ohne `|` und Linktext. Benutzte Bibliotheksfunktionen bei Bedarf so erklären,
    Methoden über ihre deklarierende Klasse (`{@link Writable#end}` mit Import aus `node:stream`); dafür nötige
    Imports sind erlaubt. IntelliJ prüft Kommentar-Links selbst und braucht dafür `@types/node`.
  - **Kommentare in `api.ts`, vom Nutzer am 18.09.2026 abends selbst umgeschrieben („I want you to learn from your
    mistakes, quoting me, making comments“); so schreibt er sie, so soll Claude sie schreiben:**
    - Unter dem ersten Satz eine Stichpunktliste statt weiterer Sätze; Fortsetzungszeilen eingerückt unter dem Text.
    - In Stichpunkten kein Artikel am Anfang: „Sends menu.“, „Sends open orders of the table.“ Sein „no need the …
      just "sends menu"“ meinte das Wort „the“; Claude verstand es nicht und bot zwei falsche Lesarten an.
    - Benutzte Funktionen als Stichpunkte mit Link und einem kurzen Satz, eigene wie fremde: `{@link createServer}:
      Stores the lambda and calls it once per request, with a fresh request and response from Node.`, dazu
      `{@link requestHandle}` und `{@link responseSend}`. Das Verhalten in einem Satz statt in drei Zeilen: „Answers
      an error of requestHandle with status `500` without stopping the server.“ Beim zweiten Nennen kein Link mehr.
    - Adressen in der Form der HTTP-Anfragezeile (`` `GET /api/menu`: Sends menu. ``), Statuscodes in Backticks.
    - Kurze `//`-Kommentare über lokalen Konstanten, wenn der Inhalt nicht offensichtlich ist: groß beginnen, kein
      Punkt, sagen, was drinsteckt („// Path of the url, without protocol, host, port“).
    - Claudes Fehler, die er dabei korrigiert hat: zu lange Sätze, drei Zeilen für eine Aussage, Wiederholung dessen,
      was die Funktion darunter ohnehin zeigt („should be as short as possible because the function below explains
      this already“).
  - **Ausnahme von „ohne Beispiele“ auf seinen ausdrücklichen Wunsch (18.09.2026):** Der JSDoc von `requestHandle`
    in `api.ts` listet die drei Adressen in der Form der HTTP-Anfragezeile (`` `GET /api/menu`: Sends the menu. ``)
    und zeigt darunter eine echte HTTP-Anfrage als Codeblock mit drei Backticks (erste Zeile, Kopfzeilen, Leerzeile,
    Körper). Nur dort; anderswo weiter keine Beispiele, außer er verlangt sie.
  - **Wörtliche Werte aus dem Code stehen im Kommentar in Backticks (Nutzer, 18.09.2026):** Statuscodes als
    `` `400` ``, `` `404` ``, `` `500` ``, wie schon `closed` oder `BEGIN`. Testnamen sind schlichter Text und bleiben
    ohne Backticks. Am 18.09.2026 überall umgesetzt (drei Stellen, alle in `api.ts`).
  - **Verlinkbares immer verlinken (Nutzer, 17.09.2026: „if something is linkable, link it“, „take it
    seriously“):** Nennt ein Kommentar einen Typ, eine Funktion oder eine Konstante, die in der Datei erreichbar ist,
    steht dort `{@link Name}`, je Kommentar beim ersten Nennen; über Stern-Import mit Namensraum
    (`{@link orders.Order}`, `{@link articlesDrink.lemon}`). Mehrzahl als `{@link Order}s`, außer die Mehrzahl ändert
    das Wort (`categories`), dann ohne Link. Modulzeilen im Dateikopf und Datenbanknamen wie `orderbook` bleiben in
    Backticks.
  - **Form der Sätze (Nutzer, 18.09.2026, in `ordersRead` von Hand korrigiert: „there were a little bit flaws in the
    comments. Learn from it“):**
    - Jeder Satz endet mit einem Punkt, auch der letzte eines Blocks. Wer einen JSDoc anfasst, prüft alle seine
      Zeilen, nicht nur die neue.
    - Keine langen Kommentarzeilen, **Richtwert rund 75 Zeichen** (abgelesen an seinen Korrekturen). **Umbruch dort,
      wo ein Mensch beim Sprechen eine Pause macht (Nutzer, 18.09.2026, ausdrücklich korrigiert):** nicht mechanisch
      vor „so“ oder „and“, sondern wenn die Zeile zu lang wird, an der Stelle, an der man beim Vorlesen natürlich
      absetzt. Das ist oft nach einem Komma oder vor „so“, „and“, „with“, aber das Wort ist nicht die Regel, die
      Sprechpause ist es. Satz vor dem Umbrechen halblaut lesen. Der Rest läuft in der nächsten Zeile weiter; jeder
      Satz beginnt in einer neuen Zeile. Von ihm gebrochen: „Sorts the {@link Order}s by their oldest open portion,“
      und „so a variant keeps its place while portions are sent or removed.“ Die Regel gilt für jede Kommentarzeile,
      nicht nur für neue. Vorbild ist sein JSDoc von `orderOf`. Vor dem Abgeben prüfen:
      `awk 'length($0) > 80 && /^\s*\*/'` über die geänderten Dateien.
    - Ein Wort, eine Bedeutung gilt auch im Kommentar: Eine Zeile der Datenbanktabelle ist eine „portion“, ein
      `Order` ist eine Variante mit ihrer Menge. Nie „order“ für beides in einem Satz.
    - Ein Kommentar verspricht nur, was der Code heute tut („or removed“ kam erst in den Satz zur Reihenfolge, als
      `ORDER BY id DESC` im `DELETE` stand).
- **Kommentare in `commands.md` (Nutzer, 17.09.2026, von Hand gekürzt: „your commentary is shitty. Please learn from
  your mistakes“):** eine englische Zeile über jedem Befehl, ohne Punkt: was der Befehl tut, danach mit Komma die
  Optionen als `-x: Bedeutung`, etwa `# Run all tests from the WokFlow folder, --test: finds test files`. Keine
  Beispiele (die JSDoc-Regel gilt auch hier), keine Bedienhinweise wie „stop with Ctrl+C“. Vor dem Schreiben die
  Nachbarzeilen der Datei als Muster lesen und die Regeln hier prüfen, nicht aus dem Gedächtnis ergänzen.
- **Dateikopf im Stil des Nutzers (16.09.2026, mehrfach von Hand korrigiert):**
  - `## Titel`, darunter eine Beschreibung als Fließtext, keine Stichpunkte; sagt der Titel alles, keine
    Beschreibung (`## Drinks`). Keine Zusätze in Klammern, keine Ebenenzahlen. Dateien ohne Imports beginnen
    direkt mit dem JSDoc der ersten Deklaration.
  - **Beschreibung so kurz wie möglich (Nutzer, 18.09.2026, zu `api.ts`: „should be as short as possible because
    the function below explains this already“):** in der Regel ein Satz, was die Datei tut. Nichts wiederholen, was
    die JSDocs der Funktionen und Typen darunter schon sagen, etwa einzelne Adressen oder Abläufe.
  - Module: je Modul eine Stichpunktzeile direkt unter der Beschreibung, ohne Überschrift `### Modules` (vom Nutzer
    selbst entfernt). Das Modul in Backticks ohne Webadresse, dahinter, was das Modul macht, nicht was die
    importierten Namen machen. **Dasselbe Modul hat in jeder Datei wörtlich dieselbe Zeile (Nutzer, 18.09.2026: „I
    want everywhere the single same explanation“):** vor dem Schreiben mit Grep nachsehen, wie die Zeile in den
    anderen Dateien lautet. Am 18.09.2026 geprüft: Alle mehrfach genannten Module stimmen überein.
  - **Nur mit `import type` importierte Module bekommen keine Zeile (Nutzer, 18.09.2026, beim Lesen von `api.ts`:
    „if something just with import type then dont need“):** Eine Modulzeile steht nur für Module mit mindestens
    einem regulären Import. Der `import type` selbst bleibt, auch wenn ihn nur ein `{@link …}` braucht. Am
    18.09.2026 in allen Dateien unter `src/` und `test/` umgesetzt. Gilt auch für die Namenszeilen in
    `articles.ts`: `{@link Dinero}` ist ein reiner `import type` und hat dort keine Zeile mehr (vom Nutzer
    bestätigt und selbst entfernt).
  - Testdateien (Nutzer, 17.09.2026, „I don't think we have to list every module inside it“): keine Zeilen für die
    eigenen Dateien unter `../src/`, die Node-Module bleiben. In `orders.ts` steht die Zeile zu `../catalog/menu.ts`
    weiter.
  - Ausnahme `articles.ts` und andere Dateien mit wenigen importierten Namen: je Name `` - {@link Name}: `` mit
    Erklärung, was er ist und wofür die Datei ihn braucht; diese Erklärungen nie weglassen, außer der Name ist nur mit
    `import type` importiert. Auch dort keine
    Überschrift `### Modules` (Nutzer, 18.09.2026, in `articles.ts` selbst entfernt: „I don't want the modules
    inside it“).
  - Module und Properties stehen immer als Stichpunkt, auch einzeln; jede andere einzelne Angabe wird eine normale
    Zeile, etwa „Start with `npm start`.“ in `server/index.ts`.
  - Wortlaute des Nutzers bleiben, etwa in `articles.ts` „Defines the article type with its variants and stores
    variant prices as Dinero amounts.“ und in `api.ts` (18.09.2026, von ihm selbst geschrieben) „Connects the
    requests of the phones to the server, where the menu and the saved orders are.“ Die Modulzeile zu `./api.ts` in
    `index.ts` hat er selbst angepasst: „Connects browser requests to the server.“
- IntelliJ: `// noinspection DuplicatedCode` wirkt in `.ts` nicht (vom Nutzer geprüft).

## Einstieg

- Der Hauptordner ist `AsiaWok_Bonierungssystem_2026`. Diese Datei liegt in `WokFlow/`, im Ordner des Git-Repos:
  Startet Claude im Hauptordner, wird sie nicht von selbst geladen und muss zuerst gelesen werden.
- `WokFlow/` = das neue System. Neuer Code, Tests und das Git-Repo liegen nur dort.
- `TOUCHIT/` = alles zum Altsystem, ca. 10 GB. Nur gezielt darin suchen, nie den ganzen Ordner durchsuchen.
- Alles außerhalb des Hauptordners gehört nicht zum Projekt, auch `M:\NomWorkspace\CLAUDE.md` nicht.
- **Restaurantunterlagen, vom Nutzer benannte Quelle:**
  `M:/NomWorkspace/NomBusinessworkings/AsiaWokRestaurantGmbH/Kundeninformationen`.
  Dort liegt die aktuelle `AsiaWok_Speisekarte_2026.pdf`, außerdem `AsiaWok_Plakate_2026.pdf` und
  `AsiaWok_Speisensteller_2026.pdf`. Für Speisekarte, Gruppen, Namen und Varianten dort nachsehen;
  die Originale sind Geschäftsunterlagen außerhalb des Code-Projekts. Nicht ungefragt verändern.

## Ziel

Das alte Kassensystem TOUCHIT wird durch ein neues, schlankes System ersetzt: **WokFlow**. Der Nutzer
baut es mit KI-Hilfe neu (Fable 5.1 plus ein zweites Modell).
Der alte Code dient nur zum Verstehen und wird **nie kopiert**, er gehört dem Hersteller.
Die Analyse macht Schwächen und Verbesserungsmöglichkeiten sichtbar. Alte Gruppierungen,
Konfigurationen und Bedienabläufe sind keine Vorgabe für WokFlow; das neue System wird aus den
tatsächlichen Bedürfnissen des Restaurants heraus möglichst einfach gestaltet.

## Manifest: WokFlow im Gesamtbild

Stand 14.09.2026 abends, auf Wunsch des Nutzers: das ganze System in einem Stück, vom Bestellen bis zum
Steuerberater. Einzelheiten und Quellen stehen unter „Entscheidungen“, „Buchhaltung“, „Korrespondenz“ und
„RKSV“. Widerspricht ein neuerer Eintrag dort diesem Abschnitt, gilt der neuere, und dieser Abschnitt wird
nachgezogen.

### 1. Wofür WokFlow da ist

- Kassen- und Bestellsystem der ASIA WOK Restaurant GmbH (Messeplatz 1, Halle 10, Klagenfurt): Buffet mit
  Wok, Speisekarte und Getränke. Buffet 11:30 bis 14:30 und 17:00 bis 21:30, Dienstag Ruhetag außer an
  Feiertagen.
- WokFlow ersetzt TOUCHIT, spätestens bis Mai 2027: Dann muss die RKSV-Signaturkarte getauscht werden, und
  TOUCHIT kennt die neue Karte vermutlich nicht. Grobe Schätzung vom 13.09.2026: 62 bis 96 Arbeitstage mit
  KI-Hilfe, nebenbei 8 bis 12 Monate.
- Leitregeln: Funktion zuerst, dann Einfachheit. Große, gut lesbare Tasten für Kellner zwischen 50 und
  60 Jahren. Am Bildschirm nur, was im Moment hilft. So wenig Code wie möglich. TOUCHIT dient nur dem
  Vergleich, nie als Vorlage.

### 2. Der Betrieb in Zahlen

- Rund 35 Tische, 9 Angestellte (Lohnsumme Mai 2026 ca. 21.500 € brutto), eine Person kassiert, mehr als
  80 Rechnungen am Tag.
- Kartenumsatz 30.09.2025 bis 31.08.2026: 481.669 € in 336 Tagen, also rund 520.000 € im Jahr,
  29 Kartenzahlungen und 1.434 € pro Tag, 49 € je Zahlung.
- Beispieltage: 02.09.2026 Umsatz 2.144,30 €, davon Karte 1.352,50 € (63 %). 13.09.2026 Umsatz rund
  2.413 €, Karte rund 1.235 € (51 %), Bar 1.178,10 €, davon Buffet und Küche 1.846 €. Gesamtumsatz daraus
  grob 0,9 Mio. € im Jahr (Schätzung, keine Buchhaltungszahl). Rund 80 % Speisen, 20 % Getränke; den
  Standard-Steuersatz legt WokFlow je Hauptkategorie fest; abweichende Artikel stehen einmal in einer
  Ausnahmeliste (siehe „Artikel und Gruppen“).

### 3. Geräte und Technik

- Ein Server: Lenovo-Mini-PC mit Linux an der Theke, daran Touch-Monitor (Kasse und Chef-Arbeitsplatz),
  Lesegerät mit A-Trust-Signaturkarte (RKSV), Zentraldrucker (Metapace T-3II) und eine USB-SSD.
- 4 bis 5 Android-Handys der Kellner. WokFlow ist eine einzige Web-App, dieselbe Seite im Browser auf Handy
  und Theken-Monitor. Der Chef schaltet jedes Handy einmal frei, Kellner brauchen keinen Code, der Chef am
  PC einen Chef-Code.
- Netz: FRITZ!Box mit Betriebs-WLAN (Server, Handys, Drucker, Kartengerät), Gäste-WLAN getrennt.
- Kartenzahlung über Nexi: heute ein mobiles Terminal „Mobile Premium“ an der Theke, geplant zusätzlich die
  Nexi-App (SoftPOS) auf dem Kassier-Handy Redmi Note 13 Pro 5G.
- Software: TypeScript (Node auf dem Server), eine SQLite-Datei auf dem Server, Geld in ganzen Cent.
  Sicherung laufend in die Cloud, stündlich auf die USB-SSD, nachts voll.
- Kein Notbetrieb: Fällt der Server aus, wird mit dem Bonblock weitergearbeitet.

### 4. Ablauf im Service

1. Tischplan nach den Skizzen und Restaurantfotos vom 14.09.2026: **Innen oder Garten**.
   Schlichte Rechtecke: 1–5 genauso groß wie 12–16, Tisch 6 so klein wie Tisch 7 (Nutzer, 16.09.2026), Tisch 20
   kleiner. Keine gezeichneten Bänke.
   Die 20er-Gruppe steht ganz links im Innenplan; 18/19 steht rechts senkrecht.
   18, 19, 23, 24 bleiben einzeln buchbar, Nummer 25 entfällt. Der bisherige Raum mit den
   30er-Tischen liegt über dem Garten auf dessen Seite; beide sollen auf einen Bildschirm passen.
   Der Gartengang ist deutlich breiter; Tisch 17 liegt neben 19, die Abstände bei 21/22 und 24/23 sind angeglichen.
   Frei: grau getönt ohne Rand. Belegt: rosé gefüllt ohne Rand (Nutzer, 16.09.2026).
   **Keine Punkte, keine Belegt/Frei-Legende, keine Beträge oder Aufenthaltszeiten.**
   **Tischsperre (Entscheidung des Nutzers, 18.09.2026):** Ein Tisch ist immer nur auf einem Gerät offen, der PC
   zählt mit. Grund: Zwei Kellner im selben Tisch sind ein Durcheinander, und das System soll so einfach wie möglich
   bleiben. Die Sperre hat ein Zeitlimit, das das Gerät verlängert, solange der Tisch offen ist; fällt ein Handy aus,
   läuft sie von selbst ab. Sie liegt im Arbeitsspeicher des Servers und kommt mit dem Bildschirm-Modul. Unabhängig
   davon speichert der Server jede Nachricht eines Handys ganz oder gar nicht (`ordersUpdate`).
2. Tisch startet bei **Getränke**, daneben **Buffet** und **Speisen**. **Keine Schnellauswahl**.
   Untergruppen am Betrieb ausrichten; die Gliederung darf von der Speisekarte abweichen.
   Gewählt: kompakte gemeinsame Kopfzeile mit großer Tischnummer ohne „Tisch“, den Reitern
   „Bestellen / Bestellt“. Die umrandete Tischnummer führt zum Tischplan zurück, eigene Taste „Tische“ entfällt.
   Chinesisch jeweils unter den deutschen Reitern; diese erhalten den frei gewordenen Platz.
   Getränke, Speisen starten immer in der Kategorienliste; keine Gruppe automatisch öffnen.
   Kleiner Zurückpfeil zur Gruppenliste, darin kein zusätzlicher Rückweg „Zur Auswahl“.
   Gruppen als Liste ohne Überschrift „Gruppen“.
   Getränke in zwei Spalten mit Deutsch oben, Chinesisch darunter. Speisen als kompakte einspaltige
   Tasten mit Deutsch und Chinesisch nebeneinander, bei Platzmangel vollständig umbrechen.
   Ein Name je Artikel, gleich auf Taste, in „Bestellt“ und auf der Rechnung, keine eigenen Tastenbeschriftungen
   (Nutzer, 16.09.2026, siehe „Ein Name je Artikel“ unter „Bildschirm und Bedienung“).
   „Bestellt“ mit Namen in einer Zeile, jeweils einer Sprache; ein kleiner Sprachknopf „DE“/„CN“
   unten rechts neben dem großen Rechnungsbutton, ohne eigene Kopfzeile.
   Mengenfelder zeigen die unbezahlte Menge am Tisch; kleine Anzeige mit großer Tippfläche, keine Null.
   Direktartikel lassen sich darüber um eine neue Portion verringern. Bei Artikeln mit Auswahl ist die Zahl
   außen nur Anzeige; Entfernen erst im Menü an der konkreten Größe/Sorte. Neue Portionen ohne Rücknahmeleiste.
   Auch bereits abgeschickte Portionen im Auswahlfenster korrigierbar, dort mit „Rückgängig“.
   Neue Portionen derselben Variante werden zuerst verringert; andere Größen bleiben unberührt.
   Eine Cola-Taste öffnet Cola/Zero/Light mit den passenden Größen oder der Flasche darunter.
   Artikel deutsch/chinesisch ohne Preise. Mengen ebenfalls mit Punkt: `0.25`, `0.5`, `0.3 + Wasser`.
   Buffet mit Plus/Minus für Erwachsene sowie 6–9 und 3–5, ohne Wort „Jahre“; unter 3 ohne eigenen Zähler.
   Chinesisch für 6–9 „儿童“, für 3–5 „小童“. „Erwachsene“ bleibt beim Erfassen erhalten,
   entfällt nur in „Bestellt“; Kinder dort in Klammern, etwa „Sonntagsbuffet (6–9)“, auf Chinesisch ebenfalls nur
   das Alter.
   Mittag, Abend, Sonntag, Feiertag sind vier getrennte Buffetarten; Sonntag/Feiertag preislich gleich,
   beide von 11:30 bis 21:30.
   Oben nur Buffetname mit Chinesisch, Zeitspanne rechts; die Kopfzeile klappt die vier Arten auf. **Eine Buffetart
   je Tisch (Nutzer, 16.09.2026):** Antippen wechselt die Art, schon gezählte Personen wandern mit, weil je Tisch
   nur nach einer Art abgerechnet wird. Die spätere Automatik soll den Tarif aus Datum, Wochentag und Feiertag
   vorwählen, ohne die aktuelle Uhrzeit zusätzlich anzuzeigen; die Wahl bleibt, bis eine neue Zeit beginnt.
3. **Absenden am Rückweg:** Die umrandete Tischnummer führt zum Tischplan zurück und schickt in der
   Demo neue Positionen ab, wie vom TOUCHIT-Handy gewohnt; Escape ebenfalls. Kein eigener „Bonieren“-Knopf.
   Getränke und À-la-carte auf einem gemeinsamen Bon am Zentraldrucker, keine getrennten Bons (Nutzer, 16.09.2026);
   Buffet ohne Bon. Bereits Gesendetes nicht erneut drucken.
   Im Backend erst nach bestätigter Übernahme erfolgreich zurückkehren; Fehler erkennbar lassen.
4. Korrektur am offenen Tisch: Minus an der Getränk-/Speisenzeile; **versehentliche Entfernung
   rückgängig machen können**. Name des entfernten Artikels plus „Rückgängig“, ohne
   Zeitablauf bis zum Verlassen der Tischansicht, mehrere Schritte nacheinander rücknehmbar, getrennt je Tisch.
   Der Rücknahmebereich bleibt außerhalb der scrollenden Bestellliste sichtbar. Kein zusätzliches
   Bestätigungsfenster, kein Wischen. In „Bestellt“ nur Menge und Minus, auch beim Buffet;
   dessen Plus/Minus steht beim Erfassen. Rücknahme zeigt nur deutschen und chinesischen Namen,
   ohne „1 ×“, „entfernt“ oder entsprechende chinesische Zusätze.
   Stornogründe und die Nachvollziehbarkeit schon übernommener Änderungen bleiben Backend-Themen.
   Keine zusätzlichen Stornobons gewünscht.
5. **Getrennt kassieren ist wichtig:** in der Rechnung Artikel und Mengen für eine Person auswählen,
   diese Teilrechnung kassieren, nur die bezahlten Mengen abschließen; Rest bleibt offen am Tisch.
   Danach direkt zur nächsten Person in derselben Auswahl zurückkehren, bis alles bezahlt ist.
   Normalfall weiter direkt die ganze Rechnung. Nur nach Artikeln, nie nach frei eingetippter Summe.
   Schieben auf einen anderen Tisch bleibt eine getrennte Funktion (siehe „Bildschirm und Bedienung“).
6. Rechnung: WokFlow erstellt den Beleg, signiert ihn (RKSV-Kette, Umsatzzähler, QR-Code) und druckt ihn.
   Danach ist der Beleg unveränderbar. Jede Teilrechnung ist ein eigener Beleg. Die Zahlart steht nicht
   auf dem Beleg.
7. Bezahlen: Punkt 5.
8. Fehler nach dem Bezahlen: nur der Chef am PC, nur die ganze Rechnung, mit signiertem Stornobeleg, Geld
   aus der Kasse, danach neue Rechnung. Rabatt gibt ebenfalls nur der Chef am PC.

### 5. Bezahlen ohne Umschalten (Plan des Nutzers, 14.09.2026)

- **Karte ist nur, was Nexi bestätigt. Alles andere ist Bar.** Gutscheine werden ausdrücklich erfasst.
  Im Normalfall stellt niemand „Bar“ oder „Karte“ um und tippt keine Beträge ab.
- Karte: Der Kellner tippt „Karte“, WokFlow schickt den Rechnungsbetrag an das Nexi-Terminal oder die
  Nexi-App am Handy. Das Trinkgeld wählt der Gast dort. Betrag, Trinkgeld und Transaktionsnummer kommen
  automatisch zurück: Rechnungsbetrag als Kartenumsatz, Trinkgeld getrennt. Während die Zahlung läuft,
  zeigt WokFlow „Warte auf Nexi“; fehlt die Rückmeldung, „Zahlung prüfen“, und der Tisch bleibt offen
  (nicht als Bar werten, nicht erneut auslösen). Abgelehnt heißt: nichts gebucht.
- Bar: „Bar kassieren“ öffnet den Barabschluss mit Rückgeldrechner (Nutzer, 15.09.2026).
  „Abschließen“ geht ohne Eingabe; bei Bedarf gegebenen Betrag eintippen, Rückgeld sofort berechnen.
  Bar-Trinkgeld wird nie erfasst, es geht direkt an den Kellner.
- **Kein Modus „Gemischt“** (Nutzer, 14.09.2026): Gäste teilen eine einzelne Zahlung nicht zwischen Bar
  und Karte. Ein Restbetrag nach einem Gutschein gehört in den Gutscheinablauf. Eigene Gutscheine mit
  Nummer, Fremdgutscheine (Edenred, Nexi-Papier) mit Anbieter. Das getrennte Kassieren verschiedener
  Gäste per Artikelauswahl bleibt ausdrücklich gewünscht und ist etwas anderes.
- Solange es keine direkte Verbindung gibt: Beim Tagesabschluss liest WokFlow die Nexi-Zahlungen ein und
  trägt die passenden Rechnungen als Karte ein, der Rest ist Bar. Zuordnung nur mit verlässlicher Referenz
  (gleiche Beträge oder eine Tagessumme reichen nicht), alle Geräte und derselbe Zeitraum, erneutes
  Einlesen bucht nichts doppelt. Sind Daten unvollständig oder unklar: „Zahlungen prüfen“, nie
  stillschweigend Bar. Woher WokFlow die Nexi-Daten bekommt, ist offen (Antwort von Nexi).
- Umschalten bleibt als Funktion für Ausnahmen (Wunsch des Nutzers): „Heute“ zeigt die Zahlart jeder
  Rechnung und erlaubt eine Korrektur bis zum Tagesabschluss, mit Protokoll (alt, neu, Uhrzeit, Gerät,
  Benutzer). Wer korrigieren darf, alle Kellner oder nur der Chef, ist offen.
- Warum: Heute legt die Kasse die Zahlart beim Rechnungsdruck fest, Gäste entscheiden sich danach oft um,
  die Kartensumme stimmt nicht, und die Chefin rechnet jeden Abend mit dem Nexi-Zettel von Hand. Nur Nexi
  weiß sicher, ob mit Karte bezahlt wurde.
- Rechtlich (mit Steuerberater und RKSV-Session bestätigen): Karte vor Ort ist steuerlich Barumsatz, der
  Beleg ist bei Bar und Karte gleich, die Zahlart ist ein protokollierter Vermerk, Kartenumsätze sind über
  die Transaktionsnummer erkennbar (§ 131 und § 132a BAO, FAQ Arbeitskreis Kassensoftware 2.4.15).

### 6. Tagesabschluss (Chef am PC, ein Knopf „Tag abschließen“)

- WokFlow warnt bei offenen Tischen und aktualisiert die Nexi-Daten (Status sichtbar, beim Abschließen
  nochmals).
- Die Seite zeigt groß Umsatz, Karte und Bar, darunter nur Zeilen, die nicht 0 sind: Kartenumsatz plus
  Karten-Trinkgeld gleich Nexi-Zahlbetrag, Gutscheine eingelöst und verkauft, Barausgaben, Stornos, Umsatz
  je Warengruppe und je Steuersatz (netto, MwSt, brutto). Kein Kassa-Zählen.
- Kassa: bar bezahlte Einkäufe mit Betrag und kurzem Text eintragen. **Zur Bank = Bar minus Barausgaben
  minus ausgezahltes Karten-Trinkgeld.** Das Wechselgeld ist ein fester Bestand außerhalb der Kasse und
  zählt nicht mit.
- „Tag abschließen“ sperrt den Tag, druckt einen vollständigen Bon mit Warengruppen (zum Heften, solange
  Chefin und Steuerberater Papier wollen), erzeugt PDF und Daten für den Monatsversand und startet das
  Backup.
- Zum Vergleich heute: Chef-Menü, zwei Berichte als Bons mit vielen Nullzeilen, Nexi-Zettel und
  Handrechnung, pro Tag geheftet.

### 7. Wohin das Geld fließt

- Bar: täglich „Zur Bank“ aufs Firmenkonto einzahlen. Einkäufe bar mit Beleg, der Beleg bleibt Papier.
- Karte: Nexi Germany zahlt jeden Montag aufs Firmenkonto, getrennt nach Kartenart und schon ohne das
  Disagio (Kartengebühr in Prozent). Gerätemiete und 0,02 € je Zahlung kommen per Lastschrift. Kosten heute
  zusammen ca. 0,76 % vom Kartenumsatz, rund 3.960 € im Jahr, Disagio im Schnitt 0,63 %.
- Karten-Trinkgeld: kommt mit der Nexi-Auszahlung aufs Firmenkonto, die Kellner bekommen es am Abend bar
  aus der Lade. Durchlaufender Posten, kein Umsatz.
- Gutscheine: Verkaufte Geldgutscheine sind beim Verkauf 0 %, beim Einlösen normal versteuert. Verschenkte
  Leistungsgutscheine (z. B. Buffet für 2) beim Einlösen Betrag 0. Fremdgutscheine normal versteuert und
  beim Anbieter einzureichen, WokFlow führt dafür eine Liste. Gutscheine verkauft nur der Chef am PC.
- An die Behörden (allgemeines Wissen, nicht geprüft, im Steuerkonto auf FinanzOnline nachsehen):
  Lohnsteuer, Dienstgeberbeitrag und Zuschlag am 15. des Folgemonats ans Finanzamt (Mai 2026: 922 €,
  591 €, 59 €), Sozialversicherung am 15. des Folgemonats an die ÖGK (Mai 2026: 7.482 €), Kommunalsteuer
  3 % der Lohnsumme an die Stadt Klagenfurt (Mai 2026: 647 €), Umsatzsteuer am 15. des zweitfolgenden
  Monats, Körperschaftsteuer-Vorauszahlung vierteljährlich. Die monatliche „Rechnung vom Finanzamt“ ist
  also vor allem Umsatzsteuer und Lohnabgaben.

### 8. Monat und Jahr

- Monatsende, automatisch: RKSV-Monatsbeleg (Beleg über 0 €), Export des RKSV-Journals als eigene Datei,
  die nie überschrieben wird (USB-SSD und Cloud), Monatsauswertung als PDF und Datei per E-Mail an den
  Steuerberater, verschickt über das Postfach der Chefin. Dazu ein Knopf „An Steuerberater senden“.
- Dezember: Jahresbeleg, mit der App des Finanzministeriums prüfen.
- Steuerberater Mag. Helmut Allesch (Klagenfurt): Buchhaltung, monatliche Umsatzsteuer-Voranmeldung,
  Lohnverrechnung, Jahresabschluss. Er bekommt Kassenauswertung, Kontoauszüge, Belege, Nexi-Abrechnungen
  und Stundenzettel.
- 7 Jahre aufbewahren: Belege, RKSV-Journal, Tagesabschlüsse, Nexi-Abrechnungen. Ablage des Nutzers in
  `M:\NomWorkspace\NomBusinessworkings\AsiaWokRestaurantGmbH` (Schema `Kategorie/Jahr/AsiaWok_Typ_JJJJMM.pdf`).

### 9. Buchhaltung und Zugänge (Plan)

- Jetzt: ID Austria für Li Vu und Kim Hong Vu, damit FinanzOnline- und USP-Zugang der GmbH (Steuerkonto,
  Bescheide, Voranmeldungen, ÖGK-Beitragskonto) und ein Benutzer für den Nutzer. Unterlagen beim
  Steuerberater anfordern (Mail unter „Korrespondenz“).
- Unklar: wer im Firmenbuch Geschäftsführer ist; die Gewerbeberechtigung läuft laut GISA auf Li Vu
  persönlich statt auf die GmbH. Beides klären.
- Später, wenn WokFlow läuft: einige Monate Buchhaltung parallel zum Steuerberater, dann die laufende
  Buchhaltung selbst. Lohn und Jahresabschluss bleiben beim Steuerberater (Empfehlung, nicht entschieden).

### 10. Kartenzahlung in Ausbaustufen

1. Start ohne direkte Verbindung: Nexi-Zahlungen beim Tagesabschluss einlesen und zuordnen (Punkt 5).
2. Terminal gekoppelt (ZVT über WLAN, Nexi schaltet frei): Der Betrag geht automatisch ans Gerät, Zahlung
   und Trinkgeld kommen sofort zurück.
3. Nexi-App auf dem Kassier-Handy (App-zu-App-Schnittstelle): kein Laufen zur Theke mehr, das Terminal
   bleibt Reserve. Ziel: zu den heutigen Vertragskonditionen, nicht zum Listenpreis von 1 %.

Der Baustein „Kartenzahlung“ in WokFlow hat nur zwei Aufgaben: Betrag hinschicken, Ergebnis zurückholen.
Damit bleibt der Anbieter austauschbar (Alternative hobex).

Telefonat mit Nexi am 15.09.2026, laut Nutzer: Nexi will ein gutes Angebot machen, sucht ohnehin
Kassenpartner. Das Angebot wartet, bis WokFlow weiter entwickelt ist; danach hält der Nutzer eine
gemeinsame Lösung mit SoftPOS für möglich. Nexi bot außerdem ein Android-Gerät mit kleinem Kartenleser
an, das keinen Bon druckt; Modell laut Nutzer „A27“ oder ähnlich, Name noch bestätigen. Idee des Nutzers:
normal mit diesem Gerät kassieren, das heutige Terminal bleibt für Gäste, die unbedingt einen Terminalbon
brauchen. Nicht entschieden.

### 11. Umstieg und später

- Probezeit neben TOUCHIT (Übungsbelege im Trainingsmodus), dann WokFlow bei FinanzOnline anmelden mit
  Startbeleg, TOUCHIT noch ein paar Tage als Reserve, dann Schlussbeleg und Abmeldung.
- Nach dem Start: Bestellen per QR-Code durch die Gäste.

### 12. Offen, und wer dran ist

- Nutzer: Antworten von Nexi und Steuerberater abwarten (Mails unter „Korrespondenz“), ID Austria.
  Tischplanskizzen sind da; einzelne handschriftliche Nummern noch bestätigen.
- Steuerberater: Unterlagen, Kassabuch, Wechselgeld, Trinkgeld, Gutscheine.
- RKSV-Session: Monats- und Jahresbelege, A-Trust-Karte unter Linux, Zahlart ohne Beleg bestätigen.
- Bildschirm: wer Zahlarten korrigieren darf, Feiertage Josefstag und Volksabstimmung, Tischnummern 9, G15, G16
  bestätigen.
- Modul-Chats (seit 17.09.2026): je Chat ein ganzes Modul; Ablauf, Regeln, Reihenfolge, nächste Aufgabe unter
  „Nächster Chat“. Katalog und Modul `tables` stehen, die Server-Schnittstelle ist in Arbeit, danach der Bildschirm.
- Nutzer mit der Chefin: Zwischenrechnung, offene Kredite, Personalbuchung, Rechnungskopie, Rechnung mit
  Kundenadresse (siehe „TOUCHIT-Abgleich“ unter „Entscheidungen“).
- Technik: Weg zu den Nexi-Daten, Cloud-Anbieter, VESA-Halterung, Ersatzdrucker.

## Nächster Chat: `api.ts` und `api.test.ts` mit dem Nutzer durchgehen (Übergabe vom 18.09.2026, nachmittags)

**Auftrag des Nutzers (18.09.2026):** „I will ask the new chat to explain that to me and work this out with the new
chat.“ Also: (1) `src/server/api.ts` und `test/api.test.ts` Stück für Stück erklären und von ihm korrigieren lassen
(Warum-Liste), (2) danach das nächste Modul, der Bestellbildschirm, samt Tischsperre.

**Stand:** Typprüfung ohne Fehler (auch `src/server/index.ts`), `node --test` 16 grün: 5 `orders`, 4 `menu`, 6 `api`,
dazu `setup.ts`. `npm start` läuft, mit `curl` geprüft. Nichts committet (letzter Commit `bcf3cc2`); Git macht der
Nutzer selbst.

- **`orders.ts`, vom Nutzer Stück für Stück abgenommen und mitentworfen:** `ordersUpdate(database, tableId, update:
  OrdersUpdate)` ist die einzige schreibende Tür neben `tableClose` und die einzige Stelle mit `transaction`.
  **`OrdersUpdate = { add: OrderNew[]; remove: OrderNew[] }` liegt in `orders.ts` (Entscheidung des Nutzers,
  18.09.2026):** Der Typ `Change` in `api.ts` war ihm zu vage und am falschen Ort, „change“ als Wort „a little
  cringe“, `Orders` hätte dem Wort „orders“ eine zweite Bedeutung gegeben. Deshalb heißt alles „update“:
  `ordersUpdate` (vorher `ordersChange` mit zwei Listen-Parametern), in `api.ts` `updateRead`, im Test
  `updateSend`. Ein Aufruf liest sich `orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] })` und
  sagt selbst, welche Liste was tut. Die Feldnamen `add` und `remove` hat er dabei gesehen und so gelassen. Darunter, ohne `export` und ohne eigene Transaktion, je eine Bestellung:
  `orderAdd` (holt Preis und Steuersatz selbst mit `orderOf`, prüft die Menge, legt je Portion eine Zeile an) und
  `orderRemove`. Alles, was vom Handy kommt, ist `OrderNew`; niemand von außen kann eigene Preise übergeben. Seine
  Ideen: nur eine Transaktion, gleiche Typen für beide Listen, einzelne statt Listen-Funktionen, „add“ statt „send“
  („send“ ist, was das Handy tut). **Erst entfernen, dann hinzufügen (seine Regel):** Ein Entfernen meint immer
  Portionen von vor dieser Nachricht; noch nicht Gesendetes korrigiert der Kellner am Handy, Gesendetes im Reiter
  „Bestellt“. So wirft „2 Cola dazu, 3 Cola weg“ bei nur 1 Cola am Tisch von selbst.
- **`orders.test.ts`, 5 Tests, je Ursache eines Wurfs genau einer (sein Schnitt):** der Ablauf, „A quantity below 1
  changes nothing“, „An article missing in the menu changes nothing“ (`pizza1` als schlichtes `OrderNew`; das
  Restaurant hat keine Pizza, genau deshalb; prüft auch, dass ein schon ausgeführtes Entfernen zurückgerollt wird),
  „Only portions from before a change can be removed“ (hält die Reihenfolge fest), „A free table has nothing to remove
  or to close“. **Jedes `throws` bekommt ein Stichwort als Muster (`/quantity/`, `/menu/`, `/remove/`, `/open/`), nie
  den ganzen Text** (ersetzt „keine Fehlertexte prüfen“ vom Vortag): Ein nacktes `throws(lambda)` besteht bei jedem
  Fehler, auch beim falschen; in einem Test darf nur eine Regel werfen können. Ob ein Test nötig ist, entscheidet
  der Versuch mit kaputten Kopien (der Test „Removing takes all portions or none“ fing nichts Eigenes und ist weg).
- **`api.ts`, von Claude neu geschrieben, der Nutzer geht sie seit 18.09.2026 mit Claude durch:** `GET /api/menu`,
  `GET` und `POST /api/tables/:table/orders`; der `POST` bekommt ein `orders.OrdersUpdate` und ruft
  genau einmal `orders.ordersUpdate`, `DELETE` gibt es nicht mehr. **Keine eigene Fehlerklasse (Entscheidung des
  Nutzers, 18.09.2026: „we should be sparingly with types“, „yes much better“):** Der Status entscheidet sich nach
  dem Ort. Im `POST`-Zweig von `requestHandle` steht ein `try` um `updateRead(await json(request))` und
  `orders.ordersUpdate`; alles, was dort wirft, bekommt 400 mit dem Fehlertext unter `error`. Alles andere fängt
  `serverCreate`: 500, „The server failed“, eine Zeile im Serverprotokoll. Unbekannte Adresse oder Methode 404
  direkt. `RequestError`, `tableChange`, `bodyRead` sind entfernt, die Formprüfung (`objectRead`, `updateRead`,
  `orderNewRead`) wirft schlichte `Error`. Bewusst in Kauf genommen: Ein Fehler beim Speichern zählt immer als
  Fehler des Handys, auch eine volle Platte; der Kellner sieht den Text, es gibt aber keine Protokollzeile (für die
  Sicherheitsrunde vormerken). `node:http` bietet keine Fehlerklassen, nur `STATUS_CODES` (Exportliste geprüft).
  Tischkennung nur Buchstaben und Ziffern; **kein `undefined`, wo ein leerer Text reicht (Nutzer, 18.09.2026: „this
  is just not beautiful with the undefined“):** `const tableId: string = address.match(…)?.[1] ?? ""`, geprüft
  wird mit `tableId !== ""`; sicher, weil das Muster mindestens ein Zeichen verlangt. **Muster mit vielen
  Schrägstrichen als `new RegExp("^/api/tables/([A-Z0-9]+)/orders$")` statt zwischen Schrägstrichen (Nutzer,
  18.09.2026: „readability higher“; die Kleinbuchstaben hat er selbst gestrichen, Tische heißen nur mit Ziffern und
  Großbuchstaben, so können `g3` und `G3` nie zwei verschiedene Tische werden):** so steht der Pfad ohne `\/` da; falls IntelliJ die Literalform vorschlägt,
  nicht zurückbauen. Erklärt und angekommen: `match` wie `contains`, das statt `true` das Gefundene in einer Liste
  gibt und statt `false` `null`; das Begrenzungszeichen ist das Problemzeichen (`\/` zwischen Schrägstrichen, `\"`
  in Anführungszeichen); in Anführungszeichen lesen zwei nacheinander (erst die Zeichenkette, dann das Muster),
  deshalb dort `"\\d"`. Nicht angekommen war vorher: Array-Beispiele ohne diesen Unterbau, und der Satz „in Java
  muss man den Backslash verdoppeln“ ohne Beispiel (sein eigenes `"M:\\NomWorkspace\\"` half). Die Adressen bleiben, wie sie sind (Nutzer, 18.09.2026, „ok keep
  this“): eine Adresse `/api/tables/:table/orders`, die Methode entscheidet (`GET` liest, `POST` ändert); `/orders`
  bleibt am Ende, weil Tischsperre und Rechnung daneben geplant sind (`…/lock`, `…/bill`). **`GET /api/menu` sendet `menu` roh, wie es in `menu.ts` steht
  (Entscheidung des Nutzers, 18.09.2026, „patch the API as easy as possible“):** je Kategorie `tax`, `print`, `groups`; ein Preis kommt in der Textform
  von Dinero an, `{"amount":310,"currency":{"code":"EUR","base":10,"exponent":2},"scale":2}`, das Handy liest
  `price.amount`; in den Bestellungen bleibt `price` eine Zahl in Cent. Kein Umpacken mehr (`MenuResponse` samt
  drei Funktionen entfernt), `api.ts` hat 144 Zeilen, davon rund 60 Code, und wird nicht aufgeteilt. Rechnen mit
  Dinero kommt erst mit der Rechnung; das Menü hält die Preise weiter als Dinero, die Datenbank als Cent (Nutzer:
  so lassen). Fehlertexte englisch wie in `orders.ts`. Die Regionen `Types` hat der Nutzer selbst entfernt, es gibt
  in `api.ts` keinen eigenen Typ mehr.
- **Erste Durchsicht von `api.ts` durch den Nutzer (18.09.2026), offen, ein Thema nach dem anderen klären:**
  1. Erledigt: Menü roh senden, siehe oben. Das rohe Menü hat 28709 Zeichen (vorher 14609), im WLAN belanglos.
  2. Dateikopf von `api.ts` auf einen Satz gekürzt (mit dem Menü-Patch). Für `orders.ts` gezeigt, nicht gepatcht:
     „Stores the orders of the tables in SQLite, one row for each portion.“
  3. Erledigt: `RequestError` ist weg, siehe oben.
  4. Erledigt: `Change` ist als `OrdersUpdate` nach `orders.ts` gewandert, siehe oben bei `orders.ts`.
  6. Ihm am Prototyp erklärt: Das Handy bekommt das Menü als Daten und baut den Bildschirm selbst, der Server
     schickt kein fertiges HTML; Tippen muss ohne Anfrage an den Server gehen, gesendet wird erst am Rückweg.
     Plan für die Seite (Nutzer einverstanden: „okay, then let's do this“): Schriften und Bilder hält der
     Browser-Cache am Handy, sie reisen nur beim ersten Mal (seine Frage nach „installation time“); eine
     installierbare Seite ist später möglich, jetzt nicht nötig. `GET /api/menu` genau einmal beim Start der
     Seite, das Menü bleibt im Speicher des Handys, neu geladen wird es nur mit der Seite; beim Öffnen eines
     Tisches nur `GET …/orders`. Ein veraltetes Menü am
     Handy kann keine falschen Preise buchen, weil der Server Preis und Steuersatz selbst holt (`orderOf`).
     Sorge des Nutzers: Nach dem Sperren des Handys lädt die Seite mal neu, mal nicht (kennt er vom TOUCHIT-Handy).
     Vorschlag von Claude für das Bildschirm-Modul, nicht entschieden: Die Seite speichert bei jedem Tippen am
     Handy (Browser-Speicher), welcher Tisch offen ist und was noch nicht gesendet wurde, und macht nach einem
     Neuladen dort weiter; dann ändert ein Neuladen für den Kellner nichts. Früh am ältesten Kellner-Handy mit dem
     Prototyp prüfen, ob der Browser schnell genug ist (Prototyp rund 330 KB mit Schriften, das Menü 15 KB).
- **Bewusst weggelassen gegenüber der alten `api.ts`, für die Sicherheitsrunde vor dem Echtbetrieb vormerken:**
  Größenlimit für den Körper (64 KiB), Prüfung des `Content-Type`, Status 405, Dekodieren der Tischkennung. Begründung:
  Nur eigene Handys im Betriebs-WLAN sprechen mit dem Server. Offen für das Bildschirm-Modul: doppeltes Senden, wenn
  die Antwort im WLAN verloren geht (Idee: Kennung je Nachricht, die der Server nur einmal annimmt).
- **`api.test.ts`, 6 Tests im Stil von `orders.test.ts`:** Ablauf über echte HTTP-Anfragen, er vergleicht die
  Antwort von `GET /api/menu` mit `JSON.parse(JSON.stringify(menu))`, dem Menü nach der Reise als Text (mit zwei
  kaputten Kopien geprüft, `menu.drinks` und `{ menu }`, beide machen ihn rot); „A failed change gets
  status 400 and changes nothing“ (beide Richtungen, fängt auch zwei getrennte Aufrufe statt einem); „Price and tax
  rate come from the menu“; „A broken request gets status 400 and changes nothing“; 404; 500 mit
  `t.mock.method(console, "error", …)`. Server je Test auf Port 0 an `127.0.0.1`, `afterEach` schließt ihn. Mit 14
  kaputten Kopien von `api.ts` und 12 von `orders.ts` geprüft, jede macht mindestens einen Test rot.
- **Tischsperre:** entschieden, steht im Manifest Abschnitt 4 Punkt 1; kommt mit dem Bildschirm-Modul.
- **`orders.ts` geteilt (Wunsch des Nutzers, 18.09.2026: „for me its long somehow“, „orderbook is good“):**
  `src/tables/orderbook.ts` (neu, 56 Zeilen) hält `orderbookCreate` und `transaction`, beide mit `export`, seine
  Kommentare wörtlich übernommen. `orders.ts` (186 Zeilen) hält die Typen `Order`, `OrderNew`, `OrdersUpdate` und
  die sechs Bestellfunktionen und importiert `transaction`; `orderAdd` und `orderRemove` bleiben ohne `export`,
  damit `ordersUpdate` die einzige schreibende Tür bleibt (deshalb kein weiterer Schnitt). `index.ts` und
  `test/setup.ts` holen `orderbookCreate` aus der neuen Datei. Modulzeile überall: „`…/orderbook.ts`: Creates the
  database table of the orders.“ Keine eigene Testdatei dafür (Nutzer: „just one test is enough“), `orders.test.ts`
  deckt beides. Verworfen: `orders.ts` plus `ordering.ts` plus `ordering.test.ts` (seine Zwischenidee). Offen: Die
  Region `Setup` in `orders.ts` enthält nur noch die drei Typen, der Name passt nicht mehr; ihm überlassen.
- **Für die Aufräumrunde notiert, nicht jetzt:** Kommentarzeilen über 80 Zeichen in `orders.ts` (25, 41, 98, 149),
  `articles.ts` (49), `menu.ts` (52), `database.ts` (16), `menu.test.ts` (4); die Datenbanktabelle heißt im SQL `orders`, im Kommentar und
  in `orderbookCreate` `orderbook` (mit `orderbook` wäre der Name `orders` im Code frei).

**Vorgehen im neuen Chat:** zuerst `orders.ts` und `orders.test.ts` lesen (sein Maßstab), dann `api.ts` und
`api.test.ts`. Mit dem großen Bild beginnen (Handy, `api.ts`, `orders.ts`, Datenbank), dann Region für Region, je
Antwort ein Stück mit Datei, Funktion, Zeilen, dann warten; er korrigiert Kommentare und Namen selbst, daraus Regeln
machen. Reihenfolge von oben nach unten (Nutzer, 18.09.2026: „from the top to the bottom step by step“); die Imports
überspringen und jeden Namen dort erklären, wo er benutzt wird. Stand 18.09.2026: Dateikopf fertig (sein Wortlaut),
weiter bei `//#region Server` mit `serverCreate`: Schritt 1 (die drei Schichten: `createServer`, Lambda je Anfrage,
Lambda in `.catch`) ist erklärt, Schritt 2 wäre, dass `requestHandle` sein Ergebnis nicht sofort liefert (`async`,
`Promise`), dann `.catch`. **Am 18.09.2026 abends war der Nutzer überfordert („i am sooooooooo overwhelmed“):**
Claude hatte zu `serverCreate` hintereinander drei Umbauten gezeigt (eigene Funktion `errorSend`, benannte Konstante
`errorRequest`, `try`/`catch` in `requestHandle` statt `.catch`). Lehre: nur die gestellte Frage beantworten, keine
weiteren Entwürfe nachschieben; bei Überforderung sofort aufhören, offene Entscheidungen mit „bleibt, wie es ist“
schließen, einen einzigen kleinen nächsten Schritt nennen. `serverCreate` steht unverändert im Original und läuft.
Nicht entschieden und nur auf seine Nachfrage wieder aufgreifen: `try`/`catch` in `requestHandle` statt `.catch`
(in einer Kopie geprüft, Typprüfung und 16 Tests grün; Preis: ein `try` im `try` im `POST`-Zweig). **Noch nicht erklärt und in `api.ts` enthalten:** `async`, `await`,
`Promise`, `.catch`, regulärer Ausdruck mit Gruppe, `?.` und `?.[1]`, `unknown` eingrenzen mit `typeof`, `json` aus
`node:stream/consumers`, `error as Error` im `catch`; in `api.test.ts`: `fetch`, `Response`,
`once`, Port 0, `AddressInfo`, `afterEach`, `t.mock.method`.

**Wie man ihm am 18.09.2026 etwas erklären konnte:** nicht mit SQL-Folgen und „Phone A/B“, sondern mit sechs
nummerierten Schritten aus dem Restaurant („+1 Red Bull, −1 Cola“, Red Bull gespeichert, Cola schon weg, Handy bekommt
„error“, Kellner sendet nochmal, 2 Red Bull auf der Rechnung). Fehler von Claude: Spezifikation, Vorher/Nachher und
eine neue Idee in einer Antwort („I don't understand anything“). Behauptungen über Tests mit kaputten Kopien belegen
und dabei zuerst prüfen, dass der unveränderte Code besteht (ein Versuch von Claude war selbst fehlerhaft, die
gekürzte Testdatei lud nicht, alles schien „gefangen“).

**Praktisches:** Die echte `wokflow.db` hat die Datenbanktabelle `orders` ohne `quantity`; nach jeder Änderung an
`orderbookCreate` braucht IntelliJs Datenquelle ein Refresh. Prüfen nie in den Ordnern des Nutzers, sondern mit
Kopien im Scratchpad; ein dort gestarteter Server auf Port 3000 muss wieder beendet werden (`netstat` zeigt auf dem
deutschen Windows „ABHÖREN“, nicht „LISTENING“).

### Arbeitsweise je Modul

Entscheidung des Nutzers vom 16.09.2026: Claude baut ganze Module, nicht mehr Zeile für Zeile. Gründe: Vier Tage
ergaben rund 500 Zeilen, in dem Tempo wird WokFlow nicht bis Mai 2027 fertig. Schreiben aus dem Leeren übt der Nutzer
an der Uni (Java, Prüfungen); aus dem Projekt nimmt er das Bild im Kopf, das Urteil über Code, das Debuggen, ein
fertiges Produkt. Studienlage (Anthropic 2026, Bastani 2025): Wer KI schreiben lässt und danach fragt „warum so“,
lernt fast so viel wie von Hand; wer nur Code abholt, lernt wenig. Der Nutzer will Ultracode nutzen; das ist seine
Wahl.

1. Ein Modul je frischem Chat. Ein Modul ist ein Feature, das an einem Abend allein testbar ist. Module heißen
   nach ihrer Aufgabe, nie nach einer Nummer, etwa Modul `tables` (Nutzer, 16.09.2026).
2. Zuerst die Spezifikation: rund zehn Zeilen, was rein, was raus, was nie passieren darf. Claude schlägt sie vor,
   der Nutzer korrigiert; erst nach seinem Ja wird gebaut.
3. Dann der Plan: welche Dateien neu entstehen, welche bestehenden Dateien sich ändern, und dort jede Änderung als
   Vorher/Nachher Zeile für Zeile. Erst nach dem Ja bauen.
4. Claude schreibt das ganze Modul samt Tests (`node:test`, keine neue Bibliothek), führt Typprüfung und Tests aus,
   zeigt das Ergebnis, gibt den Startbefehl.
5. Der Nutzer startet es selbst und versucht, es kaputt zu machen.
6. Fehler: der Nutzer sucht zuerst selbst, dann fragt er. Debuggen war in der Anthropic-Studie die größte Lücke.
7. Warum-Liste: Der Nutzer liest jede neue Datei einmal und markiert jede Zeile, die er nicht erklären kann. Das
   Modul ist erst fertig, wenn die Liste leer ist. Tiefe siehe unten.
8. Eine Aufräumrunde am Ende, gemeinsam, einmal. Nicht vorher; Aufräumen vor dem Funktionieren ist Perfektionismus.
9. Keine Pflicht-Übungsfunktion je Modul: Schreiben aus dem Leeren übt die Uni. Bleiben: Debuggen zuerst und
   Warum-Liste.
10. Kosten: frischer Chat je Modul, weil jede Nachricht den ganzen bisherigen Chat mitsendet. Mit Ultracode baut ein
    Agent das Modul, weitere Agenten höchstens prüfen; nie mehrere Agenten gleichzeitig an bestehenden Dateien.

### Wie tief das Warum geht

- Stufe 1, jeder unbekannte Name, ein Satz: was er tut, warum er hier steht. Beispiel `readdirSync`: liest die Namen
  in einem Ordner, wartet, bis es fertig ist, gibt eine Liste zurück.
- Stufe 2, jede neue Idee, so tief wie nötig: `async`/`await`, Transaktion, Callback, Module und Imports, Typen.
  Fertig, wenn der Nutzer sie erklären und vorhersagen kann, was bei einer Änderung passiert. Das ganze Projekt hat
  vielleicht 15 solche Ideen. Zu jeder den Java-Gegenpart nennen: Der Nutzer kennt Java bis Generics, `ArrayList`,
  Streams und `map` und will dieselbe Tiefe in TypeScript (16.09.2026); `T[]` wie `ArrayList<T>`, `array.map` wie
  `stream().map`, `| null` wie `Optional`, Pfeilfunktion wie Lambda.
- Stufe 3, nicht im Modul-Chat: wie Node etwas innen umsetzt, alle Optionen einer Bibliothek, Bibliotheksquelltext.
  Im Projekt versteht man Bibliotheken über ihre Schnittstelle und ihre eine Idee (Dinero: Geld als ganze Cent plus
  Währung). Java-Tiefe in TypeScript, bis in den Bibliothekscode wie bei `Stream`, ist ein eigenes Vorhaben mit
  eigener Zeit (Quelltext, Buch, Übungen), nicht entschieden, nicht Aufgabe der Modul-Chats.
- Stopp-Regel: Ändert die Antwort nichts daran, wie WokFlow-Code gelesen oder geschrieben wird, aufhören.

### Schutz des Bestehenden (Nutzer, 16.09.2026: „don't destroy something which I coded already“)

- Unangetastet, außer das Modul braucht es und der Nutzer hat die gezeigte Änderung bejaht: `src/catalog/*`,
  `src/server/index.ts`, `src/server/database.ts`, `tmp/*`, `package.json`, `.editorconfig`, `commands.md`,
  `icons/`, `fonts/`.
- Neue Module in neuen Dateien, Ordner nach Aufgaben (`src/tables/`), keine Sammeldateien.
- Stil der bestehenden Dateien nicht glätten, Namen nicht ändern. Alle Regeln unter „Coden“ gelten für erzeugte
  Dateien genauso.
- Jede Änderung an einer bestehenden Datei: erst die Liste „ändert sich / bleibt“, dann Vorher/Nachher, dann Ja.

### Stand der Dateien (18.09.2026)

Der Code ist die Wahrheit; hier steht nur, was er nicht selbst sagt. Die laufende Arbeit an `orders.ts`, `api.ts`,
ihren Tests steht in der Übergabe am Anfang dieses Abschnitts.

- `src/catalog/`: Artikelkatalog vollständig, siehe „Artikel und Gruppen“. `menu.ts` hat im `//#region Lookup` den
  Typ `MenuEntry` (nur, was eine Bestellung braucht), die flache Liste `entries` mit einer Zeile je Variante,
  `entryOf(articleId, variantId)`, das bei unbekanntem Namen wirft. Davor durchprobiert und verworfen, weil dem
  Nutzer alles zu kompliziert war: `Map` mit Textschlüssel `"Cola|0.5"`, `Map` in `Map`, sofort aufgerufene Lambda,
  eigene Funktionen `priceOf` und `taxOf`.
- `src/tables/orders.ts` und `src/tables/orderbook.ts` (Datenbanktabelle und `transaction`, seit 18.09.2026 eigene
  Datei) mit `test/orders.test.ts`: Modul `tables`, vom Nutzer abgenommen; Entscheidungen in der Spezifikation unten.
- `test/menu.test.ts`: vier Tests für `entryOf` (Preis je Variante, Steuersatz der Kategorie, Leitungswasser,
  unbekannte Namen); `orders.test.ts` importiert deshalb weder `dinero.js` noch `menu.ts`. Einwand des Nutzers zum
  Preistest (17.09.2026): Der Testkörper läuft wie der Bau von `entries`, „duplicated code … seems to be useless“.
  Das stimmt halb: Er fängt Vollständigkeit (fehlt eine Gruppe in `entries`, wirft `entryOf`) und einen Preis aus
  der falschen Variante, aber keine doppelten deutschen Namen, weil `find` den ersten Treffer nimmt (gemessen: 200
  Varianten, 0 Doppelte). Geplant, nicht gepatcht: zwei ehrlich benannte Tests über alle Varianten, „every variant
  is found with its own price“ und „no two variants share the same name“ (braucht `Set`, vorher erklären).
- `test/setup.ts`: `databaseTest` für eine frische Datenbank im Arbeitsspeicher.
- `src/server/database.ts`: `databaseOpen()` öffnet `WokFlow/wokflow.db` mit `node:sqlite`, Pfad über
  `import.meta.dirname`. `src/server/index.ts` öffnet sie beim Start, legt mit `orderbookCreate` die Datenbanktabelle
  an, startet den Server aus `src/server/api.ts` auf Port 3000.
- `src/server/api.ts` mit `test/api.test.ts`: aus einem anderen Chat, noch nicht auf dem Stand von `orders.ts`;
  nächste Aufgabe, siehe Übergabe.
- **Offen: `wokflow.db` steht nicht in `.gitignore`** (dort nur `.idea` und `node_modules`) und ist committet; `npm
  start` ändert die Datei, und `git add .` nimmt sie mit. Vorschlag, nach Ja des Nutzers: `wokflow.db` in
  `.gitignore` plus `git rm --cached wokflow.db` (Git verfolgt sie nicht mehr, die Datei bleibt liegen);
  `.gitignore` allein reicht bei einer schon verfolgten Datei nicht.
- Offen: die neuen Dateien gemeinsam durchgehen (Warum-Liste).

### Modulreihenfolge (Vorschlag, der Nutzer ordnet um)

1. `tables`: Bestellungen je Tisch in SQLite. Reine Logik und Speicherung, keine HTTP-Anbindung, kein Bildschirm.
   Gebaut 16.09.2026, am 18.09.2026 auf eine Zeile je Portion umgestellt, Tests vom Nutzer abgenommen.
2. Server-Schnittstelle: Katalog und Bestellungen als JSON über `node:http`, damit der Bildschirm sie holen kann.
   `src/server/api.ts` und `test/api.test.ts` gibt es aus einem anderen Chat, aber nicht auf dem Stand von
   `orders.ts`. **Das ist die nächste Aufgabe** (siehe Anfang dieses Abschnitts).
3. Bestellbildschirm am Handy mit dem echten Katalog, Gestaltung aus `tmp/screens.html`. Vorher entscheiden, wie die
   Seite ausgeliefert wird (siehe „Aktueller Stand“: nicht vom eigenen Server, bei Bedarf Vite). Mit dem Bildschirm
   kommen die Tischsperre, die Sonderregeln für Zitrone und Buffetpersonen.
4. Danach nach dem Manifest: Rechnung, Zahlung, Druck, RKSV, Tagesabschluss.

### Modul `tables`, Spezifikation (gebaut 16.09.2026, Entscheidungen bis 18.09.2026)

- Ein Tisch (Kennung als Text: `"14"`, `"G3"`, `"M"`) hat beliebig viele Bestellungen. Modul und Ordner heißen
  `tables`, jede Position ist eine Bestellung, es gibt keinen eigenen Datensatz für den offenen Tisch (Namen nach
  der Alltagssprache und dem Prototyp, Nutzer, 16.09.2026).
- **Eine Zeile je Portion (Idee und Entscheidung des Nutzers, 18.09.2026, „patch it this way“):** Die
  Datenbanktabelle `orders` hat keine Spalte `quantity`. Je Zeile: Tisch, deutscher Artikelname, Variantenname oder
  null, Preis in Cent und Steuersatz zum Zeitpunkt der Buchung, `closed` (Zeitpunkt des Abschlusses, Name vom Nutzer
  statt `closed_at`). Offen ist eine Portion, solange `closed` leer ist; ein Tisch ohne offene Portionen ist frei.
  Die Menge wird gezählt, nie gespeichert: Das Handy schickt weiter `quantity`, das Senden legt so viele Zeilen an,
  `ordersRead` zählt je Variante mit `COUNT(*)`; der Typ `Order` mit `quantity` bleibt für alle Aufrufer gleich.
  Gründe: Mit Mengen je Zeile müsste das Entfernen mehrerer Portionen erst eine Bestellung leeren und dann die
  vorige verringern. Jetzt haben alle Operationen dieselbe Form: n Zeilen einer Variante wählen, dann einfügen,
  löschen, später als bezahlt markieren; getrennt kassieren heißt später n Zeilen markieren statt eine Zeile teilen.
  Preis: mehr Zeilen (Schätzung rund tausend am Tag, für SQLite belanglos). Verworfen: eine Zeile je Tisch und
  Variante mit hoch- und runtergezählter Menge; jede Operation würde ein Entweder-oder, und die nötige Eindeutigkeit
  greift in SQLite nicht bei Variante `null`, weil `NULL`-Werte in einem eindeutigen Index als verschieden gelten.
- **`Number.isInteger` in `orderAdd` bleibt (Frage des Nutzers, 18.09.2026):** `number` ist wie Javas `double`,
  TypeScript hat kein `int`. Mit 1.5 legt die Schleife 2 Zeilen an, mit 0 oder -1 keine, jeweils ohne Fehler. Die
  Prüfung ersetzt das frühere `CHECK (quantity > 0)` der Datenbank. Ganze Zahlen sind in `number` bis
  9007199254740991 exakt, deshalb sind Cent und Mengen sicher.
- **Bestellungen nur mit Namen (Entscheidung des Nutzers, 17.09.2026):** `OrderNew` ist `Omit<Order, "price" |
  "tax">`, also `{ articleId, variantId, quantity }`, wie das Handy es schickt (`Omit` statt zweiter Feldliste).
  `orderOf(orderNew)` macht daraus ein `Order`: holt einmal `entryOf`, setzt Preis und Steuersatz, wirft bei
  unbekanntem Namen. Verworfen: ein einziger Typ mit `price?` und `tax?`, weil dann jede Stelle, die gespeicherte
  Bestellungen liest, auf `undefined` prüfen müsste. Die Kategorie schickt das Handy bewusst nicht mit: Sie bestimmt
  den Steuersatz, das Menü weiß sie schon. Offen: Der Name `OrderNew` passt für Entfernungen schlecht (JSDoc ergänzt,
  Name nicht geändert).
- **Kein Status, gespeichert wird erst beim Senden (Nutzer, 16.09.2026):** Die Datenbank kennt nur Gesendetes. Noch
  nicht gesendete Bestellungen hält und korrigiert das Handy und schickt sie beim Rückweg zum Tischplan alle auf
  einmal, ebenso die Entfernungen schon gesendeter Portionen (Nutzer, 18.09.2026); „Rückgängig“ passiert vorher am
  Handy, der Server braucht dafür nichts. Stürzt das Handy vorher ab, sind sie weg und werden neu boniert; laut
  Nutzer selten und vertretbar. Zwei gesendete Cola plus eine weitere lesen sich als „Cola 3“, getrennte
  Bestellungen je Sendung gibt es nicht (Nutzer: „no newest order even needed“). **Der Bon druckt weiter Mengen
  (Nutzer, 18.09.2026: „print should still print the qty“):** Gedruckt wird aus der Sendung, die `quantity` trägt,
  nicht aus der Datenbank; die Rechnung bekommt ihre Mengen aus `ordersRead`.
- **Reihenfolge ist zugesagt (Entscheidung des Nutzers, 18.09.2026, „Yeah, patch it“):** `ordersRead` sortiert nach
  der ältesten offenen Portion jeder Variante (`ORDER BY MIN(id)`), und das `DELETE` in `orderRemove` nimmt mit
  `ORDER BY id DESC` die neuesten Portionen zuerst, damit eine Variante ihren Platz behält, solange es sie gibt; am
  Bildschirm „Bestellt“ springt dann keine Zeile. Ohne `ORDER BY` löschte SQLite die ältesten Zeilen, und „Cola
  0.5“ rutschte unter „Cola 0.25“. Der Ablauftest sendet deshalb die große Cola zuerst und schlägt fehl, wenn die
  Zeile im `DELETE` fehlt. Eine Datenbanktabelle hat kein Oben und Unten. Kostet nichts: `EXPLAIN QUERY PLAN` zeigt
  mit und ohne dieselbe Suche im Index `tables_open`, ohne Sortierschritt.
- Cola klein und groß im Ablauftest (Wunsch des Nutzers, 18.09.2026) fängt ein Entfernen, das die Variante
  ignoriert. Ein Lesen ohne `variant_id` im `GROUP BY` fängt er nicht, weil klein und groß verschiedene Preise
  haben; dafür bräuchte es zwei Varianten mit gleichem Preis.
- `tableClose` setzt `closed`, die Portionen bleiben gespeichert. Katalogänderungen ändern gebuchte Bestellungen
  nicht (Regel unter „Artikel und Gruppen“).
- **Transaktionen:** Änderungen mit mehreren Anweisungen laufen als SQLite-Transaktion, alle oder keine. Mit einer
  Zeile je Portion tragen sie mehr, nicht weniger: Eine Sendung von 2 Cola und 1 Red Bull sind drei `INSERT`, und
  `orderRemove` löscht erst und prüft danach `changes` (3 Cola verlangt, 2 da: die 2 sind schon gelöscht, erst
  `ROLLBACK` holt sie zurück). `transaction` ohne Generic (Nutzer, 16.09.2026): `work: () => void`, weil kein
  Aufrufer einen Wert zurückbekommt; `<T>` erst wieder, wenn eine Transaktion etwas zurückgeben muss;
  `catch (error: unknown)` hat der Nutzer selbst typisiert. **Offen (Nutzer, 17.09.2026):** Ihn stört, dass nicht
  jede schreibende Funktion durch `transaction` läuft; `tableClose` ist ein einzelnes `UPDATE` und damit schon eine
  Transaktion. Empfehlung von Claude: Regel „jede schreibende Funktion geht durch `transaction`, lesende nicht“,
  kostet ein `BEGIN`/`COMMIT` ohne Wirkung. Nicht entschieden; mit `ordersUpdate` aus der Übergabe neu ansehen.
- Zitrone und Buffetpersonen sind Bestellungen wie jede andere; ihre Sonderregeln kommen mit dem Bildschirm.
- Nicht in Modul `tables`: HTTP, Bildschirm, Zahlung, Rechnung, RKSV, Druck, Tischplan.
- Offen (16.09.2026): Der JSDoc von `orderbookCreate` nennt die Datenbanktabelle `orderbook`, das SQL legt `orders`
  an. Nachgefragt, ob die Tabelle `orderbook` heißen soll.

### Was der neue Chat zuerst tut

1. Diese Datei lesen, zuerst „Zusammenarbeit“ und „Coden“, dann den Anfang des Abschnitts „Nächster Chat“.
2. `src/tables/orders.ts` und `test/orders.test.ts` lesen, danach `src/server/api.ts` und `test/api.test.ts`.
3. Dem Nutzer `api.ts` und `api.test.ts` erklären, Stück für Stück, und seine Korrekturen als Regeln festhalten.
4. Danach das nächste Modul nach der Modulreihenfolge, zuerst die Spezifikation. Am Ende diesen Abschnitt wieder auf
   das dann nächste Modul umschreiben.

## Aktueller Stand

Stand 18.09.2026. Planung im Manifest, Stand des Codes unter „Stand der Dateien“, die nächste Aufgabe am Anfang von
„Nächster Chat“. Neuer Code nur in `WokFlow/`.

- **Kurzstand:** Der Artikelkatalog ist fertig (laut Nutzer abgeschlossen). Modul `tables` ist gebaut und vom Nutzer
  abgenommen, seit 18.09.2026 mit `ordersUpdate` als einziger schreibender Tür. Die Server-Schnittstelle (`api.ts`,
  `api.test.ts`) ist neu geschrieben und grün, der Nutzer hat sie noch nicht gelesen. Danach kommt der
  Bestellbildschirm.
- Server: Start mit `npm start` (`node src/server/index.ts`, ohne `--watch`, nach Codeänderungen neu starten), Port
  3000. Bei `EADDRINUSE` den alten Server mit Strg+C beenden. Relative Pfade zählen ab dem Ordner, in dem node
  startet: IntelliJs Run-Knopf an `index.ts` startet in `src/server`, `npm start` in `WokFlow`. Dateipfade deshalb
  mit `import.meta.dirname` bilden, dem Ordner der Datei selbst (16.09.2026).
- `package.json`: `dinero.js` 2.0.2 (siehe „Geldbeträge“), als Entwicklungswerkzeuge TypeScript 7.0.2 und
  `@types/node` 26; keine `tsconfig.json`. TypeScript prüft deshalb mit den Standardwerten, seit TypeScript 6 mit
  `strict: true` samt `strictNullChecks`
  ([Versionshinweise](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#simple-default-changes)):
  eine optionale Property `x?: number` darf fehlen (beim Lesen `undefined`), `null` ist nur mit ausdrücklichem
  `| null` erlaubt.
- **Bildschirmentwurf:** Es gibt nur einen Entwurf, `tmp/screens.html` mit `screens.css`, `screens.js`, Artikeldaten
  in `preview-menu.js`, Schriften unter `fonts/`. Handyansicht mit `?vorschau=1#tables`, dieselben Bildschirme mit
  Erläuterungen mit `?uebersicht=1`, Tagesabschluss des Chefs mit `?chef=1#closing`. Eine lokale Demo, keine echte
  Kasse. Regeln unter „Bildschirm und Bedienung“. Der Nutzer reagiert auf sichtbare Beispiele.
- **Auslieferung der Seite (Nutzer, 16.09.2026):** nicht vom eigenen Server, sondern bei Bedarf mit Vite, ohne
  eigenen Code. Dateien ausliefern lösen fertige Werkzeuge; von Hand ist es mühsam und riskant, etwa könnte eine
  Adresse wie `/../../` beliebige Dateien des Server-PCs lesen. Danach am Handy im WLAN mit ein bis zwei Kellnern
  erproben.
- **Git:** `origin` ist `git@github.com:UnathiCodex/WokFlow.git` per SSH (lokaler Schlüssel `id_ed25519`), `main`
  folgt `origin/main`, das Repository ist privat. Git 2.54, Git Credential Manager 2.7.3, GitHub CLI `gh` nicht
  installiert, systemweit `pull.rebase false`. Git macht der Nutzer selbst; `commands.md` hat über jedem Befehl
  einen englischen Kommentar. Letzter bekannter Commit `bcf3cc2` (18.09.2026), gepusht.
  - Offen: `touchit_bons_vergleich.html` mit echten Tagesumsätzen vom 02.09. und 13.09.2026, teils als Foto der
    TOUCHIT-Berichte, liegt im Verlauf auf GitHub (unter `tmp/`, in `47c372d` unter `docs/`). Vor dem Einladen
    anderer entscheiden, ob sie bleibt; Entfernen hieße Verlauf umschreiben. Auch diese `CLAUDE.md` liegt im
    Repo-Ordner und enthält Geschäftszahlen, Kundennummern, Namen.
  - Offen: `.git` wird bisher per Syncthing mitsynchronisiert; klären, ob das mit GitHub so bleibt.
  - Lizenz vom Nutzer vorerst zurückgestellt. Wunsch: später vielleicht öffentlich, aber keine kommerzielle Nutzung
    durch andere. Das ist source-available, nicht Open Source; Vorschlag PolyForm Noncommercial als `LICENSE`, lokal
    committen. Noch zu besprechen: Beiträge anderer, eigene Nutzung im Restaurant.
- Aufräumen: `Documents_2026-09-14*.zip` in Downloads darf der Nutzer entfernen, ebenso den Downloadklon
  `emojitwo-source` unter `C:/Users/Vu/.codex/visualizations/2026/09/14/` (die Sammlung im Projekt ist vollständig).
  `TOUCHIT/DECOMPILED/tools/` (2,8 GB) erst löschen, wenn alle vorgesehenen Dekompilierungsversuche abgeschlossen
  sind; der M:-Papierkorb war dafür zu voll. Originale und Analysedateien nicht ungefragt löschen.

## Entscheidungen

Das Manifest beschreibt den Gesamtablauf; hier stehen ergänzende Details.
Neuere Nutzerentscheidungen ersetzen ältere Vorschläge. Offene Punkte bleiben ausdrücklich offen.

- **Startumfang:** Bonieren, Tischplan, zentrale Bons/Rechnungen, Zahlungen, Storno, RKSV,
  Tagesabschluss, Backup, getrennt kassieren, Tischwechsel, Deutsch/Chinesisch und Gutscheine.
  Keine Zwischenrechnung oder offenen Kredite. Weitere Berichte noch offen; QR-Bestellung erst später.
- **Artikel:** Produkte mit einer einheitlichen Variantenliste; jede bestellbare Variante trägt ihren Preis
  (Nutzerentscheidung, 15.09.2026). Keine freien Zusatztexte wie „ohne Zwiebel“ oder Karten-IDs übernehmen.
  TOUCHIT hat Artikel, Unterartikel und acht Preisstufen; WokFlow verwendet den kleineren Aufbau unten.
- **Sprachen:** Artikel zeigen Deutsch und Chinesisch gleichzeitig. Erst mit Kellnern testen;
  eine feste Sprache pro Handy ist nur eine mögliche Ausweichlösung bei Platzmangel.
  TOUCHITs Sprachumschaltung verhält sich an PC und Handy unterschiedlich.
- **Rechte:** Kellner ohne Code, einmalig freigeschaltete Geräte und normale Handy-Bildschirmsperre.
  Chef-Code nur am PC für bezahlte Stornos, Rabatt, Gutscheinverkauf und Tagesabschluss.
  Wer Zahlarten korrigieren darf, bleibt offen. TOUCHIT hat vier Stufen und über 100 Einzelrechte.
- **Hardware:** Lenovo ThinkCentre Neo 50q G5 Tiny, i3-1315U, 8 GB, 256 GB, Linux (Preisstand
  13.09.: ca. 464 €). Touch-Monitor mit USB, Glasfront/IP65 und VESA 100: iiyama T2234MSC-B7X,
  21,5 Zoll/ca. 266 €, oder T1634MC-B1S, 15,6 Zoll/ca. 504 €. Halterung offen.
  Kein Ersatz-PC oder Handy-Notbetrieb, vorerst keine USV. A-Trust unter Linux früh testen.
- **Drucken:** ein Zentraldrucker Metapace T-3II für Rechnungen, Getränke und À-la-carte.
  Kein Mobildrucker; kaputter Küchendrucker entfällt. Ersatzdrucker nur vorgeschlagen.
- **SQLite:** eine lokale Datei, ausschließlich vom Server geöffnet. Jede Buchung als Transaktion,
  `synchronous=FULL`; Modelltest: 1.000 Rechnungen mit je zehn Zeilen in 0,9 s.
  Zeiten in festem Textformat. Treiber: `node:sqlite`, das Node 26 mitbringt (im Modul `tables` in Gebrauch).
- **Backup:** verschlüsselt, laufend nach wenigen Sekunden in die Cloud, stündlich auf USB-SSD,
  nachts vollständig in die Cloud mit EU-Rechenzentrum; Anbieter offen. Warnung bei mehr als einem Tag
  ohne Sicherung, monatlich Wiederherstellung testen. Schlüssel/Zugänge auf Papier zu Hause.
  RKSV zusätzlich monatlich als nie überschriebene Datei. Modelljahr: 54.000 Rechnungen, 56 MB/14 MB
  gepackt. TOUCHITs Kopie auf demselben PC schützt nicht gegen einen Plattenschaden.
- **Storno:** offene Artikel per Minus mit Rücknahme; Gründe und Journal im Backend noch zu klären.
  Bezahlte Rechnung nur vollständig durch Chef am PC mit Grund, signiertem Stornobeleg und neuer
  Rechnung; Geld aus der Kasse. Keine privaten Rückgaben außerhalb der Buchung.
- **Gutscheine:** Chef verkauft nummerierte Geldgutscheine, Restwert speichern; verschenkte
  Leistungsgutscheine und Fremdgutscheine getrennt behandeln. Steuerliche Buchung vom Steuerberater
  bestätigen lassen. Kein allgemeiner Zahlungsmodus „Gemischt“; Gutscheinrest ist ein eigener Ablauf
  (im Entwurf umgesetzt, siehe „Bildschirm und Bedienung“). Gutscheineinlösung bleibt als eigene Zahlungsart
  erfasst. Gutscheinnummern, Anbieter, Gültigkeitsprüfung, dauerhaftes Restguthaben noch nicht angebunden.
- **Trinkgeld:** Bar direkt an Kellner, nicht erfassen. Karte am Nexi-Gerät wählen, separat übernehmen,
  an Angestellte auszahlen. Steuerfreiheit und Nachweis mit Steuerberater klären; nicht pauschal auf
  wesentlich beteiligte Geschäftsführer übertragen. Verteilung unter Kollegen nur nach Vereinbarung.
- **Abschluss/Versand:** vollständiger Papierbon bleibt vorerst, PDF und Datendatei dazu.
  Monatsversand über das Postfach der Chefin, zusätzlich Nachsendeknopf; bei Ausfall später wiederholen
  und warnen. Verschlüsselung/Versanddetails offen. Keine Codex-Automation dafür anlegen.
- **Zahlart und Beleg:** protokollierte Zahlart getrennt vom signierten Beleg; Kartenumsätze müssen
  erkennbar bleiben. Recherchegrundlage: BAO § 131/§ 132a, RKSV § 11 und FAQ Arbeitskreis Kassensoftware
  2.4.15. Vor Umsetzung mit Steuerberater/RKSV-Session bestätigen; nichts still überschreiben.
- **Nexi-Vertrag:** Germany GmbH, Kundennummer 5905840, Vertragspartner 156469572. Mobile Premium an
  der Theke: 16,90 € Miete/Monat, 0,02 € je Zahlung und 3,99 € Monatspauschale.
  Disagio verhandelt, Mindestentgelt 0,25 €/Zahlung laut Preisblatt 01.08.2026; im August nicht auf
  jede Zahlung angewandt (912 Mastercard-Zahlungen kosteten 221,87 €, weniger als 912 × 0,25 €).
- **Nexi-Vertragskopie** (am 15.09.2026 erhalten, Ablage `Kartenzahlung/Nexi_Vertragsdokument_5905840.pdf`):
  Concardis-Vertragsbestätigung vom 11.08.2021. Disagio 12.08.2021–11.08.2024: Mastercard, Visa,
  Visa Electron 0,80 %; MC debit national, V PAY, Maestro 0,28 %; Diners 0,95 %; UnionPay, JCB 2,20 %;
  jeweils mindestens 0,06 € je Zahlung. DCC (Bezahlen in der Heimatwährung ausländischer Karten) aktiv,
  senkt dort das Disagio um 0,50 Prozentpunkte. Terminal 69065732: 60 Monate Laufzeit, also rechnerisch
  bis August 2026, 16,90 € Miete, 0,02 € je Zahlung; keine Monatspauschale im Vertrag. Alle übrigen
  Entgelte nach dem jeweils gültigen Preis- und Leistungsverzeichnis. Die Abrechnungen Mai–Juli 2026
  kündigen neue Preise ab 01.08.2026 an; bei Widerspruch darf Nexi mit 14 Tagen kündigen.
  Laufzeitende, Verlängerung, Kündigungsfrist des Terminals noch bei Nexi erfragen.
- **Nexi-Zahlen:** 30.09.2025–31.08.2026: 481.668,54 € Kartenumsatz, 9.862 Zahlungen, Disagio
  3.052,07 € = 0,63 %. Mastercard etwa 90 % des Umsatzes, im August ca. 0,48 %; Visa etwa 9 %,
  ca. 1,5 %. Gesamtkosten rund 3.960 €/Jahr bzw. 0,76 %. Wöchentliche Auszahlung nach Kartenart,
  Abrechnungsperioden vier/fünf Wochen.
  Je Monat nachgerechnet (15.09.2026): Mastercard Oktober 2025 bis Juli 2026 0,54–0,58 %, August 0,48 %;
  Visa durchgehend 1,32–1,64 %, in elf Monaten 1,52 % auf 42.672 €; Maestro, V PAY 0,38–0,57 %;
  Diners 1,1–1,3 %. Visa zum Mastercard-Satz spart knapp 500 € im Jahr. Monatspauschale (Oktober 2025
  3,95 €, seit November 3,99 €), Miete, Zahlungsentgelt kosten zusammen rund 450 € im Jahr.
- **Nexi-Anbindung:** Ziel bestehende Konditionen für SoftPOS zusätzlich zum Terminal, eine Abrechnung.
  Terminal kann laut Anleitung ZVT über WLAN; Nexi muss freischalten. App-zu-App-Schnittstelle
  übergibt Betrag/Referenz und liefert Ergebnis; dafür wäre eine Android-Verpackung der Web-App nötig.
  Karte liest immer Nexis Gerät/App. Kosten, Rückgabe von Trinkgeld/Referenz und Datenabruf sind offen.
- **SoftPOS-Prüfstand 14.09.:** NFC, Android mindestens 10, Sicherheitsupdate jünger als zwölf Monate,
  kein Huawei. Kassier-Handy Redmi Note 13 Pro 5G geeignet; alte Xiaomi/Huawei bleiben fürs Bonieren.
  Listenpreis 1 € Lizenz und 1 %, Firmenkarten zusätzlich 1,49 %; erst Vertragsantwort abwarten.
  Bei schlechteren Konditionen hobex prüfen. SmartPOS A920 und Handys mit Drucker verworfen.
- **Umstieg:** neben TOUCHIT nur Übungsbelege; nach Anmeldung echte Rechnungen nur aus WokFlow.
  TOUCHIT kurz als Reserve, dann Schlussbeleg/Abmeldung. Gemeinsamer PC/Drucker während Probezeit offen.

### TOUCHIT-Abgleich, 15.09.2026

Nutzerfrage: Fehlt in WokFlow eine TOUCHIT-Funktion, die das Restaurant öfter braucht? Geprüft am
Handy-Programm (21 Seiten; Optionen Art.Transfer, Kell.Transfer, Separieren, Stornieren; Abschluss mit
Bar, Card, Kredit, Bonus, Erlagschein, Konsumation, Personal, Kein Bon, Tip), an den Formularnamen des
Hauptprogramms und an `touchit.ini`. Schon abgedeckt: Tischplan, Bonieren, Splitten, Storno, Zahlart
korrigieren (TOUCHIT `Form_Zahlungsart_Korrigieren`), Barausgaben, Rückgeld, Gutscheine, Tagesabschluss,
Verschieben (neu, siehe „Bildschirm und Bedienung“). Fehlt oder ist zu entscheiden:

- **Rechnungskopie:** Beleg aus „Heute“ nochmals drucken, als Kopie gekennzeichnet; TOUCHIT hat dafür
  die Belegauswahl. Nötig bei Papierende oder verlorenem Bon. Empfehlung: aufnehmen, Chef und Handy.
- **Rechnung mit Kundenadresse:** ab 400 € brutto muss der Empfänger auf der Rechnung stehen
  (Kleinbetragsrechnung nur bis 400 €, UStG § 11 Abs. 6); Firmen und große Gruppen fragen danach.
  TOUCHIT hat eine Gästekartei (`UserControl_Bonieren_2_Adresse`). Empfehlung: Name und Adresse einmal
  eintippen, nur am Chef-PC, keine Kartei.
- **Zwischenrechnung und offene Kredite:** in TOUCHIT eingeschaltet, in WokFlow gestrichen. Mit der
  Chefin prüfen, ob sie wirklich unbenutzt sind (Gruppen, die vorab die Summe sehen wollen; Gäste, die
  später zahlen). Gestrichen lassen, wenn nein.
- **Personal / Konsumation:** TOUCHIT bucht Personalessen und Eigenverbrauch als eigene Zahlart. Klären,
  ob das genutzt wird; sonst nichts bauen.
- **Kassenlade:** in TOUCHIT nicht angeschlossen (`Aktiv=False`). Soll sie sich künftig öffnen, gibt der
  Metapace-Drucker den Impuls; sonst nichts.
- **Berichte:** Artikel- und Uhrzeitstatistik hat TOUCHIT (33 Vorlagen), WokFlow nur Tag und Monat.
  Später aus den gespeicherten Belegen erzeugbar, jetzt nichts bauen.
- **Allergene:** TOUCHIT zeigt sie am Handy. In WokFlow bewusst nicht im Artikel; bei Bedarf später nur
  die Kartenbuchstaben in der Auswahl anzeigen.
- **Zwei Handys am selben Tisch:** TOUCHIT löst das über Revierschutz je Kellner. WokFlow hat keine
  Kellnerkonten und sperrt stattdessen den Tisch, solange ein Gerät ihn offen hat (Entscheidung des Nutzers,
  18.09.2026, Manifest Abschnitt 4 Punkt 1). Ersetzt den früheren Plan, gleichzeitige Zeilen zusammenzuführen.
- Nicht gebraucht: Kellnertransfer, Tischnummer eintippen, Tischplan-Editor (Plan liegt im Code),
  Abschluss „Kein Bon“ (Belegpflicht), Hotel, Waage, Schank, Bonuskarte.

### Bildschirm und Bedienung

Gültig ist der eine Entwurf in `tmp/screens.html` (Dateien unter „Aktueller Stand“): eine lokale
HTML/CSS/JavaScript-Demo ohne Buchung, Zahlung, Druck, Buffetautomatik. Maße, Farben, Abstände stehen in
`screens.css` und sind dort die Wahrheit; hier stehen die Entscheidungen des Nutzers mit ihrem Grund. Den Ablauf
beschreibt das Manifest, Abschnitt 4 und 5. Aufbau des Entwurfs: HTML für die Bildschirme, CSS für die Gestaltung,
JavaScript für die Bedienung, `preview-menu.js` für Artikeldaten; gemeinsame HTML-Vorlagen statt Kopien, keine
Minifizierung, keine parallelen Layoutkopien oder Weiterleitungsdateien.

**Gestaltung**

- Hell, neutrale Grautöne, dunkle Schrift. Tasten, Kacheln, Tische grau getönt ohne Rand (Nutzer, 16.09.2026: „ohne
  Umrandung ist schon moderner“). Sanftes Rosé statt Markenrot (`--accent: #cf6b74`, Füllung `#f3d5d8`), weil das
  kräftige Rot Leuten mit schlechteren Augen zu sehr sticht und sich als Warnfarbe liest. Rosé ist nur Zustandsfarbe
  für belegt, gewählt, Hauptknopf, Menge; mehr Akzentfarbe ist nicht gewünscht, keine satten roten Flächen (der
  gefüllte rote Rechnungsknopf war zu knallig). Rosé-Flächen ohne Rand; der gestrichelte Rand beim Schieben bleibt
  als Zustandsmarke.
- Druckzustand je Fläche, reines CSS: Grau wird dunkler, Weiß wird grau, Rosé wird kräftiger (Nutzer: Grau über Rot
  wirkt blöd). Plus und Minus gleich groß: gesperrt fast weiß mit blassen Strichen, nutzbar grau mit schwarzen
  Strichen, damit Ältere den Unterschied ohne Rahmen sehen; die Striche sind geometrisch gezeichnet, keine
  Schriftzeichen. Fenster kommen von unten, am Daumen. Die Scrollleiste ist dünn und hell, aber nicht ausgeblendet,
  sonst fehlt die Orientierung, ob es weitergeht.
- **Mengenfelder überall ohne Rand** (Nutzer: „we agreed on no border for this type of things“), nur rosé oder grau
  gefüllt. Sichtbar klein, die Tippfläche bleibt 48 × 48 px und rechteckig, damit Tipps an den Ecken nichts
  versehentlich hinzufügen. Sie zeigen sofort die unbezahlte Menge des Tisches; bei null verschwindet das Feld.
- **Einheitlicher Rand (Nutzer, 16.09.2026):** ein Wert `--inset: 16px` links und rechts auf allen Bildschirmen.
- Die Rückgängig-Leiste ist eine weiße schwebende Karte mit leichtem Schatten und grauem Knopf; eine dunkle Leiste
  wie bei Gmail war dem Nutzer zu schwarz und zu betont für ältere Augen. In „Bestellt“ folgt sie der dort
  gewählten Sprache, im Auswahlfenster bleibt sie zweisprachig.
- Tippflächen mindestens 44 px. Die Gestaltung orientiert sich an den W3C-Hinweisen (WCAG 2.2) zu Farbe,
  Textkontrast, Bedienelement-Kontrast, Touchzielen, Rücknahme; daraus keine vollständige Barrierefreiheit ableiten.
- Vom Nutzer festgelegte Größen: **360 px ist die Standardbreite**, dort bricht keine Taste um. Deutsche
  Getränkenamen 18 px, Speisennamen 18.5 px (größer als Getränke, aber so klein, dass „Gebackener Tintenfisch“ in
  eine Zeile passt). Gruppennamen in beiden Gruppenlisten gleich groß, Deutsch 20 px, Chinesisch 17 px. Tischnummern
  im Plan wie die Nummer in der Kopfzeile, 30 px mit Gewicht 600 (Nutzer: muss gleich groß sein), Gartentische
  22 px. Buffetzähler groß (Nutzer: „can be much bigger“), Altersgruppen so groß wie der Buffetname. „Rechnung“ in
  „Bestellt“ 20 px.
- **Keine automatische Verkleinerung auf Tasten** (Nutzer: Namen bleiben gleich groß, im Notfall zweite Zeile, aber
  melden). Nur in „Bestellt“ werden lange Namen passend zur Breite kleiner gesetzt, damit jede Zeile einzeilig
  bleibt. Beim getrennten Kassieren dürfen lange Namen logisch umbrechen: Zusätze wie „+ Wasser“, „+ Zit“,
  Stückzahlen bleiben zusammen, „mit“/„und“ bleiben beim folgenden Wort, nie mitten im Wort, keine
  Schriftverkleinerung.

**Bilder**

- **Nur Emojis aus dem EmojiTwo-Paket, nie selbst gezeichnete Bilder** (Nutzer, 16.09.2026: „I strictly want emojis
  from the emojis pack“, nach einer selbst gezeichneten Frühlingsrolle).
  [EmojiTwo](https://github.com/EmojiTwo/emojitwo) steht unter CC BY 4.0: Urheberangabe, Lizenzlink, Kennzeichnung
  der Anpassungen. Kleine farbige Bildsymbole nur in den Gruppenlisten, links in der Zeile, keine Bilder bei
  Artikeln oder Buffet. Helle Formen bekommen eine sichtbare Kontur auf Weiß; kein Zuschneiden, alle SVGs behalten
  die volle Zeichenfläche 64 × 64, Größe und Bildmitte richtet das CSS aus.
- Angepasste Menügrafiken liegen in `icons/wokflow/`, die unveränderte Sammlung in `icons/emojitwo/` (2.789 SVGs mit
  `LICENSE.md` und `README.md`, bezogen am 15.09.2026, Revision `311eff547b3ff4a61fdbae897dd09d41416048fc`). Für
  Anpassungen Arbeitskopien verwenden, die Sammlung unverändert lassen. Quellen und Anpassungen stehen kurz auf
  Englisch in `icons/sources.md`; die vollständige verlinkte Zuordnung jeder WokFlow-Grafik zu ihren
  EmojiTwo-Originalen erhalten, nicht zugunsten der Kürze entfernen. Das Logo `icons/asiawok/logo.svg` ist laut
  Nutzer KI-generiert, Eigentümer ASIA WOK Restaurant GmbH, in der Quellenliste so aufführen.
- Snacks ist das unveränderte EmojiTwo-Baguette 1f956 (vom Nutzer gewählt; eine Frühlingsrolle gibt es weder in
  EmojiTwo noch in Unicode), Reis 1f35a, Huhn & Ente das Huhn. Fleisch am Knochen für Rind hat der Nutzer verworfen,
  ein Steak-SVG fehlt im Paket; passende Gerichte sind erwünscht, sonst Tiere als Rückfall. Vorläufig bis zur
  Entscheidung: Suppen & Salate `starters`, Rind & Schwein `beef`; danach ungenutzte Bilder in `icons/wokflow/` samt
  Zeilen in `icons/sources.md` löschen (Nutzerwunsch).

**Bestellen**

- Geld nur bei Rechnung, Zahlung, „Heute“, Abschluss, mit Punkt und Eurozeichen (`27.90 €`); beim Bestellen keine
  Preise. **Getränkegrößen immer mit Punkt und ohne Literzeichen**: `0.25`, `0.5`, `0.3 + Wasser`, `0.5 + Soda`.
  Fehlende Preise werden nie als null behandelt.
- Kopfzeile „Bestellen / Bestellt“ ohne Artikelzahl, doppelte Überschrift, Statusfußleiste; kein Pfad „Getränke ›
  Limonaden“; keine wechselnden Tastenpositionen. **Bestellansicht C gewählt:** volle Bestellfläche oder volle
  Bestellliste über zwei Reiter; Gruppe und Scrollposition bleiben beim Hinzufügen und beim Reiterwechsel erhalten;
  Buffet erscheint auch in „Bestellt“.
- Auswahlfenster: Artikelname und schlichtes X, ohne „Variante / 规格“. Nach einer Buchung bleibt es offen (dreimal
  dieselbe Cola-Größe ohne erneutes Öffnen), Mengen ändern sich sofort; X, Escape, Tipp außerhalb schließen, innen
  tippen nicht. Tasten mit weiterer Auswahl zeigen den Pfeil rechts, direkte Buchungen keinen. Cola/Zero/Light: eine
  Cola-Taste, drei Sortentasten oben im Fenster, darunter nur die passenden Varianten; Light nur als Flasche; die
  Cola-Taste zählt alle drei Sorten. „Flasche 0.35“ als breite Zeile bei Cola, Cola Zero, Fanta, Sprite; keine
  erfundenen Flaschensorten. Wortvarianten (Tee, Kaffee, Campari, Mineralwasser) als volle Zeilen mit der Menge
  rechts, damit beim Antippen nichts wächst oder überlappt.
- **Zitrone, vom Nutzer bestätigter Ablauf:** zuerst Größe/Wasser/Soda buchen, danach bei Bedarf einmal „+ Zitrone“
  für das zuletzt neu gebuchte Glas. Keine Checkbox, keine Vorauswahl, kein Bestätigungsfenster. Kurzes Hervorheben
  der Mengenzahl, 20 ms Vibration auf unterstützten Geräten, reduzierte Bewegung beachten. Im Auswahlfenster bleibt
  nur die Gesamtmenge; mit und ohne Zitrone erscheinen als getrennte Positionen in „Bestellt“. Der nächste
  Größenklick bucht wieder ohne Zitrone. Die Aktion ist vor der ersten Buchung, nach Anwendung, nach
  Größenkorrektur der letzten Portion, Sortenwechsel oder erneutem Öffnen nicht verfügbar, bis neu gebucht wird.
  Wiederholtes Tippen berechnet keinen zweiten Zuschlag; bereits abgeschickte Portionen bleiben unverändert. Direkt
  gebuchte Getränke bekommen keine Zitronenabfrage. Extra-Eis ist zurückgestellt.
- **Ein Name je Artikel (Nutzer, 16.09.2026):** derselbe Name auf Taste, in „Bestellt“, auf der Rechnung; keine
  Langform, keine eigenen Tastenbeschriftungen (Umbrüche am Bildschirm stören, jede Rechnungszeile kostet Papier).
  `menus` in `preview-menu.js` trägt dieselben Namen wie `src/catalog/` (Skriptvergleich ohne Abweichung). Passt ein
  Name bei 360 px nicht, wird er gekürzt, in beiden Sprachen mit gleichem Schnitt: Meist bleibt der Anfang,
  unterscheidende Wörter bleiben (Gegrillte und Gebackene Garnelen). Gebackener Tintenfisch 炸鱿鱼 bleibt lang
  (Nutzer: der Verlust von „gebacken“ war schade). Getränke behalten ihre vollen deutschen Namen. Die Namen weichen
  bewusst von der Speisekarte ab: ohne „Pago“, „Jiao Zi“, „Mini“. Nur die Anzeige der Zusätze wird gekürzt:
  `serviceLabel` macht in „Bestellt“ und Rechnung aus „+ Zitrone“ „+ Zit“ und aus „Flasche 0.35“ „0.35 Fl.“.
- **Eine Zeile je Name (Nutzer, 16.09.2026):** Getränketasten zeigen Deutsch und Chinesisch je in einer Zeile; dafür
  sind lange chinesische Namen gekürzt (im Katalog). Bei Direktartikeln nutzt die deutsche Zeile die volle
  Tastenbreite, nur die chinesische lässt dem Mengenfeld Platz. Die zweite Zeile der Sushi-Sets ist gewollt.
- Sushi-Mengen nach Speisekarte Seite 5, nur im Entwurf, nicht im Katalog: klein 7 Sushi + 3 Maki, mittel 9 + 3,
  groß 11 + 3, Lachs Sushi 8 + 3, als zweite Zeile wie „7 Sushi 寿司 + 3 Maki 卷“, jede Zahl nur einmal; Futo Maki
  (10) und Maki im Set (18) in derselben Zeile.
- „Bestellt“: fett gesetzte Menge ohne „×“, nur Minus, auch für Buffetpersonen. Ein kleiner Sprachknopf „DE“/„CN“
  rechts neben „Rechnung“, jeweils eine Sprache. Die chinesische Ansicht enthält ebenfalls Größe,
  Flaschenkennzeichnung, Zusätze, Maki-Stückzahl, Zusätze in derselben Plus-Schreibweise („可乐 0.3 + 水 + 柠檬“).
- **Speisengruppen (Nutzer, 16.09.2026, endgültig):** 10 Gruppen, einspaltig, in dieser Reihenfolge: Suppen &
  Salate 汤和沙拉 (2 Suppen | 4 Salate), Snacks 小吃 (Frühlingsrollen, Hummerchips, Gebackene Banane,
  Knoblauchsauce), Sushi 4, Maki 6, Meeresfrüchte 5 (mit Gebackener Tintenfisch und Gebackene Garnelen), Gemüse 2,
  Huhn & Ente 鸡肉和鸭肉 (8 | 1), Rind & Schwein 牛肉和猪肉 (4 | 2), Reis 米饭 5, Nudeln 面条 3. Die chinesischen
  Gruppennamen sind die üblichen Wörter, nicht vorläufig.
  - Warum so: Zusammengelegt nur, was zusammengehört, mit bekannten Wörtern statt Oberbegriffen („Geflügel“,
    „Fleisch“, „Rind, Schwein, Ente“ verworfen). Sushi und Maki getrennt, sonst müsste man in der Gruppe scrollen.
    Vier Gruppen Huhn, Ente, Rind, Schwein wären „goofy“ und unruhig; zwei Spalten verworfen. Reis und Nudeln
    getrennt, Knoblauchsauce zu Snacks, Nachspeisen entfallen. Kleinere Tasten (52 statt 64 px) hat der Nutzer nicht
    aufgegriffen.
  - In zusammengelegten Gruppen trennt eine kleine graue Linie die Teile. Im Katalog sind die Teile eigene Gruppen
    (`soups`, `salads`); der künftige Bildschirm legt sie zusammen, die Linie steht dort, wo eine Kataloggruppe endet
    (`groupDividers` gibt es nur im Prototyp).
- Getränkegruppen: Limonaden, Fruchtsäfte, Wasser, Bier, Weine, Warmes, Spirituosen. Kein zusätzlicher Einstieg
  „Kaltgetränke“. Kurze Beschriftungen „Weine / 酒“, „Warmes / 热饮“; die Reihenfolge folgt der Speisekarte, offene
  Weine bleiben daher vor warmen Getränken.
- **Buffet:** Hauptfall, laut Nutzer gefühlt 99 %. Getränke oft zuerst, Buffetanzahl erst beim Kassieren. Eine
  Buffetart je Tisch, siehe Manifest Abschnitt 4 Punkt 2.
- **Buffettarife:** Mo/Mi–Sa mittags 11:30–14:30: Erwachsene 15.90 €, 6–9 Jahre 9.90 €, 3–5 Jahre
  5.90 €; abends 17:00–21:30 sowie sonntags/feiertags ganztags 19.90/12.90/7.90 €.
  Unter drei gratis; Dienstag geschlossen außer Feiertagen; kein eigener Freitagspreis.
- **Buffetautomatik noch Vorschlag:** Serverzeit `Europe/Vienna`, lokal hinterlegte Kärntner Feiertage,
  Tarif in Bonzeile festhalten. Außerhalb der Zeiten ausdrücklich wählen; bei unzuverlässiger Uhr oder
  fehlendem Kalender keine Automatik. Offen: Josefstag/Volksabstimmung sowie Vormerken des Tarifs beim
  ersten Bestellen, damit spätes Erfassen keinen Tarifwechsel verursacht.

**Schieben und Mitnehmen**

- **Schieben (Tischwechsel, Nutzer, 15. und 16.09.2026):** Taste, Streifen, Fenster heißen „Schieben“, nicht
  „Verschieben“ oder „Umsetzen“ (kürzer, versteht jeder). In „Bestellt“ steht „Rechnung“ groß in der Mitte, links
  die Schieben-Taste, rechts der Sprachknopf, beide quadratisch 56 px, unabhängig von der Sprache. **Die Taste ist
  nur ein Pfeil „→“** für beide Sprachen, mit Linien gezeichnet wie Plus/Minus, weil Hyperreadable kein „→“ hat;
  `aria-label` „Tisch schieben · 换桌“; bei leerem Tisch gesperrt. Sie führt zum Tischplan mit dem Streifen „14
  schieben“ und „Abbrechen“, ohne Zusatzhinweis; der Quelltisch ist gestrichelt und nicht antippbar, Innen/Garten
  bleiben wählbar. Ein Tipp auf den Zieltisch öffnet ein Bestätigungsfenster: „Tisch 14 auf Tisch 12 schieben?“;
  bei belegtem Ziel nur „Tisch 14 mit Tisch 3 zusammenführen?“ mit „Zusammenführen“, ohne Satz „ist belegt“.
  „Abbrechen“ lässt die Zielwahl offen, Escape schließt nur das Fenster. Geschoben werden alle Bestellzeilen und
  Buffetpersonen, auch noch nicht abgeschickte. Kein Rückgängig: Der Nutzer wollte statt eines stehenbleibenden
  Streifens die ausdrückliche Frage. Ein belegter Zieltisch ist erlaubt, weil Gäste sich zu Bekannten dazusetzen
  (vom Nutzer offengelassen). Nur ganze Tische; einzelne Artikel schieben (TOUCHIT „Art.Transfer“) ist nicht gebaut
  und ginge später über die Auswahl des getrennten Kassierens.
- **Mitnehmen (Nutzer, 16.09.2026):** eine eigene Taste im Innenplan, mittig in der freien Fläche zwischen 24 und
  18, nur das Wort „Mitnehmen“ ohne Chinesisch in 18 px (kommt selten vor), für Gäste an der Theke, die nur Essen
  mitnehmen. Drinnen heißt sie „M“ (Nutzer: außen Mitnehmen, drinnen M, dann ist die Größe konsistent): Kennung `M`,
  Kopfzeile „M“ wie eine Tischnummer, in „Heute“ „M“, in Rechnung und Fenster „Mitnehmen“. Sie öffnet die
  Bestellung wie ein Tisch; der Reiter Buffet fehlt, weil Buffet nicht mitgenommen wird (Nutzer: nicht ausgrauen,
  weglassen). Beim Schieben kann sie Quelle sein, aber kein Ziel.

**Bezahlen**

- **Getrennt kassieren:** Artikelauswahl mit Mengen, Rest bleibt offen, nach Teilzahlung zurück zur Auswahl, nach
  der letzten Zahlung zum Tischplan; die ganze Rechnung bleibt der direkte Normalfall. Ausgewählte Zeilen in der
  Akzentfarbe umranden; die Liste scrollt, Summe und Kassieren bleiben am Fuß. Nur die Summe der Auswahl, keine
  Restbetrag-Zeile. Verfügbare Menge links, Plus/Minus kompakt rechts in derselben Zeile. Kopfzeile beim Aufteilen,
  in Rechnung und Kartenabschluss mit „Tisch 9“ beziehungsweise „9号桌“; beim Bestellen bleibt die kompakte Nummer
  ohne „Tisch“. Kein doppelter Einstieg „Getrennt kassieren“ auf der Zahlungsseite; „Zurück“ führt auch bei
  gesamtem Rest zur Mengenauswahl.
- **Sprache (Nutzer, 16.09.2026):** Der Sprachknopf steht nur in „Bestellt“; Rechnung, Getrennt, Bar, Karte,
  Gutschein übernehmen die dort gewählte Sprache ohne eigenen Knopf. Deutsch ist beim Öffnen der Standard. Umstellen
  verändert keine Auswahl, Beträge oder Eingaben und nicht die Sprache beim Bestellen: Die Reiter und die
  Artikelauswahl bleiben zweisprachig. Buffetnamen in der Rechnung wie in „Bestellt“.
- Rechnung: feste Spalten für Menge, Name, Betrag, Mengen ohne „×“, Beträge rechts ohne Umbruch, der Rechnungsbetrag
  groß. Fester Fußbereich: ganz unten die großen Tasten „Bar“/„Karte“ nebeneinander, darüber „Gutschein“ und
  „Getrennt“/„分开“ in zwei gleich breiten, sprachunabhängigen Feldern; zwei Tastenreihen statt drei, mehr Platz für
  die Liste. Artikel scrollen nur im eigenen Bereich. „Bar“ öffnet den Barabschluss mit „Abschließen“, der
  Kartenabschluss heißt „Fertig“.
- **Gutschein:** öffnet ein kompaktes Betragsmenü mit denselben Zahlentasten wie Bar: Wert eintippen, verbleibenden
  Zahlbetrag sofort sehen, „Anrechnen“. In der Rechnung steht dann der Restbetrag groß, der Gutscheinabzug über den
  Zahlungstasten; Bar/Karte übernimmt nur diesen Rest. Bei voller Deckung ersetzt „Abschließen“ die
  Bar-/Karte-Tasten. Gutschein erneut öffnen zum Ändern oder Entfernen; Schließen, Escape, Außentippen verwerfen nur
  die noch nicht übernommene Eingabe. Übersteigt der Gutschein die Rechnung, erscheint „Gutscheinrest“, keine
  Auszahlung als Rückgeld. Gleicher Ablauf für Teilrechnungen, ohne Übernahme in die nächste Auswahl oder an einen
  anderen Tisch. „Heute“ kennzeichnet Gutschein, Bar + Gutschein, Karte + Gutschein. Im Entwurf keine echte Einlösung
  oder Speicherung.
- **Rückgeldrechner** im Barabschluss, kein separater Rechnerknopf neben „Bar“. Zuerst „Zahlbetrag“, mit der
  Rechnungssumme abzüglich Gutschein vorausgefüllt: ohne Änderung übernehmen oder den Gastwunsch eintippen, etwa
  59.70 → 60 €. „Übernehmen“ öffnet „Gegeben“; der Zahlbetrag bleibt darüber sichtbar und korrigierbar, das Rückgeld
  wird sofort berechnet. „Abschließen“ geht jederzeit ohne Rückgeldberechnung, auch vor „Übernehmen“. Eigene große
  Zahlentasten mit Dezimalpunkt und Rücktaste, Eingabefelder mit `inputmode="none"`, damit keine Handytastatur
  aufgeht; normale Tastatur und Eingefügtes gehen auch, Komma wird zum Punkt. Kein Aufrunden-Knopf. Zu wenig gegeben
  zeigt „Fehlt“; ungültige Beträge oder ein Zahlbetrag unter dem offenen Rechnungsbetrag verhindern den Abschluss.
  Die Rechnung bleibt beim ursprünglichen Betrag; Bargeldtrinkgeld, gegebener Betrag, gewünschter Zahlbetrag werden
  nie gespeichert. Rechnen in ganzen Cent. Schließen, Escape, Außentippen brechen ab; bei neuer Rechnung,
  Tischwechsel, erneuter Teilzahlung werden die Eingaben verworfen. Gleich für ganze Rechnung und Teilrechnung.
- „Heute“ am Handy: nur die Rechnungsliste, keine Summen für Bar/Karte, keine Rechnungsanzahl. Bar/Karte dort nur
  lesbar, kein versehentliches Umschalten; wer später korrigieren darf, ist offen. Der Tagesabschluss ist nur für
  den Chef, im Entwurf mit `?chef=1#closing`, ohne Einstieg vom Handy; dieser Parameter ist **keine echte
  Rechteprüfung**. Der Erfolgstext „Von Nexi bestätigt“ ist entfernt; die bestätigte Zahlung bleibt fachlich nötig.
- Navigationslinks „Heute“, „Zurück“ außerhalb des Zahlungsablaufs mit kleinem Chinesisch daneben; reine
  Zurückpfeile in den Artikelgruppen ohne sichtbaren Text.

**Werkzeuge und Prüfen**

- `sed -i` zerstört in den CRLF-Dateien `screens.js`, `screens.css`, `preview-menu.js` die Zeilenenden; dort nur mit
  dem Edit-Werkzeug ändern. Menüdatei, `screens.css`, `screens.js`, Bild-URLs tragen eine Versionskennung `?v=`
  gegen veraltete Dateien im Cache, bei jeder Änderung hochzählen; der offene HTML-Tab muss neu geladen werden.
- Auswahlbilder dem Nutzer als PNG schicken (mit Edge ohne Fenster gerendert); SVG-Auswahlblätter kamen nicht an.
- Geprüft wurde bisher im lokalen Edge-Browser bei 320 bis 412 px Breite mit Screenshots und Messungen, nie am
  echten Redmi. Offen am echten Gerät: Handygefühl der Vibration, Unterdrückung der Bildschirmtastatur unter Android.

### Tischplan und Schrift

- Zwei Bereichstasten Innen/Garten; der Raum als Abschnitt über dem Garten, zusammen auf einem Bildschirm. Auf Handy
  und PC dieselbe Anordnung, der Plan passt immer auf eine Seite. Schlichte Rechtecke; keine Stühle, Bänke,
  Buffet-Möbel, Beträge, Zeiten, Belegtpunkte, Frei/Belegt-Legende. Tische etwas länglich, keine Quadrate, weil an
  den langen Seiten je zwei und am Kopf eine Person sitzen (Nutzer, 16.09.2026).
- Die Überschrift „Tische“ entfällt (Nutzer: nicht nötig, man weiß, wo man ist). Die Kopfzeile trägt links
  „Reservierungen 预订“ als vorbereiteten Knopf für Online-Reservierungen und das Markieren reservierter Tische
  (Bildschirm folgt) und rechts „Heute“.
- Innen oben 1/2/3/4/5/6; darunter 11/10/9/Gang/8/7, dann 12/13/14/Gang/15/16. 1–5 dieselbe Tastengröße wie 12–16;
  Tisch 6 so klein wie Tisch 7, oben bündig mit 1–5 (Nutzer, 16.09.2026). Die 20er-Gruppe ganz links: 21/22 oben,
  24 über 23 unter 21, Tisch 20 rechts daneben mit gleicher Unterkante wie 23. 19 über 18 senkrecht rechts unter 15,
  17 auf Höhe von 19 daneben. Gleiche Abstände zwischen 21/22 und 24/23. 20 kleiner (1+1), 21/22 Vierertische, 12–16
  Sechsertische, 1–6 und 7–11 gewöhnlich 2+2, 1–6 eng bis 3+3.
- Vier graue Trennlinien markieren die Innenbereiche: zwischen 11/10/9 und 12/13/14, zwischen 8/7 und 15/16, unter
  12/13/14 vor 21/22, unter 15/16 vor 19/17. Die Reihe 1–6 steht dichter an der Reihe darunter, weil sie
  zusammengehören.
- 18, 19, 23, 24 haben jeweils eine eigene Taste und eigene Bestellung. Keine Auswahl „Ganz“, keine gemeinsamen
  Buchungsnummern 18/19 oder 23/24, keine Nummer 25. Für eine gemeinsame Gästegruppe wird eine der beiden Nummern
  verwendet.
- Raum: 33/34/30 über 32/31/35, gleiche Rechtecke. Garten: G12/G11, Gang/Haupteingang, G1/G2/G3/G4; unten G15/G16
  links, G9 unter G2, G8 unter G3. G = Garten; der Gang als zwei schlichte Linien. Nummer 9 und G15/G16 sind
  vorläufig, Nutzerbestätigung offen.
- Das Logo unten rechts, höchstens 140 px breit, nicht in die Mitte zwischen die Tische gequetscht (Nutzerwunsch),
  unverzerrt, ohne Rahmen oder Tippfunktion.
- Aus den Fotos und Videos des Nutzers vom 15.09.2026 (WhatsApp, mit chinesischem Text): 18/19 ist ein langer Tisch
  für zehn Personen (2+4+4), 20 ein Zweiertisch, 21/22 normale Tische, 23/24 zusammengestellt, 16/17 normalerweise
  in einer Flucht. Empfehlung: schlichte Geometrie beibehalten, höchstens Proportionen angleichen (18/19 etwas
  länger als 23/24). Der Tischplan ist danach noch nicht verändert; nichts entgegen der letzten Nutzeranordnung
  verschieben.
- **Schrift gewählt: Hyperreadable**, ausdrückliche Korrektur des Nutzers, nicht IBM Plex Sans. Quelle:
  [Hyperreadable](https://github.com/MadSimple/hyperreadable), SIL OFL 1.1, kommerzielle Verwendung geprüft,
  Copyright und Lizenz bei Weitergabe behalten. Die unveränderten Schnitte Regular/Medium/SemiBold samt OFL liegen in
  `WokFlow/fonts/`, keine Systeminstallation. Chinesisch nutzt Ersatzschriften.

### Geldbeträge: Dinero.js 2 (gewählt 14.09.2026)

- Der Nutzer wollte eine moderne TypeScript-Bibliothek, die auch größere Programme verwenden, und beauftragte die
  Auswahl. Gewählt ist **Dinero.js 2** (Stand 2.0.2 vom 13.03.2026, eigene TypeScript-Typen, Node >= 20):
  Geldbeträge mit Währung, Berechnungen, Rundung, Ausgabe; passt zu Preisen in ganzen Euro-Cent. `decimal.js` ist
  damit ersetzt und nicht zusätzlich nötig: Dinero stellt auch Bruchteile eines Cents als ganze Zahl mit `scale`
  dar (3505 bei `scale: 3` für 3.505 €), Faktoren ebenso (`{ amount: 15, scale: 1 }` für 1.5). Quellen:
  [Dinero.js](https://www.dinerojs.com/),
  [Nachkommastellen](https://www.dinerojs.com/faq/can-i-multiply-by-a-decimal).
- Ehrlich zur Verbreitung (Frage des Nutzers): kein Branchenstandard und kein belegter Spitzenplatz. `decimal.js`
  hat deutlich mehr Downloads, ist aber allgemeine Dezimalrechnung; die Empfehlung beruht auf Geldfunktionen,
  TypeScript-Unterstützung, belegter Nutzung (WooCommerce führt `dinero.js` 2.0.2 in seiner Abhängigkeitsdatei,
  am 14.09.2026 gelesen).
- Im Katalog `dinero({ amount: cents, currency: EUR })` ohne `scale`: Dinero nimmt dann den Exponenten der Währung,
  bei EUR 2, also Cent. Nur `article` und `variant` in `articles.ts` rufen `dinero` auf. Rundungsregel und
  Rundungszeitpunkt werden am Rechnungsablauf geklärt; noch keine Geldberechnungen angebunden.
- In `commands.md` stehen Entwicklungswerkzeuge und Dinero getrennt: `-D` gilt für alle Pakete eines Aufrufs, und
  Dinero wird auch im laufenden Kassensystem gebraucht.

### Artikel und Gruppen

Stand 18.09.2026, mit dem Nutzer gebaut in `WokFlow/src/catalog/`.

- **Artikel stehen im Code, nicht in der Datenbank (Nutzer, 16.09.2026):** Preise ändern sich selten, der Nutzer
  pflegt sie selbst; die Chefin bekommt keinen Bearbeitungsbildschirm. Begründung: kein zusätzlicher Code dafür,
  IntelliJ prüft jeden Artikel über die Typen. In SQLite kommt, was im Betrieb entsteht, etwa Bestellungen,
  Belege, Zahlungen. Eine Preisänderung braucht kein Kompilieren, der laufende Server aber einen Neustart.
- **Dateien:**
  - `articles.ts`: Typen `Article` (`name` mit `de` und `zh`, `variants: Variant[]`) und `Variant` (`name` mit `de`
    und `zh` oder `null`, `price: Dinero<number, "EUR">`), dazu die Fabrikfunktionen `article(de, zh, variants)`
    und `variant(de, zh, cents)`. `article` nimmt eine Variantenliste oder nur den Preis in Cent; eine Zahl ergibt
    die eine Variante ohne Namen (Prüfung mit `Array.isArray`).
  - `buffet.ts`, `food.ts`, `drinks.ts`: je logischer Liste ein `export const name: Article[]`, eine Zeile
    `article(…),` je Artikel, Reihenfolge wie am Bildschirm. Gemeinsame Variantenlisten stehen oben:
    `buffetSmall` und `buffetBig` in `buffet.ts`; `variantPieces(cents1, cents2)` für „6 Stück“ und „12 Stück“,
    vom Nutzer geschrieben, in `food.ts`; `variantsFull`, `variantsBottle`, `variantsJuices`, `variantsWines` in
    `drinks.ts`. `lemon` steht am Ende von `drinks.ts`.
  - `menu.ts` (Nutzer: der Ordner bleibt `catalog`): `Category` mit `tax`, `print`, `groups`, `Menu` mit `buffet`,
    `food`, `drinks`, die Konstante `menu`, dazu der Suchteil mit `entryOf` (siehe „Stand der Dateien“). **Die
    Gruppen im Katalog sind die logischen Listen**, jede eine einfache Liste in Kurzschreibweise (`soups`, `salads`,
    `snacks`; Nutzer, 16.09.2026: keine „Artikelmatrix“ `Article[][]`). Auch das Buffet hat eine Gruppe (`buffets`),
    damit alle Hauptkategorien gleich aufgebaut sind.
    **Was zusammen gezeigt wird, entscheidet der Bildschirm** (Nutzer, 16.09.2026, „much more elegant“): Er braucht
    ohnehin eine Tabelle seiner Gruppen mit Namen in beiden Sprachen und Bildern; darin steht auch, welche
    Kataloggruppen eine Bildschirmgruppe bilden, etwa Suppen & Salate aus `soups` und `salads`. Keine beliebig tiefe
    Verschachtelung: Hauptkategorie, Gruppe, Artikel, Variante. Nicht gewählt (16.09.2026): Listen je
    Bildschirmgruppe als `Article[][]` oder per Spread in `menu.ts` verbunden, Buffet ohne Gruppe mit `articles?`
    neben `groups?` (dem Nutzer zu unordentlich), `menu` ohne geschriebenen Typ, die zusammengelegten
    Bildschirmgruppen trennen (13 Speisengruppen passen nicht ohne Scrollen, Ente stünde allein).
- **Umfang (am 18.09.2026 aus dem Code gezählt):** 102 Artikel (Buffet 4, Speisen 50, Getränke 48) mit 199 Varianten
  in 21 Kataloggruppen (Buffet 1, Speisen 13, Getränke 7), am Bildschirm 18 Gruppen (Speisen 10); dazu `lemon` in
  der Gruppe `extras`, zusammen 200 Varianten. Namen, Reihenfolge, Preise wie `tmp/preview-menu.js` und die
  Speisekarte 2026; die Kinderpreise Sonntag/Feiertag stehen nicht im PDF, übernommen aus „Buffettarife“.
- **Kennung eines Artikels ist sein deutscher Name** (Nutzer, 16.09.2026): alle eindeutig, Namen ändern sich
  selten; eine Umbenennung zählt in Statistiken als neuer Artikel. Keine englische Konstante je Artikel, doppelte
  Namen neben `name.de` störten den Nutzer; englische Bezeichner nur für Listen.
- **Ein Name je Artikel**, Deutsch und Chinesisch, derselbe auf Taste, in „Bestellt“, auf der Rechnung (siehe
  „Ein Name je Artikel“ unter „Bildschirm und Bedienung“). Nicht im Artikel: Allergene, Chili,
  Lebensmittelhinweise, englische Namen, Karten-IDs, Kategoriepfade.
- **Varianten:** Jeder Artikel hat mindestens eine Variante mit Preis (15.09.2026); ohne Auswahl ist ihr `name`
  null, der Bildschirm zeigt dann keine Auswahl. `Variant[]` erzwingt keine Mindestlänge, `article` mit Preis
  erzeugt genau eine. Eine einzelne Größe bleibt als Variante (Tsingtao 0.33, Hefetrüb 0.5, Cola Light
  „Flasche 0.35“); Prosecco steht ohne Größe, weil „0.2“ nirgends gezeigt wird. Größen mit Punkt und ohne
  Literangabe (`0.25`, `0.3 + Wasser`); Größen sind Text, weil Varianten auch Mischungen, Sorten, „6 Stück“
  beschreiben. Preise als ganze Cent (`450` für 4.50 €). Jede Variante auf eigener Zeile, auch eine einzelne
  (Nutzer: bessere Sichtbarkeit). Auf der Rechnung steht die gewählte Variante mit Menge und Preis.
- **Buffet (15.09.2026):** Jede Buffetart ist ein Artikel (Mittagsbuffet, Abendbuffet, Sonntagsbuffet,
  Feiertagsbuffet), die Altersstufen Erwachsene, 6–9, 3–5 sind seine Varianten; Mittag mit `buffetSmall`, die
  anderen mit `buffetBig`.
- **Gemeinsame Variantenlisten nur, wo die Preise gemeinsam wechseln** (Nutzer, 16.09.2026: Cola und Fanta ändern
  ihre Preise immer gemeinsam). Kombiniert per Spread, etwa `[...variantsFull, ...variantsBottle]` für Cola, Cola
  Zero, Fanta, Sprite (Spread erklärt wie `addAll` in Java). Ausgeschrieben stehen Bier (Villacher und Radler
  kosten gleich, Preisänderung dann an zwei Stellen), Aloe Vera, Lycheesaft, Mineralwasser, Soda, Leitungswasser.
  Offen: ob die Hauptspeisen zu 14.90 € gemeinsam ihren Preis ändern.
- **Zitrone (16.09.2026):** ein Zusatz, keine Variante; eigener Artikel `lemon` (Zitrone 柠檬, 0.20 €). Seit
  17.09.2026 in der Katalog-Gruppe `extras` unter Getränke, die der Bildschirm nicht als Gruppe zeigt, damit sie
  nicht allein bestellbar ist. Soda hat deshalb keine eigenen Zitronen-Varianten mehr, sie kosteten genau 0.20 €
  mehr. Wie eine Bestellzeile die Zitrone festhält, ist Bestelllogik und kommt mit dem Bildschirm.
- **Druck an der Hauptkategorie (Nutzer, 16.09.2026):** `print` neben `tax`, Getränke und Speisen `true`, Buffet
  `false`. Gemeint ist der Bestellbon; die Rechnung zeigt alles.
- **Steuer nur an der Hauptkategorie:** Buffet 10 %, Speisen 10 %, Getränke 20 %. Die einzige Ausnahme steht seit
  17.09.2026 fest im Bau von `entries` in `menu.ts`: Leitungswasser 10 (Nutzer: ändert sich fast nie); wird
  Leitungswasser umbenannt, diese Zeile mitändern. `orderOf` fragt nur `entryOf` und weiß nichts von Ausnahmen
  (Nutzer, 16.09.2026: Nachschlagen gehört ins Menü). Schlüssel bleibt der deutsche Name als Text: Eine Konstante
  `tapWater` lehnte der Nutzer ab (keine Variable je Artikel). Verworfen: `tax?` am Artikel (eigene Property für
  eine Ausnahme), Pflicht-`tax` an jedem Artikel (Wiederholung), eine Ausnahmeliste `taxExceptions`. Der Name bleibt
  `tax`, nicht `vatRate`. Berechnetes Leitungswasser 10 % (Mineralwasser 20 %); Kaffee und Tee einschließlich
  Cappuccino und Latte Macchiato 20 %. Quelle am 15.09.2026 geprüft:
  [WKO: Umsatzsteuersätze für Restaurationsumsätze](https://www.wko.at/steuern/ermaessigte-umsatzsteuer-saetze).
  Die neuen 4.9 % für bestimmte Grundnahrungsmittel gelten nicht für Restaurationsleistungen. Rechtsgrundlagen:
  [UStG § 10](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=10),
  [BMF zur Änderung 2026](https://www.bmf.gv.at/rechtsnews/steuern-rechtsnews/aktuelle-infos-und-erlaesse/fachinformationen---umsatzsteuer/umsatzsteuersenkung-auf-ausgewaehlte-nahrungsmittel.html).
  Belegbeschreibung: [BAO § 132a](https://ris.bka.gv.at/eli/bgbl/1961/194/P132a/NOR40173931)
  und [UStG § 11](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=11).
- **Beim Buchen** Name, Preis, Steuersatz in der Buchung festhalten, damit Katalogänderungen alte Belege
  nicht verändern (im Modul `tables` so gebaut); keine zweite, unabhängig gepflegte Preisliste. Steuerberechnung und
  Belegspeicherung sind noch nicht gebaut.
- Quellen der Daten: der Prototyp und `AsiaWok_Speisekarte_2026.pdf` (siehe „Einstieg“). Enthaltene Grill-Soßen
  sind keine eigenen Artikel, bezahlte Extra-Sauce getrennt. Portionsgröße und bestellte Anzahl nicht verwechseln.
- **Offen:**
  - Weingrößen „1/8“, „1/4“, „1/2“ weichen von der Punktregel ab, im Prototyp ebenso.
  - Die Tabelle der Bildschirmgruppen (Namen in beiden Sprachen, Bilder, zugehörige Kataloggruppen) gehört zum
    künftigen Bildschirmcode; bis dahin stehen die Angaben im Prototyp und unter „Speisengruppen“.
  - Sushi-/Maki-Stückzahlen („7 Sushi + 3 Maki“) stehen nur im Prototyp, nicht in den Daten.
  - Mineralwasser-Flaschengröße bestätigen.
  - Nur anmerken, nicht ungefragt ändern: In `articles.ts` fehlt nach der Konstante `variantSingle` das Semikolon.
  - Anbindung an den Bildschirm; `tmp/preview-menu.js` bleibt bis dahin eigene Vorschaudaten.

## Buchhaltung (Frage des Nutzers, 14.09.2026, nicht entschieden)

- Ist-Stand: Steuerberater Mag. Helmut Allesch, Klagenfurt (Lohn mit RZL). 9 Lohnabrechnungen im Monat.
  Lohnjournal Mai 2026: brutto 21.564,98 €, Lohnsteuer 922,26 €, Dienstgeberbeitrag 591,48 €, Zuschlag
  59,15 €, Kommunalsteuer 646,95 €, ÖGK 7.481,72 €. Jahresabschlüsse der GmbH und Honorarnoten fehlen in der
  Ablage; der letzte abgelegte Abschluss ist 2017, noch vom Einzelunternehmen Li Vu
  (Einnahmen-Ausgaben-Rechnung, Umsatz ca. 464.000 €, davon 80 % Küche, Buchhaltungskosten damals 4.180 €).
- Motiv des Nutzers: Er ist neu in der GmbH, will die Arbeit des Steuerberaters prüfen und vermutet, dass
  bei den Steuern nichts gespart wird. Einordnung: Die monatliche Zahlung ans Finanzamt ist vor allem
  Umsatzsteuer (durchlaufend) und Lohnabgaben (Manifest, Punkt 7). Sparpotenzial prüft am schnellsten ein
  zweiter Steuerberater zum Festpreis anhand des letzten Jahresabschlusses.
- Rechtlich (Wissen, nicht im Web geprüft): Eine GmbH darf die Buchhaltung selbst führen, auch durch
  Angestellte; eine Steuerberaterpflicht gibt es nicht. Pflicht sind doppelte Buchführung, Jahresabschluss
  ans Firmenbuch binnen 9 Monaten, Steuererklärungen, monatliche Umsatzsteuer-Voranmeldung (UVA). Ein
  Wirtschaftsprüfer ist erst ab einer mittelgroßen GmbH Pflicht, hier nicht. Verantwortlich bleibt der
  Geschäftsführer. Einen Steuerberater kann man jederzeit fallweise dazuholen, z. B. bei einer Prüfung.
- Kosten beim Steuerberater (Richtwerte 2026, kein amtlicher Tarif): Buchhaltung 200 bis 310 € im Monat,
  Lohn 16 bis 40 € je Mitarbeiter und Monat, Jahresabschluss 1.600 bis 2.200 €, Stundensatz 120 bis 310 €;
  für Asia Wok grob 8.000 bis 13.000 € netto im Jahr.
- Selbst machen: Buchhaltungssoftware 10 bis 30 € im Monat (z. B. FreeFinance, ProSaldo, everbill),
  Lohnsoftware fast nur für Profis (RZL, BMD). ELDA und FinanzOnline sind gratis; Kollektivvertrag,
  Sozialversicherungswerte, Steuertabellen sind öffentlich. Aufwand danach ca. 4 bis 6 Stunden pro Woche (250 bis
  300 Stunden im Jahr, also rund 30 bis 45 € Ersparnis je Stunde, mit Haftung). Lernen nebenbei: etwa ein Jahr
  für laufende Buchhaltung und Lohn, 2 bis 3 Jahre bis zum Jahresabschluss. Ein WIFI-Kurs (ca. 3.350 €) ist nicht
  nötig: Lehrbuch plus KI, Uni-Vorlesungen zur Bilanzierung, für Lohn das jährlich neue Buch „Personalverrechnung
  in der Praxis“. KI hilft beim Lernen und Prüfen, ersetzt aber nicht das Wissen über jährliche Änderungen,
  Fristen, Meldungen.
- Empfehlung von Claude: erst WokFlow fertig bauen. Danach 6 Monate Schattenbuchhaltung: selbst buchen und
  jeden Monat mit der Saldenliste des Steuerberaters vergleichen. Stimmt es drei Monate hintereinander,
  laufende Buchhaltung übernehmen; Lohn und Jahresabschluss zuletzt, den ersten eigenen Abschluss vom
  Steuerberater gegenlesen lassen.
- Zugänge (Plan): Der Geschäftsführer holt die ID Austria, meldet damit die GmbH bei FinanzOnline an
  (Steuerkonto, Bescheide, UVAs, Lohnzettel) und im Unternehmensserviceportal USP (darüber WEBEKU der ÖGK
  mit Beitragskonto und ELDA) und legt den Nutzer als Benutzer an. Die Vollmacht des Steuerberaters bleibt
  daneben bestehen. FinanzOnline allein zeigt etwa ein Drittel; Buchungen, Saldenlisten, Lohnkonten kommen
  vom Steuerberater (Mail unter „Korrespondenz“). Online-Banking-Zugang von der Chefin.
- Wer Geschäftsführer ist, ist intern unklar. Deshalb ID Austria für Li Vu (Chefin) und Kim Hong Vu (Chef):
  Wer im Firmenbuch steht, kann die GmbH anmelden, beim anderen lehnt das System ab. Ein Firmenbuchauszug
  kostet auch für den Inhaber eine Gebühr (justizonline.gv.at). Gratis: Gründungsunterlagen und GISA. GISA
  (Auszug vom 04.07.2026 in der Ablage): Die Gewerbeberechtigung Gastgewerbe Restaurant am Messeplatz 1
  läuft seit 21.12.2013 auf Li Vu persönlich, nicht auf die GmbH; prüfen, ob die GmbH eine eigene hat.
- ID Austria in Klagenfurt (im Browser geprüft, beide sind österreichische Staatsbürger): Passamt des
  Magistrats, Kumpfgasse 20, Telefon +43 463 537-4010, ohne Termin Dienstag und Donnerstag 8 bis 15 Uhr,
  Freitag 8 bis 12 Uhr, Online-Termine nur Montag und Mittwoch (nächster freier war der 12.10.2026); ob die
  ID Austria wirklich ohne Termin geht, vorher anrufen. Alternativ nur mit Termin:
  Landespolizeidirektion, Buchengasse 3 (citizen.bmi.gv.at, Thema „ID Austria - Registrierung“), oder Finanzamt,
  Siriusstraße 11 (Telefon 050 233 700). Mitbringen: Reisepass, Handy mit ID-Austria-App; Vollfunktion verlangen;
  vorher die Online-Vorregistrierung auf id-austria.gv.at. Beide sind nicht technikaffin, der Nutzer begleitet sie
  und richtet die App mit ein. Wer schon eine Handy-Signatur hat, kann die Vollfunktion online freischalten.

## Korrespondenz (Arbeitsstand für neue Chats)

Was an wen ging und worauf gewartet wird. Kommt eine Antwort, hier eintragen und die Folgen unter
„Entscheidungen“ nachtragen. Stil des Nutzers für Mails: keine Gedankenstriche, keine Einleitung, kein
Projektname nach außen.

### Nexi (serviceDE@nexigroup.com, Kundennummer 5905840, Vertragspartner-Nr. 156469572)

- **1. SoftPOS und Kassenanbindung** (laut Nutzer am 14.09.2026 verschickt, Antwort offen; Telefonat vom
  15.09.2026 im Manifest, Punkt 10). Als Bestandskunde mit einem Terminal Mobile Premium und rund 50.000 €
  Kartenumsatz im Monat um schriftliche Antwort per E-Mail gebeten:
  1. Nexi SoftPOS (Tap to Pay on Android) auf einem zusätzlichen Android-Handy als Zusatzvereinbarung zum
     bestehenden Vertrag, zu den bestehenden Konditionen (Disagio je Kartenart wie bisher, gleiche Abrechnung);
     Angebot mit allen Kosten und Laufzeit.
  2. Freischaltung der Kassenanbindung (ZVT über WLAN) am Terminal Mobile Premium, damit die Kasse den Betrag
     übergibt; Kosten?
  3. Ist die App-zu-App-Schnittstelle für SoftPOS (Betragsübergabe aus der Kassen-App, Entwicklerportal
     developer.nexigroup.com) in Österreich verfügbar, und was braucht es für den Zugang?
- **2. Kopie des Vertrags:** am 14.09.2026 angefragt (Kartenakzeptanzvertrag samt gültigem Konditionenblatt mit
  Disagio je Kartenart, Mindestentgelt, Monatspauschalen, Terminalmiete, Laufzeit, Kündigungsfrist, allen
  Änderungen). Die Vertragskopie kam am 15.09.2026, ausgewertet unter „Entscheidungen“, „Nexi-Vertragskopie“;
  darin steht das Disagio nur bis 11.08.2024, deshalb hat der Nutzer das aktuelle Konditionenblatt am 15.09.2026
  nachgefordert. Antwort offen.

Beim Lesen der Antwort prüfen: SoftPOS zum bestehenden Disagio oder zum Listenpreis 1 %? Zusatzvereinbarung
oder neuer Vertrag mit Laufzeit? Nichts unterschreiben, was nicht klar besser ist. Falls offen bleibt,
nachfragen: Fragt das Terminal bzw. die App das Trinkgeld beim Gast ab und meldet Betrag, Trinkgeld und
Transaktionsnummer an die Kasse zurück? Gibt es ohne Kopplung einen Abruf der Tageszahlungen mit einer
Referenz, die sich einer Rechnung zuordnen lässt? Kostet die Freischaltung etwas?

### Steuerberater (Mag. Helmut Allesch, Klagenfurt)

**3. Fragen zur Kasse** (Entwurf vom 14.09.2026, auf das Nötigste gekürzt, Versand durch den Nutzer)

```text
Betreff: Fragen zur Kasse

Sehr geehrte/r [Name],

wir stellen unsere Kasse um und hätten dazu vier Fragen zur Buchhaltung. Kurze Antworten reichen.

1. Unterlagen
   Heute bringt Frau [Name] monatlich einen Stapel: pro Tag Finanz- und Warengruppenbericht als Bon,
   Handzettel, Nexi-Tagesabschluss vom Terminal, Rechnungen mit Nexi-Händlerbelegen. Künftig kann die
   Kasse Ihnen monatlich eine Auswertung als PDF und Datei mailen (Umsatz je Warengruppe und Steuersatz,
   je Zahlart). Was davon brauchen Sie dann überhaupt noch, was auf Papier, und an welche E-Mail-Adresse?
   Brauchen Sie die Nexi-Unterlagen künftig noch, und wenn ja, welche: die monatliche Nexi-Abrechnung
   aus dem Portal, die täglichen Terminal-Zettel oder die Händlerbelege?

2. Kassabuch und Wechselgeld
   Wir rechnen täglich Umsatz minus Kartenzahlungen minus bar bezahlte Einkäufe, der Rest geht auf die
   Bank. Die Kasse wird Barausgaben und Bankeinzahlung pro Tag festhalten. Reicht das als Kassabuch?
   Wir halten außerdem einen festen Wechselgeldbestand außerhalb der Kasse. Gehört der buchhalterisch
   zum Kassenstand der GmbH?

3. Trinkgeld
   Wie läuft Trinkgeld heute bei uns in der Buchhaltung? Künftig landet Karten-Trinkgeld auf dem
   Firmenkonto und wird an die Angestellten ausgezahlt. Wie soll die Kasse das festhalten, damit es für
   die Angestellten steuerfrei bleibt?

4. Gutscheine
   Geldgutscheine verkaufen wir, Leistungsgutscheine wie „Buffet für 2“ verschenken wir, dazu nehmen wir
   Fremdgutscheine (Edenred, Nexi) an. Wie sollen wir die drei Fälle in der Kasse buchen?

Vielen Dank und freundliche Grüße
[Name]
ASIA WOK Restaurant GmbH
```

**4. Unterlagen der GmbH** (Entwurf vom 14.09.2026, bewusst ohne Termin, Versand durch den Nutzer)

```text
Betreff: Unterlagen der GmbH

Sehr geehrter Herr Mag. Allesch,

ich bin seit Kurzem in der ASIA WOK Restaurant GmbH für die Verwaltung zuständig und lege ein
vollständiges digitales Archiv unserer Unterlagen an. Dafür bitte ich Sie um folgende Dokumente als PDF:

1. Alle Jahresabschlüsse und Steuerbescheide der GmbH seit Gründung
2. Saldenlisten, Kontoblätter und UVA-Berechnungen der letzten 24 Monate
3. Lohnkonten aller Dienstnehmer für 2025 und 2026
4. Kopie unserer Vollmacht, Honorarvereinbarung und Honorarnoten der letzten zwölf Monate

Künftig bitte ich um Saldenliste, Kontoblätter und UVA jeweils nach Monatsende.

Vielen Dank und freundliche Grüße
[Name]
ASIA WOK Restaurant GmbH
```

Später an den Steuerberater, bewusst noch nicht gefragt:

- Zahlart nach dem Rechnungsdruck ohne Storno ändern, mit Protokoll (laut Recherche zulässig).
- Bezahlte falsche Rechnung künftig mit Stornobeleg, statt Geld privat zurückzugeben.
- Löst ein verschenktes Buffet beim Einlösen Steuer aus (Werbegeschenk)? Was passiert mit den alten, per
  Hand geführten Gutscheinen?
- Umstieg: Was braucht er, und ist Monats- oder Jahresende der bessere Zeitpunkt?
- RKSV-Journal: Reicht ein monatlicher, nie überschriebener Export auf USB-SSD und in die Cloud?

### Behörden

- ID Austria für Li Vu und Kim Hong Vu: beim Passamt anrufen, dann gemeinsam hingehen (Einzelheiten unter
  „Buchhaltung“). Danach GmbH bei FinanzOnline und USP anmelden, Nutzer als Benutzer anlegen.

## RKSV

Wissen und offene Fragen der RKSV-Session (seit 13.09.2026). Fertige Entscheidungen stehen unter
„Entscheidungen“.

- **Grundlagen:** RKSV heißt Registrierkassensicherheitsverordnung. Jeder Beleg bekommt eine elektronische
  Signatur, die an der vorherigen hängt wie an einer Kette, und einen QR-Code. Startbeleg (0 €) bei
  Inbetriebnahme, Anmeldung bei FinanzOnline, Prüfung mit der App des Finanzministeriums. Monatsbeleg (0 €)
  jeden Monat, der vom Dezember ist der Jahresbeleg und wird ebenfalls mit der App geprüft. Schlussbeleg
  beim Stilllegen, danach abmelden. DEP (Datenerfassungsprotokoll): Liste aller Belege, 7 Jahre aufbewahren.
- **Kartentausch bis Mai 2027** (BMF-Seite, gelesen 13.09.2026): Karten mit Chip ACOS-ID 2.1 gelten seit
  07.06.2025 nicht mehr (Sicherheitslücke „EUCLeak“), CardOS 5.3 spätestens ab Mai 2027. Neue
  A-Trust-Karte mit Chip ACOS-ID 4.1 ca. 40 € inkl. MwSt., Zertifikat 5 Jahre, am 13.09.2026 im Shop nicht
  verfügbar; Lesegerät ca. 26 €. TOUCHIT kennt nur ältere Kartentypen (`GetCardType` in
  `TouchitTrustLibrary`), die neue Karte läuft dort vermutlich nicht. Welcher Chip heute steckt, will der
  Nutzer nicht prüfen. WokFlow sollte also bis Mai 2027 laufen.
- **Anbieter** (netto, 13.09.2026): Zertifikate stellen nur A-Trust, GlobalTrust und PrimeSign aus. Karte mit
  Lesegerät für 5 Jahre: A-Trust ca. 55 €, PrimeSign 60 €, GlobalTrust 149 € (mit Tausch bei Defekt). Online
  36 bis 359 € im Jahr, alle brauchen Internet. A-Trust-Beispielcode auf GitHub (`A-Trust/RKSV`, C#, Java,
  C++, für ACOS, ACOS-ID, CardOS 5.3 und die Online-Schnittstelle); ob ACOS-ID 4.1 abgedeckt ist, offen.
  Unter Linux läuft die Karte über PC/SC (die Linux-Kasse QRK kann es), Node braucht dafür eine
  Zusatzbibliothek. TOUCHIT nutzt die Windows-Bibliothek `asignp11.dll`.
- **Aufwand** (Schätzung von Claude): Verschieden ist nur das Holen der Signatur, online 1 bis 2
  Arbeitstage, mit Karte 3 bis 6.
- **Ausfall:** Kann nicht signiert werden, gibt die Kasse Belege mit „Sicherheitseinrichtung ausgefallen“
  aus, danach ein Sammelbeleg. Dauert der Ausfall länger als 48 Stunden, binnen einer Woche über
  FinanzOnline melden.
- **Gutscheine** (mit dem Steuerberater prüfen): Geldgutscheine sind Mehrzweckgutscheine, Umsatzsteuer erst
  beim Einlösen, beim Verkauf mit 0 % („Betrag-Satz-Null“). Leistungsgutscheine wären Einzweckgutscheine mit
  Steuer schon beim Verkauf; wie die Einlösung dann signiert wird, ist nicht eindeutig (BMF-Mustercode,
  GitHub-Issue 684). Der Betrieb verschenkt sie aber, deshalb beim Einlösen Betrag 0. Fremdgutscheine
  (Edenred, Nexi-Papier) sind nur Zahlungsmittel, normaler Umsatz. TOUCHIT signiert die Einlösung verkaufter
  Gutscheine mit 0 %, das weicht von heutigen Hinweisen ab (LBG, ready2order).
- **Trainingsmodus und mehrere Kassen:** Vor der Anmeldung darf getestet werden. Danach zählen Übungsbelege
  als Training (signiert, im DEP, ohne Umsatzzähler, Wert „TRA“, Aufdruck „Trainingsmodus“). Mehrere Kassen
  im Betrieb sind erlaubt, jede echte Rechnung nur in einer.
- **Storno:** Vor dem Beleg (offener Tisch) kein RKSV-Thema. Einen ausgestellten Beleg darf man nicht
  löschen, dafür gibt es einen signierten Stornobeleg (Wert „STO“) und bei Bedarf eine neue Rechnung. Ein
  Grund ist nicht vorgeschrieben, viele Stornos ohne Grund fallen bei Prüfungen aber auf und können zu
  Hinzuschätzungen führen; empfohlen ist eine kurze Auswahlliste.
- **Teilrechnungen:** Jede getrennt kassierte Teilrechnung ist ein eigener Beleg. Eine Tischrechnung darf
  auch zeitnah von mehreren Gästen in Teilen bezahlt werden, ohne Beleg pro Gast.
- **Zahlart:** kein Pflichtbestandteil des Belegs (§ 132a Abs. 3 BAO, § 11 RKSV). Änderungen nach dem Druck
  mit Protokoll sind zulässig, sofern Kartenumsätze erkennbar sind (FAQ Arbeitskreis Kassensoftware 2.4.15).
- **Journal sichern** (§ 7 RKSV): mindestens vierteljährlich unveränderbar auf einem externen Medium, 7 Jahre
  aufbewahren, jederzeit im vorgeschriebenen Format exportierbar. Laufende und stündliche Kopien werden
  überschrieben und zählen vermutlich nicht, deshalb monatlich ein DEP-Export als eigene Datei auf USB-SSD
  und in die Cloud (mit dem Steuerberater prüfen). Prüfwerkzeug des Finanzministeriums:
  `TOUCHIT/TOUCHIT_TOOLS/SOFTWARE/RKSV/DEP_Pruefung` (Java-Programm, Java ist nicht installiert).
- **Offen:** Monats- und Jahresbelege im Detail. A-Trust-Karte ACOS-ID 4.1 mit Lesegerät früh unter Linux
  testen und den Beispielcode prüfen. Zahlart ohne Beleg bestätigen. Vorschlag von Claude: ein zweites
  Lesegerät als Ersatz. Den alten AES-Schlüssel aufbewahren (siehe „Sicherheit“).

## Sicherheit

- Im Ordner `TOUCHIT/` stehen Zugangsdaten im Klartext: SQL-Admin-Passwort, RKSV-Karten-PIN und
  AES-Schlüssel, FTP-, Mail- und Kamerapasswörter, Lizenzschlüssel. Unter anderem in
  `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`, `TOUCHIT/TOUCHIT_DIENSTE/RESOURCEN/INI/touchit_dienste.ini`
  und `TOUCHIT/TOUCHIT_PHONE/Web.config`. Die Werte nicht in andere Dateien übernehmen.
- **Diesen Projektordner nie in ein öffentliches Repository oder ins Internet stellen.** Git nur im
  Ordner `WokFlow/`, und der enthält nur neuen Code. `TOUCHIT/` und `Nexi/` kommen nie in ein
  Repository.
- Den AES-Schlüssel aufbewahren. Er wird gebraucht, damit das alte RKSV-Journal prüfbar bleibt.
- Programme in `TOUCHIT/DECOMPILED/recovered/` sind reine Analysekopien: **nie starten.**
- An der echten Kasse keine Test-Verkäufe, Stornos, Zahlungen oder Fiskalbelege auslösen. Kasse,
  Handys und Drucker im Restaurant nur nach Rückfrage beim Nutzer ansprechen.

## Das alte System

- „TOUCHIT“ v4.72 von Kortschak-Datensysteme (Österreich): Visual Basic .NET, WinForms, .NET 4.5.1, eine EXE
  mit 139 MB, nur Binärdateien. Datenbank Microsoft SQL Server `TOUCHIT_FILIALE_1` (ca. 155 Tabellen) unter
  `C:\KKK-Corporation\DATEN\Filiale_1\`. Die Handys öffnen ein ASP.NET-Webprogramm (2008, .NET 3.5,
  21 Seiten aus `TOUCHIT/TOUCHIT_PHONE/_www/`) im Browser, eine Android-App gibt es nicht. Die Lizenz hängt an
  der CPU-Kennung, ein Ersatz-PC bräuchte vermutlich eine neue. RKSV mit A-Trust-Karte, KasseID 1, ein
  Kartenleser aktiv.
- Genutzt (laut `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`): 1 PC (nicht 2, der Druckmanager führt denselben
  PC zweimal), 4 Handys, Tischplan, Splitten, Transfer, Storno mit Grund, Zwischenrechnung, offene Kredite,
  gemischte Zahlung, Tagesabschluss, Berichte, Umschaltung Chinesisch/Europäisch. Ausgeschaltet: Hotel,
  Events, Waage, Kameras, Schankanlage, Bonuskarten, Zeiterfassung, Filialen, Kiosk, Kreditkartenmodul,
  Drehkreuz, Webshop.
- Alles läuft auf dem einen PC, auch der SQL Server: das Kassenprogramm mit Druckmanager (druckt auch die
  Bons der Handys), das Handy-Webprogramm im Windows-Webserver IIS (schreibt `MTISCH`, `LOG_BON` und
  `MTISCHE`, druckt nie selbst, speichert Rechnungen ohne Transaktion) und das Hilfsprogramm
  `TOUCHIT_DIENSTE` für zeitgesteuerte Backups (in unserer Kopie ausgeschaltet, letzte Backups 2019). Ohne
  den PC geht auf den Handys nichts, es gibt keinen Notbetrieb.
- Drucker: In `touchit.ini` stehen zwei Epson TM-T88 (Rechnung an COM2, Küche im LAN 192.168.1.61:9100) und
  eine ungenutzte TM-P20-Vorgabe. Heute läuft nur der Zentraldrucker an der Theke, laut Video ein Metapace
  T-3II (ESC/POS, Epson-kompatibel, Treiber in `TOUCHIT/TOUCHIT_TOOLS/TREIBER/Diverses/Metapace/`); der
  Küchendrucker ist kaputt.

## Ordner

- `WokFlow/`: das neue System, eigenes Git-Repo (Branch `main`, privat auf GitHub als `UnathiCodex/WokFlow`); darin
  liegt auch diese `CLAUDE.md`.
- `WokFlow-before-server-api-20260917-161729.zip` im Hauptordner: dem Namen nach eine Sicherung vom 17.09.2026 vor
  dem Bau der Server-Schnittstelle.
- Die 11 monatlichen Nexi-Abrechnungen (Oktober 2025 bis August 2026) und die Terminal-Rechnungen (Juni 2025 bis
  August 2026) liegen in der Geschäftsablage des Nutzers:
  `M:\NomWorkspace\NomBusinessworkings\AsiaWokRestaurantGmbH\Kartenzahlung\<Jahr>\` als
  `AsiaWok_Nexi_Abrechnung_YYYYMM.pdf` und `AsiaWok_Nexi_Rechnung_YYYYMM.pdf`. Auswertung unter „Entscheidungen“
  („Nexi-Zahlen“). Geschäftsdaten, nie in ein Repository. Den früheren Ordner `Nexi/` im Hauptordner gibt es nicht
  mehr.
- `TOUCHIT/`: alles zum Altsystem.
  - **Original-Unterordner, nicht verändern, nicht löschen:** `BACKUP`, `DATEN`, `TOUCHIT`,
    `TOUCHIT_DIENSTE`, `TOUCHIT_KONFIGURATION`, `TOUCHIT_PHONE`, `TOUCHIT_TOOLS`, `TOUCHIT_UPDATE`, `UPDATE`.
    - `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`: Live-Konfiguration.
    - `TOUCHIT/BACKUP/Filiale1 (local)/`: Datenbank-Backups. Das neueste ist vom 18.07.2024.
    - `TOUCHIT/TOUCHIT_PHONE/`: Kellner-Handy-Programm.
    - `TOUCHIT/TOUCHIT_TOOLS/`: Werkzeugkiste des Herstellers. Ein paar eigene Hilfsprogramme (Backup,
      Kartenleser, IP-Scanner, NFC-Leser, RKSV-Tool), die sind dekompiliert. Sonst Software anderer
      Firmen, nicht dekompiliert: Treiber (FTDI, Epson, Metapace, Intel, Microsoft), A-Trust-Installer, Fernwartung
      (TeamViewer, UltraVNC), Synology, Adobe Reader, Datenbank-Reparatur (Stellar Phoenix).
    - `TOUCHIT/TOUCHIT_TOOLS/SOFTWARE/RKSV/DEP_Pruefung`: Prüfwerkzeug des Finanzministeriums.
  - `TOUCHIT/DECOMPILED/`: unsere **einzige Dekompilierung**, vollständig und geprüft. Einstieg
    `README.md` und `MODULE_INDEX.csv`.
    - `sources/`: Code aller 119 .NET-Dateien, davon 21 vom Hersteller, der Rest Fremdbibliotheken.
      Hauptprogramm in `sources/TOUCHIT__c409d7140c/` (samt 33 Berichtsvorlagen `*.rdlc`),
      Handy-Programm in `sources/TOUCHIT-Phone__712a7e6eaf/`.
    - `native_sources/`: C-Pseudocode der nativen Dateien.
    - `recovered/`: entschlüsselte Programmkopien, **nie starten**.
    - `tools/`: Werkzeuge der Dekompilierung, 2,8 GB. Löschen nur unter der Bedingung im Abschnitt
      „Aktueller Stand“.
  - `TOUCHIT/PERFORMANCE_AUDIT/`: unsere SQL-Aufrufanalyse und der Datenbank-Modelltest. Einstieg
    `README.md` und `Sandbox/ERGEBNIS.md`.

Pfade in den Berichten von `DECOMPILED` und `PERFORMANCE_AUDIT` stammen von vor dem Umzug, als beide
direkt im Hauptordner lagen: `DECOMPILED/...` heißt heute `TOUCHIT/DECOMPILED/...`. In älteren
Protokollen kann noch der frühere Name `DECOMPILED_VERIFIED` stehen.
Die Zahlen in der Analyse unten wurden an der ersten, inzwischen gelöschten Dekompilierung gezählt
(gleiche EXE, andere Aufteilung in Dateien).

Der Nutzer entwickelt in IntelliJ IDEA 2026.2 (Ordner `.idea`, per `.gitignore` ausgeschlossen), auf diesem
PC und auf einem Laptop. Den Workspace gleicht Syncthing zwischen den Geräten ab (Wurzel `M:/NomWorkspace/`,
Ausnahmen in `M:/NomWorkspace/.stignoreglobal`). Dort sind `**/node_modules` und `**/.idea` für alle Projekte
ausgenommen (vom Nutzer eingetragen, 14.09.2026). Ältere Konfliktdateien liegen noch in `WokFlow/.idea/`. Weil
`node_modules` nicht synchronisiert wird, braucht jeder Rechner einmal `npm install` im Ordner `WokFlow`.

**IntelliJ und die Node-Typen (geklärt 14.09.2026, im IntelliJ-Log geprüft):** Hat ein Projekt kein eigenes
TypeScript, nimmt IntelliJ sein mitgeliefertes und findet die Node-Typen ohne `tsconfig.json` nicht (rote Zeilen bei
`node:http`); deshalb steht `typescript` 7.0.2 in den devDependencies. Es gibt zwei getrennte Helfer: Hover-Text,
Strg+Klick, Fehler im Code kommen vom TypeScript-7-Dienst, der die Node-Typen je Computer selbst beschafft
(`%LOCALAPPDATA%\Microsoft\TypeScript\7.0`), deshalb kann sich der Laptop anders verhalten als der PC. Links in
Kommentaren prüft IntelliJ selbst und braucht dafür `@types/node` in `node_modules`.

Auf dem PC installiert (Stand 14.09.2026): Node.js 26, Git, ffmpeg 8 (winget), Python 3.14 als Nutzer-Installation
unter `AppData\Local\Python` mit `faster-whisper`; Whisper-Modelle tiny bis large-v3 liegen im Hugging-Face-Cache des
Nutzers. Damit lassen sich Sprachnachrichten und Videos in Text umwandeln: mit ffmpeg eine 16-kHz-Mono-WAV ziehen,
dann `WhisperModel("large-v3", device="cpu", compute_type="int8")`, 60 s Ton dauern ca. 35 s. Kein SQL Server. .NET,
Java, Ghidra liegen nur als Werkzeuge in `TOUCHIT/DECOMPILED/tools/`, nicht installiert. Der Hauptordner ist kein
Git-Repository.

## Was schon gemacht wurde

- 08. und 09.09.2026: Scan, Analyse (Ergebnis unter „Analyse des alten Systems“), Komplett-Dekompilierung in
  `TOUCHIT/DECOMPILED/`: alle 119 .NET-Dateien als C#, auch die 17 mit ConfuserEx geschützten (offline entschlüsselt
  mit `scripts/recover_antitamper.py`, ohne die Programme zu starten; Reihenfolge der Skripte in `README.md`).
  230.359 Methoden ohne Syntaxfehler, dazu 12 native Dateien per Ghidra als C-Pseudocode. Alle 339 Originaldateien
  sind unverändert (SHA-256 geprüft). Nur zum Verstehen, nichts nachgebaut oder mit der echten Kasse verglichen.
  Zwei ältere Dekompilierungen (`DECOMPILED`, `DECOMPILED_KLARTEXT`) liegen im Papierkorb, bitte nicht
  wiederherstellen.
- SQL-Aufrufanalyse und Modelltest in `TOUCHIT/PERFORMANCE_AUDIT/`. Echte Laufzeiten der Kasse gibt es nicht, der
  Messplan mit 12 Abläufen steht dort.
- 13. bis 18.09.2026: Planung von WokFlow (Manifest, Entscheidungen), Tagesabschluss der Chefin per Foto und Video
  verstanden, Nexi-Abrechnungen ausgewertet und in die Geschäftsablage sortiert, Bildschirmentwurf, Mails an Nexi
  und Steuerberater, Artikelkatalog, Modul `tables`. Den Code-Verlauf zeigt Git in `WokFlow/`.

## Analyse des alten Systems

TOUCHIT ist 20- bis 30-mal größer als nötig; ein sauberes System mit diesem Umfang hätte 30.000 bis 60.000
Zeilen. Über 15 Jahre gewachsen, ein einziger Entwickler, Copy-Paste, keine Tests. Die 13 Hauptprobleme,
schlimmste zuerst (Zahlen aus der ersten Dekompilierung):

1. Jede Abfrage läuft doppelt (`Module_Sql.Execute`: erst NonQuery, dann Reader, 4.736 Stellen).
2. 1.398 Schleifen mit je einer Datenbankabfrage pro Durchlauf.
3. SQL per Textverkettung: 7.711 Befehle, nur 31 mit Parametern (Angriffsgefahr, Komma-Fehler).
4. 48 globale Datenbankverbindungen mit globalen Readern (`Execute2` bis `Execute1000`).
5. Nachfragen statt Ereignisse: ca. 370 Timer (66 im 1-ms-Takt), 652 `DoEvents`, 283 `Thread.Sleep`.
6. Riesige Dateien: `Form_Bonieren_0.cs` hat 118.955 Zeilen, 66 Funktionen haben über 1.000 Zeilen.
7. Kopieren statt Wiederverwenden: 385 Gruppen gleicher Methoden mit 53.235 Zeilen.
8. Verschluckte Fehler: 378 leere Fehlerbehandlungen, 541 `goto`, 773 Meldungsfenster.
9. Lockere Typen: 28.612 automatische Umwandlungen, 16.765 Textvergleiche für Entscheidungen.
10. Fest verdrahtet: 131-mal `C:\KKK-Corporation`, Passwörter im Klartext, Lizenz an der CPU-Kennung.
11. Drucken steckt im Bildschirmcode: 15.230 rohe Druckerbefehle.
12. Kasse und Handy-Programm bonieren getrennt, jede Änderung musste doppelt gemacht werden.
13. Berichte im Bildschirmcode: der Finanzbericht als eine Methode mit 2.477 Zeilen, dazu eine Kopie.

Modelltest mit künstlichen Daten (keine Messung an der Kasse): Die Handy-Tischübersicht mit 30 offenen
Tischen braucht 182 Abfragen, gebündelt reicht eine (bei 5 ms je Abfrage ca. 1 s statt 6 ms). Doppelte
Schreibbefehle könnten Zähler doppelt erhöhen, ein Beweis für doppelt gebuchte Verkäufe ist das nicht.

Brauchbares Wissen (nur die Idee, nie Code): Datenmodell (`ARTIKEL`, `WGR`, `TASTENPLAN`, `OBJEKTE_TISCHE`,
`MTISCHE`, `LOG_RECHNUNG`, `LOG_BON`, `LOG_RECHNUNG_ZAHLART`, `LOG_STORNOS`, `ZUGRIFF`, chinesischer Name in
`Bezeichnung_2`), der RKSV-Ablauf, ESC/POS-Druck und die 33 Berichtsvorlagen als Liste gebrauchter Zahlen.

## Die 10 Regeln fürs neue System

1. Eine kleine Datenbankschicht. Jede Abfrage mit Parametern, jede Abfrage läuft genau einmal.
2. Ein Bildschirm lädt mit ein oder zwei Abfragen, nie eine Abfrage pro Zeile.
3. Keine Timer, die ständig nachfragen. Der Server schickt Ereignisse (neuer Druckauftrag, Tisch
   geändert) an die Bildschirme.
4. Drucken ist ein eigener kleiner Dienst mit Warteschlange, Wiederholungen und Protokoll.
   Bildschirme sprechen nie direkt mit Druckern.
5. Eine Codebasis für Kassen-PC und Kellner-Handys (Web-App).
6. Geldberechnung mit Dinero.js 2, Speicherung in ganzen Cent. Text nur für die Ausgabe.
   Datumsangaben sind echte Datumswerte.
7. Jeder Fehler wird mit Zeit, Station und Benutzer protokolliert. Keine leeren Fehlerbehandlungen.
8. Bildschirme bleiben klein. Eine Funktion, die länger als eine Bildschirmseite ist, wird aufgeteilt.
9. RKSV-Code hat automatische Tests und wird vor dem Start mit dem Prüfwerkzeug des Ministeriums geprüft.
10. Konfiguration und Geheimnisse liegen an einem Ort, nicht im Code.
