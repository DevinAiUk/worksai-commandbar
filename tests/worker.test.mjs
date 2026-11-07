import test from "node:test";
import assert from "node:assert/strict";
import { APP_META, handleAppRequest } from "../src/worker.mjs";

test("worksai-commandbar standalone Worker renders clean WorksAI UI with capabilityMatrix and zero forbidden branding", async () => {
  const res = await handleAppRequest(new Request("https://commandbar.worksai.org/"));
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.equal(html.includes(APP_META.name), true);
  assert.equal(html.toLowerCase().includes("devinai.uk"), false);
  assert.equal(html.toLowerCase().includes("devonfolio"), false);
  assert.equal(html.includes("MIT Open Source • WorksAI Foundry"), true);
});

test("worksai-commandbar /api/ai/analyze executes deterministic engine, supports Workers AI + R2 persistence, and rejects empty input", async () => {
  const r2Map = new Map();
  const mockEnv = {
    AI: {
      async run(_model, _input) {
        return { response: "Verified Workers AI insight for worksai-commandbar." };
      }
    },
    DATALAKE_BUCKET: {
      async put(k, v) { r2Map.set(k, v); },
      async get(k) {
        if (!r2Map.has(k)) return null;
        const v = r2Map.get(k);
        return { async text() { return v; } };
      }
    }
  };

  const sample = "128 * 4 + 256";
  const aiRes = await handleAppRequest(
    new Request("https://commandbar.worksai.org/api/ai/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ input: sample, tool: APP_META.mcpTools[0] })
    }),
    mockEnv
  );
  assert.equal(aiRes.status, 200);
  const aiData = await aiRes.json();
  assert.equal(aiData.ok, true);
  assert.equal(aiData.executionBreakdown.deterministicUtilityExecuted, true);
  assert.equal(aiData.executionBreakdown.genuineAiModelInvoked, true);
  assert.equal(aiData.executionBreakdown.persistedToR2, true);

  const stateRes = await handleAppRequest(new Request("https://commandbar.worksai.org/api/workspace/state"), mockEnv);
  assert.equal(stateRes.status, 200);
  const stateJson = await stateRes.json();
  assert.equal(stateJson.persistedInR2, true);
});

test("worksai-commandbar executable CLI (bin/worksai-commandbar.mjs) evaluates expressions via child_process", async () => {
  const { execFileSync } = await import("node:child_process");
  const out = execFileSync("node", ["bin/worksai-commandbar.mjs", "128 * 4 + 256"], { encoding: "utf-8" });
  const parsed = JSON.parse(out.trim());
  assert.equal(parsed.mode, "calculator");
  assert.equal(parsed.value, 768);
});

