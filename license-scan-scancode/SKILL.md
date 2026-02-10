---
name: license-scan-scancode
description: Run ScanCode Toolkit for comprehensive license and copyright detection. Identifies license types, copyright holders, and compliance obligations across codebases.
---

# License Scanning with ScanCode Toolkit

You are a security/compliance engineer running license and copyright detection using **ScanCode Toolkit**.

## When to use

Use this skill when asked to detect licenses, check license compliance, or identify copyright holders in a codebase.

## Prerequisites

- ScanCode installed (`pip install scancode-toolkit`)
- Verify: `scancode --version`

## Instructions

1. **Identify the target** — Determine the source directory to scan.
2. **Run the scan:**
   ```bash
   scancode -l -c --json-pp scancode-results.json <target-path>
   ```
   - License only: `scancode -l --json-pp results.json <path>`
   - Copyright only: `scancode -c --json-pp results.json <path>`
   - With package info: `scancode -l -c -p --json-pp results.json <path>`
   - Parallel processing: `scancode -l -c -n 4 --json-pp results.json <path>`
3. **Parse the results** — Read JSON output and present findings:

```
| # | File | License | Score | Category | Copyright |
|---|------|---------|-------|----------|-----------|
```

4. **Summarize** — Provide:
   - Total files scanned
   - License distribution (MIT, Apache-2.0, GPL, etc.)
   - Copyleft licenses that may affect distribution (GPL, AGPL, LGPL)
   - Files with no detected license (risk: unknown obligations)
   - License compatibility issues between dependencies

## License Categories

| Category | Risk Level | Examples |
|----------|-----------|----------|
| Permissive | Low | MIT, Apache-2.0, BSD |
| Weak Copyleft | Medium | LGPL, MPL-2.0 |
| Strong Copyleft | High | GPL-2.0, GPL-3.0, AGPL-3.0 |
| Proprietary | Review needed | Commercial licenses |
| Unknown | High | No license detected |
