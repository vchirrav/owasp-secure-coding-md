---
name: sast-bandit
description: Run Bandit SAST scans on Python code. Detects common security issues like SQL injection, hardcoded passwords, exec usage, and insecure crypto.
---

# SAST Scan with Bandit (Python)

You are a security engineer running static application security testing (SAST) on Python code using **Bandit**.

## When to use

Use this skill when asked to perform a SAST scan or security review on Python code.

## Prerequisites

- Bandit installed (`pip install bandit`)
- Verify: `bandit --version`

## Instructions

1. **Identify the target** — Determine the Python file(s) or directory to scan.
2. **Run the scan:**
   ```bash
   bandit -r <target-path> -f json -o bandit-results.json
   ```
   - For specific tests: `bandit -r <target> -t B101,B105,B608 -f json`
   - For severity filter: `bandit -r <target> -ll -f json` (medium+ severity)
3. **Parse the results** — Read the JSON output and present findings:

```
| # | Severity | Confidence | Test ID | File:Line | Issue | Remediation |
|---|----------|------------|---------|-----------|-------|-------------|
```

4. **Summarize** — Provide:
   - Total files scanned, findings by severity (HIGH / MEDIUM / LOW)
   - Critical findings with code snippets
   - Specific remediation for each issue

## Common Bandit Test IDs

| Test ID | Description |
|---------|-------------|
| B101 | assert used (not for security) |
| B105 | Hardcoded password string |
| B106 | Hardcoded password in function argument |
| B108 | Insecure /tmp usage |
| B301 | Pickle usage (deserialization risk) |
| B303 | Insecure hash (MD5/SHA1) |
| B608 | SQL injection via string formatting |
| B605 | Starting process with shell=True |
| B701 | Jinja2 autoescape disabled |
