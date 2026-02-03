# General Coding Practices (GEN)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1 & Industry Best Practices

## Principles
General secure coding practices establish baseline safeguards across all code. They emphasize secure defaults, least privilege, defense in depth, and avoidance of risky patterns that commonly lead to vulnerabilities.

## Checklist Rules

### [GEN-01] Use Secure Defaults
**Identity:** GEN-01
**Rule:** Configure defaults to the most secure option and require explicit opt-in for weaker behavior.
**Rationale:** Insecure defaults often persist in production and are exploited.
**Implementation:** Disable debug mode, enforce TLS, and require authentication by default.
**Verification:** Review configuration defaults for insecure settings.
**Examples:**
1. Do: Default to deny access unless explicitly allowed.
2. Don't: Enable debug or permissive settings in production.

### [GEN-02] Minimize Attack Surface
**Identity:** GEN-02
**Rule:** Remove unused features, endpoints, and code paths.
**Rationale:** Unused functionality is often unmaintained and vulnerable.
**Implementation:** Disable unnecessary features and delete dead code.
**Verification:** Audit for unused routes, flags, and services.
**Examples:**
1. Do: Remove deprecated endpoints.
2. Don't: Leave unused features enabled.

### [GEN-03] Apply Least Privilege
**Identity:** GEN-03
**Rule:** Run code and services with the minimum privileges required.
**Rationale:** Limits impact if code is compromised.
**Implementation:** Use least-privilege service accounts and OS permissions.
**Verification:** Review runtime permissions and access scopes.
**Examples:**
1. Do: Use read-only access for read-only operations.
2. Don't: Run services as admin or root without need.

### [GEN-04] Validate Inputs Early
**Identity:** GEN-04
**Rule:** Validate all inputs at the boundaries of your system.
**Rationale:** Prevents injection and malformed data from entering core logic.
**Implementation:** Use allowlists and strict schema validation.
**Verification:** Test with malformed and malicious inputs.
**Examples:**
1. Do: Validate input length and format on entry.
2. Don't: Trust user-provided input anywhere.

### [GEN-05] Encode Outputs Safely
**Identity:** GEN-05
**Rule:** Encode or escape outputs based on the target context.
**Rationale:** Prevents XSS and injection in downstream systems.
**Implementation:** Use context-aware encoding libraries.
**Verification:** Confirm output encoding in HTML, JS, SQL, and logs.
**Examples:**
1. Do: HTML-encode untrusted output.
2. Don't: Render raw user input in HTML.

### [GEN-06] Avoid Insecure APIs and Patterns
**Identity:** GEN-06
**Rule:** Avoid dangerous functions such as `eval`, unsafe deserialization, and shell execution.
**Rationale:** These functions are common sources of RCE and injection.
**Implementation:** Use safe libraries and avoid dynamic code execution.
**Verification:** Scan code for unsafe APIs and usage.
**Examples:**
1. Do: Use safe parsing libraries.
2. Don't: Execute user input as code or shell commands.

### [GEN-07] Use Vetted Libraries
**Identity:** GEN-07
**Rule:** Use well-maintained, reputable libraries rather than custom implementations.
**Rationale:** Reputable libraries are more likely to be secure and audited.
**Implementation:** Prefer standard libraries and actively maintained dependencies.
**Verification:** Review dependency health and update cadence.
**Examples:**
1. Do: Use established cryptography and auth libraries.
2. Don't: Roll your own security-critical logic.

### [GEN-08] Handle Errors Securely
**Identity:** GEN-08
**Rule:** Fail securely and avoid exposing internal details in error messages.
**Rationale:** Error leakage helps attackers and can bypass controls.
**Implementation:** Use centralized error handling and generic messages.
**Verification:** Trigger errors and confirm safe responses.
**Examples:**
1. Do: Return generic error messages to users.
2. Don't: Expose stack traces in responses.

### [GEN-09] Protect Secrets
**Identity:** GEN-09
**Rule:** Never hardcode secrets; store and access them securely.
**Rationale:** Hardcoded secrets leak easily and are hard to rotate.
**Implementation:** Use secret managers and restrict access.
**Verification:** Scan code and configs for secrets.
**Examples:**
1. Do: Use a secret manager or KMS.
2. Don't: Commit API keys to source control.

### [GEN-10] Implement Defense in Depth
**Identity:** GEN-10
**Rule:** Use multiple layers of controls (validation, auth, logging, monitoring).
**Rationale:** No single control is sufficient against attacks.
**Implementation:** Combine preventative and detective controls.
**Verification:** Confirm layered controls for critical flows.
**Examples:**
1. Do: Use auth, rate limiting, and monitoring together.
2. Don't: Rely on a single control for critical security.

### [GEN-11] Keep Dependencies Updated and Pinned
**Identity:** GEN-11
**Rule:** Keep dependencies patched and pin versions to prevent unexpected changes.
**Rationale:** Vulnerable dependencies are a common compromise vector.
**Implementation:** Use dependency scanning and automated updates.
**Verification:** Review dependency versions and CVE status.
**Examples:**
1. Do: Use dependency scanning tools.
2. Don't: Allow unpinned or outdated dependencies.

### [GEN-12] Test and Review Security-Critical Code
**Identity:** GEN-12
**Rule:** Require code review and testing for security-critical changes.
**Rationale:** Reviews and tests catch issues that automated tools miss.
**Implementation:** Use peer review, security testing, and threat modeling for sensitive changes.
**Verification:** Ensure security-critical PRs require review.
**Examples:**
1. Do: Require security review for auth changes.
2. Don't: Merge security-critical code without review.
