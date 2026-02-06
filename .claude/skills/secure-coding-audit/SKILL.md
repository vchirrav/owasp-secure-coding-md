---
name: secure-coding-audit
description: Perform a security audit or generate secure code using OWASP Secure Coding rules from the rules/ folder. Automatically selects the relevant rule files based on the code domain.
argument-hint: "[file-or-description] e.g. src/auth/login.ts or 'Node.js file upload controller'"
allowed-tools: Read, Grep, Glob, Bash(git diff *)
---

# OWASP Secure Coding Audit

You are a security auditor. Your job is to audit code or generate secure code using the modular OWASP rule files in the `rules/` directory of this repository.

## Step 1: Determine the domain

Examine $ARGUMENTS and identify which security domains apply. Use this mapping to select rule files:

| Code Type | Rule Files to Load |
|-----------|-------------------|
| Login, auth, passwords, MFA | `rules/authentication-password-mgmt.md`, `rules/session-management.md` |
| API routes, controllers, REST/GraphQL | `rules/api-security.md`, `rules/input-validation.md` |
| Dockerfile, container config | `rules/dockerfile-security.md` |
| Kubernetes manifests, Helm charts | `rules/cloud-native-k8s.md` |
| CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI) | `rules/cicd-pipeline-security.md` |
| Terraform, CloudFormation, Pulumi | `rules/iac-security.md` |
| File upload/download handlers | `rules/file-management.md`, `rules/input-validation.md` |
| Database queries, ORM code | `rules/database-security.md`, `rules/input-validation.md` |
| Frontend, React, HTML templates | `rules/client-side-security.md`, `rules/output-encoding.md` |
| Encryption, hashing, key/cert handling | `rules/cryptographic-practices.md`, `rules/communication-security.md` |
| Environment variables, secrets, vaults | `rules/secrets-management.md` |
| Error handling, logging, monitoring | `rules/error-handling-logging.md` |
| RBAC, permissions, authorization | `rules/access-control.md` |
| PII, data storage, retention | `rules/data-protection.md` |
| Dependencies, package management, SBOM | `rules/software-supply-chain.md` |
| C/C++, memory-unsafe languages | `rules/memory-management.md` |
| Server config, hardening | `rules/system-configuration.md` |
| General review (no specific domain) | `rules/general-coding-practices.md` |

If multiple domains apply, load all relevant files. Do NOT load the entire `rules/` folder — only what is needed.

## Step 2: Read the target code

If $ARGUMENTS is a file path, read that file. If it is a description of code to generate, proceed to Step 4.

## Step 3: Audit the code

For each relevant rule file:
1. Read the rule file from `rules/`.
2. Check the target code against every checklist rule in that file.
3. Record each finding as Pass or Fail.

Output a findings table:

```
| Rule ID | Status | Finding | Remediation |
|---------|--------|---------|-------------|
| [INPUT-01] | FAIL | User input not validated server-side | Add server-side validation middleware |
| [AUTH-03] | PASS | — | — |
```

After the table, provide a **Summary** with:
- Total rules checked vs violations found
- Critical findings (highest risk items first)
- Suggested code fixes with specific line references

## Step 4: Generate secure code (if requested)

If the user asked for code generation instead of an audit:
1. Read the relevant rule files.
2. Generate code that strictly follows every applicable rule.
3. Add inline comments citing the Rule ID for each security decision (e.g., `// [INPUT-04] Reject invalid input`).
4. After the code, list which rules were applied and how.
