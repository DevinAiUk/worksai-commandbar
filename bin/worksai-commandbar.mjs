#!/usr/bin/env node
/**
 * WorksAi CommandBar — Cross-Platform CLI & Desktop Launcher (bin/worksai-commandbar.mjs)
 * License: MIT
 */

export function evaluateLauncherQuery(query, commands = []) {
  const q = String(query ?? "").trim();
  if (!q) return { mode: "empty", results: [] };
  if (/^[0-9+\-*/().\s]+$/.test(q) && /[0-9]/.test(q)) {
    const tokens = q.match(/(\d+(?:\.\d+)?|[+\-*/()])/g) || [];
    let acc = 0;
    let op = "+";
    for (const t of tokens) {
      if (["+", "-", "*", "/"].includes(t)) op = t;
      else if (!isNaN(Number(t))) {
        const val = Number(t);
        if (op === "+") acc += val;
        if (op === "-") acc -= val;
        if (op === "*") acc *= val;
        if (op === "/") acc = val !== 0 ? acc / val : NaN;
      }
    }
    return { mode: "calculator", expression: q, value: Number(acc.toFixed(4)) };
  }
  const defaultCmds = commands.length ? commands : [
    { id: "cmd-1", title: "Deploy Cloudflare Worker", category: "DevOps", action: "wrangler deploy" },
    { id: "cmd-2", title: "Search WorksAI Data Lake", category: "Data Lake", action: "https://worksai.org/data-lake" },
    { id: "cmd-3", title: "Audit OpenAPI Contract Drift", category: "API", action: "https://apisync.worksai.org" }
  ];
  const lower = q.toLowerCase();
  const ranked = defaultCmds
    .map((cmd) => {
      const title = String(cmd.title || "").toLowerCase();
      const score = title === lower ? 100 : title.startsWith(lower) ? 80 : title.includes(lower) ? 50 : 0;
      return { ...cmd, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);
  return { mode: "search", results: ranked };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv.slice(2).join(" ") || "128 * 4 + 256";
  console.log(JSON.stringify(evaluateLauncherQuery(arg)));
}
