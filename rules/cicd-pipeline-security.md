# CI/CD Pipeline Security (CICD)

> Source: OWASP Top 10 CI/CD Security Risks & SLSA Framework

## Principles
CI/CD Pipeline Security protects the "software factory" itself. It ensures that the pipeline cannot be manipulated to inject malicious code, exfiltrate secrets, or bypass deployment controls. The focus is on pipeline integrity, runner isolation, and strict access governance.

## Checklist Rules

### Pipeline Integrity & Configuration
* **[CICD-01]** **Pipeline as Code:** Define all pipeline configurations (e.g., `.github/workflows`, `Jenkinsfile`) in version control.
    * Restrict write access to these definition files to prevents attackers from modifying build steps (e.g., adding a "curl | bash" command).
* **[CICD-02]** **Third-Party Actions/Plugins:** Pin all third-party actions, plugins, and images to a specific commit SHA (e.g., `uses: actions/checkout@a12b...`) rather than a mutable tag (e.g., `@v2`).
    * This prevents supply chain attacks if the plugin author's account is compromised.
* **[CICD-03]** **Input Validation:** Validate all input variables and parameters triggered by users (e.g., "workflow_dispatch" inputs) to prevent Command Injection in build scripts.

### Runner Security
* **[CICD-04]** **Ephemeral Runners:** Prefer ephemeral (short-lived) runners that start fresh for each job and are destroyed immediately after.
    * This mitigates persistence if a build is compromised.
* **[CICD-05]** **Runner Isolation:** Do not run builds on the production server itself.
    * Ensure runners operate in isolated environments (containers/VMs) with no direct network access to sensitive internal production systems.
* **[CICD-06]** **Non-Root Execution:** Configure build agents/runners to execute jobs as a non-privileged user, not `root` or `Administrator`.

### Secrets in Pipelines
* **[CICD-07]** **Secret Injection:** Never store secrets in the repository code or configuration files.
    * Inject them only at runtime via the CI platform's encrypted secrets manager (e.g., GitHub Secrets, GitLab Variables).
* **[CICD-08]** **Log Masking:** Ensure the CI platform is configured to mask/redact known secrets in the console output logs.
* **[CICD-09]** **Token Permissions:** Restrict the default `GITHUB_TOKEN` (or equivalent) permissions to read-only (`contents: read`).
    * Explicitly grant write permissions only where strictly necessary.

### Access Control & Governance
* **[CICD-10]** **Branch Protection:** Enforce branch protection rules on main/release branches.
    * Require at least one (preferably two) code review approvals.
    * Require status checks (tests, linting, security scans) to pass before merging.
* **[CICD-11]** **Fork Protection:** Do not automatically pass secrets to builds triggered from forked repositories (public PRs).
    * Require manual approval to run workflows on external contributions.
* **[CICD-12]** **Audit Trails:** Enable and monitor audit logs for all pipeline activities, including workflow modifications, forced pushes (if allowed), and secret access.