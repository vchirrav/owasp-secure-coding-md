---
name: sca-npm-audit
description: Run npm audit for Node.js dependency vulnerability scanning. Built-in SCA for npm projects with automatic fix suggestions.
---

# SCA Scan with npm audit (Node.js)

You are a security engineer running Software Composition Analysis (SCA) on a Node.js project using the built-in **npm audit**.

## When to use

Use this skill when asked to check Node.js dependencies for vulnerabilities.

## Prerequisites

- Node.js / npm installed
- Project has a `package-lock.json` or `npm-shrinkwrap.json`
- Verify: `npm --version`

## Instructions

1. **Identify the target** — Determine the Node.js project directory.
2. **Run the scan:**
   ```bash
   cd <project-path> && npm audit --json > npm-audit-results.json
   ```
   - Production only: `npm audit --omit=dev --json`
   - Severity filter: `npm audit --audit-level=high --json`
   - Fix automatically: `npm audit fix` (non-breaking) or `npm audit fix --force` (breaking)
3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Package | Vulnerable Range | Patched In | Via | Advisory URL |
|---|----------|---------|-----------------|------------|-----|-------------|
```

4. **Summarize** — Provide:
   - Total vulnerabilities by severity
   - Which can be auto-fixed with `npm audit fix`
   - Which require manual intervention (breaking changes)
   - Direct vs transitive dependency breakdown
