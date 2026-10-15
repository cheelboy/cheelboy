// Generates Inaya's images with Google's Gemini image models (Nano Banana), using the
// prompts in inaya-prompt-kit.html so the kit stays the single source of truth.
//
//   GEMINI_API_KEY=… npm run generate -- models            list image models your key can use
//   GEMINI_API_KEY=… npm run generate -- ref-a --n 4      4 master-portrait candidates
//   GEMINI_API_KEY=… npm run generate -- pick 2           keep candidate 2 as refs/refA.png
//   GEMINI_API_KEY=… npm run generate -- refs             Ref B, C, D from refs/refA.png
//   GEMINI_API_KEY=… npm run generate -- social S1 S2 S4  scenes with Ref A, B, C attached
//
// Options: --model <id> (default $GEMINI_IMAGE_MODEL or gemini-3-pro-image-preview),
//          --n <count>, --dry-run (print the requests, send nothing).
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Node's fetch ignores HTTPS_PROXY unless NODE_USE_ENV_PROXY=1, so restart with it set.
if (process.env.HTTPS_PROXY && !process.env.NODE_USE_ENV_PROXY) {
  const r = spawnSync(process.execPath, ["--no-warnings=UNDICI-EHPA", ...process.argv.slice(1)], { stdio: "inherit", env: { ...process.env, NODE_USE_ENV_PROXY: "1" } });
  process.exit(r.status ?? 1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REFS = join(ROOT, "refs");
const OUT = join(ROOT, "generated");
const API = "https://generativelanguage.googleapis.com/v1beta";

const args = process.argv.slice(2);
const flag = (name, fallback) => { const i = args.indexOf("--" + name); return i < 0 ? fallback : args.splice(i, 2)[1]; };
const dryRun = args.includes("--dry-run") && !!args.splice(args.indexOf("--dry-run"), 1);
const model = flag("model", process.env.GEMINI_IMAGE_MODEL || "gemini-3-pro-image-preview");
const n = Number(flag("n", "1"));
const [cmd, ...rest] = args;
const key = process.env.GEMINI_API_KEY;

// Which kit card makes each reference, what it needs attached, and the size to ask for.
const REF_JOBS = {
  B: { code: "Ref B", attach: ["A"], size: "2K" },
  C: { code: "Ref C", attach: ["A"], size: "4K" },
  D: { code: "Ref D", attach: ["A"], size: "2K" },
  E: { code: "Ref E", attach: ["A", "C"], size: "4K" },
  H: { code: "Ref H", attach: ["A"], size: "2K" }
};

async function kitPrompts() {
  const { chromium } = await import("playwright");
  const exe = ["/opt/pw-browsers/chromium/chrome-linux/chrome", process.env.CHROMIUM_PATH].find(p => p && existsSync(p));
  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage();
  await page.goto("file://" + join(ROOT, "inaya-prompt-kit.html"));
  const cards = await page.evaluate(() => Object.fromEntries(P.map(p => [p.code, { text: p.build(p.outfit).join("\n\n"), ratio: p.ratio, title: p.title }])));
  await browser.close();
  return cards;
}

const ref = name => {
  const f = join(REFS, `ref${name}.png`);
  if (!existsSync(f) && !dryRun) throw new Error(`refs/ref${name}.png is missing. Make it first (see the usage at the top of tools/generate.mjs).`);
  return f;
};

async function generate({ prompt, images = [], ratio, size, outBase }) {
  const parts = [{ text: prompt }].concat(dryRun ? [] : images.map(f => ({ inline_data: { mime_type: "image/png", data: readFileSync(f).toString("base64") } })));
  const imageConfig = { aspectRatio: ratio };
  if (size && !/2\.5/.test(model)) imageConfig.imageSize = size; // 2.5 Flash Image has no size option
  const body = { contents: [{ role: "user", parts }], generationConfig: { responseModalities: ["IMAGE"], imageConfig } };
  if (dryRun) {
    console.log(`\n# ${outBase} · ${model} · ${ratio}${size ? " · " + size : ""} · attach: ${images.map(f => f.replace(ROOT + "/", "")).join(", ") || "none"}\n${prompt}`);
    return;
  }
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body)
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${json.error?.message || res.statusText}`);
  const img = json.candidates?.[0]?.content?.parts?.find(p => p.inlineData || p.inline_data);
  if (!img) throw new Error(`No image returned (finish reason: ${json.candidates?.[0]?.finishReason || "unknown"}). Try again or adjust the prompt.`);
  const data = (img.inlineData || img.inline_data).data;
  mkdirSync(dirname(outBase), { recursive: true });
  writeFileSync(outBase + ".png", Buffer.from(data, "base64"));
  writeFileSync(outBase + ".json", JSON.stringify({ model, ratio, size, attach: images.map(f => f.replace(ROOT + "/", "")), prompt, created: new Date().toISOString() }, null, 2));
  console.log("saved", (outBase + ".png").replace(ROOT + "/", ""));
}

async function main() {
  if (!cmd) { console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("\nimport")[0]); return; }
  if (!key && !dryRun && cmd !== "pick") throw new Error("Set GEMINI_API_KEY first (Google AI Studio → Get API key).");

  if (cmd === "models") {
    const res = await fetch(`${API}/models?pageSize=200`, { headers: { "x-goog-api-key": key } });
    const json = await res.json();
    if (!res.ok) throw new Error(`Gemini API ${res.status}: ${json.error?.message}`);
    json.models.filter(m => /image/i.test(m.name)).forEach(m => console.log(m.name.replace("models/", ""), "·", m.displayName));
    return;
  }
  if (cmd === "pick") {
    const dir = join(OUT, "refA");
    const want = String(rest[0] || "").padStart(2, "0");
    const file = existsSync(dir) && readdirSync(dir).find(f => f.endsWith(`_${want}.png`));
    if (!file) throw new Error(`No candidate ${rest[0]} in generated/refA.`);
    mkdirSync(REFS, { recursive: true });
    copyFileSync(join(dir, file), join(REFS, "refA.png"));
    console.log(`refs/refA.png ← generated/refA/${file}`);
    return;
  }

  const cards = await kitPrompts();
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");

  if (cmd === "ref-a") {
    for (let i = 1; i <= n; i++) await generate({ prompt: cards.P1.text, ratio: "3:4", size: "2K", outBase: join(OUT, "refA", `refA_${stamp}_${String(i).padStart(2, "0")}`) });
    console.log("Pick the best face, then: npm run generate -- pick <number>");
    return;
  }
  if (cmd === "refs") {
    const which = rest.length ? rest.map(r => r.toUpperCase()) : ["B", "C", "D"];
    for (const w of which) {
      const job = REF_JOBS[w]; if (!job) throw new Error(`Unknown reference ${w}. Use B, C, D, E or H.`);
      for (let i = 1; i <= n; i++) {
        const outBase = join(OUT, "refs", `ref${w}_${stamp}_${String(i).padStart(2, "0")}`);
        await generate({ prompt: cards[job.code].text, images: job.attach.map(ref), ratio: cards[job.code].ratio, size: job.size, outBase });
        if (!dryRun && i === 1) { mkdirSync(REFS, { recursive: true }); copyFileSync(outBase + ".png", join(REFS, `ref${w}.png`)); }
      }
    }
    console.log("Saved the first of each as refs/ref<X>.png. Swap in a better one by copying it over.");
    return;
  }
  if (cmd === "social") {
    const codes = rest.length ? rest : ["S1", "S2", "S3", "S4"];
    for (const code of codes) {
      const card = cards[code]; if (!card) throw new Error(`No card ${code} in the kit.`);
      if (!/^(S|V)\d+$/.test(code)) throw new Error(`${code} needs extra images (place or product photos); use the kit for it.`);
      for (let i = 1; i <= n; i++) await generate({ prompt: card.text, images: ["A", "B", "C"].map(ref), ratio: card.ratio, size: "2K",
        outBase: join(OUT, "social", `${code}_${stamp}_${String(i).padStart(2, "0")}`) });
    }
    return;
  }
  throw new Error(`Unknown command ${cmd}. Run with no arguments for usage.`);
}

main().catch(e => { console.error("Error:", e.message); process.exit(1); });
