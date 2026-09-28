# WokFlow: project

Read by building chats (see `CLAUDE.md`). Only what still guides the work, nothing twice. Several sessions may edit
this file: read it fresh, edit in a targeted way, replace what is outdated instead of appending history.

## Working with the user

- A question or a wish is not an order: write into files only on an explicit instruction (“patch”, “do that”,
  “rename …”); otherwise answer and show the code in the chat, he often builds it himself. New files only after an
  explicit yes.
- Every choice put to him carries Claude's recommendation with its reason; he answers yes or no.
- A file is finished only when he says so: everything changed since the last commit is open until he accepts it.
  Claude asks where he wants to read on and at most suggests the next place.
- Patch reports: every changed line verbatim, file by file (a removal only described he understood wrongly); CSS
  changes described by what changes on screen. Piece 1 is the line that changes the behaviour plus the test result.
- Keep his style: what he writes or corrects himself (code, names, comments) is not smoothed out or renamed back;
  removed words are not put back. Read the current state first, adjust only the affected entries.
- Enumerations: exactly two elements joined with `und`/`and`; from three on evenly, `A, B, C` or `A-B-C` or
  `A oder B oder C`, without a closing `und`/`and`.
- “Everywhere” means all files under `src/` and `test/`.
- Commands like `npm install`, `npm start`, tests, server start: explain them and give them to him; run them only on
  an explicit order. Git is done by him.
- Simple first, speed later: build the simplest way, try it on the real phone; caching and similar only when
  something is noticeably slow. Do not discuss such topics beforehand.
- Never try things out in his folders; use the scratchpad. Claude moves its temporary files to the Recycle Bin itself
  and never deletes permanently. `tmp/` holds `prototype/`, `wokflow-lesson/`, `archive/` and `learning.md`.
- TOUCHIT serves to compare workflows and weaknesses, never as a template; never copy manufacturer code.

## Way of working per module

1. One module per fresh chat: a feature testable alone in one evening, named after its task (`tables`), not a number.
2. Specification first: about ten lines, what goes in, what comes out, what must never happen. Claude proposes, he
   corrects; building starts only after his yes.
3. Then the plan: new files, changed existing files with every change as before/after. Build only after the yes.
4. Claude writes the whole module with tests, runs type check and tests, shows the result, gives the start command.
5. He starts it and tries to break it; on errors he searches first, then asks.
6. Why-list: he asks about every line he cannot explain; the module is finished when the list is empty and he accepts.
7. One cleanup round together at the end, once: remove duplication, group related rules, simplify workarounds.
   Readability over lowest line count; further cleanup needs a concrete problem.

## Protection of existing files

- Untouched unless the module needs it and he said yes to the shown change: `src/catalog/*`, `src/server/index.ts`,
  `src/server/database.ts`, `tmp/*`, `package.json`, `.editorconfig`, `commands.md`, `assets/`.
- New modules in new files. Do not smooth the style of existing files or change names.
- Every change to an existing file: first the list “changes / stays”, then before/after, then the yes.

## Coding

- As little code, as few files, settings and libraries as needed. No stock solutions, no commented-out leftovers.
  Readability wins in a conflict, otherwise brevity. Every function has one task; one longer than a screen is split.
- **Never safeguard twice (binding):** care and good error texts at exactly one place, where the rule lives (orders:
  `orders.ts`). Build a new check, `try`, type, function or answer field only if all three are yes:
  1. No other place catches this today? Prove it with a broken copy in the scratchpad, do not guess.
  2. A caller that exists today needs it? “The phone might need it later” does not count.
  3. It changes a result someone sees (saved data, display, log)? A nicer text for our own bug does not count.

  At handover try deleting every function: if tests stay green and behaviour is the same, it goes. Hardening for real
  operation is a line under “Open for later”, not code in advance.
- Claude's check after changes: type check and tests, plus broken copies of the source in the scratchpad; every
  planted error must turn a test red. The options are needed because there is no `tsconfig.json`:

  ```bash
  node_modules/.bin/tsc.cmd --noEmit --allowImportingTsExtensions --module nodenext --target esnext --types node src/server/index.ts test/orders.test.ts
  ```
- **Modern, logical CSS only:** flex, grid, set sizes, `gap`, custom properties; no old text-layout quirks (vertical
  padding or margin on inline boxes, floats, margin merging, baseline tricks). If a need pulls one in, Claude says so
  and offers a logical alternative.
- Node 26 runs `.ts` directly (type stripping); a running server reads code only at start. Import types with
  `import type`. No `enum`, no `namespace`; union types instead. TypeScript checks strict: `null` only with `| null`.
  Build file paths with `import.meta.dirname`.
- Types written out at constants, parameters, return values; `type`, not `interface`. Lambdas unnamed where used,
  e.g. directly in `transaction(database, (): void => { … });`. Double quotes, four spaces.
- Data files look like data: helpers only where they save a lot of repetition; variants written out as on the bill.

### Names

- English identifiers, files, fixed values, JSDoc; German visible texts. Article names only German and Chinese;
  `name.de` and `name.zh` are the only source for button, “Bestellt”, bill, print; never derive from ids.
- camelCase, common part first (`buffetSmall`, `variantsBottle`); group keys in `menu.ts` are list names. Functions
  and types noun first (`orderAdd`, `ordersUpdate`, `tableClose`, `OrderNew`); lookup with `Of` (`entryOf`). Lists as
  parameters `ordersToAdd`. Library names stay.
- Object `article`/`variant`, German name as id `articleId`/`variantId`. Underscore only in SQL (`table_id`).
- Folders by task, files by content, no collection files like `types.ts`: `src/catalog/`, `src/tables/`,
  `src/server/`, `src/page/` (by screen). Types stand with their data.
- One word, one meaning: a database row is a “portion”, an `Order` a variant with its quantity. “Panel” is a window
  sliding up from below (`reservationsPanel`), never “sheet” or “drawer”. “table-lock” with a hyphen.

### Formatting, SQL, errors

- Formatting lives in `.editorconfig` (each setting with an English `#` comment), not `.idea`. Trailing comma for
  multi-line lists, none for single-line ones, never after `...rest`.
- Lines up to about 105 characters, break clearly above (check `awk 'length($0) > 110'`). An object as last argument
  unfolds one property per line; otherwise one argument per line; a long constant breaks after `=`; a long signature
  one parameter per line aligned under the first, then a blank line (`requestHandle`).
- From four names out of an own file or six out of an external module: `import * as name`, named like the file.
  Regular imports before `import type`; a blank line between the groups only when both have two or more statements
  and one has three.
- `src/catalog/`: two blank lines after imports and around regions `//#region Name` … `//#endregion Name` (no space
  after `//`), only in files with several parts. An `if` with one statement may stand without braces.
- `requestHandle`'s `if` chain: a blank line after every branch. His `pageSend` if/else stays.
- SQL: `database.prepare(…).run(…)` directly at the place, no named `StatementSync`; `ORDER BY` only where order
  counts. After changing `orderbookCreate`, adjust the real `wokflow.db` and remind him to refresh IntelliJ's data
  source (a locked file: `DROP TABLE` via `node:sqlite`, then create it again).
- Error texts built the same way in one file, naming what the caller does not know (article, quantity), not what he
  handed over. Model: “Not enough ${order.articleId} to remove ${order.quantity}”, “No open orders”.
- After every `replace_all`, check the places with Grep.

### Tests (pattern: `test/orders.test.ts`)

- `node:test` against an in-memory database, `node --test` in `WokFlow`, no script in `package.json`.
- Shape: `test(`, the name on its own line (capital start, no full stop), the lambda, `);`; no comma after the lambda.
- One flow test for the main way plus one short test per rule the flow cannot show; nothing already covered.
- Test orders once in `test/setup.ts` as single `export const colaBig1: Order = orderOf(…)`, imported by name (no star
  import). Names: article, Cola size, quantity digit (`colaSmall1`, `redBull0`). Never break `deepEqual`.
- Fresh database per test (his decision): `let database: DatabaseSync;` plus `beforeEach`, framed by two blank lines.
  `beforeEach`/`afterEach` get one `//` line above. `test/setup.ts` holds everything only tests need.
- `throws` checks a short keyword (`/quantity/`); one test isolates one reason to throw.

### Comments

- English, capital start, no articles that carry nothing (“Shows occupied tables on the plan.”), but not mechanical.
  A comment promises only what the code does today and uses the function's own verb.
- Link everything linkable: `{@link Name}` once per comment at first mention (`{@link orders.Order}`,
  `{@link Order}s`), never with link text. Module lines and database names in backticks.
- JSDoc on every function and type (and `menu.ts` constants, not the article lists), only above declarations, no
  examples (exception: `requestHandle` shows the addresses and a real request). `@param name - …` for every
  parameter, `@returns {@link MenuEntry} with …`, then `@throws {Error} - When …` in one line without full stop.
- Style of `api.ts` is the model: first sentence, then a bullet list; used functions as bullets with a link and one
  sentence starting with the verb; addresses as request lines (`` `GET /menu`: Sends menu. ``); codes in backticks.
- No `//` inside a function body: non-obvious local constants go into the JSDoc; only what a constant is may stand as
  a short trailing `//`. Sentences end with a full stop, start on a new line, about 75 characters, break where a
  human pauses.
- File header: `## Title`, then as a rule one sentence, nothing the JSDocs repeat. If the first declaration is the
  main thing, its JSDoc carries the header (model `locks.ts`). One bullet per module with a regular import, literally
  the same line in every file (Grep first); test files list no own `../src/` files.
- HTML: one comment above each block, what it is and when it shows. How-notes only where our code makes a reader
  stumble.
- CSS: one short comment on its own line above each rule, saying what it does on screen; one blank line between
  rules; no section comments; `base.css` is the model. Regions `/* region Name */` only in long files.
- `commands.md`: one line above each command, what it does, then the options as `-x: meaning`; no examples.

## Status and next step

**Next:** slice 1 of the order screen, the table plan, is built but not accepted. Slice 2, opening a table (take and
renew the lock, read orders, show “besetzt”, the way back asks `GET /tables` again), follows only after he accepts
slice 1 and asks to proceed, starting with its specification. Real page: `npm run watch` and `npm start`,
http://localhost:3000.

- Not yet accepted source changes: colour names, class `logo`, offline hint without background, strip 64 px, phone
  size only in `@media (pointer: fine)`, one comment line per CSS rule; removed `color: inherit`, the strip's `gap`,
  the pair's `grid-template-rows`; `--button` and `--line` merged into `--button-line`; offline shows only the hint
  (`plan.ts` removes other body blocks, since `hidden` loses against `display: flex`). He set the PC block to
  `width: 360px; height: 740px` himself.
- Source: `src/page/` shared `index.html`, `router.ts`, `base.css`; `plan/` with `plan.html`, `plan.ts`, `plan.css`,
  `indoor.css`, `garden.css`. Only the table plan: 41 table buttons, Inside/Garden, occupied colours from
  `GET /tables`, offline hint. One HTML line per table; `data-area` selects the area; `.area` controls scrolling. A
  router function waits for a second screen.
- Lines only the PC needs go inside `@media (pointer: fine)`. Lines equal to a default stay when they state a design.
- Porting prototype CSS: copy only rules that change the screen (no centring buttons already do, no safe-area padding,
  no `touch-action` on buttons, no transitions without a press colour, no own focus ring, no sizes for other phones).
- Accepted: module `tables`, `api.ts`, `page.ts`, `test/api.test.ts`, `vite.config.ts`. Not accepted in their latest
  versions: `orders.ts`, `orders.test.ts`, `index.ts`, `test/setup.ts`, `index.html`, `router.ts`, plan files,
  `package.json`, `.gitignore`.
- `test/menu.test.ts` has four tests for `entryOf`. Planned: “every variant is found with its own price” and “no two
  variants share the same name” (needs `Set`, explain it first).

### Module order

1. `tables`: orders per table in SQLite. Accepted.
2. Server interface: catalog and orders as JSON over `node:http`. Built.
3. Table-lock: `src/tables/locks.ts` and `…/lock`, built; the page that locks, renews, unlocks is missing.
4. Order screen in slices. With it come lemon and buffet persons; moving needs a function in `orders.ts`.
5. Then bill, payment, printing, rksv, day closing.

## Technical decisions

- **One server:** Vite only builds; `npm start` (no `--watch`, restart after changes) serves `dist` and the API on
  port 3000 in development and operation. No Vite server, proxy or `/api` prefix. The plan fetches when shown.
- **Packages:** `dinero.js` 2.0.2; dev tools TypeScript 7.0.2 (IntelliJ needs it for the Node types), `@types/node`,
  Vite.
- **Page delivery:** `pageSend` handles a file or `404` itself; keep path containment, allowed content types,
  `no-store`. No parameters only for tests.
- **API:** raw `menu` output; order prices as integer cents. Success returns `200` with `null`; unexpected failures
  are logged and return `500`. No extra error class or duplicate body validation.
- **Table-lock:** a table is open on one device only (the PC counts as one). A `Map` in server memory, 5000 ms,
  renewed by the page about every 2 seconds, so a failed phone's lock runs out. Another device gets `false`;
  unlocking checks the device. The page renews before sending; the order endpoint does not check again. The device
  chooses its id.
- **SQLite** via `node:sqlite`: one file opened only by the server; every booking a transaction, `synchronous=FULL`.
- **Money:** Dinero.js 2 in whole cents, `dinero({ amount: cents, currency: EUR })` without `scale`, only in
  `articles.ts`. Rounding is decided with the bill flow.
- **Scope:** Sophale owns `src/rksv/`; do not read or change it in module chats.
- **Open for later:** the old `orderbook` wording versus table `orders`. Before operation: body-size limit, content
  type, access control, lost-answer and double-send handling, raw-body logging.
- **From TOUCHIT's faults:** every query with parameters, run once; a screen loads with one or two queries; printing
  is a small service with a queue, retries and a log; one web app for PC and phones; dates as real date values;
  every error logged with time, station and user, no empty handlers; rksv code tested and checked with the
  ministry's tool; configuration and secrets in one place.

### Module `tables`

- A table (id as text: `"14"`, `"G3"`, `"M"`) has any number of orders; no record for the open table itself.
- **One row per portion:** table `orders` has no quantity. Per row: table, article, variant or null, price in cents
  and tax rate at booking, `closed`. Open while `closed` is empty; no open portions means a free table. Sending
  `quantity` creates that many rows; `ordersRead` counts them. Add, remove and pay all select n rows.
- `Number.isInteger` in `orderAdd` stays (TypeScript has no `int`).
- `OrderNew` is `{ articleId, variantId, quantity }`; `orderOf` adds price and tax via `entryOf`. The phone does not
  send the category.
- The database knows only what was sent: the phone holds unsent orders and sends all at once on the way back to the
  plan. The ticket prints from the message.
- `ordersRead` sorts by `MIN(id)`, `orderRemove` deletes the newest first, so no line jumps in “Bestellt”.
- `ordersUpdate` is the writing entry besides `tableClose`; remove before add. Several statements run as one
  transaction; `orderRemove` deletes first and checks `changes` afterwards. `tableClose` sets `closed`.

### Catalog

- Articles stand in the code, not the database; he maintains prices himself (restart after a change). The database
  holds what operation produces: orders, receipts, payments.
- `articles.ts` types and factories `article`, `variant`; `buffet.ts`, `food.ts`, `drinks.ts` one `Article[]` per
  list, one line per article in screen order; `menu.ts` categories, `menu`, lookup. Main category, group, article,
  variant. Which catalog groups form a screen group is decided by the screen's group table.
- The id of an article is its German name. No allergens, notes, English names or card ids in the article.
- Every article has at least one variant with a price, `name` null without a choice. Sizes are text with a dot and
  no litre sign. Buffet kinds are articles, age levels their variants.
- Shared variant lists only where prices change together (Cola, Cola Zero, Fanta, Sprite).
- Lemon is an own article in group `extras`, not shown as a group. `print` at the main category: buffet `false`.
- Tax only at the main category: buffet and food 10 %, drinks 20 %; one exception, tap water 10 %, in `entries`.
- Name, price and tax are recorded in the booking, so catalog changes never change old receipts.

## Product

- POS of ASIA WOK Restaurant GmbH, Klagenfurt: buffet, wok, menu, drinks. Buffet 11:30–14:30 and 17:00–21:30,
  Tuesday closed except on holidays. Must run by May 2027 (rksv card exchange).
- Function first, then simplicity. Large readable buttons for waiters aged 50 to 60.
- Devices: one Linux mini PC at the counter with touch monitor, A-Trust card reader, central printer Metapace T-3II
  (bills, drinks, à la carte; no kitchen or mobile printer), USB SSD; operating WLAN separate from guests; 4 to 5
  Android phones. One web page for all. No emergency mode: if the server fails, the paper pad.
- Scope at the start: ordering, table plan, tickets, bills, payments, cancellation, rksv, day closing, backup, paying
  separately, moving, German/Chinese, vouchers. No interim bill, no open credit. QR ordering later.
- Rights: waiters without a code, phones unlocked once. A boss code only at the PC for paid cancellations, discounts,
  voucher sales and the day closing.

### Service workflow

1. Table plan, inside or garden.
2. A table starts at Getränke, the buffet on its start page; no quick selection. Quantities show what is unpaid.
3. The table number, Android back or Escape return to the plan and send new positions; paying sends first too. No
   “Bonieren” button. Drinks and à la carte share one ticket, buffet none, nothing printed twice. The backend reports
   success only after a confirmed save.
4. Correction: minus at the line with “Rückgängig”; no confirmation, no cancellation tickets.
5. Paying separately by articles, never by a typed sum.
6. The bill is signed (rksv), printed, then unchangeable; every part bill is its own receipt, without payment kind.
7. After paying only the boss at the PC cancels, whole bills only, with reason, signed cancellation receipt, money
   out of the till and a new bill. Discounts likewise.

### Payment kind: card is only what Nexi confirms

- Everything else is cash; vouchers are recorded explicitly. Nobody switches cash/card or types amounts normally.
- Card sends the amount to the Nexi terminal or app; the guest picks the tip there. Amount, tip and transaction
  number return. “Warte auf Nexi” while running; no answer shows “Zahlung prüfen”, the table stays open.
- A cash tip is never recorded. No mixed payment; a voucher remainder is its own flow.
- Until a direct connection exists, the day closing reads Nexi payments and marks bills as card only with a reliable
  reference, never twice; unclear data gives “Zahlungen prüfen”, never silent cash.
- Corrections of the payment kind are logged and possible until the day closing; the logged kind stays separate from
  the signed receipt.

### Day closing (boss at the PC)

- Warns about open tables, updates Nexi data. Shows turnover, card, cash large; below only non-zero lines: card plus
  tip equals Nexi payout, vouchers, cash expenses, cancellations, turnover per goods group and tax rate.
- “Zur Bank” = cash minus cash expenses minus card tips paid out. The float is outside the till.
- “Tag abschließen” locks the day, prints a full ticket, creates a PDF and a data file for the monthly mail and
  starts the backup.
- Backup: encrypted, to an EU cloud within seconds, hourly to the USB SSD, nightly full; warn after a day without;
  rksv journal monthly as a file never overwritten.

## Screen and operation

The reference is `tmp/prototype/`, a layout sketch, not final code; its `screens.css` holds the true sizes and
colours. Read the decisions below before a slice and check the prototype's current state before syncing.

- Open `tmp/prototype/handy.html#tables` through a local preview server; phone view `screens.html?vorschau=1#tables`.
  Show him the phone preview. Review only code quality; test only what changed and the fit.
- `sed -i` breaks the CRLF files of the prototype; use the edit tool and bump the `?v=` marks at every change.
- Baseline 360 × 740 CSS px. One size only: no breakpoints or `clamp()`, wider phones stretch, shorter ones scroll.
  Every name stays on one line down to 360 px. Readable text and big tap areas before avoiding scrolling.
- Only a mouse screen gets the phone size (`@media (pointer: fine)`); phones and the counter monitor use full size.

### Design

- Colours in `:root` of `base.css`: black text, white background, one light grey `--button-line`, `--text-muted`
  for secondary and Chinese text beside German, `--accent-logo` for thin marks, `--accent-soft` (“rosé”) as the only
  state colour. No saturated red areas.
- Two weights, Regular 400 and SemiBold 600. Font Hyperreadable; Chinese uses the phone's font (`lang="zh-Hans"`).
- Buttons, tiles, tables grey without borders; lists are white rows with thin grey lines.
- Navigation gets no press colour; bookings get a colour flash only, fading over 150 ms, no movement.
- Panels come from below and close by dragging down; they never trigger payment or booking.
- No scrollbars on phones. Touch targets at least 44 px.
- Header: the table number is a grey button in the first quarter, the three order tabs share the rest. The tabs show
  only line pictograms (cup, clipboard, cutlery), the red underline marks the open one.
- Horizontal swipes switch Innen/Garten and order tabs; their click must not book or open a table.
- Tiles that open a menu show a small arrow and total. All tiles reserve counter space, so nothing shifts; counts
  show the unpaid quantity and disappear at zero.
- Undo bar: white floating card outside the scrolling list, only the German and Chinese name, no time limit until the
  table view is left, several steps, separate per table.
- Coloured pictures only from Google Noto Emoji (Apache 2.0, licence kept), only in group lists. Assets and their
  sources are listed in `assets/sources.md`; originals stay unchanged.

### Table plan

- Inside and garden on one screen; plain rectangles, no legend, lines or furniture. His arrangement stays.
- Table targets at least 44 × 48 px, garden targets 44 × 72 px. 18, 19, 23, 24 are separate tables.
- A “Reservierungen 预订” strip at the bottom shows the count still expected and opens today's list in a panel,
  sorted by arrival. A tap toggles arrived (rosé with checkmark); × marks a pending deletion, committed only when the
  list closes. No entry drops by time.
- “Mitnehmen” (id `M`) opens food directly, no drinks; it can be moved from, never to.

### Ordering

- Money only as amount due, `27.90 €` with a narrow no-break space (`money()`); no prices on tiles. Drink sizes with
  a dot, no litre sign (`0.3 + Wasser`). Missing prices never count as 0.
- A tab always opens at the top of its menu; a group stays open after booking.
- One name per article on button, Bestellt and bill; no short names.
- Buffet: tariff line with an arrow unfolding the four kinds; tiles “Buffet 自助”, “6–9”, “3–5”; a tap adds a person,
  the count removes one; Bestellt shows children in brackets. One tariff per table: another tariff bills everybody;
  moving takes it to an empty table, joining keeps the target's. Midday Mon, Wed–Sat 15.90/9.90/5.90 €, evening and
  Sunday/holiday 19.90/12.90/7.90 €; under 3 free. The automatic tariff choice is still a proposal.
- Drink groups: Limonaden, Säfte, Pago, Wasser, Bier, Weine, Kaffee & Tee, Schnaps; inside a group a bar of their
  pictures replaces the heading row. Food groups, with a heading row “< Huhn 鸡肉” and no bar: Huhn, Ente, Rind,
  Schwein, Reis, Nudeln, Meeresfrüchte, Sushi, Maki, Gemüse, Suppen, Salate, Snacks.
- Limonaden open a size window that stays open after booking and closes only by drag, back or Escape. Other drinks
  with several sizes show them open under a heading; one tap books.
- Lemon: book the drink, then tap “+ Zitrone” once for the glass booked last. No checkbox or preselection; grey while
  unavailable, rosé while usable; unavailable after applying, a size correction, a sort change or reopening.
- Bestellt: bold quantity, label, minus; additions written out. Language button DE/CN, German by default.

### Moving and paying

- “Schieben”: arrow button, then target table, then a confirmation; occupied targets are joined, equal articles
  merge. All lines move, unsent ones too, and are sent under the target's number. No undo, no long press. Whole
  tables only.
- Paying separately happens in Bestellt: tapping a line picks one more for the next payment, tapping its count takes
  one back. Nothing picked pays the whole table; after a part the rest stays. Android back first drops the picks.
- The amount of the next payment stands large at the top. Five buttons at the bottom: DE/CN, move, cash, card,
  voucher. Card, cash and voucher follow the language chosen in Bestellt.
- Cash window: amount prefilled and selected (tips are typed over it), “Gegeben”, change; “Abschließen” always
  works, nothing typed is stored. Own number keys, `inputmode="none"`.
- Voucher window: value credited, becomes a line in Bestellt; vouchers stay with the table until a payment uses them;
  an excess shows “Gutscheinrest”, no change.
- The card closing “Fertig” confirms Nexi's payment. No “Heute” or bill list on phones.
- Android back closes the open window or goes one level back; from a menu to the plan, which sends; on the plan it
  only cancels a move. Keep on-screen back controls for the PC.

## rksv

- Every receipt is signed in a chain with a QR code. Start receipt and FinanzOnline registration, monthly receipts,
  yearly receipt, closing receipt. The DEP is kept 7 years.
- The A-Trust card must be exchanged by May 2027. Under Linux the card runs over PC/SC; test it early.
- If signing fails: “Sicherheitseinrichtung ausgefallen”, then a collective receipt; report after 48 hours.
- Training mode is signed but marked “TRA”. An issued receipt is never deleted, only cancelled (“STO”).
- Every part bill is its own receipt. The payment kind is not required on the receipt.
- Journal securing at least quarterly, unchangeable, on an external medium; plan a monthly DEP export as its own file.
- Money vouchers are taxed at redemption. Keep the old AES key, so the old journal stays checkable.

## Security

- `TOUCHIT/` holds passwords and keys in plain text: never copy them elsewhere.
- Never put this project folder into a public repository. Git only in `WokFlow/`; `TOUCHIT/` and business data never.
- Never start the programs in `TOUCHIT/DECOMPILED/recovered/`.
- No test sales, cancellations or payments at the real POS; talk to restaurant devices only after asking him.

## Folders and environment

- Main folder `AsiaWok_Bonierungssystem_2026`; `WokFlow/` holds the new system and its private Git repo.
- Menu source: `M:/NomWorkspace/NomBusinessworkings/AsiaWokRestaurantGmbH/Kundeninformationen`
  (`AsiaWok_Speisekarte_2026.pdf`); do not change it.
- `TOUCHIT/`: search only in a targeted way; do not change or delete its original subfolders.
- IntelliJ on PC and laptop; `.idea` stays out of Git. `node_modules` is not synced: `npm install` once per machine.

## Open points

- Nexi: data access, costs, tip and reference return.
- Tax adviser: vouchers, tips, cash book, float, payment kind, monthly DEP export.
- Who may correct payment kinds. Cancellation reasons in the backend.
- Holidays Josefstag and Volksabstimmung; table numbers 9, G15, G16 provisional.
- With the boss's wife: interim bill, open credits, staff consumption, bill copy, bill with customer address.
- The catalog lags the prototype (`drinks.ts`); change only after his yes.
- `transaction` for every writing function (Claude recommends yes). `OrderNew` name.
- Git: an old file with real turnovers lies in the GitHub history; `.git` in Syncthing; licence postponed.
