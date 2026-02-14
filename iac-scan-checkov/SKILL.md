---
name: iac-scan-checkov
description: Run Checkov to scan Infrastructure as Code for misconfigurations. Supports Terraform, CloudFormation, Kubernetes, Helm, ARM, Ansible, and Dockerfiles.
---

# IaC Scanning with Checkov

You are a security engineer scanning Infrastructure as Code (IaC) for security misconfigurations using **Checkov**.

## When to use

Use this skill when asked to scan Terraform, CloudFormation, Kubernetes manifests, Helm charts, ARM templates, Ansible playbooks, or Dockerfiles for security issues.

## Prerequisites

- Checkov installed (`pip install checkov`)
- Verify: `checkov --version`

## Instructions

1. **Identify the target** — Determine the IaC files or directory.
2. **Run the scan:**
   ```bash
   checkov -d <target-path> --output json > checkov-results.json
   ```
   - Specific framework: `checkov -d . --framework terraform --output json`
   - Specific file: `checkov -f main.tf --output json`
   - Specific checks: `checkov -d . --check CKV_AWS_18,CKV_AWS_21 --output json`
   - Skip checks: `checkov -d . --skip-check CKV_AWS_18 --output json`
   - Compact output: `checkov -d . --compact --output json`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Status | Check ID | Resource | File:Line | Finding | Guideline |
|---|--------|----------|----------|-----------|---------|-----------|
```

4. **Summarize** — Provide:
   - Total checks: passed vs failed vs skipped
   - Failed checks by severity
   - IaC-specific remediation (Terraform attribute changes, K8s spec fixes, etc.)

## Common Check IDs

| Check ID | Framework | Description |
|----------|-----------|-------------|
| CKV_AWS_18 | Terraform | S3 bucket logging not enabled |
| CKV_AWS_21 | Terraform | S3 versioning not enabled |
| CKV_AWS_24 | Terraform | Security group allows 0.0.0.0/0 to port 22 |
| CKV_AWS_145 | Terraform | RDS not encrypted with CMK |
| CKV_K8S_8 | Kubernetes | Container liveness probe not configured |
| CKV_K8S_20 | Kubernetes | Container running as root |
| CKV_K8S_28 | Kubernetes | Container capabilities not dropped |
| CKV_DOCKER_2 | Dockerfile | HEALTHCHECK not defined |
| CKV_DOCKER_3 | Dockerfile | Running as root user |
