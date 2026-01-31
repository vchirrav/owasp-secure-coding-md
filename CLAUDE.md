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

## Security Auditing Workflow

When performing a security audit or generating secure code:

1. Identify the code's domain (Dockerfile, API controller, React component, etc.)
2. Load **only** the relevant rule file(s) from `rules/` — do not load the entire directory
3. Validate code against the specific checklist items
4. Cite rule IDs (e.g., `[INPUT-01]`, `[DOCKER-05]`) in findings

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
