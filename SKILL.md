# SKILL: OWASP Secure Coding MCP Server

## Overview

This repository includes an MCP (Model Context Protocol) server that exposes the OWASP Secure Coding rules as machine-queryable tools and resources. AI agents such as Claude Desktop, Claude Code, and other MCP-compatible clients can connect to this server to programmatically look up security rules, retrieve entire domain files, and generate audit checklists.

## What It Provides

### Resources (22)
Each security rule file is exposed as an MCP resource with URI pattern `secure-coding://rules/{domain}` (e.g., `secure-coding://rules/input-validation`). Resources return the full Markdown content of the rule file.

### Tools (3)

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `list_rules` | None | Returns a JSON list of all 22 rule domains with prefix, domain name, and description |
| `get_rule` | `rule_id` (string) | Accepts a rule ID like `INPUT-01` (returns that specific rule section) or a domain like `input-validation` (returns the full file) |
| `audit_checklist` | `domain` (string) | Parses a rule file and returns a structured markdown table: `Rule ID | Rule | Verification` |

## Build and Run

### Local (Node.js)

```bash
cd mcp-server
npm install
npm run build
npm start
```

### Docker

```bash
# Build from repository root
docker build -t owasp-mcp-server -f mcp-server/Dockerfile .

# Run (stdio transport)
docker run -i owasp-mcp-server
```

### Docker Compose (development)

```bash
cd mcp-server
docker compose up --build
```

## Client Configuration

### Claude Desktop (`claude_desktop_config.json`)

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

### Claude Code (`.mcp.json` in project root)

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

## Example Tool Invocations

### List all available rule domains

```
Tool: list_rules
→ Returns JSON array of 22 domains with prefixes and descriptions
```

### Get a specific rule by ID

```
Tool: get_rule
Input: { "rule_id": "INPUT-01" }
→ Returns the full [INPUT-01] rule section with Identity, Rule, Rationale, Implementation, Verification, Examples
```

### Get an entire domain file

```
Tool: get_rule
Input: { "rule_id": "api-security" }
→ Returns the full api-security.md content
```

### Generate an audit checklist

```
Tool: audit_checklist
Input: { "domain": "dockerfile-security" }
→ Returns a markdown table:
| Rule ID | Rule | Verification |
| :--- | :--- | :--- |
| DOCKER-01 | Use official minimal base images | Verify base image source and tag |
| DOCKER-02 | ... | ... |
```
