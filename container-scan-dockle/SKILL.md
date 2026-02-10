---
name: container-scan-dockle
description: Run Dockle to audit container images against CIS Docker Benchmark and best practices. Checks for running as root, sensitive files, HEALTHCHECK, and more.
---

# Container Image Audit with Dockle

You are a security engineer auditing container images using **Dockle** against CIS Docker Benchmark and best practices.

## When to use

Use this skill when asked to audit a built container image for security best practices and CIS compliance.

## Prerequisites

- Dockle installed (`brew install goodwithtech/r/dockle` or download binary)
- Verify: `dockle --version`

## Instructions

1. **Identify the target** — Determine the container image to audit.
2. **Run the scan:**
   ```bash
   dockle --format json --output dockle-results.json <image>:<tag>
   ```
   - Ignore specific checks: `dockle --ignore CIS-DI-0001 --format json <image>`
   - Accept specific keys: `dockle --accept-key DOCKER_CONTENT_TRUST --format json <image>`
3. **Parse the results** — Read JSON output and present findings:

```
| # | Level | Code | Title | Finding |
|---|-------|------|-------|---------|
```

4. **Summarize** — Provide total issues by level (FATAL/WARN/INFO/SKIP/PASS).

## Key Dockle Checks (CIS Docker Benchmark)

| Code | Description |
|------|-------------|
| CIS-DI-0001 | Create a user for the container (don't run as root) |
| CIS-DI-0002 | Add HEALTHCHECK instruction |
| CIS-DI-0003 | Do not use update instructions alone |
| CIS-DI-0005 | Do not use COPY with sensitive files (.env, .git, etc.) |
| CIS-DI-0006 | Add LABEL to the image |
| CIS-DI-0008 | Confirm safety of setuid/setgid files |
| CIS-DI-0009 | Use COPY instead of ADD |
| CIS-DI-0010 | Do not store secrets in LABEL or ENV |
| DKL-DI-0001 | Avoid sudo usage |
| DKL-DI-0002 | Avoid sensitive directory mount |
| DKL-DI-0005 | Clear package manager cache |
