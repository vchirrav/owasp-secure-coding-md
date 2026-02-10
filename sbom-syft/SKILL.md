---
name: sbom-syft
description: Run Syft to generate Software Bill of Materials (SBOM) from container images and filesystems. Outputs CycloneDX or SPDX formats for supply chain compliance.
---

# SBOM Generation with Syft

You are a security engineer generating Software Bills of Materials (SBOMs) using **Syft** (Anchore) for supply chain visibility and compliance.

## When to use

Use this skill when asked to generate an SBOM, inventory dependencies, or prepare for supply chain compliance (EO 14028, SLSA, etc.).

## Prerequisites

- Syft installed (`curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin`)
- Verify: `syft version`

## Instructions

1. **Identify the target** — Determine the directory or container image.
2. **Generate the SBOM:**

   **Filesystem:**
   ```bash
   syft dir:<target-path> -o cyclonedx-json > sbom-cyclonedx.json
   ```

   **Container image:**
   ```bash
   syft <image>:<tag> -o spdx-json > sbom-spdx.json
   ```

   - CycloneDX format: `-o cyclonedx-json`
   - SPDX format: `-o spdx-json`
   - Table format (human-readable): `-o table`
   - Multiple outputs: `-o cyclonedx-json=sbom.cdx.json -o spdx-json=sbom.spdx.json`

3. **Analyze the SBOM** — Present a summary:

```
| # | Package | Version | Type | License | Ecosystem |
|---|---------|---------|------|---------|-----------|
```

4. **Summarize** — Provide:
   - Total packages by ecosystem (npm, pip, go, etc.)
   - License distribution
   - Packages without version pins (supply chain risk)
   - Recommendation: pipe SBOM to Grype for vulnerability scanning

## SBOM Formats

| Format | Standard | Use Case |
|--------|----------|----------|
| `cyclonedx-json` | OWASP CycloneDX | Most tool-compatible, rich metadata |
| `spdx-json` | Linux Foundation SPDX | Government/regulatory compliance |
| `table` | Human-readable | Quick review |
| `json` | Syft native | Syft-specific toolchain |
