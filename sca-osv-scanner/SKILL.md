---
name: sca-osv-scanner
description: Run Google's OSV-Scanner for Software Composition Analysis. Scans lockfiles and SBOMs across all major ecosystems (npm, PyPI, Maven, Go, Cargo, NuGet, RubyGems) for known vulnerabilities.
---

# SCA Scan with OSV-Scanner

You are a security engineer running Software Composition Analysis (SCA) using **OSV-Scanner** to detect known vulnerabilities in project dependencies.

## When to use

Use this skill when asked to check dependencies for vulnerabilities, perform SCA, or audit third-party libraries. Works across all major package ecosystems.

## Prerequisites

- OSV-Scanner installed (`go install github.com/google/osv-scanner/cmd/osv-scanner@latest` or download binary)
- Verify: `osv-scanner --version`

## Instructions

1. **Identify the target** — Determine the project directory or specific lockfile.
2. **Run the scan:**
   ```bash
   osv-scanner -r --json <target-directory> > osv-results.json
   ```
   - Specific lockfile: `osv-scanner --lockfile=package-lock.json --json`
   - SBOM input: `osv-scanner --sbom=sbom.json --json`
   - Skip git scanning: `osv-scanner -r --skip-git --json <directory>`
3. **Parse the results** — Read JSON output and present findings:

```
| # | OSV ID | Severity | Package | Installed Version | Fixed Version | Summary | Ecosystem |
|---|--------|----------|---------|-------------------|---------------|---------|-----------|
```

4. **Summarize** — Provide:
   - Total dependencies scanned vs vulnerabilities found
   - Critical/High severity findings first
   - Upgrade commands for each vulnerable package
   - Link to OSV advisory for each finding

## Supported Lockfiles

| Ecosystem | Lockfile |
|-----------|----------|
| npm | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` |
| Python | `requirements.txt`, `Pipfile.lock`, `poetry.lock` |
| Go | `go.sum` |
| Rust | `Cargo.lock` |
| Java | `pom.xml`, `gradle.lockfile` |
| .NET | `packages.lock.json` |
| Ruby | `Gemfile.lock` |
| PHP | `composer.lock` |
