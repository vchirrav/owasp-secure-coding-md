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

### Option D: Use the MCP Server

Connect AI agents to the OWASP rules programmatically via the MCP server (see below).

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

---

## MCP Server

This repository also includes an MCP (Model Context Protocol) server that exposes the OWASP Secure Coding rules as machine-queryable tools and resources. AI agents such as Claude Desktop, Claude Code, and other MCP-compatible clients can connect to this server to programmatically look up security rules, retrieve entire domain files, and generate audit checklists.

### MCP Resources (22)

Each security rule file is exposed as an MCP resource with URI pattern `secure-coding://rules/{domain}` (e.g., `secure-coding://rules/input-validation`). Resources return the full Markdown content of the rule file.

### MCP Tools (3)

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `list_rules` | None | Returns a JSON list of all 22 rule domains with prefix, domain name, and description |
| `get_rule` | `rule_id` (string) | Accepts a rule ID like `INPUT-01` (returns that specific rule section) or a domain like `input-validation` (returns the full file) |
| `audit_checklist` | `domain` (string) | Parses a rule file and returns a structured markdown table: `Rule ID | Rule | Verification` |

### Build and Run

**Local (Node.js):**

```bash
cd mcp-server
npm install
npm run build
npm start
```

**Docker:**

```bash
# Build from repository root
docker build -t owasp-mcp-server -f mcp-server/Dockerfile .

# Run (stdio transport)
docker run -i owasp-mcp-server
```

**Docker Compose (development):**

```bash
cd mcp-server
docker compose up --build
```

### Client Configuration

**Claude Desktop** (`claude_desktop_config.json`):

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

Or with Docker:

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

**Claude Code** (`.mcp.json` in project root):

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

### Example Tool Invocations

**List all available rule domains:**
```
Tool: list_rules
-> Returns JSON array of 22 domains with prefixes and descriptions
```

**Get a specific rule by ID:**
```
Tool: get_rule
Input: { "rule_id": "INPUT-01" }
-> Returns the full [INPUT-01] rule section with Identity, Rule, Rationale, Implementation, Verification, Examples
```

**Get an entire domain file:**
```
Tool: get_rule
Input: { "rule_id": "api-security" }
-> Returns the full api-security.md content
```

**Generate an audit checklist:**
```
Tool: audit_checklist
Input: { "domain": "dockerfile-security" }
-> Returns a markdown table:
| Rule ID | Rule | Verification |
| :--- | :--- | :--- |
| DOCKER-01 | Use official minimal base images | Verify base image source and tag |
| DOCKER-02 | ... | ... |
```
