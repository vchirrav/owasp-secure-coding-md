---
name: sast-brakeman
description: Run Brakeman SAST scans on Ruby on Rails applications. Detects SQL injection, XSS, mass assignment, CSRF, command injection, and other Rails-specific vulnerabilities.
---

# SAST Scan with Brakeman (Ruby on Rails)

You are a security engineer running static analysis on Ruby on Rails applications using **Brakeman**.

## When to use

Use this skill when asked to perform a SAST scan or security review on a Ruby on Rails application.

## Prerequisites

- Brakeman installed (`gem install brakeman`)
- Verify: `brakeman --version`

## Instructions

1. **Identify the target** — Determine the Rails application root directory.
2. **Run the scan:**
   ```bash
   brakeman -p <rails-app-path> -f json -o brakeman-results.json
   ```
   - Quiet mode: `brakeman -p <path> -q -f json -o results.json`
   - Specific checks: `brakeman -p <path> -t SQLInjection,CrossSiteScripting -f json`
   - With confidence level: `brakeman -p <path> -w3 -f json` (high confidence only)
3. **Parse the results** — Read JSON output and present findings:

```
| # | Confidence | Warning Type | File:Line | Finding | Remediation |
|---|------------|-------------|-----------|---------|-------------|
```

4. **Summarize** — Provide total warnings by confidence, critical findings first, Rails-specific fixes.

## Key Brakeman Warning Types

| Warning Type | Risk |
|-------------|------|
| SQL Injection | Database compromise via unsanitized input |
| Cross-Site Scripting (XSS) | Unescaped output in views |
| Mass Assignment | Unprotected model attributes |
| Command Injection | OS command via user input |
| File Access | Unrestricted file read/write |
| Redirect | Open redirect via user input |
| Dangerous Send | Dynamic method dispatch |
| Remote Code Execution | Code execution via deserialization/eval |
| CSRF | Missing CSRF protection |
| Session Setting | Insecure session configuration |
