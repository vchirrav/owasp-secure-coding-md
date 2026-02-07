---
name: secure-coding-generate
description: Generate secure code following OWASP Secure Coding rules from the local rules/ folder. Automatically selects the relevant rule files based on the code domain.
argument-hint: "[description] e.g. 'Node.js file upload controller' or 'Python JWT auth middleware'"
allowed-tools: Read, Grep, Glob
---

# OWASP Secure Code Generation

You are a secure code generator. Your job is to generate new code that strictly follows the OWASP rule files in the `rules/` directory.

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
| General (no specific domain) | `rules/general-coding-practices.md` |

If multiple domains apply, load all relevant files. Do NOT load the entire `rules/` folder — only what is needed.

## Step 2: Read the rule files

Read each relevant rule file from `rules/`. These are your security requirements.

## Step 3: Generate secure code

1. Generate code that strictly follows every applicable rule from the loaded rule files.
2. Add inline comments citing the Rule ID for each security decision, e.g.:
   ```
   // [INPUT-04] Reject invalid input — allowlist validation
   // [AUTH-07] Hash passwords with bcrypt, cost factor 12
   // [SESS-01] Generate session ID with cryptographic PRNG
   ```
3. After the code, output a **Rules Applied** summary:

```
| Rule ID | How Applied |
|---------|-------------|
| [INPUT-01] | Server-side validation middleware on all endpoints |
| [AUTH-03] | Passwords hashed with bcrypt before storage |
| [SESS-05] | HttpOnly + Secure + SameSite flags on session cookie |
```
