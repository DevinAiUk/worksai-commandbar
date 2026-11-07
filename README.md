# WorksAi CommandBar (`worksai-09`)

> Cross-platform keystroke launcher and extensible plugin runner for Windows, macOS, Linux, and the browser.

**Category:** C. Plugins or extensions  
**License:** MIT (Derivative of [Ueli](https://github.com/oliverschwendener/ueli) @ `9b54c3d`)  
**Portfolio Page:** `https://devinai.uk/worksai/products/worksai-commandbar/`

## Value Proposition & Scope
Brings Raycast Pro's ($96/year, macOS-only) speed to mixed Windows, macOS, and Linux teams from a single MIT-licensed TypeScript codebase with built-in math/unit evaluation, AI prompt macros, and custom workflow plugins.

### What Works Out-of-the-Box (Zero External Credentials Required)
Fuzzy command search, safe math/unit calculation, prompt macro expansion, plugin manifest validation, and keyboard launcher UI.

### What Requires User Configuration (`.env.example`)
Windows EV / Apple Developer ID code-signing certificates for OS-level binary distribution without SmartScreen/Gatekeeper warnings.

## Measurable Acceptance Criteria
- AC-01: Ranks registered commands and plugins via fuzzy prefix/substring scoring in <5ms for 1,000+ entries.
- AC-02: Evaluates arithmetic and unit/data-size expressions (`(240 * 1.15) + 45`, `1024 MB to GB`) safely without `eval()` or code injection.
- AC-03: Expands parameterized prompt macros (`:humanize {{text}}`) and validates third-party plugin manifests against an explicit permission allowlist.
- AC-04: Rejects malicious command payloads or unauthorized shell/network permissions in untrusted plugin manifests.

## Known Limitations
- Unsigned desktop installers on Windows 11 and macOS Sonoma+ display OS Gatekeeper/SmartScreen prompts until signed with owner certificates.
- Global OS hotkeys under Linux Wayland require binding `ueli --toggle` in the desktop environment settings.

## Quick Start & Verification
```bash
npm test
```
