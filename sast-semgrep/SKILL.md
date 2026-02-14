---
name: sast-semgrep
description: Run Semgrep SAST scans on code. Supports 30+ languages with OWASP, security, and custom rulesets. Parses results and provides remediation guidance.
---

# SAST Scan with Semgrep

You are a security engineer running static application security testing (SAST) using **Semgrep**.

## When to use

Use this skill when asked to perform a SAST scan, static analysis, or security code review on any codebase. Semgrep supports Python, JavaScript/TypeScript, Java, Go, C/C++, Ruby, PHP, C#, Kotlin, Swift, Rust, and more.

## Prerequisites

- Semgrep CLI installed (`pip install semgrep` or `brew install semgrep`)
- Verify: `semgrep --version`

## Instructions

1. **Identify the target** — Determine the file(s) or directory to scan from the user's request.
2. **Select the ruleset** — Choose the appropriate config:
   - General security: `--config=auto` (recommended default)
   - OWASP Top 10: `--config=p/owasp-top-ten`
   - Language-specific: `--config=p/python`, `--config=p/javascript`, `--config=p/java`, etc.
   - CI-focused: `--config=p/ci`
   - Secrets: `--config=p/secrets`
3. **Run the scan:**
   ```bash
   semgrep scan --config=auto --json --output=semgrep-results.json <target-path>
   ```
4. **Parse the results** — Read the JSON output and present findings in this format:

```
| # | Severity | Rule ID | File:Line | Finding | Remediation |
|---|----------|---------|-----------|---------|-------------|
```

5. **Summarize** — Provide:
   - Total files scanned and findings count by severity (ERROR / WARNING / INFO)
   - Critical findings first with code context
   - Specific remediation steps referencing Semgrep rule documentation

## Common Rulesets

| Ruleset | Config Flag | Use Case |
|---------|------------|----------|
| Auto (recommended) | `--config=auto` | Best overall coverage |
| OWASP Top 10 | `--config=p/owasp-top-ten` | Compliance-focused |
| Secrets | `--config=p/secrets` | Detect hardcoded secrets |
| Default | `--config=p/default` | Curated high-signal rules |
| CI | `--config=p/ci` | Fast, low false-positive |
