# Secrets Management (SECRET)

> Source: OWASP Secrets Management Cheat Sheet & Industry Best Practices

## Principles
Secrets management protects credentials, tokens, and keys throughout their lifecycle. It prevents secret sprawl and ensures secrets are stored, accessed, rotated, and audited securely.

## Checklist Rules

### [SECRET-01] Never Commit Secrets to Version Control
**Identity:** SECRET-01
**Rule:** Secrets must never appear in commit history, branches, or tags.
**Rationale:** Version control is long-lived and widely accessible.
**Implementation:** Use secret scanning and immediate removal if leaked.
**Verification:** Scan repositories for secrets and verify history is clean.
**Examples:**
1. Do: Use pre-commit secret scanning.
2. Don't: Commit `.env` files with secrets.

### [SECRET-02] Avoid Hardcoding Secrets
**Identity:** SECRET-02
**Rule:** Do not hardcode secrets in source code, configs, or comments.
**Rationale:** Hardcoded secrets are easy to leak and hard to rotate.
**Implementation:** Use secret managers or injected runtime secrets.
**Verification:** Scan code for secret patterns.
**Examples:**
1. Do: Retrieve secrets from a vault at runtime.
2. Don't: Store API keys in source files.

### [SECRET-03] Exclude Local Secret Files from Repos
**Identity:** SECRET-03
**Rule:** Use `.gitignore` (or equivalent) to exclude local secret files.
**Rationale:** Prevents accidental commits of local configs with secrets.
**Implementation:** Add `.env`, local configs, and key files to ignore lists.
**Verification:** Ensure ignored files are not tracked.
**Examples:**
1. Do: Ignore `.env` and `config.local.*`.
2. Don't: Track local secret files in VCS.

### [SECRET-04] Use Centralized Secret Managers
**Identity:** SECRET-04
**Rule:** Store secrets in a dedicated secret manager.
**Rationale:** Secret managers provide encryption, access controls, and audit logs.
**Implementation:** Use Vault, AWS Secrets Manager, Azure Key Vault, or similar.
**Verification:** Confirm secrets are not stored in plaintext files.
**Examples:**
1. Do: Store DB credentials in a secret manager.
2. Don't: Store secrets in shared files.

### [SECRET-05] Inject Secrets at Runtime
**Identity:** SECRET-05
**Rule:** Inject secrets at runtime rather than baking them into artifacts.
**Rationale:** Embedded secrets in images or binaries are hard to rotate.
**Implementation:** Use environment variables, mounted files, or secret APIs.
**Verification:** Inspect build artifacts for embedded secrets.
**Examples:**
1. Do: Mount secrets as runtime volumes.
2. Don't: Bake secrets into Docker images.

### [SECRET-06] Avoid Unencrypted Shared Environment Variables
**Identity:** SECRET-06
**Rule:** Do not store secrets in unencrypted shared environment variables or logs.
**Rationale:** Shared systems expose environment variables to many users.
**Implementation:** Use secret manager integration and avoid printing env vars.
**Verification:** Check CI/CD settings for unmasked secret exposure.
**Examples:**
1. Do: Use masked secret variables in CI.
2. Don't: Print secret env vars to logs.

### [SECRET-07] Encrypt Secrets at Rest and in Transit
**Identity:** SECRET-07
**Rule:** Encrypt secrets both at rest and in transit.
**Rationale:** Prevents exposure if storage or transport is compromised.
**Implementation:** Use TLS for retrieval and KMS encryption at rest.
**Verification:** Confirm encryption settings in secret stores.
**Examples:**
1. Do: Use TLS and KMS-backed storage.
2. Don't: Store secrets unencrypted.

### [SECRET-08] Prevent Secret Logging
**Identity:** SECRET-08
**Rule:** Do not log secrets or sensitive tokens.
**Rationale:** Logs are often accessible and long-lived.
**Implementation:** Redact or mask secret values in logs.
**Verification:** Scan logs for secret patterns.
**Examples:**
1. Do: Mask tokens in application logs.
2. Don't: Log API keys or passwords.

### [SECRET-09] Use Separate Secrets per Environment
**Identity:** SECRET-09
**Rule:** Use different secrets for dev, staging, and production.
**Rationale:** Limits blast radius of lower environment compromise.
**Implementation:** Manage environment-specific secret scopes.
**Verification:** Confirm secrets are not shared across environments.
**Examples:**
1. Do: Use separate DB credentials per environment.
2. Don't: Reuse production secrets in development.

### [SECRET-10] Rotate Secrets Regularly
**Identity:** SECRET-10
**Rule:** Rotate secrets based on a defined policy.
**Rationale:** Reduces exposure window for leaked secrets.
**Implementation:** Automate rotation where possible.
**Verification:** Review rotation schedules and last rotation dates.
**Examples:**
1. Do: Rotate database credentials regularly.
2. Don't: Use static secrets indefinitely.

### [SECRET-11] Revoke Exposed Secrets Immediately
**Identity:** SECRET-11
**Rule:** Revoke secrets immediately if exposure is suspected.
**Rationale:** Rotation alone may not stop active abuse.
**Implementation:** Disable compromised credentials and issue replacements.
**Verification:** Ensure incident response includes immediate revocation.
**Examples:**
1. Do: Revoke leaked API keys immediately.
2. Don't: Wait for scheduled rotation after a leak.

### [SECRET-12] Prefer Dynamic, Short-Lived Secrets
**Identity:** SECRET-12
**Rule:** Use short-lived, dynamically generated secrets when supported.
**Rationale:** Limits exposure window and reduces reuse.
**Implementation:** Use dynamic DB credentials or temporary tokens.
**Verification:** Confirm secrets expire automatically.
**Examples:**
1. Do: Use short-lived tokens for service access.
2. Don't: Use static credentials when dynamic options exist.

### [SECRET-13] Enforce Least-Privilege Access
**Identity:** SECRET-13
**Rule:** Grant access to secrets on a need-to-know basis.
**Rationale:** Limits exposure if a service is compromised.
**Implementation:** Use IAM policies scoped to specific secrets.
**Verification:** Audit secret access policies.
**Examples:**
1. Do: Give services access only to required secrets.
2. Don't: Grant broad access to all secrets.

### [SECRET-14] Audit Secret Access
**Identity:** SECRET-14
**Rule:** Log and audit all secret access events.
**Rationale:** Provides accountability and detects misuse.
**Implementation:** Enable audit logging in secret managers.
**Verification:** Confirm audit logs capture access and changes.
**Examples:**
1. Do: Alert on unusual secret access patterns.
2. Don't: Leave secret access unmonitored.

### [SECRET-15] Scan for Secrets Locally
**Identity:** SECRET-15
**Rule:** Implement secret scanning in developer workflows.
**Rationale:** Prevents accidental secret commits early.
**Implementation:** Use pre-commit hooks or IDE plugins.
**Verification:** Ensure local scans run before commits.
**Examples:**
1. Do: Use pre-commit secret scanners.
2. Don't: Rely only on manual reviews.

### [SECRET-16] Scan for Secrets in CI/CD
**Identity:** SECRET-16
**Rule:** Implement continuous secret scanning in CI/CD pipelines.
**Rationale:** Catches leaks that bypass local checks.
**Implementation:** Run secret scanning as part of CI gates.
**Verification:** Confirm CI blocks builds on detected secrets.
**Examples:**
1. Do: Fail builds when secrets are detected.
2. Don't: Allow secret scans to be optional.
