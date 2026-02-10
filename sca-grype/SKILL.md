---
name: sca-grype
description: Run Anchore Grype for SCA vulnerability scanning on filesystems and container images. Matches dependencies against multiple vulnerability databases (NVD, GitHub, OS advisories).
---

# SCA Scan with Grype

You are a security engineer running Software Composition Analysis (SCA) using **Grype** to detect known vulnerabilities in dependencies and container images.

## When to use

Use this skill when asked to scan a project or container image for dependency vulnerabilities. Grype supports both filesystem and container image scanning.

## Prerequisites

- Grype installed (`curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin`)
- Verify: `grype version`

## Instructions

1. **Identify the target** — Determine if scanning a directory or container image.
2. **Run the scan:**

   **Filesystem:**
   ```bash
   grype dir:<target-path> -o json > grype-results.json
   ```

   **Container image:**
   ```bash
   grype <image-name>:<tag> -o json > grype-results.json
   ```

   - Filter by severity: `grype dir:. --fail-on high -o json`
   - Specific SBOM: `grype sbom:sbom.json -o json`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | CVE | Package | Installed | Fixed | Type | Description |
|---|----------|-----|---------|-----------|-------|------|-------------|
```

4. **Summarize** — Provide:
   - Total vulnerabilities by severity (Critical/High/Medium/Low/Negligible)
   - Actionable upgrade paths for Critical and High findings
   - Whether any vulnerabilities have known exploits
