# Data Protection (DATA)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Data protection focuses on confidentiality and integrity of sensitive data at rest and in transit. It requires least privilege access, secure storage, controlled retention, and prevention of leakage through client-side exposure or logs.

## Checklist Rules

### [DATA-01] Enforce Least Privilege
**Identity:** DATA-01
**Rule:** Restrict users to the minimum data and functions required for their tasks.
**Rationale:** Excess privileges increase the impact of account compromise.
**Implementation:** Define roles with least privilege and enforce per-resource authorization.
**Verification:** Review role permissions and test unauthorized access attempts.
**Examples:**
1. Do: Provide read-only access where write access is unnecessary.
2. Don't: Grant broad access to all data by default.

### [DATA-02] Protect and Purge Temporary Data
**Identity:** DATA-02
**Rule:** Protect cached or temporary sensitive data and purge it when no longer needed.
**Rationale:** Temporary data often escapes normal controls and persists unexpectedly.
**Implementation:** Encrypt temp data, restrict access, and define retention policies.
**Verification:** Audit temp storage locations and confirm cleanup jobs run.
**Examples:**
1. Do: Encrypt temp files and delete them after processing.
2. Don't: Leave sensitive cache files indefinitely.

### [DATA-03] Encrypt Sensitive Data at Rest
**Identity:** DATA-03
**Rule:** Encrypt highly sensitive stored information, including authentication data.
**Rationale:** Encryption limits exposure if storage is compromised.
**Implementation:** Use strong, vetted algorithms and key management.
**Verification:** Verify encryption is enabled and keys are protected.
**Examples:**
1. Do: Encrypt sensitive fields with AES-GCM.
2. Don't: Store authentication secrets in plaintext.

### [DATA-04] Enforce Access Controls on Stored Data
**Identity:** DATA-04
**Rule:** Implement strict access controls for sensitive server-side data.
**Rationale:** Unauthorized access to stored data is a common breach vector.
**Implementation:** Apply ACLs, RBAC, and separation of duties to data stores.
**Verification:** Attempt access with non-privileged accounts and verify denial.
**Examples:**
1. Do: Restrict database accounts to required tables.
2. Don't: Use shared admin accounts for data access.

### [DATA-05] Support Secure Data Removal
**Identity:** DATA-05
**Rule:** Provide mechanisms to delete sensitive data when no longer needed.
**Rationale:** Retaining unnecessary data increases breach impact and compliance risk.
**Implementation:** Implement deletion workflows and retention schedules.
**Verification:** Confirm data is removed from primary and backup stores when required.
**Examples:**
1. Do: Implement data retention and deletion policies.
2. Don't: Keep personal data indefinitely.

### [DATA-06] Avoid Sensitive Data in Client Storage
**Identity:** DATA-06
**Rule:** Never store passwords or sensitive secrets in client-side storage or code.
**Rationale:** Client storage can be read or modified by attackers.
**Implementation:** Keep secrets server-side; use secure cookies or tokens as needed.
**Verification:** Inspect client code for embedded secrets.
**Examples:**
1. Do: Store secrets in a server-side vault.
2. Don't: Embed credentials in compiled client code.

### [DATA-07] Disable Autocomplete for Sensitive Fields
**Identity:** DATA-07
**Rule:** Disable autocomplete for sensitive form fields in high-risk contexts.
**Rationale:** Autocomplete can expose sensitive data on shared devices.
**Implementation:** Use appropriate `autocomplete` attributes for sensitive inputs.
**Verification:** Verify browsers do not store or auto-fill sensitive fields.
**Examples:**
1. Do: Disable autocomplete for banking details on shared terminals.
2. Don't: Allow autofill for high-risk data on public devices.

### [DATA-08] Disable Client-Side Caching for Sensitive Pages
**Identity:** DATA-08
**Rule:** Disable caching for pages containing sensitive information.
**Rationale:** Cached content can be accessed by unauthorized users.
**Implementation:** Use `Cache-Control: no-store` and `Pragma: no-cache` where needed.
**Verification:** Confirm sensitive pages are not cached by the browser.
**Examples:**
1. Do: Set `Cache-Control: no-store` for account pages.
2. Don't: Cache pages containing PII or secrets.

### [DATA-09] Protect Server-Side Source Code
**Identity:** DATA-09
**Rule:** Prevent server-side source code from being downloaded.
**Rationale:** Source exposure reveals security logic and vulnerabilities.
**Implementation:** Configure servers to avoid source disclosure and disable directory listing.
**Verification:** Attempt to access source files from the web and confirm denial.
**Examples:**
1. Do: Serve only compiled/packaged assets.
2. Don't: Expose `.env` or source files via web server.

### [DATA-10] Remove Sensitive Comments from Production Code
**Identity:** DATA-10
**Rule:** Remove comments that expose sensitive details in production.
**Rationale:** Comments can reveal infrastructure, secrets, or logic paths.
**Implementation:** Strip comments during build or review for sensitive content.
**Verification:** Scan production assets for sensitive comments.
**Examples:**
1. Do: Remove debug comments before release.
2. Don't: Leave credentials or IPs in comments.

### [DATA-11] Remove Unnecessary Documentation from Production
**Identity:** DATA-11
**Rule:** Remove unnecessary application or system documentation from production environments.
**Rationale:** Excess documentation helps attackers map systems.
**Implementation:** Restrict access to internal docs and remove from public hosts.
**Verification:** Confirm documentation is not publicly accessible.
**Examples:**
1. Do: Keep internal docs in private repositories.
2. Don't: Publish internal system docs on public servers.

### [DATA-12] Avoid Sensitive Data in URLs
**Identity:** DATA-12
**Rule:** Do not include sensitive information in HTTP GET parameters.
**Rationale:** URLs are logged, cached, and leaked via referrers.
**Implementation:** Use POST bodies or secure headers for sensitive data.
**Verification:** Check logs and URLs for sensitive parameters.
**Examples:**
1. Do: Send tokens in headers or POST bodies.
2. Don't: Put session IDs in query strings.
