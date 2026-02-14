# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation-only repository containing OWASP Secure Coding Practices (v2.1) and modern security guidelines (Docker, Kubernetes, CI/CD, Supply Chain) as modular Markdown files. Designed for AI agent consumption to perform token-efficient security audits and secure code generation.

No build, test, or lint commands -- pure Markdown reference repository (except for the `mcp-server/` which is a Node.js TypeScript project).

## Architecture

All security rules live in `rules/` as standalone Markdown files, one per security domain. Each file follows a consistent structure:

1. **Title with acronym prefix** (e.g., `[INPUT-xx]`, `[DOCKER-xx]`, `[API-xx]`)
2. **Principles section** explaining the domain rationale
3. **Numbered checklist rules**, each with 6 fields: Identity, Rule, Rationale, Implementation, Verification, Examples
4. **Source citations** to OWASP, Docker, Kubernetes, NIST, CIS, SLSA standards

Rule IDs are hierarchical and should be cited in audit output. The 22 prefixes are:

`INPUT`, `OUT`, `AUTH`, `SESS`, `AC`, `API`, `DOCKER`, `K8S`, `CICD`, `CHAIN`, `SECRET`, `IAC`, `CLIENT`, `CRYP`, `COM`, `DB`, `FILE`, `DATA`, `ERR`, `MEM`, `GEN`, `SYS`

## MCP Server

The `mcp-server/` directory contains a Node.js TypeScript MCP server (ESM, `@modelcontextprotocol/sdk` + `zod`) that exposes all 22 rule domains as tools and resources. No tests are configured.

**Build & run:**

```bash
cd mcp-server && npm install && npm run build && npm start
```

**Docker (from repo root):**

```bash
docker build -t owasp-mcp-server -f mcp-server/Dockerfile .
docker run -i owasp-mcp-server
```

**Docker Compose (dev, live rules mount):**

```bash
cd mcp-server && docker compose up --build
```

**Tools:** `list_rules`, `get_rule` (accepts rule ID like `INPUT-01` or domain like `input-validation`), `audit_checklist` (returns markdown table for a domain). **Resources:** 22 URIs at `secure-coding://rules/{domain}`.

**Rules resolution:** The server searches for `rules/` in `cwd`, then `../../rules`, then `../rules` relative to the compiled JS -- relevant when running from Docker vs local dev.

## Companion Repository: AI Agent Skills

AI agent skills (SAST, SCA, DAST, container scanning, secret detection, etc.) live in a separate repository: [product-security-ai-skills](https://github.com/chvasu/product-security-ai-skills). The `secure-coding-audit` and `secure-coding-generate` skills in that repo depend on the `rules/` folder from this repository.

## Security Auditing Persona

When asked for a "Security Audit" or "Secure Code Generation":
1. **Identify the specific domain** of the code (e.g., is it a Dockerfile? An API Controller? A React Component?).
2. **Retrieve ONLY the relevant rule file(s)** from `rules/`. Use the domain mapping below.
3. **Validate the code** against the specific checklist items in that file.
4. **Cite specific Rule IDs** (e.g., `[INPUT-01]`, `[DOCKER-05]`) in your output.

### Domain-to-Rule-File Mapping

| Code Type | Rule Files to Load |
|-----------|-------------------|
| Login, auth, passwords, MFA | `authentication-password-mgmt.md`, `session-management.md` |
| API routes, REST/GraphQL | `api-security.md`, `input-validation.md` |
| Dockerfile, container config | `dockerfile-security.md` |
| Kubernetes manifests, Helm | `cloud-native-k8s.md` |
| CI/CD pipelines | `cicd-pipeline-security.md` |
| Terraform, CloudFormation | `iac-security.md` |
| File upload/download | `file-management.md`, `input-validation.md` |
| Database queries, ORM | `database-security.md`, `input-validation.md` |
| Frontend, React, HTML | `client-side-security.md`, `output-encoding.md` |
| Encryption, hashing, certs | `cryptographic-practices.md`, `communication-security.md` |
| Env vars, secrets, vaults | `secrets-management.md` |
| Error handling, logging | `error-handling-logging.md` |
| RBAC, authorization | `access-control.md` |
| PII, data storage | `data-protection.md` |
| Dependencies, SBOM | `software-supply-chain.md` |
| C/C++, memory-unsafe code | `memory-management.md` |
| Server config, hardening | `system-configuration.md` |
| General (no specific domain) | `general-coding-practices.md` |

All files are in `rules/`. Do **not** load the entire folder -- only what is needed.

### Output Format

Output a findings table:
```
| Rule ID | Status (Pass/Fail) | Finding | Remediation |
```

For code generation, add inline comments citing Rule IDs (e.g., `// [INPUT-04] Reject invalid input`).

## Conventions for Editing Rules

- Maintain the existing format: Principles section followed by numbered checklist rules
- Each rule must include all six Identity pattern fields: **Identity**, **Rule**, **Rationale**, **Implementation**, **Verification**, **Examples**
- Use the established rule ID prefix for the file (e.g., new rules in `api-security.md` use `[API-xx]`)
- Cite authoritative sources (OWASP, CIS, NIST, vendor docs)
- Keep rules as concise, actionable checklist items -- not prose essays
