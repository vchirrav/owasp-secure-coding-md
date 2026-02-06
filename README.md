# OWASP Secure Coding & Security Best Practices (Markdown)

This repository provides a machine-readable, Markdown-optimized implementation of the **OWASP Secure Coding Practices Quick Reference Guide (v2.1)**, plus modern security domains such as **API Security**, **Cloud/Kubernetes**, **CI/CD**, **Supply Chain**, **IaC**, and **Secrets Management**.

It is designed specifically to be consumed by **AI Agents (e.g., Claude Code, GitHub Copilot)** and LLMs to facilitate token-efficient, context-aware security audits and code generation. Each rule follows a consistent Identity pattern (Identity, Rule, Rationale, Implementation, Verification, Examples) to make the guidance explicit and actionable.

##  Repository Structure

The rules are modularized into atomic Markdown files in the `rules/` directory to allow for granular context injection.

| Category | File Path | Focus Area |
| :--- | :--- | :--- |
| **Access Control** | `rules/access-control.md` | Authorization, RBAC/ABAC, IDOR |
| **API Security** | `rules/api-security.md` | BOLA/BFLA, rate limiting, tokens |
| **Authentication** | `rules/authentication-password-mgmt.md` | Login, passwords, MFA |
| **CI/CD Security** | `rules/cicd-pipeline-security.md` | Pipeline integrity, runners, secrets |
| **Client Security** | `rules/client-side-security.md` | CSP, headers, DOM safety |
| **Cloud & Kubernetes** | `rules/cloud-native-k8s.md` | Pod security, network policies |
| **Communication Security** | `rules/communication-security.md` | TLS, headers, transport safety |
| **Cryptographic Practices** | `rules/cryptographic-practices.md` | Encryption, hashing, key mgmt |
| **Data Protection** | `rules/data-protection.md` | Storage, retention, leakage |
| **Database Security** | `rules/database-security.md` | SQLi prevention, DB hardening |
| **Docker Security** | `rules/dockerfile-security.md` | Image hardening, build safety |
| **Error Handling & Logging** | `rules/error-handling-logging.md` | Safe errors, audit logging |
| **File Management** | `rules/file-management.md` | Uploads, file access, traversal |
| **General Practices** | `rules/general-coding-practices.md` | Secure defaults, least privilege |
| **IaC Security** | `rules/iac-security.md` | Terraform/CloudFormation, drift |
| **Input Validation** | `rules/input-validation.md` | Validation, canonicalization |
| **Memory Management** | `rules/memory-management.md` | Buffers, leaks, safe APIs |
| **Output Encoding** | `rules/output-encoding.md` | XSS prevention, safe display |
| **Secrets Mgmt** | `rules/secrets-management.md` | Vaults, rotation, leakage |
| **Session Mgmt** | `rules/session-management.md` | Cookies, timeouts, CSRF |
| **Software Supply Chain** | `rules/software-supply-chain.md` | SBOM, signing, provenance |
| **System Configuration** | `rules/system-configuration.md` | Hardening, patches, HTTP |

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
* **Rule Identity Pattern:** Each rule includes Identity, Rule, Rationale, Implementation, Verification, and Examples for consistent application.
* **Pre-Commit Hook:** You can script a simple check to ensure specific sensitive files (like `auth` middleware) are always reviewed against `rules/authentication-password-mgmt.md` before merging.

## MCP Server

This repository includes an MCP (Model Context Protocol) server that exposes the security rules as programmable tools and resources for AI agents.

### Quick Start

```bash
cd mcp-server
npm install && npm run build
npm start
```

Or with Docker (from repository root):

```bash
docker build -t owasp-mcp-server -f mcp-server/Dockerfile .
docker run -i owasp-mcp-server
```

### Available Tools

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `list_rules` | None | List all 22 rule domains with prefixes and descriptions |
| `get_rule` | `rule_id` | Get a specific rule by ID (e.g., `INPUT-01`) or entire domain (e.g., `input-validation`) |
| `audit_checklist` | `domain` | Structured audit checklist table for a domain |

### Client Configuration

**Claude Desktop** — add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "owasp-secure-coding": {
      "command": "node",
      "args": ["/path/to/owasp-secure-coding-md/mcp-server/dist/index.js"]
    }
  }
}
```

**Claude Code** — add `.mcp.json` to your project root:
```json
{
  "mcpServers": {
    "owasp-secure-coding": {
      "command": "node",
      "args": ["/path/to/owasp-secure-coding-md/mcp-server/dist/index.js"]
    }
  }
}
```

See [`SKILL.md`](SKILL.md) for full documentation including Docker configuration, all 22 resources, and example invocations.

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
