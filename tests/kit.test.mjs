// Loads the kit in headless Chromium and checks every prompt it can produce.
// Run: npm test
import { chromium } from "playwright";
import { existsSync } from "node:fs";

const page_url = new URL("../inaya-prompt-kit.html", import.meta.url).href;
const exe = ["/opt/pw-browsers/chromium/chrome-linux/chrome", process.env.CHROMIUM_PATH].find(p => p && existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
const errors = [];
page.on("pageerror", e => errors.push(e.message));
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
await page.goto(page_url);

const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };

const cards = await page.$$eval("article.card", els => els.map(e => ({
  code: e.querySelector(".code")?.textContent || "builder",
  text: e.querySelector("pre").textContent
})));
check(cards.length >= 40, `expected at least 40 cards, got ${cards.length}`);
for (const c of cards) check(!/undefined|NaN|\bnull\b/.test(c.text), `card ${c.code} contains undefined/NaN/null`);
check(await page.evaluate(() => document.documentElement.scrollWidth) <= 390, "page scrolls horizontally at 390px");

// Builder: every format × toggle combination, random picks for the rest.
const fuzz = await page.evaluate(() => {
  const bad = []; let n = 0;
  const bools = [false, true];
  for (const fmt of Object.keys(FMT)) for (const place of bools) for (const product of bools)
  for (const carPhoto of bools) for (const outRef of bools) for (const hands of bools) for (const car of ["CAR1", "NONE"])
  for (let i = 0; i < 20; i++) {
    const st = Object.assign({}, BDEF, { fmt, place, product, carPhoto, outRef, hands, car, act: "", ratio: FMT[fmt].ratio,
      placeName: i % 2 ? "Studio X" : "", productName: i % 3 ? "Film Y" : "", customCar: i % 5 === 0 ? "a blue coupe" : "" });
    for (const a of active(st)) { const o = options(a, st); st[a] = o[Math.floor(Math.random() * o.length)].k; normalize(st); }
    normalize(st);
    const r = assemble(st); n++;
    if (/undefined|NaN|\bnull\b/.test(r.text)) bad.push(`${fmt}: undefined in prompt ${JSON.stringify(st)}`);
    const used = [...r.text.matchAll(/Image (\d+)/g)].map(m => +m[1]);
    if (used.length && Math.max(...used) > r.imgs.length) bad.push(`${fmt}: refers to Image ${Math.max(...used)} but only ${r.imgs.length} attached`);
  }
  return { n, bad };
});
check(fuzz.n > 0, "builder fuzz did not run");
fuzz.bad.slice(0, 10).forEach(b => failures.push(b));
errors.forEach(e => failures.push("console: " + e));

await browser.close();
if (failures.length) {
  console.error(`FAIL (${failures.length})\n- ` + failures.join("\n- "));
  process.exit(1);
}
console.log(`PASS: ${cards.length} cards, ${fuzz.n} builder combinations, no console errors`);
