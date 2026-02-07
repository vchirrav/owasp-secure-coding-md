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

### Option 1: Clone Locally + CLAUDE.md (Full Offline Access)

Clone this repository into (or alongside) your project so the `rules/` folder is accessible locally. Then add a security auditing persona to your project's `CLAUDE.md` to teach Claude where the rules are.

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
**Cons:** Requires cloning/copying files into every project that needs them.

---

### Option 2: MCP Server (Centralized Remote Access)

Configure an MCP (Model Context Protocol) server so Claude Code can access the rule files from a central location without cloning them into every project. This is ideal for teams that want a single source of truth across multiple repositories.

**Option 2a: Filesystem MCP Server (local shared directory)**

Clone the repo once to a shared location, then configure a filesystem MCP server to expose the rules.

Add to your Claude Code MCP settings (`~/.claude/settings.json` or project `.claude/settings.json`):

```json
{
  "mcpServers": {
    "owasp-rules": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-filesystem",
        "/path/to/owasp-secure-coding-md/rules"
      ]
    }
  }
}
```

Replace `/path/to/owasp-secure-coding-md/rules` with the absolute path to your local clone's `rules/` directory.

**Option 2b: GitHub MCP Server (direct from repository)**

Use a GitHub-backed MCP server to fetch rule files directly from this repository without any local clone.

```json
{
  "mcpServers": {
    "owasp-rules": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-github"
      ],
      "env": {
        "GITHUB_TOKEN": "<your-github-token>"
      }
    }
  }
}
```

Then instruct Claude to read rules from the `vchirrav/owasp-secure-coding-md` repository.

**Usage (either MCP option):**
```
> Audit src/controllers/upload.ts against the OWASP file management
> and input validation rules. Use the MCP server to read the rule files.
```

**Pros:** Single source of truth, no files copied into projects, team-wide access.
**Cons:** Requires MCP server setup, depends on network (2b) or shared filesystem (2a).

---

### Option 3: Claude Code Skill (Zero Setup, Fetch from GitHub)

Copy a single skill file into your project's `.claude/skills/` directory. The skill automatically detects the security domain of your code and fetches only the relevant rule files directly from this GitHub repository — no local clone or MCP server needed.

**Setup:**

```bash
# Create the skills directory in your project
mkdir -p .claude/skills/secure-coding-remote

# Copy the skill file from this repo (or download it)
curl -o .claude/skills/secure-coding-remote/SKILL.md \
  https://raw.githubusercontent.com/vchirrav/owasp-secure-coding-md/main/.claude/skills/secure-coding-remote/SKILL.md
```

Or manually copy the file from this repository's `.claude/skills/secure-coding-remote/SKILL.md` into your project.

**Usage:**

Once the skill is in place, invoke it in Claude Code with:

```
> /secure-coding-remote src/auth/login.ts
> /secure-coding-remote "Node.js file upload controller"
```

The skill will:
1. Determine which security domains apply to your code
2. Fetch the relevant rule files from GitHub (`raw.githubusercontent.com`)
3. Audit your code or generate secure code following the rules
4. Output a findings table with Rule IDs and remediation steps

**Pros:** Single-file setup, no local clone needed, always fetches latest rules from GitHub.
**Cons:** Requires internet access to fetch rules, slightly slower than local reads.

---

### Quick Comparison

| | Option 1: Local Clone | Option 2: MCP Server | Option 3: Skill File |
|---|---|---|---|
| **Setup effort** | Clone repo + edit CLAUDE.md | Configure MCP server | Copy one file |
| **Rules location** | Local `rules/` folder | Central server | Fetched from GitHub |
| **Offline support** | Yes | Yes (2a) / No (2b) | No |
| **Auto-updates** | Manual `git pull` | Manual (2a) / Auto (2b) | Always latest |
| **Best for** | Solo dev, air-gapped | Teams, multi-repo | Quick start, any project |

---

## Prompting Tips

### Don't (Token Heavy)
> "Here is my code. Review it against all OWASP secure coding rules."
> *(Forces loading too much context, reduces quality.)*

### Do (Context Optimized)
> "Review this `login.py` file. First, read `rules/authentication-password-mgmt.md` and `rules/session-management.md`. Then, list any violations referencing the Rule IDs."

### Do (Generative)
> "Write a secure file upload controller in Node.js. Base your implementation strictly on the guidelines in `rules/file-management.md` and `rules/input-validation.md`."

### Do (Skill Invocation)
> `/secure-coding-remote src/controllers/authController.ts`

---

## Workflow Tips

* **Atomic Context:** Do not load the entire `rules/` folder into the context. Load files lazily, only as needed.
* **Checklist Mode:** Ask Claude to output a table: `| Rule ID | Status (Pass/Fail) | Remediation |`.
* **Rule Identity Pattern:** Each rule includes Identity, Rule, Rationale, Implementation, Verification, and Examples for consistent application.
* **Pre-Commit Hook:** Script a check to ensure sensitive files (like `auth` middleware) are reviewed against `rules/authentication-password-mgmt.md` before merging.

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
