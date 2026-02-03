# Infrastructure as Code (IaC) Security (IAC)

> Source: CIS Benchmarks, HashiCorp Security Best Practices, & OPA

## Principles
IaC security ensures infrastructure is provisioned securely, consistently, and auditable. It focuses on protecting state, preventing misconfigurations, enforcing least privilege, and detecting drift.

## Checklist Rules

### [IAC-01] Encrypt State Files
**Identity:** IAC-01
**Rule:** Encrypt IaC state files and templates at rest.
**Rationale:** State files often contain sensitive data and resource identifiers.
**Implementation:** Use encrypted remote backends (e.g., S3 with SSE) instead of local state.
**Verification:** Confirm state storage has encryption enabled.
**Examples:**
1. Do: Store Terraform state in encrypted remote storage.
2. Don't: Keep unencrypted state files on developer laptops.

### [IAC-02] Enable State Locking
**Identity:** IAC-02
**Rule:** Enable state locking to prevent concurrent modifications.
**Rationale:** Concurrent writes can corrupt state and cause unintended changes.
**Implementation:** Use backend locking (e.g., DynamoDB for Terraform).
**Verification:** Attempt concurrent changes and confirm lock enforcement.
**Examples:**
1. Do: Enable locking on shared state.
2. Don't: Allow multiple simultaneous applies.

### [IAC-03] Restrict State Backend Access
**Identity:** IAC-03
**Rule:** Limit access to state backends to CI/CD and authorized admins.
**Rationale:** State files expose sensitive infra details.
**Implementation:** Enforce IAM policies and audit access to state.
**Verification:** Ensure only authorized roles can read state.
**Examples:**
1. Do: Restrict state access to pipeline roles.
2. Don't: Allow broad read access to state files.

### [IAC-04] Avoid Hardcoded Secrets
**Identity:** IAC-04
**Rule:** Never embed secrets in IaC templates.
**Rationale:** Hardcoded secrets leak via repos and logs.
**Implementation:** Use secret managers or runtime injection.
**Verification:** Scan IaC templates for secrets.
**Examples:**
1. Do: Reference secrets from a secret manager.
2. Don't: Embed passwords in Terraform files.

### [IAC-05] Retrieve Secrets Dynamically
**Identity:** IAC-05
**Rule:** Use data sources or secret managers for credentials at runtime.
**Rationale:** Dynamic retrieval reduces secret exposure in code.
**Implementation:** Integrate with Secrets Manager, Vault, or equivalent.
**Verification:** Confirm secrets are fetched at deploy time, not stored in code.
**Examples:**
1. Do: Use a data source to retrieve secrets.
2. Don't: Store secrets in variables files.

### [IAC-06] Suppress Sensitive Outputs
**Identity:** IAC-06
**Rule:** Mark sensitive outputs to prevent exposure in logs and CLI output.
**Rationale:** Outputs often appear in CI logs and can leak secrets.
**Implementation:** Use `sensitive = true` or equivalent.
**Verification:** Ensure sensitive outputs are masked.
**Examples:**
1. Do: Mark secret outputs as sensitive.
2. Don't: Print secrets in apply logs.

### [IAC-07] Enforce Least-Privilege IAM Policies
**Identity:** IAC-07
**Rule:** Use least-privilege IAM roles and avoid wildcards.
**Rationale:** Overly broad permissions increase impact of compromise.
**Implementation:** Use granular actions and resource scopes.
**Verification:** Audit IAM policies for broad permissions.
**Examples:**
1. Do: Scope policies to specific resources.
2. Don't: Use `Action: *` or `Resource: *` without necessity.

### [IAC-08] Prefer Service-Linked Roles or Managed Identities
**Identity:** IAC-08
**Rule:** Use service-linked roles or managed identities instead of long-lived access keys.
**Rationale:** Long-lived keys are harder to secure and rotate.
**Implementation:** Use cloud-native identity mechanisms.
**Verification:** Ensure no static IAM user keys are required.
**Examples:**
1. Do: Use managed identities for services.
2. Don't: Use static access keys for deployments.

### [IAC-09] Limit CI/CD Pipeline Permissions
**Identity:** IAC-09
**Rule:** CI/CD deploy roles should have only required permissions.
**Rationale:** Pipeline roles are high-value targets.
**Implementation:** Create minimal deployment roles per environment.
**Verification:** Review pipeline role permissions regularly.
**Examples:**
1. Do: Limit pipeline roles to required resources.
2. Don't: Use AdministratorAccess for deployments.

### [IAC-10] Secure Default Security Groups
**Identity:** IAC-10
**Rule:** Ensure default security groups deny all ingress and egress.
**Rationale:** Default open rules expose resources to the internet.
**Implementation:** Configure deny-by-default rules in IaC templates.
**Verification:** Inspect default security group rules after deployment.
**Examples:**
1. Do: Remove default allow rules from security groups.
2. Don't: Leave default open rules in place.

### [IAC-11] Restrict Remote Admin Access
**Identity:** IAC-11
**Rule:** Do not open SSH/RDP to `0.0.0.0/0`.
**Rationale:** Open admin ports are frequent attack targets.
**Implementation:** Use bastions, VPNs, or session managers with restricted access.
**Verification:** Scan for public SSH/RDP exposure.
**Examples:**
1. Do: Restrict admin access to trusted IPs.
2. Don't: Open SSH or RDP to the world.

### [IAC-12] Enable Network Flow Logs
**Identity:** IAC-12
**Rule:** Enable VPC or network flow logs for auditing.
**Rationale:** Logs are required for detection and incident response.
**Implementation:** Configure flow logs in IaC templates.
**Verification:** Confirm flow logs are enabled and collected.
**Examples:**
1. Do: Enable flow logs for all production networks.
2. Don't: Operate without network visibility.

### [IAC-13] Scan IaC Before Deployment
**Identity:** IAC-13
**Rule:** Integrate static analysis tools to detect misconfigurations before apply.
**Rationale:** Pre-deployment scanning prevents insecure infra.
**Implementation:** Use tools like tfsec, Checkov, or cfn-lint in CI.
**Verification:** Ensure pipeline fails on high-severity findings.
**Examples:**
1. Do: Block builds with critical IaC issues.
2. Don't: Deploy without IaC validation.

### [IAC-14] Enforce Policy-as-Code
**Identity:** IAC-14
**Rule:** Use policy-as-code to enforce organizational guardrails.
**Rationale:** Policies prevent misconfigurations and noncompliance.
**Implementation:** Use OPA/Rego, Sentinel, or similar frameworks.
**Verification:** Confirm policy checks run in CI/CD and during deploy.
**Examples:**
1. Do: Enforce encryption and logging policies.
2. Don't: Allow deployments that violate policies.

### [IAC-15] Detect and Remediate Drift
**Identity:** IAC-15
**Rule:** Regularly detect and remediate configuration drift.
**Rationale:** Manual changes can introduce insecure settings.
**Implementation:** Use drift detection tools and reconcile changes quickly.
**Verification:** Run drift checks and validate remediation.
**Examples:**
1. Do: Alert on drift and reconcile via IaC.
2. Don't: Allow manual changes without tracking.

### [IAC-16] Enforce Resource Tagging Standards
**Identity:** IAC-16
**Rule:** Require mandatory tags for ownership and accountability.
**Rationale:** Tags support governance, auditing, and cost control.
**Implementation:** Enforce tags via policy checks.
**Verification:** Ensure resources have required tags after provisioning.
**Examples:**
1. Do: Require `Owner`, `Environment`, and `CostCenter` tags.
2. Don't: Allow untagged resources.
