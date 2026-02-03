# CI/CD Pipeline Security (CICD)

> Source: OWASP Top 10 CI/CD Security Risks & SLSA Framework

## Principles
CI/CD security protects the software supply chain by ensuring build integrity, runner isolation, secure secret handling, and strong governance over pipeline configuration and execution.

## Checklist Rules

### [CICD-01] Manage Pipeline as Code in Version Control
**Identity:** CICD-01
**Rule:** Define all pipeline configurations in version control and restrict who can modify them.
**Rationale:** Pipeline changes can inject malicious build steps or exfiltrate secrets.
**Implementation:** Store pipeline definitions in repo; protect them with code review and branch protection.
**Verification:** Audit for direct changes to pipeline config and require approvals.
**Examples:**
1. Do: Require PR reviews for workflow file changes.
2. Don't: Allow direct edits to pipeline configs in production.

### [CICD-02] Pin Third-Party Actions and Plugins
**Identity:** CICD-02
**Rule:** Pin third-party actions, plugins, and images to immutable versions (commit SHAs or digests).
**Rationale:** Mutable tags can be hijacked, leading to supply chain compromise.
**Implementation:** Use commit SHAs for actions and digests for container images.
**Verification:** Scan pipeline configs for unpinned actions or tags.
**Examples:**
1. Do: Use `uses: org/action@<commit_sha>`.
2. Don't: Use `@latest` or floating tags.

### [CICD-03] Validate User-Provided Inputs
**Identity:** CICD-03
**Rule:** Validate all user-provided inputs to pipeline workflows.
**Rationale:** Unvalidated inputs can lead to command injection in build scripts.
**Implementation:** Use allowlists, strict types, and safe parameter handling.
**Verification:** Attempt to inject shell metacharacters and confirm rejection.
**Examples:**
1. Do: Validate input against a strict allowlist.
2. Don't: Concatenate user input into shell commands.

### [CICD-04] Prefer Ephemeral Runners
**Identity:** CICD-04
**Rule:** Use ephemeral build runners that are destroyed after each job.
**Rationale:** Persistent runners can retain attacker artifacts or secrets.
**Implementation:** Use disposable VMs or containers for each job.
**Verification:** Ensure runners are recreated for each pipeline run.
**Examples:**
1. Do: Use short-lived runners for every job.
2. Don't: Reuse long-lived build machines for sensitive pipelines.

### [CICD-05] Isolate Runners from Production
**Identity:** CICD-05
**Rule:** Keep CI/CD runners isolated from production networks and systems.
**Rationale:** Compromised build environments should not access production.
**Implementation:** Use network segmentation and least-privilege network access.
**Verification:** Confirm runners cannot reach production systems directly.
**Examples:**
1. Do: Run builds in isolated VPCs.
2. Don't: Run CI jobs on production servers.

### [CICD-06] Run Builds as Non-Root
**Identity:** CICD-06
**Rule:** Configure runners to execute jobs with non-privileged users.
**Rationale:** Limiting privileges reduces blast radius of compromised builds.
**Implementation:** Use non-root containers or restricted OS accounts.
**Verification:** Check job execution context for privileges.
**Examples:**
1. Do: Run builds as a dedicated non-root user.
2. Don't: Execute pipelines as `root` or `Administrator`.

### [CICD-07] Inject Secrets at Runtime Only
**Identity:** CICD-07
**Rule:** Never store secrets in repositories; inject them at runtime via secure secret managers.
**Rationale:** Hardcoded secrets are easily exposed and exfiltrated.
**Implementation:** Use CI secret stores with least-privilege access.
**Verification:** Scan repos for secrets and confirm runtime injection.
**Examples:**
1. Do: Use CI secret variables for credentials.
2. Don't: Commit secrets into config files.

### [CICD-08] Mask and Redact Secrets in Logs
**Identity:** CICD-08
**Rule:** Ensure CI logs redact or mask secrets.
**Rationale:** Logs are often accessible to many users and can leak secrets.
**Implementation:** Enable secret masking and scrub logs for sensitive values.
**Verification:** Trigger a pipeline and ensure secrets are masked in output.
**Examples:**
1. Do: Enable secret masking in the CI platform.
2. Don't: Print sensitive values to console output.

### [CICD-09] Minimize Token Permissions
**Identity:** CICD-09
**Rule:** Restrict default CI tokens to least privilege and elevate only when required.
**Rationale:** Over-privileged tokens increase risk if compromised.
**Implementation:** Set read-only defaults and explicitly grant write permissions per job.
**Verification:** Review token scopes for pipeline jobs.
**Examples:**
1. Do: Use read-only tokens by default.
2. Don't: Grant broad write access to all jobs.

### [CICD-10] Enforce Branch Protection
**Identity:** CICD-10
**Rule:** Enforce branch protection on main/release branches.
**Rationale:** Prevents unreviewed or insecure changes to production code.
**Implementation:** Require code review, status checks, and signed commits where possible.
**Verification:** Confirm merges require approvals and passing checks.
**Examples:**
1. Do: Require two approvals for production branches.
2. Don't: Allow force-pushes to protected branches.

### [CICD-11] Protect Workflows from Forked PRs
**Identity:** CICD-11
**Rule:** Do not automatically pass secrets to workflows triggered from forks.
**Rationale:** External contributions can exfiltrate secrets if secrets are exposed.
**Implementation:** Require manual approval for workflows from forks.
**Verification:** Ensure forked PRs cannot access secrets by default.
**Examples:**
1. Do: Require approval before running workflows on forks.
2. Don't: Expose secrets to untrusted PRs.

### [CICD-12] Enable and Monitor Audit Trails
**Identity:** CICD-12
**Rule:** Enable audit logging and monitor for pipeline changes and secret access.
**Rationale:** Visibility is required to detect and respond to attacks.
**Implementation:** Collect CI audit logs and alert on sensitive events.
**Verification:** Confirm audit logs are enabled and retained.
**Examples:**
1. Do: Alert on changes to workflow files.
2. Don't: Ignore pipeline modification events.
