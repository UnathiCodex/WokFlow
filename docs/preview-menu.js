/**
 * ## Preview menu
 * Restaurant menu labels and variants for the current screen prototype.
 * Menu labels and cent prices from the restaurant's 2026 PDF.
 * Prices are only displayed during checkout; no server, printer or payment connection.
 */
/** Local preview data from the 2026 menu; no server, printer or payment connection. */
const menus = {
    drinks: [
        ["Limonaden", [["Cola","可乐","cola"],["Spezi","可乐橙汁","soft"],["Fanta","芬达","softBottle"],["Sprite","雪碧","softBottle"],["Eistee","冰茶","soft"],["Almdudler","草本汽水","soft"],["Red Bull","红牛"]]],
        ["Fruchtsäfte", [["Apfelsaft","苹果汁","soft"],["Orangensaft","橙汁","soft"],["Pago Erdbeere","草莓汁","juice"],["Pago Mango","芒果汁","juice"],["Pago Marille","杏汁","juice"],["Johannisbeere","黑加仑汁","juice"],["Aloe Vera","芦荟汁","twoSizes"],["Lycheesaft","荔枝汁","twoSizes"]]],
        ["Wasser", [["Mineralwasser","矿泉水","mineral"],["Soda","苏打水","soda"],["Leitungswasser","自来水","twoSizes"]]],
        ["Bier", [["Villacher","生啤酒","beer"],["Radler","啤酒汽水","beer"],["Hefetrüb","小麦啤酒","largeBeer"],["Alkoholfreies Bier","无酒精啤酒","largeBeer"],["Tsingtao","青岛啤酒","smallBottle"]]],
        ["Weine", [["Weißwein","白葡萄酒","wine"],["Rotwein","红葡萄酒","wine"],["Aperol Spritz","阿佩罗气泡酒"],["Hugo","接骨木气泡酒"],["Prosecco","普罗塞克气泡酒","prosecco"]]],
        ["Warmes", [["Tee","茶","tea"],["Kaffee","咖啡","coffee"],["Verlängerter","淡美式咖啡"],["Melange","维也纳奶泡咖啡"],["Cappuccino","卡布奇诺"],["Latte Macchiato","拿铁玛奇朵"]]],
        ["Spirituosen", [["Campari","金巴利","campari"],["Whisky","威士忌"],["Wodka","伏特加"],["Bacardi","百加得"],["Underberg","草本苦酒"],["Jägermeister","野格利口酒"],["Reisschnaps","米酒"],["Bambusschnaps","竹叶青"],["Wurzelschnaps","草根酒"],["Ginsengschnaps","人参酒"],["Pflaumenwein","梅酒"],["Sake","清酒"]]]
    ],
    food: [
        ["Vorspeisen", [["Pikante Suppe","酸辣汤"],["Miso Suppe","味噌汤"],["Frühlingsrollen","春卷"],["Hummerchips","虾片"],["Gebackener Tintenfisch","炸鱿鱼"],["Gebackene Garnelen","炸虾"]]],
        ["Salate", [["Sojasprossen Salat","豆芽沙拉"],["Gemischter Salat","什锦沙拉"],["Grüner Salat","绿叶沙拉"],["Pikanter Salat","辣味沙拉"]]],
        ["Beilagen", [["Gebratener Reis","炒饭"],["Gebratene Nudeln","炒面"],["Extra Portion Reis","加饭"],["Extra Sauce Knoblauch","加蒜蓉酱"],["Gebackene Banane","炸香蕉"]]],
        ["Sushi", [["Sushi-Set klein","寿司套餐 小"],["Sushi-Set mittel","寿司套餐 中"],["Sushi-Set groß","寿司套餐 大"],["Lachs Sushi","三文鱼寿司"]]],
        ["Maki", [["Lachs Maki","三文鱼卷","maki"],["Gurke Maki","黄瓜卷","maki"],["California Maki","加州卷","maki"],["Avocado Maki","牛油果卷","maki"],["Futo Maki","太卷"],["Maki im Set","什锦卷套餐"]]],
        ["Meeresfrüchte", [["Meeresfrüchte mit Gemüse","海鲜炒蔬菜"],["Gegrillte Riesengarnelen","铁板大虾"],["Gegrillter Fisch mit Gemüse","铁板鱼配蔬菜"]]],
        ["Gemüse", [["Buddhistische Fastenspeise","罗汉斋"],["Tofu mit Gemüse","蔬菜豆腐"]]],
        ["Huhn", [["Hühnerfleisch mit Gemüse","什锦蔬菜鸡"],["Hühnerfleisch süß-sauer","糖醋鸡"],["Sichuan Hühnerfleisch","川味鸡"],["Knuspriges Hühnerfleisch","香酥鸡"],["Hühnerfleisch mit Bambus und Pilzen","竹笋蘑菇鸡"],["Gong Bao Hühnerfleisch","宫保鸡丁"],["Sesam Hühnerfleisch","芝麻鸡"],["Thai Red Curry Chicken","泰式红咖喱鸡"]]],
        ["Rind", [["Rindfleisch mit Gemüse","什锦蔬菜牛肉"],["La-Za Rindfleisch","辣子牛肉"],["Rindfleisch mit Zwiebeln und Paprika","洋葱青椒牛肉"],["Acht Schätze","八宝"]]],
        ["Schwein", [["Gan-Bian Schweinefleisch","干煸猪肉"],["Fleischtaschen","饺子"]]],
        ["Ente", [["Knusprige Ente","香酥鸭"]]],
        ["Reis & Nudeln", [["Gebratener Reis mit Ei und Gemüse","蛋炒饭"],["Gebratener Reis mit Hühnerfleisch","鸡肉炒饭"],["Gebratener Reis mit Garnelen","虾仁炒饭"],["Gebratene Nudeln mit Gemüse","蔬菜炒面"],["Gebratene Nudeln mit Hühnerfleisch","鸡肉炒面"]]]
    ]
};
/** Short service labels for article buttons; orders keep the complete menu name. */
const articleLabels = {
    "Gebackener Tintenfisch":"Tintenfisch", "Gebackene Garnelen":"Garnelen",
    "Sojasprossen Salat":"Sojasprossen", "Gemischter Salat":"Gemischt", "Grüner Salat":"Grün", "Pikanter Salat":"Pikant",
    "Extra Portion Reis":"Extra Reis", "Extra Sauce Knoblauch":"Knoblauchsoße",
    "Thai Red Curry Chicken":"Thai Curry", "Sesam Hühnerfleisch":"Sesam-Huhn",
    "Gegrillter Fisch mit Gemüse":"Fisch & Gemüse", "Meeresfrüchte mit Gemüse":"Meeresfrüchte", "Gegrillte Riesengarnelen":"Riesengarnelen",
    "Buddhistische Fastenspeise":"Fastenspeise", "Tofu mit Gemüse":"Tofu & Gemüse",
    "Hühnerfleisch mit Gemüse":"Gemüse", "Hühnerfleisch süß-sauer":"Süß-sauer", "Sichuan Hühnerfleisch":"Sichuan",
    "Knuspriges Hühnerfleisch":"Knusprig", "Hühnerfleisch mit Bambus und Pilzen":"Bambus & Pilze", "Gong Bao Hühnerfleisch":"Gong Bao",
    "Rindfleisch mit Gemüse":"Gemüse", "La-Za Rindfleisch":"La-Za", "Rindfleisch mit Zwiebeln und Paprika":"Zwiebel & Paprika",
    "Gan-Bian Schweinefleisch":"Gan-Bian", "Knusprige Ente":"Knusprig",
    "Gebratener Reis mit Ei und Gemüse":"Reis mit Ei und Gemüse", "Gebratener Reis mit Hühnerfleisch":"Reis mit Hühnerfleisch", "Gebratener Reis mit Garnelen":"Reis mit Garnelen",
    "Gebratene Nudeln mit Gemüse":"Nudeln mit Gemüse", "Gebratene Nudeln mit Hühnerfleisch":"Nudeln mit Hühnerfleisch",
    "Alkoholfreies Bier":"Alkoholfrei"
};
/** Chinese button labels omit context already supplied by the salad category. */
const articleChineseLabels = {"Sojasprossen Salat":"豆芽", "Gemischter Salat":"什锦", "Grüner Salat":"绿叶", "Pikanter Salat":"辣味"};
/** Set contents from menu page 5; quantities appear once for both languages. */
const articlePortions = {
    "Sushi-Set klein":"7 Sushi + 3 Maki", "Sushi-Set mittel":"9 Sushi + 3 Maki",
    "Sushi-Set groß":"11 Sushi + 3 Maki", "Lachs Sushi":"8 Sushi + 3 Maki",
    "Futo Maki":"10", "Maki im Set":"18"
};
/** Size and preparation labels; prices are intentionally absent from ordering. */
const variants = {
    soft: [["0.25"],["0.5"],["0.3","+ Wasser","加水"],["0.5","+ Wasser","加水"],["0.3","+ Soda","加苏打水"],["0.5","+ Soda","加苏打水"]],
    juice: [["0.2"],["0.3","+ Wasser","加水"],["0.5","+ Wasser","加水"],["0.3","+ Soda","加苏打水"],["0.5","+ Soda","加苏打水"]],
    twoSizes: [["0.25"],["0.5"]], bottle: [["Flasche","0.35","瓶装"]], smallBottle: [["0.33"]], prosecco: [["0.2"]],
    mineral: [["Mit Kohlensäure","","有气"],["Ohne Kohlensäure","","无气"]],
    soda: [["0.25"],["0.5"],["0.25","+ Zitrone","加柠檬"],["0.5","+ Zitrone","加柠檬"]],
    beer: [["0.3"],["0.5"]], largeBeer: [["0.5"]],
    wine: [["1/8"],["1/4"],["1/4","+ Soda","加苏打水"],["1/2","+ Soda","加苏打水"]],
    tea: [["Schwarz","","红茶"],["Früchte","","果茶"],["Kamille","","洋甘菊"],["Pfefferminz","","薄荷"],["Jasmin","","茉莉"],["Grün","","绿茶"]],
    coffee: [["Klein","","小"],["Groß","","大"]], campari: [["Orange","","橙汁"],["Soda","","苏打"]],
    maki: [["6 Stück"],["12 Stück"]]
};
variants.softBottle = [...variants.soft, ...variants.bottle];
/** Short Chinese labels for the fixed menu groups. */
const groupChinese = {
    "Limonaden":"汽水", "Fruchtsäfte":"果汁", "Wasser":"水",
    "Bier":"啤酒", "Weine":"酒", "Warmes":"热饮", "Spirituosen":"烈酒",
    "Vorspeisen":"前菜", "Salate":"沙拉", "Beilagen":"配菜", "Sushi":"寿司", "Maki":"寿司卷",
    "Meeresfrüchte":"海鲜", "Gemüse":"蔬菜", "Huhn":"鸡肉", "Rind":"牛肉", "Schwein":"猪肉",
    "Ente":"鸭肉", "Reis & Nudeln":"米饭和面"
};
/** Local category illustrations; sources and licenses are in icons/LICENSE.txt. */
const groupIcons = {
    "Limonaden":"soft-drinks",
    "Fruchtsäfte":"juice",
    "Wasser":"water",
    "Bier":"beer",
    "Weine":"wine",
    "Warmes":"hot-drinks",
    "Spirituosen":"spirits",
    "Vorspeisen":"starters",
    "Salate":"salad",
    "Beilagen":"sides",
    "Sushi":"sushi",
    "Maki":"maki",
    "Meeresfrüchte":"seafood",
    "Gemüse":"vegetables",
    "Huhn":"chicken",
    "Rind":"beef",
    "Schwein":"pork",
    "Ente":"duck",
    "Reis & Nudeln":"rice-noodles"
};
/** Cola is one catalog tile; each flavor keeps its actual menu variants. */
const colaFlavors = [
    ["Cola","可乐","softBottle"],
    ["Cola Zero","零度可乐","softBottle"],
    ["Cola Light","健怡可乐","bottle"]
];
/** Shared variant prices in cents, in the same order as the corresponding choices. */
const variantPrices = {
    soft:[310,450,330,400,380,420], softBottle:[310,450,330,400,380,420,410],
    juice:[350,360,390,390,430], bottle:410, mineral:330,
    soda:[270,350,290,370], beer:[410,500], largeBeer:500, smallBottle:450,
    wine:[380,550,400,650], prosecco:600, tea:370, coffee:[300,410], campari:400
};
/** Item-specific prices from PDF pages 2–6, including the four different maki price pairs. */
const itemPrices = {
    "Aloe Vera":[370,510], "Lycheesaft":[360,460], "Leitungswasser":[70,130], "Red Bull":400,
    "Aperol Spritz":560, "Hugo":560, "Verlängerter":330, "Melange":330, "Cappuccino":400, "Latte Macchiato":430,
    "Whisky":410, "Wodka":310, "Bacardi":310, "Underberg":330, "Jägermeister":420,
    "Reisschnaps":410, "Bambusschnaps":410, "Wurzelschnaps":410, "Ginsengschnaps":410, "Pflaumenwein":320, "Sake":320,
    "Pikante Suppe":350, "Miso Suppe":410, "Frühlingsrollen":350, "Hummerchips":390,
    "Gebackener Tintenfisch":590, "Gebackene Garnelen":620,
    "Sojasprossen Salat":350, "Gemischter Salat":350, "Grüner Salat":350, "Pikanter Salat":350,
    "Gebratener Reis":550, "Gebratene Nudeln":550, "Extra Portion Reis":250, "Extra Sauce Knoblauch":250, "Gebackene Banane":310,
    "Sushi-Set klein":1290, "Sushi-Set mittel":1490, "Sushi-Set groß":1690, "Lachs Sushi":1290,
    "Lachs Maki":[450,830], "Gurke Maki":[390,690], "California Maki":[710,1050], "Avocado Maki":[690,990],
    "Futo Maki":1050, "Maki im Set":1450, "Thai Red Curry Chicken":1490, "Fleischtaschen":1490,
    "Acht Schätze":1490, "Sesam Hühnerfleisch":1490, "Gegrillter Fisch mit Gemüse":1590,
    "Meeresfrüchte mit Gemüse":1590, "Gegrillte Riesengarnelen":1990,
    "Buddhistische Fastenspeise":1190, "Tofu mit Gemüse":1190,
    "Hühnerfleisch mit Gemüse":1490, "Hühnerfleisch süß-sauer":1490, "Sichuan Hühnerfleisch":1490,
    "Knuspriges Hühnerfleisch":1490, "Hühnerfleisch mit Bambus und Pilzen":1490, "Gong Bao Hühnerfleisch":1490,
    "Rindfleisch mit Gemüse":1490, "La-Za Rindfleisch":1490, "Rindfleisch mit Zwiebeln und Paprika":1490,
    "Gan-Bian Schweinefleisch":1490, "Knusprige Ente":1690,
    "Gebratener Reis mit Ei und Gemüse":1090, "Gebratener Reis mit Hühnerfleisch":1190,
    "Gebratener Reis mit Garnelen":1290, "Gebratene Nudeln mit Gemüse":1090, "Gebratene Nudeln mit Hühnerfleisch":1190
};
/** Buffet cent prices use the confirmed adult and child tariffs. */
const buffetPrices = {sunday:[1990,1290,790], lunch:[1590,990,590], dinner:[1990,1290,790], holiday:[1990,1290,790]};
/** Look up one concrete serving; missing prices never silently become zero. */
const priceFor = (item, choiceIndex = 0, lemon = false) => {
    const prices = itemPrices[item[0]] ?? variantPrices[item[2]];
    const amount = Array.isArray(prices) ? prices[choiceIndex] : prices;
    if (!Number.isInteger(amount)) throw new Error("Missing preview price: " + item[0]);
    return amount + (lemon ? 20 : 0);
};
