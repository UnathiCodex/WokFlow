# Asia Wok Kassensystem: Projektinfos

Stand: 16.09.2026. Die frühere `HANDOFF.md` und `ANALYSE.md` sind hier eingearbeitet und gelöscht.

**Alle Meta-Infos stehen nur in dieser Datei.** Keine Handoff- oder Memory-Dateien anlegen, nichts
verteilen. Neue Erkenntnisse und den aktuellen Stand hier nachtragen.

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
- **Schon erklärt, darauf aufbauen, nicht alles neu erklären:**
  - Node und Server (zwei Server-Chats, beendet): Node als Laufzeit, npm und devDependencies, Module und Imports,
    HTTP-Kopf und Inhalt, `setHeader`/`end`/`write`, Ports und localhost, UTF-8, Vererbung, IntelliJs getrennte
    Prüfungen für Code und Kommentar-Links, `request.url` enthält nur den Pfad, `readFileSync`, relative Pfade ab
    dem Startordner, `import.meta.dirname`.
  - TypeScript (Katalog-Chat, beendet 16.09.2026): Typalias `type`, Objekttyp, Union-Typ, Index-Signatur,
    `Record`, `Map`, `interface` (braucht der Nutzer nicht, WokFlow nutzt `type`), `import type`, `typeof` (liefert
    einen festen String, nur für einfache Werte), `===`, Narrowing (`Array.isArray` engt ein, `Number.isInteger`
    nicht), Template Literals, Spread `...`, Kurzschreibweise `{ tea }`, Hoisting, `const`/`let`, Semikolons
    (optional, im Code gesetzt), Komma nach dem letzten Eintrag, Shadowing, JSDoc-Tags, `//#region`, Array statt
    „Liste“ (`Article[]`), Dinero-Optionen `amount`/`currency`/`scale`, Typdateien per Strg+Klick,
    Parameterhilfe Strg+P.
  - Tests mit `node:test` (Modul-Chat `tables`, 17.09.2026): `test(name, lambda)` statt `@Test`, fehlschlagen heißt
    werfen; `?` am Parameter heißt beim eigenen Aufruf weglassbar; `TestFn` ist ein `type` für eine Funktionsform wie
    `work: () => void` in `transaction`, keine Klasse; `t: TestContext` ist das Objekt, das Node je Test übergibt, wie
    `order` bei `forEach`, `t.name` ist der Text aus dem ersten Argument; übergebene Lambdas dürfen weniger Parameter
    haben, nicht mehr (in Java nicht erlaubt); der Rückgabetyp muss passen (`void` oder `Promise<void>`); `undefined`
    gegen `null`; die vier Überladungen von `test`; `done` (Node wartet auf `done()`, `done(error)` lässt fehlschlagen,
    `setTimeout` als Grund); Funktionen sind in TypeScript Werte, in Java Objekte eines Interfaces; `interface` und
    `type` verschwinden beim Ausführen, keine Klasse, kein `new`; `any` gegen `unknown`, `strict` verbietet nur
    ungeschriebenes `any`; Lambda-Parameter bekommen ihren Typ vom Zieltyp (wie `forEach` in Java); `deepEqual` mit und
    ohne `/strict` (Text gegen Zahl, `NaN`); `new DatabaseSync(":memory:")`; `import * as`; `databaseTest`
    (`:memory:` baut die Datenbank im Arbeitsspeicher, jeder Aufruf eine neue leere, deshalb sieht kein Test die Zeilen
    eines anderen); `run` gegen `get` und `all` (`run` heißt „ausführen, keine Zeilen zurück, nur der Bericht
    `{ changes, lastInsertRowid }`“, nicht „ändert die Datenbank“; `tableClose` liest daraus `changes`); in SQLite ist
    jede einzelne Anweisung schon eine Transaktion, deshalb braucht `tableClose` keine. Noch offen: `Promise`,
    `throws`, `node --test`, `ordersRead`.
  - Git: siehe „Aktueller Stand“.
- Höchstens drei bis vier Sätze, ein Gedanke, höchstens eine Frage; mehr nur auf Wunsch. Keine unerklärten
  Fachwörter.
- **Viel kürzer, in Schritten (Nutzer, 17.09.2026: „Your explanation is still too long“):** Eine Erklärung ist eine
  Folge kleiner Schritte, je Antwort genau einer: ein winziges Beispiel, ein bis zwei Sätze, dann „Questions?“ und
  warten. Nie mehrere Teile eines Ausdrucks in einer Antwort erklären. Verstoß: `flatMap` mit Codeblock, vier
  Stichpunkten zu `Object.values`, `flat`, `flatMap`, `...` und einem Java-Absatz auf einmal. Richtig: Schritt 1 nur
  `flat` an zwei Arrays, Schritt 2 `flatMap`, Schritt 3 `Object.values`, Schritt 4 alles zusammen.
- **„Überall“ heißt im ganzen Projekt (Nutzer, 17.09.2026):** Bei „everywhere“ alle Dateien unter `src/` und `test/`
  durchsuchen, nicht nur die Datei, um die es gerade ging. Fehler: Kommentar zu `variantId` nur in `orders.ts` und
  `orders.test.ts` geändert, `menu.ts` ausgelassen.
- **Ein Wort, eine Bedeutung (16.09.2026):** „order“ hieß im ersten Bau der offene Vorgang, im Prototyp die Position;
  der Nutzer verstand den Code deshalb nicht. „table“ ist im Code der Tisch; Datenbanktabellen im Chat immer „database
  table“ nennen, bei Verwechslung auf Deutsch trennen, Tisch gegen Tabelle (er hielt `createOrdersTable` für einen
  Tisch und benannte die Funktion danach in `orderbookCreate` um).
- **Eine Frage oder ein Wunsch ist kein Auftrag (Nutzer, 16.09.2026):** In Dateien nur auf ausdrückliche Anweisung
  schreiben („patch“, „mach das“, „rename …“). Fragt der Nutzer, wo etwas ist oder woher etwas kommt, oder sagt er,
  wie er etwas haben will („I want to do it above …“), nur antworten und den Code im Chat zeigen; er baut solche
  Stellen oft selbst. Neue Dateien nur nach ausdrücklichem Ja. Fehler am 16.09.2026: `.editorconfig` ungefragt
  angelegt, Limonaden ungefragt umgebaut.
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
  auskommentierten Reste. Bei einem Konflikt gewinnt Lesbarkeit, sonst Kürze.
- **Ganze Module statt Zeile für Zeile (Entscheidung des Nutzers, 16.09.2026 abends, ersetzt die Regel „eine Zeile
  je Schritt“):** Claude baut ein Modul komplett samt Tests, der Nutzer liest es danach und fragt, was er nicht
  erklären kann (Warum-Liste). Ablauf, Schutz des Bestehenden, Tiefe der Fragen unter „Nächster Chat: Modul `tables`“.
  Weiter gültig: Änderungen an bestehenden Dateien zuerst als Vorher/Nachher im Chat zeigen (Nutzer: „Show me the
  code here first, if I understand it, then you patch it“). Lern- und Beispielcode nur im Chat, keine Beispieldateien
  oder Beispielordner (14.09.2026).
- Befehle wie `npm install`, `npm start`, Tests und Serverstart zuerst erklären und dem Nutzer geben;
  nur auf ausdrücklichen Auftrag ausführen. Er möchte diese Schritte selbst lernen. Zur eigenen Kontrolle nach
  Änderungen liefen am 16.09.2026 ohne Einwand eine Typprüfung und ein Ladeversuch, beide im Ordner `WokFlow`:
  `node_modules/.bin/tsc.cmd --noEmit --allowImportingTsExtensions --module nodenext --target esnext --types node src/server/index.ts test/orders.test.ts`
  (die Optionen braucht es ohne `tsconfig.json`, seit TypeScript 6 ist `types` standardmäßig leer) und
  `node -e 'import("./src/catalog/menu.ts").then(m => console.log(Object.keys(m.menu)))'`.
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
  Ausprobieren, Rückbau auf Wunsch): `orderbookCreate`, `ordersSend`, `orderRemove`, `ordersRead`, `tableClose`,
  `databaseOpen`, im Test `databaseTest` (vom Nutzer am 17.09.2026 aus `databaseFresh` umbenannt), `menuFind`,
  `orderChosen`, `orderSaved`, Typ `OrderNew`. Unüblich in TypeScript, schadet aber nicht; Namen aus
  Bibliotheken bleiben, wie sie sind (`createServer` und `readFileSync`).
- **Objekt oder Kennung (Nutzer, 17.09.2026, in `orders`):** Ist das Objekt gemeint, heißt es `article` bzw.
  `variant`; ist der deutsche Name als Kennung gemeint, `articleId` bzw. `variantId`. In der Datenbanktabelle
  `article_id` und `variant_id` wie `table_id`; `ordersRead` benennt sie mit `AS articleId` und `AS variantId` um.
- **camelCase in TypeScript, Unterstrich nur in der Datenbank (Nutzer, 17.09.2026: „you should be consistent“):** im
  Code `tableId`, nie `table_id`; Spalten in SQL `table_id`, weil SQLite Groß- und Kleinschreibung in Namen
  ignoriert (`tableId` und `tableid` sind dieselbe Spalte, geprüft). In `orders.ts` umgestellt; `api.ts` hat noch
  `table_id` als Variable.
- Ordner nach Aufgaben, Dateien nach Inhalt, keine Sammeldateien wie `types.ts` oder `types/` (15.09.2026):
  `src/catalog/` Artikelbestand, `src/tables/` Tische und ihre Bestellungen (bis 16.09.2026 `src/orders/`),
  `src/server/` Server. Typen stehen bei ihren Daten.
- Typen ausdrücklich an Konstanten, Parametern und Rückgabewerten, zum Lernen erwünscht; `type` statt `interface`.
  Doppelte Anführungszeichen und vier Leerzeichen Einrückung. Kurze verschachtelte Objekttypen in einer Zeile,
  etwa `name: { de: string; zh: string; } | null;`.
- **Formatierung über `WokFlow/.editorconfig`** (16.09.2026, jede Einstellung mit englischem `#`-Kommentar, Namen
  in IntelliJ 2026.1 geprüft): vier Leerzeichen, Leerzeichen innerhalb `{ }` bei Objekten, Objekttypen, Imports,
  bis zu zwei Leerzeilen, Komma nach dem letzten Eintrag mehrzeiliger Listen. `max_line_length = 120` am 17.09.2026
  kurz eingetragen und auf Wunsch des Nutzers wieder entfernt. Anlass: IntelliJs Formatierer
  (Strg+Alt+L) entfernte Leerzeichen und Leerzeilen. Fehlt noch etwas, dort ergänzen, nicht in `.idea`.
- **Komma nach dem letzten Eintrag (16.09.2026):** bei Listen über mehrere Zeilen ja (Arrays, Objekte, Imports,
  Argumente, Parameter), bei einzeiligen nein, nie nach `...rest`; in `.editorconfig` als
  `ij_typescript_enforce_trailing_comma = whenmultiline`.
- **Aufbau eines Tests (Nutzer, 17.09.2026, selbst am ersten Test vorgemacht):** `test(` allein, darunter der Name in
  eigener Zeile, darunter die Lambda, dann `);`. Kurze Lambda in einer Zeile mit Klammern,
  `(): void => { deepEqual(…); }`; längere mit Klammern über mehrere Zeilen. Nach der Lambda kein Komma, wie im
  Beispiel des Nutzers, obwohl die Komma-Regel oben eins verlangt und Strg+Alt+L es einfügen würde; offen, was gilt.
  **Der Name eines Tests beginnt mit einem Großbuchstaben, ohne Punkt am Ende (Nutzer, 17.09.2026: „the name of a test
  should start big“):** `"Sending saves all orders or none"`. Umgesetzt in `orders.test.ts` und `menu.test.ts`;
  `api.test.ts` (anderer Chat) hat noch kleine Anfangsbuchstaben.
- **Imports (Nutzer, 17.09.2026, für die Lesbarkeit):** Ab vier Namen aus einer eigenen Projektdatei und ab sechs
  Namen aus einem externen Modul (Node oder Bibliothek) `import * as name from …` statt einzelner Namen.
  Die Grenzen gelten je Quelldatei; Name wie die Datei, etwa `orders.ordersSend`. Drei Namen aus einer eigenen
  Datei bleiben einzeln importiert, weil sie noch gut lesbar sind.
  Reguläre Imports stehen vor `import type`. Genau eine Leerzeile zwischen den Gruppen, wenn die Datei mindestens
  drei reguläre Import-Anweisungen und mindestens zwei `import type`-Anweisungen enthält; sonst stehen die Gruppen
  direkt untereinander. Ein einzelnes `import type` bekommt also keine trennende Leerzeile.
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
  - Objekttypen: ein JSDoc vor dem Typ, Properties als Liste `` - `name`: … ``, nur die erklärungsbedürftigen;
    keine Kommentare an einzelnen Properties. In `.ts` gibt es dafür kein Tag, `@property` gehört zu `@typedef`
    in JavaScript.
  - Links nur als `{@link Name}`, ohne `|` und Linktext. Benutzte Bibliotheksfunktionen bei Bedarf so erklären,
    Methoden über ihre deklarierende Klasse (`{@link Writable#end}` mit Import aus `node:stream`); dafür nötige
    Imports sind erlaubt. IntelliJ prüft Kommentar-Links selbst und braucht dafür `@types/node`.
  - **Verlinkbares immer verlinken (Nutzer, 17.09.2026: „if something is linkable, link it“, „take it
    seriously“):** Nennt ein Kommentar einen Typ, eine Funktion oder eine Konstante, die in der Datei erreichbar ist,
    steht dort `{@link Name}`, je Kommentar beim ersten Nennen; über Stern-Import mit Namensraum
    (`{@link orders.Order}`, `{@link articlesDrink.lemon}`). Mehrzahl als `{@link Order}s`, außer die Mehrzahl ändert
    das Wort (`categories`), dann ohne Link. Modulzeilen im Dateikopf und Datenbanknamen wie `orderbook` bleiben in
    Backticks. Am 17.09.2026 in `articles.ts`, `food.ts`, `menu.ts`, `orders.ts`, `database.ts`, `setup.ts`
    nachgezogen; die api-Dateien nicht.
  - **Form der Sätze (Nutzer, 18.09.2026, in `ordersRead` von Hand korrigiert: „there were a little bit flaws in the
    comments. Learn from it“):**
    - Jeder Satz endet mit einem Punkt, auch der letzte eines Blocks. Wer einen JSDoc anfasst, prüft alle seine
      Zeilen, nicht nur die neue (Fehler: „… as SQLite returns bare rows“ blieb ohne Punkt stehen).
    - Keine langen Kommentarzeilen, **Richtwert rund 75 Zeichen** (abgelesen an seinen Korrekturen; seine längste
      Zeile danach hat 73 Zeichen). Ein längerer Satz bricht an einer Sinngrenze um, nach einem Komma, vor „so“, vor
      „and“, vor „with“, und läuft in der nächsten Zeile weiter; jeder Satz beginnt in einer neuen Zeile. Fehler von
      Claude: eine Zeile mit 121 Zeichen in `ordersRead`, vom Nutzer gebrochen zu „Sorts the {@link Order}s by their
      oldest open portion,“ und „so a variant keeps its place while portions are sent or removed.“; danach hat er auch
      den Dateikopf von `orders.ts` von Hand umgebrochen, etwa „A portion is open until its table is closed“ und
      „and then stays stored for the records.“, auch eine ältere Zeile mit 107 Zeichen. Die Regel gilt also für jede
      Kommentarzeile, nicht nur für neue. Vorbild ist sein JSDoc von `orderOf`. Vor dem Abgeben prüfen:
      `awk 'length($0) > 80 && /^\s*\*/'` über die geänderten Dateien.
    - Ein Wort, eine Bedeutung gilt auch im Kommentar: Eine Zeile der Datenbanktabelle ist eine „portion“, ein
      `Order` ist eine Variante mit ihrer Menge. Nie „order“ für beides in einem Satz (sein Entwurf „Orders are
      sorted by their first order“ wurde deshalb umformuliert).
    - Ein Kommentar verspricht nur, was der Code heute tut. Der Satz zur Reihenfolge nannte erst nur das Senden und
      bekam „or removed“ erst, als `ORDER BY id DESC` im `DELETE` stand.
- **Kommentare in `commands.md` (Nutzer, 17.09.2026, von Hand gekürzt: „your commentary is shitty. Please learn from
  your mistakes“):** eine englische Zeile über jedem Befehl, ohne Punkt: was der Befehl tut, danach mit Komma die
  Optionen als `-x: Bedeutung`, etwa `# Run all tests from the WokFlow folder, --test: finds test files`. Keine
  Beispiele (Claude hatte „like test/orders.test.ts“ angehängt, die JSDoc-Regel ohne Beispiele gilt auch hier), keine
  Bedienhinweise (Claude hatte „stop with Ctrl+C“ angehängt). Vor dem Schreiben die Nachbarzeilen der Datei als Muster
  lesen und die Regeln hier prüfen, nicht aus dem Gedächtnis ergänzen.
- **Dateikopf im Stil des Nutzers (16.09.2026, mehrfach von Hand korrigiert):**
  - `## Titel`, darunter eine Beschreibung als Fließtext, keine Stichpunkte; sagt der Titel alles, keine
    Beschreibung (`## Drinks`). Keine Zusätze in Klammern, keine Ebenenzahlen. Dateien ohne Imports beginnen
    direkt mit dem JSDoc der ersten Deklaration.
  - Module: je Modul eine Stichpunktzeile direkt unter der Beschreibung, ohne Überschrift `### Modules` (Nutzer,
    16.09.2026, in `menu.ts` und `server/index.ts` selbst entfernt; `buffet.ts`, `food.ts`, `drinks.ts` ebenso).
    Das Modul in Backticks ohne Webadresse, dahinter, was das Modul macht, nicht was die importierten Namen machen.
  - Testdateien (Nutzer, 17.09.2026, in `test/orders.test.ts` selbst entfernt, „I don't think we have to list every
    module inside it“): keine Zeilen für die eigenen Dateien unter `../src/`, die Node-Module bleiben. In `orders.ts`
    stehen die Zeilen zu `../catalog/…` weiter.
  - Ausnahme `articles.ts` und andere Dateien mit wenigen importierten Namen: Dort bleibt `### Modules`, darunter je
    Name `` - {@link Name}: `` mit Erklärung, was er ist und wofür die Datei ihn braucht; diese Erklärungen nie
    weglassen.
  - Module und Properties stehen immer als Stichpunkt, auch einzeln; jede andere einzelne Angabe wird eine normale
    Zeile, etwa „Start with `npm start`.“ in `server/index.ts`.
  - Wortlaute des Nutzers bleiben, etwa in `articles.ts` „Defines the article type with its variants and stores
    variant prices as Dinero amounts.“
- IntelliJ: `// noinspection DuplicatedCode` wirkt in `.ts` nicht (vom Nutzer geprüft). Frühere Versuche mit einer
  zusätzlichen JavaScript-Node-Bibliothek für Doku-Links sind zurückgenommen.

## Einstieg

- Claude startet immer im Hauptordner `AsiaWok_Bonierungssystem_2026`, hier liegt diese Datei.
  Startet Claude doch in einem Unterordner, wird diese Datei trotzdem gelesen.
- `WokFlow/` = das neue System. Neuer Code, Tests und das Git-Repo liegen nur dort.
- `TOUCHIT/` = alles zum Altsystem, ca. 10 GB. Nur gezielt darin suchen, nie den ganzen Ordner durchsuchen.
- Alles außerhalb dieses Ordners gehört nicht zum Projekt, auch `M:\NomWorkspace\CLAUDE.md` nicht.
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
   Schlichte Rechtecke: 1–6 genauso groß wie 12–16, Tisch 20 kleiner. Keine gezeichneten Bänke.
   Die 20er-Gruppe steht ganz links im Innenplan; 18/19 steht rechts senkrecht.
   18, 19, 23, 24 bleiben einzeln buchbar, Nummer 25 entfällt. Der bisherige Raum mit den
   30er-Tischen liegt über dem Garten auf dessen Seite; beide sollen auf einen Bildschirm passen.
   Der Gartengang ist deutlich breiter; Tisch 17 liegt neben 19, die Abstände bei 21/22 und 24/23 sind angeglichen.
   Belegt: kräftiger roter Rand, leicht rote Füllung und stärkere Schrift; optional neutral grau.
   **Keine Punkte, keine Belegt/Frei-Legende, keine Beträge oder Aufenthaltszeiten.**
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
   entfällt nur in „Bestellt“; Kinder dort in Klammern, etwa „Sonntagsbuffet (6–9)“.
   Mittag, Abend, Sonntag, Feiertag sind vier getrennte Buffetarten; Sonntag/Feiertag preislich gleich,
   beide von 11:30 bis 21:30.
   Oben nur Buffetname mit Chinesisch, Zeitspanne rechts; andere Zeiten zum Aufklappen. Die spätere Automatik
   soll den Tarif aus Datum, Wochentag und Feiertag bestimmen, ohne die aktuelle Uhrzeit zusätzlich anzuzeigen.
3. **Absenden am Rückweg:** Die umrandete Tischnummer führt zum Tischplan zurück und schickt in der
   Demo neue Positionen ab; Escape ebenfalls. Ein ausdrücklich beschrifteter „Bonieren“-Knopf war
   zuvor diskutiert worden, die aktuelle Kopfzeile nutzt auf Nutzerwunsch die Tischnummer.
   Getränke und À-la-carte auf einem gemeinsamen Bon am Zentraldrucker, keine getrennten Bons (Nutzer, 16.09.2026);
   Buffet ohne Bon. Bereits Gesendetes nicht erneut drucken.
   Im Backend erst nach bestätigter Übernahme erfolgreich zurückkehren; Fehler erkennbar lassen.
4. Korrektur am offenen Tisch: Minus an der Getränk-/Speisenzeile; **versehentliche Entfernung
   rückgängig machen können**. Neuer Entwurf: Name des entfernten Artikels plus „Rückgängig“, ohne
   Zeitablauf bis zum Verlassen der Tischansicht, mehrere Schritte nacheinander rücknehmbar.
   Der Rücknahmebereich bleibt außerhalb der scrollenden Bestellliste sichtbar. Kein zusätzliches
   Bestätigungsfenster im Vorschlag. In „Bestellt“ nur Menge und Minus, auch beim Buffet;
   dessen Plus/Minus steht beim Erfassen. Rücknahme zeigt nur deutschen und chinesischen Namen,
   ohne „1 ×“, „entfernt“ oder entsprechende chinesische Zusätze.
   Stornogründe und die Nachvollziehbarkeit schon übernommener Änderungen bleiben Backend-Themen.
   Keine zusätzlichen Stornobons gewünscht.
5. **Getrennt kassieren ist wichtig:** in der Rechnung Artikel und Mengen für eine Person auswählen,
   diese Teilrechnung kassieren, nur die bezahlten Mengen abschließen; Rest bleibt offen am Tisch.
   Danach direkt zur nächsten Person in derselben Auswahl zurückkehren, bis alles bezahlt ist.
   Normalfall weiter direkt die ganze Rechnung. Nur nach Artikeln, nie nach frei eingetippter Summe.
   Verschieben auf einen anderen Tisch bleibt eine getrennte Funktion (im Entwurf seit 16.09.2026).
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
- Bildschirm-Session: Tischplan nach Skizze, wer Zahlarten korrigieren darf, Getränke-Gruppierung,
  Feiertage Josefstag und Volksabstimmung, Schrift.
- Coding-Session (Katalog, beendet 16.09.2026): Artikelkatalog in `WokFlow/src/catalog/` steht. Offen: Anbindung an
  Server, Bestellungen, Bildschirm (siehe „Artikel und Gruppen“).
- Modul-Chats (ab 17.09.2026, ersetzen Coding- und Server-Session): je Chat ein ganzes Modul, Ablauf und Regeln
  unter „Nächster Chat: Modul `tables`“. Modul `tables`: Bestellungen je Tisch in SQLite mit `node:sqlite`, das Node mitbringt.
- Nutzer mit der Chefin: Zwischenrechnung, offene Kredite, Personalbuchung, Rechnungskopie, Rechnung mit
  Kundenadresse (siehe „TOUCHIT-Abgleich“ unter „Entscheidungen“).
- Technik: Weg zu den Nexi-Daten, Cloud-Anbieter, VESA-Halterung, Ersatzdrucker, SQLite-Treiber.

## Nächster Chat: Modul `tables` (Übergabe vom 16.09.2026, abends)

Entscheidung des Nutzers am 16.09.2026 nach langer Diskussion (Chat „Skill oder Produkt“): **Ab jetzt baut Claude
ganze Module, nicht mehr Zeile für Zeile.** Gründe kurz: Vier Tage ergaben rund 500 Zeilen; im Tempo „eine Zeile je
Schritt“ wird WokFlow nicht bis Mai 2027 fertig. Schreiben aus dem Leeren übt der Nutzer an der Uni (Java,
Prüfungen). Aus dem Projekt nimmt er das Bild im Kopf (Struktur), das Urteil über Code, das Debuggen, ein fertiges
Produkt. Studienlage (Anthropic 2026, Bastani 2025): Wer KI schreiben lässt und danach fragt „warum so“, lernt fast so
viel wie von Hand; wer nur Code abholt, lernt wenig. Der Nutzer will Ultracode nutzen; das ist seine Wahl.

### Arbeitsweise je Modul

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
  Währung). Der Nutzer ist in Java weit fortgeschritten, bis in den Bibliothekscode (`Stream`), und weiß, dass Stufe 2
  diese Tiefe in TypeScript nicht liefert (16.09.2026). Java-Tiefe in TypeScript ist ein eigenes Vorhaben mit
  eigener Zeit (Node- und TypeScript-Quelltext, Buch, Übungen), nicht entschieden, nicht Aufgabe der Modul-Chats.
- Stopp-Regel: Ändert die Antwort nichts daran, wie WokFlow-Code gelesen oder geschrieben wird, aufhören.

### Schutz des Bestehenden (Nutzer, 16.09.2026: „don't destroy something which I coded already“)

- Unangetastet, außer das Modul braucht es und der Nutzer hat die gezeigte Änderung bejaht: `src/catalog/*`,
  `src/server/index.ts`, `src/server/database.ts`, `tmp/*`, `package.json`, `.editorconfig`, `commands.md`,
  `icons/`, `fonts/`.
- Neue Module in neuen Dateien, Ordner nach Aufgaben (`src/tables/`), keine Sammeldateien.
- Stil der bestehenden Dateien nicht glätten, Namen nicht ändern. Alle Regeln unter „Coden“ gelten für erzeugte
  Dateien genauso: Dateikopf, JSDoc, `type` statt `interface`, `import type`, Komma nach dem letzten Eintrag, vier
  Leerzeichen, Namensstil des Nutzers.
- Jede Änderung an einer bestehenden Datei: erst die Liste „ändert sich / bleibt“, dann Vorher/Nachher, dann Ja.
- Chat-Stil bleibt wie unter „Zusammenarbeit“: Englisch, kurz, keine unerklärten Fachwörter, eine Frage je Antwort.

### Stand der Dateien (geprüft 16.09.2026 abends)

- Modul `tables` gebaut (16.09.2026 abends): `src/tables/orders.ts` und `test/orders.test.ts`, 13 Tests grün,
  Typprüfung ohne Fehler, committet in `6138b9a`. `src/orders/` gibt es nicht mehr. Kommentarkorrekturen des Nutzers
  bisher: Modulzeile zu `menu.ts` nur „Groups the restaurant articles.“, bei `price` kein „in euro cents“, Regionen um
  die Typen, um `orderbookCreate`, um die Helfer entfernt, nur `Ordering` (vorher `Bookings`) blieb; JSDoc von
  `orderbookCreate` und `transaction` selbst umgeschrieben, `catch (error: unknown)` ausdrücklich typisiert. Der Nutzer korrigiert weiter; seine Korrekturen danach als Regeln unter „Coden“ festhalten.
- **Bestellungen nur mit Namen (Entscheidung des Nutzers, 17.09.2026, noch nicht committet):** `OrderNew` ist nur
  noch `Omit<Order, "price" | "tax">`, also `{ articleId, variantId, quantity }`, wie das Handy es schickt (Nutzer:
  `Omit` statt zweiter Feldliste; ein einziger Typ mit `price?` und `tax?` verworfen, weil dann jede Stelle, die
  gespeicherte Bestellungen liest, auf `undefined` prüfen müsste). Im `//#region Ordering` von `orders.ts` macht
  `orderOf(orderNew)` (Name vom Nutzer gewählt, wie `taxOf`) daraus ein `Order`: holt einmal `entryOf` und setzt
  Preis und Steuersatz, wirft bei unbekanntem Namen.
  `ordersSend(database, tableId, orders: Order[])` speichert nur noch (Variante C, vom Nutzer gewählt: jede Funktion
  eine Aufgabe); der Aufrufer schreibt `ordersSend(database, tableId, sent.map(orderOf))`. Die Kategorie schickt das Handy
  bewusst nicht mit: Sie bestimmt den Steuersatz, das Menü weiß sie schon.
- **Der Suchteil von `menu.ts`, Endstand 17.09.2026 abends** (davor durchprobiert und wieder verworfen, weil dem
  Nutzer alles zu kompliziert war: `menuSerach` mit zwei `find`, `Map` mit Textschlüssel `"Cola|0.5"`, `Map` in `Map`
  mit `variantsOf` und Paaren, sofort aufgerufene Lambda, Zweitdurchlauf für die Steuerausnahme, `priceOf` und
  `taxOf` als eigene Funktionen): `//#region Lookup` enthält den exportierten Typ
  `MenuEntry = { articleId, variantId, price, tax }`, also nur, was eine Bestellung braucht, dazu die flache Liste
  `const entries: MenuEntry[]` mit einer Zeile je Variante (zwei `flatMap` und ein `map` über Kategorien, Gruppen,
  Varianten), und `export function entryOf(articleId, variantId)` mit einem `find` über beide Namen, das bei
  unbekanntem Namen wirft. Preis kommt einmal beim Bauen aus `toSnapshot(variant.price).amount`, der Steuersatz aus
  `article.name.de === "Leitungswasser" ? 10 : category.tax`. Die Zitrone steht in der Gruppe
  `extras: [articlesDrink.lemon]` unter Getränke, die der Bildschirm nicht zeigt; `api.ts` gibt sie im Menü mit aus.
  Tests prüfen `entryOf(…).price` für jede Variante des Menüs gegen deren Preis und `entryOf(…).tax` für Cola,
  Pikante Suppe, Leitungswasser; 12 Tests grün. Typ `Groups` vor `Category`.
- **`test/orders.test.ts` und `test/menu.test.ts`, Stand 18.09.2026 (am 17.09. auf Auftrag des Nutzers gekürzt,
  „patch the whole file as you see fit“, am 18.09. auf „eine Zeile je Portion“ umgestellt):** 8 Tests, Typprüfung
  ohne Fehler, alle grün. Vier Tests für `orders.ts` in `orders.test.ts`: (1) „A table goes from its first orders to
  closing“, ein Ablauf statt vieler Einzeltests: `[colaBig1, colaSmall1, redBull1]` senden, später `[colaBig2]`,
  zweiter Tisch `G3`, lesen ergibt `[colaBig3, colaSmall1, redBull1]`, `ordersRemove` mit `[colaBig2, redBull1]` lässt
  `[colaBig1, colaSmall1]`, schließen, `G3` unberührt. (2) „Sending saves all orders or none“ mit `redBull0` (Menge 0). (3) „Removing takes all portions or none“: die
  zweite Angabe verlangt mehr Cola, als der Tisch hat, danach ist auch der Red Bull noch da. (4) „A free table has
  nothing to remove or to close“: erst senden und schließen, dann müssen `ordersRemove` und `tableClose` werfen, damit
  auch geprüft ist, dass geschlossene Portionen nicht mehr zählen. Der Nutzer fand den Ablauftest deutlich besser
  („much better to go through all the send“). **Namen der Testbestellungen vom Nutzer: Artikel, bei Cola die Größe,
  dann immer die Menge als Ziffer: `colaSmall1`, `colaBig1`, `colaBig2`, `colaBig3`, `redBull0`, `redBull1`** (er hat
  `cola1`/`cola2` selbst eingebaut und `redBull` später selbst in `redBull1` umbenannt; keine Namen wie `colaLater`
  oder `colaTwo`, keine Konstante ohne Ziffer). Alle sechs Konstanten stehen auf Dateiebene direkt unter seinem
  `beforeEach`-Block, auch `redBull0` (vom Nutzer dorthin verschoben: „keep my patch with the global Red Bull 0 and
  global Red Bull 1“), gebaut mit `orderOf`, keine festen Preise oder Steuersätze; `ordersRemove` bekommt
  dieselben Konstanten, weil ein `Order` auch als `OrderNew` passt. `DatabaseSync` ist dort `import type`, weil nur
  der Typ gebraucht wird (`setup.ts` braucht die Klasse für `new`). Die vier Menü-Tests (`entryOf`: Preis je Variante,
  Steuersatz der Kategorie, Leitungswasser, unbekannte Namen) stehen seit dem Ja des Nutzers unverändert im neuen
  `test/menu.test.ts` (Dateikopf „Checks the prices and tax rates that {@link entryOf} finds in the {@link menu}.“);
  `orders.test.ts` importiert deshalb weder `dinero.js` noch `menu.ts`. Geprüft mit absichtlich kaputten Kopien
  von `orders.ts` im Scratchpad (zehn Fehler, etwa `= ?` statt `IS ?`, `COMMIT` statt `ROLLBACK`, Entfernen ohne
  Prüfung von `changes`, Senden legt nur eine Zeile an, Lesen zählt nicht, Schließen schließt alle Tische): jeder
  lässt mindestens einen passenden Test fehlschlagen. Offen: die Dateien gemeinsam durchgehen (Warum-Liste).
  Frage des Nutzers nach einem globalen Setup für die Datenbank: `node:test` hat `before` und `beforeEach` wie
  `@BeforeAll` und `@BeforeEach`. **Entscheidung des Nutzers (17.09.2026, selbst eingebaut, gegen Claudes Empfehlung
  „Zeile je Test behalten“, nicht zurückbauen):** auf Dateiebene `let database: DatabaseSync;` und
  `beforeEach((): void => { database = databaseTest(); });`, um den Block je zwei Leerzeilen. Nie eine Datenbank über
  Tests teilen (im Scratchpad geprüft: mit geteilter Datenbank liefen die Tests nur durch, weil der erste Tisch 14
  am Ende schließt).
  `test/setup.ts` enthält nur `databaseTest` (Wunsch des Nutzers: eine Datei für alles, was nur Tests brauchen);
  `node --test` führt sie als eigene, bestandene Datei mit, das stört den Nutzer nicht, deshalb kein Muster wie
  `"test/*.test.ts"`. Imports: `import * as orders`, aus `menu.ts` einzeln `{ menu, entryOf }` (Nutzer: `menu.menu`
  ist hässlich, bei wenigen Namen einzeln).
- `src/server/api.ts` und `test/api.test.ts` (nicht von diesem Chat, zuletzt 17.09.2026 17:52 geändert) sind nicht
  angepasst: `api.ts` Zeile 137 übergibt noch `OrderNew[]` an `ordersSend` (muss `.map(orderOf)`), Zeile 248 baut
  noch das alte `OrderNew` mit Kategorie, Artikel, Variante; `api.test.ts` schrieb zuletzt noch direkt in die Spalte
  `article`. Eine Test-Lambda mit `(t, done)` ohne Aufruf von
  `done()` hängt ohne Zeitlimit ewig (geprüft).
  **18.09.2026, auf „fix“ des Nutzers, zwei Zeilen in `api.ts` angepasst, damit es wieder lädt:** Import
  `ordersRemove` statt `orderRemove`, im `DELETE`-Zweig `ordersRemove(database, table_id, [{ articleId:
  choice.article, variantId: choice.variant, quantity: 1 }])`. Weil `src/server/index.ts` `api.ts` importiert, wäre
  `npm start` sonst mit „does not provide an export named 'orderRemove'“ abgebrochen. Unverändert kaputt, wie schon
  vorher: Senden über die API (`POST`), die Typprüfung von `src/server/index.ts` meldet dazu zwei Fehler (`api.ts`
  Zeile 137 und 248); `api.test.ts` 8 von 20 grün, gleich wie vor dem Umbau. Das gehört zum Modul
  Server-Schnittstelle.
  **Die echte `wokflow.db` hat seit 18.09.2026 die neue Datenbanktabelle ohne `quantity`:** Die alte (0 Zeilen,
  geprüft) hätte `CREATE TABLE IF NOT EXISTS` nicht geändert. Löschen der Datei scheiterte mit „Device or resource
  busy“, weil IntelliJ sie als Datenquelle im Datenbank-Fenster offen hält; stattdessen mit `node:sqlite` die leere
  Tabelle per `DROP TABLE orders` entfernt und mit `orderbookCreate` neu angelegt. **IntelliJs SQL-Prüfung liest die
  Spalten aus dieser Datenquelle:** Nach einer Änderung der Datenbanktabelle meldet sie im Code veraltete Fehler
  (beim Nutzer: „Following columns have no computed/default value and must be listed explicitly: quantity“ am
  `INSERT`), bis die Datenquelle im Datenbank-Fenster neu eingelesen wird (Refresh). Künftig bei jeder Änderung an
  `orderbookCreate` daran denken: echte Datei anpassen und den Nutzer ans Neueinlesen erinnern.
- `src/server/database.ts` (neu): `databaseOpen()` öffnet `WokFlow/wokflow.db` mit `node:sqlite`, Pfad über
  `import.meta.dirname`. `src/server/index.ts` ruft sie beim Start auf, danach `orderbookCreate`. Beides committet
  in `6138b9a`.
- `wokflow.db` ist leer (0 Byte), seit `6138b9a` committet und steht **nicht** in `.gitignore` (dort nur `.idea` und
  `node_modules`). Legt `npm start` die Datenbanktabelle an, ändert sich die Datei, und `git add .` nimmt sie mit.
  Vorschlag, nach Ja des Nutzers: `wokflow.db` in `.gitignore` plus `git rm --cached wokflow.db` (Git verfolgt sie
  nicht mehr, die Datei bleibt liegen); `.gitignore` allein reicht bei einer schon verfolgten Datei nicht.
- Git (geprüft 17.09.2026): 8 Commits, letzter „Easier as i thought to learn ts with orders.ts“ (`6138b9a`), laut
  `git status -sb` gleich mit `origin/main`, also gepusht. Nicht committet: der Dateikopf von `test/orders.test.ts`.

### Modulreihenfolge (Vorschlag, der Nutzer ordnet um)

1. `tables`: Bestellungen je Tisch in SQLite. Reine Logik und Speicherung, keine HTTP-Anbindung, kein Bildschirm.
   Gebaut 16.09.2026.
2. Server-Schnittstelle: Katalog und Bestellungen als JSON über `node:http`, damit der Bildschirm sie holen kann.
3. Bestellbildschirm am Handy mit dem echten Katalog, Gestaltung aus `tmp/screens.html`. Vorher entscheiden, wie die
   Seite ausgeliefert wird (siehe „Aktueller Stand“: nicht vom eigenen Server, bei Bedarf Vite).
4. Danach nach dem Manifest: Rechnung, Zahlung, Druck, RKSV, Tagesabschluss.

### Modul `tables`, Spezifikation (gebaut 16.09.2026 abends)

- Ein Tisch (Kennung als Text: `"14"`, `"G3"`, `"M"`) hat beliebig viele Bestellungen. **Seit 18.09.2026 ist jede
  Zeile der Datenbanktabelle `orders` eine einzelne Portion (Idee und Entscheidung des Nutzers, „patch it this
  way“), eine Spalte `quantity` gibt es nicht mehr:** Tisch, deutscher Artikelname, Variantenname oder null, Preis in
  Cent und Steuersatz zum Zeitpunkt der Buchung, `closed` (Zeitpunkt des Abschlusses, Name vom Nutzer statt
  `closed_at`). Offen ist eine Portion, solange `closed` leer ist; ein Tisch ohne offene Portionen ist frei. Die Menge
  wird gezählt, nie gespeichert: Das Handy schickt weiter `quantity`, `ordersSend` legt so viele Zeilen an,
  `ordersRead` zählt je Variante mit `COUNT(*)`; der Typ `Order` mit `quantity` bleibt für alle Aufrufer gleich.
  Grund des Nutzers: Mit Mengen je Zeile müsste das Entfernen mehrerer Portionen erst eine Bestellung leeren und dann
  die vorige verringern. Weitere Gründe: Entfernen wird eine Anweisung ohne „verringern oder löschen“; getrennt
  kassieren heißt später n Zeilen als bezahlt markieren statt eine Zeile teilen. Preis: mehr Zeilen (Schätzung rund
  tausend am Tag, für SQLite belanglos). Katalogänderungen ändern gebuchte Bestellungen nicht (Regel unter „Artikel
  und Gruppen“).
  Vom Nutzer am 18.09.2026 nachgefragt, Empfehlung von Claude dagegen: **eine Zeile je Tisch und Variante, deren Menge
  hoch- und runtergezählt wird.** Löst das Problem mit der „vorigen Bestellung“ auch, macht aber jede Operation zu
  einem Entweder-oder: Senden heißt einfügen oder erhöhen, Entfernen heißt verringern oder bei null löschen, getrennt
  kassieren heißt später eine Zeile teilen. Dazu eine Falle: Die nötige Eindeutigkeit je Tisch und Variante greift
  in SQLite nicht bei Variante `null`, weil `NULL`-Werte in einem eindeutigen Index als verschieden gelten. Mit einer
  Zeile je Portion haben alle Operationen dieselbe Form: n Zeilen einer Variante wählen, dann einfügen, löschen,
  später als bezahlt markieren.
  **`Number.isInteger` in `ordersSend` (Frage des Nutzers, 18.09.2026: unnötig, weil `quantity: number` schon
  getypt ist?):** `number` ist wie Javas `double`, TypeScript hat kein `int`; `const quantity: number = 1.5` ist
  erlaubt. Mit 1.5 legt die Schleife 2 Zeilen an, mit 0 oder -1 keine, jeweils ohne Fehler. Die Prüfung ersetzt das
  frühere `CHECK (quantity > 0)` der Datenbank; Empfehlung von Claude: behalten. Der Nutzer hielt das für einen Scherz
  („that cant be real“): kein Typ für ganze Zahlen außer `bigint` (`2n`, lässt sich nicht mit `number` mischen,
  `JSON.stringify` wirft „Do not know how to serialize a BigInt“). Beleg: TypeScript-Handbuch, „Everyday Types“;
  Beispiel zum Selbstprüfen `node -e "console.log(7 / 2)"` gibt 3.5, Java 3. Ganze Zahlen sind in `number` bis
  9007199254740991 exakt, deshalb sind Cent und Mengen sicher.
- Namen nach der Alltagssprache (Nutzer, 16.09.2026): Der erste Bau hatte `orders` als offenen Vorgang je Tisch und
  `lines` als Positionen, dazu `neu`/`gesendet` aus dem deutschen Entwurf. Der Nutzer fand das gegen Sprache und
  Prototyp (dort heißen die Positionen `orders`). Seitdem Modul und Ordner `tables`, jede Position eine Bestellung,
  kein eigener Datensatz für den offenen Tisch.
- **Kein Status, gespeichert wird erst beim Senden (Nutzer, 16.09.2026):** Die Datenbank kennt nur Gesendetes. Noch
  nicht gesendete Bestellungen hält und korrigiert das Handy (Bildschirm-Modul) und schickt sie beim Rückweg zum
  Tischplan alle auf einmal. Stürzt das Handy vorher ab, sind sie weg und werden neu boniert; laut Nutzer selten und
  vertretbar. Jedes Senden legt neue Zeilen an, eine je Portion; zwei gesendete Cola plus eine weitere lesen sich
  seit 18.09.2026 als „Cola 3“, getrennte Bestellungen je Sendung gibt es nicht mehr (Nutzer: „no newest order even
  needed“). **Der Bon druckt weiter Mengen (Nutzer, 18.09.2026: „print should still print the qty“):** Gedruckt wird
  aus der Sendung, die `quantity` trägt, nicht aus der Datenbank; die Rechnung bekommt ihre Mengen aus `ordersRead`.
  Auch Entfernungen schon gesendeter Portionen sammelt das Handy und schickt sie erst beim Rückweg zum Tischplan
  (Nutzer, 18.09.2026); „Rückgängig“ passiert vorher am Handy, der Server braucht dafür nichts. Vorher gab es
  `new`/`sent` und `addOrder` je Portion.
- Funktionen in `src/tables/orders.ts` (Stand 18.09.2026): `orderOf(orderNew)` holt Preis und Steuersatz aus dem Menü;
  `ordersSend(database, tableId, orderlist: Order[])` speichert alle oder keine, je Portion eine Zeile, und wirft bei
  einer Menge, die keine ganze Zahl ab 1 ist (ersetzt `CHECK (quantity > 0)`); `ordersRemove(database, tableId,
  orderlist: OrderNew[])` nimmt je Angabe so viele offene Portionen weg, alle oder keine, mit
  `DELETE FROM orders WHERE id IN (SELECT id … ORDER BY id DESC LIMIT ?)` (neueste Portionen zuerst, siehe
  „Reihenfolge ist zugesagt“) und wirft,
  wenn `changes` nicht der Menge entspricht (ersetzt `orderRemove` für eine einzelne Portion; Nutzer: Entfernen soll
  wie Senden eine Liste bekommen); `ordersRead` zählt die offenen Portionen je Variante
  (`COUNT(*) AS quantity … GROUP BY article_id, variant_id, price, tax ORDER BY MIN(id)`, `COUNT` kommt als `number`);
  `tableClose` (setzt `closed`, Portionen bleiben gespeichert); `orderbookCreate` beim Serverstart (Name vom Nutzer,
  vorher `createOrdersTable`). **Vom Nutzer am 18.09.2026 selbst zurückgebaut, nicht wieder einführen:** keine
  benannte `StatementSync`-Konstante; `ordersSend` und `ordersRemove` schreiben `database.prepare(…).run(…)` direkt in
  der Schleife, wie `tableClose`. Schleife von ihm `portion = 1; portion <= order.quantity`. **Fehlertexte von ihm,
  einheitlich ohne Tischkennung (Nutzer, 18.09.2026: „one time you put in the table ID, one time not … very
  shitty“):** „… needs a valid quantity of at least 1“, „Not enough ${order.articleId} to remove
  ${order.quantity}“, „No open orders“. Regel daraus: Ein Fehlertext nennt, was der Aufrufer nicht weiß (Artikel,
  Menge), nicht was er selbst übergeben hat (`tableId`); `api.ts` protokolliert Zeit und Adresse mit dem Tisch dazu.
  Fehlertexte in einer Datei immer gleich aufbauen. **Tests prüfen keine Fehlertexte mehr (Entscheidung des Nutzers,
  18.09.2026: „the wording can change so better to just see if something is thrown“):** `throws(lambda)` ohne
  zweites Argument. Das Risiko, dass aus einem anderen Grund geworfen wird, deckt der Ablauftest, der dieselben
  Funktionen ohne Fehler durchläuft (mit elf absichtlich kaputten Kopien geprüft, auch ein Tippfehler im `DELETE`).
  Erklärt: `/…/` baut ein Suchmuster, `"…"` einen Text; ein Text als zweites Argument von `throws` vergleicht nichts,
  er ist nur die Meldung beim Fehlschlag (gleicher Text wie der Fehler: `ERR_AMBIGUOUS_ARGUMENT`).
  **Cola klein und groß im Ablauftest (Wunsch des Nutzers, 18.09.2026):** Konstanten `colaSmall1` (0.25), `colaBig1`,
  `colaBig2`, `colaBig3` (0.5). Fängt ein Entfernen, das die Variante ignoriert. Ein Lesen ohne `variant_id` im
  `GROUP BY` fängt es nicht, weil klein und groß verschiedene Preise haben und deshalb ohnehin getrennt bleiben; dafür
  bräuchte es zwei Varianten mit gleichem Preis. 8 Tests grün, Typprüfung ohne Fehler.
  **Reihenfolge ist zugesagt (Entscheidung des Nutzers, 18.09.2026, „Yeah, patch it“):** `ordersRead` sortiert nach
  der ältesten offenen Portion jeder Variante (`ORDER BY MIN(id)`), und das `DELETE` in `ordersRemove` nimmt mit
  `ORDER BY id DESC` die neuesten Portionen zuerst, damit eine Variante ihren Platz behält, solange es sie gibt; am
  Bildschirm „Bestellt“ springt dann keine Zeile. Anlass: Ohne `ORDER BY` löschte SQLite die ältesten Zeilen, und
  „Cola 0.5“ rutschte nach dem Entfernen unter „Cola 0.25“ (geprüft mit Zeilennummern: 1 groß, 2 klein, 3 und 4 groß;
  ohne `ORDER BY` bleiben 2 und 4, mit `ORDER BY id DESC` bleiben 1 und 2). Der Ablauftest sendet deshalb die große
  Cola zuerst (Wunsch des Nutzers) und schlägt fehl, wenn die Zeile im `DELETE` fehlt (geprüft). Die Frage des Nutzers
  „no newest order even needed“ ist damit überholt: nicht als Begriff einer „neuesten Bestellung“, aber als Wahl der
  Zeilen beim Löschen. Seine Idee, die Datenbanktabelle „generell mit der höchsten Kennung oben“ zu halten, geht
  nicht: Eine Datenbanktabelle hat kein Oben und Unten, SQLite hält die Zeilen intern immer nach `id`; ohne
  `ORDER BY` ist keine Reihenfolge zugesagt (Vergleich, der passte: Durchlaufen einer `HashMap`). Regel: `ORDER BY`
  genau dort, wo die Reihenfolge zählt. Kostet nichts: `EXPLAIN QUERY PLAN` zeigt mit und ohne `ORDER BY id DESC`
  dieselbe Suche im Index `tables_open`, ohne Sortierschritt.
  Den unbenutzten Import `StatementSync` hat der Nutzer selbst entfernt. Stand 18.09.2026 abends: `orders.ts`,
  `orders.test.ts`, `menu.test.ts` ohne Typfehler, 8 Tests grün, keine Kommentarzeile über 80 Zeichen; im ganzen Ordner
  17 von 29 grün, die 12 roten alle in `api.test.ts` (Senden über die API, Modul Server-Schnittstelle). Nichts davon
  ist committet, Git macht der Nutzer selbst. Erklärt am 18.09.2026: `StatementSync` mit `run`/`get`/`all`, SQL-`AS` gegen TypeScript-`as`, `IS` gegen
  `=` (Mischung bleibt, Nutzer: „nevermind“), `!==` gegen `!=`. Noch zu erklären: `COUNT`/`GROUP BY`, `LIMIT ?`,
  `IN (SELECT …)`. Offen: Der Name `OrderNew` passt für
  Entfernungen schlecht (JSDoc ergänzt, Name nicht geändert); ob Hinzufügen und Entfernen einer Sendung eine
  gemeinsame Transaktion bekommen. Die Zahlung selbst kommt später.
- Änderungen mit mehreren Anweisungen laufen als SQLite-Transaktion (Regel 1 der zehn Regeln).
- **Offen (Nutzer, 17.09.2026): Transaktionen einheitlich machen.** Ihn stört, dass `ordersSend` und `orderRemove`
  `transaction` benutzen und `tableClose` nicht. Der Grund ist, dass in SQLite jede einzelne Anweisung schon eine
  Transaktion ist: `tableClose` ist ein `UPDATE` über alle offenen Zeilen, `ordersRead` ein `SELECT`, `ordersSend`
  dagegen ein `INSERT` je Bestellung. Zwei Wege, einen wählt der Nutzer.
  **A (Empfehlung):** auch `tableClose` durch `transaction`, Regel „jede schreibende Funktion geht durch
  `transaction`, lesende nicht“; kostet ein `BEGIN`/`COMMIT` ohne Wirkung, dafür fragt niemand mehr nach.
  **B:** `transaction` löschen. Dann speichert `ordersSend` alle Bestellungen als ein `INSERT` mit einer
  Klammergruppe je Bestellung (im Arbeitsspeicher geprüft: scheitert eine Gruppe an `CHECK (quantity > 0)`, landen
  0 Zeilen), dafür wird der SQL-Text zur Laufzeit zusammengeklebt; und `orderRemove` kommt ohne `SELECT` aus, indem
  es zuerst `DELETE … WHERE id = (neueste) AND quantity = 1` versucht und nur bei `changes === 0` das
  `UPDATE … quantity - 1` (geprüft, gleiches Verhalten wie heute: 2 + 1 Cola ergeben 2 / 1 / weg, danach wirft es).
  Nicht gepatcht, der Nutzer wollte weiterreden. Hinweis vom 18.09.2026: Weg B ist so überholt, es gibt weder
  `orderRemove` noch `CHECK (quantity > 0)` mehr (eine Zeile je Portion, siehe oben); `ordersSend` und `ordersRemove`
  laufen weiter durch `transaction`, `tableClose` nicht, die Frage selbst bleibt offen. Frage des Nutzers am
  18.09.2026, ob Transaktionen mit einer Zeile je Portion entfallen: nein, sie tragen jetzt mehr. Eine Sendung von
  2 Cola und 1 Red Bull sind drei `INSERT` statt zwei, und `ordersRemove` löscht erst und prüft danach `changes`
  (3 Cola verlangt, 2 da: die 2 sind schon gelöscht, erst `ROLLBACK` holt sie zurück). Erklärt mit der Folge `BEGIN`,
  drei `INSERT`, `COMMIT`, wie am 16.09.2026.
- Zitrone und Buffetpersonen sind Bestellungen wie jede andere; ihre Sonderregeln kommen mit dem Bildschirm.
- Tests: `test/orders.test.ts`, `node:test` gegen eine Datenbank im Arbeitsspeicher, Start mit `node --test` im
  Ordner `WokFlow`; kein Skript in `package.json`.
- **So viele Tests wie nötig, so wenige wie möglich (Nutzer, 17.09.2026):** ein Test je Regel, die der Code umsetzt;
  kein eigener Test für einen Randfall, der schon in einem anderen Test mitgeprüft wird oder keine eigene Regel ist.
  Der Nutzer liest die Testnamen und einen Test ganz, nicht jeden Testkörper.
- **Ein Test je Risiko, über alle Artikel (Nutzer, 17.09.2026):** Sein Vorwurf am ersten Test „every variant of the
  menu has its own price“: Der Testkörper läuft mit denselben zwei `flatMap` und dem `map` durch Kategorien, Gruppen
  und Varianten wie der Bau von `entries` in `menu.ts`, also „duplicated code … seems to be useless“. Das stimmt
  halb: Ein falscher Gedanke in beiden Läufen fällt nicht auf. Der Test fängt aber zwei Dinge, die der Bau selbst nicht
  sehen kann: Vollständigkeit (fehlt eine Gruppe in `entries`, etwa `extras`, wirft `entryOf`) und einen Preis aus der
  falschen Variante (`article.variants[0].price` statt `variant.price` macht jede Cola 310 statt 450, ohne
  Fehlermeldung). Nicht gefangen: doppelte deutsche Namen, weil `entryOf` mit `find` den ersten Treffer nimmt
  (gemessen: 200 Varianten, 0 Doppelte). Geplant, noch nicht gepatcht: zwei ehrlich benannte Tests statt einem, beide
  über alle 200 Varianten, „every variant is found with its own price“ und „no two variants share the same name“
  (braucht `Set`, vorher erklären).
- **Warum Tests überhaupt, die Erklärung, die ankam (17.09.2026):** nicht abstrakt, sondern sein eigener Tag. Er hat
  `menu.ts` an einem Tag mehrmals umgebaut und danach jedes Mal in einer Sekunde 12 grüne Zeilen gesehen; ohne die
  Testdatei müsste er nach jedem Umbau Server und Handy starten, Cola, Red Bull und Leitungswasser buchen, den Tisch
  schließen und die Preise in der Datenbank nachsehen. Ein Test ist das aufgeschriebene Klicken. Der Nutzer sagt von
  sich, er sei mit Tests „really unfamiliar“ und finde die Arbeit daran kompliziert; bei Tests deshalb besonders
  kleinschrittig.
- Nicht in Modul `tables`: HTTP, Bildschirm, Zahlung, Rechnung, RKSV, Druck, Tischplan.
- Offen (16.09.2026): Der JSDoc von `orderbookCreate` nennt die Datenbanktabelle `orderbook`, das SQL legt noch
  `orders` an. Nachgefragt, ob die Tabelle `orderbook` heißen soll.
- Erklären mit Beispiel: Die erste Erklärung zum Status mit Kellnern und Tippen verstand der Nutzer nicht, erst eine
  kleine Gegenüberstellung mit Cola und Red Bull („heutiger Code“ gegen „anderer Weg“). Bei der Transaktion kam
  Abstraktes („SQLite weiß nicht, welche Anweisungen zusammengehören“) ebenfalls nicht an. Verstanden hat er: die echte
  SQL-Folge `BEGIN`, zwei `INSERT`, `COMMIT` für 2 Cola und 1 Red Bull; einen Versuch im Arbeitsspeicher, nach dem die
  Transaktion nach einem fehlgeschlagenen `INSERT` offen bleibt; `ROLLBACK` bis zum letzten `BEGIN`, frühere Sendungen
  bleiben. `transaction` vor `ordersSend` und `orderRemove` zu behandeln, verwirrte ihn: erst die Funktionen, die einen
  Helfer benutzen, dann den Helfer (Nutzer, 16.09.2026).
- `transaction` ohne Generic (Nutzer, 16.09.2026): `work: () => void`, weil kein Aufrufer einen Wert zurückbekommt;
  `<T>` erst wieder, wenn eine Transaktion etwas zurückgeben muss. `catch (error: unknown)` hat der Nutzer selbst
  typisiert.

### Was der neue Chat zuerst tut

1. Diese Datei lesen, zuletzt diesen Abschnitt.
2. Modul `tables` ist gebaut und geprüft. Offen: Der Nutzer startet und testet selbst, dann die Warum-Liste, dann
   seine Kommentarkorrekturen in `orders.ts` als Regeln unter „Coden“ festhalten.
3. Danach „Aktueller Stand“ nachtragen und diesen Abschnitt auf das nächste Modul umschreiben. Für jedes Modul:
   Spezifikation zeigen, Ja abwarten, Plan mit Vorher/Nachher zeigen, Ja abwarten, bauen, prüfen, Ergebnis zeigen,
   Startbefehl geben.

## Aktueller Stand

Stand 16.09.2026; Planung im Manifest, neuer Code nur in `WokFlow/`.

- **`src/catalog/`, der Artikelkatalog, ist vollständig (16.09.2026):** 102 Artikel in 21 Gruppen, dazu `lemon`;
  der Bildschirm zeigt sie als 18 Gruppen. Namen, Reihenfolge, Preise stimmen mit dem Prototyp `tmp/preview-menu.js`
  überein (Skriptvergleich ohne Abweichung) und mit der Speisekarte 2026. Aufbau, Regeln, offene Punkte unter
  „Artikel und Gruppen“. Noch nicht an Server, Bestellungen, Bildschirm angebunden. Laut Nutzer ist die Arbeit am
  Menü damit abgeschlossen; die nächste Aufgabe beginnt in einem neuen Chat.
- `src/tables/orders.ts` (Modul `tables`, 16.09.2026 abends): Bestellungen der Tische in der Datenbanktabelle
  `orders`, Tests in `test/orders.test.ts`. Noch nicht an Server-Schnittstelle oder Bildschirm angebunden. Das frühere
  `src/orders/order-item.ts` ist gelöscht (Commit „Delete intermediate orders“); ältere Absätze nennen es noch.
- `src/server/index.ts`: Mini-HTTP-Server auf Port 3000, antwortet mit einer HTML-Seite mit der Taste „Cola 可乐“.
  Öffnet beim Start `wokflow.db` (`databaseOpen`) und legt die Datenbanktabelle `orders` an, falls sie fehlt
  (`orderbookCreate`).
  Setzt UTF-8 über `setHeader`, sendet mit `end`; `Writable` ist nur für den Doku-Link importiert. Start mit
  `npm start` (`node src/server/index.ts`, ohne `--watch`, nach Codeänderungen neu starten). Bei `EADDRINUSE` alten
  Server mit Strg+C beenden. Relative Pfade zählen ab dem Ordner, in dem node startet: IntelliJs Run-Knopf an
  `index.ts` startet in `src/server`, `npm start` in `WokFlow`. Dateipfade, etwa zur SQLite-Datei, deshalb mit
  `import.meta.dirname` bilden, dem Ordner der Datei selbst (16.09.2026).
- `package.json`: `dinero.js` 2.0.2 (siehe „Geldbeträge“), als Entwicklungswerkzeuge TypeScript 7.0.2 und
  `@types/node` 26; keine `tsconfig.json`. TypeScript prüft deshalb mit den Standardwerten, seit TypeScript 6 mit
  `strict: true` samt `strictNullChecks`
  ([Versionshinweise](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#simple-default-changes)):
  eine optionale Property `x?: number` darf fehlen (beim Lesen `undefined`), `null` ist nur mit ausdrücklichem
  `| null` erlaubt.
- Bildschirm-Session: **Es gibt nur noch einen Entwurf** (Nutzer, 16.09.2026: Entwurf 2 war moderner,
  Entwurf 1 gelöscht, keine Nummer mehr nötig): `tmp/screens.html`, Gestaltung in `screens.css`
  (Grundlage des ersten Entwurfs, danach der Abschnitt „Design“ mit getönten Flächen, Rosé, Fenstern von
  unten), Bedienlogik in `screens.js`, Artikeldaten in `preview-menu.js`, Schriften unter `fonts/`.
  Ältere Absätze hier nennen die Dateien noch `bildschirme` (am 16.09.2026 auf Nutzerwunsch in `screens`
  umbenannt), `bildschirme_entwurf1` beziehungsweise `_entwurf2`; gemeint sind diese Dateien. Handyansicht mit `?vorschau=1#tables`, Übersicht mit `?uebersicht=1`. Ein Bildschirm je Ansicht; `?uebersicht=1` zeigt dieselben Bildschirme mit Erläuterungen.
  Alte Layoutvorschläge einschließlich `bestellen_varianten.html` auf Nutzerwunsch gelöscht.
  `tmp/touchit_bons_vergleich.html` bleibt als Analyse. Keine echte Kasse.
  Der Nutzer reagiert auf sichtbare Beispiele; Layoutfragen bleiben bei dieser Session.
- Bewertung des Entwurfs 1 durch Claude, nur Layout (Nutzer, 16.09.2026: Der Code des Prototyps wird
  nicht bewertet, nur das Layout, vor allem seine Modernität; der Entwurf soll ein fester Stand sein).
  Gesamt Note 2: flach, hell, ein Akzent, große Schrift, Reiter, Listen mit Pfeilen, Chips, Fenster als
  Dialog, ein Hauptknopf je Bildschirm, alles konsistent. Nicht auf Stand 2026: alles nur umrandet, der
  Hauptknopf nur blassrosa statt gefüllt, und Rot liest sich als Warnfarbe; Pop-ups zentriert statt als
  Bottom Sheet von unten; Symbole in den Gruppenzeilen rechts statt links; keine Druck- und
  Übergangszustände. Diese Vorschläge sind seit 16.09.2026 auf Nutzerwunsch als **Entwurf 2** in
  `tmp/bildschirme_entwurf2.html` zu sehen: eine Kopie von Entwurf 1 mit dem zusätzlichen Stylesheet
  `bildschirme_entwurf2.css` (gefüllter Hauptknopf in Markenrot mit weißer Schrift, getönte Nebenknöpfe
  statt Umrandung, Fenster als Bottom Sheet von unten mit kurzem Einblenden, Symbole links in den
  Gruppenzeilen, Druckzustand, Kartenlook für Artikeltasten, Rundung 12 px). Bedienung, Skript und
  Artikeldaten sind dieselben. Seit der Entscheidung vom 16.09.2026 ist Entwurf 2 eigenständig (vollständiges
  eigenes Stylesheet, eigenes Skript) und der gültige Entwurf; Entwurf 1 wird ignoriert. Er fragte, warum Fenster von
  unten besser seien: gleiche Funktion, nur am Daumen; Entscheidung offen. Rückmeldung 16.09.2026: „ohne
  Umrandung ist schon moderner“, das Grau ist richtig modern; der gefüllte rote Rechnungsknopf war zu
  knallig, deshalb behält Entwurf 2 den blassen Hauptknopf von Entwurf 1; Tische in Entwurf 2 ebenfalls
  grau getönt ohne Rand, belegt weiter rosa mit rotem Rand. Frage nach Druck-Feedback bei Tasten ohne
  Rand: nötig und bei modernen Apps Standard, reines CSS ohne Leistungskosten; in Entwurf 2 deutlicher
  gemacht (dunkler und leicht verkleinert beim Drücken, weich zurück). Plus/Minus: gesperrte Tasten
  fast weiß mit blassen Strichen, nutzbare grau mit schwarzen Strichen, damit Ältere den Unterschied
  sehen, ohne Rahmen. Danach: Das kräftige Markenrot sticht Leuten mit schlechteren Augen zu sehr; Entwurf 2
  nutzt deshalb ein sanftes Rosé (`--accent: #cf6b74`, Füllung `#f7e3e4`) für belegte Tische, aktive
  Reiter, Hauptknopf und Streifen. Entwurf 1 behält das Markenrot. Scrollleiste (Nutzerfrage 16.09.2026, sie
  wirkt am PC hässlich): nicht ausblenden, sonst fehlt die Orientierung, ob es weitergeht; in Entwurf 2 dünn
  und hell, am Handy ohnehin nur beim Scrollen sichtbar. Der Buffetwechsel oben ersetzt das Aufklappen,
  das die Leiste erst erzeugt hat.
- Nächster Schritt nach den Artikeldaten: Test-Bildschirm mit großen zweisprachigen Tasten als eigene
  Datei; dann am Handy im WLAN mit ein bis zwei Kellnern erproben. Noch nicht implementiert.
  Den Entwurf dafür nicht vom eigenen Server ausliefern lassen, sondern bei Bedarf mit Vite, ohne eigenen Code
  (Nutzer, 16.09.2026). Dateien ausliefern lösen fertige Werkzeuge; von Hand ist es mühsam und riskant, etwa
  könnte eine Adresse wie `/../../` beliebige Dateien des Server-PCs lesen.
- Git (geprüft 15.09.2026): Branch in `main` umbenannt, mit GitHub verbunden, erster Push erledigt.
  `origin` ist `git@github.com:UnathiCodex/WokFlow.git` per SSH, der lokale Schlüssel `id_ed25519` ist auf
  GitHub hinterlegt. `main` folgt dank `-u` `origin/main`, beide auf `1b24c2c`. Drei Commits, alle gepusht:
  „WokFlow is starting“ als `Vu`, „Starting Wokflow with some .ts“, „Cleaning these docs icons folders“ als
  `UnathiCodex`, alle mit `theunathi@gmail.com`. GitHub-Konto `UnathiCodex` seit 29.04.2026; Repository vom
  Nutzer am 15.09.2026 angelegt, von außen nicht sichtbar, also privat. Git 2.54, Git Credential Manager 2.7.3,
  GitHub CLI `gh` nicht installiert. Befehle tippt der Nutzer; `commands.md` hat über jedem Befehl einen
  englischen Kommentar. Schon erklärt: Staging-Bereich, `-m`/`-M`, Branch als Lesezeichen auf einem Commit,
  `parent`, Abzweigung, `origin/main`, `-u` mit dem echten Abschnitt aus `.git/config`, lokale gegen
  allgemeine `C:\Users\Vu\.gitconfig`, Name `merge` kommt von `git pull`, `refs/heads/main` als voller Name.
  Der Nutzer fühlte sich dabei zeitweise überfordert. Schrittweise Animationen mit „Weiter“ und echten
  Commit-Kennungen kommen sehr gut an (Nutzer, 15.09.2026). Gezeigt: Push mit einem, mit mehreren Commits,
  abgelehnter Push (`fetch first`), `fetch`, `merge` mit Merge-Commit, Push nach `fetch` ohne `merge`
  (`non-fast-forward`, nur erkennen), `pull` als `fetch` plus `merge`, fast-forward mit A, B, C, Pull und Push
  mit Abzweigung, Prüfung beim Push auf fehlende Vorgänger auch mit Merge-Commit, `fetch` mit mehreren Branches
  samt Zeile `fetch = +refs/heads/*:refs/remotes/origin/*`, Aufbau aus blob, tree, commit; ein Schritt je
  Antwort. Ebenfalls erklärt:
  `.git/refs/remotes/origin/main` als lokale Notiz, die sich nur bei Kontakt mit GitHub ändert; `HEAD` auf GitHub
  nur als Standard-Branch; `.git/HEAD` mit `ref:` oder Kennung, detached HEAD. Systemweite
  `C:/Program Files/Git/etc/gitconfig`: `pull.rebase false`, `init.defaultbranch master`; laut lokaler Git-Hilfe
  würde `pull` ohne diese Einstellung auseinanderlaufende Zweige nicht zusammenführen. Noch offen: Konflikt,
  Zusammenarbeit praktisch üben. Rückmeldung des Nutzers: Erklärungen waren zu präzise, zu schwer; einfacher
  sprechen, für Grundideen Buchstaben wie A, B, C statt Commit-Kennungen, fast-forward so gezeigt. Offen: `touchit_bons_vergleich.html` mit echten Tagesumsätzen vom 02.09. und 13.09.2026, teils
  als Foto der TOUCHIT-Berichte, liegt auf GitHub, im neuesten Commit unter `tmp/`, in `47c372d` unter `docs/`;
  vor dem Einladen anderer entscheiden, ob sie bleibt, Entfernen hieße Verlauf umschreiben.
  `.git` wird bisher per Syncthing mitsynchronisiert; mit GitHub klären, ob das so bleibt.
  Lizenz vom Nutzer am 15.09.2026 vorerst zurückgestellt, erst verbinden. Wunsch: später vielleicht
  öffentlich, aber keine kommerzielle Nutzung durch andere. Das ist nicht Open
  Source im Sinne der Open Source Initiative, sondern source-available; Vorschlag PolyForm Noncommercial als
  `LICENSE`, lokal committen, nicht über die Website. Noch zu besprechen: Beiträge anderer, eigene Nutzung
  im Restaurant.
- RKSV-Session: Monats-/Jahresbelege und Karte unter Linux. Externe Antworten siehe „Korrespondenz“.
- Kopien `Nexi/` und `Documents_2026-09-14*.zip` in Downloads darf der Nutzer nach Bedarf entfernen.
  `TOUCHIT/DECOMPILED/tools/` (2,8 GB) erst löschen, wenn alle vorgesehenen Dekompilierungsversuche
  abgeschlossen sind; M:-Papierkorb war dafür zu voll. Vollständigkeitsprüfung nur angeboten,
  nicht beauftragt. Originale und Analysedateien nicht ungefragt löschen.

## Entscheidungen

Stand 13./14.09.2026. Das Manifest beschreibt den Gesamtablauf; hier stehen ergänzende Details.
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
  Zeiten in festem Textformat. Treiber offen: `node:sqlite` mit Node 26 neu prüfen oder `better-sqlite3`.
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
  bestätigen lassen. Kein allgemeiner Zahlungsmodus „Gemischt“; Gutscheinrest ist ein eigener Ablauf.
  Im Bildschirmprototyp umgesetzt (15.09.2026): Gutschein in derselben Rechnung anrechnen,
  nur den verbleibenden Betrag über Bar/Karte bezahlen; bei vollständiger Deckung direkt abschließen.
  Gutscheineinlösung bleibt als eigene Zahlungsart erfasst. Einfaches Betragsmenü wie bei Bar;
  Gutscheinnummern, Anbieter, Gültigkeitsprüfung, dauerhaftes Restguthaben noch nicht angebunden.
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
  Abrechnungsperioden vier/fünf Wochen. Markup-Nachberechnung 164,39 € für WokFlow unwichtig.
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
  Kellnerkonten; der Server muss gleichzeitige Zeilen desselben Tisches zusammenführen. Backend-Thema.
- Nicht gebraucht: Kellnertransfer, Tischnummer eintippen, Tischplan-Editor (Plan liegt im Code),
  Abschluss „Kein Bon“ (Belegpflicht), Hotel, Waage, Schank, Bonuskarte.

### Bildschirm und Bedienung

Gültig ist seit 16.09.2026 der eine Entwurf in `tmp/screens.html` (aus Entwurf 2 hervorgegangen,
Entwurf 1 gelöscht). Angaben hier beschreiben eine lokale HTML/CSS/JavaScript-Demo, keine Buchung, Zahlung, Druck- oder Buffetautomatik.

Auf Nutzerwunsch übersichtlich aufgeräumt: HTML für die Bildschirme, CSS für die Gestaltung,
JavaScript für die Bedienung, `preview-menu.js` für Artikeldaten. Doppelte Tischpläne und Zahlentasten
verwenden gemeinsame HTML-Vorlagen; überholte CSS-Regeln, doppelte Eingabe-Handler entfallen.
Sinnvolle Leerzeilen, vier Leerzeichen Einrückung, verständliche Funktionen bleiben ausdrücklich erhalten;
keine Minifizierung. Artikelweise formatierte Daten, HTML-Vorlagen statt langer Textverkettungen.
Gutschein bleibt wie „Getrennt“ weiß, auch nach dem Anrechnen; die Rechnungssumme hat unten 24 px Padding.
Layoutvergleich mit dem Stand vor dem Aufräumen: 134 Ansichten auf 320/393 px breiten Browserflächen,
zusätzlich Desktop-Tischplan, Rechnung, Karte, Chefansicht. Varianten, Zitrone, Entfernen/Rückgängig,
Teilzahlung, Rückgeld, Gutschein mit Restzahlung, vollständige Gutscheinzahlung, direkter Barabschluss
im lokalen Edge geprüft; Artikeldaten, Centpreise, geprüfte Bestell-/Zahlungszustände unverändert.

- Ordner auf Nutzerwunsch bereinigt: temporäre Entwürfe, Vorschaukatalog, Speisekartenkopie,
  Referenzfotos liegen in `WokFlow/tmp/`. Wiederverwendbare Grafiken unter `WokFlow/icons/`:
  EmojiTwo-Originale in `emojitwo/`, angepasste Menügrafiken in `wokflow/`.
  Nur die gewählten Hyperreadable-Schnitte samt Lizenz bleiben unter `WokFlow/fonts/`.
  Alte Fonts, alter Bestellvarianten-Vergleich entfernt; keine zusätzliche Weiterleitungsdatei.
  Alle lokalen Verweise angepasst. Der leere `docs`-Ordner bleibt: seine Entfernung wurde
  von der automatischen Freigabeprüfung mit „blocked by policy“ ohne nähere Begründung abgelehnt.

- Hell, ruhige neutrale Grautöne, dunkle Schrift, klare Ränder und sparsames Markenrot.
  Belegte Tische/aktive Auswahl rot, neutrale Alternative vergleichbar. Keine knallroten Flächen.
  Haupttextkontrast rechnerisch 15.5:1, Nebentext/Rosé 5.5:1, Rand/Weiß 3.9:1, Rot/Rosé 5.7:1;
  daraus keine vollständige Barrierefreiheit ableiten.
- Geld nur bei Rechnung, Zahlung, „Heute“ und Abschluss, mit Punkt und Eurozeichen (`27.90 €`).
  Beim Bestellen keine Preise. **Getränkegrößen immer mit Punkt und ohne Literzeichen**:
  `0.25`, `0.5`, `0.3 + Wasser`, `0.5 + Wasser`, `0.3 + Soda`, `0.5 + Soda`.
- Getränke zuerst, immer Kategorien auswählen, ebenso beim Wechsel zu Speisen. Kein automatischer
  Einstieg in Limonaden oder Vorspeisen, keine Schnellauswahl oder wechselnden Tastenpositionen.
  Gewählt: „Bestellen / Bestellt“ ohne Artikelzahl, doppelte Überschrift oder zusätzliche Statusfußleiste.
  Große Tischnummer ohne „Tisch“, Bestellen/Bestellt in einer gemeinsamen Kopfzeile.
  Tischnummer als umrandete Zurück-Taste, eigener Bereich mindestens 64 px breit, Nummer 30 px,
  ohne Zeilenumbruch; barrierefreier Name nennt den Rückweg auf Deutsch/Chinesisch.
  Die separate Taste „Tische“ entfällt. Größere Reiter: 18 px, Chinesisch darunter 14 px.
  Gruppen als Liste ohne „Gruppen“-Titelzeile oder „Zur Auswahl“.
  Gruppenzeilen: Textblock und Pfeil auf derselben senkrechten Mitte; gleiche seitliche Abstände.
  In der gewählten Gruppe ein kleiner Zurückpfeil
  ohne Buttonrahmen. Flache Titelzeile mit wenig Abstand zu den Artikeltasten, Tippfläche weiterhin 44 px;
  seit 16.09.2026 in Entwurf 2 mit 10 px Luft oben, 6 px unten und 8 px bis zu den Tasten, weil die
  Gruppenansicht dem Nutzer nach oben gequetscht wirkte.
  Nur Gruppenname und Chinesisch nebeneinander, kein zusätzlicher Pfad „Getränke › Limonaden“.
  Letzte Auswahl als Pop-up mit Artikelname und Schließen, ohne „Variante / 规格“.
  Nach einer Buchung bleibt das Pop-up offen: z. B. dreimal dieselbe Cola-Größe ohne erneutes Öffnen.
  Mengen sofort aktualisieren, gewählte Zusätze erhalten; X, Escape, Tipp außerhalb schließen es.
  Popup höchstens 364 px breit, auch am Desktop schmaler als die Handyvorschau; innen tippen schließt nicht.
  Schließen als schlichtes X ohne Rahmen; unsichtbare Tippfläche weiterhin 44 × 44 px.
  Artikeltasten mit weiterer Auswahl zeigen den Pfeil einheitlich am rechten Rand; direkte Buchungen ohne Pfeil.
  Cola/Zero/Light auf Nutzerwunsch zusammengefasst: eine Cola-Taste, drei Sortentasten oben im Pop-up;
  darunter nur die passenden Varianten. Light weiterhin ausschließlich Flasche, jetzt mit bewusster Auswahl.
  **Getränketasten Deutsch oben und Chinesisch darunter.** Speisen als kompakte einspaltige Tasten
  mit beiden Sprachen nebeneinander; bei langen Namen umbrechen. Buffetüberschrift und andere kompakte
  Angaben ebenfalls nebeneinander. Kleine farbige Bildsymbole nur in den Gruppenlisten:
  Basis Getränke 32 px, Speisen 28 px, je Motiv optisch angepasst: Saft 30 px,
  Bier 28 px, Banane auf erneuten Nutzerwunsch 27 px, Salat/Rind/Schwein/Reis & Nudeln 26 px,
  Meeresfrüchte 24 px.
  Sichtbare Bildmitten anhand der gemalten Fläche über CSS-Größe, Position ausgerichtet;
  auf Nutzerwunsch kein Zuschneiden. Alle 19 SVGs behalten die volle Zeichenfläche von 64 × 64.
  Sushi 32.6 px, Maki 34.3 px, Spirituosen 42.7 px gleichen ihre größeren transparenten Ränder aus.
  keine Bilder bei Artikeln oder Buffet. Gruppenüberschrift und Zurückpfeil auf gemeinsamer Mitte.
  Alle bisherigen Bilder auf Nutzerwunsch ausgetauscht; heutige Gruppen siehe „Speisengruppen“.
  Auf neuesten Nutzerwunsch alle 19 Motive aus [Emoji One / EmojiTwo](https://github.com/EmojiTwo/emojitwo),
  CC BY 4.0, für einen einheitlichen Stil. **Nur Emojis aus dem EmojiTwo-Paket, nie selbst gezeichnete Bilder**
  (Nutzer, 16.09.2026, „I strictly want emojis from the emojis pack“, nach einer selbst gezeichneten
  Frühlingsrolle). Bisherige Noto-/Fluent-Ausnahmen ersetzt:
  Huhn, Rind, Schwein, Ente einheitlich als Tiere; Ente ohne Wasserfläche, Spirituosen als grüne Flasche.
  Am 15.09.2026 erneut bestätigt: beim EmojiTwo-Set bleiben. Im aktuellen Original-Repository fehlt
  das Steak-SVG 1f969; auch keine gebratene Ente. Fleisch am Knochen für Rind vom Nutzer verworfen.
  Passende Gerichte wären erwünscht, sonst ausdrücklich Tiere als Rückfall; Huhn ebenfalls als Tier.
  Sushi-Nigiri und Maki-Rollen aus der EmojiTwo-Illustration getrennt; Nori-Farbe angepasst.
  Wasser umgefärbt, Saftglas mit Apfel kombiniert, Colaglas mit Strohhalm kombiniert.
  Weiße Milchschaumreste in Cola/Saft entfernt; Colastrohhalm vor der Glasfläche, hinter der Flüssigkeit,
  oberhalb des Randes sichtbar. Glas dafür etwas verkürzt; sichtbare Bildmitte erneut ausgerichtet.
  Helle Formen mit sichtbarer Kontur auf Weiß: Tasse, Gläser, Bierschaum, Salat-/Nudelschale,
  Sushi-Reis, Hühnerkörper/-hals/-schwanz, heller Bananenteil. Kontur an der Form, kein Rahmen um das Bildfeld.
  Spirituosen als schräge grüne EmojiTwo-Flasche mit hellem Etikett, Korkenflug/Spritzer/lose Folie entfernt.
  Quellen, Anpassungen auf neuesten Nutzerwunsch kurz auf Englisch in `WokFlow/icons/sources.md`.
  Klare Absätze, Zeilenumbrüche wie in den übrigen Dokumenten; die vollständige verlinkte Zuordnung
  jeder WokFlow-Grafik zu ihren EmojiTwo-Originalen erhalten, nicht zugunsten der Kürze entfernen.
  Die frühere `icons/wokflow/LICENSE.txt`, der Quellenblock im Bildschirm sind dadurch ersetzt.
  Originalnachweise bleiben bei EmojiTwo, Hyperreadable erhalten.
  Vollständige SVG-Sammlung für Wiederverwendung unter `WokFlow/icons/emojitwo/`: 2.789 unveränderte SVGs
  im Unterordner `svg/`, ursprüngliche `LICENSE.md`, ursprüngliche `README.md`. Rund 4.97 MB Grafikdaten.
  Bezogen am 15.09.2026 von EmojiTwo, Revision `311eff547b3ff4a61fdbae897dd09d41416048fc`.
  Für Menüanpassungen Arbeitskopien in `icons/wokflow/` verwenden; Originalsammlung unverändert lassen.
  Bilder weiterhin lokal und geräteunabhängig, nur in Gruppen. Menüdatei, `screens.css`, `screens.js`, Bild-URLs mit
  Versionskennung `?v=` gegen veraltete Dateien im Cache, bei jeder Änderung hochzählen (am 16.09.2026 lud der
  Browser sonst die alte CSS zum neuen Skript); der offene HTML-Tab muss für Änderungen neu geladen werden.
  Mengenfelder zeigen sofort die aktuell unbezahlte Menge des Tisches. Cola-Taste zählt alle drei Sorten,
  Varianten zeigen ihre konkrete Menge. Äußere, nicht bedienbare Gesamtanzeigen wieder klein:
  mindestens 26 × 26 px, Schrift 16 px. Sie öffnen beim Antippen weiterhin die Auswahl.
  Bedienbare Mengenfelder im Auswahlfenster oder an Direktartikeln behalten mindestens 36 × 36 px,
  Schrift 20 px, unsichtbare Tippfläche 48 × 48 px. Im Auswahlfenster liegt die sichtbare Zahl
  direkt an der oberen rechten Tastenecke, mit mehr Abstand zur Größenbeschriftung.
  Auswahlpfeile bleiben frei; bei null verschwindet das Mengenfeld.
  Nach dieser Korrektur 96 Artikeltasten auf 320/393 px ohne Textüberlagerung geprüft,
  Mengenfeld im Dialog bündig an beiden Kanten, alle vier Ecken weiterhin bedienbar.
  Die unsichtbare Tippfläche ist rechteckig, nur das sichtbare Feld gerundet: damit fügen
  Tipps an den Ecken nicht versehentlich wieder hinzu. Lange Variantenbeschriftungen bekommen
  eine eigene Fläche unter der Mengenzahl; unter 381 px auch die normalen Größenvarianten. Seit 16.09.2026
  in Entwurf 2 nicht mehr: Die Beschriftung sitzt mittig, das Mengenfeld liegt in der Ecke, nur bei
  Wortvarianten (Tee, Kaffee, Campari, Mineralwasser) sind volle Zeilen mit der Menge rechts in der Zeile,
  damit beim Antippen nichts wächst oder überlappt (Nutzer: das leere Weiß oben war hässlich, und bei
  Schwarz/Kamille wuchs die Taste ungleich). Tischnummern im Plan 30 px, Gewicht 600 wie die Nummer in der Kopfzeile (Nutzer: muss gleich
  groß sein), Gartentische 22 px. Buffet-Kopfzeile mit Chinesisch in zweiter Zeile (Nutzer: mit der Zeit
  daneben zu gequetscht), die Zeit rechts 20 px wie der Buffetname, in der Artenliste 17 px wie der Zeilentext
  (Nutzer 16.09.2026). Druckzustand je Fläche: Grau wird dunkler, Weiß wird grau, Rosé wird kräftiger
  (Nutzer: Grau über Rot wirkt blöd). Rückgängig-Leiste als weiße schwebende Karte mit leichtem Schatten und
  grauem Knopf, statt grau auf grau (Nutzerfrage 16.09.2026, ob grau auf grau üblich sei: nein; die zuerst
  gebaute dunkle Leiste wie bei Gmail war dem Nutzer zu schwarz und zu betont für ältere Augen). Überschriften
  „Tische“ und „Heute“ 30 px fett wie die Tischnummern (Nutzer: die Überschrift muss unbedingt so groß sein
  wie die Zahlen drin). Kurz darauf: Die Überschrift „Tische“ entfällt im Tischplan ganz (Nutzer: nicht nötig,
  man weiß, wo man ist); die Kopfzeile trägt links „Reservierungen 预订“ als vorbereiteten Knopf für
  Online-Reservierungen und das Markieren reservierter Tische (Bildschirm folgt) und rechts „Heute“, beide
  16 px. Rosé-Flächen ohne roten Rand, wie die grauen Tasten (Nutzerfrage, ob der Rand nötig
  sei; Antwort: ohne ist konsequenter, dafür Rosé eine Spur kräftiger `#f3d5d8`, damit belegte Tische ohne
  Rand erkennbar bleiben; gestrichelter Rand beim Schieben bleibt als Zustandsmarke). Danach auch die
  Artikeltasten, Größenkacheln und Sortenknöpfe getönt grau ohne Rand, wie alle Tasten (Nutzer 16.09.2026:
  lange Getränkenamen wie Mineralwasser und Leitungswasser kratzten am runden Rahmen); deutsche
  Getränkenamen auf den Tasten kurz 19 px, auf Nutzerwunsch wieder 20 px: Auf 393 px passt alles in eine
  Zeile, Ginsengschnaps, Bambusschnaps und Latte Macchiato mit nur 3 bis 7 px Luft zum Rand; auf 360 px
  brechen diese drei und Leitungswasser. Mehr Akzentfarbe nicht
  gewünscht (Nutzerfrage, ob noch mehr rot werden soll; Antwort: nein, Rosé bleibt Zustandsfarbe für
  belegt, gewählt, Hauptknopf und Menge). Die feste Mengenanzeige auf Tasten mit Auswahlfenster (Cola,
  Mineralwasser) ohne Rahmen, nur rosé gefüllt (Nutzer 16.09.2026: der Rahmen pickte an der Taste); die
  antippbaren Mengenfelder behalten ihren Rahmen.
  Die breite Flaschenzeile bleibt davon ausgenommen und reserviert seitlich Platz für die Menge.
  Die Beschriftung bleibt horizontal mittig, keine asymmetrische Einrückung.
  Größen im Auswahlfenster exakt auf der Tastenmitte; Mengenfeld davon unabhängig oben rechts,
  kein einseitiger Platzhalter, der 0.25/0.3/0.5 nach links verschiebt.
  Getränkenamen mit Varianten nutzen die volle Tastenbreite; äußere Mengenfelder, Pfeile stehen unten neben dem
  chinesischen Text. Leitungswasser/Johannisbeere ohne Kürzung; bei schmalen Handys darf Text umbrechen.
  Deutsche Getränkenamen/Gruppen jetzt 20 px statt 19 px, Chinesisch weiterhin 17 px.
  Artikeltasten oben 12 px, unten 8 px Innenabstand; Sprachpaar vertikal zusammen zentriert,
  damit Deutsch etwas tiefer sitzt. 46 Getränketasten mit sichtbarer Menge auf 320/360/393 px
  ohne Textüberdeckung geprüft. Johannisbeere/Leitungswasser bei Bedarf am Wortbestandteil trennen;
  nur die Tastenbeschriftung enthält eine weiche Trennstelle, Buchungsnamen bleiben unverändert.
  Direktartikel: Antippen nimmt die letzte neue, noch nicht abgeschickte Portion zurück. Artikel mit Auswahl:
  außen nur Mengenanzeige, ein Tipp öffnet das Menü. Darin an der konkreten Größe/Sorte verringern;
  das Menü bleibt dabei offen. Reihenfolge neuer Portionen lokal je Tisch halten; neue Mengen zuerst verringern.
  Nach dem Tischwechsel bleibt die Zahl im Auswahlfenster bedienbar. Bereits abgeschickte Portionen
  lassen sich dort korrigieren, mit kleiner Rücknahmeleiste im Dialog. Neue Portionen weiterhin ohne
  Rücknahmeleiste, keine verzögernde Animation. „Rückgängig“ stellt auch den Versandstatus korrekt wieder her.
  Teilzahlungen entfernen bezahlte Einträge auch aus der Reihenfolge.
  Speisen als einspaltige umrandete Artikelzeilen, Getränke weiterhin zwei Spalten.
  Seit 16.09.2026 ein Name je Artikel: `menus` in `preview-menu.js` trägt dieselben Namen wie `src/catalog`
  (geprüft, keine Abweichung), `articleLabels` und `articleChineseLabels` entfallen samt weicher Trennstellen.
  `serviceLabel` verkürzt in „Bestellt“ und Rechnung nur noch „+ Zitrone“ zu „+ Zit“, „Flasche 0.35“ zu „0.35 Fl.“. Die Mineralwasser-Varianten heißen seit 16.09.2026
  direkt „prickelnd“ und „still“, auch im Auswahlfenster und in den Buchungsnamen (Nutzer: „Mit/Ohne
  Kohlensäure“ dort war eine Inkonsistenz zu Bestellt).
  Gespeicherte Namen, Preise, Belegpositionen bleiben vollständig; keine duplizierten Artikel.
  Beispiele: Alkoholfrei → Alkoholfreies Bier, Gemischt → Gemischter Salat,
  Bambus & Pilze in Huhn → Huhn mit Bambus und Pilzen.
  „Bestellt“ zeigt eine fett gesetzte Menge ohne „×“, nur Minus, auch für Buffetpersonen.
  Ein kleiner Sprachknopf „DE“/„CN“ rechts neben „Rechnung“, kein eigener Streifen oben:
  jeweils eine Sprache, Namen bis 20 px, gleiche dunkle Schrift. Lange Namen passend zur verfügbaren
  Breite kleiner setzen, vollständig in einer Zeile. Auswahl bleibt während der Vorschau über
  Tischwechsel erhalten; verändert weder Buchungen noch die Sprache beim Bestellen.
  Chinesische Ansicht enthält ebenfalls die konkrete Größe, Flaschenkennzeichnung, Zusätze, Maki-Stückzahl.
  Zusätze in „Bestellt“, beiden Rücknahmeleisten mit derselben Plus-Schreibweise anzeigen:
  „可乐 0.3 + 水 + 柠檬“, „黑加仑汁 0.3 + 苏打水 + 柠檬“.
  Nur die Anzeige der Zusätze kürzen; eigentliche Artikelnamen wie 黑加仑汁, gespeicherte Daten bleiben erhalten.
  Erwachsene nur als Buffetname, Kinder in Klammern; auf Chinesisch seit 16.09.2026 ebenfalls nur das Alter,
  etwa „周日自助餐 (6–9)“ ohne 儿童/小童 (Nutzer: unnötig, versteht man auch auf Chinesisch). Die
  Rückgängig-Karte in „Bestellt“ folgt seit 16.09.2026 der dort gewählten Sprache, eine Sprache statt beider
  (Nutzer: sie liegt im Menü mit dem Sprachknopf), dafür Schrift 18 px und Knopf 16 px; die Rücknahmeleiste im
  Auswahlfenster bleibt zweisprachig.
  Gruppierung darf vom PDF abweichen; Katalog und Bildschirm sind seit 16.09.2026 abgestimmt.
- Demo-Getränkegruppen: Limonaden, Fruchtsäfte, Wasser, Bier, Weine, Warmes,
  Spirituosen. Kein zusätzlicher Einstieg „Kaltgetränke“: Limonaden und Fruchtsäfte sind direkt erreichbar.
  Kurze Gruppenbeschriftungen „Weine / 酒“, „Warmes / 热饮“; einzelne Artikelnamen bleiben korrekt.
  Reihenfolge nach den Kaltgetränken entspricht der Speisekarte, offene Weine bleiben daher vor warmen Getränken.
  „Limonadenflaschen“ entfällt; „Flasche“ neben den Größen bei Cola, Cola Zero, Fanta
  und Sprite. Cola Light nur als Flasche bei Limonaden. Größe `0.35` und Flaschenkennzeichnung
  bleiben in der Bestellzeile; „Flasche 0.35“ steht oben in einer Zeile auf einer breiten Taste.
  Flaschenzeile einzeilig: zuerst „Flasche 0.35“, danach Chinesisch rechts daneben (neueste
  Nutzerkorrektur). Gemeinsam zentriert, 56 px hoch, Mengenzahl seitlich mit eigenem Platz.
  Kleinere senkrechte
  Abstände bei niedrigen Displays; die 48 × 48 px großen Mengen-Tippflächen bleiben erhalten.
  Cola/Zero/Light auf 320×640, 360×640, 360×680, 393×740 px geprüft: Größen, Flasche,
  Zitrone ohne Scrollen sichtbar; keine Überdeckung von Beschriftungen durch Mengenfelder.
  Buchung, Zitrone, Entfernen der Flasche geprüft. Prüfung im Browser, nicht am physischen Redmi.
  Bei Mango pur `0.2` über die ganze Zeile, dann je eine Zweierreihe Wasser und Soda mit Zahl oben.
  Säfte: zuerst Apfelsaft, Orangensaft, danach Erdbeere, Mango, Marille, Johannisbeere,
  anschließend Aloe Vera, Lycheesaft. „Pago“ entfällt bei sämtlichen Säften im ganzen Entwurf:
  Artikeltasten, Auswahltitel, Bestellt, Rechnung; Preise und chinesische Namen bleiben erhalten.
  Keine erfundenen Flaschensorten. Speisen siehe „Speisengruppen“; „Spezialitäten“, „Beilagen“, „Nachspeisen“
  gibt es nicht mehr. „Fleischtaschen“ ohne „Jiao Zi“, „Frühlingsrollen“ ohne „Mini“.
  Sushi-Mengen nach Speisekarte Seite 5 ohne Klammern: klein 7 Sushi + 3 Maki, mittel 9 + 3,
  groß 11 + 3, Lachs Sushi 8 + 3. Futo Maki 10, Maki im Set 18; Zahlen nicht nochmals chinesisch wiederholen.
  Futo Maki (10), Maki im Set (18) in derselben Zeile; Sushi-Sets mit zweiter Zeile,
  z. B. „7 Sushi 寿司 + 3 Maki 卷“, beide Begriffe übersetzt, jede Zahl nur einmal.
  Red Bull bei Limonaden. Direkt gebuchte Getränke bekommen keine zusätzliche Zitronenabfrage;
  Zitrone bleibt bei vorhandenen Getränkeauswahlen erreichbar, Sonderfälle später bei Bedarf.
  **Zitrone, vom Nutzer bestätigter Ablauf:** zuerst Größe/Wasser/Soda buchen, danach bei Bedarf einmal „+ Zitrone“
  für das zuletzt neu gebuchte Glas. Keine Checkbox, keine Vorauswahl, kein Bestätigungsfenster.
  Kurzes Hervorheben der Mengenzahl; 20 ms Vibration auf unterstützten Geräten, reduzierte Bewegung beachten.
  Im Auswahlfenster bleibt ausschließlich die Gesamtmenge, z. B. 2; keine Aufteilung oder dauerhafte
  Zusatzanzeige dort. Mit/ohne Zitrone erscheinen als getrennte Positionen in „Bestellt“.
  Der nächste Größenklick bucht wieder ohne Zitrone. Aktion vor erster Buchung, nach Anwendung,
  Größenkorrektur der letzten Portion, Sortenwechsel oder erneutem Öffnen nicht verfügbar, bis neu gebucht wird.
  Wiederholtes Tippen berechnet keinen zweiten Zuschlag. Gesamtmenge bleibt gleich, nur eine neue Portion
  bekommt den vorgesehenen Zuschlag; bereits abgeschickte Portionen bleiben beim Ergänzen unverändert.
  Soda hat seit 16.09.2026 keine eigenen Zitronen-Varianten mehr (Nutzer, über die Katalog-Session): nur 0.25 und
  0.5 (2.70, 3.50), Zitrone wie bei allen Getränken über „+ Zitrone“ (+0.20). Im Entwurf nutzt Soda `twoSizes`
  mit Preisen in `itemPrices`, die Sonderregel „keine Zitrone bei Soda“ in `screens.js` ist entfernt; im Browser
  geprüft: „Soda 0.25 + Zitrone“ kostet 2.90.
- **Eine Zeile je Name (Nutzer, 16.09.2026):** Getränketasten zeigen Deutsch und Chinesisch möglichst in
  einer Zeile. Dafür lange chinesische Namen gekürzt (Melange 奶泡咖啡, Verlängerter 美式咖啡, Latte Macchiato 拿铁,
  Aperol Spritz 阿佩罗, Hugo 接骨木酒, Prosecco 普罗塞克, Alkoholfrei 无醇啤酒, Jägermeister 野格); seit „Ein Name je
  Artikel“ gelten sie überall. Bei Direktartikeln nutzt die deutsche Zeile die volle Tastenbreite, nur die
  chinesische lässt dem Mengenfeld Platz. **Keine automatische Verkleinerung** (Nutzer: Namen bleiben gleich groß,
  im Notfall zweite Zeile, aber melden). Mit 18 px (siehe „Getränkenamen kleiner …“) passen bei 360 px alle 46
  Getränkenamen in eine Zeile; Chinesisch bricht nirgends.
- **Ein Name je Artikel (Nutzer, 16.09.2026):** derselbe Name auf Taste, in „Bestellt“, auf der Rechnung; keine
  Langform, keine eigenen Tastenbeschriftungen (Umbrüche am Bildschirm stören, jede Rechnungszeile kostet Papier).
  `articleLabels` und `articleChineseLabels` entfallen; `menus` in `preview-menu.js` trägt dieselben Namen wie
  `src/catalog/` (Skriptvergleich ohne Abweichung). **360 px ist die Standardbreite**, dort bricht keine Taste um
  (Getränkenamen 18 px, Speisennamen 18.5 px, siehe nächster Punkt). Passt ein Name nicht, wird er gekürzt, in
  beiden Sprachen mit gleichem Schnitt: Meist bleibt der Anfang, unterscheidende Wörter bleiben (Gegrillte und
  Gebackene Garnelen). So entstanden Meeresfrüchte 海鲜炒蔬菜, Gegrillter Fisch 铁板鱼配蔬菜, Knoblauchsauce 蒜蓉酱,
  Rind mit Zwiebeln 洋葱牛肉, Gegrillte Garnelen 铁板虾, Buddhistische Speise 罗汉斋, Huhn mit Bambus 竹笋鸡,
  Thai Curry Chicken 泰式咖喱鸡 („Red“/红 weg), Reis mit Ei 蛋炒饭. Gebackener Tintenfisch 炸鱿鱼 bleibt lang
  (Nutzer: der Verlust von „gebacken“ war schade), dafür die 18.5 px. Getränke behalten ihre vollen deutschen
  Namen. Die zweite Zeile der Sushi-Sets ist gewollt.
- **Getränkenamen kleiner, Mengenfelder ohne Rand, Schieben lesbarer (Nutzer, 16.09.2026):** Nach Screenshots
  der Umbrüche bei 360 px („Bambusschna / ps“) wollte der Nutzer die Namen „ein bisschen kleiner“, und die „5“
  kollidierte mit „Bambusschnaps“. Umgesetzt: deutsche Getränkenamen 18 statt 20 px, Getränketasten seitlich
  10 statt 12 px Innenabstand; bei 360 px alle 46 Getränkenamen einzeilig, knappster Ginsengschnaps mit 4 px Luft.
  Nutzer danach: 18 px bleibt, Getränke behalten ihre vollen Namen (20 px mit weggelassenem „schnaps“ reichte
  nicht, auch Leitungswasser und Latte Macchiato brechen dort um). **Speisennamen 18.5 px** (Nutzer: größer als
  Getränke, aber so klein, dass sich der volle Tintenfisch ausgeht): Der eine Name ist wieder „Gebackener
  Tintenfisch 炸鱿鱼“, bei 360 px mit 3 px Luft einzeilig, alle anderen Speisen ebenfalls; Katalog-Session informiert.
  Nutzer meldete bei 360 px ungleiche Ränder: gemessen sind alle Zeilen links und rechts 16 px; der graue Streifen
  rechts im Browserfenster liegt außerhalb der 360-px-Testansicht. **Mengenfelder überall ohne
  Rand** („we agreed on no border for this type of things“), nur rosé bzw. grau gefüllt; auf Artikeltasten sichtbar
  30 statt 36 px, Zahl 18 px, Tippfläche weiter 48 × 48 px; bei Getränken 2 px tiefer in der Ecke, dadurch 4 px
  Abstand zum Namen. Geprüft bei 360 px: 22 Getränke und 46 Speisen mit Menge, keine Überlappung. Schieben: Der
  geschobene Tisch war weiß mit grauer Zahl, weil eine spätere Regel den gestrichelten Rand ausblendete; jetzt
  rosé gefüllt, 3 px gestrichelter Rand in `--accent`, dunkle Zahl. „Rechnung“ in „Bestellt“ 20 statt 16 px,
  Streifen „14 schieben“ 20 px (Chinesisch 17 px), „Abbrechen“ 17 px; bei 360 px alles einzeilig. **Die Taste
  „Schieben“ ist jetzt nur ein Pfeil „→“** für beide Sprachen (Nutzer), quadratisch 56 px wie der Sprachknopf,
  `aria-label` „Tisch schieben · 换桌“; die Zeile darunter ist damit symmetrisch (56 px, Rechnung, 56 px). Der Pfeil
  ist seit 16.09.2026 mit Linien gezeichnet wie Plus/Minus, 26 × 19 px, Strich 3 px (Nutzer: „nicht aligned“):
  Hyperreadable hat kein „→“, das Ersatzzeichen aus Microsoft YaHei saß 2.3 px zu hoch und wäre am Handy eine andere
  Schrift. Gemessen per Pixelauswertung bei 360/393 px und Pixeldichte 2.25/2.75/3: genau mittig.
  **Gruppennamen in beiden Gruppenlisten gleich groß** (Nutzer, 16.09.2026): Deutsch 20 px, Chinesisch 17 px, für
  Getränke und Speisen (vorher Speisengruppen 19 px, der Name sprang beim Wechsel). Gemessen: bei 360 px alle zehn
  Speisengruppen einzeilig, knappste Rind & Schwein mit 11 px Luft; bei 393×740 px beide Listen ohne Scrollen.
- **Einheitlicher Rand (Nutzer, 16.09.2026, „überall einheitlichen linken und rechten Padding“):** ein
  Wert `--inset: 16px` für Kopfzeile, Tischplan, Gruppenlisten, Artikeltasten, Bestellt, Buffet,
  Rückgängig- und Verschieben-Streifen, Aktionsleisten, Rechnung, Getrennt, Heute; `--catalog-inset`
  zeigt darauf. Vorher 12 bis 22 px je Bildschirm. Gilt für beide Entwürfe.
- **Speisengruppen (Nutzer, 16.09.2026, endgültig):** 10 Gruppen, einspaltig, in dieser Reihenfolge: Suppen &
  Salate 汤和沙拉 (2 Suppen | 4 Salate), Snacks 小吃 (Frühlingsrollen, Hummerchips, Gebackene Banane,
  Knoblauchsauce), Sushi 4, Maki 6, Meeresfrüchte 5 (mit Gebackener Tintenfisch und Gebackene Garnelen), Gemüse 2,
  Huhn & Ente 鸡肉和鸭肉 (8 | 1), Rind & Schwein 牛肉和猪肉 (4 | 2), Reis 米饭 5, Nudeln 面条 3. Die chinesischen
  Gruppennamen sind die üblichen Wörter, nicht vorläufig.
  - Warum so: Zusammengelegt nur, was zusammengehört, mit bekannten Wörtern statt Oberbegriffen („Geflügel“,
    „Fleisch“, „Rind, Schwein, Ente“ verworfen). Sushi und Maki getrennt, sonst müsste man in der Gruppe scrollen.
    Vier Gruppen Huhn, Ente, Rind, Schwein wären „goofy“ und unruhig; zwei Spalten verworfen. Reis und Nudeln
    getrennt, Knoblauchsauce zu Snacks, Nachspeisen entfallen.
  - In zusammengelegten Gruppen trennt eine kleine graue Linie die Teile: `<hr>` (1 px, `--line`, je 8 px
    Abstand), festgelegt in `groupDividers` in `preview-menu.js`. Im Katalog sind die Teile eigene Gruppen (`soups`,
    `salads`); der künftige Bildschirm legt sie zusammen, die Linie steht dort, wo eine Kataloggruppe endet.
  - Gemessen auf 393×740 px: Gruppenliste 584 von 617 px, ohne Scrollen; in den Gruppen ist nur in Huhn & Ente
    Knusprige Ente verdeckt (Thai Curry Chicken 19 px), alle anderen ohne Scrollen. Kleinere Tasten (52 statt
    64 px) hat der Nutzer nicht aufgegriffen.
  - Bilder: Snacks ist das unveränderte EmojiTwo-Baguette 1f956 (`icons/wokflow/snacks.svg`, vom Nutzer gewählt;
    eine Frühlingsrolle gibt es weder in EmojiTwo noch in Unicode, und es gilt „nur Emojis aus dem Paket“). Reis
    `rice.svg` = EmojiTwo 1f35a, Nudeln `rice-noodles.svg`, Huhn & Ente das Huhn. `desserts.svg` (Banane) gelöscht,
    im Papierkorb und in Git noch vorhanden. Vorläufig bis zur Entscheidung: Suppen & Salate `starters`, Rind &
    Schwein `beef`; danach ungenutzte Bilder in `icons/wokflow/` samt Zeilen in `icons/sources.md` löschen
    (Nutzerwunsch).
  - Werkzeuge: Auswahlbilder als PNG schicken (mit Edge ohne Fenster gerendert), SVG-Auswahlblätter kamen beim
    Nutzer nicht an. `sed -i` zerstört in den CRLF-Dateien `screens.js`, `screens.css`, `preview-menu.js` die
    Zeilenenden; dort nur mit dem Edit-Werkzeug ändern.
- **Kartenpreise:** Limonaden/Apfel-/Orangensaft pur `0.25/0.5`: 3.10/4.50 €; mit Wasser
  `0.3/0.5`: 3.30/4.00 €; mit Soda: 3.80/4.20 €. Fruchtsäfte Erdbeere/Mango/Marille/Johannisbeere
  pur `0.2`: 3.50 €; Wasser `0.3/0.5`: 3.60/3.90 €; Soda: 3.90/4.30 €.
  Flaschenlimonade `0.35`: 4.10 €, Sorte noch erfassen. Zitrone 0.20 €; Extra-Eis zurückgestellt.
- **Buffet:** Hauptfall, laut Nutzer gefühlt 99 %. Getränke oft zuerst, Buffetanzahl erst beim Kassieren.
  Plus/Minus je Altersgruppe, unter drei Jahren kein Zähler. Andere Tarife bleiben getrennt auswählbar.
  Zähler, „Andere Zeiten“, Tarifboxen an den Gruppenlisten ausrichten: gemeinsame Seitenabstände
  von 22 px, auch bei 320 px Breite. Plus/Minus als geometrisch zentrierte Striche, unabhängig vom Schriftzeichen.
  Nur Name mit Chinesisch und Zeitspanne rechts daneben; kein zusätzliches Datum oder Uhranzeige.
  Buffet-Kopfzeile mit mehr Innenabstand: 14 px oben/unten, 16 px links/rechts;
  Außenabstände bleiben gleich (Nutzerkorrektur: Padding, nicht Margin).
  Mittag, Abend, Sonntag und Feiertag als vier getrennte Arten; Sonntag und Feiertag mit denselben Preisen,
  aber eigenen Mengen und Bestellzeilen. Graue Auswahlzeilen mit senkrecht zentriertem Pfeil, Namen und Zeit.
  Sonntag/Feiertag jeweils ganztägig 11:30–21:30; Mittag/Abend behalten ihre eigenen Zeitfenster.
  Kinderstufen: 6–9 „儿童“, 3–5 „小童“, ohne „Jahre“. Erwachsenenzähler beim Bestellen bleibt beschriftet.
- **Eine Buffetart je Tisch (Nutzer, 16.09.2026):** Die Kopfzeile „Sonntagsbuffet · 11:30–21:30“ ist
  aufklappbar und zeigt die vier Arten mit Zeiten; Antippen wechselt die Art, schon gezählte Personen
  wandern mit, weil je Tisch nur nach einer Art abgerechnet wird. „Andere Zeiten“ mit getrennten Zählern
  entfällt. Die spätere Automatik setzt die Art nach Datum und Uhrzeit vor; die Wahl bleibt, bis eine
  neue Zeit beginnt. Plus und Minus gleich groß und gleich grau; bei null ist Minus deutlich blasser
  (Nutzer, für Ältere erkennbar, ohne Rahmen). In beiden Entwürfen.
- **Buffettarife:** Mo/Mi–Sa mittags 11:30–14:30: Erwachsene 15.90 €, 6–9 Jahre 9.90 €, 3–5 Jahre
  5.90 €; abends 17:00–21:30 sowie sonntags/feiertags ganztags 19.90/12.90/7.90 €.
  Unter drei gratis; Dienstag geschlossen außer Feiertagen; kein eigener Freitagspreis.
- **Buffetautomatik noch Vorschlag:** Serverzeit `Europe/Vienna`, lokal hinterlegte Kärntner Feiertage,
  Tarif in Bonzeile festhalten. Außerhalb der Zeiten ausdrücklich wählen; bei unzuverlässiger Uhr oder
  fehlendem Kalender keine Automatik. Offen: Josefstag/Volksabstimmung sowie Vormerken des Tarifs beim
  ersten Bestellen, damit spätes Erfassen keinen Tarifwechsel verursacht.
- **Absenden am Rückweg:** Tischnummer/Escape sendet in der Demo neue Positionen. Eigener „Bonieren“-Knopf
  zuvor diskutiert; jetzt Rückweg über die umrandete Tischnummer gewählt. TOUCHIT-Handy macht es beim
  Rückweg (`Bonieren_3b.cs`, Methoden ab 3644/7167); Desktop-Escape nicht nachgewiesen.
- **Minus/Rücknahme:** in „Bestellt“ dauerhaft „Rückgängig“ bis zum Verlassen des Tisches,
  mehrere Schritte möglich, auch bei Buffetpersonen. Anzeige nur deutscher und chinesischer Name,
  ohne Mengenpräfix oder Wort „entfernt“. Im Auswahlfenster zusätzlich Rücknahme für bereits
  abgeschickte Portionen; bei der Korrektur neuer Portionen bleibt es ohne Rücknahmeleiste.
  Getrennt je Tisch. Kein Bestätigungsfenster, kein Wischen, keine zusätzlichen Stornobons.
  Bereits übernommene Vorgänge später nachvollziehbar im Journal behandeln; keine echte Löschung.
- **Schieben (Tischwechsel), Nutzerauftrag 15.09.2026, nach Nutzerwunsch vom 16.09.2026 umgebaut; Taste,
  Streifen und Fenster heißen seit 16.09.2026 abends „Schieben“ statt „Verschieben“ (Nutzer: kürzer, versteht
  jeder, Schrift 17 px wie die anderen Tasten):**
  In „Bestellt“ steht „Rechnung“ groß in der Mitte, links „Verschieben / 换桌“ mit fester Breite 104 px,
  rechts der Sprachknopf quadratisch 56 px, alle gleich hoch und unabhängig von der Sprache (Nutzer,
  16.09.2026, ersetzt den Wunsch nach drei gleich großen Tasten); „Verschieben“ ist bei leerem Tisch gesperrt. Es führt zum Tischplan mit dem
  Streifen „14 verschieben“ und „Abbrechen“, ohne Zusatzhinweis; der Quelltisch ist gestrichelt und nicht
  antippbar, Innen/Garten bleiben wählbar. Ein Tipp auf den Zieltisch öffnet ein Bestätigungsfenster:
  „Tisch 14 auf Tisch 12 verschieben?“ mit „Abbrechen“ und „Verschieben“; bei belegtem Ziel nur
  „Tisch 14 mit Tisch 3 zusammenführen?“ mit „Zusammenführen“, ohne Satz „ist belegt“ (Nutzer,
  16.09.2026). Fenstertext 22 px wie der Titel „Tische“. „Abbrechen“ lässt die Zielwahl offen, Escape
  schließt nur das Fenster. Verschoben werden alle Bestellzeilen und Buffetpersonen, auch noch
  nicht abgeschickte. Kein Rückgängig: Der Nutzer wollte statt des stehenbleibenden Rückgängig-Streifens
  die ausdrückliche Frage. Ob ein belegter Zieltisch erlaubt sein soll, ließ er offen; umgesetzt ist
  erlaubt, weil Gäste sich zu Bekannten dazusetzen, im Fenster als Zusammenlegen benannt. Weitere Wünsche
  vom 16.09.2026: das Wort heißt „Verschieben“, nicht „Umsetzen“; gestrichelter Tisch gut; Tische etwas
  kleiner, aber länglich, keine Quadrate, weil an den langen Seiten je zwei und am Kopf eine Person
  sitzen und unten die Trennung ist (Zeilen 60 bis 100 px groß, 46 bis 78 px normal, nie gestreckt, der
  Plan passt immer auf eine Seite); Kleintext 15 px.
  Nur ganze Tische; einzelne Artikel verschieben (TOUCHIT „Art.Transfer“) ist nicht gebaut und ginge
  später über die Auswahl des getrennten Kassierens. Im Browser geprüft: freier und belegter Zieltisch,
  Abbrechen im Fenster, Escape, leerer Tisch, 350 px Breite, keine Laufzeitfehler.
- **Mitnehmen (Nutzer, 16.09.2026):** eine eigene Taste im Innenplan, in der freien Fläche zwischen 24 und 18,
  zwei Spalten breit und 60 % der Zeilenhöhe, nur das Wort „Mitnehmen“ ohne Chinesisch in 18 px (Nutzer
  16.09.2026 abends: das Wort war zu groß, Mitnehmen kommt selten vor), als Platz für Gäste an der Theke, die nur
  Essen mitnehmen. Drinnen heißt sie „M“ (Nutzer: außen Mitnehmen, drinnen M, dann ist die Größe konsistent):
  Kennung `M`, Kopfzeile „M“ wie eine Tischnummer, in Heute „M“, in Rechnung und Fenster „Mitnehmen“. Die Taste
  steht mittig in der freien Fläche zwischen 24 und 18 (Nutzer 16.09.2026: mehr zentrieren, nicht gequetscht). Sie öffnet die
  Bestellung wie ein Tisch, der Reiter Buffet ist ausgeblendet, weil Buffet nicht mitgenommen wird; Getränke
  und Speisen teilen sich die Reiterzeile (Nutzer: nicht ausgrauen, weglassen). Beim Verschieben kann sie Quelle sein, aber kein
  Ziel. Im Entwurf grau gefüllt, belegt wie ein Tisch rot.
- **Getrennt kassieren:** Artikelauswahl mit Mengen, Rest bleibt offen, nach Teilzahlung zurück zur
  Auswahl, nach letzter Zahlung zum Tischplan. Ganze Rechnung bleibt der direkte Normalfall.
  Ausgewählte Zeilen vollständig rot umranden; Liste scrollt, Summe und Kassieren bleiben am Fuß.
  Kopfzeile beim Aufteilen, Rechnung, Kartenabschluss mit „Tisch 9“ beziehungsweise aktiver Nummer;
  Chinesisch entsprechend „9号桌“. 30 px, Gewicht 600 wie die Nummer beim Bestellen.
  Beim Bestellen bleibt die kompakte Nummer ohne „Tisch“ erhalten.
  Nur die Summe der Auswahl, keine zusätzliche Restbetrag-Zeile. Artikelname 18 px, verfügbare
  Menge 20 px links; Plus/Minus kompakt rechts in derselben Zeile, ausgewählte Menge 22 px.
  Verfügbare Menge nach links gerückt: 18 px vom Bildschirmrand wie die Mengen in der Rechnung,
  Artikeltext ab 50 px. Bei einstelliger Menge rund 19 px sichtbarer Abstand zum Namen.
  Äußerer Zeilenrand 14 px, Namen erhalten mehr Platz; keine Verklebung von Menge und Artikeltext.
  Sichtbare Regler 30 × 30 px, rechteckige Tippflächen 44 × 44 px. Keine eigene Reglerzeile mehr.
  Lange Namen dürfen logisch umbrechen: Zusätze wie „+ Wasser“, „+ Zit“, Stückzahlen bleiben zusammen;
  „mit“/„und“ bleiben beim folgenden Wort, „süß-sauer“ bleibt zusammen. Bambus-/Ginsengschnaps
  bei Bedarf am Wortbestandteil trennen. Keine willkürliche Trennung mitten im Wort.
  Alle 54 Speisenvarianten geprüft: bei 393 px höchstens zwei Zeilen; bei 320 px Huhn mit Bambus
  und Pilzen sowie Rind mit Zwiebeln und Paprika drei Zeilen. Chinesische Speisen passen in eine Zeile.
  Insgesamt 189 Einträge einschließlich langer Getränkezusätze auf 320/393 px in beiden Sprachen
  ohne Überlauf geprüft. Keine Schriftverkleinerung zur Erzwingung einer Zeile.
  Teilzahlung, Plus/Minus, Sprachwechsel, Rückgeld, anschließende Kartenzahlung geprüft.
  Beim Bezahlen einer Auswahl bleibt anstelle der ausgeblendeten Getrennt-Taste nur die leere
  Umrandung erhalten; rein dekorativ, ohne Tippfunktion oder Tastaturfokus.
  Rechnung mit festen Spalten für Menge, Name, Betrag, Artikelschrift 18 px,
  Mengen 22 px ohne „×“, Beträge rechts ohne Umbruch.
  Vorläufiger Vorschlag als klickbare Demo: eine aktive Sprache für den gesamten Zahlungsablauf,
  Deutsch ist beim Öffnen der Standard, auch in „Bestellt“. Überall nur ein Sprachknopf:
  „DE“ zeigt Deutsch, „CN“ zeigt Chinesisch; Tippen wechselt zur anderen Sprache.
  Sprachumschalter im selben Stil wie „Zurück“: weißer Hintergrund, kräftiger grauer Rand, gleiche Rundung.
  In der Rechnung oben direkt neben „Zurück“, in den übrigen Zahlungsschritten neben den Aktionen,
  auch im Rechner; mindestens 44 × 44 px Tippfläche. **Seit 16.09.2026 nur noch in „Bestellt“ (Nutzer):**
  Die Sprache wird vorher eingestellt; Rechnung, Getrennt, Bar, Karte und Gutschein übernehmen sie ohne
  eigenen Knopf, in beiden Entwürfen.
  Die Wahl bleibt beim Aufteilen, in der Rechnung, bei Bar/Karte, nach einer Teilzahlung erhalten.
  Umstellen verändert keine Auswahl, Zahlbeträge oder Eingaben. Die Sprachwahl gilt gemeinsam für
  Bestellt-Liste, Rechnungsbutton, Aufteilen, Rechnung, Bar/Karte, Gutschein. Deutsch bleibt Standard.
  Die Reiter Bestellen/Bestellt bleiben oben, zweisprachig; die Artikelauswahl bleibt zweisprachig.
  Bei der Rückkehr vom Bezahlen passen sich lange Bestellnamen erneut an die gewählte Sprache an.
  Auf 320/393 px geprüft: Kopfzeile unverändert, Rechnungsbutton einsprachig, Sprache übernommen,
  Rückgeld-Eingaben, ausgewählte Teilmengen beim Umschalten erhalten.
  Chinesische Rechnungsnamen enthalten ebenfalls Größe, Wasser/Soda, Zitrone in Plus-Schreibweise.
  Buffetnamen wie in Bestellt: ohne „Erwachsene“, Kinder mit Altersgruppe.
  Zahlung öffnet über „Bar“ den Barabschluss mit „Abschließen“, Kartenabschluss heißt „Fertig“. Kein doppelter Einstieg
  „Getrennt kassieren“ auf der Zahlungsseite; „Zurück“ führt auch bei gesamtem Rest zur Mengenauswahl.
  Karte, Gutschein, „Getrennt“ jeweils in der aktiven Zahlungssprache; kurze Taste „Getrennt“/„分开“.
  Rechnung mit festem Fußbereich: ganz unten große Tasten „Bar“/„Karte“ nebeneinander,
  darüber „Gutschein“/„Getrennt“ in zwei gleich breiten, sprachunabhängigen Feldern,
  bündig zu Bar/Karte. Sprachknopf oben neben „Zurück“. Zwei Tastenreihen statt drei, mehr Platz für die Liste.
  Gutschein, Getrennt, dessen leere Umrandung bei Teilzahlung haben denselben kräftigen grauen Rand wie Karte.
  Zusatzfelder überall 44 px hoch; dank kurzer Beschriftung auch auf schmalen Geräten einzeilig,
  gleiche Größe in Deutsch/Chinesisch. „Gutschein“ dadurch breiter als im vorigen Entwurf.
  Artikel scrollen ausschließlich im eigenen Bereich; 10 px Abstand, graue Trennlinie vor den
  Zahlungstasten verhindern Überlagerung; Sprachwechsel verschiebt keine Tasten.
  Rechnungsbetrag größer, ohne zusätzliche graue Rechnungs-/Tischzeile darunter.
  Gutschein öffnet ein kompaktes Betragsmenü mit denselben Zahlentasten wie Bar: Wert eintippen,
  verbleibenden Zahlbetrag sofort sehen, „Anrechnen“. In der Rechnung steht dann der Restbetrag groß,
  der Gutscheinabzug über den Zahlungstasten. Bar/Karte übernimmt ausschließlich diesen Rest.
  Bei voller Deckung ersetzt „Abschließen“ die Bar-/Karte-Tasten. Gutschein erneut öffnen zum Ändern
  oder Entfernen; Schließen, Escape, Außentippen verwerfen nur die noch nicht übernommene Eingabe.
  Übersteigt der Gutschein die Rechnung, erscheint „Gutscheinrest“; keine Auszahlung als Rückgeld.
  Demo-Belege behalten den vollen Artikelbetrag sowie getrennte Gutschein-/Bar-/Kartenanteile;
  ungenutzter Gutscheinwert ebenfalls nur im flüchtigen Demo-Beleg. Keine echte Einlösung oder Speicherung.
  Gleicher Ablauf für Teilrechnungen, keine Übernahme des Gutscheins in die nächste Auswahl oder
  an einen anderen Tisch. „Heute“ kennzeichnet Gutschein, Bar + Gutschein, Karte + Gutschein.
  Im Edge-Browser bei 320 × 640 sowie 393 × 740 visuell geprüft, Tasten mindestens 44 px hoch;
  Teil-/Volldeckung, Restguthaben, Korrekturen, Sprachwechsel, Rückgeld, Kartenrest, Teilzahlung geprüft.
  Rückgeldrechner in diesen Ablauf integriert: kein separater Rechnerknopf neben „Bar“.
  Neue Reihenfolge: zuerst „Zahlbetrag“, mit der Rechnungssumme abzüglich Gutschein vorausgefüllt. Ohne Änderung
  übernehmen oder den Gastwunsch eintippen, etwa 59.70 → 60 €. „Übernehmen“ öffnet danach „Gegeben“.
  Zahlbetrag bleibt darüber sichtbar, weiterhin korrigierbar; Rückgeld wird nach Eingabe sofort berechnet.
  Ohne Rückgeldberechnung direkt „Abschließen“, auch schon vor „Übernehmen“.
  Oben nur „Rückgeld“ in der aktiven Sprache, offener Rechnungsbetrag daneben groß:
  34 px, bei schmalen Geräten 30 px; die zusätzliche Beschriftung „Rechnung“ entfällt.
  Eigene große Zahlentasten, Dezimalpunkt, Rücktaste; Eingabefelder mit `inputmode="none"`,
  damit keine zusätzliche Handytastatur nötig ist. Normale Tastatur/Eingefügtes ebenfalls unterstützt,
  Komma wird zum Punkt. Leeres „Gegeben“ erlaubt den schnellen Abschluss, Zahlbetrag bleibt gültig.
  Der bisherige Aufrunden-Knopf mit automatischem Vorschlag ist entfernt.
  „Gegeben“ minus gewünschter Zahlbetrag ergibt Rückgeld. Zu wenig gegeben zeigt „Fehlt“;
  ungültige Beträge oder ein Zahlbetrag unter dem offenen Rechnungsbetrag verhindern den Abschluss.
  Rechnung bleibt beim ursprünglichen Betrag, Barumsatz berücksichtigt den Gutscheinabzug; keine Speicherung von Bargeldtrinkgeld,
  gegebenem Betrag oder gewünschtem Zahlbetrag. Rechnen in ganzen Cent, keine Gleitkomma-Differenzen.
  Schließen, Escape, Außentippen brechen ab; bei neuer Rechnung, Tischwechsel, erneuter Teilzahlung
  werden die Eingaben verworfen. Gleicher Ablauf für ganze Rechnung oder ausgewählte Teilrechnung.
  Navigationslinks „Tische“, „Heute“, „Zurück“ außerhalb des Zahlungsablaufs mit kleinem Chinesisch daneben;
  reine Zurückpfeile in den Artikelgruppen bleiben ohne zusätzlichen sichtbaren Text.
- Rechnung und Teilzahlung verwenden jetzt **die tatsächlichen Artikel, Buffetmengen und Preise des
  geöffneten Tisches**. Die unabhängige feste Teilrechnungsdemo ist entfernt; nur bezahlte Mengen werden
  abgezogen, der Rest bleibt auf demselben Tisch. Nach der letzten Zahlung wird er frei.
  Neue Demo-Abschlüsse erscheinen in „Heute“. Kein echter Druck, keine echte Nexi-Verbindung.
  Karten-Trinkgeld von 3.30 € bleibt als ausdrücklich dargestelltes Beispiel im Kartenablauf.
  Preiszuordnung in `tmp/preview-menu.js` aus der Speisekarte 2026, PDF-Seiten 2–6 gelesen und visuell geprüft;
  Buffet nach Seite 1 und bestätigten Kinder-/Feiertagsregeln. Fehlende Preise werden nicht als null behandelt.
- „Heute“: nur die Rechnungsliste, keine Summen für Bar/Karte, keine Rechnungsanzahl im Service-Handy.
  Größere Schrift: Tischnummer 19 px, Betrag 20 px, Uhrzeit/Zahlart 16 px, Titel 22 px.
  Bar/Karte am Handy nur lesbar, kein versehentliches Umschalten. Endgültige Berechtigung
  für spätere Korrekturen bleibt offen. Tagesabschluss ausdrücklich nur Chef: eigener Entwurfsaufruf
  `?chef=1#closing`, kein Einstieg vom Handy. Dieser Vorschauparameter ist **keine echte Rechteprüfung**.
  Erfolgstext „Von Nexi bestätigt“ entfernt; bestätigte Zahlung bleibt fachlich nötig.

### Tischplan und Schrift

- Zwei Bereichstasten Innen/Garten; Raum als Abschnitt über Garten, zusammen auf einem Bildschirm.
  Auf Handy und PC dieselbe Anordnung. Schlichte Rechtecke; keine Stühle, Bänke oder
  Buffet-Möbel zeichnen, keine Beträge, Zeiten, Belegtpunkte oder Frei/Belegt-Legende.
  Vier graue Trennlinien markieren die Innenbereiche: zwischen 11/10/9 und 12/13/14,
  zwischen 8/7 und 15/16, unter 12/13/14 vor 21/22, unter 15/16 vor 19/17.
  Wie der Gang als 1-px-Rand in `var(--border)` gezeichnet, ohne weichzeichnenden Transform.
  Zwischen der obersten Tischreihe 1–6 und der unmittelbar darunterliegenden Reihe nur 10 px
  Abstand, weil sie zusammengehören. An den Abschnittslinien bleiben 18 px, Linien mittig
  mit Weißraum oben/unten; auf Handy/PC dieselbe Anordnung.
  Auf 320×640/393×852 px geprüft: gesamter Tischplan passt, Tischtasten mindestens 44 px hoch,
  Unterkanten von 20/23 bleiben gleich. Tischanordnung erhalten; Höhen passen sich dem Platz an.
  Laut Nutzer KI-generiertes Asia-Wok-Logo aus `WokFlow/icons/asiawok/logo.svg` unten rechts, etwas kleiner,
  Eigentümer laut Nutzer: ASIA WOK Restaurant GmbH; in der Quellenliste als Eigentümer aufführen.
  höchstens 140 px breit. Neuester Nutzerwunsch: nicht in die Mitte zwischen die Tische quetschen.
  Mindestens 36 px Abstand zu Tisch 18, 56 px zu Tisch 20 auf den geprüften Handygrößen;
  mit Abstand zum Bildschirmrand. Auf Handy/PC unverzerrt, ohne Rahmen oder Tippfunktion.
  Bei 320×640/393×740 px visuell geprüft, keine Überlagerung, keine Verschiebung der Tischanordnung.
- Quellen unverändert in `tmp/references/`: `table-plan-indoor-2026-09-14.jpeg`,
  `table-plan-garden-2026-09-14.jpeg`, `table-7-2026-09-14.png`, `tables-10-11-2026-09-14.png`,
  `benches-2026-09-14.png`, `table-16-2026-09-14.png`; Kopien per Hash geprüft.
- Neue Referenz vom Nutzer: `C:/Users/Vu/Downloads/WhatsApp Unknown 2026-09-15 at 00.13.11`.
  29 Bilder einschließlich WhatsApp-Erklärungen angesehen; drei Videos anhand von je sechs Einzelbildern geprüft.
  Laut beigefügtem chinesischem Text ist 18/19 ein langer Tisch für zehn Personen (2+4+4), 20 ein Zweiertisch,
  21/22 normale Tische und 23/24 zusammengestellt. 16/17 normalerweise in einer Flucht; die Richtung in der
  Draufsicht ist daraus nicht eindeutig. Keine automatische Verschiebung entgegen der letzten Nutzeranordnung.
  Empfehlung: schlichte Geometrie beibehalten, höchstens Proportionen angleichen (18/19 etwas länger als 23/24);
  keine erneuten Stuhl-/Bankzeichnungen. Tischplan aufgrund dieser Aufnahmen noch nicht verändert.
- Innen oben 1/2/3/4/5/6; darunter 11/10/9/Gang/8/7, dann 12/13/14/Gang/15/16.
  1–5 dieselbe Tastengröße wie 12–16; Tisch 6 so klein wie Tisch 7, oben bündig mit 1–5 (Nutzer, 16.09.2026). Neueste Korrektur: 20er-Gruppe wieder ganz links;
  21/22 oben, 24 über 23 unter 21, Tisch 20 rechts daneben mit gleicher Unterkante wie 23.
  19 über 18 senkrecht rechts unter 15, 17 auf Höhe von 19 daneben. Gleiche Abstände zwischen 21/22 und 24/23.
  20 kleiner (1+1), 21/22 Vierertische, 12–16 Sechsertische,
  1–6 und 7–11 gewöhnlich 2+2; 1–6 eng bis 3+3, 17 im Entwurf normal.
- 18, 19, 23, 24 haben jeweils eine eigene Taste, eigene Bestellung. Keine Auswahl „Ganz“,
  keine gemeinsamen Buchungsnummern 18/19 oder 23/24, keine Nummer 25. Räumliche Anordnung bleibt:
  19 über 18, 24 über 23. Für eine gemeinsame Gästegruppe wird eine der beiden Nummern verwendet.
- Raum: 33/34/30 über 32/31/35, gleiche Rechtecke. Garten: G12/G11, Gang/Haupteingang, G1/G2/G3/G4;
  unten G15/G16 links, G9 unter G2, G8 unter G3. G = Garten; Gang weiterhin zwei schlichte Linien,
  jetzt mit seitlichem Weißraum zu den Tischen. Auf sehr schmalen Ansichten schrumpft die Gangspalte mit.
  Nummer 9 und G15/G16 weiterhin vorläufig, Nutzerbestätigung offen.
- **Schrift gewählt: Hyperreadable**, ausdrückliche Korrektur des Nutzers, nicht IBM Plex Sans.
  Lokal mit Lizenz; die verworfenen Schriftvergleiche sind aus dem Entwurf entfernt.
  Tischnummer Gewicht 600, 30 px; Mengen in Bestellt ebenfalls 600, sonst 400/500.
  Chinesisch nutzt bisherige Ersatzschriften.
  Handyvorschau schmaler: am Desktop höchstens 412 px breit und 920 px hoch; auf Handys die verfügbare
  Bildschirmfläche verwenden. Artikelschrift Deutsch bei Getränken 20 px, Speisen 19 px,
  Chinesisch 17 px, weniger Innenabstand,
  mindestens 78 px Tastenhöhe bei Getränken, 64 px bei einspaltigen Speisen; Text darf bei Bedarf umbrechen.
  Gruppenliste weiter eingerückt. Mengen in „Bestellt“ jetzt 24 px statt 16 px, Platz für mehrstellige Mengen.
  Namen in „Bestellt“ bis 20 px; längere Zeilen nach tatsächlicher Textbreite kleiner. Buffetüberschrift 20 px,
  Altersgruppen 18 px, chinesische Zählertexte 16 px,
  graue Buffetauswahl 17 px. Rücknahme deutscher Name 16 px, chinesischer Name 14 px.
  **Buffet größer (Nutzer, 16.09.2026):** Zähler „can be much bigger“, muss bei 360 px passen; danach Altersgruppen „so
  groß wie Sonntagsbuffet“ und der graue Kasten ebenfalls größer. Jetzt Buffetname, Zeit, Altersgruppen 22 px, Chinesisch
  18 px in eigener Zeile (daneben brach „Erwachsene 成人“ um), Zahl 34 px halbfett, Plus/Minus 56 × 56 px mit Strichen
  20 × 3 px. Im Kasten Abstand Name–Zeit 8 statt 10 px, Pfeil ohne Zusatzabstand; sonst hätten Sonntags- und
  Feiertagsbuffet bei 360 px nur gut 1 px Luft (jetzt rund 5 px). Geprüft bei 360 px: alles einzeilig, Ränder 16/16 px,
  Zeilen 85 px, Buffetbereich endet bei 489 von 800 px. „Getrennt“ nutzt dieselbe Zeilenklasse, behält eigene Größen.
  **Klartext unter einem Kasten** (Nutzer, 16.09.2026): Altersgruppen am Rand (16 px) wirkten unter dem Buffetkasten zu
  weit links, bündig mit „Sonntagsbuffet“ (33 px: Rand 16, Rahmen 1, Innenabstand 16) „too inside“. Jetzt 8 px
  eingerückt, Text bei 24 px; dem Nutzer 20/24/28 px als Bild gezeigt. Aufgeklappte Buffetarten sind Kästen und fluchten
  mit „Sonntagsbuffet“ (Innenabstand 16 statt 14 px). Kästen, Trennlinien, Plus-Tasten bleiben bündig bei 16 px.
  Roter Akzent zusätzlich bei aktivem Bestellen/Bestellt-Reiter und den Mengenfeldern, keine satten Flächen.
- Quelle der gewählten Schrift: [Hyperreadable](https://github.com/MadSimple/hyperreadable).
  Unveränderte Schnitte Regular/Medium/SemiBold samt OFL liegen in `WokFlow/fonts/`, keine Systeminstallation.
  Kommerzielle Verwendung geprüft: Hyperreadable unter SIL OFL 1.1, Copyright/Lizenz bei Weitergabe behalten;
  EmojiTwo-Grafiken unter CC BY 4.0 mit Urheberangabe, Lizenzlink, Kennzeichnung der Anpassungen.
  Originallizenzen bleiben bei den Dateien; Herkunft, Anpassungen stehen in `WokFlow/icons/sources.md`.
- **Bestellansicht C gewählt:** volle Bestellfläche oder volle Bestellliste über zwei Reiter.
  Direkt im Hauptentwurf integriert, Rückweg zum Tischplan ohne Seitenneuladen; Bestellungen je Tisch bleiben erhalten.
  Gruppe und Scrollposition beim Hinzufügen bzw. Reiterwechsel behalten. Buffet erscheint ebenfalls in Bestellt.
  Alte Layout-/A/B/C-Vergleiche einschließlich `bestellen_varianten.html` auf Nutzerwunsch gelöscht.
  Keine parallelen Layoutkopien oder Weiterleitungsdateien.
  `tmp/preview-menu.js` bleibt ausschließlich Vorschau-Daten, noch keine Anbindung an `src/catalog/`.
  Rechnung und Teilzahlung sind mit den lokalen Tischbestellungen verbunden; Tagesabschluss bleibt ein
  eigenes Chef-Layoutbeispiel. Keine echte Zahlung oder Druck.
- Frühere Prüfstände: JavaScript-Syntax, HTML-Verschachtelung und 53 Prüfungen im DOM-Modell bestanden;
  Preisabdeckung für alle 189 angebotenen Artikelvarianten geprüft. Darunter Cola/Zero/Light,
  Mengenfeedback, Gruppenstart, fünf Maki-Portionen mit zwei bezahlt und drei verbleibend, Buffet-Teilzahlung,
  getrennte Tischzustände, mehrfacher Abschluss, Heute und Trennung zwischen Handy- und Chefansicht.
  Am 15.09.2026 zusätzlich im lokalen Edge-Browser tatsächlich gerendert, vermessen und anhand von Screenshots geprüft:
  320×640, 360×800, 390×844 und 412×915 px, jeweils 19 Gruppen, 96 Artikel und 28 Auswahlfenster.
  Kein horizontaler Überlauf in diesen Prüfungen; längere Speisenbeschriftungen und Auswahlnamen dürfen umbrechen.
  Gruppen-Textblöcke unter 1 px von der Zeilenmitte; anfänglichen Versatz von rund 5 px korrigiert.
  Nach den neuesten Korrekturen 26 Browserprüfungen für Entfernen innerhalb der Auswahl, kleine Mengenfelder,
  ausgeblendete Null, Direktartikel, Bestellt-Minus/Rückgängig, getrennte Buffetarten und Teilzahlung bestanden.
  Damalige Fassung zusätzlich mit je 24 Browserprüfungen auf 320/360/390/412 px geprüft:
  kompakte Kopfzeile einschließlich Tisch 18/19, Kategorienstart, große Namen, Sprachwechsel ohne
  Bestelländerung, Größen/Zusätze auf Chinesisch, Buffetzeiten/Kinderstufen, dreimal Cola im offenen
  Menü, Minus/Rückgängig. Größen in der Tastenmitte unter 0.1 px Abweichung, keine Überdeckung durch
  gefüllte Mengenfelder. Leitungswasser/Johannisbeere passen ab 390 px ohne Zeilenumbruch.
  Bildsymbole aller 19 Gruppen ohne Textüberdeckung; Beilagen mit Banane, gleiche Buffet-/Artikelabstände
  ebenfalls auf 320/360/390/412 px im Browser geprüft.
  Umsortierung der sieben bisherigen Spezialitäten auf 320/390 px geprüft: jeder Artikel genau einmal,
  alle sieben buchbar, Meeresfrüchte mit chinesischem Gruppennamen, passendem Bildsymbol ohne Überdeckung.
  Keine zusätzliche Bibliothek, kein App-Server oder Projekt-Testskript, keine neuen Testdateien.
- Prüfstand vor dem Bildwechsel, 15.09.2026: 298 buchbare Artikelkonfigurationen einschließlich Zitronenzusätzen
  sowie zwölf Buffet-/Alterskombinationen in „Bestellt“ auf 320/360/390/412 px in beiden Sprachen geprüft:
  alle Namen vollständig in einer Zeile. Deutsch je nach Breite mindestens 13.8/16.5/18.5/20 px,
  Chinesisch mindestens 15.5/18.5/20/20 px; lange Namen auf schmalen Geräten entsprechend kleiner.
  Buffet und Gruppenlisten exakt gleich um 22 px eingerückt, Tischnummer mit mindestens 64 px eigenem Platz,
  Plus-/Minusstriche geometrisch mittig. Alle 19 lokalen Bildsymbole geladen, keine Überdeckungen.
  Popup am Desktop 364 px breit bei 412 px Handyvorschau; Innentippen bleibt offen, Außentippen schließt.
  Futo Maki mit (10) in derselben Zeile; Sushi-Sets mit übersetzter Zusammensetzung in zweiter Zeile.
  Bestellt-Sprachschalter neben Rechnung, Heute ohne Statistiken, 18/19/23/24 mit unabhängigen Bestellungen.
  Rechnungsmengen und Beträge ohne Umbruch oder Spaltenüberdeckung auf allen vier Breiten;
  Namen beim getrennten Kassieren auch bei 320 px einzeilig. Ablauf im Browser geprüft: zwei Red Bull
  auf Tisch 23 in zwei Bar-Teilzahlungen kassiert, nach erster Zahlung eine Portion übrig, nach zweiter
  Tisch frei, Tisch 24 unverändert, beide Belege unter Heute sichtbar. Keine JavaScript-Laufzeitfehler.
- Prüfstand nach dem ersten Bildwechsel im Edge-Browser auf 320/390/412 px: alle 20 Bilder geladen;
  Tischnummer mindestens 64 px, neue Reiter 18 px, Rückweg über 14 und G15 ohne Überlauf.
  Almdudler 0.3 mit Soda/Zitrone nach Tischwechsel über die Zahl entfernt, rückgängig gemacht;
  0.5 unverändert, neue Portionen vor abgeschickten korrigiert, Versandstatus korrekt wiederhergestellt.
  Popup samt Rücknahmeleiste ohne horizontalen Überlauf. Sichtbare Bestellt-Zeilen enthalten „+ Zit“.
  Alle Saftnamen ohne Pago, Gruppentitel „Weine“, Banane nur in Nachspeisen, weiterhin 3.10 €.
  Screenshots der Gruppen, aller Symbole, Bestellt, Rücknahmeleiste visuell geprüft; keine Laufzeitfehler.
- Nach Zusammenlegen von Beilagen mit Reis & Nudeln auf 320/390 px geprüft: 19 Bilder geladen,
  Danach alle 19 Motive einzeln optisch skaliert: 24–32 px, gemalte Bildmitten innerhalb von 1 px zur Zeilenmitte,
  keine überlaufenden Gruppenzeilen. Die Flasche sichtbar etwa 28 × 30 px statt zuvor 15 × 24 px.
  Weiterhin 96 eindeutige Artikel; alle vier verschobenen Artikel direkt mit korrektem Preis buchbar.
  Gruppen, neue Flasche, Symbole, Reis-&-Nudeln-Liste, Tischplan per Screenshot geprüft, keine Laufzeitfehler.
  Nach optischer Angleichung Gruppen erneut auf 320/390 px gerendert, angesehen, nachgemessen.
- Nach Zitrone-Umstellung geprüft: zuerst buchen, einmal ergänzen, danach ohne Zitrone weiterbuchen;
  gemischte Mengen, Doppelklickschutz, andere Größen, Cola/Zero/Light, Schließen/Öffnen, Tischtrennung,
  bereits abgeschicktes Almdudler/Soda mit Rücknahme und anschließender neuer Portion. Gesamtmengen,
  Zuschlag, Versandstatus korrekt; Vibrationsaufruf geprüft, tatsächliches Handygefühl noch nicht getestet.
  Erneut alle 298 buchbaren Kombinationen plus zwölf Buffet-Zeilen in DE/中文 auf 320/360/390/412 px,
  jeweils mit Menge 1 und 12 geprüft: eine Zeile, kein Abschneiden, keine Überschneidung mit Minus.
  Schriftanpassung nutzt echte Teilpixelbreite. Längster deutscher Name: Johannisbeere 0.3/0.5 + Wasser + Zit;
  bei 320 px mindestens 13.8 px, bei 360 px 16.5 px, bei 390 px 18.6 px, bei 412 px durchgehend 20 px.
  Chinesisch mindestens 15.8 px bei 320 px, ab 390 px durchgehend 20 px. Screenshots angesehen, keine Laufzeitfehler.
- Cola/Saft nach Entfernen der Milchschaumreste vergrößert, im 390-px-Menü visuell geprüft;
  sichtbare Bildmitten mit höchstens 0.04 px Abweichung ausgerichtet. Plus-Schreibweise in beiden
  Rücknahmeleisten für Cola/Wasser, Johannisbeere/Soda, Almdudler/Soda mit Zitrone geprüft;
  Rücknahme stellt Mengen, Versandstatus wieder her, Buffetnamen bleiben korrekt.
  Vier Sushi-Set-Zeilen mit „卷“, ohne Klammern bei 320 px vollständig einzeilig;
  separate Maki-Angaben (10), (18) erhalten. Screenshots angesehen, keine Laufzeitfehler.
- Nach Vereinheitlichung auf EmojiTwo alle 19 Motive auf Weiß vergrößert, in den Menüs bei 320/390 px
  visuell geprüft: helle Konturen erkennbar, keine angeschnittenen Grafiken, Bildmitten innerhalb 0.4 px,
  keine Laufzeitfehler. Vollständige Bibliothek mit 2.789 SVGs, Lizenz, README byteweise gegen die
  bezogene Originalrevision verglichen; alle Kopien identisch.
  Temporärer Downloadklon unter
  `C:/Users/Vu/.codex/visualizations/2026/09/14/01a0a0fe-5ced-7ed3-b1a3-2bda1d894eeb/wokflow-layout-review/emojitwo-source`
  noch vorhanden: automatische Freigabeprüfung blockierte dessen Löschung („blocked by policy“).
  Eigene Prüfbilder entfernt; dauerhafte Sammlung im Projekt vollständig.
- Barabschluss im Edge-Browser geprüft: direkter Abschluss ohne Eingabe, Zahlentasten per Touch,
  Einfügen/Löschen am Cursor, Dezimalpunkt/Komma, ungültige Eingaben, Fehlbetrag, gewünschter Zahlbetrag,
  Abbrechen per X/Escape/Außentippen, Rücksetzen nach Rechnungs-/Tischwechsel.
  Neue Reihenfolge ebenfalls geprüft: 59.70 € vorausgefüllt, über Zahlentasten durch 60 ersetzt,
  übernommen, 100 € gegeben → 40 € Rückgeld. Zahlbetrag nachträglich korrigierbar,
  Direktabschluss vor Übernehmen oder ohne Gegeben möglich. Frühere Centprüfung: 0.30−0.10 → 0.20 €.
  Teilzahlung 4.50 € mit Aufrundung auf 5 € bucht genau 4.50 €, lässt 62.20 € offen;
  Doppelklick erzeugt keinen zweiten Beleg. Vollzahlung leert nur den aktuellen Tisch,
  nächste Teilzahlung startet ohne vorige Eingaben, Kartenablauf weiterhin geprüft.
  Auf 320×640/390×844 px gerendert, Screenshots angesehen: kein Überlauf, Zahlentasten mindestens
  44 px hoch, auch 99999.99 passt. Keine JavaScript-Laufzeitfehler, keine Projekt-Testdateien.
  Unterdrückung der Bildschirmtastatur auf einem echten Android-Gerät noch nicht geprüft.
- Nach dem Verschieben geladen: 19 Menügrafiken, drei Hyperreadable-Schnitte. Auf 320/360/393/412 px
  alle 121 Variantenoptionen, 96 Artikeltasten mit zweistelligen Mengen geprüft: keine Überlagerung
  zwischen Mengenfeld und Artikel-/Variantenbeschriftung. Sichtprüfung am Handyformat, kein echtes Redmi-Gerät.
  Touch an allen vier Ecken der 48-px-Mengenfläche, Mitte, Null-Ausblenden, Soda/Zitrone,
  Korrektur abgeschickter Mengen mit Rücknahme im Edge-Browser geprüft.
  Sprachwechsel im Zahlungsablauf mit Teilzahlung ebenfalls auf 320/393 px geprüft;
  Auswahl, Beträge, Eingaben bleiben erhalten. Je Sprache 181 Rechnungs-/Aufteilungspositionen
  ohne Textüberlauf geprüft, ganzer Kartenabschluss, direkter Barabschluss weiterhin funktionsfähig.
  Vier Hyperreadable-Dateien mit ursprünglichen Git-Dateien verglichen, unverändert.
  Eigene Prüfbilder dieses Durchgangs entfernt.
- Gestaltung orientiert sich an W3C-Hinweisen zu
  [Farbe](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html),
  [Textkontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
  [Bedienelement-Kontrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
  [Touchzielen](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) und
  [Rücknahme](https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html).
  Rot/Grau ist ein Gestaltungsvorschlag, kein belegtes „freundlichstes“ Farbschema.

### Geldbeträge: Bibliotheksauswahl, 14.09.2026

Der Nutzer möchte eine moderne TypeScript-Bibliothek, die auch größere Programme verwenden, und
beauftragt die Auswahl. Für WokFlow ist **Dinero.js 2** gewählt: Geldbeträge mit Währung, Berechnungen,
Rundung und Ausgabe; passt zu den bereits vereinbarten Preisen in ganzen Euro-Cent. Die frühere
Möglichkeit `decimal.js` ist damit ersetzt. Geprüfter stabiler Stand: **2.0.2**, veröffentlicht am
13.03.2026; npm bestätigt diese Version, mit eigenen TypeScript-Typen und Node >= 20.
Quellen: [Dinero.js](https://www.dinerojs.com/),
[Version 2.0.2](https://github.com/dinerojs/dinero.js/releases/tag/v2.0.2).

Kein allgemeingültiger Branchenstandard und kein belegter Beliebtheits-Spitzenplatz: Der Nutzer hat
ausdrücklich nach der Verbreitung gefragt. Die abgerufenen npm-Seiten zeigen deutlich mehr wöchentliche
Downloads für [decimal.js](https://www.npmjs.com/package/decimal.js?activeTab=readme)
als für [Dinero.js](https://www.npmjs.com/package/dinero.js?activeTab=readme).
Das sind unterschiedlich breite Einsatzgebiete: decimal.js ist allgemeine Dezimalrechnung, Dinero
ergänzt Währung und Geldfunktionen. Downloadzahlen sind keine Zahl eindeutiger Nutzer oder Kassensysteme.
Die Empfehlung Dinero beruht auf diesen Geldfunktionen, TypeScript-Unterstützung und belegter Nutzung,
nicht auf einem behaupteten Marktführerstatus.
Die aktuelle [WooCommerce-Abhängigkeitsdatei](https://github.com/woocommerce/woocommerce/blob/trunk/pnpm-lock.yaml)
enthält `dinero.js` mit Vorgabe `^2.0.0` und aufgelöster Version `2.0.2` (am 14.09.2026 direkt gelesen).
TOUCHIT enthält viele eigene Zahlen-/Textumwandlungen; WokFlow verwendet eine gemeinsame
Geldbibliothek. Die konkrete Rundungsregel und der Rundungszeitpunkt werden am Rechnungsablauf geklärt.

Für die geplanten Geldberechnungen ist kein zusätzliches `decimal.js` nötig. Dinero stellt auch
Bruchteile eines Cents als ganze Zahl mit `scale` (Anzahl der Nachkommastellen) dar, z. B. 3505 bei
`scale: 3` für 3.505 €. Faktoren mit Nachkommastellen werden ebenfalls so übergeben, z. B.
`{ amount: 15, scale: 1 }` für 1.5; Zwischenrechnungen können zusätzliche Stellen behalten.
Quelle: [Dinero-Nachkommastellen](https://www.dinerojs.com/faq/can-i-multiply-by-a-decimal).

Vom Nutzer am 14.09.2026 installiert: `dinero.js` steht unter `dependencies` mit `^2.0.2`;
`package-lock.json` und das installierte Paket bestätigen Version 2.0.2 (Dateien gelesen).
In `commands.md` stehen Entwicklungswerkzeuge (`npm install -D typescript @types/node@26`) und
Dinero (`npm install dinero.js@2.0.2`) getrennt: `-D` gilt für alle Pakete eines Aufrufs, Dinero
wird auch im laufenden Kassensystem gebraucht. Der Startbefehl lautet dort ausführbar `npm start`.
Verwendung im Artikelkatalog, siehe „Artikel und Gruppen“; noch keine Geldberechnungen angebunden.
Dort `dinero({ amount: cents, currency: EUR })` ohne `scale`: Ohne Angabe nimmt Dinero den Exponenten der Währung,
bei EUR 2, also Cent. Die Optionen stehen im Typ `DineroOptions` in
`node_modules/dinero.js/dist/esm/index-*.d.ts` (Strg+Klick auf `dinero`, Parameterhilfe mit Strg+P).
Lernbeispiele werden ausschließlich im Chat erklärt.

### Artikel und Gruppen

Stand 16.09.2026, mit dem Nutzer gebaut und umgesetzt in `WokFlow/src/catalog/`.

- **Artikel stehen im Code, nicht in der Datenbank (Nutzer, 16.09.2026):** Preise ändern sich selten, der Nutzer
  pflegt sie selbst; die Chefin bekommt keinen Bearbeitungsbildschirm. Begründung: kein zusätzlicher Code dafür,
  IntelliJ prüft jeden Artikel über die Typen. In SQLite kommt, was im Betrieb entsteht, etwa Bestellungen,
  Belege, Zahlungen. Eine Preisänderung braucht kein Kompilieren, der laufende Server aber einen Neustart.
- **Dateien:**
  - `articles.ts`: Typen `Article` (`name` mit `de` und `zh`, `variants: Variant[]`) und `Variant` (`name` mit `de`
    und `zh` oder `null`, `price: Dinero<number, "EUR">`), dazu die Fabrikfunktionen `article(de, zh, variants)`
    und `variant(de, zh, cents)`. `article` nimmt eine Variantenliste oder nur den Preis in Cent; eine Zahl ergibt
    die eine Variante ohne Namen (Prüfung mit `Array.isArray`). Nur diese zwei Funktionen rufen `dinero` auf.
  - `buffet.ts`, `food.ts`, `drinks.ts`: je logischer Liste ein `export const name: Article[]`, eine Zeile
    `article(…),` je Artikel, Reihenfolge wie am Bildschirm. Gemeinsame Variantenlisten stehen oben:
    `buffetSmall` und `buffetBig` in `buffet.ts`; `variantPieces(cents1, cents2)` für „6 Stück“ und „12 Stück“,
    vom Nutzer geschrieben, in `food.ts`; `variantsFull`, `variantsBottle`, `variantsJuices`, `variantsWines` in
    `drinks.ts`. `lemon` steht am Ende von `drinks.ts`.
  - `menu.ts` (bis 16.09.2026 `catalog.ts` mit Typ `Catalog` und Konstante `catalog`; Nutzer: der Ordner bleibt
    `catalog`): `Category` mit `tax`, `print`, `groups: { [name: string]: Article[] }`, `Menu` mit `buffet`, `food`,
    `drinks`, die Konstante `menu`, dazu `taxExceptions`. **Die Gruppen im Katalog sind die logischen Listen**, jede
    eine einfache Liste in Kurzschreibweise (`soups`, `salads`, `snacks`; Nutzer, 16.09.2026: keine „Artikelmatrix“
    `Article[][]`). Die Gruppen einer Hauptkategorie stehen nebeneinander in einer Zeile wie bei den Imports, die
    Klammern auf eigenen Zeilen, Komma nach dem letzten Namen (Nutzer, 16.09.2026); ob Strg+Alt+L die Zeile so lässt,
    ist ungeprüft. Auch das Buffet hat eine Gruppe (`buffets`), damit alle Hauptkategorien gleich aufgebaut sind.
    **Was zusammen gezeigt wird, entscheidet der Bildschirm** (Nutzer, 16.09.2026, „much more elegant“): Er braucht
    ohnehin eine Tabelle seiner Gruppen mit Namen in beiden Sprachen und Bildern; darin steht auch, welche
    Kataloggruppen eine Bildschirmgruppe bilden, etwa Suppen & Salate aus `soups` und `salads`. Die graue Linie steht
    dort, wo eine Kataloggruppe endet, `groupDividers` aus dem Prototyp braucht der echte Bildschirm nicht. Keine
    beliebig tiefe Verschachtelung: Hauptkategorie, Gruppe, Artikel, Variante. Nicht gewählt (16.09.2026): Listen je
    Bildschirmgruppe als `Article[][]` oder per Spread in `menu.ts` verbunden, Buffet ohne Gruppe mit `articles?`
    neben `groups?` (dem Nutzer zu unordentlich), `menu` ohne geschriebenen Typ, die zusammengelegten
    Bildschirmgruppen trennen (13 Speisengruppen passen nicht ohne Scrollen, Ente stünde allein).
- **Umfang:** 102 Artikel (Buffet 4, Speisen 50, Getränke 48) mit 199 Varianten in 21 Kataloggruppen (Buffet 1,
  Speisen 13, Getränke 7), am Bildschirm 18 Gruppen (Speisen 10), dazu `lemon`. Namen, Reihenfolge, Preise wie
  `tmp/preview-menu.js` und die Speisekarte 2026; die Kinderpreise Sonntag/Feiertag stehen nicht im PDF, übernommen
  aus „Buffettarife“.
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
  nicht allein bestellbar ist (vorher in keiner Gruppe). Soda hat deshalb keine eigenen Zitronen-Varianten mehr, sie
  kosteten genau 0.20 € mehr. Wie eine Bestellzeile die Zitrone festhält, ist Bestelllogik und kommt später.
- **Druck an der Hauptkategorie (Nutzer, 16.09.2026):** `print` neben `tax`, Getränke und Speisen `true`, Buffet
  `false`. Gemeint ist der Bestellbon; die Rechnung zeigt alles.
- **Steuer nur an der Hauptkategorie:** Buffet 10 %, Speisen 10 %, Getränke 20 %. Seit 17.09.2026 steht die einzige
  Ausnahme fest in `taxOf(articleId, variantId)` in `menu.ts`: Leitungswasser 10 (Nutzer: ändert sich fast nie);
  vorher `taxExceptions` mit `taxOf(category, article)`. `orderOf` fragt nur `taxOf` und weiß nichts von Ausnahmen
  (Nutzer, 16.09.2026: Nachschlagen gehört ins Menü). `reducedTax` mit dem Satz der Speisen ist entfallen.
  Schlüssel bleibt der deutsche Name als Text: Eine Konstante `tapWater` als Verknüpfung mit dem Artikel lehnte der
  Nutzer ab (keine Variable je Artikel); wird Leitungswasser umbenannt, `taxExceptions` mitändern. Verworfen: `tax?` am Artikel (eigene Property für eine Ausnahme),
  Pflicht-`tax` an jedem Artikel (Wiederholung); keine Option ist perfekt. Der Name bleibt `tax`, nicht `vatRate`.
  Berechnetes Leitungswasser 10 % (Mineralwasser 20 %); Kaffee und Tee einschließlich Cappuccino und
  Latte Macchiato 20 %. Quelle am 15.09.2026 geprüft:
  [WKO: Umsatzsteuersätze für Restaurationsumsätze](https://www.wko.at/steuern/ermaessigte-umsatzsteuer-saetze).
  Die neuen 4.9 % für bestimmte Grundnahrungsmittel gelten nicht für Restaurationsleistungen. Rechtsgrundlagen:
  [UStG § 10](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=10),
  [BMF zur Änderung 2026](https://www.bmf.gv.at/rechtsnews/steuern-rechtsnews/aktuelle-infos-und-erlaesse/fachinformationen---umsatzsteuer/umsatzsteuersenkung-auf-ausgewaehlte-nahrungsmittel.html).
  Belegbeschreibung: [BAO § 132a](https://ris.bka.gv.at/eli/bgbl/1961/194/P132a/NOR40173931)
  und [UStG § 11](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=11).
- **Beim Buchen später** Name, Preis, Steuersatz in der Buchung festhalten, damit Katalogänderungen alte Belege
  nicht verändern; keine zweite, unabhängig gepflegte Preisliste. Steuerberechnung und Belegspeicherung sind noch
  nicht gebaut.
- Quellen der Daten: der Prototyp und `AsiaWok_Speisekarte_2026.pdf` (siehe „Einstieg“). Enthaltene Grill-Soßen
  sind keine eigenen Artikel, bezahlte Extra-Sauce getrennt. Portionsgröße und bestellte Anzahl nicht verwechseln.
- **Offen:**
  - Weingrößen „1/8“, „1/4“, „1/2“ weichen von der Punktregel ab, im Prototyp ebenso.
  - Die Tabelle der Bildschirmgruppen (Namen in beiden Sprachen, Bilder, zugehörige Kataloggruppen) gehört zum
    künftigen Bildschirmcode; bis dahin stehen die Angaben im Prototyp und unter „Speisengruppen“.
  - Sushi-/Maki-Stückzahlen („7 Sushi + 3 Maki“) stehen nur im Prototyp, nicht in den Daten.
  - Mineralwasser-Flaschengröße bestätigen.
  - Nur anmerken, nicht ungefragt ändern: In `articles.ts` fehlt nach der Konstante `variantSingle` das Semikolon;
    in `menu.ts` fehlt bei zwei mehrzeiligen Imports das Komma nach dem letzten Namen.
  - Anbindung an Server, Bestellungen, Bildschirm; `tmp/preview-menu.js` bleibt bis dahin eigene Vorschaudaten.

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
  ans Firmenbuch binnen 9 Monaten, Steuererklärungen und monatliche Umsatzsteuer-Voranmeldung (UVA). Ein
  Wirtschaftsprüfer ist erst ab einer mittelgroßen GmbH Pflicht (zwei von drei: über 12,5 Mio. € Umsatz,
  über 6,25 Mio. € Bilanzsumme, über 50 Mitarbeiter), hier nicht. Verantwortlich bleibt der
  Geschäftsführer. Einen Steuerberater kann man jederzeit fallweise dazuholen, z. B. bei einer Prüfung.
- Kosten beim Steuerberater (Richtwerte 2026, kein amtlicher Tarif): Buchhaltung 200 bis 310 € im Monat,
  Lohn 16 bis 40 € je Mitarbeiter und Monat, Jahresabschluss 1.600 bis 2.200 €, Stundensatz 120 bis 310 €;
  für Asia Wok grob 8.000 bis 13.000 € netto im Jahr.
- Selbst machen: Buchhaltungssoftware 10 bis 30 € im Monat (z. B. FreeFinance, ProSaldo, everbill),
  Lohnsoftware fast nur für Profis (RZL, BMD). Meldeportale ELDA und FinanzOnline sind gratis.
  Kollektivvertrag, Sozialversicherungswerte und Steuertabellen sind öffentlich, der Steuerberater hat
  keinen Sonderzugang, nur Software-Updates und Routine. Aufwand danach ca. 4 bis 6 Stunden pro Woche (250 bis
  300 Stunden im Jahr, also rund 30 bis 45 € Ersparnis je Stunde, mit Haftung). Lernen nebenbei: etwa ein Jahr
  für laufende Buchhaltung und Lohn, 2 bis 3 Jahre bis zum Jahresabschluss. Ein WIFI-Kurs (Buchhaltung und
  Personalverrechnung, 385 Lehreinheiten, ca. 3.350 €) ist nicht nötig: Lehrbuch plus KI, Uni-Vorlesungen
  zur Bilanzierung, für Lohn das jährlich neue Buch „Personalverrechnung in der Praxis“. KI hilft beim
  Lernen und Prüfen, ersetzt aber nicht das Wissen über jährliche Änderungen, Fristen und Meldungen.
- Empfehlung von Claude: erst WokFlow fertig bauen. Danach 6 Monate Schattenbuchhaltung: selbst buchen und
  jeden Monat mit der Saldenliste des Steuerberaters vergleichen. Stimmt es drei Monate hintereinander,
  laufende Buchhaltung übernehmen; Lohn und Jahresabschluss zuletzt, den ersten eigenen Abschluss vom
  Steuerberater gegenlesen lassen.
- Zugänge (Plan): Der Geschäftsführer holt die ID Austria, meldet damit die GmbH bei FinanzOnline an
  (Steuerkonto, Bescheide, UVAs, Lohnzettel) und im Unternehmensserviceportal USP (darüber WEBEKU der ÖGK
  mit Beitragskonto und ELDA) und legt den Nutzer als Benutzer an. Die Vollmacht des Steuerberaters bleibt
  daneben bestehen. FinanzOnline allein zeigt etwa ein Drittel; Buchungen, Saldenlisten und Lohnkonten kommen
  vom Steuerberater (Mail unter „Korrespondenz“). Online-Banking-Zugang von der Chefin.
- Wer Geschäftsführer ist, ist intern unklar. Deshalb ID Austria für Li Vu (Chefin) und Kim Hong Vu (Chef):
  Wer im Firmenbuch steht, kann die GmbH anmelden, beim anderen lehnt das System ab. Ein Firmenbuchauszug
  kostet auch für den Inhaber eine Gebühr (justizonline.gv.at). Gratis: Gründungsunterlagen und GISA. GISA
  (Auszug vom 04.07.2026 in der Ablage): Die Gewerbeberechtigung Gastgewerbe Restaurant am Messeplatz 1
  läuft seit 21.12.2013 auf Li Vu persönlich, nicht auf die GmbH; prüfen, ob die GmbH eine eigene hat.
- ID Austria in Klagenfurt (im Browser geprüft, beide sind österreichische Staatsbürger): Passamt des
  Magistrats, Kumpfgasse 20, Telefon +43 463 537-4010, ohne Termin Dienstag und Donnerstag 8 bis 15 Uhr,
  Freitag 8 bis 12 Uhr, Online-Termine nur Montag und Mittwoch (nächster freier war der 12.10.2026). Ob die
  ID Austria wirklich ohne Termin geht, vorher anrufen. Alternativ nur mit Termin: Landespolizeidirektion,
  Buchengasse 3 (citizen.bmi.gv.at, Thema „ID Austria - Registrierung“), oder Finanzamt, Siriusstraße 11
  (Telefon 050 233 700). Mitbringen: Reisepass, Handy mit ID-Austria-App; Vollfunktion verlangen; vorher
  die Online-Vorregistrierung auf id-austria.gv.at. Beide sind nicht technikaffin, der Nutzer begleitet sie
  und richtet die App mit ein. Wer schon eine Handy-Signatur hat, kann die Vollfunktion online freischalten.

## Korrespondenz (Arbeitsstand für neue Chats)

Was an wen ging und worauf gewartet wird. Kommt eine Antwort, hier eintragen und die Folgen unter
„Entscheidungen“ nachtragen. Stil des Nutzers für Mails: keine Gedankenstriche, keine Einleitung, kein
Projektname nach außen.

### Nexi (serviceDE@nexigroup.com, Kundennummer 5905840, Vertragspartner-Nr. 156469572)

**1. SoftPOS und Kassenanbindung** (laut Nutzer am 14.09.2026 verschickt, Antwort offen; Telefonat vom 15.09.2026 im Manifest, Punkt 10)

```text
Betreff: Kundennummer 5905840 / VP 156469572 – SoftPOS und Kassenanbindung

Sehr geehrte Damen und Herren,

wir sind Bestandskunde (ASIA WOK Restaurant GmbH, Klagenfurt) mit einem Terminal Mobile Premium und
rund 50.000 € Kartenumsatz im Monat. Wir bauen ein neues Kassensystem und haben drei Anliegen:

1. Nexi SoftPOS (Tap to Pay on Android) auf einem zusätzlichen Android-Handy, als Zusatzvereinbarung
   zu unserem bestehenden Vertrag mit unseren bestehenden Konditionen (Disagio je Kartenart wie bisher,
   gleiche Abrechnung). Bitte um ein Angebot mit allen Kosten und Laufzeit.
2. Freischaltung der Kassenanbindung (ZVT über WLAN) an unserem Terminal Mobile Premium, damit unsere
   Kasse den Betrag ans Terminal übergibt. Gibt es dafür Kosten?
3. Ist die App-zu-App-Schnittstelle für SoftPOS (Betragsübergabe aus unserer Kassen-App,
   Entwicklerportal developer.nexigroup.com) in Österreich verfügbar, und was brauchen wir für den Zugang?

Bitte antworten Sie schriftlich per E-Mail.

Mit freundlichen Grüßen
[Name], ASIA WOK Restaurant GmbH
```

**2. Kopie des Vertrags** (Entwurf vom 14.09.2026; Vertragskopie am 15.09.2026 erhalten, ausgewertet unter „Entscheidungen“, „Nexi-Vertragskopie“; darin Disagio nur bis 11.08.2024, aktuelles Konditionenblatt am 15.09.2026 nachgefordert, Versand durch den Nutzer)

```text
Betreff: Kundennummer 5905840, VP 156469572: Kopie unseres Vertrags

Sehr geehrte Damen und Herren,

bitte senden Sie uns eine Kopie unseres Kartenakzeptanzvertrags samt aktuell gültigem Konditionenblatt
(Disagio je Kartenart, Mindestentgelt je Transaktion, Monatspauschalen, Terminalmiete, Laufzeit und
Kündigungsfrist) sowie aller späteren Änderungen. Bitte per E-Mail als PDF.

Mit freundlichen Grüßen
[Name], ASIA WOK Restaurant GmbH
```

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
„Entscheidungen“. Am 14.09.2026 gekürzt, Doppeltes zu „Entscheidungen“ gestrichen.

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
- In der Werkzeugkiste liegen u. a. ein Reparaturprogramm für SQL-Server-Datenbanken (Stellar Phoenix) und
  Fernwartung (TeamViewer, UltraVNC).

## Ordner

- `CLAUDE.md`: diese Datei.
- `WokFlow/`: das neue System, eigenes Git-Repo (Branch `main`, privat auf GitHub als `UnathiCodex/WokFlow`).
- `Nexi/`: die 11 monatlichen Nexi-Abrechnungen (Kartenumsätze und Gebühren) von Oktober 2025 bis
  August 2026, vom Nutzer am 14.09.2026 abgelegt. Auswertung unter „Zahlart und Kartenterminal“.
  Geschäftsdaten, nie in ein Repository. Dieselben Dateien liegen seit 14.09.2026 sauber benannt in der
  Geschäftsablage des Nutzers: `M:\NomWorkspace\NomBusinessworkings\AsiaWokRestaurantGmbH\Kartenzahlung\<Jahr>\`
  als `AsiaWok_Nexi_Abrechnung_YYYYMM.pdf`, dazu die Terminal-Rechnungen Juni 2025 bis August 2026 als
  `AsiaWok_Nexi_Rechnung_YYYYMM.pdf`. Der Ordner `Nexi/` hier kann weg, sobald der Nutzer will.
- `TOUCHIT/`: alles zum Altsystem.
  - **Original-Unterordner, nicht verändern, nicht löschen:** `BACKUP`, `DATEN`, `TOUCHIT`,
    `TOUCHIT_DIENSTE`, `TOUCHIT_KONFIGURATION`, `TOUCHIT_PHONE`, `TOUCHIT_TOOLS`, `TOUCHIT_UPDATE`, `UPDATE`.
    - `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`: Live-Konfiguration.
    - `TOUCHIT/BACKUP/Filiale1 (local)/`: Datenbank-Backups. Das neueste ist vom 18.07.2024.
    - `TOUCHIT/TOUCHIT_PHONE/`: Kellner-Handy-Programm.
    - `TOUCHIT/TOUCHIT_TOOLS/`: Werkzeugkiste des Herstellers. Ein paar eigene Hilfsprogramme (Backup,
      Kartenleser, IP-Scanner, NFC-Leser, RKSV-Tool), die sind dekompiliert. Sonst Software anderer
      Firmen: Treiber (FTDI, Epson, Metapace, Intel, Microsoft), A-Trust-Installer, Fernwartung
      (TeamViewer, UltraVNC), Synology, Adobe Reader, Datenbank-Reparatur. Diese fremden Programme
      sind nicht dekompiliert.
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
ausgenommen (vom Nutzer eingetragen, 14.09.2026). Ältere Konfliktdateien liegen noch in `WokFlow/.idea/`. Weil `node_modules` nicht synchronisiert wird, braucht jeder Rechner einmal `npm install` im Projektordner.

**Rote Zeilen bei `node:http` in IntelliJ (geklärt 14.09.2026, im IntelliJ-Log geprüft):** Hat ein Projekt
kein eigenes TypeScript, nimmt IntelliJ sein mitgeliefertes TypeScript 6.0.3. Das findet die Node-Typen
ohne `tsconfig.json` nicht, auch nicht mit `@types/node` im Projekt. Steht `typescript` in den
devDependencies (wie im Dashboard `M:/NomWorkspace/NomSystemdashboard`, dort 7.0.2), nimmt IntelliJ dieses TypeScript 7.
Es lädt die Node-Typen selbst in einen Speicher pro Computer (`%LOCALAPPDATA%\Microsoft\TypeScript\7.0`,
automatische Typenbeschaffung), deshalb dort keine roten Zeilen ohne tsconfig. Weil dieser Speicher pro
Computer ist, kann sich der Laptop anders verhalten als der PC. Umgesetzt am 14.09.2026: WokFlow hat
`typescript` 7.0.2, die roten Zeilen sind weg. Später kam `@types/node` 26 dazu, weil IntelliJs eigene
Prüfung sonst keine Node-Typen kennt (siehe „Coden“, Doku-Links).
Zwei getrennte Helfer in IntelliJ (bestätigt 14.09.2026 mit einer `test.ts` im Dashboard-Projekt ohne `@types/node`: Hover über `setHeader` im Code zeigt die echte Beschreibung aus `http.d.ts`, der Kommentar-Link `ServerResponse#setHeader` ist gelb unterwellt): Hover-Text, Strg+Klick und Fehler im
Code kommen vom TypeScript-7-Dienst, der die Node-Typen über die automatische Typenbeschaffung auch ohne
`@types/node` kennt. Links in Kommentaren prüft IntelliJ selbst, und dafür braucht es `@types/node` in
`node_modules`. Am Laptop deshalb einmal `npm install` im Ordner `WokFlow` ausführen.

Auf dem PC installiert (Stand 14.09.2026): Node.js 26 (am 14.09.2026 von 24 aktualisiert), Git, ffmpeg 8
(winget) und Python 3.14 als
Nutzer-Installation unter `AppData\Local\Python` (die Angabe „kein Python“ vom 13.09. war falsch), dort
mit `faster-whisper`; Whisper-Modelle tiny bis large-v3 liegen im Hugging-Face-Cache des Nutzers. Damit
lassen sich Sprachnachrichten und Videos in Text umwandeln: mit ffmpeg eine 16-kHz-Mono-WAV ziehen, dann
`WhisperModel("large-v3", device="cpu", compute_type="int8")`, 60 s Ton dauern ca. 35 s. Kein SQL
Server. .NET, Java und Ghidra liegen nur als Werkzeuge in `TOUCHIT/DECOMPILED/tools/`, nicht
installiert. Der Projektordner ist kein Git-Repository.

## Was schon gemacht wurde

- 08.09.2026: Scan und Analyse des Altsystems (Ergebnis unter „Analyse des alten Systems“).
- 09.09.2026: Komplett-Dekompilierung in `TOUCHIT/DECOMPILED/`: alle 119 .NET-Dateien als C#, auch die 17 mit
  ConfuserEx geschützten (offline entschlüsselt mit `scripts/recover_antitamper.py`, ohne die Programme zu
  starten; Reihenfolge der Skripte in `README.md`). 230.359 Methoden ohne Syntaxfehler, dazu 12 native
  Dateien per Ghidra als C-Pseudocode. Alle 339 Originaldateien sind unverändert (SHA-256 geprüft). Nur zum
  Verstehen, nichts nachgebaut oder mit der echten Kasse verglichen. Zwei ältere Dekompilierungen
  (`DECOMPILED`, `DECOMPILED_KLARTEXT`) liegen im Papierkorb, bitte nicht wiederherstellen.
- SQL-Aufrufanalyse und Modelltest in `TOUCHIT/PERFORMANCE_AUDIT/` (Einstieg `README.md` und
  `Sandbox/ERGEBNIS.md`). Echte Laufzeiten der Kasse gibt es nicht, der Messplan mit 12 Abläufen steht dort.
- 13. und 14.09.2026: Planung von WokFlow (Manifest, Entscheidungen), Tagesabschluss der Chefin per Foto und
  Video verstanden, Nexi-Abrechnungen ausgewertet und in die Geschäftsablage sortiert, Bildschirmentwürfe,
  Mails an Nexi und Steuerberater (siehe „Korrespondenz“).
- 15. und 16.09.2026: Artikelkatalog `WokFlow/src/catalog/` mit dem Nutzer gebaut, 102 Artikel plus Zitrone, Namen
  und Speisengruppen mit dem Bildschirmentwurf abgestimmt (siehe „Artikel und Gruppen“); `WokFlow/.editorconfig`.

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
