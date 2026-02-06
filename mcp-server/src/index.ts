import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

// Resolve rules directory: check sibling `rules/` first (Docker), then parent `../rules/` (local dev)
function resolveRulesDir(): string {
  const candidates = [
    join(process.cwd(), "rules"),
    join(import.meta.dirname, "..", "..", "rules"),
    join(import.meta.dirname, "..", "rules"),
  ];
  for (const dir of candidates) {
    try {
      const entries = readdirSync(dir);
      if (entries.some((e) => e.endsWith(".md"))) return dir;
    } catch {
      // not found, try next
    }
  }
  throw new Error(
    `Rules directory not found. Searched: ${candidates.join(", ")}`
  );
}

const RULES_DIR = resolveRulesDir();

// Rule catalog — maps prefix to filename and description
const RULE_CATALOG: Array<{
  prefix: string;
  filename: string;
  domain: string;
  description: string;
}> = [
  { prefix: "INPUT", filename: "input-validation.md", domain: "input-validation", description: "XSS, injection, sanitization" },
  { prefix: "OUT", filename: "output-encoding.md", domain: "output-encoding", description: "XSS prevention, context-aware encoding" },
  { prefix: "AUTH", filename: "authentication-password-mgmt.md", domain: "authentication-password-mgmt", description: "Login, passwords, MFA" },
  { prefix: "SESS", filename: "session-management.md", domain: "session-management", description: "Cookies, session IDs, CSRF" },
  { prefix: "AC", filename: "access-control.md", domain: "access-control", description: "RBAC, IDOR, authorization" },
  { prefix: "API", filename: "api-security.md", domain: "api-security", description: "BOLA, BOPLA, BFLA, JWT, rate limiting" },
  { prefix: "DOCKER", filename: "dockerfile-security.md", domain: "dockerfile-security", description: "Image hardening, rootless, secrets" },
  { prefix: "K8S", filename: "cloud-native-k8s.md", domain: "cloud-native-k8s", description: "Pod security, network policies, RBAC" },
  { prefix: "CICD", filename: "cicd-pipeline-security.md", domain: "cicd-pipeline-security", description: "Pipeline integrity, runners" },
  { prefix: "CHAIN", filename: "software-supply-chain.md", domain: "software-supply-chain", description: "SCA, SBOM, SLSA, artifact signing" },
  { prefix: "SECRET", filename: "secrets-management.md", domain: "secrets-management", description: "Vaults, env vars, rotation" },
  { prefix: "IAC", filename: "iac-security.md", domain: "iac-security", description: "Terraform, CloudFormation, policy-as-code" },
  { prefix: "CLIENT", filename: "client-side-security.md", domain: "client-side-security", description: "CSP, headers, DOM safety, SRI" },
  { prefix: "CRYP", filename: "cryptographic-practices.md", domain: "cryptographic-practices", description: "Encryption, hashing, key management" },
  { prefix: "COM", filename: "communication-security.md", domain: "communication-security", description: "TLS/HTTPS, certificate validation" },
  { prefix: "DB", filename: "database-security.md", domain: "database-security", description: "Parameterized queries, SQL injection" },
  { prefix: "FILE", filename: "file-management.md", domain: "file-management", description: "Uploads, LFI/RFI, path traversal" },
  { prefix: "DATA", filename: "data-protection.md", domain: "data-protection", description: "Encryption at rest, PII handling" },
  { prefix: "ERR", filename: "error-handling-logging.md", domain: "error-handling-logging", description: "Logging, audit trails, debug info" },
  { prefix: "MEM", filename: "memory-management.md", domain: "memory-management", description: "Buffer overflows, resource leaks" },
  { prefix: "GEN", filename: "general-coding-practices.md", domain: "general-coding-practices", description: "Secure defaults, least privilege" },
  { prefix: "SYS", filename: "system-configuration.md", domain: "system-configuration", description: "Server hardening, patching" },
];

function readRuleFile(filename: string): string {
  return readFileSync(join(RULES_DIR, filename), "utf-8");
}

/**
 * Extract a single rule section by ID (e.g., "INPUT-01") from a markdown file.
 * Looks for ### [INPUT-01] headings and returns everything until the next ### or EOF.
 */
function extractRuleById(content: string, ruleId: string): string | null {
  const escaped = ruleId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^### \\[${escaped}\\].*$`,
    "m"
  );
  const match = pattern.exec(content);
  if (!match) return null;

  const start = match.index;
  // Find the next ### heading or end of string
  const rest = content.slice(start + match[0].length);
  const nextHeading = rest.search(/^### \[/m);
  const end = nextHeading === -1 ? content.length : start + match[0].length + nextHeading;

  return content.slice(start, end).trim();
}

/**
 * Parse a rule file into a checklist of { ruleId, rule, verification } entries.
 */
function parseChecklist(
  content: string
): Array<{ ruleId: string; rule: string; verification: string }> {
  const results: Array<{ ruleId: string; rule: string; verification: string }> = [];
  const headingPattern = /^### \[([A-Z0-9]+-\d+)\]\s+(.*)$/gm;

  let match;
  while ((match = headingPattern.exec(content)) !== null) {
    const ruleId = match[1];
    const start = match.index + match[0].length;

    // Find next heading or EOF to get the section body
    const remaining = content.slice(start);
    const nextHeading = remaining.search(/^### \[/m);
    const section = nextHeading === -1 ? remaining : remaining.slice(0, nextHeading);

    // Extract Rule and Verification fields
    const ruleMatch = section.match(/\*\*Rule:\*\*\s*(.*)/);
    const verificationMatch = section.match(/\*\*Verification:\*\*\s*(.*)/);

    results.push({
      ruleId,
      rule: ruleMatch ? ruleMatch[1].trim() : match[2].trim(),
      verification: verificationMatch ? verificationMatch[1].trim() : "See rule file for details",
    });
  }

  return results;
}

// --- Server Setup ---

const server = new McpServer({
  name: "owasp-secure-coding",
  version: "1.0.0",
});

// --- Resources: one per rule file ---

for (const entry of RULE_CATALOG) {
  server.resource(
    entry.domain,
    `secure-coding://rules/${entry.domain}`,
    {
      description: `${entry.prefix}: ${entry.description}`,
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: readRuleFile(entry.filename),
        },
      ],
    })
  );
}

// --- Tools ---

// 1. list_rules — no parameters
server.tool(
  "list_rules",
  "List all available OWASP secure coding rule domains with their prefixes and descriptions",
  {},
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(
          RULE_CATALOG.map(({ prefix, domain, description }) => ({
            prefix,
            domain,
            description,
          })),
          null,
          2
        ),
      },
    ],
  })
);

// 2. get_rule — accepts a rule_id (e.g., "INPUT-01") or domain (e.g., "input-validation")
server.tool(
  "get_rule",
  "Get a specific rule by ID (e.g. INPUT-01) or an entire domain file (e.g. input-validation)",
  {
    rule_id: z
      .string()
      .describe(
        'A rule ID like "INPUT-01" or a domain name like "input-validation"'
      ),
  },
  async ({ rule_id }) => {
    // Check if it looks like a rule ID (PREFIX-NN)
    const ruleIdMatch = rule_id.match(/^([A-Z0-9]+)-(\d+)$/);

    if (ruleIdMatch) {
      const prefix = ruleIdMatch[1];
      const entry = RULE_CATALOG.find((e) => e.prefix === prefix);
      if (!entry) {
        return {
          content: [
            {
              type: "text",
              text: `Unknown rule prefix: ${prefix}. Use list_rules to see available domains.`,
            },
          ],
          isError: true,
        };
      }
      const content = readRuleFile(entry.filename);
      const section = extractRuleById(content, rule_id);
      if (!section) {
        return {
          content: [
            {
              type: "text",
              text: `Rule ${rule_id} not found in ${entry.filename}.`,
            },
          ],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: section }] };
    }

    // Treat as domain name
    const domain = rule_id.toLowerCase();
    const entry = RULE_CATALOG.find((e) => e.domain === domain);
    if (!entry) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown domain: ${domain}. Use list_rules to see available domains.`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: readRuleFile(entry.filename) }],
    };
  }
);

// 3. audit_checklist — returns a structured checklist table for a given domain
server.tool(
  "audit_checklist",
  "Get a structured audit checklist (Rule ID, Rule, Verification) for a security domain",
  {
    domain: z
      .string()
      .describe(
        'A domain name like "input-validation" or "api-security"'
      ),
  },
  async ({ domain }) => {
    const entry = RULE_CATALOG.find((e) => e.domain === domain.toLowerCase());
    if (!entry) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown domain: ${domain}. Use list_rules to see available domains.`,
          },
        ],
        isError: true,
      };
    }

    const content = readRuleFile(entry.filename);
    const checklist = parseChecklist(content);

    if (checklist.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No checklist rules found in ${entry.filename}.`,
          },
        ],
        isError: true,
      };
    }

    // Build markdown table
    const header = "| Rule ID | Rule | Verification |";
    const separator = "| :--- | :--- | :--- |";
    const rows = checklist.map(
      (r) => `| ${r.ruleId} | ${r.rule} | ${r.verification} |`
    );

    return {
      content: [
        { type: "text", text: [header, separator, ...rows].join("\n") },
      ],
    };
  }
);

// --- Start server ---

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
