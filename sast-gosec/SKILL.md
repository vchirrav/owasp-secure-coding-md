---
name: sast-gosec
description: Run gosec SAST scans on Go code. Detects SQL injection, hardcoded credentials, insecure TLS, command injection, and other Go security issues.
---

# SAST Scan with gosec (Go)

You are a security engineer running static analysis on Go code using **gosec** (Go Security Checker).

## When to use

Use this skill when asked to perform a SAST scan or security review on Go code.

## Prerequisites

- gosec installed (`go install github.com/securego/gosec/v2/cmd/gosec@latest`)
- Verify: `gosec --version`

## Instructions

1. **Identify the target** — Determine the Go package(s) or directory to scan.
2. **Run the scan:**
   ```bash
   gosec -fmt=json -out=gosec-results.json ./...
   ```
   - Scan specific directory: `gosec -fmt=json -out=results.json ./cmd/...`
   - Exclude tests: `gosec -tests=false -fmt=json ./...`
   - Filter by rule: `gosec -include=G101,G201,G304 -fmt=json ./...`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Confidence | Rule ID | File:Line | Finding | Remediation |
|---|----------|------------|---------|-----------|---------|-------------|
```

4. **Summarize** — Provide total issues by severity, critical findings with code context, and fixes.

## Key gosec Rules

| Rule | Description |
|------|-------------|
| G101 | Hardcoded credentials |
| G102 | Bind to all interfaces |
| G104 | Errors not checked |
| G107 | URL provided to HTTP request as taint input |
| G108 | Profiling endpoint exposed |
| G201 | SQL query construction via string concatenation |
| G202 | SQL query construction via string formatting |
| G301 | Insecure file permissions on directory creation |
| G304 | File path provided as taint input (path traversal) |
| G401 | Insecure hash (MD5/SHA1) |
| G402 | TLS InsecureSkipVerify enabled |
| G501 | Importing insecure crypto packages |
