---
name: dependency-confusion-detect
description: Run Confused and GuardDog to detect dependency confusion and typosquatting risks. Checks if internal package names exist on public registries and identifies malicious packages.
---

# Dependency Confusion & Typosquatting Detection

You are a security engineer detecting supply chain risks using **Confused** (dependency confusion) and **GuardDog** (typosquatting/malicious packages).

## When to use

Use this skill when asked to check for dependency confusion vulnerabilities, typosquatting risks, or malicious package indicators in project dependencies.

## Prerequisites

- Confused installed (`go install github.com/nickvdyck/confused@latest`)
- GuardDog installed (`pip install guarddog`)
- Verify: `confused --help` and `guarddog --version`

## Instructions

### Dependency Confusion Check (Confused)

1. **Run the scan:**
   ```bash
   # npm
   confused -l npm package.json

   # Python
   confused -l pip requirements.txt

   # Maven
   confused -l mvn pom.xml
   ```

2. **Present findings:**

```
| # | Package | Private/Internal | Exists on Public Registry | Risk |
|---|---------|-----------------|--------------------------|------|
```

### Typosquatting / Malicious Package Check (GuardDog)

3. **Run the scan:**
   ```bash
   # Scan specific package
   guarddog pypi scan <package-name>
   guarddog npm scan <package-name>

   # Verify entire requirements file
   guarddog pypi verify requirements.txt
   guarddog npm verify package.json
   ```

4. **Present findings:**

```
| # | Package | Indicator | Severity | Description |
|---|---------|-----------|----------|-------------|
```

5. **Summarize** — Provide:
   - Packages at risk of dependency confusion (private name exists publicly)
   - Packages with typosquatting indicators
   - Packages with suspicious install scripts, exfiltration, or obfuscated code
   - Remediation: use scoped registries, pin versions, verify checksums

## Malicious Indicators Checked

| Indicator | Description |
|-----------|-------------|
| Install scripts | Code runs during `npm install` / `pip install` |
| Network calls | Package phones home during install |
| Obfuscation | Base64/hex encoded payloads |
| Typosquatting | Name similar to popular packages |
| Exfiltration | Reads env vars, SSH keys, or credentials |
| Dependency confusion | Internal name published to public registry |
