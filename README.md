# OWASP Secure Coding & Security Best Practices (Markdown)

This repository provides a machine-readable, Markdown-optimized implementation of the **OWASP Secure Coding Practices Quick Reference Guide (v2.1)**, plus modern security domains such as **API Security**, **Cloud/Kubernetes**, **CI/CD**, **Supply Chain**, **IaC**, and **Secrets Management**.

It is designed specifically to be consumed by **AI Agents (e.g., Claude Code, GitHub Copilot)** and LLMs to facilitate token-efficient, context-aware security audits and code generation. Each rule follows a consistent Identity pattern (Identity, Rule, Rationale, Implementation, Verification, Examples) to make the guidance explicit and actionable.

## Repository Structure

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

## Integration Options

There are **three ways** to use these rules with Claude Code. Choose the option that best fits your workflow.

### Option 1: Clone Locally + CLAUDE.md

Clone this repository so the `rules/` folder is accessible locally. Then add a security auditing persona to your project's `CLAUDE.md` to teach Claude how and where to find the rules.

**Setup:**

```bash
# Clone into your project root (or as a sibling directory)
git clone https://github.com/vchirrav/owasp-secure-coding-md.git

# If cloned as a subdirectory, the rules are at:
#   owasp-secure-coding-md/rules/*.md
# If you prefer, copy just the rules/ folder into your project root:
cp -r owasp-secure-coding-md/rules ./rules
```

Add the following to your project's `CLAUDE.md`:

```markdown
## Security Auditing Persona
When I ask for a "Security Audit" or "Secure Code Generation":
1. **Identify the specific domain** of the code (e.g., is it a Dockerfile? An API Controller? A React Component?).
2. **Retrieve ONLY the relevant rule file** from the local `rules/` folder.
   - For a Python Flask route, read `rules/input-validation.md` and `rules/api-security.md`.
   - For a `Dockerfile`, read `rules/dockerfile-security.md`.
3. **Validate the code** against the specific checklist items in that file.
4. **Cite specific Rule IDs** (e.g., `[INPUT-01]`, `[DOCKER-05]`) in your output.
```

**Usage:**
```
> Review this login.py file. First, read rules/authentication-password-mgmt.md
> and rules/session-management.md. Then list any violations referencing Rule IDs.
```

**Pros:** Fully offline, fastest reads, rules are version-pinned to your clone.
**Cons:** Requires manual prompting to specify which rule files to load.

---

### Option 2: Clone Locally + Skills (Audit & Generate)

Clone the `rules/` folder locally (same as Option 1), but instead of writing CLAUDE.md instructions, copy the **two skill files** into your project. The skills automatically detect the relevant security domain and load only the needed rule files.

This repo provides two separate skills:
- **`/secure-coding-audit`** — Audits existing code against the rules and outputs a findings table
- **`/secure-coding-generate`** — Generates new secure code following the rules with inline Rule ID citations

**Setup:**

```bash
# 1. Get the rules into your project (same as Option 1)
git clone https://github.com/vchirrav/owasp-secure-coding-md.git
cp -r owasp-secure-coding-md/rules ./rules

# 2. Copy the skill files into your project
mkdir -p .claude/skills/secure-coding-audit
mkdir -p .claude/skills/secure-coding-generate

cp owasp-secure-coding-md/.claude/skills/secure-coding-audit/SKILL.md \
   .claude/skills/secure-coding-audit/SKILL.md

cp owasp-secure-coding-md/.claude/skills/secure-coding-generate/SKILL.md \
   .claude/skills/secure-coding-generate/SKILL.md
```

**Usage:**

Audit existing code:
```
> /secure-coding-audit src/auth/login.ts
> /secure-coding-audit src/Dockerfile
```

Generate new secure code:
```
> /secure-coding-generate "Node.js file upload controller"
> /secure-coding-generate "Python JWT auth middleware"
```

**Audit skill output:**
```
| Rule ID | Status | Finding | Remediation |
|---------|--------|---------|-------------|
| [INPUT-01] | FAIL | User input not validated server-side | Add server-side validation middleware |
| [AUTH-03] | PASS | — | — |
```

**Generate skill output:** Produces code with inline Rule ID comments (e.g., `// [INPUT-04] Reject invalid input`) followed by a rules-applied summary table.

**Pros:** Automatic domain detection, no manual rule file selection, dedicated workflows for audit vs generation.
**Cons:** Requires local `rules/` folder (same as Option 1).

---

### Option 3: MCP Server (Programmatic Access)

Run the **MCP server included in this repository** (`mcp-server/`) to expose the rules as programmable tools and resources. AI agents such as Claude Desktop, Claude Code, and other MCP-compatible clients can connect to this server to look up security rules, retrieve domain files, and generate audit checklists — without needing the `rules/` folder in every project.

**Build & Run:**

```bash
# Local (Node.js)
cd mcp-server
npm install
npm run build
npm start
```

```bash
# Docker (from repository root)
docker build -t owasp-mcp-server -f mcp-server/Dockerfile .
docker run -i owasp-mcp-server
```

```bash
# Docker Compose (development, with live rules mount)
cd mcp-server
docker compose up --build
```

**Available MCP Tools:**

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `list_rules` | None | Returns JSON list of all 22 rule domains with prefix, name, and description |
| `get_rule` | `rule_id` (string) | Accepts a rule ID like `INPUT-01` (returns that specific rule) or a domain like `input-validation` (returns the full file) |
| `audit_checklist` | `domain` (string) | Returns a structured markdown table: `Rule ID | Rule | Verification` |

**Available MCP Resources (22):**

Each rule file is exposed as a resource with URI pattern `secure-coding://rules/{domain}` (e.g., `secure-coding://rules/input-validation`). Resources return the full Markdown content of the rule file.

**Client Configuration:**

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

**Claude Desktop (Docker):**
```json
{
  "mcpServers": {
    "owasp-secure-coding": {
      "command": "docker",
      "args": ["run", "-i", "owasp-mcp-server"]
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

**Example Tool Invocations:**

```
Tool: list_rules
-> Returns JSON array of 22 domains with prefixes and descriptions

Tool: get_rule { "rule_id": "INPUT-01" }
-> Returns the [INPUT-01] rule section (Identity, Rule, Rationale, Implementation, Verification, Examples)

Tool: get_rule { "rule_id": "api-security" }
-> Returns the full api-security.md content

Tool: audit_checklist { "domain": "dockerfile-security" }
-> Returns: | Rule ID | Rule | Verification | for all DOCKER-xx rules
```

**Pros:** Single server for all projects, programmatic tool access, structured query by rule ID or domain.
**Cons:** Requires building and running the MCP server.

---

### Quick Comparison

| | Option 1: CLAUDE.md | Option 2: Skills | Option 3: MCP Server |
|---|---|---|---|
| **Setup** | Clone + edit CLAUDE.md | Clone + copy 2 skill files | Build & run MCP server |
| **Rules location** | Local `rules/` folder | Local `rules/` folder | Served by MCP server |
| **Domain detection** | Manual (you specify files) | Automatic (skill detects) | Automatic (query by tool) |
| **Offline support** | Yes | Yes | Yes |
| **Best for** | Quick start, full control | Hands-off audit & generation | Teams, multi-repo, programmatic |

---

## Prompting Tips

### Don't (Token Heavy)
> "Here is my code. Review it against all OWASP secure coding rules."
> *(Forces loading too much context, reduces quality.)*

### Do (Context Optimized — Option 1)
> "Review this `login.py` file. First, read `rules/authentication-password-mgmt.md` and `rules/session-management.md`. Then, list any violations referencing the Rule IDs."

### Do (Skill Invocation — Option 2)
> `/secure-coding-audit src/controllers/authController.ts`
> `/secure-coding-generate "Express.js REST API with JWT auth"`

### Do (MCP Tool — Option 3)
> "Use the `get_rule` tool to fetch the `api-security` domain, then audit `src/api/routes.ts` against those rules."

---

## Workflow Tips

* **Atomic Context:** Do not load the entire `rules/` folder into the context. Load files lazily, only as needed.
* **Checklist Mode:** Ask Claude to output a table: `| Rule ID | Status (Pass/Fail) | Remediation |`.
* **Rule Identity Pattern:** Each rule includes Identity, Rule, Rationale, Implementation, Verification, and Examples for consistent application.
* **Pre-Commit Hook:** Script a check to ensure sensitive files (like `auth` middleware) are reviewed against `rules/authentication-password-mgmt.md` before merging.

## License
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
