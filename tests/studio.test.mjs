// Exercises the Puter studio with a mock puter object (no network, no account).
// Run: npm test
import { chromium } from "playwright";
import { existsSync } from "node:fs";

const url = new URL("../inaya-prompt-kit.html", import.meta.url).href;
const exe = ["/opt/pw-browsers/chromium/chrome-linux/chrome", process.env.CHROMIUM_PATH].find(p => p && existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const ctx = await browser.newContext({ viewport: { width: 390, height: 900 } });
await ctx.addInitScript(() => {
  const PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  window.__calls = [];
  window.puter = {
    auth: { isSignedIn: () => true, getUser: async () => ({ username: "tester" }), signIn: async () => true },
    ai: {
      listModels: async () => [{ id: "gemini-3-pro-image-preview" }, { id: "gemini-3.1-flash-image" }, { id: "gemini-2.5-flash" }],
      txt2img: async (opts, test) => { window.__calls.push({ opts: { ...opts, input_images: (opts.input_images || []).length }, test }); return { src: PNG }; }
    }
  };
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", e => errors.push(e.message));
await page.goto(url);
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); };
const lastCall = () => page.evaluate(() => window.__calls[window.__calls.length - 1]);
const status = () => page.textContent("#pt-status");
const waitIdle = () => page.waitForFunction(() => ![...document.querySelectorAll("button.gen")].some(b => b.disabled));
const gen = async code => { await page.click(`button[data-card="${code}"]`); await waitIdle(); };

await page.click("#pt-connect");
await page.waitForFunction(() => /Connected as tester/.test(document.getElementById("pt-status").textContent));
check((await page.$$eval("#pt-model option", o => o.length)) === 2, "model list should keep only the 2 image models");

await gen("P1");
let c = await lastCall();
check(c && c.opts.input_images === 0 && c.opts.ratio?.w === 3 && c.opts.ratio?.h === 4 && c.opts.provider === "gemini", "P1 should send no images and a 3:4 ratio");
check(/Done: P1/.test(await status()), "P1 should finish");
await page.click('.card:has([data-card="P1"]) .result button.mini');
check(await page.evaluate(() => !!slotImg.A), "Use as Ref A should fill slot A");

await gen("Ref B");
c = await lastCall();
check(c.opts.input_images === 1 && c.opts.ratio.w === 16, "Ref B should attach Ref A only, at 16:9");

const before = (await page.evaluate(() => window.__calls.length));
await gen("S1");
check((await page.evaluate(() => window.__calls.length)) === before, "S1 must not call the API while Ref B/C are missing");
check(/Ref B, Ref C/.test(await status()), "S1 should name the missing slots");

await page.evaluate(() => { setSlot("B", slotImg.A); setSlot("C", slotImg.A); });
await gen("S1");
c = await lastCall();
check(c.opts.input_images === 3, "S1 should attach Ref A, B, C");

await gen("R4");
check((await lastCall()).opts.input_images === 3, "R4 should run without the optional Ref H");

await page.check("#pt-test");
await page.evaluate(() => { S.place = true; });
await page.click("#b-gen"); await waitIdle();
check(/Place photo/.test(await status()), "builder with a place photo should ask for the Place slot");
await page.evaluate(() => { S.place = false; });
await page.click("#b-gen"); await waitIdle();
c = await lastCall();
check(c.test === true && c.opts.input_images === 3, "builder should honour test mode and attach A, B, C");

const n0 = await page.$$eval("#pt-results .result", r => r.length);
await page.click('[data-quick="refA"]'); await waitIdle();
check((await page.$$eval("#pt-results .result", r => r.length)) === n0 + 2, "Quick start Ref A should add 2 results");

await page.reload();
await page.waitForTimeout(300);
check(await page.evaluate(() => !!slotImg.A && !!slotImg.C), "slots should survive a reload");
errors.forEach(e => failures.push("page error: " + e));
await browser.close();
if (failures.length) { console.error(`STUDIO FAIL (${failures.length})\n- ` + failures.join("\n- ")); process.exit(1); }
console.log("PASS: studio (mock Puter): refs, slots, attach order, missing-slot guard, test mode, persistence");
