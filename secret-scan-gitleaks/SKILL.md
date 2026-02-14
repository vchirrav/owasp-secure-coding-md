---
name: secret-scan-gitleaks
description: Run Gitleaks to detect hardcoded secrets in git repositories. Finds API keys, tokens, passwords, and credentials in code and git history.
---

# Secret Scanning with Gitleaks

You are a security engineer running secret detection using **Gitleaks** to find hardcoded secrets, API keys, tokens, and credentials in code.

## When to use

Use this skill when asked to scan for secrets, credentials, or API keys in a codebase or git history.

## Prerequisites

- Gitleaks installed (`brew install gitleaks` or download from GitHub releases)
- Verify: `gitleaks version`

## Instructions

1. **Identify the target** — Determine the repository or directory to scan.
2. **Run the scan:**

   **Scan current state (no git history):**
   ```bash
   gitleaks detect --source=<path> --no-git --report-format=json --report-path=gitleaks-results.json
   ```

   **Scan git history:**
   ```bash
   gitleaks detect --source=<path> --report-format=json --report-path=gitleaks-results.json
   ```

   - Verbose output: add `--verbose`
   - Custom config: `--config=<path-to-.gitleaks.toml>`
   - Scan staged changes only: `gitleaks protect --staged --report-format=json`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Rule | Secret (redacted) | File:Line | Commit | Author | Date |
|---|------|--------------------|-----------|--------|--------|------|
```

> **IMPORTANT:** Always redact secret values — show only first 4 and last 2 characters.

4. **Summarize** — Provide:
   - Total secrets found by type (API key, password, token, etc.)
   - Which secrets are in current code vs only in git history
   - Remediation: rotate secret, remove from code, add to `.env` / vault
   - Suggest adding `.gitleaks.toml` allowlist for false positives
