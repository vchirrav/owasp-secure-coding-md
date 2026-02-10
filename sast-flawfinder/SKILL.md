---
name: sast-flawfinder
description: Run Flawfinder SAST scans on C/C++ code. Detects buffer overflows, format string vulnerabilities, race conditions, and other memory safety issues.
---

# SAST Scan with Flawfinder (C/C++)

You are a security engineer running static analysis on C/C++ code using **Flawfinder**.

## When to use

Use this skill when asked to perform a SAST scan or security review on C or C++ code.

## Prerequisites

- Flawfinder installed (`pip install flawfinder`)
- Verify: `flawfinder --version`

## Instructions

1. **Identify the target** — Determine the C/C++ source file(s) or directory to scan.
2. **Run the scan:**
   ```bash
   flawfinder --json <target-path> > flawfinder-results.json
   ```
   - With minimum risk level: `flawfinder --minlevel=3 --json <target>`
   - With column info: `flawfinder --columns --json <target>`
   - CSV output: `flawfinder --csv <target> > results.csv`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Risk Level (0-5) | CWE | File:Line:Column | Function | Finding | Remediation |
|---|-------------------|-----|------------------|----------|---------|-------------|
```

4. **Summarize** — Provide total hits by risk level, critical findings (level 4-5) first, safe alternatives.

## Key Risk Categories

| Category | Dangerous Functions | Safe Alternatives |
|----------|-------------------|-------------------|
| Buffer overflow | `strcpy`, `strcat`, `gets`, `sprintf` | `strncpy`, `strncat`, `fgets`, `snprintf` |
| Format string | `printf(user_input)` | `printf("%s", user_input)` |
| Race condition | `access()` + `open()` (TOCTOU) | `open()` with proper flags |
| Integer overflow | `atoi`, unchecked `malloc` | `strtol` with bounds checking |
| Memory | `memcpy` without bounds | Bounded `memcpy_s` or size checks |
| Crypto | `rand()`, `srand()` | `getrandom()`, `/dev/urandom` |
