# Output Encoding (OUT)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Output encoding transforms untrusted data into safe representations for the target interpreter (HTML, JavaScript, SQL, XML, etc.). It is critical for preventing XSS and injection vulnerabilities.

## Checklist Rules

### [OUT-01] Encode on Trusted Systems
**Identity:** OUT-01
**Rule:** Perform output encoding on trusted systems (server-side).
**Rationale:** Client-side encoding can be bypassed or disabled.
**Implementation:** Encode output before sending responses.
**Verification:** Confirm encoding occurs server-side in response generation.
**Examples:**
1. Do: Encode HTML output in server templates.
2. Don't: Rely on client-side encoding for security.

### [OUT-02] Use Standard Encoding Routines
**Identity:** OUT-02
**Rule:** Use standard, tested encoding routines per context.
**Rationale:** Custom encoders are error-prone and incomplete.
**Implementation:** Use framework or library-provided encoding functions.
**Verification:** Review code for custom encoding implementations.
**Examples:**
1. Do: Use built-in HTML escaping in templates.
2. Don't: Write ad hoc string replacements for encoding.

### [OUT-03] Encode All Untrusted Data
**Identity:** OUT-03
**Rule:** Contextually encode all output derived from untrusted sources.
**Rationale:** Untrusted data can contain malicious payloads.
**Implementation:** Apply context-aware encoding in templates, JSON, JS, and URLs.
**Verification:** Trace untrusted data to output sinks and confirm encoding.
**Examples:**
1. Do: HTML-encode user input in rendered pages.
2. Don't: Render raw user data in HTML.

### [OUT-04] Encode All Characters Unless Safe
**Identity:** OUT-04
**Rule:** Encode all characters unless explicitly safe for the output context.
**Rationale:** Unsafe characters can break out of context and inject code.
**Implementation:** Use encoding routines that default to encoding all unsafe characters.
**Verification:** Verify unsafe characters are encoded correctly.
**Examples:**
1. Do: Encode `<`, `>`, `"`, `'` in HTML.
2. Don't: Allow raw special characters in output contexts.

### [OUT-05] Sanitize for SQL/XML/LDAP Contexts
**Identity:** OUT-05
**Rule:** Contextually sanitize output for SQL, XML, and LDAP queries.
**Rationale:** Improper handling leads to injection attacks.
**Implementation:** Use parameterized queries and context-aware escaping.
**Verification:** Ensure untrusted data is not concatenated into queries.
**Examples:**
1. Do: Use prepared statements for SQL queries.
2. Don't: Concatenate user input into query strings.

### [OUT-06] Sanitize Output to OS Commands
**Identity:** OUT-06
**Rule:** Sanitize untrusted data passed to OS commands or avoid it entirely.
**Rationale:** OS command injection can lead to full system compromise.
**Implementation:** Avoid shell execution with untrusted inputs; use safe APIs.
**Verification:** Scan for `exec` or shell usage with user data.
**Examples:**
1. Do: Use native APIs instead of shelling out.
2. Don't: Pass untrusted input into shell commands.
