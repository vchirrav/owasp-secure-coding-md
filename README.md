# OWASP Secure Coding & Security Best Practices (Markdown)

This repository provides a machine-readable, Markdown-optimized implementation of the **OWASP Secure Coding Practices Quick Reference Guide (v2.1)**, along with modern security categories like **Docker**, **Kubernetes**, **CI/CD**, and **Supply Chain Security**.

It is designed specifically to be consumed by **AI Agents (e.g., Claude Code, GitHub Copilot)** and LLMs to facilitate token-efficient, context-aware security audits and code generation.

##  Repository Structure

The rules are modularized into atomic Markdown files in the `rules/` directory to allow for granular context injection.

| Category | File Path | Focus Area |
| :--- | :--- | :--- |
| **Input Validation** | `rules/input-validation.md` | XSS, Injection, Data Sanitization |
| **Output Encoding** | `rules/output-encoding.md` | XSS Prevention, Safe Display |
| **Authentication** | `rules/authentication-password-mgmt.md` | Login, Passwords, MFA |
| **Session Mgmt** | `rules/session-management.md` | Cookies, Timeouts, Hijacking |
| **Access Control** | `rules/access-control.md` | RBAC, IDOR, Authorization |
| **API Security** | `rules/api-security.md` | BOLA, Rate Limiting, JWTs |
| **Docker Security** | `rules/dockerfile-security.md` | Image Hardening, Rootless, Secrets |
| **K8s & Cloud** | `rules/cloud-native-k8s.md` | Pod Security, Network Policies |
| **CI/CD Security** | `rules/cicd-pipeline-security.md` | Pipeline Integrity, Runners |
| **Supply Chain** | `rules/software-supply-chain.md` | SBOM, Signing, Dependencies |
| **Secrets Mgmt** | `rules/secrets-management.md` | Vaults, Env Vars, Leaks |
| **IaC Security** | `rules/iac-security.md` | Terraform, CloudFormation |
| **Client Security** | `rules/client-side-security.md` | CSP, Headers, DOM Safety |

*(See the `rules/` directory for the full list including Cryptography, Error Handling, and more.)*

---

##  Using with Claude Code (Efficiently)

To use these rules without exhausting your context window (token budget), follow these **"Just-In-Time"** context strategies.

### 1. Configuration (`CLAUDE.md`)
Add the following persona instruction to your project's `CLAUDE.md` file. This tells Claude *how* and *where* to find the rules.

```markdown
## Security Auditing Persona
When I ask for a "Security Audit" or "Secure Code Generation":
1.  **Identify the specific domain** of the code (e.g., is it a Dockerfile? An API Controller? A React Component?).
2.  **Retrieve ONLY the relevant rule file** from the `vchirrav/owasp-secure-coding-md` repository (or local `rules/` folder if cloned).
    * *Example:* For a Python Flask route, fetch `rules/input-validation.md` and `rules/api-security.md`.
    * *Example:* For a `Dockerfile`, fetch `rules/dockerfile-security.md`.
3.  **Validate the code** against the specific checklist items in that file.
4.  **Cite specific Rule IDs** (e.g., `[INPUT-01]`, `[DOCKER-05]`) in your output to keep the response concise.
```

### 2. Prompting Examples (Dos and Don'ts)

####  Don't (Token Heavy)
> "Here is my code. Review it against all OWASP secure coding rules."
> *(This forces the model to hallucinate or try to load too much context, reducing quality.)*

####  Do (Context Optimized)
> "Review this `login.py` file. First, read `rules/authentication-password-mgmt.md` and `rules/session-management.md`. Then, list any violations referencing the Rule IDs."

####  Do (Generative)
> "Write a secure file upload controller in Node.js. Base your implementation strictly on the guidelines in `rules/file-management.md` and `rules/input-validation.md`."

---

##  Workflow Tips

* **Atomic Context:** If you are working on a massive project, do not load the entire `rules/` folder into the context. Load files lazily.
* **Checklist Mode:** Ask Claude to output a table: `| Rule ID | Status (Pass/Fail) | Remediation |`.
* **Pre-Commit Hook:** You can script a simple check to ensure specific sensitive files (like `auth` middleware) are always reviewed against `rules/authentication-password-mgmt.md` before merging.

##  License
This repository contains synthesized information from the following sources and standards:
* OWASP Secure Coding Practices Quick Reference Guide v2.1
* OWASP API Security Top 10 (2023)
* OWASP Secrets Management Cheat Sheet
* OWASP Client-Side Security Cheat Sheet
* OWASP SCVS
* Docker Docs (Best Practices for Dockerfiles)
* CIS Benchmarks
* NSA/CISA Kubernetes Hardening Guidance
* HashiCorp Security Best Practices
* SLSA Framework
* NIST SSDF
* CNCF Best Practices
* W3C and MDN Web Docs
