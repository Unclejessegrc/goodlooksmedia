import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const TARGETS = ["src", "public"].filter((dir) => existsSync(join(ROOT, dir)));
const EXTENSIONS = new Set([".css", ".html", ".tsx", ".ts", ".jsx", ".js"]);

const CHECKS = [
  {
    name: "zero-value font rendering",
    pattern: /font-size\s*:\s*0(?!\.)(?:px|rem|em)?\b/i,
  },
  {
    name: "zero-value line rendering",
    pattern: /line-height\s*:\s*0(?!\.)(?:px|rem|em)?\b/i,
  },
  {
    name: "render suppression",
    pattern: /display\s*:\s*["']?none["']?/i,
  },
  {
    name: "visibility suppression",
    pattern: /visibility\s*:\s*["']?hidden["']?/i,
  },
  {
    name: "transparency camouflage",
    pattern: /opacity\s*:\s*0(?!\.)\b/i,
  },
  {
    name: "large off-screen positioning",
    pattern: /margin-left\s*:\s*-\s*(?:9999px|999em)/i,
  },
  {
    name: "large off-screen positioning",
    pattern: /left\s*:\s*-\s*(?:9999px|999em)/i,
  },
];

const ALLOWLIST = [
  {
    reason: "Netlify form honeypot fallback",
    filePattern: /src[\\/]routes[\\/]__root\.tsx$/,
    textPattern: /netlify-honeypot="bot-field"[\s\S]*?\bhidden\b/,
  },
  {
    reason: "Netlify contact form honeypot",
    filePattern: /src[\\/]routes[\\/]contact\.tsx$/,
    textPattern: /display:\s*"none"[\s\S]*?name="bot-field"/,
  },
  {
    reason: "Static Netlify form honeypot",
    filePattern: /public[\\/]forms\.html$/,
    textPattern: /netlify-honeypot="bot-field"[\s\S]*?\bhidden\b/,
  },
  {
    reason: "Cosmetic scrollbar hiding",
    filePattern: /src[\\/]styles\.css$/,
    textPattern: /\.scrollbar-none::-webkit-scrollbar\s*\{\s*display:\s*none;\s*\}/,
  },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) return walk(full);
    const dot = entry.lastIndexOf(".");
    const ext = dot >= 0 ? entry.slice(dot) : "";
    return EXTENSIONS.has(ext) ? [full] : [];
  });
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function isAllowed(path, text, matchIndex) {
  return ALLOWLIST.some((item) => {
    if (!item.filePattern.test(path)) return false;
    const match = item.textPattern.exec(text);
    if (!match || match.index === undefined) return false;
    return matchIndex >= match.index && matchIndex <= match.index + match[0].length;
  });
}

const findings = [];

for (const target of TARGETS) {
  for (const file of walk(join(ROOT, target))) {
    const rel = relative(ROOT, file);
    const text = readFileSync(file, "utf8");
    for (const check of CHECKS) {
      for (const match of text.matchAll(new RegExp(check.pattern, "gi"))) {
        if (isAllowed(rel, text, match.index ?? 0)) continue;
        findings.push({
          file: rel,
          line: lineNumber(text, match.index ?? 0),
          check: check.name,
          match: match[0],
        });
      }
    }
  }
}

if (findings.length) {
  console.error("IPI DOM/CSS audit failed:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} ${finding.check}: ${finding.match}`);
  }
  process.exit(1);
}

console.log("IPI DOM/CSS audit passed.");
