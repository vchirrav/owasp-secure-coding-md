# Communication Security (COM)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Communication security protects data in transit using TLS and secure header handling. It prevents downgrade attacks, certificate misuse, and leakage of sensitive data through protocol metadata.

## Checklist Rules

### [COM-01] Encrypt All Sensitive Data in Transit
**Identity:** COM-01
**Rule:** Encrypt transmission of all sensitive information using TLS or equivalent.
**Rationale:** Unencrypted data can be intercepted or modified.
**Implementation:** Use TLS for all authenticated sessions and sensitive data; consider additional payload encryption where required.
**Verification:** Inspect traffic to confirm encryption for sensitive endpoints.
**Examples:**
1. Do: Use HTTPS for all authenticated and sensitive endpoints.
2. Don't: Send credentials or PII over HTTP.

### [COM-02] Use Valid TLS Certificates
**Identity:** COM-02
**Rule:** TLS certificates must be valid, unexpired, and match the correct domain.
**Rationale:** Invalid or mismatched certificates enable MITM attacks.
**Implementation:** Automate certificate issuance and renewal; install intermediate certs.
**Verification:** Validate cert chains and hostname matches in production.
**Examples:**
1. Do: Use automated certificate renewal.
2. Don't: Ignore certificate warnings or mismatches.

### [COM-03] Do Not Fall Back to Insecure Connections
**Identity:** COM-03
**Rule:** Failed TLS connections must not fall back to insecure protocols.
**Rationale:** Downgrade attacks exploit fallback behavior.
**Implementation:** Disable HTTP fallback and enforce TLS-only communication.
**Verification:** Force TLS failures and confirm requests are rejected.
**Examples:**
1. Do: Fail closed if TLS negotiation fails.
2. Don't: Retry over HTTP after a TLS error.

### [COM-04] Require TLS for Authenticated Content
**Identity:** COM-04
**Rule:** Use TLS for all content requiring authentication and any sensitive information.
**Rationale:** Authentication data and sessions must remain confidential.
**Implementation:** Redirect all authenticated routes to HTTPS and use HSTS.
**Verification:** Confirm no authenticated endpoint is accessible over HTTP.
**Examples:**
1. Do: Enforce HTTPS for all authenticated routes.
2. Don't: Allow mixed HTTP/HTTPS for logged-in sessions.

### [COM-05] Secure External System Connections
**Identity:** COM-05
**Rule:** Use TLS for connections to external systems handling sensitive data or functions.
**Rationale:** External links can be targeted for interception.
**Implementation:** Enforce TLS and validate certificates for outbound requests.
**Verification:** Review outbound connections for HTTPS/TLS usage.
**Examples:**
1. Do: Use TLS for API calls to payment processors.
2. Don't: Use plain TCP for sensitive integrations.

### [COM-06] Use a Standard TLS Implementation
**Identity:** COM-06
**Rule:** Use a single, standard TLS library configured with secure defaults.
**Rationale:** Multiple TLS stacks lead to inconsistent security and configuration drift.
**Implementation:** Centralize TLS configuration and disable deprecated protocols/ciphers.
**Verification:** Audit TLS settings across services and ensure consistency.
**Examples:**
1. Do: Use a shared TLS configuration module.
2. Don't: Configure TLS differently in each service.

### [COM-07] Specify Character Encodings
**Identity:** COM-07
**Rule:** Specify character encodings for all connections.
**Rationale:** Ambiguous encodings can lead to misinterpretation and injection.
**Implementation:** Set `Content-Type` with explicit charset (e.g., UTF-8).
**Verification:** Confirm responses include charset where applicable.
**Examples:**
1. Do: Set `Content-Type: text/html; charset=utf-8`.
2. Don't: Rely on browser autodetection.

### [COM-08] Prevent Referrer Leakage of Sensitive Data
**Identity:** COM-08
**Rule:** Filter or avoid sending sensitive parameters in referrer headers.
**Rationale:** Referrers can leak tokens or PII to third parties.
**Implementation:** Avoid sensitive data in URLs; set a strict referrer policy.
**Verification:** Inspect referrer headers for sensitive values.
**Examples:**
1. Do: Use POST bodies for sensitive data.
2. Don't: Embed tokens in query parameters.
