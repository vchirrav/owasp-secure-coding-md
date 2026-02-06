---
name: secure-coding-rules
description: OWASP Secure Coding rules for security audits and secure code generation. Use when reviewing code for vulnerabilities, hardening infrastructure configs, or generating security-compliant code.
user-invocable: false
---

# OWASP Secure Coding Rules — Claude Code Skill

This skill provides 22 modular security rule sets based on OWASP Secure Coding Practices v2.1 and modern security standards (API, Docker, Kubernetes, CI/CD, Supply Chain, IaC, Secrets Management).

## How to Use This Skill in Your Project

### Option A: Clone as a submodule or local reference

```bash
git clone https://github.com/vchirrav/owasp-secure-coding-md.git .claude/skills/secure-coding-rules
```

### Option B: Copy the audit skill into your project

Copy `.claude/skills/secure-coding-audit/SKILL.md` from this repo into your project's `.claude/skills/secure-coding-audit/SKILL.md`. Then invoke it with `/secure-coding-audit <file-or-description>`.

### Option C: Reference rules directly in your CLAUDE.md

Add to your project's `CLAUDE.md`:

```markdown
## Security Auditing

When asked for a security audit or secure code generation:
1. Identify the code domain (API, Dockerfile, auth, etc.).
2. Read ONLY the relevant rule file(s) from the `owasp-secure-coding-md/rules/` folder.
3. Validate the code against each checklist rule in the file.
4. Cite Rule IDs (e.g., [INPUT-01], [DOCKER-05]) in your output.
```

## Rule Domain Mapping

When auditing code, select rule files based on what the code does:

| Code Domain | Rule File(s) | Prefix |
|-------------|-------------|--------|
| Authentication, login, passwords | `rules/authentication-password-mgmt.md` | AUTH |
| Sessions, cookies, CSRF | `rules/session-management.md` | SESS |
| API endpoints, REST/GraphQL | `rules/api-security.md` | API |
| Input handling, forms, parameters | `rules/input-validation.md` | INPUT |
| HTML output, templates, rendering | `rules/output-encoding.md` | OUT |
| Authorization, RBAC, permissions | `rules/access-control.md` | AC |
| Dockerfiles, container builds | `rules/dockerfile-security.md` | DOCKER |
| Kubernetes manifests, Helm | `rules/cloud-native-k8s.md` | K8S |
| CI/CD pipelines | `rules/cicd-pipeline-security.md` | CICD |
| Terraform, CloudFormation, IaC | `rules/iac-security.md` | IAC |
| Dependencies, SBOM, supply chain | `rules/software-supply-chain.md` | CHAIN |
| Secrets, env vars, vaults | `rules/secrets-management.md` | SECRET |
| TLS, HTTPS, transport security | `rules/communication-security.md` | COM |
| Encryption, hashing, key mgmt | `rules/cryptographic-practices.md` | CRYP |
| Database queries, SQL, ORM | `rules/database-security.md` | DB |
| File uploads, path traversal | `rules/file-management.md` | FILE |
| PII, data storage, retention | `rules/data-protection.md` | DATA |
| Frontend, CSP, DOM, SRI | `rules/client-side-security.md` | CLIENT |
| Error handling, logging, audit trails | `rules/error-handling-logging.md` | ERR |
| C/C++, buffer safety, memory | `rules/memory-management.md` | MEM |
| Server hardening, patching | `rules/system-configuration.md` | SYS |
| General secure coding practices | `rules/general-coding-practices.md` | GEN |

## Rule Structure

Each rule file contains a Principles section followed by checklist rules. Every rule has 6 fields:

- **Identity**: Rule ID (e.g., `[INPUT-01]`)
- **Rule**: What must be done
- **Rationale**: Why it matters
- **Implementation**: How to implement it
- **Verification**: How to test it
- **Examples**: Do/Don't examples

## Audit Output Format

When performing audits, output findings as:

```
| Rule ID | Status | Finding | Remediation |
|---------|--------|---------|-------------|
| [API-01] | FAIL | No object-level auth check | Add ownership validation before data access |
| [INPUT-03] | PASS | — | — |
```

## Key Principles

- **Atomic context**: Load only the rule files relevant to the code being reviewed — never load all 22 files at once.
- **Cite Rule IDs**: Always reference specific rule IDs in findings for traceability.
- **Defense in depth**: When multiple domains apply (e.g., an API that handles file uploads), load all relevant rule files.
