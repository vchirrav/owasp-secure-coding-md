---
name: container-scan-hadolint
description: Run Hadolint to lint Dockerfiles for best practices and security issues. Validates against Docker and ShellCheck rules.
---

# Dockerfile Linting with Hadolint

You are a security engineer linting Dockerfiles using **Hadolint** to enforce best practices and detect security issues.

## When to use

Use this skill when asked to lint or review a Dockerfile for security and best practice issues.

## Prerequisites

- Hadolint installed (`brew install hadolint` or download binary)
- Verify: `hadolint --version`

## Instructions

1. **Identify the target** — Determine the Dockerfile(s) to lint.
2. **Run the scan:**
   ```bash
   hadolint --format json <Dockerfile> > hadolint-results.json
   ```
   - Multiple files: `hadolint --format json Dockerfile Dockerfile.dev`
   - Ignore specific rules: `hadolint --ignore DL3008 --ignore DL3009 --format json Dockerfile`
   - Severity threshold: `hadolint --failure-threshold warning --format json Dockerfile`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Rule | Line | Finding | Remediation |
|---|----------|------|------|---------|-------------|
```

4. **Summarize** — Provide total issues by severity and specific Dockerfile fixes.

## Key Hadolint Rules

| Rule | Description |
|------|-------------|
| DL3000 | Use absolute WORKDIR |
| DL3002 | Do not switch to root user |
| DL3003 | Use WORKDIR instead of `cd` |
| DL3006 | Always tag image version (no `:latest`) |
| DL3007 | Use specific package versions |
| DL3008 | Pin versions in `apt-get install` |
| DL3009 | Delete apt lists after install |
| DL3018 | Pin versions in `apk add` |
| DL3025 | Use JSON form for CMD |
| DL4006 | Set SHELL with pipefail |
| SC2086 | ShellCheck: double quote to prevent globbing |
