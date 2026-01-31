# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a documentation-only repository containing OWASP Secure Coding Practices (v2.1) and modern security guidelines (Docker, Kubernetes, CI/CD, Supply Chain) formatted as modular Markdown files. It is designed for consumption by AI agents to perform token-efficient security audits and secure code generation.

There are no build, test, or lint commands — this is a pure Markdown reference repository.

## Architecture

All security rules live in `rules/` as standalone Markdown files, one per security domain. Each file follows a consistent structure:

1. **Title with acronym prefix** (e.g., `[INPUT-xx]`, `[DOCKER-xx]`, `[API-xx]`)
2. **Principles section** explaining the domain rationale
3. **Numbered checklist rules** with actionable items
4. **Source citations** to OWASP, Docker, Kubernetes, NIST, CIS, SLSA standards

Rule IDs are hierarchical (e.g., `[INPUT-01]`, `[AUTH-05]`, `[K8S-12]`) and should be cited in audit output.

## Security Auditing Persona

When asked for a "Security Audit" or "Secure Code Generation":
1. **Identify the specific domain** of the code (e.g., is it a Dockerfile? An API Controller? A React Component?).
2. **Retrieve ONLY the relevant rule file** from the `rules/` folder.
   - For a Python Flask route, fetch `rules/input-validation.md` and `rules/api-security.md`.
   - For a `Dockerfile`, fetch `rules/dockerfile-security.md`.
3. **Validate the code** against the specific checklist items in that file.
4. **Cite specific Rule IDs** (e.g., `[INPUT-01]`, `[DOCKER-05]`) in your output to keep the response concise.

### Prompting Best Practices

**Don't** (token heavy): "Review it against all OWASP secure coding rules." — this forces loading too much context and reduces quality.

**Do** (context optimized): "Review this `login.py` file. First, read `rules/authentication-password-mgmt.md` and `rules/session-management.md`. Then, list any violations referencing the Rule IDs."

**Do** (generative): "Write a secure file upload controller in Node.js. Base your implementation strictly on the guidelines in `rules/file-management.md` and `rules/input-validation.md`."

### Workflow Tips

- **Atomic Context:** Do not load the entire `rules/` folder into the context. Load files lazily, only as needed.
- **Checklist Mode:** Output a table: `| Rule ID | Status (Pass/Fail) | Remediation |`.
- **Pre-Commit Hook:** Ensure sensitive files (like `auth` middleware) are reviewed against `rules/authentication-password-mgmt.md` before merging.

## Rule Categories

| Prefix | File | Domain |
|--------|------|--------|
| INPUT | `rules/input-validation.md` | XSS, injection, sanitization |
| OUT | `rules/output-encoding.md` | XSS prevention, context-aware encoding |
| AUTH | `rules/authentication-password-mgmt.md` | Login, passwords, MFA |
| SESS | `rules/session-management.md` | Cookies, session IDs, CSRF |
| AC | `rules/access-control.md` | RBAC, IDOR, authorization |
| API | `rules/api-security.md` | BOLA, BOPLA, BFLA, JWT, rate limiting |
| DOCKER | `rules/dockerfile-security.md` | Image hardening, rootless, secrets |
| K8S | `rules/cloud-native-k8s.md` | Pod security, network policies, RBAC |
| CICD | `rules/cicd-pipeline-security.md` | Pipeline integrity, runners |
| CHAIN | `rules/software-supply-chain.md` | SCA, SBOM, SLSA, artifact signing |
| SECRET | `rules/secrets-management.md` | Vaults, env vars, rotation |
| IAC | `rules/iac-security.md` | Terraform, CloudFormation, policy-as-code |
| CLIENT | `rules/client-side-security.md` | CSP, headers, DOM safety, SRI |
| CRYP | `rules/cryptographic-practices.md` | Encryption, hashing, key management |
| COM | `rules/communication-security.md` | TLS/HTTPS, certificate validation |
| DB | `rules/database-security.md` | Parameterized queries, SQL injection |
| FILE | `rules/file-management.md` | Uploads, LFI/RFI, path traversal |
| DATA | `rules/data-protection.md` | Encryption at rest, PII handling |
| ERR | `rules/error-handling-logging.md` | Logging, audit trails, debug info |
| MEM | `rules/memory-management.md` | Buffer overflows, resource leaks |
| SYS | `rules/system-configuration.md` | Server hardening, patching |

## Conventions for Editing Rules

- Maintain the existing format: principle statement followed by numbered checklist items
- Use the established rule ID prefix for the file (e.g., new rules in `api-security.md` use `[API-xx]`)
- Cite authoritative sources (OWASP, CIS, NIST, vendor docs)
- Keep rules as concise, actionable checklist items — not prose essays
