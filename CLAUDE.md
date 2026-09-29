# Asia Wok POS system: project info

Status: 21.09.2026. Translated into English and shortened on that day at the user's request.

**All meta info lives in this file only.** Do not create handoff or memory files. Add new findings and the current
status here. Every new chat reads the whole file, so only what still guides the work belongs here: rules, decisions
with one sentence of reason, open points, the status, the next step. No history, no outdated drafts, nothing twice,
nothing that code or Git already records.

## Collaboration

**Good explaining comes before everything else (user, 21.09.2026: “You have to focus on good explaining. So this is
likely more important than good product, good code … my skill is developing most if you explain good”):** His skill
grows most through good explanations; that weighs more than a fast product or pretty code. Think every explanation
through beforehand so he can grasp it “fast and good and structured and easygoing”. Check every word before sending:
a word he probably does not know is explained first, in one sentence, at the restaurant or at his code, and only used
afterwards. With HTML, CSS, browser he is a complete beginner, so explain the basics there too. Violation on
21.09.2026: “screen”, “switch”, “page”, “reload”, “memory of the phone” unexplained in one answer.

- **Chat language:** English preferred, German where needed, for example with Austrian technical terms, authorities,
  taxes. This file is English.
- **Answers stay very short (many times, 17. to 21.09.2026, hardest: “not a hard limit but rather a soft limit but
  really really tight”):** about six short lines plus at most one small code block or one small table. One thought
  per answer, then “Questions?” and wait. Answer, evidence, recommendation and question are four pieces, not one
  answer: first the answer to the question asked, the rest on “next”. Several questions: answer the first, name the
  others in one line as waiting. No reasons, side remarks or alternatives unless he asks. Applies to build reports
  and handoffs too: the file table plus two sentences, test result and commands on “next”.
- **Exception, lists complete right away (21.09.2026: “wenn vollständig verlangt ist, dann kannst du eben auch länger
  antworten, aber sonst immer so kurz wie möglich”):** A list, table or comparison he asks for to check comes
  complete and checked the first time. Everything else: one piece, the rest waits, “Dialog besser als quasi
  Monolog”.
- **The user dictates (20.09.2026: “I'm using voice and therefore not everything is getting correctly
  transcribed”):** Read a nonsensical word as a dictation error first. So far: Vite as “WIT”, “Witt”, “Vita”,
  “wird”; JSON as “Jason”; TypeScript as “krebs kripps”; Fable as “Faber”; once a whole message arrived in Korean.
  If a rule or a patch hangs on an ambiguous sentence, ask first, do not guess.
- **The user is a complete TypeScript beginner with Java experience.** Explain every new term at the concrete code,
  basics too, gladly repeated. Java comparisons are welcome, for example the index signature
  `{ [name: string]: Group }` like `Map<String, Group>`. **Never explain or compare with a term he does not know
  yet**; explain the new thing itself first, at the simplest example.
- **Explain library functions at the real call, never at the raw signature from a `.d.ts` file:** first his own call,
  then a simplified rebuild next to the real signature with every deviation named (`?`, parameter name, return
  type), otherwise he later takes the rebuild for the real thing. With overloads show all of them and say which one
  his call uses.
- **Build hard things from the ground up, with tiny examples (17.09.2026: “this explanation was good. So save it”):**
  If an explanation does not land, do not add more words or comparisons, start again at the very bottom, one step per
  answer. Every example a few lines, names from WokFlow (`"Cola"`), the result as a comment behind every line
  (`// Article: Cola`), error texts verbatim as in IntelliJ and checked beforehand with `tsc` and `node` in a copy in
  the scratchpad.
- **Always show example code in full (19.09.2026: “you have to show me full code always and not that I have to scroll
  up”):** including every function it uses, never only the changed part. Comments behind the lines name the result
  and when it appears, never the flow. What Node does goes under the code as a numbered list, line by line.
- **On request, quote before explaining, for rest of that chat (user, 21.09.2026: “sometimes I'm in bed, so I
  don't see this”):** as soon as he asks for it, every explanation starts with file name and the lines it talks
  about as a code block, before the first word of explanation. Holds until chat ends, also for single lines.
- **One topic per answer (18.09.2026: “too much requests … we have to sort it out slowly again”):** other questions
  named in one line as waiting. After every patch show every changed line verbatim, file by file; a removal that was
  only described he understood wrongly. The patch report comes in pieces too: piece 1 is the one line that changes
  the behaviour plus the test result.
- **A file is finished only when he says so (20.09.2026: “nobody said that page … ts is done”):** Claude never
  declares a file or a piece done. Everything changed since the last commit is open until he accepts it; Claude asks
  where he wants to read on and at most suggests the next place.
- **A question or a wish is not an order (16.09.2026):** Write into files only on an explicit instruction (“patch”,
  “do that”, “rename …”). If he asks where something is or says how he wants it, only answer and show the code in the
  chat; he often builds such places himself. New files only after an explicit yes.
- **Keep the user's style:** What he writes or corrects himself, code, names, comments, is not smoothed out, not
  renamed back; removed words are not put back in. Read the current state before changes and limit adjustments to the
  affected entries.
- **What lands:** concrete things from the restaurant with Cola and Red Bull, numbered steps, the real SQL sequence
  (`BEGIN`, two `INSERT`, `COMMIT`), a small experiment in memory, a comparison “today's code” against “other way”.
  What did not land: abstract sentences, “Phone A/B”, specification and before/after in one answer. Explain the
  functions that use a helper first, then the helper. With tests in especially small steps, there he calls himself
  “really unfamiliar”.
- **One word, one meaning (16.09.2026):** “order” meant the open process in the first build and the position in the
  prototype, so he did not understand the code. “table” is the table in the restaurant; always call database tables
  “database table” in the chat, and separate them in German if they get mixed up, Tisch against Tabelle.
- **Do not claim a contrast where there is none (20.09.2026 on “Daten” against “Dateien”):** a file is data under a
  name on the disk. A word pair that is only WokFlow shorthand is introduced as such. Here: “the page” (lies finished
  in the folder, is sent unchanged) against “the answers of the API” (our code builds them per request from the
  database).
- **The user's enumeration style:** join exactly two elements with `und`/`and`, for example `Reads and writes`; from
  three elements on evenly, `A, B, C` or `A-B-C` or `A oder B oder C`, without a closing `und`/`and`. Applies in the
  chat, in comments, in the documentation.
- **“Everywhere” means the whole project:** search all files under `src/` and `test/`, not only the current file.
- TOUCHIT serves to compare workflows and weaknesses, never as a build template; do not copy any manufacturer code.
- Several sessions write into this file in parallel: read it fresh before changes, edit in a targeted way, replace
  what is outdated instead of appending history. Helper files of Claude's own get removed afterwards.

**Already explained, build on it, do not explain again** (keywords only):

- Node and server: Node as runtime, npm and devDependencies, modules and imports, HTTP head and content,
  `setHeader`/`end`/`write`, ports and localhost, UTF-8, inheritance, IntelliJ's separate checks for code and comment
  links, `request.url`, `readFileSync`, relative paths from the start folder, `import.meta.dirname`.
- TypeScript: `type`, object type, union type, index signature, `Record`, `Map`, `interface` (WokFlow uses `type`),
  `import type`, `typeof`, `===`, narrowing, template literals, spread `...`, short form `{ tea }`, hoisting,
  `const`/`let`, semicolons, comma after the last entry, shadowing, JSDoc tags, `//#region`, array instead of “list”,
  Dinero options, Ctrl+click, Ctrl+P, `number` like Java's `double` (no `int`, only `bigint`).
- Tests with `node:test`: `test(name, lambda)` instead of `@Test`, failing means throwing, `?` at the parameter,
  `TestFn`, `t: TestContext`, lambdas with fewer parameters, return type `void` or `Promise<void>`, `undefined`
  against `null`, the four overloads of `test`, `done`, functions as values, `interface` and `type` disappear when
  running, `any` against `unknown`, `deepEqual` with and without `/strict`, `:memory:` and `databaseTest`,
  `import * as`, `throws` with a search pattern, why tests at all.
- SQLite: `StatementSync` with `run`/`get`/`all`, every single statement is already a transaction,
  `BEGIN`/`COMMIT`/`ROLLBACK`, without `ORDER BY` no order is promised (like walking through a `HashMap`), SQL `AS`
  against TypeScript `as`, `IS` against `=`, `!==` against `!=`, `COUNT` with `GROUP BY`, `LIMIT ?`, `IN (SELECT …)`.
- Git: staging area, `-m`/`-M`, branch as a bookmark, `parent`, branching off, `origin/main`, `-u`, local against
  global `.gitconfig`, `refs/heads/main`, push (`fetch first`, `non-fast-forward`), `fetch`, `merge`, `pull`,
  fast-forward, blob-tree-commit, `HEAD`, detached HEAD. Open: conflict, practising collaboration for real.
  Step-by-step animations with “Next” land very well; for basic ideas use letters A, B, C instead of commit ids.

## Coding

- As little code, as few files, settings and libraries as needed. No stock solutions, no commented-out leftovers. In
  a conflict readability wins, otherwise brevity. Every function has one task.
- **Never safeguard twice, binding (user, 18.09.2026: “you are a little bit over engineering it”, “waste of code
  waste of time”):** Care and good error texts stay mandatory, but at exactly one place, where the rule lives (for
  orders `orders.ts`). Before every new check, every `try`, every type, every function, every field of an answer,
  three questions, and only build on three times yes:
  1. Does no other place catch this today? Look and prove it with a broken copy in the scratchpad, do not guess.
  2. Does a caller that exists today need it? “The phone might need it later” does not count.
  3. Does it change a result someone sees (saved data, display, log)? Only another status or a nicer text for a case
     that would be a bug on our own side does not count.

  When handing over a module, try deleting every function: if all tests stay green and the behaviour is the same, it
  is too much and does not go into the handover. Evidence from 18.09.2026, all built by Claude and removed again in
  one evening, `api.ts` from 176 to 113 lines: the `try` with status `400`, the open orders as the answer of the
  `POST`, the shape checks `objectRead`/`updateRead`/`orderNewRead`. Hardening that real operation needs is a line
  under “Security round”, not code in advance.
- **Simple first, speed later (user, 18.09.2026: “just try to code as easy as possible. And if the speed is good,
  then we just let this be”):** build the simplest way first and try it on the real phone; caching and similar
  finery only when something is noticeably slow. Do not spread such topics out in the chat beforehand.
- **Whole modules instead of line by line (user, 16.09.2026):** Claude builds a module completely including tests,
  the user reads it afterwards and asks what he cannot explain (why-list). Still valid: show changes to existing
  files as before/after in the chat first (“Show me the code here first, if I understand it, then you patch it”).
  Learning and example code only in the chat, no example files or folders.
- Explain commands like `npm install`, `npm start`, tests and server start first and give them to the user; run them
  only on an explicit order. He wants to learn these steps himself. For Claude's own check after changes: type check
  and tests, plus deliberately broken copies of the source file in the scratchpad; every planted error must turn at
  least one test red. Never try things out in the user's folders.

  ```bash
  node_modules/.bin/tsc.cmd --noEmit --allowImportingTsExtensions --module nodenext --target esnext --types node src/server/index.ts test/orders.test.ts
  ```

  The options are needed because there is no `tsconfig.json`; since TypeScript 6 `types` is empty by default.
- **Node 26 runs `.ts` directly (type stripping):** no compiling, but a running server reads code only at start.
  So always import types with `import type`, otherwise Node stops at start (“does not provide an export named …”,
  happened twice). No `enum` and no `namespace` (“not supported in strip-only mode”), union types like
  `"pure" | "water"` instead.
- English: names of variables, functions, files, fixed values in the code, plus JSDoc. German: visible texts.
  Article names always German and Chinese, no English article translations. `name.de` and `name.zh` are the only
  source for button, “Bestellt”, bill, print; never derive anything from identifiers.
- **The user's naming style:** camelCase, the common part first, then what distinguishes, for example `buffetSmall`,
  `buffetBig`, `variantsBottle`. Group keys in `menu.ts` are the list names (`soups`, `warmDrinks`). Functions and
  types likewise, noun first, then verb or feature: `orderbookCreate`, `orderAdd`, `ordersUpdate`, `tableClose`,
  `databaseOpen`, type `OrderNew`; lookup and conversion with `Of` (`entryOf`, `orderOf`). Unusual in TypeScript, but
  it does no harm; names from libraries stay as they are (`createServer`, `readFileSync`). He often renames things
  himself; do not rename them back.
- **Object or id (user, 17.09.2026, in `orders`):** if the object is meant it is called `article` or `variant`; if
  the German name as an id is meant, `articleId` or `variantId`. In the database table `article_id` and `variant_id`
  like `table_id`; `ordersRead` renames them with `AS articleId` and `AS variantId`.
- **camelCase in TypeScript, underscore only in the database (user, 17.09.2026: “you should be consistent”):** in the
  code `tableId`, never `table_id`; columns in SQL `table_id`, because SQLite ignores upper and lower case in names.
- Folders by task, files by content, no collection files like `types.ts` (15.09.2026): `src/catalog/` articles,
  `src/tables/` tables and their orders, `src/server/` server. Types stand with their data.
- Types written out explicitly at constants, parameters and return values, wanted for learning; `type` instead of
  `interface`. A constant holding a lambda doubles the parameter list with a written-out function type; that
  bothered him a lot (“the name is doubled”), so leave lambdas unnamed at the place where they are used, as in
  `transaction` and `serverCreate`. Double quotes and four spaces of indentation. Short nested object types in one
  line, for example `name: { de: string; zh: string; } | null;`.
- **Formatting via `WokFlow/.editorconfig`** (every setting with an English `#` comment): four spaces, spaces inside
  `{ }` at objects, object types, imports, up to two blank lines, no `max_line_length`. If something is missing, add
  it there, not in `.idea`. **Comma after the last entry:** yes for lists over several lines (arrays, objects,
  imports, arguments, parameters), no for single-line ones, never after `...rest`; in `.editorconfig` as
  `ij_typescript_enforce_trailing_comma = whenmultiline`.
- **Tests (the pattern is `test/orders.test.ts`):**
  - Shape, shown by him at the first test: `test(` alone, under it the name on its own line, under it the lambda,
    then `);`. A short lambda in one line with braces, `(): void => { deepEqual(…); }`; longer ones with braces over
    several lines. No comma after the lambda, although the comma rule above would ask for one; open what applies.
  - **A test name starts with a capital letter, without a full stop:** `"Sending saves all orders or none"`.
  - **As many tests as needed, as few as possible:** one flow test for the main way (“much better to go through all
    the send”), plus one short test per rule that the flow cannot show (“all or none”, “free table”). No own test for
    an edge case that another test already covers. He reads the test names and one test completely, not every body.
  - **Code line length, soft (user, 20.09.2026):** the measure is the vertical margin line in IntelliJ, which he
    measured himself at 120 characters; he has set no hard wrap. He pulled a signature of 101 characters back into
    one line, and two constants with 104 and 107. So: leave up to about 105 in one line, break only clearly above
    that, never because of a few characters over 100. Check with `awk 'length($0) > 110'` over `src/` and `test/`.
    Breaking in his form: an object as the last argument unfolds, one property per line, comma after the last one;
    without an object the function name stands alone and every argument gets its own line; a too long constant breaks
    after the `=` like `entries` in `menu.ts`; a too long signature gets one line per parameter under the first.
  - **No own name for a value used only once (18.09.2026: “just for one time use, we don't need the extra”):** the
    pizza stands in `api.test.ts` directly in the call.
  - **Test orders stand once in `test/setup.ts`, as single `export const colaBig1: Order = orderOf(…)`:** every test
    file imports only the names it needs, without a prefix; **exception from the import rule “from four names on
    `import * as`”, only for test data.** Tried and rejected by him: an object `ordersTest`, then `ot`, then `odt`.
    His names: article, at Cola the size, then always the quantity as a digit (`colaSmall1`, `colaBig2`, `redBull0`);
    no names like `colaLater` or `colaTwo`, no constant without a digit. `{ add: […], remove: […] }` stands in one
    line where it fits under 100 characters, unfolded only in the three `throws` of `orders.test.ts`. Never break
    `deepEqual` (“I don't like that some deep equals are inside it and some don't”), rather shorter names or two
    `deepEqual`.
  - **`beforeEach` and `afterEach` get exactly one `//` line directly above (18.09.2026: “these are important stuff
    here”, “just make a quick one line comment at most”):** starting capital, no full stop. IntelliJ does not render
    a JSDoc above a call.
  - Fresh state per test (his decision against Claude's advice, do not undo): on file level
    `let database: DatabaseSync;` and `beforeEach((): void => { database = databaseTest(); });`, the block framed by
    two blank lines each. Never share a database across tests. `test/setup.ts` holds everything only tests need;
    `node --test` carries it along as its own passing file, which does not bother him.
  - **Tests do not check error texts (“the wording can change so better to just see if something is thrown”):**
    `throws(lambda)` without a second argument. The risk of throwing for another reason is covered by the flow test.
  - A test lambda with `(t, done)` that never calls `done()` hangs forever without a time limit (checked).
  - `node:test` against a database in memory, no new library, start with `node --test` in the folder `WokFlow`, no
    script in `package.json`.
- **Error texts (user, 18.09.2026: “one time you put in the table ID, one time not … very shitty”):** always built
  the same way inside one file. An error text names what the caller does not know (article, quantity), not what he
  handed over himself (`tableId`); `api.ts` logs time and address with the table. His texts: “… needs a valid
  quantity of at least 1”, “Not enough ${order.articleId} to remove ${order.quantity}”, “No open orders”.
- **SQL in the code (user, 18.09.2026, undone by himself, do not bring back):** no named `StatementSync` constant;
  `database.prepare(…).run(…)` stands directly at the place, in the loop too, as in `tableClose`. His loop form
  `portion = 1; portion <= order.quantity`. `ORDER BY` exactly where the order counts. After every change to
  `orderbookCreate`, adjust the real `wokflow.db` and remind the user to refresh the data source in the database
  window: IntelliJ's SQL check reads the columns from there and otherwise reports outdated errors. The file cannot be
  deleted while IntelliJ holds it open (“Device or resource busy”); then remove an empty table with `node:sqlite` via
  `DROP TABLE` and create it again.
- **Imports (user, 17.09.2026, for readability):** from four names out of an own project file and from six names out
  of an external module (Node or library) on, use `import * as name from …` instead of single names. The limits
  apply per source file; name like the file, for example `orders.ordersUpdate`. Three names from an own file stay
  single (`{ menu, entryOf }`, because `menu.menu` is ugly). Regular imports stand before `import type`. Exactly one
  blank line between the groups when both groups have at least two statements and at least one group has three;
  otherwise the groups stand directly under each other. A group with only one statement never gets a separating
  blank line.
- **Layout in `src/catalog/`:** two blank lines after the imports and around regions, otherwise one. Regions as
  `//#region Name` … `//#endregion Name`, without a space after `//` (otherwise IntelliJ does not fold), nestable;
  only where a file has several parts. An `if` with one statement may stand without braces.
- **Data files look like data (user, 16.09.2026):** helper functions only where they save a lot of repetition. A
  chain of helpers for drinks was too hard to read for him and was undone; variants stand written out as they appear
  on button and bill.
- **No articles where they are not needed, in every comment (user, 21.09.2026, twice in one chat: “why did you
  put the the the the again there”):** holds for JSDoc, `//` lines, html comments and file headers alike.
  “Shows occupied tables on the plan.”, never “Shows the occupied tables”; “Name of page, shown in browser
  tab”. Not mechanical, he keeps an article where it reads wrong without it. Before handing over, read every
  comment you touched once more and delete every article that carries nothing.
- **JSDoc** in English, without examples or example values, only above declarations, not above statements; at
  constants it describes the content. Every function and every type gets one, as do the constants in `menu.ts`. The
  lists in `buffet.ts`, `food.ts`, `drinks.ts` stand without JSDoc, name and data explain themselves.
  - Functions as IntelliJ generates them: description, under it `@param name - …` for every parameter, otherwise
    IntelliJ reports “Parameter is not described”.
  - **`@throws` like in Javadoc (18.09.2026):** every function that throws or passes an error on gets, after `@param`
    and `@returns`, exactly one line `@throws {Error} - When …`, with a hyphen, without a full stop, as short as
    possible, without a subordinate clause; no sentence “Throws when …” in the description any more. `transaction`
    passes through: `@throws {unknown}`.
  - **From his corrections:** the comment uses the verb of the function name (`orderRemove`: “remove”, never “take
    off”). `@returns` names the type as a link (`@returns {@link MenuEntry} with price and tax rate`). A description
    may begin directly with the link, without “The”.
  - Lists as parameters are called `ordersToAdd`, `ordersToRemove` (verb names only for functions). A lambda goes
    directly into `transaction(database, (): void => { … });` instead of an inner function `work`. His newer form in
    `requestHandle` (18.09.2026, wrapped by himself, do not undo): every parameter on its own line under the first,
    then a blank line before the function body.
  - Object types: one JSDoc before the type, properties as a list `` - `name`: … ``, only those that need
    explaining; no comments at single properties.
  - Links only as `{@link Name}`, without `|` and link text. Explain used library functions this way when needed,
    methods through their declaring class (`{@link Writable#end}` with an import from `node:stream`); imports needed
    for that are allowed. IntelliJ checks comment links itself and needs `@types/node` for it.
  - **Comments in `api.ts`, rewritten by the user himself (18.09.2026: “I want you to learn from your mistakes,
    quoting me, making comments”); that is how he writes them, so Claude writes them the same way:**
    - Under the first sentence a bullet list instead of more sentences; continuation lines indented under the text.
    - No article at the start of a bullet: “Sends menu.”, “Sends open orders of table.”, “Adds/removes orders of
      table.”, “Locks table for device in body.” No articles inside the sentence either, and `/` for two verbs.
    - Used functions as bullets with a link and one short sentence, own ones like foreign ones:
      `{@link createServer}: Stores the lambda and calls it once per request, with a fresh request and response from
      Node.` The behaviour in one sentence instead of three lines. At the second mention no link any more. A bullet
      about a used function starts with the verb that says what the function does: `{@link relative}: Resolves way
      from page folder to file, …`.
    - Addresses in the form of the HTTP request line (`` `GET /menu`: Sends menu. ``), status codes in backticks, as
      already `closed` or `BEGIN`. Test names are plain text and stay without backticks.
    - **No `//` comments inside the function body (18.09.2026: “I just don't like these two comments”, then “thats
      clean”):** local constants whose content is not obvious stand as a bullet in the function's JSDoc, the name in
      backticks. **His exception, and his newer rule from 20.09.2026 (see “Status”): what a constant is stands as a
      short `//` at the end of its line**, starting capital, without an article (`// Path of url, without protocol,
      host, port.`). **`if` chain of `requestHandle`, as he formatted it on 20.09.2026:** a blank line after every
      branch before the `} else if`. Do not undo.
    - **Claude's slip:** a `replace_all` with a trailing space turned `=== "lock"` into `==="lock"`; look at the
      places with Grep after every `replace_all`.
  - **Exception from “without examples” at his explicit wish (18.09.2026):** the JSDoc of `requestHandle` lists the
    addresses in the form of the HTTP request line and shows a real HTTP request as a code block with three
    backticks. Only there.
  - **Link everything linkable (user, 17.09.2026: “if something is linkable, link it”, “take it seriously”):** if a
    comment names a type, a function or a constant reachable in the file, `{@link Name}` stands there, once per
    comment at the first mention; over a star import with the namespace (`{@link orders.Order}`). Plural as
    `{@link Order}s`, unless the plural changes the word (`categories`), then without a link. Module lines in the
    file header and database names like `orderbook` stay in backticks.
  - **Shape of the sentences (18.09.2026, corrected by hand in `ordersRead`):**
    - Every sentence ends with a full stop, the last one of a block too. Whoever touches a JSDoc checks all of its
      lines, not only the new one.
    - No long comment lines, **guide value about 75 characters**, soft: 85 he accepts in a single case, 90 he does
      not like any more; what matters to him is not hitting the vertical margin line in IntelliJ.
    - **Break where a human pauses when speaking (18.09.2026, explicitly corrected):** not mechanically before “so”
      or “and”, but where you naturally stop when reading aloud, often after a comma. Read the sentence half aloud
      before breaking it. Every sentence starts on a new line. Check before handing over:
      `awk 'length($0) > 80 && /^\s*\*/'` over the changed files.
    - One word, one meaning applies in comments too: a row of the database table is a “portion”, an `Order` is a
      variant with its quantity. Never “order” for both in one sentence.
    - A comment promises only what the code does today.
    - **Comment over a three-slash line, not behind it (corrected by hand, 21.09.2026):**
      `// Note for type checker only` stands on its own line above `/// <reference types="vite/client" />`.
      Trailing `//` stays reserved for constants.
- **Comments in `commands.md` (user, 17.09.2026, shortened by hand: “your commentary is shitty. Please learn from
  your mistakes”):** one English line above every command, without a full stop: what the command does, then after a
  comma the options as `-x: meaning`, for example
  `# Run all tests from the WokFlow folder, --test: finds test files`. No examples, no operating hints like “stop
  with Ctrl+C”. Read the neighbouring lines as the pattern before writing.
- **File header in the user's style (corrected by hand several times):**
  - `## Title`, under it a description as running text, no bullets; if the title says everything, no description
    (`## Drinks`). No additions in brackets, no level numbers. Files without imports start directly with the JSDoc of
    the first declaration: two comment blocks before the same declaration do not work, IntelliJ then does not render
    the first one. **If the first declaration is the main thing of the file, its JSDoc carries the file header (user,
    20.09.2026, written by himself in `locks.ts`: “look at it and learn from it”):** `## Title`, blank line, the
    description as a whole sentence with the actor in front, blank line, the property list. His wording:
    `## Table-lock`, “The device that has the table open holds a table-lock.” The term is “table-lock” with a hyphen.
  - **Description as short as possible (18.09.2026, on `api.ts`: “should be as short as possible because the function
    below explains this already”):** as a rule one sentence on what the file does. Nothing that the JSDocs of the
    functions and types below already say.
  - Modules: one bullet line per module directly under the description, without a heading `### Modules` (removed by
    him). The module in backticks without a web address, behind it what the module does, not what the imported names
    do. **The same module has literally the same line in every file (18.09.2026: “I want everywhere the single same
    explanation”):** look with Grep how the line reads in the other files before writing.
  - **Modules imported only with `import type` get no line (18.09.2026: “if something just with import type then dont
    need”):** a module line stands only for modules with at least one regular import. The `import type` itself stays,
    even when only a `{@link …}` needs it.
  - Test files: no lines for the own files under `../src/`, the Node modules stay. In `orders.ts` the line for
    `../catalog/menu.ts` remains.
  - Exception `articles.ts` and other files with few imported names: one `` - {@link Name}: `` per name with an
    explanation of what it is and what the file needs it for; never leave these out, unless the name is imported only
    with `import type`. No heading `### Modules` there either.
  - Modules and properties always stand as a bullet, single ones too; every other single statement becomes a normal
    line, for example “Start with `npm start`.” in `server/index.ts`.
  - The user's wordings stay, for example in `articles.ts` “Defines the article type with its variants and stores
    variant prices as Dinero amounts.” and in `api.ts` “Connects the requests of the phones to the server, where the
    menu and the saved orders are.”
- IntelliJ: `// noinspection DuplicatedCode` has no effect in `.ts` (checked by the user).

## Getting started

- The main folder is `AsiaWok_Bonierungssystem_2026`. This file lies in `WokFlow/`, the folder of the Git repo: if
  Claude starts in the main folder, it is not loaded by itself and has to be read first.
- `WokFlow/` = the new system. New code, tests and the Git repo live only there.
- `TOUCHIT/` = everything about the old system, about 10 GB. Search in it only in a targeted way, never search the
  whole folder.
- Everything outside the main folder does not belong to the project, `M:\NomWorkspace\CLAUDE.md` included.
- **Restaurant documents, source named by the user:**
  `M:/NomWorkspace/NomBusinessworkings/AsiaWokRestaurantGmbH/Kundeninformationen`. The current
  `AsiaWok_Speisekarte_2026.pdf` lies there, also `AsiaWok_Plakate_2026.pdf` and `AsiaWok_Speisensteller_2026.pdf`.
  Look there for menu, groups, names and variants; the originals are business documents outside the code project. Do
  not change them unasked.

## Goal

The old POS system TOUCHIT is replaced by a new, lean system: **WokFlow**. The user builds it anew with AI help
(Fable 5.1 plus a second model). The old code serves only for understanding and is **never copied**, it belongs to
the manufacturer. The analysis makes weaknesses and possible improvements visible. Old groupings, configurations and
workflows are no template for WokFlow; the new system is designed as simply as possible out of the restaurant's
actual needs.

## Manifest: WokFlow in the big picture

The whole system in one piece, from ordering to the tax adviser. Details and sources are under “Decisions”,
“Accounting”, “Correspondence” and “rksv”. If a newer entry there contradicts this section, the newer one applies and
this section is brought up to date.

### 1. What WokFlow is for

- POS and ordering system of ASIA WOK Restaurant GmbH (Messeplatz 1, Halle 10, Klagenfurt): buffet with wok, menu
  and drinks. Buffet 11:30 to 14:30 and 17:00 to 21:30, Tuesday closed except on public holidays.
- WokFlow replaces TOUCHIT, at the latest by May 2027: then the rksv signature card has to be exchanged, and TOUCHIT
  probably does not know the new card. Rough estimate from 13.09.2026: 62 to 96 working days with AI help, 8 to 12
  months alongside other work.
- Guiding rules: function first, then simplicity. Large, well readable buttons for waiters between 50 and 60. On the
  screen only what helps in the moment. As little code as possible. TOUCHIT serves only for comparison.

### 2. The business in numbers

- About 35 tables, 9 employees (payroll May 2026 about 21,500 € gross), one person takes the money, more than 80
  bills a day.
- Card turnover 30.09.2025 to 31.08.2026: 481,669 € in 336 days, so about 520,000 € a year, 29 card payments and
  1,434 € a day, 49 € per payment.
- Example days: 02.09.2026 turnover 2,144.30 €, of that card 1,352.50 € (63 %). 13.09.2026 turnover about 2,413 €,
  card about 1,235 € (51 %), cash 1,178.10 €, of that buffet and kitchen 1,846 €. Total turnover from that roughly
  0.9 million € a year (estimate, not an accounting figure). About 80 % food, 20 % drinks; WokFlow sets the standard
  tax rate per main category, articles that differ stand once in an exception list (see “Articles and groups”).

### 3. Devices and technology

- One server: Lenovo mini PC with Linux at the counter, with a touch monitor (POS and boss workplace), a card reader
  with an A-Trust signature card (rksv), a central printer (Metapace T-3II) and a USB SSD.
- 4 to 5 Android phones of the waiters. WokFlow is a single web app, the same page in the browser on phone and
  counter monitor. The boss unlocks every phone once, waiters need no code, the boss at the PC a boss code.
- Network: FRITZ!Box with an operating WLAN (server, phones, printer, card device), guest WLAN separate.
- Card payment via Nexi: today a mobile terminal “Mobile Premium” at the counter, planned in addition the Nexi app
  (SoftPOS) on the cashier phone Redmi Note 13 Pro 5G.
- Software: TypeScript (Node on the server), one SQLite file on the server, money in whole cents. Backup running
  into the cloud, hourly to the USB SSD, a full one at night.
- No emergency mode: if the server fails, work continues with the paper order pad.

### 4. Service workflow

1. Table plan after the sketches and restaurant photos from 14.09.2026: **inside or garden**. Plain rectangles: 1–5
   exactly as big as 12–16, table 6 as small as table 7, table 20 smaller. No drawn benches. The group of 20s stands
   at the far left of the inside plan; 18/19 stands upright on the right. 18, 19, 23, 24 stay bookable singly, number
   25 is dropped. The former room with the 30s tables lies above the garden on its side; both have to fit on one
   screen. The garden aisle is clearly wider; table 17 lies next to 19, the gaps at 21/22 and 24/23 are evened out.
   Free: grey tinted without a border. Occupied: filled rosé without a border. **No dots, no occupied/free legend, no
   amounts or dwell times.**
   **Table lock (decision of the user, 18.09.2026):** a table is only ever open on one device, the PC counts as one.
   Reason: two waiters in the same table are a mess, and the system should stay as simple as possible. The lock has a
   time limit that the device extends while the table is open; if a phone fails, it runs out by itself. It lives in
   the server's memory and comes with the screen module. Independently of it the server saves every message of a
   phone completely or not at all (`ordersUpdate`).
2. A table starts at **Getränke**, next to it **Buffet** and **Speisen**. **No quick selection.** Align subgroups
   with the business; the structure may differ from the printed menu. Chosen: a compact shared header with a large
   table number without the word “Tisch”, with the tabs “Bestellen / Bestellt”. The framed table number leads back to
   the table plan, an own button “Tische” is dropped. Chinese under the German tabs.
   Getränke and Speisen always start in the category list; no group opens automatically. A small back arrow to the
   group list, no additional way back inside it. Groups as a list without a heading.
   Drinks in two columns with German on top, Chinese underneath. Food as compact single-column buttons with German
   and Chinese next to each other, wrapping completely when space is short. One name per article, the same on the
   button, in “Bestellt” and on the bill.
   “Bestellt” with names in one line, one language at a time; a small language button “DE”/“CN” at the bottom right
   next to the big bill button, without an own header.
   Quantity fields show the unpaid quantity at the table; a small display with a big tap area, no zero. Direct
   articles can be reduced by one new portion there. At articles with a selection the number outside is display
   only; removing happens in the menu at the concrete size or sort. New portions without an undo bar. Portions
   already sent can be corrected in the selection window too, there with “Rückgängig”. New portions of the same
   variant are reduced first; other sizes stay untouched. A Cola button opens Cola/Zero/Light with the fitting sizes
   or the bottle underneath. Articles German/Chinese without prices. Quantities with a dot: `0.25`, `0.5`,
   `0.3 + Wasser`.
   Buffet with plus/minus for adults as well as 6–9 and 3–5, without the word “Jahre”; under 3 without an own
   counter. Chinese for 6–9 “儿童”, for 3–5 “小童”. “Erwachsene” stays while entering and is dropped only in
   “Bestellt”; children there in brackets, for example “Sonntagsbuffet (6–9)”, in Chinese also only the age.
   Mittag, Abend, Sonntag, Feiertag are four separate buffet kinds; Sonntag and Feiertag have the same price, both
   from 11:30 to 21:30. At the top only the buffet name with Chinese, the time span on the right; the header unfolds
   the four kinds. **One buffet kind per table (16.09.2026):** tapping switches the kind, people already counted move
   along, because a table is billed by one kind only. The later automatic should preselect the tariff from date,
   weekday and public holiday, without showing the current time; the choice stays until a new time starts.
3. **Sending on the way back:** the framed table number leads back to the table plan and sends new positions, as
   known from the TOUCHIT phone; Escape does the same. No own “Bonieren” button. Drinks and à la carte on one shared
   ticket at the central printer, no separate tickets; buffet without a ticket. Do not print what was already sent
   again. In the backend, return successfully only after a confirmed save; let errors stay visible.
4. Correction at the open table: minus at the drink or food line; **it must be possible to undo an accidental
   removal**. Name of the removed article plus “Rückgängig”, without a time limit until the table view is left,
   several steps undoable one after another, separate per table. The undo area stays visible outside the scrolling
   order list. No extra confirmation window, no swiping. In “Bestellt” only quantity and minus, at the buffet too;
   its plus/minus stands while entering. The undo shows only the German and Chinese name, without “1 ×” or
   “entfernt”. Cancellation reasons and the traceability of changes already saved stay backend topics. No additional
   cancellation tickets wanted.
5. **Paying separately is important:** in the bill select articles and quantities for one person, take the money for
   this part bill, close only the paid quantities; the rest stays open at the table. Afterwards return directly to
   the next person in the same selection, until everything is paid. The normal case stays the whole bill directly.
   Only by articles, never by a freely typed sum. Moving to another table stays a separate function (see “Screen and
   operation”).
6. Bill: WokFlow creates the receipt, signs it (rksv chain, turnover counter, QR code) and prints it. After that the
   receipt is unchangeable. Every part bill is an own receipt. The payment kind does not stand on the receipt.
7. Paying: point 5.
8. Mistakes after paying: only the boss at the PC, only the whole bill, with a signed cancellation receipt, money out
   of the till, then a new bill. Discounts are given only by the boss at the PC too.

### 5. Paying without switching (plan of the user, 14.09.2026)

- **Card is only what Nexi confirms. Everything else is cash.** Vouchers are recorded explicitly. In the normal case
  nobody switches “Bar” or “Karte” and nobody types amounts.
- Card: the waiter taps “Karte”, WokFlow sends the bill amount to the Nexi terminal or the Nexi app on the phone. The
  guest chooses the tip there. Amount, tip and transaction number come back automatically: bill amount as card
  turnover, tip separately. While the payment runs, WokFlow shows “Warte auf Nexi”; if the answer is missing,
  “Zahlung prüfen”, and the table stays open (do not count it as cash, do not trigger it again). Declined means:
  nothing booked.
- Cash: “Bar kassieren” opens the cash closing with a change calculator. “Abschließen” works without any input; if
  needed type the amount given and the change is calculated at once. A cash tip is never recorded, it goes directly
  to the waiter.
- **No “mixed” mode (14.09.2026):** guests do not split a single payment between cash and card. A remaining amount
  after a voucher belongs in the voucher flow. Own vouchers with a number, foreign vouchers (Edenred, Nexi paper)
  with the provider. Paying separately for different guests by selecting articles is explicitly wanted and is
  something else.
- As long as there is no direct connection: at the day closing WokFlow reads the Nexi payments in and marks the
  matching bills as card, the rest is cash. Matching only with a reliable reference (equal amounts or a day total are
  not enough), all devices and the same period, reading in again books nothing twice. If data is incomplete or
  unclear: “Zahlungen prüfen”, never silently cash. Where WokFlow gets the Nexi data from is open (answer from
  Nexi).
- Switching stays as a function for exceptions: “Heute” shows the payment kind of every bill and allows a correction
  until the day closing, with a log (old, new, time, device, user). Who may correct, all waiters or only the boss, is
  open.
- Why: today the POS fixes the payment kind when the bill is printed, guests often change their mind afterwards, the
  card total does not match, and the boss's wife works it out by hand every evening with the Nexi slip. Only Nexi
  knows for sure whether a card was used.
- Legally (to confirm with the tax adviser and in the rksv session): a card payment on site counts as cash turnover
  for tax, the receipt is the same for cash and card, the payment kind is a logged note, card turnovers are
  recognisable through the transaction number (§ 131 and § 132a BAO, FAQ Arbeitskreis Kassensoftware 2.4.15).

### 6. Day closing (boss at the PC, one button “Tag abschließen”)

- WokFlow warns about open tables and updates the Nexi data (status visible, again when closing).
- The page shows turnover, card and cash in large type, under it only lines that are not 0: card turnover plus card
  tip equals the Nexi payout amount, vouchers redeemed and sold, cash expenses, cancellations, turnover per goods
  group and per tax rate (net, VAT, gross). No counting of the till.
- Till: cash-paid purchases are entered with the amount and a short text. **“Zur Bank” = cash minus cash expenses
  minus card tips paid out.** The float is a fixed stock outside the till and does not count.
- “Tag abschließen” locks the day, prints a complete ticket with goods groups (to file on paper, as long as the
  boss's wife and the tax adviser want paper), creates a PDF and data for the monthly sending and starts the backup.
- For comparison today: boss menu, two reports as tickets with many zero lines, the Nexi slip and a hand
  calculation, filed per day.

### 7. Where the money flows

- Cash: pay “Zur Bank” into the company account daily. Purchases in cash with a receipt, the receipt stays paper.
- Card: Nexi Germany pays every Monday into the company account, separated by card kind and already without the
  disagio (card fee in percent). Device rent and 0.02 € per payment come by direct debit. Costs today together about
  0.76 % of the card turnover, around 3,960 € a year, disagio 0.63 % on average.
- Card tip: comes with the Nexi payout into the company account, the waiters get it in cash from the drawer in the
  evening. A pass-through item, not turnover.
- Vouchers: sold money vouchers are 0 % when sold and taxed normally when redeemed. Given service vouchers (for
  example buffet for 2) are booked with amount 0 when redeemed. Foreign vouchers are taxed normally and handed in at
  the provider, WokFlow keeps a list for that. Vouchers are sold only by the boss at the PC.
- To the authorities (general knowledge, not checked, look it up in the tax account on FinanzOnline): wage tax,
  employer contribution and surcharge on the 15th of the following month to the Finanzamt (May 2026: 922 €, 591 €,
  59 €), social insurance on the 15th of the following month to the ÖGK (May 2026: 7,482 €), municipal tax 3 % of the
  payroll to the city of Klagenfurt (May 2026: 647 €), VAT on the 15th of the second following month, corporate tax
  prepayment quarterly. So the monthly “bill from the Finanzamt” is mostly VAT and wage levies.

### 8. Month and year

- End of month, automatic: rksv monthly receipt (a receipt over 0 €), export of the rksv journal as an own file that
  is never overwritten (USB SSD and cloud), monthly evaluation as PDF and data by e-mail to the tax adviser, sent
  from the mailbox of the boss's wife. Plus a button “An Steuerberater senden”.
- December: yearly receipt, check it with the app of the finance ministry.
- Tax adviser Mag. Helmut Allesch (Klagenfurt): bookkeeping, monthly VAT return, payroll, annual accounts. He gets
  the POS evaluation, account statements, receipts, Nexi settlements and time sheets.
- Keep for 7 years: receipts, rksv journal, day closings, Nexi settlements. The user's filing in
  `M:\NomWorkspace\NomBusinessworkings\AsiaWokRestaurantGmbH` (scheme `Kategorie/Jahr/AsiaWok_Typ_JJJJMM.pdf`).

### 9. Accounting and access (plan)

- Now: ID Austria for Li Vu and Kim Hong Vu, so that the GmbH gets FinanzOnline and USP access (tax account,
  decisions, VAT returns, ÖGK contribution account) and the user gets a user of his own. Request the documents from
  the tax adviser (mail under “Correspondence”).
- Unclear: who is managing director in the company register; according to GISA the trade licence runs on Li Vu
  personally instead of on the GmbH. Clarify both.
- Later, when WokFlow runs: a few months of bookkeeping in parallel with the tax adviser, then the running
  bookkeeping themselves. Payroll and annual accounts stay with the tax adviser (a recommendation, not decided).

### 10. Card payment in stages

1. Start without a direct connection: read the Nexi payments in at the day closing and match them (point 5).
2. Terminal coupled (ZVT over WLAN, Nexi unlocks it): the amount goes to the device automatically, payment and tip
   come back at once.
3. Nexi app on the cashier phone (app-to-app interface): no more walking to the counter, the terminal stays a
   reserve. Goal: at today's contract conditions, not at the list price of 1 %.

The building block “card payment” in WokFlow has only two tasks: send the amount, fetch the result. That keeps the
provider exchangeable (alternative hobex).

Phone call with Nexi on 15.09.2026, according to the user: Nexi wants to make a good offer and is looking for POS
partners anyway. The offer waits until WokFlow is developed further; after that the user thinks a joint solution with
SoftPOS is possible. Nexi also offered an Android device with a small card reader that prints no ticket; model
according to the user “A27” or similar, name still to be confirmed. Idea of the user: normally take the money with
this device, today's terminal stays for guests who really need a terminal ticket. Not decided.

### 11. Switch-over and later

- A trial period next to TOUCHIT (practice receipts in training mode), then register WokFlow at FinanzOnline with a
  start receipt, TOUCHIT a few more days as a reserve, then a closing receipt and deregistration.
- After the start: ordering by QR code by the guests.

### 12. Open, and whose turn it is

- User: wait for answers from Nexi and the tax adviser (mails under “Correspondence”), ID Austria. The table plan
  sketches are there; single handwritten numbers still to be confirmed.
- Tax adviser: documents, cash book, float, tips, vouchers.
- rksv session: monthly and yearly receipts, A-Trust card under Linux, confirm the payment kind without a receipt.
- Screen: who may correct payment kinds, the public holidays Josefstag and Volksabstimmung, confirm table numbers 9,
  G15, G16.
- Module chats (since 17.09.2026): one whole module per chat; flow, rules, order, next task under “Next chat”.
  Catalog and the module `tables` stand, the server interface is in work, after that the screen.
- User with the boss's wife: interim bill, open credits, staff booking, bill copy, bill with a customer address (see
  “TOUCHIT comparison” under “Decisions”).
- Technology: the way to the Nexi data, cloud provider, VESA mount, spare printer.

## Next chat: explain the page from the ground up, then read `plan.html` (handoff of 21.09.2026)

**Order of the user (21.09.2026: “start again at the basics … then deduct from it, why, what travels when … and what
is our architecture”):** The new chat first explains how the page is built, from the ground up, one rung per answer,
and goes on only when he has understood the basics. He calls himself a complete beginner here. The ladder (rungs 1–6
all went through on 21.09.2026 in the evening and landed, see the two landed blocks right below the ladder; kept here
only as the map, do not walk it again):

1. Who can run what: the browser on the phone understands only HTML (what stands on the page), CSS (how it looks),
   JavaScript (what it does), no TypeScript. Node on the server PC runs TypeScript directly; `api.ts` and `orders.ts`
   never leave the PC. Vite translates in between. `plan.ts` itself never travels, only its translation.
2. What `npm run build` does before a phone is involved at all: out of `src/page` comes `dist`. In it an
   `index.html` in which Vite has rewritten the lines to `router.ts` and `plan.css` to the built files under
   `/assets/`, one JavaScript with all the TypeScript of the page and the text of `plan.html` as a string, one CSS,
   fonts, logo. Only name the file names with a fingerprint, do not go deeper (they confused him a lot).
3. What `npm start` does: one program, port 3000, two tasks: send out the page from `dist` unchanged, build the
   answers per request from the database.
4. What travels in which order when the waiter opens WokFlow: `GET /` brings `index.html`; the browser reads it and
   fetches CSS and built code, the CSS fetches fonts and logo; the code puts `planHtml` into the `body`,
   `planStart()` asks `GET /tables`. His knot: “index calls plan.ts, plan.ts travels from where”.
5. What travels after that: only answers; the router takes the screens out of the built code.
6. The possible architectures and their price, then ours: all screens hidden in one HTML file; separate pages per
   screen (every switch is rung 4 from the start, the code restarts, its memory is gone); router (our build); his
   variant “the plan stands in `index.html`” (costs no extra travelling, but the plan would be the one screen whose
   HTML stands in no variable of our code). Landed: `plan.html` becomes a constant through the import, like
   `static final String`; `index.html` the browser reads itself, once, before our code, and throws the text away.

**Page and build mechanics, landed 21.09.2026 evening (do not repeat, only connect):** Rung 1 confirmed. The name
`page` stays over `client`/`phone` (client is a role Chrome plays and we do not write Chrome; the same files run in
desktop Chrome while building). `?raw` built from the ground up with two scratchpad builds he watched: without Vite
`import planHtml from "./plan.html"` fails (`MISSING_EXPORT "default"` in a Vite build, `ERR_UNKNOWN_FILE_EXTENSION`
in plain Node), because `import` only fetches a value from a code file and HTML hands out no value; `?raw` is Vite's
order to read the file and hand its characters as one string, pasted into the built JS in place of the import (he saw
the built line `var e=` … `;document.body.innerHTML=e`). Without Vite you read text at run time instead: Node
`readFileSync` (the server does exactly this, out of `dist` only, via `pageFolder`), the browser `fetch`. Vite walks
the tree from `index.html` (its two `href`/`src` lines), then the lines inside each reached file (`plan.css` names 3
fonts + logo, `router.ts` names `plan.html` + `plan.ts`); everything reachable is built, nothing else even in the same
folder; `root: src/page` only says where Vite starts. All CSS is glued to one file, all TS to one; fonts and logo stay
own files (binary, not letters). The real build makes a `dist` of 7 files: `index.html`, 1 CSS, 1 JS, 3 fonts, logo.
The browser does not know it received HTML by itself — the server's `Content-Type` header tells it (`page.ts`
`contentTypes`): `text/html` show as page, `text/css` use for looks, `text/plain` would show tags as visible text.
HTML loads first because the CSS address stands inside it; Chrome shows nothing until a head stylesheet has arrived. An
`<a href>` is a jump, not a pull: the old page is thrown away and the JS restarts empty — that is exactly why we chose
one HTML plus our own screen-swap. `document` is the tree Chrome builds from the characters of `index.html`; chain
characters → tree → picture; `innerHTML = planHtml` hands Chrome characters, it makes tree parts and repaints. Inner
room and garden are two `div.area` in the same `plan.html`, not separate screens; the tabs show one. Only `plan.html`
sits in the JS today, `order.html`/`bill.html` do not exist yet.

**Connections and timing, landed 21.09.2026 evening (do not repeat):** The 7 fetches do not go in sequence; the phone
opens a few lines and pulls them in one or two waves, once at open, then none of the 7 travels again. Leitung = a TCP
connection = an open phone call; the phone (client) builds it to PC port 3000, the PC (server) picks up, the server
never calls first. Connection ≠ request: one connection carries several requests one after another, not one connection
per request; the phone opens a few so several run at once. In Java: a `Socket` is the line (TCP), the text form on it
is HTTP; `node http` opens the socket and speaks HTTP. Lifetime: no central decider, both sides run their own idle
timer (Wecker), the shorter one wins, either side may hang up anytime; checked in `node http`: `keepAliveTimeout` =
5000 ms (server closes a silent line after 5 s), `requestTimeout` = 300000 ms. Two separate roundtrips (Läufe): the
handshake only opens the line (~one roundtrip), the question with its answer is its own roundtrip on top; line already
open → 1 roundtrip, line closed → 2. Cost model (Hausnummern, local wifi, ~3 ms a roundtrip): for small JSON the
roundtrip is almost the whole wait and the bytes are ~free (picture Bote/Zettel: the note adds no time, a 165 KB
parcel does); tap with line open ~3 ms, line closed ~6 ms, open the page ~30–50 ms. So shrinking a small JSON saves
nothing; Vite's packing only helps the 165 KB open. Real wifi to be measured once the server runs. The router saves
screen-switching entirely (plan → order → bill is a local body-swap, no handshake, no data, the HTML is already in the
loaded JS), but the live data (which tables are occupied, the menu, sending an order) still travels as JSON, one
roundtrip per question.

**Reading `plan.html`, landed 21.09.2026 evening (do not repeat, only connect):** built up the full one table-button
line `<button class="table" data-table="1" style="grid-area: 1 / 1">1</button>` element by element. A tag is an
open-and-close pair (`<button>` … `</button>`); the content between them (`1`) is the visible label. An attribute sits
in the open tag as name=value. `class="table"` is a shared group label so one CSS rule paints all 41 buttons.
`data-table="1"` is a per-button note our tap-code reads: one handler for all 41 (like a Java `ActionListener`) asks
the tapped button which table it is; kept separate from the visible text because the takeaway button shows `M` while
the code wants a clean key, and not put in a class (the identity is unique per button, a class would kill the shared
group and force parsing the number out of `"tisch1"`); why not `id` was already settled. `style="grid-area: 1 / 1"`
is one inline CSS line (row / column in the grid), inline because the position is unique per button while the shared
looks live in the class. `grid-area` is CSS core, no framework; grid and flexbox are two built-in layout tools, we use
grid for the plan, flexbox is not needed. His CSS fear addressed: no memorizing, only the few rules the page needs,
one value at a time with the page open. Corrected his wrong model: `index.html` does not forward and does not point at
`plan.ts`; it is the one page that stays, with an empty body, its head points at the router (the built JS), the router
pulls in `plan.html` (as text) and `plan.ts` and fills the empty body.

**Continue here (state at end of 22.09.2026, after midnight):** `index.html` and `router.ts` are read through and
landed, he says so himself. `plan.html` is read as far as header, tabs, offline note and the five blocks; the tables
themselves are still open. Next: the nesting inside `tables-indoor` (`table-pair`, `tables-front`, `divider`,
`aisle`, `logo`), then `plan.css` with the page open, then `plan.ts`.

**Explained on 22.09.2026 and landed (do not repeat, only connect):** the viewport line from the ground up, in this
order, and every rung landed: a page is drawn on a sheet whose width the browser picks; phones fake 980 since the
first iPhone 2007 so old desktop pages still fit; `width=device-width` refuses that; a css dot is normed to 1/96
inch, about 0.26 mm, so 48 dots is a fingertip on every phone; the maker's ratio (1080 hardware, ratio 3, reports
360) buys sharpness, never room; phones report 320 to 430, so widths flex and finger sizes stay fixed; Android calls
the same thing `dp`; `initial-scale=1` says the same as `width=device-width` from the other end, scale 2 would mean
180 dots across. Also landed: `rel` is the relationship, `href` points at a document that stays separate while `src`
pulls content in; the six import forms as a table; `?raw` works because Vite writes the missing `export default`;
a three-slash line is read only by the type checker and must stand before the first statement.

**Written into the code on 22.09.2026 (nothing committed):**

- `index.html`: one comment above every head element, his wording for the viewport line kept.
- `plan.html`: the two header links became `<button ... data-screen="reservations">` and `data-screen="today"`, so
  IntelliJ's “cannot resolve anchor” is gone; five block comments added.
- `plan.html`, `plan.css`, `plan.ts`: 42 class words dropped, because place already says what the element is.
  `.table` is now `.tables button`, `.tab` is `.tabs button`, `.header-button` is `.header button`, and
  `.table-pair .table` had to become `.tables .table-pair button`, otherwise `.tables-indoor button` wins over it
  and the table pairs lose their height. Only `selected`, `short`, `small`, `takeaway` stayed as classes. In
  `plan.ts` both tab lookups now read `.tabs button`. Dead `color: inherit` and `text-decoration: none` removed.
- `plan.css`: finger size 44 to 48 everywhere, his decision, Android is the target, Google says 48 dp and Apple 44.
  The single `40px` in the garden columns stayed untouched.
- `router.ts`: articles out of the JSDoc; he moved the `//` note above the three-slash line himself.
- Checked, not guessed: position and size of every table, divider, aisle, pair and logo measured in the browser
  before and after the slimming, identical to the pixel, and the tab switch tested.

**Open after that session:** the header buttons still do nothing, the router has to listen for `data-screen`;
undecided whether the two tabs `data-area` should be renamed `data-screen` (asked, not answered); two smaller
shortening candidates left, the nested `div` around the indoor tables and `class="tables tables-indoor"`; the
`vite/client` bullet in the JSDoc and the `//` line above the reference say the same thing twice.

**After that:** `plan.html` and `index.html` in the agreed order (first one table row: tag, content, attributes, of
those `class` and `data-table` explained, `style` open; then nesting; then the visible parts from top to bottom; last
the ten browser lines of `index.html`). Then build and look (`npm run build`, `npm start`, `localhost:3000`; he has
never seen the page, there is no `dist`). Then `plan.css` with the page open, then `router.ts` and `plan.ts` with the
DOM functions one at a time. After that: commit (he does it), shorten this file, slice 2.

**Status of the code (21.09.2026):** Last commit `978e97d`, containing everything from 20.09. including `resume()`
in `pathSend`. Not committed: the router rebuild in `src/page` (new `plan.html` with the 88 plan lines unchanged; new
`router.ts` with `/// <reference types="vite/client" />`, a default import of `./plan.html?raw`,
`document.body.innerHTML = planHtml;`, `planStart();`; `index.html` with only the head and an empty `body`; in
`plan.ts` the two start statements inside `export function planStart()`), `vite.config.ts` (his comments),
`commands.md` (`build` and `watch` in, `dev` out), this file. From him, not from Claude: `AGENTS.md` deleted,
`src/server/index.ts` changed. Checked in a copy in the scratchpad: build without errors, page correct in the browser
(41 table buttons, 14, M, G3 rosé, tabs switch), type check of `router.ts` without errors, without the `reference`
line TS2307. Deliberately not built: a function `screenOpen`, it comes with the second screen.

**Open for slice 2:** how screens open each other without `plan.ts` and `router.ts` importing each other (the
header buttons now carry `data-screen`, the router listens later; the old idea with the address behind `#` is
dropped, it only works when every screen stands in the same document); moving the general
part out of `plan.css` (colours, fonts, `body`, `button`) into a file of its own; building the 41 table buttons from
a list (his idea, parked until the plan is read).

**Accepted by his word:** `src/server/api.ts`, `src/server/page.ts` (“finished completely”), `test/api.test.ts`,
`vite.config.ts`. Understood and rewritten by him, but not explicitly accepted: `index.ts`, `orders.ts`,
`orders.test.ts`, `test/setup.ts`. Not yet read: `package.json`, `.gitignore`, everything under `src/page`.

**Explained on 21.09.2026 and landed (do not repeat, only connect to it):** for-of with `const`; `vite.config.ts`
completely (`root`, `outDir` counts from `root`, `emptyOutDir`, minifying stays, source map as a table “place in the
built code to place in the `.ts`”); `defineConfig` returns the object unchanged and serves only the type check, like
`OrdersUpdate` at `ordersUpdate`; `export default` is the export under the fixed name `default`, Vite reads
`module.default`; all import forms as a table “normal `import` against `import type`” (TS1363, TS1361), a plain
`import "./x.ts"` only runs the file, every file runs only once; HTML is text and can stand as a string in
TypeScript, `?raw`.

**Lessons for Claude from 21.09.2026:** Do not give the wording of a specification as the mechanics (“new variable
each round”; he wants to know what the machine does, and he was right). Do not dig deeper than asked (the letters in
`mappings` cost an hour; ask his question “do we really need to know this” earlier yourself). Count numbers before
they stand in the chat (41 buttons, not 45). He wants Claude's honest recommendation on the learning order (“you just
should tell me how I understand this best”) and reads nothing that is foreseeably going to be rebuilt.

**`resume()` in `pathSend` (decided, he kept it):** Claude had justified it wrongly (“otherwise the test file never
ends”; checked: the tests end without it too). The right reason stands in the Node documentation on
`http.ClientRequest`: whoever listens for `response` has to consume the body, otherwise the unread data stays in
memory. **Lesson: never name a reason that has not been checked.**

**To-do list, deliberately postponed (his words: “maybe it's not worth it to learn this deeply now”):** mock
(`t.mock.method`, the type `Mock<…>`) he has not understood deeply; touch it again only when he asks.

- **One server, no `/api` (decision of the user, 20.09.2026, “rebuild!”):** Vite only translates any more (`vite
  build` puts the finished page into `dist`, `npm run watch` repeats that on every save), our server sends out `dist`
  and answers the addresses; one program, port 3000, in development as in the restaurant (“I don't want complexity
  and otherness for the development and the discrepancy then to the restaurant”). He reloads by hand, he does not
  want automatic refreshing. With that the Vite server, the proxy, port 5173 and `fs.allow` are gone, and the
  addresses are `/menu`, `/tables`, `/tables/:table/orders|lock`: the `/api` had only carried the proxy rule, and in
  `dist` there are only `/index.html` and `/assets/…`. **Lesson for Claude:** he asked four times “why do we need
  this”; Claude first defended the intention instead of checking the assumption behind it. Offer the simpler
  arrangement earlier. In the restaurant the Vite server must not run anyway: in the copy it served every project
  file over `/@fs/…`, `wokflow.db` included (checked, `200`).
- **`src/server/page.ts`:** `contentTypes` (extension to `Content-Type`, at the same time the list of what is sent
  out at all) and `pageSend(response, path): void`: `/` is `index.html`, `join` resolves `..`, a check keeps the file
  path inside the folder, `no-store` as at `responseSend`, so that he never sees an old page after a build.
  **`pageSend` answers both cases itself, file or `404` without a body (his decision: “this would be really
  clean”):** Claude's first version `else if (!pageSend(…))` he found “cringe”, rightly, a condition should ask, not
  act; the last branch of `requestHandle` is now a plain `else { pageSend(response, path); }`. The call stands in
  `requestHandle` so that an error while reading lands at `.catch` in `serverCreate`. **His words (renamed by
  himself):** in `api.ts` `path` instead of `address`, `pathMatch` instead of `match`; in `page.ts` the file path is
  therefore called `file`. **Comments:** name the thing instead of “it” where it costs nothing; a second sentence
  says what something is needed for, as generally as you would say it to a beginner, “sent” instead of “travels”.
  Landed: no file travels, only its content as characters, which is why every answer names its type.
- **The folder of the page is a constant in `page.ts` (his decision: “I don't want to keep parameter … just because
  of the test, that's not clean code”):** `export const pageFolder`, built like the path in `database.ts`, `export`
  only for the tests (like `locks`); the check is `relative(pageFolder, file).startsWith("..")`. **Tests with
  dummies (his idea: “the test can make dummies”):** `before` creates a dummy, `after` removes it, a built `dist`
  stays untouched. **Lesson:** he rejects a parameter that only the tests need, even when it looks like `database`;
  ask first how the tests can help themselves.
- **Structure of the page from slice 2: router instead of hiding (decision of the user, 21.09.2026: “if that's
  common and clean code, then go for it”):** many small files in the code (“modular”, his word), everything travels
  once, Vite packs it together. `index.html` holds only the head and an empty container; every screen has its own
  files (`plan.html`, `plan.css`, `plan.ts`, later `order.…`, `bill.…`). A router in TypeScript opens a screen by
  taking the old one out of the container and putting the HTML of the new one in. Nothing is hidden, only one screen
  ever stands in the document, so two screens never share the pot of `id`s. One order screen for all tables, the
  table id comes as a parameter. Rejected: all screens in one HTML file with `hidden` (661 lines in the prototype),
  and separate HTML pages per screen (every switch loads anew, menu and unsent things in the phone's memory would be
  lost). **His fear: CSS and DOM (“I'm really afraid”, “hard and frickling”):** explain the few DOM functions one at
  a time at `plan.ts`; read CSS only with the page open, change one value per rule, reload, look. **`data-table`
  stays:** not the button text (text is for humans, “Mitnehmen” against `M`), not `id` (does not say “table”, and all
  `id`s of a document share one pot).
- **The screen is built in slices (user agreed, 20.09.2026):** for browser code there are no style rules yet; his
  corrections to slice 1 become the rules for the rest. Inside a slice Claude builds everything completely, after
  that it is read slowly. **Good instead of fast (user: “du musst nicht schnell bauen … clean, so kurz wie möglich,
  so lang wie nötig, in meinem Stil”):** after building, name clearly which files changed and which are new, how much
  in them is new, as a table (file, new, what), and start with that; after that file by file every changed line
  verbatim, TypeScript first, CSS and HTML after. **The list stays (user: “this is good that you show me. Don't make
  it away”):** he sees the changes in Git but cannot read the Git view yet. Installing (`npm install -D vite`) stays
  his business (“really good that you left it to me”): Claude only enters the script.
- **The page:** `vite.config.ts` (26 lines: `root`, `outDir`, `emptyOutDir`, `sourcemap`), `src/page/plan.html` (the
  plan from the prototype, one line per table with `data-table` and `grid-area`), `src/page/plan.css` (344, out of
  the 98 rules of the prototype that the plan really uses, flattened together), `src/page/plan.ts` (47: `tablesShow`,
  `areaShow`). **At the server:** `orders.ts` (+16, `tablesRead`: `SELECT DISTINCT table_id … WHERE closed IS NULL`,
  without `ORDER BY`, because no caller needs the order), branch `GET /tables` in `api.ts`, `orders.test.ts` (+3) and
  `api.test.ts` (+2), there always only one occupied table in the comparison, so that no test depends on an order
  that was not promised. `package.json`: scripts `build` and `watch`; `.gitignore`: `dist`.
- **Checked in a copy in the scratchpad, never in his folder:** type check without errors, 42 tests green, broken
  copies caught 6 of 7 at `tablesRead` and 8 of 8 at `page.ts`. Against the running server: all addresses and files
  correct, 8 attempts to leave `dist` (`/../wokflow.db`, `/..%2f…`, `/..\…`) end with `404`. Page in the browser at
  360 × 780 measured against the prototype: all tables, lines, aisle, logo the same, only everything 1.8 px higher.
  Fits at 320 × 640 without scrolling too. Without a server the strip “Keine Verbindung 无连接” appears (new, Chinese
  to be checked by him). The built page is about 165 KB.
- **Style corrections of the user while reading (20.09.2026, “I found it too long, learn from my style”), they apply
  before the older rules under “Coding”:** in `requestHandle` he deleted all bullets about local constants from the
  JSDoc; what a constant is now stands as a short `//` at the end of its line, starting capital, without an article
  (`// Path of url, without protocol, host, port.`). The JSDoc of a function says only what it does, plus the address
  list. A signature with four parameters he breaks after the second, two per line, the continuation under the first
  parameter, without a blank line after it. **Bullets about used functions start with the verb that says what the
  function does.** In `pageSend` he wrote the `if` with `else` instead of an early `return` himself, deleted the
  constant `contentType` with its `undefined` check and put the purpose of `no-store` as a `//` at the end of the
  line.
- **Promise has not settled yet (user, 20.09.2026, on re-reading `await once(server, "listening")`: “write in the
  handoff that I still had problem with the promise”):** He no longer knew why `once` gives a Promise and `server.on`
  does not. What carried: the three roles as a table (the author of the class Promise builds `ready` in the
  constructor and calls `worker` at once; the creator of a Promise writes `worker`, in WokFlow the authors of `once`
  and `fetch`; the user only writes `await`, that is him); `ready` as a button that ends the Promise; `worker` with a
  name instead of a lambda; the smallest example with `setTimeout(ready, 1000)`. Separate who builds `ready` (the
  constructor) and who calls `ready` (whoever gets the button from `worker`: timer or the server's slot, so Node).
  What did not carry: “hands us”, “we” without saying who is meant, the helper variable `readyKept`. Start with the
  role table next time. **Breakthrough the same night at `pathSend` (`await once(raw, "response")` gives an
  array):** he played the whole rebuild through aloud himself and ended it correctly. What carried: all lambdas as
  named functions (`worker`, `inSlot`), different names for different things, a rebuilt `EmitterSimple` with `once`
  and `emit`, and above all `console.log` with numbers 1 to 6 in every step next to the real output. His own memory
  sentence: know when something is only stored or handed on and when it is run (name without brackets against name
  with brackets). Who decides what: the class Promise how it ends (`ready`), the emitter, so Node, when and with
  which values (`emit`).
- **All the scaffolding of the API tests lives in `test/setup.ts` (his decision, 21.09.2026; no new file: “setup is
  like a new file”):** `export let database` and `export let url` (other files read them, only `serverStart` sets
  them; `url` is new per test because the port is chosen freely), `serverStart`, `serverStop`, `pageDummyCreate`,
  `pageDummyRemove`, plus `updateSend`, `lockSend`, `pathSend` with his comments verbatim. `api.test.ts` has only
  four hooks built the same way and the tests, 96 instead of 175 lines. An exported `let` shown to him at two small
  files (reading works, writing gives TS2632). **Only one dummy (his decision after a long back and forth):**
  `index.html` with the text `pageDummy`, only when no page is built; `pageDummyRemove` deletes it only when its
  content is the dummy (**his rule: a test restores the state it found**); an empty folder `dist` may stay behind.
  The CSS dummy is gone, because Vite gives the real CSS a new name per build. The names with a fingerprint and
  `no-store` confused him a lot; do not open that again, for WokFlow only this holds: `pageSend` and `responseSend`
  always send `no-store`.
- **Too many comments in Claude's `setup.ts` (user, 21.09.2026: “you messed up a lot of comments … so much
  unnecessary there”, he shortens himself):** a comment says only what name and signature do not already say; no
  JSDoc that rewrites the function name into a sentence, no two lines where one is enough, nothing that doubles the
  `//` line at the hook. **Leave out articles where the sentence stays readable without them, in all comments (“many
  the is not really needed for readability”):** “Closes test server” instead of “Closes the test server”. In the next
  chat read his shortened `test/setup.ts` first and take the comment density there as the measure.
- **For the cleanup round:** on further growth move the page tests to `test/page.test.ts`; with the screen slices
  check which API tests stay. Comment lines over 80 characters in `orders.ts` (25, 41, 98, 149), `articles.ts` (49),
  `menu.ts` (52), `database.ts` (16), `menu.test.ts` (4); the database table is called `orders` in the SQL and
  `orderbook` in the comment and in `orderbookCreate`.
- **The plan asks only when it is shown, no timer (decision of the user, 20.09.2026):** TOUCHIT never refreshes the
  phone table plan by itself either (checked in `Bonieren_1a.aspx` and in the decompiled code); an old colour cannot
  book anything wrong, because opening reads fresh and locks. Later if needed: ask again when the phone is unlocked.
- **Deviations from the prototype, all without visible effect except the first:** table pairs 19/18 and 24/23 have 12
  px rounding on the outside like all tables (prototype 8 px); English class names (`table`, `occupied`, `tab`,
  `selected`); no transparent borders; logo as a CSS background, because Vite does not find an `<img>` outside `root`
  during development; no `aria-label` and no `type="button"` (no form on the page); `large` is dropped (no effect on
  the phone).
- **Explained on 20.09.2026 and landed:** the page against the answers of the API; Vite translates TypeScript and
  sends the page out; a package as a library (`dinero.js`) or a tool (Vite); the page travels once, after that only
  answers; colouring happens on the phone with the label `occupied` (CSS class, not a Java class); `vite` against
  `vite build`, `dist` is only a folder name; `/../../` at the example `wokflow.db`. **What did not land:** “data”
  against “files” as opposites, `dist` and Caddy in one answer with two ways, a specification with five points. What
  did land: showing inserted lines with their neighbours and marking them with “← new”.
  **Not explained yet and contained in the new code:** `export default`, `defineConfig`, `join`, `extname`, `sep`,
  `existsSync`, the `?:` expression in `pageSend`, `request` from `node:http` with `resume`,
  `document.querySelectorAll`, `classList.toggle`, `toggleAttribute`, `addEventListener`, CSS grid and `subgrid`.

**Decisions of the server modules, from the walkthrough of 18. and 19.09.2026 (the walkthrough itself is done):**

- **`orders.ts`, accepted by the user piece by piece and designed with him:** `ordersUpdate(database, tableId,
  update: OrdersUpdate)` is the only writing door besides `tableClose` and the only place with `transaction`.
  **`OrdersUpdate = { add: OrderNew[]; remove: OrderNew[] }` lives in `orders.ts` (decision of the user,
  18.09.2026):** the type `Change` in `api.ts` was too vague and in the wrong place for him. So everything is called
  “update”: `ordersUpdate`, in `api.ts` `updateRead`, in the test `updateSend`. A call reads
  `orders.ordersUpdate(database, "14", { add: [colaBig1], remove: [] })` and says itself which list does what. Under
  it, without `export` and without an own transaction, one order each: `orderAdd` (fetches price and tax rate itself
  with `orderOf`, checks the quantity, creates one row per portion) and `orderRemove`. Everything coming from the
  phone is `OrderNew`; nobody outside can hand over own prices. **Remove first, then add (his rule):** a removal
  always means portions from before this message; what has not been sent yet the waiter corrects on the phone.
- **`orders.test.ts`, 5 tests, exactly one per cause of a throw (his cut):** the flow, “A quantity below 1 changes
  nothing” (the only test in which an already executed removal has to be rolled back), “Only portions from before a
  change can be removed”, “A free table has nothing to remove or to close”, “Price and tax rate come from the menu”.
  **Every `throws` gets a keyword as a pattern (`/quantity/`, `/menu/`, `/remove/`, `/open/`), never the whole
  text** (this replaces “do not check error texts”): a bare `throws(lambda)` passes on every error, also on the wrong
  one; in one test only one rule may be able to throw. Whether a test is needed is decided by the try with broken
  copies.
- **`api.ts`:** `GET /menu`, `GET` and `POST /tables/:table/orders`, `POST` and `DELETE /tables/:table/lock`,
  `GET /tables`; everything else `404`. **No own error class and no status 400 (decision of the user, 18.09.2026:
  “this client shit … too much for me”, “We should program this that the client never can make a mistake”):** every
  error lands in `serverCreate`: `500`, “The server failed”, the reason as a line in the server log. Nothing wrong is
  saved anyway (`transaction`). With the table lock and a screen that only lets existing things be removed, such an
  error is a bug on our own side, not the waiter's. **The `POST` answers with `200` and `null`, no longer with the
  open orders (“why we have to respond … if the phone already knows what it sent”).** **The shape check is gone
  (“remove is better”):** the `POST` branch calls
  `orders.ordersUpdate(database, tableId, await json(request) as orders.OrdersUpdate)`. Proven with 14 broken
  requests against a copy with and without the check: both times `500` and the table unchanged, because `orders.ts`
  rejects everything itself.
  **No `undefined` where an empty text is enough (18.09.2026: “this is just not beautiful with the undefined”):**
  `?.[1] ?? ""`, checked with `!== ""`. **Patterns with many slashes as
  `new RegExp("^/tables/([A-Z0-9]+)/(orders|lock)$")` instead of between slashes (“readability higher”; he deleted
  the lower-case letters himself, tables have only digits and capitals, so `g3` and `G3` can never become two
  tables).** One pattern for both addresses (his idea: “it's about the same table”), out of it `tableId`
  (`pathMatch?.[1] ?? ""`) and `tableResource` (`pathMatch?.[2] ?? ""`). Words: the result of `match` is called
  “match”, the `()` are “capture groups”, `orders`/`lock` in an address is a “resource”.
  **`GET /menu` sends `menu` raw, as it stands in `menu.ts` (18.09.2026, “patch the API as easy as possible”):** per
  category `tax`, `print`, `groups`; a price arrives in the text form of Dinero, the phone reads `price.amount`; in
  the orders `price` stays a number in cents. Calculating with Dinero comes only with the bill.
- **Deliberately left out, note it for the security round before real operation:** size limit for the body (64 KiB),
  check of the `Content-Type`, status 405, decoding of the table id. Reason: only our own phones in the operating
  WLAN talk to the server. Open for the screen: double sending when the answer is lost in the WLAN (idea: an id per
  message that the server accepts only once). Also: a check at the door, and the sent body does not stand in the log.
- **`api.test.ts`:** (1) flow over real HTTP requests: menu against `JSON.parse(JSON.stringify(menu))`, updates at
  table 14 and G3, both tables read back; (2) “An unknown address gets status 404”; (3) “A failure gets status 500
  and the server keeps running”; (4) the table lock flow; (5) two tests for `pageSend`. Proof: 12 broken copies, the
  3 old tests caught all 12 while the 6 even older ones missed two.
- **Table lock, `src/tables/locks.ts` with `test/locks.test.ts`:** type `Lock = { deviceId, expires }`, constant
  `lockDuration`, the constant `locks` (`Map<string, Lock>`, with `export` only for the tests),
  `tableLock(tableId, deviceId): boolean`, `tableUnlock(tableId, deviceId): void`.
  - **The `Map` lives in `locks.ts`, not at the caller (idea and decision of the user: “this is really nice”):** like
    `entries` in `menu.ts`. Gain: one parameter less. Because all tests of a file share the one `Map`, the test file
    empties it before every test: `beforeEach((): void => { locks.clear(); });`. Rejected: an own table per test, an
    own `Map` of the tests as a third parameter. **Lesson for Claude (“why don't you suggest me that previously”):**
    look for a model in the user's own code before building and show the shorter version first; fewer parameters
    weigh more for him than a fresh state per test.
  - **`lockDuration` is 5000 (changed by him from 30000).** Consequence for the screen: the page has to renew clearly
    more often than every 5 seconds, about every 2 seconds; if two renewals are lost in the WLAN, the table is free.
  - **Occupied is not an exception:** `tableLock` returns `false` when another device has the table and does not
    throw. **Taking and renewing are the same function.** **The device id is a text the device chooses itself**, not
    the IP address. **`tableUnlock` checks the device**, so a phone with an expired lock does not delete the lock of
    the next device; expired entries stay in the `Map`, no cleaning up. **`tableUnlock` stays `void`**, nobody would
    read the answer. **`POST …/orders` does not check the lock:** the page renews before sending, after that it holds
    the table safely for `lockDuration`.
  - **His `//` comments in the second test of `locks.test.ts` (written by himself):** behind every line the clock
    reading or the result, in lower case, in his words: `// clock 4999`, `// lock obtained (at 0)`,
    `// lock refused (5000 > 4999)`. Do not remove.
  - **Explained and landed (20.09.2026):** a lock is only a note (device, expiry), `locks` the notebook with at most
    one note per table; `locks.get` gives `undefined` without a note; `typeof` does not know `Lock` at runtime;
    `Date.now()` is a number in milliseconds since 1970; renewing is another call of `tableLock`; the renewing sits
    on the phone, because only the phone knows whether the table is still open. Also `t.mock.timers`:
    `enable({ apis: ["Date"] })` and `tick`, so `tableLock` needs no parameter only for tests.
- **`orders.ts` split (wish of the user, 18.09.2026: “for me its long somehow”, “orderbook is good”):**
  `src/tables/orderbook.ts` holds `orderbookCreate` and `transaction`, both with `export`. `orders.ts` holds the
  types `Order`, `OrderNew`, `OrdersUpdate` and the six order functions and imports `transaction`; `orderAdd` and
  `orderRemove` stay without `export`, so `ordersUpdate` remains the only writing door. No own test file for it
  (“just one test is enough”). The regions in `orders.ts` he removed himself (“we don't need region if we just have
  three methods”).
- **When he is overwhelmed (18.09.2026: “i am sooooooooo overwhelmed”):** Claude had shown three rebuilds of
  `serverCreate` in a row. Lesson: answer only the question asked, do not push further drafts; on overload stop at
  once, close open decisions with “it stays as it is”, name one single small next step.
- **Practical:** the real `wokflow.db` has the database table `orders` without `quantity`; after every change to
  `orderbookCreate` IntelliJ's data source needs a refresh. Never test in the user's folders, only with copies in the
  scratchpad; a server started there on port 3000 has to be stopped again (`netstat` shows “ABHÖREN” on German
  Windows, not “LISTENING”).
- **Git:** Sophale works on rksv and pushes to `main` (`src/rksv/`, `dep.ts`). **rksv is not the user's part for now
  (20.09.2026: “this part is not for me currently”); do not read it and do not touch it in module chats.** Git is
  done by the user himself. In frustration he switches to German, then answer in German.

### Way of working per module

Decision of the user from 16.09.2026: Claude builds whole modules, no longer line by line. Reasons: four days gave
about 500 lines, at that speed WokFlow will not be finished by May 2027. Writing from nothing he practises at
university; from the project he takes the picture in his head, the judgement about code, the debugging, a finished
product.

1. One module per fresh chat. A module is a feature that can be tested alone in one evening. Modules are named after
   their task, never after a number, for example module `tables`.
2. First the specification: about ten lines, what goes in, what comes out, what must never happen. Claude proposes
   it, the user corrects; building starts only after his yes.
3. Then the plan: which files are new, which existing files change, and there every change as before/after, line by
   line. Build only after the yes.
4. Claude writes the whole module including tests (`node:test`, no new library), runs the type check and the tests,
   shows the result, gives the start command.
5. The user starts it himself and tries to break it.
6. Errors: the user searches himself first, then he asks. Debugging was the biggest gap in the Anthropic study.
7. Why-list: the user reads every new file once and marks every line he cannot explain. The module is finished only
   when the list is empty.
8. One cleanup round at the end, together, once. Not before; cleaning up before it works is perfectionism.
9. Costs: a fresh chat per module, because every message sends the whole chat so far along.

### How deep the why goes

- Level 1, every unknown name, one sentence: what it does, why it stands here. Example `readdirSync`: reads the names
  in a folder, waits until it is finished, returns a list.
- Level 2, every new idea, as deep as needed: `async`/`await`, transaction, callback, modules and imports, types.
  Finished when the user can explain it and predict what happens on a change. The whole project has maybe 15 such
  ideas. Name the Java counterpart for each: he knows Java up to generics, `ArrayList`, streams and `map` and wants
  the same depth in TypeScript; `T[]` like `ArrayList<T>`, `array.map` like `stream().map`, `| null` like `Optional`,
  arrow function like lambda.
- Level 3, not in a module chat: how Node does something inside, all options of a library, library source code. In
  the project libraries are understood through their interface and their one idea (Dinero: money as whole cents plus
  currency).
- Stop rule: if the answer changes nothing about how WokFlow code is read or written, stop.

### Protection of what exists (user, 16.09.2026: “don't destroy something which I coded already”)

- Untouched, unless the module needs it and the user has said yes to the shown change: `src/catalog/*`,
  `src/server/index.ts`, `src/server/database.ts`, `tmp/*`, `package.json`, `.editorconfig`, `commands.md`, `icons/`,
  `fonts/`.
- New modules in new files, folders by task (`src/tables/`), no collection files.
- Do not smooth the style of existing files, do not change names. All rules under “Coding” apply to generated files
  just the same.
- Every change to an existing file: first the list “changes / stays”, then before/after, then the yes.

### Status of the files

The code is the truth; only what it does not say itself stands here.

- `src/catalog/`: article catalog complete, see “Articles and groups”. `menu.ts` has in `//#region Lookup` the type
  `MenuEntry` (only what an order needs), the flat list `entries` with one line per variant, `entryOf(articleId,
  variantId)`, which throws at an unknown name. Tried and rejected before, because it was all too complicated for
  the user: `Map` with the text key `"Cola|0.5"`, `Map` in `Map`, an immediately called lambda, own functions
  `priceOf` and `taxOf`.
- `src/tables/orders.ts` and `src/tables/orderbook.ts` with `test/orders.test.ts`: module `tables`, accepted by the
  user.
- `test/menu.test.ts`: four tests for `entryOf` (price per variant, tax rate of the category, tap water, unknown
  names); `orders.test.ts` therefore imports neither `dinero.js` nor `menu.ts`. Planned, not patched: two honestly
  named tests over all variants, “every variant is found with its own price” and “no two variants share the same
  name” (needs `Set`, explain it first).
- `src/server/database.ts`: `databaseOpen()` opens `WokFlow/wokflow.db` with `node:sqlite`, the path over
  `import.meta.dirname`. `src/server/index.ts` opens it at the start, creates the database table with
  `orderbookCreate`, starts the server from `src/server/api.ts` on port 3000.
- `src/server/api.ts` and `src/server/page.ts` with `test/api.test.ts`, `test/setup.ts`: accepted by the user.
- `src/page/`: `index.html`, `router.ts`, `plan.html`, `plan.css`, `plan.ts`; not read yet, see the handoff above.

### Module order

1. `tables`: orders per table in SQLite. Built 16.09.2026, accepted.
2. Server interface: catalog and orders as JSON over `node:http`. Built and gone through (18. and 19.09.2026).
3. Table lock: `src/tables/locks.ts` and the address `…/lock` in `api.ts`, built 20.09.2026. Only the page that
   locks, renews and unlocks is missing.
4. Order screen on the phone with the real catalog, design from `tmp/screens.html`, in slices. Slice 1, the table
   plan with the occupied tables from the server, is built; slice 2 is opening a table (take and renew the lock, read
   orders, show “besetzt”, the way back asks `GET /tables` again). With the screen come the special rules for lemon
   and buffet persons. Moving to another table needs a function in `orders.ts`.
5. After that by the manifest: bill, payment, printing, rksv, day closing.

### Module `tables`, specification

- A table (id as text: `"14"`, `"G3"`, `"M"`) has any number of orders. Module and folder are called `tables`, every
  position is an order, there is no own record for the open table.
- **One row per portion (idea and decision of the user, 18.09.2026, “patch it this way”):** the database table
  `orders` has no column `quantity`. Per row: table, German article name, variant name or null, price in cents and
  tax rate at the time of booking, `closed` (time of closing, name by the user instead of `closed_at`). A portion is
  open as long as `closed` is empty; a table without open portions is free. The quantity is counted, never stored:
  the phone still sends `quantity`, sending creates that many rows, `ordersRead` counts per variant with `COUNT(*)`;
  the type `Order` with `quantity` stays the same for all callers. Reason: now all operations have the same shape,
  select n rows of a variant, then insert, delete, later mark as paid; paying separately later means marking n rows
  instead of splitting one row. Price: more rows (about a thousand a day, irrelevant for SQLite). Rejected: one row
  per table and variant with a counted quantity; the needed uniqueness does not work in SQLite at variant `null`,
  because `NULL` values count as different in a unique index.
- **`Number.isInteger` in `orderAdd` stays:** `number` is like Java's `double`, TypeScript has no `int`. With 1.5 the
  loop would create 2 rows, with 0 or -1 none, each without an error. The check replaces the former
  `CHECK (quantity > 0)` of the database. Whole numbers are exact in `number` up to 9007199254740991, so cents and
  quantities are safe.
- **Orders only with names (decision of the user, 17.09.2026):** `OrderNew` is `Omit<Order, "price" | "tax">`, so
  `{ articleId, variantId, quantity }`, as the phone sends it. `orderOf(orderNew)` makes an `Order` out of it:
  fetches `entryOf` once, sets price and tax rate, throws at an unknown name. Rejected: one single type with `price?`
  and `tax?`. The category the phone deliberately does not send: it decides the tax rate, and the menu knows it
  already. Open: the name `OrderNew` fits removals badly (JSDoc added, name not changed).
- **No status, saving happens only at sending (user, 16.09.2026):** the database knows only what was sent. Orders not
  sent yet the phone holds and corrects and sends all at once on the way back to the table plan, removals of portions
  already sent as well; “Rückgängig” happens before that on the phone. If the phone crashes first, they are gone and
  are entered again; according to the user rare and acceptable. Two sent colas plus one more read as “Cola 3”, there
  are no separate orders per sending. **The ticket still prints quantities (“print should still print the qty”):**
  printing happens from the message, which carries `quantity`, not from the database.
- **Order is promised (decision of the user, 18.09.2026):** `ordersRead` sorts by the oldest open portion of every
  variant (`ORDER BY MIN(id)`), and the `DELETE` in `orderRemove` takes the newest portions first with
  `ORDER BY id DESC`, so a variant keeps its place as long as it exists; then no line jumps in the screen
  “Bestellt”. Without `ORDER BY` SQLite deleted the oldest rows and “Cola 0.5” slipped under “Cola 0.25”. Costs
  nothing: `EXPLAIN QUERY PLAN` shows the same search in the index `tables_open` with and without it.
- `tableClose` sets `closed`, the portions stay stored. Catalog changes do not change booked orders (rule under
  “Articles and groups”).
- **Transactions:** changes with several statements run as an SQLite transaction, all or none. `orderRemove` deletes
  first and checks `changes` afterwards (3 colas asked for, 2 there: the 2 are already deleted, only `ROLLBACK`
  brings them back). `transaction` without a generic (user, 16.09.2026): `work: () => void`, because no caller gets a
  value back. **Open (user, 17.09.2026):** it bothers him that not every writing function runs through
  `transaction`; `tableClose` is a single `UPDATE` and therefore already a transaction. Claude's recommendation: the
  rule “every writing function goes through `transaction`, reading ones do not”. Not decided.
- Lemon and buffet persons are orders like any other; their special rules come with the screen.
- Not in module `tables`: HTTP, screen, payment, bill, rksv, printing, table plan.

### What the new chat does first

1. Read this file, first “Collaboration” and “Coding”, then the beginning of the section “Next chat”.
2. Read `src/page/index.html`, `src/page/router.ts`, `src/page/plan.html`, `src/page/plan.css`, `src/page/plan.ts`,
   plus his shortened `test/setup.ts` as the measure for comment density.
3. Explain the ladder above to the user, one rung per answer, then read `plan.html` and `index.html` in the agreed
   order, then build and look.
4. After that slice 2 of the order screen, first the specification. At the end rewrite this section for the next
   step.

## Current status

Planning in the manifest, status of the code under “Status of the files”, the next task at the beginning of “Next
chat”. New code only in `WokFlow/`.

- **Short status:** the article catalog is finished (closed according to the user). Module `tables` is built and
  accepted, with `ordersUpdate` as the only writing door. The server interface (`api.ts`, `page.ts`, their tests) is
  accepted. The table lock is built, the page that locks is missing. Slice 1 of the order screen, the table plan, is
  built and not yet read.
- Server: start with `npm start` (`node src/server/index.ts`, without `--watch`, restart after code changes), port
  3000. At `EADDRINUSE` stop the old server with Ctrl+C. Relative paths count from the folder in which node starts:
  IntelliJ's run button at `index.ts` starts in `src/server`, `npm start` in `WokFlow`. So build file paths with
  `import.meta.dirname`, the folder of the file itself.
- `package.json`: `dinero.js` 2.0.2 (see “Money amounts”), as development tools TypeScript 7.0.2, `@types/node` 26
  and Vite; no `tsconfig.json`. TypeScript therefore checks with the default values, since TypeScript 6 with
  `strict: true` including `strictNullChecks`: an optional property `x?: number` may be missing (`undefined` when
  read), `null` is allowed only with an explicit `| null`.
- **Screen draft:** there is only one draft, `tmp/screens.html` with `screens.css`, `screens.js`, article data in
  `preview-menu.js`, fonts under `fonts/`. Phone view with `?vorschau=1#tables`, the same screens with explanations
  with `?uebersicht=1`, the boss's day closing with `?chef=1#closing`. A local demo, not a real POS. Rules under
  “Screen and operation”. The user reacts to visible examples.
- **Delivery of the page (user, 20.09.2026):** Vite builds the page into `dist`, our own server sends it out
  (`src/server/page.ts`), in development as in the restaurant. After that try it on the phone in the WLAN with one
  or two waiters.
- **Git:** `origin` is `git@github.com:UnathiCodex/WokFlow.git` over SSH (local key `id_ed25519`), `main` follows
  `origin/main`, the repository is private. Git 2.54, Git Credential Manager 2.7.3, GitHub CLI `gh` not installed,
  system-wide `pull.rebase false`. Git is done by the user himself.
  - Open: `touchit_bons_vergleich.html` with real day turnovers from 02.09. and 13.09.2026, partly as a photo of the
    TOUCHIT reports, lies in the history on GitHub (under `tmp/`, in `47c372d` under `docs/`). Decide before
    inviting others whether it stays; removing it would mean rewriting history. This `CLAUDE.md` also lies in the
    repo folder and contains business figures, customer numbers, names.
  - Open: `.git` is synchronised by Syncthing so far; clarify whether that stays with GitHub.
  - Licence postponed by the user for now. Wish: maybe public later, but no commercial use by others. That is
    source-available, not open source; proposal PolyForm Noncommercial as `LICENSE`. Still to discuss: contributions
    by others, own use in the restaurant.
- Cleaning up: `Documents_2026-09-14*.zip` in Downloads may be removed, as may the download clone `emojitwo-source`
  under `C:/Users/Vu/.codex/visualizations/2026/09/14/`. Delete `TOUCHIT/DECOMPILED/tools/` (2.8 GB) only when all
  planned decompilation attempts are finished. Do not delete originals and analysis files unasked.

## Decisions

The manifest describes the whole workflow; here stand the additional details. Newer decisions of the user replace
older proposals. Open points stay explicitly open.

- **Scope at the start:** ordering, table plan, central tickets and bills, payments, cancellation, rksv, day
  closing, backup, paying separately, moving tables, German/Chinese and vouchers. No interim bill, no open credit.
  Further reports still open; QR ordering only later.
- **Articles:** products with one uniform variant list; every orderable variant carries its price (decision of the
  user, 15.09.2026). Do not take over free extra texts like “ohne Zwiebel” or card ids. TOUCHIT has articles, sub
  articles and eight price levels; WokFlow uses the smaller structure below.
- **Languages:** articles show German and Chinese at the same time. Test it with the waiters first; one fixed
  language per phone is only a possible fallback when space is short.
- **Rights:** waiters without a code, devices unlocked once and the normal phone screen lock. A boss code only at
  the PC for paid cancellations, discounts, voucher sales and the day closing. Who may correct payment kinds stays
  open. TOUCHIT has four levels and over 100 single rights.
- **Hardware:** Lenovo ThinkCentre Neo 50q G5 Tiny, i3-1315U, 8 GB, 256 GB, Linux (price 13.09.: about 464 €). Touch
  monitor with USB, glass front/IP65 and VESA 100: iiyama T2234MSC-B7X, 21.5 inch/about 266 €, or T1634MC-B1S, 15.6
  inch/about 504 €. Mount open. No spare PC or phone emergency mode, no UPS for now. Test A-Trust under Linux early.
- **Printing:** one central printer Metapace T-3II for bills, drinks and à la carte. No mobile printer; the broken
  kitchen printer is dropped. A spare printer is only a proposal.
- **SQLite:** one local file, opened by the server only. Every booking as a transaction, `synchronous=FULL`; model
  test: 1,000 bills with ten lines each in 0.9 s. Times in a fixed text format. Driver: `node:sqlite`, which Node 26
  brings along.
- **Backup:** encrypted, running into the cloud after a few seconds, hourly to the USB SSD, at night a full one into
  the cloud with an EU data centre; provider open. A warning after more than a day without a backup, test the
  restore monthly. Keys and access on paper at home. rksv additionally monthly as a file that is never overwritten.
  Model year: 54,000 bills, 56 MB, 14 MB packed. TOUCHIT's copy on the same PC does not protect against a disk
  failure.
- **Cancellation:** open articles by minus with an undo; reasons and journal in the backend still to be clarified. A
  paid bill only completely, by the boss at the PC, with a reason, a signed cancellation receipt and a new bill;
  money out of the till. No private returns outside the booking.
- **Vouchers:** the boss sells numbered money vouchers, the remaining value is stored; given service vouchers and
  foreign vouchers are handled separately. Have the tax booking confirmed by the tax adviser. No general payment
  mode “mixed”; a voucher remainder is a flow of its own. Voucher numbers, providers, validity check and a lasting
  remaining credit are not connected yet.
- **Tips:** cash directly to the waiter, not recorded. Card chosen at the Nexi device, taken over separately, paid
  out to the employees. Clarify tax exemption and proof with the tax adviser; do not transfer it flatly to managing
  directors with a substantial share.
- **Closing and sending:** a complete paper ticket stays for now, PDF and a data file in addition. Monthly sending
  from the mailbox of the boss's wife, plus a resend button; on a failure repeat later and warn. Encryption and
  sending details open.
- **Payment kind and receipt:** a logged payment kind separate from the signed receipt; card turnovers have to stay
  recognisable. Research basis: BAO § 131/§ 132a, rksv § 11 and FAQ Arbeitskreis Kassensoftware 2.4.15. Confirm with
  the tax adviser and the rksv session before building; do not overwrite anything silently.
- **Nexi contract:** Germany GmbH, customer number 5905840, contract partner 156469572. Mobile Premium at the
  counter: 16.90 € rent a month, 0.02 € per payment and a 3.99 € monthly flat fee. Disagio negotiated, minimum fee
  0.25 € per payment according to the price sheet of 01.08.2026; in August not applied to every payment (912
  Mastercard payments cost 221.87 €, less than 912 × 0.25 €).
- **Nexi contract copy** (received 15.09.2026, filed as `Kartenzahlung/Nexi_Vertragsdokument_5905840.pdf`):
  Concardis contract confirmation of 11.08.2021. Disagio 12.08.2021–11.08.2024: Mastercard, Visa, Visa Electron
  0.80 %; MC debit national, V PAY, Maestro 0.28 %; Diners 0.95 %; UnionPay, JCB 2.20 %; each at least 0.06 € per
  payment. DCC (paying in the home currency of foreign cards) active, which lowers the disagio there by 0.50
  percentage points. Terminal 69065732: 60 months, so by calculation until August 2026, 16.90 € rent, 0.02 € per
  payment; no monthly flat fee in the contract. All other fees according to the valid price list. The settlements
  May–July 2026 announce new prices from 01.08.2026; on an objection Nexi may terminate with 14 days' notice. Ask
  Nexi about the end of the term, extension and notice period of the terminal.
- **Nexi figures:** 30.09.2025–31.08.2026: 481,668.54 € card turnover, 9,862 payments, disagio 3,052.07 € = 0.63 %.
  Mastercard about 90 % of the turnover, in August about 0.48 %; Visa about 9 %, about 1.5 %. Total costs around
  3,960 € a year or 0.76 %. Weekly payout by card kind, settlement periods of four or five weeks. Recalculated per
  month (15.09.2026): Mastercard October 2025 to July 2026 0.54–0.58 %, August 0.48 %; Visa steadily 1.32–1.64 %, in
  eleven months 1.52 % on 42,672 €; Maestro, V PAY 0.38–0.57 %; Diners 1.1–1.3 %. Visa at the Mastercard rate would
  save nearly 500 € a year. Monthly flat fee, rent and payment fee together cost about 450 € a year.
- **Nexi connection:** the goal is the existing conditions for SoftPOS in addition to the terminal, one settlement.
  According to the manual the terminal can do ZVT over WLAN; Nexi has to unlock it. The app-to-app interface hands
  over amount and reference and delivers the result; that would need an Android wrapper of the web app. The card is
  always read by Nexi's device or app. Costs, the return of tip and reference and the data access are open.
- **SoftPOS requirements 14.09.:** NFC, Android at least 10, a security update younger than twelve months, no
  Huawei. The cashier phone Redmi Note 13 Pro 5G is suitable; old Xiaomi/Huawei stay for ordering. List price 1 €
  licence and 1 %, company cards an extra 1.49 %; wait for the contract answer first. At worse conditions check
  hobex. SmartPOS A920 and phones with a printer rejected.
- **Switch-over:** next to TOUCHIT only practice receipts; after registering, real bills only from WokFlow. TOUCHIT
  briefly as a reserve, then the closing receipt and deregistration. A shared PC and printer during the trial period
  is open.

### TOUCHIT comparison, 15.09.2026

Question of the user: is a TOUCHIT function missing in WokFlow that the restaurant needs more often? Checked at the
phone program (21 pages; options Art.Transfer, Kell.Transfer, Separieren, Stornieren; closing with Bar, Card,
Kredit, Bonus, Erlagschein, Konsumation, Personal, Kein Bon, Tip), at the form names of the main program and at
`touchit.ini`. Already covered: table plan, ordering, splitting, cancellation, correcting the payment kind, cash
expenses, change, vouchers, day closing, moving. Missing or to be decided:

- **Bill copy:** print a receipt from “Heute” again, marked as a copy. Needed when the paper runs out or a ticket is
  lost. Recommendation: take it in, boss and phone.
- **Bill with a customer address:** from 400 € gross the recipient has to stand on the bill (a small amount bill only
  up to 400 €, UStG § 11 Abs. 6); companies and large groups ask for it. Recommendation: type name and address once,
  only at the boss PC, no customer file.
- **Interim bill and open credits:** switched on in TOUCHIT, dropped in WokFlow. Check with the boss's wife whether
  they are really unused. Leave them dropped if not.
- **Staff / own consumption:** TOUCHIT books staff food and own consumption as a payment kind of its own. Clarify
  whether that is used; otherwise build nothing.
- **Cash drawer:** not connected in TOUCHIT (`Aktiv=False`). If it should open in future, the Metapace printer gives
  the impulse; otherwise nothing.
- **Reports:** TOUCHIT has article and time statistics (33 templates), WokFlow only day and month. Can be generated
  later from the stored receipts, build nothing now.
- **Allergens:** TOUCHIT shows them on the phone. Deliberately not in the article in WokFlow; if needed later show
  only the letters from the menu in the selection.
- **Two phones at the same table:** TOUCHIT solves it with a section protection per waiter. WokFlow has no waiter
  accounts and locks the table instead while one device has it open (decision of the user, 18.09.2026).
- Not needed: waiter transfer, typing the table number, table plan editor (the plan lives in the code), closing
  “Kein Bon” (receipts are obligatory), hotel, scale, bar tap, bonus card.

### Screen and operation

What counts is the one draft in `tmp/screens.html`: a local HTML/CSS/JavaScript demo without booking, payment,
printing, buffet automatic. Sizes, colours, spacings stand in `screens.css` and are the truth there; here stand the
decisions of the user with their reason. The flow is described by the manifest, sections 4 and 5.

**Design**

- Light, neutral greys, dark type. Buttons, tiles, tables grey tinted without a border (user, 16.09.2026: “ohne
  Umrandung ist schon moderner”). Soft rosé instead of the brand red (`--accent: #cf6b74`, fill `#f3d5d8`), because
  the strong red stings too much for people with weaker eyes and reads as a warning colour. Rosé is only a state
  colour for occupied, selected, main button, quantity; no saturated red areas. Rosé areas without a border; the
  dashed border while moving stays as a state mark.
- A pressed state per area, pure CSS: grey gets darker, white gets grey, rosé gets stronger. Plus and minus the same
  size: disabled almost white with pale strokes, usable grey with black strokes, so that older people see the
  difference without a frame; the strokes are drawn geometrically, not typed characters. Windows come from below, at
  the thumb. The scroll bar is thin and light, but not hidden, otherwise you lose the sense of whether more follows.
- **Quantity fields everywhere without a border** (“we agreed on no border for this type of things”), only filled
  rosé or grey. Visibly small, the tap area stays 48 × 48 px and rectangular, so that taps at the corners add
  nothing by accident. They show the unpaid quantity of the table at once; at zero the field disappears.
- **One uniform inset (user, 16.09.2026):** one value `--inset: 16px` left and right on all screens.
- The undo bar is a white floating card with a light shadow and a grey button; a dark bar like Gmail's was too black
  and too emphatic for older eyes. In “Bestellt” it follows the language chosen there, in the selection window it
  stays bilingual.
- Tap areas at least 44 px. The design follows the W3C notes (WCAG 2.2) on colour, text contrast, control contrast,
  touch targets, undo; do not derive full accessibility from that.
- Sizes fixed by the user: **360 px is the standard width**, no button wraps there. German drink names 18 px, food
  names 18.5 px (bigger than drinks, but small enough for “Gebackener Tintenfisch” to fit in one line). Group names
  in both group lists the same size, German 20 px, Chinese 17 px. Table numbers in the plan like the number in the
  header, 30 px with weight 600, garden tables 22 px. Buffet counters big, age groups as big as the buffet name.
  “Rechnung” in “Bestellt” 20 px.
- **No automatic shrinking on buttons** (names stay the same size, in an emergency a second line, but report it).
  Only in “Bestellt” are long names set smaller to fit the width, so that every line stays on one line. When paying
  separately long names may wrap logically: additions like “+ Wasser”, “+ Zit” and piece counts stay together,
  “mit”/“und” stay with the following word, never inside a word, no shrinking of the type.

**Images**

- **Only emojis from the EmojiTwo pack, never self-drawn pictures** (user, 16.09.2026: “I strictly want emojis from
  the emojis pack”). [EmojiTwo](https://github.com/EmojiTwo/emojitwo) is under CC BY 4.0: name the author, link the
  licence, mark the changes. Small coloured image symbols only in the group lists, on the left of the line, no
  images at articles or the buffet. Light shapes get a visible outline on white; no cropping, all SVGs keep the full
  canvas 64 × 64.
- Adapted menu graphics lie in `icons/wokflow/`, the unchanged collection in `icons/emojitwo/` (2,789 SVGs with
  `LICENSE.md` and `README.md`, fetched 15.09.2026, revision `311eff547b3ff4a61fdbae897dd09d41416048fc`). Use
  working copies for changes, leave the collection unchanged. Sources and changes stand briefly in English in
  `icons/sources.md`; keep the complete linked assignment of every WokFlow graphic to its EmojiTwo originals. The
  logo `icons/asiawok/logo.svg` is AI-generated according to the user, owner ASIA WOK Restaurant GmbH.
- Snacks is the unchanged EmojiTwo baguette 1f956 (chosen by the user; a spring roll exists neither in EmojiTwo nor
  in Unicode), rice 1f35a, chicken & duck the chicken. Meat on the bone for beef the user rejected, a steak SVG is
  missing in the pack. Provisional until decided: soups & salads `starters`, beef & pork `beef`; after that delete
  unused images in `icons/wokflow/` together with their lines in `icons/sources.md`.

**Ordering**

- Money only at the bill, the payment, “Heute”, the closing, with a dot and a euro sign (`27.90 €`); no prices while
  ordering. **Drink sizes always with a dot and without a litre sign**: `0.25`, `0.5`, `0.3 + Wasser`,
  `0.5 + Soda`. Missing prices are never treated as zero.
- Header “Bestellen / Bestellt” without an article count, a doubled heading or a status footer; no path “Getränke ›
  Limonaden”; no changing button positions. **Order view C chosen:** the full ordering area or the full order list
  over two tabs; group and scroll position stay when adding and when switching tabs; the buffet appears in
  “Bestellt” too.
- Selection window: article name and a plain X, without “Variante / 规格”. After a booking it stays open (three
  times the same Cola size without opening it again), quantities change at once; X, Escape, a tap outside close it,
  tapping inside does not. Buttons with a further selection show the arrow on the right, direct bookings do not.
  Cola/Zero/Light: one Cola button, three sort buttons at the top of the window, under them only the fitting
  variants; Light only as a bottle; the Cola button counts all three sorts. “Flasche 0.35” as a wide line at Cola,
  Cola Zero, Fanta, Sprite; no invented bottle sorts. Word variants (Tee, Kaffee, Campari, Mineralwasser) as full
  lines with the quantity on the right.
- **Lemon, flow confirmed by the user:** first book size/water/soda, then if needed tap “+ Zitrone” once for the
  glass booked last. No checkbox, no preselection, no confirmation window. A short highlight of the quantity, 20 ms
  vibration on supported devices, respect reduced motion. In the selection window only the total quantity stays;
  with and without lemon appear as separate positions in “Bestellt”. The next size tap books without lemon again.
  The action is not available before the first booking, after it was applied, after a size correction of the last
  portion, after a sort change or after reopening, until something is booked anew. Tapping again charges no second
  surcharge; portions already sent stay unchanged. Directly booked drinks get no lemon question. Extra ice is
  postponed.
- **One name per article (user, 16.09.2026):** the same name on the button, in “Bestellt”, on the bill; no long
  form, no own button labels (line breaks on the screen disturb, and every bill line costs paper). `menus` in
  `preview-menu.js` carries the same names as `src/catalog/`. If a name does not fit at 360 px it is shortened, in
  both languages with the same cut: usually the beginning stays, distinguishing words stay (Gegrillte and Gebackene
  Garnelen). Gebackener Tintenfisch 炸鱿鱼 stays long. Drinks keep their full German names. The names deliberately
  differ from the printed menu: without “Pago”, “Jiao Zi”, “Mini”. Only the display of the additions is shortened:
  `serviceLabel` makes “+ Zit” out of “+ Zitrone” and “0.35 Fl.” out of “Flasche 0.35”.
- **One line per name (user, 16.09.2026):** drink buttons show German and Chinese each on one line; long Chinese
  names are shortened for that in the catalog. At direct articles the German line uses the full button width, only
  the Chinese one leaves room for the quantity field. The second line of the sushi sets is wanted.
- Sushi quantities after menu page 5, only in the draft, not in the catalog: small 7 sushi + 3 maki, medium 9 + 3,
  large 11 + 3, salmon sushi 8 + 3, as a second line like “7 Sushi 寿司 + 3 Maki 卷”, every number only once; Futo
  Maki (10) and maki in the set (18) on the same line.
- “Bestellt”: the quantity set in bold without “×”, only minus, for buffet persons too. A small language button
  “DE”/“CN” to the right of “Rechnung”, one language at a time. The Chinese view also contains size, bottle mark,
  additions, maki piece count, additions in the same plus notation (“可乐 0.3 + 水 + 柠檬”).
- **Food groups (user, 16.09.2026, final):** 10 groups, one column, in this order: Suppen & Salate 汤和沙拉 (2 soups
  | 4 salads), Snacks 小吃, Sushi 4, Maki 6, Meeresfrüchte 5, Gemüse 2, Huhn & Ente 鸡肉和鸭肉 (8 | 1), Rind &
  Schwein 牛肉和猪肉 (4 | 2), Reis 米饭 5, Nudeln 面条 3. The Chinese group names are the usual words, not
  provisional. Why: only what belongs together was joined, with known words instead of umbrella terms. Sushi and
  maki separate, otherwise you would have to scroll inside the group. Rice and noodles separate, garlic sauce to
  Snacks, desserts dropped. In joined groups a small grey line separates the parts; in the catalog the parts are own
  groups (`soups`, `salads`), the screen joins them.
- Drink groups: Limonaden, Fruchtsäfte, Wasser, Bier, Weine, Warmes, Spirituosen. No extra entry “Kaltgetränke”.
  Short labels “Weine / 酒”, “Warmes / 热饮”; the order follows the printed menu.
- **Buffet:** the main case, about 99 % according to the user. Drinks often first, the buffet count only when
  paying. One buffet kind per table.
- **Buffet tariffs:** Mon/Wed–Sat midday 11:30–14:30: adults 15.90 €, 6–9 years 9.90 €, 3–5 years 5.90 €; evenings
  17:00–21:30 and Sundays/public holidays all day 19.90/12.90/7.90 €. Under three free; Tuesday closed except on
  public holidays; no own Friday price.
- **The buffet automatic is still a proposal:** server time `Europe/Vienna`, Carinthian public holidays stored
  locally, the tariff recorded in the ticket line. Outside the times choose explicitly; with an unreliable clock or
  a missing calendar no automatic. Open: Josefstag/Volksabstimmung and noting the tariff at the first order, so that
  a late entry does not cause a tariff change.

**Moving and takeaway**

- **Moving (changing table, user, 15. and 16.09.2026):** button, strip and window are called “Schieben”, not
  “Verschieben” or “Umsetzen”. In “Bestellt” “Rechnung” stands big in the middle, on the left the moving button, on
  the right the language button, both square 56 px. **The button is only an arrow “→”** for both languages, drawn
  with lines like plus/minus, because Hyperreadable has no “→”; `aria-label` “Tisch schieben · 换桌”; disabled at an
  empty table. It leads to the table plan with the strip “14 schieben” and “Abbrechen”; the source table is dashed
  and not tappable, inside/garden stay selectable. A tap on the target table opens a confirmation window: “Tisch 14
  auf Tisch 12 schieben?”; at an occupied target only “Tisch 14 mit Tisch 3 zusammenführen?” with
  “Zusammenführen”. “Abbrechen” leaves the target choice open, Escape closes only the window. All order lines and
  buffet persons are moved, including ones not sent yet. No undo: instead of a strip that stays, the user wanted the
  explicit question. An occupied target table is allowed, because guests join people they know. Only whole tables;
  moving single articles (TOUCHIT “Art.Transfer”) is not built and would later go over the selection of paying
  separately.
- **Takeaway (user, 16.09.2026):** an own button in the inside plan, centred in the free area between 24 and 18,
  only the word “Mitnehmen” without Chinese in 18 px, for guests at the counter who only take food away. Inside it
  is called “M”: id `M`, header “M” like a table number, in “Heute” “M”, in the bill and windows “Mitnehmen”. It
  opens the order like a table; the buffet tab is missing, because the buffet is not taken away (do not grey it out,
  leave it away). When moving it can be a source, but not a target.

**Paying**

- **Paying separately:** an article selection with quantities, the rest stays open, back to the selection after a
  part payment, to the table plan after the last one; the whole bill stays the direct normal case. Selected lines
  are outlined in the accent colour; the list scrolls, sum and the paying button stay at the foot. Only the sum of
  the selection, no remainder line. The available quantity on the left, plus/minus compact on the right in the same
  line. The header while splitting, in the bill and in the card closing reads “Tisch 9” or “9号桌”; while ordering
  the compact number without “Tisch” stays. No second entry “Getrennt kassieren” on the payment page; “Zurück”
  leads to the quantity selection even when the whole rest is left.
- **Language (user, 16.09.2026):** the language button stands only in “Bestellt”; bill, split, cash, card and
  voucher take the language chosen there without a button of their own. German is the default when opening.
  Switching changes no selection, amounts or entries and not the language while ordering: the tabs and the article
  selection stay bilingual.
- Bill: fixed columns for quantity, name, amount, quantities without “×”, amounts on the right without wrapping, the
  bill amount large. A fixed foot area: at the very bottom the big buttons “Bar”/“Karte” next to each other, above
  them “Gutschein” and “Getrennt”/“分开” in two equally wide, language-independent fields; two rows of buttons
  instead of three. Articles scroll only in their own area. “Bar” opens the cash closing with “Abschließen”, the
  card closing is called “Fertig”.
- **Voucher:** opens a compact amount menu with the same number buttons as cash: type the value, see the remaining
  amount at once, “Anrechnen”. In the bill the remaining amount then stands large, the voucher deduction above the
  payment buttons; cash/card take only this rest. At full coverage “Abschließen” replaces the cash/card buttons.
  Open the voucher again to change or remove it; closing, Escape and a tap outside discard only the entry not taken
  over yet. If the voucher exceeds the bill, “Gutscheinrest” appears, no payout as change. The same flow for part
  bills, without carrying it over into the next selection or to another table. “Heute” marks voucher, cash +
  voucher, card + voucher. In the draft there is no real redemption or storage.
- **Change calculator** in the cash closing, no separate calculator button next to “Bar”. First “Zahlbetrag”,
  prefilled with the bill sum minus the voucher: take it over unchanged or type the guest's wish, for example 59.70
  → 60 €. “Übernehmen” opens “Gegeben”; the payment amount stays visible and correctable above it, the change is
  calculated at once. “Abschließen” works at any time without a change calculation. Own big number buttons with a
  decimal point and a backspace, input fields with `inputmode="none"`, so that no phone keyboard opens; a normal
  keyboard and pasting work too, a comma becomes a dot. No round-up button. Too little given shows “Fehlt”; invalid
  amounts or a payment amount below the open bill amount prevent the closing. The bill keeps its original amount;
  cash tip, the amount given and the wished payment amount are never stored. Calculating in whole cents. Closing,
  Escape and a tap outside cancel; at a new bill, a table change or another part payment the entries are discarded.
- “Heute” on the phone: only the bill list, no sums for cash/card, no bill count. Cash/card only readable there, no
  accidental switching; who may correct later is open. The day closing is only for the boss, in the draft with
  `?chef=1#closing`; this parameter is **not a real rights check**.
- Navigation links “Heute”, “Zurück” outside the payment flow with a small Chinese next to them; plain back arrows
  in the article groups without visible text.

**Tools and checking**

- `sed -i` destroys the line endings in the CRLF files `screens.js`, `screens.css`, `preview-menu.js`; change them
  only with the edit tool. The menu file, `screens.css`, `screens.js` and image URLs carry a version mark `?v=`
  against outdated files in the cache, count it up at every change; the open HTML tab has to be reloaded.
- Send selection pictures to the user as PNG (rendered with Edge without a window); SVG selection sheets did not
  land.
- Checking so far happened in the local Edge browser at 320 to 412 px width with screenshots and measurements, never
  on the real Redmi. Open on the real device: the feel of the vibration, suppressing the on-screen keyboard under
  Android.

### Table plan and font

- Two area buttons inside/garden; the room as a section above the garden, together on one screen. The same layout on
  phone and PC, the plan always fits on one page. Plain rectangles; no chairs, benches, buffet furniture, amounts,
  times, occupancy dots, free/occupied legend. Tables slightly elongated, no squares, because two people sit at each
  long side and one at the head.
- The heading “Tische” is dropped. The header carries “Reservierungen 预订” on the left as a prepared button for
  online reservations and for marking reserved tables, and “Heute” on the right.
- Inside at the top 1/2/3/4/5/6; under it 11/10/9/aisle/8/7, then 12/13/14/aisle/15/16. 1–5 the same button size as
  12–16; table 6 as small as table 7, flush at the top with 1–5. The group of 20s at the far left: 21/22 on top, 24
  above 23 under 21, table 20 next to it on the right with the same bottom edge as 23. 19 above 18, upright on the
  right under 15, 17 at the height of 19 next to it. Equal gaps between 21/22 and 24/23. 20 smaller (1+1), 21/22
  four-seaters, 12–16 six-seaters, 1–6 and 7–11 normally 2+2, 1–6 tight up to 3+3.
- Four grey dividing lines mark the inside areas: between 11/10/9 and 12/13/14, between 8/7 and 15/16, under
  12/13/14 before 21/22, under 15/16 before 19/17. The row 1–6 stands closer to the row below, because they belong
  together.
- 18, 19, 23, 24 each have their own button and their own order. No selection “Ganz”, no shared booking numbers
  18/19 or 23/24, no number 25. For one shared group of guests one of the two numbers is used.
- Room: 33/34/30 above 32/31/35, equal rectangles. Garden: G12/G11, aisle/main entrance, G1/G2/G3/G4; at the bottom
  G15/G16 on the left, G9 under G2, G8 under G3. G = garden; the aisle as two plain lines. Number 9 and G15/G16 are
  provisional, the user's confirmation is open.
- The logo at the bottom right, at most 140 px wide, not squeezed into the middle between the tables, undistorted,
  without a frame or a tap function.
- From the user's photos and videos of 15.09.2026: 18/19 is one long table for ten people (2+4+4), 20 a two-seater,
  21/22 normal tables, 23/24 put together, 16/17 normally in one line. Recommendation: keep the plain geometry, at
  most even out the proportions. The table plan has not been changed after that; do not move anything against the
  user's last arrangement.
- **Font chosen: Hyperreadable**, an explicit correction of the user, not IBM Plex Sans. Source:
  [Hyperreadable](https://github.com/MadSimple/hyperreadable), SIL OFL 1.1, commercial use checked, keep the
  copyright and the licence when passing it on. The unchanged cuts Regular/Medium/SemiBold including the OFL lie in
  `WokFlow/fonts/`, no system installation. Chinese uses fallback fonts.

### Money amounts: Dinero.js 2 (chosen 14.09.2026)

- The user wanted a modern TypeScript library that bigger programs use too, and ordered the selection. Chosen is
  **Dinero.js 2** (2.0.2 of 13.03.2026, own TypeScript types, Node >= 20): money amounts with a currency,
  calculations, rounding, output; it fits prices in whole euro cents. `decimal.js` is replaced by it and not needed
  in addition: Dinero also represents fractions of a cent as a whole number with `scale` (3505 at `scale: 3` for
  3.505 €), factors as well (`{ amount: 15, scale: 1 }` for 1.5).
- Honest about how widespread it is (question of the user): not an industry standard and not a proven top place.
  `decimal.js` has clearly more downloads but is general decimal arithmetic; the recommendation rests on the money
  functions, the TypeScript support and proven use (WooCommerce lists `dinero.js` 2.0.2 in its dependency file).
- In the catalog `dinero({ amount: cents, currency: EUR })` without `scale`: Dinero then takes the exponent of the
  currency, at EUR 2, so cents. Only `article` and `variant` in `articles.ts` call `dinero`. The rounding rule and
  the moment of rounding are clarified at the bill flow; no money calculations are connected yet.
- In `commands.md` development tools and Dinero stand separately: `-D` applies to all packages of one call, and
  Dinero is needed in the running POS system too.

### Articles and groups

Built with the user in `WokFlow/src/catalog/`.

- **Articles stand in the code, not in the database (user, 16.09.2026):** prices change rarely, the user maintains
  them himself; the boss's wife gets no editing screen. Reason: no extra code for it, and IntelliJ checks every
  article through the types. Into SQLite goes what comes out of the operation, orders, receipts, payments. A price
  change needs no compiling, but the running server needs a restart.
- **Files:**
  - `articles.ts`: types `Article` (`name` with `de` and `zh`, `variants: Variant[]`) and `Variant` (`name` with
    `de` and `zh` or `null`, `price: Dinero<number, "EUR">`), plus the factory functions `article(de, zh, variants)`
    and `variant(de, zh, cents)`. `article` takes a variant list or only the price in cents; a number gives the one
    variant without a name (checked with `Array.isArray`).
  - `buffet.ts`, `food.ts`, `drinks.ts`: one `export const name: Article[]` per logical list, one line
    `article(…),` per article, the order as on the screen. Shared variant lists stand at the top: `buffetSmall` and
    `buffetBig` in `buffet.ts`; `variantPieces(cents1, cents2)` for “6 Stück” and “12 Stück”, written by the user,
    in `food.ts`; `variantsFull`, `variantsBottle`, `variantsJuices`, `variantsWines` in `drinks.ts`. `lemon` stands
    at the end of `drinks.ts`.
  - `menu.ts` (the folder stays `catalog`): `Category` with `tax`, `print`, `groups`, `Menu` with `buffet`, `food`,
    `drinks`, the constant `menu`, plus the lookup part with `entryOf`. **The groups in the catalog are the logical
    lists**, each a simple list in short notation (`soups`, `salads`, `snacks`; no “article matrix” `Article[][]`).
    The buffet has a group too (`buffets`), so that all main categories are built the same way. **What is shown
    together is decided by the screen** (user, 16.09.2026, “much more elegant”): it needs a table of its groups with
    names in both languages and images anyway, and that table also says which catalog groups form a screen group,
    for example Suppen & Salate out of `soups` and `salads`. No arbitrary nesting: main category, group, article,
    variant.
- **Size (counted from the code on 18.09.2026):** 102 articles (buffet 4, food 50, drinks 48) with 199 variants in
  21 catalog groups (buffet 1, food 13, drinks 7), on the screen 18 groups (food 10); plus `lemon` in the group
  `extras`, 200 variants together. Names, order and prices as in `tmp/preview-menu.js` and the printed menu 2026;
  the children's prices for Sunday/public holidays are not in the PDF, taken from “Buffet tariffs”.
- **The id of an article is its German name** (user, 16.09.2026): all of them are unique, names change rarely; a
  rename counts as a new article in statistics. No English constant per article; English identifiers only for lists.
- **One name per article**, German and Chinese, the same on the button, in “Bestellt”, on the bill. Not in the
  article: allergens, chilli, food notes, English names, card ids, category paths.
- **Variants:** every article has at least one variant with a price; without a selection its `name` is null and the
  screen shows no selection. `Variant[]` enforces no minimum length, `article` with a price creates exactly one. A
  single size stays a variant (Tsingtao 0.33, Hefetrüb 0.5, Cola Light “Flasche 0.35”); Prosecco stands without a
  size, because “0.2” is shown nowhere. Sizes with a dot and without a litre sign; sizes are text, because variants
  also describe mixtures, sorts, “6 Stück”. Prices as whole cents (`450` for 4.50 €). Every variant on its own line,
  a single one too. On the bill the chosen variant stands with quantity and price.
- **Buffet:** every buffet kind is an article (Mittagsbuffet, Abendbuffet, Sonntagsbuffet, Feiertagsbuffet), the age
  levels adults, 6–9, 3–5 are its variants; midday with `buffetSmall`, the others with `buffetBig`.
- **Shared variant lists only where the prices change together** (user, 16.09.2026: Cola and Fanta always change
  their prices together). Combined by spread, for example `[...variantsFull, ...variantsBottle]` for Cola, Cola
  Zero, Fanta, Sprite. Written out stand beer (Villacher and Radler cost the same), Aloe Vera, lychee juice,
  mineral water, soda, tap water. Open: whether the main dishes at 14.90 € change their price together.
- **Lemon (16.09.2026):** an addition, not a variant; an own article `lemon` (Zitrone 柠檬, 0.20 €). Since
  17.09.2026 in the catalog group `extras` under drinks, which the screen does not show as a group, so that it
  cannot be ordered alone. Soda therefore has no own lemon variants any more. How an order line records the lemon is
  ordering logic and comes with the screen.
- **Printing at the main category (user, 16.09.2026):** `print` next to `tax`, drinks and food `true`, buffet
  `false`. What is meant is the order ticket; the bill shows everything.
- **Tax only at the main category:** buffet 10 %, food 10 %, drinks 20 %. The only exception stands in the building
  of `entries` in `menu.ts`: tap water 10 (it almost never changes); if tap water is renamed, change that line too.
  `orderOf` only asks `entryOf` and knows nothing of exceptions (looking up belongs in the menu). The key stays the
  German name as text: a constant `tapWater` the user rejected. Rejected: `tax?` at the article, a mandatory `tax`
  at every article, an exception list `taxExceptions`. The name stays `tax`, not `vatRate`. Calculated: tap water
  10 % (mineral water 20 %); coffee and tea including cappuccino and latte macchiato 20 %. Source checked
  15.09.2026: [WKO: Umsatzsteuersätze für Restaurationsumsätze](https://www.wko.at/steuern/ermaessigte-umsatzsteuer-saetze).
  The new 4.9 % for certain staple foods do not apply to restaurant services. Legal basis:
  [UStG § 10](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=10),
  [BMF on the 2026 change](https://www.bmf.gv.at/rechtsnews/steuern-rechtsnews/aktuelle-infos-und-erlaesse/fachinformationen---umsatzsteuer/umsatzsteuersenkung-auf-ausgewaehlte-nahrungsmittel.html).
  Receipt description: [BAO § 132a](https://ris.bka.gv.at/eli/bgbl/1961/194/P132a/NOR40173931) and
  [UStG § 11](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004873&Paragraf=11).
- **When booking**, record name, price and tax rate in the booking, so that catalog changes do not change old
  receipts (built that way in module `tables`); no second, separately maintained price list. Tax calculation and
  receipt storage are not built yet.
- Sources of the data: the prototype and `AsiaWok_Speisekarte_2026.pdf`. Included grill sauces are not own articles,
  a paid extra sauce is separate. Do not mix up portion size and the number ordered.
- **Open:**
  - Wine sizes “1/8”, “1/4”, “1/2” deviate from the dot rule, in the prototype too.
  - The table of the screen groups (names in both languages, images, matching catalog groups) belongs to the future
    screen code; until then the data stands in the prototype and under “Food groups”.
  - Sushi and maki piece counts (“7 Sushi + 3 Maki”) stand only in the prototype, not in the data.
  - Confirm the mineral water bottle size.
  - Only note it, do not change it unasked: in `articles.ts` the semicolon after the constant `variantSingle` is
    missing.
  - Connection to the screen; `tmp/preview-menu.js` stays its own preview data until then.

## Accounting (question of the user, 14.09.2026, not decided)

- Current state: tax adviser Mag. Helmut Allesch, Klagenfurt (payroll with RZL). 9 payslips a month. Payroll journal
  May 2026: gross 21,564.98 €, wage tax 922.26 €, employer contribution 591.48 €, surcharge 59.15 €, municipal tax
  646.95 €, ÖGK 7,481.72 €. Annual accounts of the GmbH and fee notes are missing in the filing; the last filed
  accounts are from 2017, still from the sole proprietorship Li Vu (income and expenditure account, turnover about
  464,000 €, of that 80 % kitchen, bookkeeping costs then 4,180 €).
- Motive of the user: he is new in the GmbH, wants to check the tax adviser's work and suspects that nothing is
  saved on taxes. Context: the monthly payment to the Finanzamt is mostly VAT (a pass-through item) and wage levies.
  Savings potential is checked fastest by a second tax adviser at a fixed price on the basis of the last annual
  accounts.
- Legally (knowledge, not checked on the web): a GmbH may do its bookkeeping itself, also through employees; there
  is no obligation to have a tax adviser. Obligatory are double-entry bookkeeping, annual accounts to the company
  register within 9 months, tax returns, the monthly VAT return (UVA). An auditor is obligatory only from a
  medium-sized GmbH, not here. The managing director stays responsible. A tax adviser can be called in case by
  case at any time, for example at an audit.
- Costs at the tax adviser (guide values 2026, no official tariff): bookkeeping 200 to 310 € a month, payroll 16 to
  40 € per employee and month, annual accounts 1,600 to 2,200 €, hourly rate 120 to 310 €; for Asia Wok roughly
  8,000 to 13,000 € net a year.
- Doing it yourself: bookkeeping software 10 to 30 € a month (for example FreeFinance, ProSaldo, everbill), payroll
  software almost only for professionals (RZL, BMD). ELDA and FinanzOnline are free; the collective agreement,
  social insurance values and tax tables are public. Effort after that about 4 to 6 hours a week (250 to 300 hours a
  year, so about 30 to 45 € saved per hour, with liability). Learning alongside: about a year for running
  bookkeeping and payroll, 2 to 3 years up to the annual accounts. A WIFI course (about 3,350 €) is not needed: a
  textbook plus AI, university lectures on accounting, for payroll the yearly new book “Personalverrechnung in der
  Praxis”. AI helps with learning and checking but does not replace the knowledge about yearly changes, deadlines
  and filings.
- Claude's recommendation: finish building WokFlow first. After that 6 months of shadow bookkeeping: book it
  yourself and compare it every month with the tax adviser's trial balance. If it matches three months in a row,
  take over the running bookkeeping; payroll and annual accounts last, and have the first own accounts read by the
  tax adviser.
- Access (plan): the managing director gets the ID Austria, registers the GmbH with FinanzOnline (tax account,
  decisions, VAT returns, wage slips) and with the company service portal USP (through it WEBEKU of the ÖGK with the
  contribution account and ELDA) and creates the user as a user. The tax adviser's power of attorney stays in place
  next to it. FinanzOnline alone shows about a third; bookings, trial balances and wage accounts come from the tax
  adviser. Online banking access from the boss's wife.
- Who is managing director is unclear internally. Therefore ID Austria for Li Vu (boss's wife) and Kim Hong Vu
  (boss): whoever stands in the company register can register the GmbH, at the other one the system refuses. A
  company register extract costs a fee even for the owner (justizonline.gv.at). Free: founding documents and GISA.
  GISA (extract of 04.07.2026 in the filing): the trade licence for the restaurant at Messeplatz 1 has run on Li Vu
  personally since 21.12.2013, not on the GmbH; check whether the GmbH has one of its own.
- ID Austria in Klagenfurt (checked in the browser, both are Austrian citizens): passport office of the Magistrat,
  Kumpfgasse 20, phone +43 463 537-4010, without an appointment Tuesday and Thursday 8 to 15, Friday 8 to 12, online
  appointments only Monday and Wednesday (the next free one was 12.10.2026); call first whether ID Austria really
  works without an appointment. Alternatives only with an appointment: Landespolizeidirektion, Buchengasse 3
  (citizen.bmi.gv.at, topic “ID Austria - Registrierung”), or the Finanzamt, Siriusstraße 11 (phone 050 233 700).
  Bring: passport, phone with the ID Austria app; ask for the full function; do the online pre-registration on
  id-austria.gv.at beforehand. Both are not technically minded, the user goes with them and sets up the app. Whoever
  already has a mobile phone signature can unlock the full function online.

## Correspondence (working status for new chats)

What went to whom and what is being waited for. When an answer comes, enter it here and add the consequences under
“Decisions”. The user's style for mails: no dashes, no introduction, no project name to the outside.

### Nexi (serviceDE@nexigroup.com, customer number 5905840, contract partner no. 156469572)

- **1. SoftPOS and POS connection** (sent 14.09.2026 according to the user, answer open; the phone call of
  15.09.2026 is in the manifest, point 10). As an existing customer with a Mobile Premium terminal and about
  50,000 € card turnover a month, a written answer by e-mail was asked for:
  1. Nexi SoftPOS (Tap to Pay on Android) on an additional Android phone as an additional agreement to the existing
     contract, at the existing conditions (disagio per card kind as before, the same settlement); an offer with all
     costs and the term.
  2. Unlocking the POS connection (ZVT over WLAN) at the Mobile Premium terminal, so that the POS hands over the
     amount; costs?
  3. Is the app-to-app interface for SoftPOS (handing over the amount from the POS app, developer portal
     developer.nexigroup.com) available in Austria, and what is needed for access?
- **2. Copy of the contract:** asked for on 14.09.2026 (the card acceptance contract with the valid conditions sheet:
  disagio per card kind, minimum fee, monthly flat fees, terminal rent, term, notice period, all changes). The copy
  came on 15.09.2026, evaluated under “Decisions”, “Nexi contract copy”; the disagio in it runs only until
  11.08.2024, so the user asked for the current conditions sheet on 15.09.2026. Answer open.

When reading the answer check: SoftPOS at the existing disagio or at the list price of 1 %? An additional agreement
or a new contract with a term? Do not sign anything that is not clearly better. If something stays open, ask: does
the terminal or the app ask the guest for the tip and report amount, tip and transaction number back to the POS? Is
there, without coupling, a way to fetch the day's payments with a reference that can be matched to a bill? Does the
unlocking cost anything?

### Tax adviser (Mag. Helmut Allesch, Klagenfurt)

**3. Questions about the POS** (draft of 14.09.2026, shortened to the essentials, sent by the user)

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

**4. Documents of the GmbH** (draft of 14.09.2026, deliberately without an appointment, sent by the user)

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

Later to the tax adviser, deliberately not asked yet:

- Changing the payment kind after the bill was printed without a cancellation, with a log (permitted according to
  the research).
- A paid wrong bill in future with a cancellation receipt instead of giving money back privately.
- Does a given buffet trigger tax when redeemed (a promotional gift)? What happens to the old vouchers kept by hand?
- Switch-over: what does he need, and is the end of a month or the end of a year the better moment?
- rksv journal: is a monthly export that is never overwritten, to the USB SSD and the cloud, enough?

### Authorities

- ID Austria for Li Vu and Kim Hong Vu: call the passport office, then go there together (details under
  “Accounting”). After that register the GmbH with FinanzOnline and USP and create the user as a user.

## rksv

Knowledge and open questions of the rksv session (since 13.09.2026). Finished decisions stand under “Decisions”.

- **Basics:** rksv is the Registrierkassensicherheitsverordnung. Every receipt gets an electronic signature that
  hangs on the previous one like on a chain, and a QR code. A start receipt (0 €) at commissioning, registration
  with FinanzOnline, a check with the app of the finance ministry. A monthly receipt (0 €) every month, the one from
  December is the yearly receipt and is checked with the app as well. A closing receipt when shutting down, then
  deregister. DEP (data collection log): a list of all receipts, keep for 7 years.
- **Card exchange by May 2027** (BMF page, read 13.09.2026): cards with the chip ACOS-ID 2.1 have not been valid
  since 07.06.2025 (the security hole “EUCLeak”), CardOS 5.3 at the latest from May 2027. A new A-Trust card with
  the chip ACOS-ID 4.1 costs about 40 € including VAT, the certificate runs 5 years, on 13.09.2026 it was not
  available in the shop; a card reader about 26 €. TOUCHIT knows only older card types (`GetCardType` in
  `TouchitTrustLibrary`), so the new card probably does not run there. Which chip is in use today the user does not
  want to check. So WokFlow should be running by May 2027.
- **Providers** (net, 13.09.2026): only A-Trust, GlobalTrust and PrimeSign issue certificates. A card with a reader
  for 5 years: A-Trust about 55 €, PrimeSign 60 €, GlobalTrust 149 € (with an exchange on defect). Online 36 to
  359 € a year, all of them need the internet. A-Trust example code on GitHub (`A-Trust/RKSV`, C#, Java, C++, for
  ACOS, ACOS-ID, CardOS 5.3 and the online interface); whether ACOS-ID 4.1 is covered is open. Under Linux the card
  runs over PC/SC (the Linux POS QRK can do it), Node needs an extra library for that. TOUCHIT uses the Windows
  library `asignp11.dll`.
- **Effort** (estimate by Claude): only fetching the signature differs, online 1 to 2 working days, with a card 3 to
  6.
- **Failure:** if signing is impossible, the POS issues receipts with “Sicherheitseinrichtung ausgefallen”, and
  afterwards a collective receipt. If the failure lasts longer than 48 hours, report it within a week over
  FinanzOnline.
- **Vouchers** (check with the tax adviser): money vouchers are multi-purpose vouchers, VAT only when redeemed, at
  the sale with 0 %. Service vouchers would be single-purpose vouchers with tax already at the sale; how the
  redemption is then signed is not unambiguous (BMF example code, GitHub issue 684). But the business gives them
  away, so at redemption the amount is 0. Foreign vouchers (Edenred, Nexi paper) are only a means of payment, normal
  turnover. TOUCHIT signs the redemption of sold vouchers with 0 %, which deviates from today's guidance.
- **Training mode and several tills:** before the registration testing is allowed. After that practice receipts
  count as training (signed, in the DEP, without a turnover counter, value “TRA”, printed “Trainingsmodus”).
  Several tills in one business are allowed, every real bill only in one.
- **Cancellation:** before the receipt (an open table) it is not an rksv topic. An issued receipt must not be
  deleted; for that there is a signed cancellation receipt (value “STO”) and, if needed, a new bill. A reason is not
  prescribed, but many cancellations without a reason stand out at audits and can lead to estimated additions; a
  short selection list is recommended.
- **Part bills:** every separately paid part bill is a receipt of its own. A table bill may also be paid in parts by
  several guests at about the same time, without a receipt per guest.
- **Payment kind:** not an obligatory part of the receipt (§ 132a Abs. 3 BAO, § 11 rksv). Changes after printing
  with a log are permitted, as long as card turnovers stay recognisable (FAQ Arbeitskreis Kassensoftware 2.4.15).
- **Securing the journal** (§ 7 rksv): at least quarterly, unchangeable, on an external medium, keep for 7 years,
  exportable at any time in the prescribed format. Running and hourly copies are overwritten and probably do not
  count, so a monthly DEP export as its own file to the USB SSD and the cloud (check with the tax adviser). The
  finance ministry's checking tool: `TOUCHIT/TOUCHIT_TOOLS/SOFTWARE/RKSV/DEP_Pruefung` (a Java program, Java is not
  installed).
- **Open:** monthly and yearly receipts in detail. Test the A-Trust card ACOS-ID 4.1 with a reader under Linux early
  and check the example code. Confirm the payment kind without a receipt. Claude's proposal: a second reader as a
  spare. Keep the old AES key (see “Security”).

### Implementation in `src/rksv/` (status 26.09.2026)

Built block by block: Claude shows a block and explains it, the RKSV person types the source code, Claude writes the
test files block by block with an explanation in between. Before every block Claude reads the file again and builds
on its state; deleted comments stay deleted. Only Node built-ins (`node:crypto`, `node:sqlite`, `node:test`),
`package.json` stays unchanged. Expected values in the tests come from independent programs (`sha256sum`,
`openssl`), not from our own code.

- `qrcode.ts`: `qrcodeCreate(jws)` returns the QR text, i.e. data line, `_`, signature in normal Base64.
- `signature.ts`: type `Signer` (bytes in, 64 bytes out), `jwsCreate(dataLine, signer)` builds
  `header.dataline.signature`; with `signer === null` “Sicherheitseinrichtung ausgefallen” takes the place of the
  signature (§ 17 Abs. 4, Anlage Z 6), and `jwsFailed(jws)` recognises it again. `signerKey(key)` signs with a Node
  test key (ES256, `dsaEncoding: "ieee-p1363"`), never use it in operation.
- `chaining.ts`: `chainingCreate(previousJws, cashboxId)` returns the first 8 bytes of the SHA-256 as Base64, for the
  start receipt over the cash register ID.
- `counter.ts`: `counterAdd(state, total, training)`, `counterEncrypt(state, key, cashboxId, number)` (8 bytes
  big-endian, AES-256-CTR, IV from the first 16 bytes of the SHA-256 over cash register ID and receipt number), plus
  `counterStorno` (`U1RP`) and `counterTraining` (`VFJB`).
- `receipt.ts`: types `Item`, `TaxAmounts`, `Receipt`; `taxAmountsSum` (only 20, 10, 13, 0 %, other rates throw an
  error), `taxAmountsNegate` for a cancellation (storno), `amountFormat` (cents to `31,80`), `timeFormat` (Austrian
  local time via `sv-SE` with `Europe/Vienna`), `dataLineCreate` builds `_R1-AT1_…`.
- `dep.ts`: type `DepEntry`; `depDatabaseCreate` creates the database table `dep` (`number` as PRIMARY KEY, `jws`,
  `state`, STRICT) with triggers that reject UPDATE and DELETE; plus `depAppend`, `depLast`, `depRead`.
- `depExport.ts`: type `DepExport`, `depExportCreate(receipts, certificate, authorities)` returns the JSON text
  according to Anlage Z 3.
- `cashbox.ts`: types `ReceiptKind` (`normal`, `storno`, `training`) and `Cashbox` (database, cash register ID, AES
  key, certificate serial number, signer). `receiptCreate(cashbox, items, kind, time)` first adds one zero receipt
  when one is due, then the receipt itself: a start receipt on an empty DEP (throws without a working signature
  device), a monthly receipt when `monthOf` the last receipt differs from the new month (Vienna time from the data
  line, so the turn of the year needs nothing extra), a collective receipt when the last receipt failed and the
  signature device works again. One zero receipt covers several reasons at once. `depEntryCreate` (not
  exported) creates exactly one entry: read the last receipt, receipt number, amounts, turnover counter, chaining,
  data line, signature, entry into the DEP. No transaction (removed 23.09.2026): the only write is the one `INSERT`
  of `depAppend`, which stores all or nothing by itself.

Tests green on 26.09.2026: qrcode 4, signature 5, chaining 3, counter 6, receipt 5, dep 5, depExport 2, cashbox 6.
The cashbox test signs with 64 zero bytes, so every JWS stays the same and the expected data lines can be computed
in advance.

**Special receipts (26.09.2026):** all of them are zero receipts (§ 6 Abs. 1, § 8, § 17 Abs. 4 and 8 RKSV) and
`receiptCreate` adds them by itself, except the closing receipt: `receiptCreate(cashbox, [], "normal", time)` when
shutting down, the button comes with the screen. The monthly receipt comes with the first receipt of the next month;
the BMF FAQ (questions 68 and 69) allows that on the next opening day if it is within about a week. Open: if the
restaurant is closed longer over a month end, the monthly receipt has to come before, for example at the day
closing. The December monthly receipt is the yearly receipt: print it, keep it, check it with the BMF Belegcheck app
by 15 February. The start receipt is checked the same way after the registration in FinanzOnline.

**Order of the RKSV person (22.09.2026):** Whoever builds the RKSV works through this list from top to bottom,
every step builds on the one before (planned since 19.09.2026). It applies only to the RKSV part, not to the module
order under “Next chat”.

1. Go through every file in `src/rksv/` with the RKSV person, one at a time and line by line, then how the files fit
   together (wish of the RKSV person, 23.09.2026, to understand the whole connection).
2. The eight BMF test scenarios.
3. `signerCard` for the A-Trust card under Linux; it needs a Node library for the card reader, so `package.json`
   changes for the first time.
4. Printing with the QR code; the Metapace T-3II can print QR codes itself (ESC/POS).
5. Connecting to the bill and the server.

Alongside: order the card and reader soon, so step 3 does not wait; fix the cash register ID; generate and secure
the AES key; register with FinanzOnline shortly before the start.

**Walkthrough (step 1), status 28.09.2026, the next chat continues here.** Order agreed with the RKSV person:
`cashbox.ts` first, because `receiptCreate` calls all the others, then `dep.ts`, `receipt.ts`, `counter.ts`,
`chaining.ts`, `signature.ts`, last `qrcode.ts` and `depExport.ts`, which nobody calls yet. One part per answer, top
to bottom through the file, short; imports and similar basics only when asked (RKSV person, 26.09.2026).
`cashbox.ts` is gone through completely; next: `dep.ts`. **Say “Nullbeleg” in the chat, never “Beleg über null”
(28.09.2026):** the RKSV person read “über null” as “more than zero” and did not understand the header of
`cashbox.ts`. Comments name the kinds instead (“If a start, monthly or collective receipt is due, it comes first.”)
or write “with 0€”; “receipt over zero” is gone from the code.

**First run of the BMF checking tool (23.09.2026): everything passed.** Five receipts (start, normal, storno,
training, one over 1,000 €), signed with a test key, exported with `depExportCreate`.

- `1234,50` is accepted, so amounts need no thousands separator.
- `_R1-AT1_` is accepted with a self-signed test certificate.
- Deliberately broken exports turn red: changed amount, swapped or missing receipt, wrong AES key, training
  counted. A storno with positive amounts stays green; only our storno test catches that.

To repeat it: download `regkassen-verification-1.1.1.zip` from the releases of
`BMF-RKSV-Technik/at-registrierkassen-mustercode` and run it with Java 17 from `C:\Users\Sophale\.jdks`:
`java -jar regkassen-verification-depformat-1.1.1.jar -v -f -i dep-export.json -c <container> -o out`.
The test certificate comes from `openssl req -new -x509 -key key.pem -set_serial 0x1a2b3c4d`; its serial must match
`certificateSerial` in the data line. Container fields, from the BMF class `CryptographicMaterialContainer`:
`base64AESKey`, and `certificateOrPublicKeyMap` with the serial as key and `id`, `signatureDeviceType`
(`CERTIFICATE`), `signatureCertificateOrPublicKey` (certificate as Base64 DER).

## Security

- In the folder `TOUCHIT/` access data stands in plain text: the SQL admin password, the rksv card PIN and AES key,
  FTP, mail and camera passwords, licence keys. Among others in
  `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`, `TOUCHIT/TOUCHIT_DIENSTE/RESOURCEN/INI/touchit_dienste.ini` and
  `TOUCHIT/TOUCHIT_PHONE/Web.config`. Do not copy the values into other files.
- **Never put this project folder into a public repository or onto the internet.** Git only in the folder
  `WokFlow/`, and that contains only new code. `TOUCHIT/` never goes into a repository.
- Keep the AES key. It is needed so that the old rksv journal stays checkable.
- Programs in `TOUCHIT/DECOMPILED/recovered/` are pure analysis copies: **never start them.**
- Do not trigger test sales, cancellations, payments or fiscal receipts at the real POS. Talk to the POS, phones and
  printer in the restaurant only after asking the user.

## The old system

- “TOUCHIT” v4.72 by Kortschak-Datensysteme (Austria): Visual Basic .NET, WinForms, .NET 4.5.1, one EXE with 139 MB,
  binary files only. Database Microsoft SQL Server `TOUCHIT_FILIALE_1` (about 155 tables) under
  `C:\KKK-Corporation\DATEN\Filiale_1\`. The phones open an ASP.NET web program (2008, .NET 3.5, 21 pages from
  `TOUCHIT/TOUCHIT_PHONE/_www/`) in the browser, there is no Android app. The licence hangs on the CPU id, a
  replacement PC would probably need a new one. rksv with an A-Trust card, KasseID 1, one card reader active.
- Used (according to `touchit.ini`): 1 PC (not 2, the print manager lists the same PC twice), 4 phones, table plan,
  splitting, transfer, cancellation with a reason, interim bill, open credits, mixed payment, day closing, reports,
  switching Chinese/European. Switched off: hotel, events, scale, cameras, bar tap, bonus cards, time recording,
  branches, kiosk, credit card module, turnstile, web shop.
- Everything runs on the one PC, the SQL Server too: the POS program with the print manager (which also prints the
  tickets of the phones), the phone web program in the Windows web server IIS (it writes `MTISCH`, `LOG_BON` and
  `MTISCHE`, never prints itself, saves bills without a transaction) and the helper program `TOUCHIT_DIENSTE` for
  scheduled backups (switched off in our copy, last backups 2019). Without the PC nothing works on the phones, there
  is no emergency mode.
- Printers: `touchit.ini` lists two Epson TM-T88 (bill at COM2, kitchen in the LAN 192.168.1.61:9100) and an unused
  TM-P20 default. Today only the central printer at the counter runs, according to the video a Metapace T-3II
  (ESC/POS, Epson compatible, drivers in `TOUCHIT/TOUCHIT_TOOLS/TREIBER/Diverses/Metapace/`); the kitchen printer is
  broken.

## Folders

- `WokFlow/`: the new system, its own Git repo (branch `main`, private on GitHub as `UnathiCodex/WokFlow`); this
  `CLAUDE.md` lies in it too.
- `WokFlow-before-server-api-20260917-161729.zip` in the main folder: by its name a backup of 17.09.2026 before the
  server interface was built.
- The 11 monthly Nexi settlements (October 2025 to August 2026) and the terminal invoices (June 2025 to August 2026)
  lie in the user's business filing:
  `M:\NomWorkspace\NomBusinessworkings\AsiaWokRestaurantGmbH\Kartenzahlung\<year>\` as
  `AsiaWok_Nexi_Abrechnung_YYYYMM.pdf` and `AsiaWok_Nexi_Rechnung_YYYYMM.pdf`. Business data, never into a
  repository.
- `TOUCHIT/`: everything about the old system.
  - **Original subfolders, do not change, do not delete:** `BACKUP`, `DATEN`, `TOUCHIT`, `TOUCHIT_DIENSTE`,
    `TOUCHIT_KONFIGURATION`, `TOUCHIT_PHONE`, `TOUCHIT_TOOLS`, `TOUCHIT_UPDATE`, `UPDATE`.
    - `TOUCHIT/TOUCHIT/RESOURCEN/INI/touchit.ini`: the live configuration.
    - `TOUCHIT/BACKUP/Filiale1 (local)/`: database backups. The newest is from 18.07.2024.
    - `TOUCHIT/TOUCHIT_PHONE/`: the waiter phone program.
    - `TOUCHIT/TOUCHIT_TOOLS/`: the manufacturer's tool box, with a few own helper programs (backup, card reader, IP
      scanner, NFC reader, rksv tool), which are decompiled. The rest is other companies' software, not decompiled.
    - `TOUCHIT/TOUCHIT_TOOLS/SOFTWARE/RKSV/DEP_Pruefung`: the finance ministry's checking tool.
  - `TOUCHIT/DECOMPILED/`: our **only decompilation**, complete and checked. Entry point `README.md` and
    `MODULE_INDEX.csv`. `sources/` holds the code of all 119 .NET files, 21 of them from the manufacturer (main
    program in `sources/TOUCHIT__c409d7140c/` with 33 report templates `*.rdlc`, phone program in
    `sources/TOUCHIT-Phone__712a7e6eaf/`); `native_sources/` the C pseudo code of the native files; `recovered/` the
    decrypted program copies, **never start them**; `tools/` the decompilation tools, 2.8 GB, delete only under the
    condition in “Current status”.
  - `TOUCHIT/PERFORMANCE_AUDIT/`: our SQL call analysis and the database model test. Entry point `README.md` and
    `Sandbox/ERGEBNIS.md`.

Paths in the reports of `DECOMPILED` and `PERFORMANCE_AUDIT` come from before the move, when both lay directly in
the main folder: `DECOMPILED/...` today means `TOUCHIT/DECOMPILED/...`. Older logs may still carry the earlier name
`DECOMPILED_VERIFIED`. The figures in the analysis below were counted at the first decompilation, which has been
deleted since (the same EXE, a different split into files).

The user develops in IntelliJ IDEA 2026.2 (folder `.idea`, excluded by `.gitignore`), on this PC and on a laptop.
Syncthing matches the workspace between the devices (root `M:/NomWorkspace/`, exceptions in
`M:/NomWorkspace/.stignoreglobal`). There `**/node_modules` and `**/.idea` are excluded for all projects. Because
`node_modules` is not synchronised, every machine needs `npm install` once in the folder `WokFlow`.

**IntelliJ and the Node types (clarified 14.09.2026, checked in the IntelliJ log):** if a project has no TypeScript
of its own, IntelliJ takes its own and does not find the Node types without a `tsconfig.json` (red lines at
`node:http`); that is why `typescript` 7.0.2 stands in the devDependencies. There are two separate helpers: hover
text, Ctrl+click and errors in the code come from the TypeScript 7 service, which fetches the Node types itself per
computer (`%LOCALAPPDATA%\Microsoft\TypeScript\7.0`), so the laptop can behave differently from the PC. Links in
comments IntelliJ checks itself and needs `@types/node` in `node_modules` for that.

Installed on the PC (14.09.2026): Node.js 26, Git, ffmpeg 8 (winget), Python 3.14 as a user installation under
`AppData\Local\Python` with `faster-whisper`; Whisper models tiny to large-v3 lie in the user's Hugging Face cache.
With that, voice messages and videos can be turned into text: pull a 16 kHz mono WAV with ffmpeg, then
`WhisperModel("large-v3", device="cpu", compute_type="int8")`, 60 s of sound take about 35 s. No SQL Server. .NET,
Java and Ghidra lie only as tools in `TOUCHIT/DECOMPILED/tools/`, not installed. The main folder is not a Git
repository.

## What has been done

- 08. and 09.09.2026: scan, analysis (result under “Analysis of the old system”), complete decompilation in
  `TOUCHIT/DECOMPILED/`: all 119 .NET files as C#, including the 17 protected with ConfuserEx (decrypted offline
  with `scripts/recover_antitamper.py`, without starting the programs). 230,359 methods without a syntax error, plus
  12 native files as C pseudo code via Ghidra. All 339 original files are unchanged (SHA-256 checked). Only for
  understanding, nothing rebuilt or compared with the real POS.
- SQL call analysis and a model test in `TOUCHIT/PERFORMANCE_AUDIT/`. There are no real run times of the POS, the
  measurement plan with 12 flows stands there.
- 13. to 21.09.2026: planning of WokFlow (manifest, decisions), understood the boss's wife's day closing from photos
  and video, evaluated the Nexi settlements, screen draft, mails to Nexi and the tax adviser, article catalog,
  module `tables`, server interface, table lock, slice 1 of the order screen. The code history is shown by Git in
  `WokFlow/`.

## Analysis of the old system

TOUCHIT is 20 to 30 times bigger than needed; a clean system of this size would have 30,000 to 60,000 lines. Grown
over 15 years, one single developer, copy-paste, no tests. The 13 main problems, the worst first (figures from the
first decompilation):

1. Every query runs twice (`Module_Sql.Execute`: first NonQuery, then Reader, 4,736 places).
2. 1,398 loops with one database query per pass.
3. SQL by text concatenation: 7,711 commands, only 31 with parameters (danger of injection, comma errors).
4. 48 global database connections with global readers (`Execute2` to `Execute1000`).
5. Asking instead of events: about 370 timers (66 at a 1 ms interval), 652 `DoEvents`, 283 `Thread.Sleep`.
6. Huge files: `Form_Bonieren_0.cs` has 118,955 lines, 66 functions have over 1,000 lines.
7. Copying instead of reusing: 385 groups of equal methods with 53,235 lines.
8. Swallowed errors: 378 empty error handlers, 541 `goto`, 773 message windows.
9. Loose types: 28,612 automatic conversions, 16,765 text comparisons for decisions.
10. Hard-wired: `C:\KKK-Corporation` 131 times, passwords in plain text, the licence on the CPU id.
11. Printing sits in the screen code: 15,230 raw printer commands.
12. POS and phone program order separately, every change had to be made twice.
13. Reports in the screen code: the financial report as one method with 2,477 lines, plus a copy.

Model test with artificial data (not a measurement at the POS): the phone table overview with 30 open tables needs
182 queries, bundled one is enough (at 5 ms per query about 1 s instead of 6 ms). Double write commands could
increase counters twice, but that is no proof of doubly booked sales.

Usable knowledge (only the idea, never code): the data model (`ARTIKEL`, `WGR`, `TASTENPLAN`, `OBJEKTE_TISCHE`,
`MTISCHE`, `LOG_RECHNUNG`, `LOG_BON`, `LOG_RECHNUNG_ZAHLART`, `LOG_STORNOS`, `ZUGRIFF`, the Chinese name in
`Bezeichnung_2`), the rksv flow, ESC/POS printing and the 33 report templates as a list of the numbers in use.

## The 10 rules for the new system

1. One small database layer. Every query with parameters, every query runs exactly once.
2. A screen loads with one or two queries, never one query per line.
3. No timers that keep asking. The server sends events (a new print job, a changed table) to the screens.
4. Printing is a small service of its own with a queue, retries and a log. Screens never talk to printers directly.
5. One code base for the POS PC and the waiter phones (a web app).
6. Money calculation with Dinero.js 2, storage in whole cents. Text only for the output. Dates are real date values.
7. Every error is logged with time, station and user. No empty error handlers.
8. Screens stay small. A function longer than one screen page is split.
9. rksv code has automatic tests and is checked with the ministry's tool before the start.
10. Configuration and secrets lie in one place, not in the code.
