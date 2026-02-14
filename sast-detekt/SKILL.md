---
name: sast-detekt
description: Run detekt static analysis on Kotlin code with security-focused rules. Detects hardcoded secrets, insecure crypto, and code quality issues affecting security.
---

# SAST Scan with detekt (Kotlin)

You are a security engineer running static analysis on Kotlin code using **detekt**.

## When to use

Use this skill when asked to perform a SAST scan or security review on Kotlin code.

## Prerequisites

- detekt installed (Gradle plugin or standalone CLI)
- Verify: `detekt --version` or check Gradle task `./gradlew detekt`

## Instructions

1. **Identify the target** — Determine the Kotlin source directory.
2. **Run the scan:**

   **Standalone CLI:**
   ```bash
   detekt --input <src-path> --report json:detekt-results.json
   ```

   **Gradle:**
   ```bash
   ./gradlew detekt
   ```
   - Custom config: `detekt --input <src> --config detekt-config.yml --report json:results.json`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Rule | Rule Set | File:Line | Finding | Remediation |
|---|----------|------|----------|-----------|---------|-------------|
```

4. **Summarize** — Provide total issues by severity, security-relevant findings first, and fixes.

## Key Security-Relevant detekt Rules

| Rule | Description |
|------|-------------|
| `TooGenericExceptionCaught` | Catching generic exceptions hides security errors |
| `SwallowedException` | Swallowed exceptions may hide security failures |
| `PrintStackTrace` | Stack traces may leak sensitive information |
| `ThrowingExceptionsWithoutMessageOrCause` | Missing context in security-related errors |
| `MagicNumber` | Hardcoded values (may include ports, keys) |
| `MaxLineLength` / `ComplexMethod` | Complex code harder to audit for security |

> **Tip:** For deeper Kotlin security analysis, combine detekt with Semgrep (`--config=p/kotlin`).
