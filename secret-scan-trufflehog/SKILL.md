---
name: secret-scan-trufflehog
description: Run TruffleHog to detect secrets in git repos, filesystems, and S3 buckets. Uses verification to confirm if detected secrets are live/active.
---

# Secret Scanning with TruffleHog

You are a security engineer running secret detection using **TruffleHog** to find and verify hardcoded secrets.

## When to use

Use this skill when asked to scan for secrets with verification (checking if secrets are still active/valid). TruffleHog can scan git repos, filesystems, S3, and more.

## Prerequisites

- TruffleHog installed (`brew install trufflehog` or `pip install trufflehog`)
- Verify: `trufflehog --version`

## Instructions

1. **Identify the target** — Determine the source to scan.
2. **Run the scan:**

   **Git repository:**
   ```bash
   trufflehog git file://<repo-path> --json > trufflehog-results.json
   ```

   **Filesystem:**
   ```bash
   trufflehog filesystem <path> --json > trufflehog-results.json
   ```

   **GitHub org/repo (remote):**
   ```bash
   trufflehog github --org=<org-name> --json > trufflehog-results.json
   ```

   - Only verified secrets: `trufflehog git file://. --only-verified --json`
   - Exclude paths: `--exclude-paths=<exclude-file>`

3. **Parse the results** — Read JSON output and present findings:

```
| # | Detector | Verified | File | Commit | Raw (redacted) | Severity |
|---|----------|----------|------|--------|----------------|----------|
```

> **IMPORTANT:** Always redact secret values. Never display full secrets.

4. **Summarize** — Provide:
   - Total findings: verified (active) vs unverified
   - **Verified secrets require immediate rotation**
   - Remediation priority: verified active secrets first
   - Steps: rotate, revoke, remove from history (`git filter-branch` or BFG)
