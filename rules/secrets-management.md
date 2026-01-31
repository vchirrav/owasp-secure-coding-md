# Secrets Management (SECRET)

> Source: OWASP Secrets Management Cheat Sheet & Industry Best Practices

## Principles
Secrets Management ensures that digital credentials (API keys, passwords, certificates, tokens) are securely stored, accessed, and managed throughout their lifecycle. The core goal is to prevent "Secret Sprawl" and ensure strict access control.

## Checklist Rules

### Storage & Source Control
* **[SECRET-01]** Never commit secrets to version control (e.g., Git, SVN).
    * Secrets must not appear in commit history, branches, or tags.
* **[SECRET-02]** Do not hardcode secrets in source code, configuration files, or inline comments.
* **[SECRET-03]** Use a `.gitignore` (or equivalent) file to exclude local configuration files containing secrets (e.g., `.env`, `config.local.js`) from the repository.
* **[SECRET-04]** Store secrets in a centralized, dedicated Secrets Manager (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, Google Secret Manager) rather than in plain text files.

### Runtime Injection & Handling
* **[SECRET-05]** Inject secrets into applications at runtime using environment variables or volume mounts from a trusted secrets manager.
    * Do not "bake" secrets into build artifacts (e.g., Docker images).
* **[SECRET-06]** Do not store secrets in unencrypted environment variables within shared platforms (e.g., CI/CD logs, unmasked pipeline variables).
* **[SECRET-07]** Ensure secrets are encrypted both at rest (in the vault) and in transit (using TLS/HTTPS) when being retrieved by the application.
* **[SECRET-08]** Prevent secrets from being written to application logs, system logs, or error traces.
    * Implement log scrubbing/masking patterns to redact potential secrets.

### Lifecycle & Rotation
* **[SECRET-09]** Use separate secrets for different environments (Development, Staging, Production).
    * Compromise of a dev secret should not impact production security.
* **[SECRET-10]** Rotate secrets regularly based on a defined policy.
    * Automate rotation where possible (e.g., database credentials).
* **[SECRET-11]** If a secret is suspected of being exposed, revoke it immediately.
    * Revocation must take precedence over rotation to stop active abuse.
* **[SECRET-12]** Use "Dynamic Secrets" (short-lived, on-demand credentials) whenever supported to minimize the window of opportunity for an attacker.

### Access Control & Auditing
* **[SECRET-13]** Grant access to secrets on a strict "Need-to-Know" / Least Privilege basis.
    * Applications should only have access to the specific secrets they require to function.
* **[SECRET-14]** Audit all access to secrets.
    * Logs should record *who* (user/service) accessed *which* secret and *when*, without logging the secret value itself.

### Detection
* **[SECRET-15]** Implement automated secret scanning in the developer workflow (e.g., pre-commit hooks) to block accidental commits of secrets.
* **[SECRET-16]** Implement continuous secret scanning in the CI/CD pipeline to detect secrets that may have bypassed local checks.