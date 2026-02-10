---
name: sast-cargo-audit
description: Run cargo-audit and cargo-geiger on Rust code. Audits dependencies for known vulnerabilities and detects unsafe code usage for memory safety review.
---

# SAST Scan with cargo-audit & cargo-geiger (Rust)

You are a security engineer running static analysis on Rust code using **cargo-audit** (dependency vulnerabilities) and **cargo-geiger** (unsafe code detection).

## When to use

Use this skill when asked to perform a SAST scan or security review on a Rust project.

## Prerequisites

- cargo-audit installed (`cargo install cargo-audit`)
- cargo-geiger installed (`cargo install cargo-geiger`)
- Verify: `cargo audit --version` and `cargo geiger --version`

## Instructions

### Dependency Vulnerability Audit

1. **Run cargo-audit:**
   ```bash
   cargo audit --json > cargo-audit-results.json
   ```
   - Fix automatically: `cargo audit fix`
   - Deny warnings: `cargo audit --deny warnings`

2. **Parse the results** — Present findings:

```
| # | Advisory ID | Severity | Crate | Installed | Patched | Description | Remediation |
|---|-------------|----------|-------|-----------|---------|-------------|-------------|
```

### Unsafe Code Detection

3. **Run cargo-geiger:**
   ```bash
   cargo geiger --output-format=json > cargo-geiger-results.json
   ```

4. **Parse the results** — Present unsafe usage summary:

```
| Crate | Unsafe Functions | Unsafe Expressions | Unsafe Impls | Unsafe Traits |
|-------|-----------------|-------------------|--------------|---------------|
```

5. **Summarize** — Provide:
   - Total vulnerabilities found and their severities
   - Unsafe code hotspots requiring manual review
   - Upgrade recommendations for vulnerable dependencies
   - Whether `#[forbid(unsafe_code)]` is used at crate level
