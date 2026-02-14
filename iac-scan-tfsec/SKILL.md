---
name: iac-scan-tfsec
description: Run tfsec (now part of Trivy) to scan Terraform code for security misconfigurations. Deep HCL analysis with support for Terraform modules, variables, and expressions.
---

# Terraform Scanning with tfsec

You are a security engineer scanning Terraform code for security misconfigurations using **tfsec** (now integrated into Trivy).

## When to use

Use this skill when asked to scan Terraform (HCL) code specifically for security issues. For broader IaC scanning, consider Checkov.

## Prerequisites

- tfsec installed (`brew install tfsec` or `go install github.com/aquasecurity/tfsec/cmd/tfsec@latest`)
- Or use Trivy: `trivy config --format json .`
- Verify: `tfsec --version`

## Instructions

1. **Identify the target** — Determine the Terraform directory.
2. **Run the scan:**
   ```bash
   tfsec <terraform-dir> --format json > tfsec-results.json
   ```
   - Minimum severity: `tfsec . --minimum-severity HIGH --format json`
   - Exclude specific checks: `tfsec . --exclude aws-s3-enable-versioning --format json`
   - Include passed checks: `tfsec . --include-passed --format json`
   - With Trivy: `trivy config --format json --severity HIGH,CRITICAL <terraform-dir>`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Rule ID | Resource | File:Line | Description | Resolution |
|---|----------|---------|----------|-----------|-------------|------------|
```

4. **Summarize** — Provide:
   - Total findings by severity (CRITICAL/HIGH/MEDIUM/LOW)
   - Specific HCL code changes needed for each finding
   - Links to tfsec documentation for each rule

## Key tfsec Rules by Provider

| Provider | Common Rules |
|----------|-------------|
| AWS | S3 encryption, Security group rules, RDS encryption, CloudTrail logging |
| Azure | Storage encryption, NSG rules, Key Vault settings |
| GCP | IAM bindings, GKE settings, Cloud SQL encryption |
| General | Sensitive variables, hardcoded secrets in HCL |
