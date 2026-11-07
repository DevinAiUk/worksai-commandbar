# WorksAi CommandBar (`worksai-commandbar`)

> Cross-platform keystroke launcher and extensible plugin runner for Windows, macOS, Linux, and the browser.

- **Live Subdomain Application:** [https://commandbar.worksai.org](https://commandbar.worksai.org)
- **WorksAI Hub Specification:** [https://worksai.org/apps/worksai-commandbar](https://worksai.org/apps/worksai-commandbar)
- **Category:** C. Plugins or extensions
- **License:** MIT (Derived from [Ueli](https://github.com/oliverschwendener/ueli) @ `9b54c3d`)

## Capability Matrix
- **What You Can Do:** Download and run the executable Node CLI launcher (bin/worksai-commandbar.mjs) or use the companion web verifier for safe arithmetic calculation, fuzzy command ranking, and MCP tool dispatch.
- **Deterministic Domain Utilities:** executeCommandBarQuery (eval-free arithmetic tokenizer/evaluator and prefix/substring command ranker).
- **Genuine AI Model Features:** Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) natural-language intent-to-command routing when no exact fuzzy match exists.
- **Persisted R2/Neon Features:** Command execution history and custom launcher shortcuts persisted in Cloudflare R2 (workspaces/worksai-commandbar/*).
- **Known Limitations:** Global OS hotkey registration requires running the downloadable CLI/desktop wrapper locally.

## Verification & Local Testing
```bash
npm run lint
npm run typecheck
npm test
```
