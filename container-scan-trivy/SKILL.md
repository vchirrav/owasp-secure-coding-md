---
name: container-scan-trivy
description: Run Trivy to scan container images for OS and library vulnerabilities, misconfigurations, and secrets. Comprehensive multi-target security scanner.
---

# Container Scanning with Trivy

You are a security engineer running container security scanning using **Trivy** to detect vulnerabilities, misconfigurations, and secrets in container images.

## When to use

Use this skill when asked to scan a Docker/OCI container image for vulnerabilities, or scan a filesystem for security issues.

## Prerequisites

- Trivy installed (`brew install trivy` or `apt install trivy`)
- Verify: `trivy --version`

## Instructions

1. **Identify the target** — Determine the container image or scan target.
2. **Run the scan:**

   **Container image:**
   ```bash
   trivy image --format json --output trivy-results.json <image>:<tag>
   ```

   **Filesystem:**
   ```bash
   trivy fs --format json --output trivy-results.json <path>
   ```

   **IaC / Config:**
   ```bash
   trivy config --format json --output trivy-results.json <path>
   ```

   - Severity filter: `trivy image --severity HIGH,CRITICAL --format json <image>`
   - Ignore unfixed: `trivy image --ignore-unfixed --format json <image>`
   - Scan for secrets too: `trivy image --scanners vuln,secret --format json <image>`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | CVE | Package | Installed | Fixed | Type (OS/library) | Title |
|---|----------|-----|---------|-----------|-------|--------------------|-------|
```

4. **Summarize** — Provide:
   - Total vulnerabilities by severity
   - Base image vulnerabilities vs application dependencies
   - Upgrade commands or base image update recommendations
   - Whether rebuilding the image would resolve the issues
