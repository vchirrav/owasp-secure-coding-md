# Database Security (DB)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Database security protects data stores from unauthorized access, injection attacks, and misconfiguration. It emphasizes parameterized queries, least privilege, secure credentials, and hardened database configurations.

## Checklist Rules

### [DB-01] Use Parameterized Queries
**Identity:** DB-01
**Rule:** Use strongly typed parameterized queries for all database access.
**Rationale:** Parameterization prevents SQL injection by separating code from data.
**Implementation:** Use prepared statements or ORM parameter binding.
**Verification:** Review database calls for string concatenation of user input.
**Examples:**
1. Do: Use prepared statements with bound parameters.
2. Don't: Build SQL with string concatenation.

### [DB-02] Validate Inputs and Encode Outputs
**Identity:** DB-02
**Rule:** Validate inputs and encode outputs; do not execute DB commands on validation failure.
**Rationale:** Validation reduces injection risk and prevents malformed data.
**Implementation:** Apply allowlist validation; reject invalid characters and lengths.
**Verification:** Test with SQL meta characters and confirm rejection.
**Examples:**
1. Do: Reject invalid input before DB execution.
2. Don't: Run queries on unvalidated input.

### [DB-03] Use Strongly Typed Variables
**Identity:** DB-03
**Rule:** Ensure variables used in queries are strongly typed.
**Rationale:** Type enforcement reduces injection and data integrity errors.
**Implementation:** Use typed parameters and strict schema constraints.
**Verification:** Confirm parameter types are enforced by APIs and DB schema.
**Examples:**
1. Do: Use integer parameters for numeric IDs.
2. Don't: Treat all inputs as strings.

### [DB-04] Use Stored Procedures When Appropriate
**Identity:** DB-04
**Rule:** Use stored procedures to abstract data access and reduce direct table permissions.
**Rationale:** Stored procedures can restrict access and enforce logic centrally.
**Implementation:** Limit permissions to stored procedures and remove base table access.
**Verification:** Ensure app accounts lack direct table privileges when using procedures.
**Examples:**
1. Do: Grant execute on procedures only.
2. Don't: Grant broad table access to the app user.

### [DB-05] Apply Least Privilege for DB Access
**Identity:** DB-05
**Rule:** Use the lowest possible privilege level for database access.
**Rationale:** Limits the impact of compromised credentials.
**Implementation:** Create dedicated roles with minimal permissions.
**Verification:** Review DB roles and permissions for least privilege.
**Examples:**
1. Do: Restrict write access to only necessary tables.
2. Don't: Use a single admin user for all DB operations.

### [DB-06] Use Secure Database Credentials
**Identity:** DB-06
**Rule:** Use strong, unique credentials for database accounts.
**Rationale:** Weak credentials allow unauthorized access.
**Implementation:** Use strong passwords or integrated authentication; rotate regularly.
**Verification:** Audit credential strength and rotation policies.
**Examples:**
1. Do: Use strong passwords or IAM-based auth.
2. Don't: Reuse credentials across environments.

### [DB-07] Separate Credentials by Trust Level
**Identity:** DB-07
**Rule:** Use different DB credentials for distinct trust levels (user, read-only, admin).
**Rationale:** Segregation limits privilege escalation and data exposure.
**Implementation:** Assign separate accounts or roles per access level.
**Verification:** Confirm different operations use different DB identities.
**Examples:**
1. Do: Use a read-only account for reporting.
2. Don't: Use admin credentials for all operations.

### [DB-08] Secure Connection Strings
**Identity:** DB-08
**Rule:** Do not hardcode connection strings; store them securely and encrypt them.
**Rationale:** Exposed connection strings enable database compromise.
**Implementation:** Use secret managers or encrypted config stores.
**Verification:** Scan code for hardcoded connection strings.
**Examples:**
1. Do: Store connection strings in a vault.
2. Don't: Commit connection strings to source control.

### [DB-09] Close Connections Promptly
**Identity:** DB-09
**Rule:** Close database connections as soon as possible.
**Rationale:** Reduces resource exhaustion and risk of leaked connections.
**Implementation:** Use connection pooling with proper disposal.
**Verification:** Monitor connection usage and leaks.
**Examples:**
1. Do: Use `using`/`try-finally` to close connections.
2. Don't: Keep connections open across requests.

### [DB-10] Remove or Change Default Admin Passwords
**Identity:** DB-10
**Rule:** Change default administrative credentials and enforce strong auth.
**Rationale:** Default credentials are widely known and easily abused.
**Implementation:** Disable default accounts or require password change at setup.
**Verification:** Confirm default accounts cannot authenticate.
**Examples:**
1. Do: Disable vendor default admin users.
2. Don't: Leave default admin credentials unchanged.

### [DB-11] Disable Unnecessary DB Features
**Identity:** DB-11
**Rule:** Turn off unnecessary database features and services.
**Rationale:** Reduces attack surface and exposure.
**Implementation:** Remove unused modules, stored procedures, and services.
**Verification:** Audit enabled features and compare against requirements.
**Examples:**
1. Do: Disable unused procedural languages or extensions.
2. Don't: Leave sample or unused services enabled.

### [DB-12] Remove Default Vendor Content
**Identity:** DB-12
**Rule:** Remove unnecessary default schemas and sample content.
**Rationale:** Sample content can expose vulnerabilities or attack paths.
**Implementation:** Delete unused schemas, tables, and demo data.
**Verification:** Ensure no sample databases remain in production.
**Examples:**
1. Do: Remove sample schemas after installation.
2. Don't: Keep demo data in production.

### [DB-13] Disable Unused Default Accounts
**Identity:** DB-13
**Rule:** Disable default accounts not required for business needs.
**Rationale:** Default accounts are common entry points for attackers.
**Implementation:** Disable or remove unused accounts immediately after setup.
**Verification:** Audit accounts and confirm unused defaults are disabled.
**Examples:**
1. Do: Disable unused service accounts.
2. Don't: Leave vendor default accounts active.
