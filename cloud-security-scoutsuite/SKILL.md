---
name: cloud-security-scoutsuite
description: Run ScoutSuite for multi-cloud security auditing. Collects configuration data from AWS, Azure, GCP, Oracle, and Alibaba Cloud and generates an interactive security report.
---

# Cloud Security Audit with ScoutSuite

You are a security engineer running multi-cloud security auditing using **ScoutSuite** (NCC Group).

## When to use

Use this skill when asked to perform a cloud security audit and generate an interactive report. ScoutSuite supports AWS, Azure, GCP, Oracle Cloud, and Alibaba Cloud.

## Prerequisites

- ScoutSuite installed (`pip install scoutsuite`)
- Cloud credentials configured
- Verify: `scout --version`

## Instructions

1. **Identify the target** — Determine the cloud provider.
2. **Run the scan:**

   **AWS:**
   ```bash
   scout aws --report-format json --report-dir ./scoutsuite-results
   ```

   **Azure:**
   ```bash
   scout azure --cli --report-format json --report-dir ./scoutsuite-results
   ```

   **GCP:**
   ```bash
   scout gcp --project-id <project-id> --report-format json --report-dir ./scoutsuite-results
   ```

   - Specific services: `scout aws --services s3,iam,ec2`
   - Exclude services: `scout aws --skip s3`
   - Max workers: `scout aws --max-workers 10`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Level | Service | Rule | Flagged Items | Description | Remediation |
|---|-------|---------|------|---------------|-------------|-------------|
```

4. **Summarize** — Provide:
   - Total rules checked per service
   - Findings by danger level (danger/warning/info)
   - Top misconfigured services
   - Interactive HTML report location
