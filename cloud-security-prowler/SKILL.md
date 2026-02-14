---
name: cloud-security-prowler
description: Run Prowler for comprehensive cloud security posture assessment. Audits AWS, Azure, and GCP against CIS Benchmarks, PCI-DSS, HIPAA, GDPR, and other compliance frameworks.
---

# Cloud Security Posture with Prowler

You are a security engineer running cloud security posture assessment using **Prowler** across AWS, Azure, and GCP.

## When to use

Use this skill when asked to audit cloud infrastructure security, check CIS Benchmark compliance, or assess cloud security posture.

## Prerequisites

- Prowler installed (`pip install prowler` or `brew install prowler`)
- Cloud credentials configured (AWS CLI, Azure CLI, or gcloud)
- Verify: `prowler --version`

## Instructions

1. **Identify the target** — Determine the cloud provider and scope.
2. **Run the scan:**

   **AWS:**
   ```bash
   prowler aws --output-formats json --output-directory ./prowler-results
   ```

   **Azure:**
   ```bash
   prowler azure --output-formats json --output-directory ./prowler-results
   ```

   **GCP:**
   ```bash
   prowler gcp --output-formats json --output-directory ./prowler-results
   ```

   - Specific compliance: `prowler aws --compliance cis_2.0_aws --output-formats json`
   - Specific services: `prowler aws --services s3 iam ec2 --output-formats json`
   - Specific checks: `prowler aws --checks check11,check12 --output-formats json`
   - Severity filter: `prowler aws --severity critical high --output-formats json`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Severity | Status | Service | Check | Resource | Region | Finding | Remediation |
|---|----------|--------|---------|-------|----------|--------|---------|-------------|
```

4. **Summarize** — Provide:
   - Total checks: pass/fail/manual by service
   - Compliance score per framework
   - Critical findings requiring immediate action
   - AWS/Azure/GCP console steps for remediation

## Supported Compliance Frameworks

| Framework | AWS | Azure | GCP |
|-----------|-----|-------|-----|
| CIS Benchmark | ✅ | ✅ | ✅ |
| PCI-DSS | ✅ | ✅ | — |
| HIPAA | ✅ | ✅ | — |
| GDPR | ✅ | ✅ | — |
| SOC2 | ✅ | — | — |
| NIST 800-53 | ✅ | — | — |
| AWS Well-Architected | ✅ | — | — |
