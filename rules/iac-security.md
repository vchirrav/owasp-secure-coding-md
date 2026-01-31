# Infrastructure as Code (IaC) Security (IAC)

> Source: CIS Benchmarks, HashiCorp Security Best Practices, & OPA

## Principles
IaC Security ensures that the cloud infrastructure provisioning process is secure, reproducible, and auditable. Key goals include preventing misconfigurations before deployment, protecting state files, and enforcing the principle of least privilege for deployment roles.

## Checklist Rules

### State Management
* **[IAC-01]** **State Encryption:** Encrypt Terraform state files (`.tfstate`) or CloudFormation templates at rest.
    * Use remote backends (e.g., S3 bucket with server-side encryption enabled) rather than local storage.
* **[IAC-02]** **State Locking:** Enable state locking (e.g., using DynamoDB for Terraform) to prevent concurrent writes and corruption.
* **[IAC-03]** **Access Control:** Restrict access to the remote state backend to only the CI/CD pipeline and authorized administrators.
    * State files often contain sensitive resource IDs and output values.

### Secrets Handling
* **[IAC-04]** **No Hardcoded Secrets:** Never embed secrets, passwords, or keys directly in IaC templates.
* **[IAC-05]** **Dynamic Retrieval:** Use data sources or external secret managers (e.g., AWS Secrets Manager, Vault Provider) to fetch credentials at runtime.
* **[IAC-06]** **Output Suppression:** Mark sensitive output values as "sensitive" (e.g., `sensitive = true` in Terraform) to prevent them from being displayed in plain text in CLI logs.

### Least Privilege & IAM
* **[IAC-07]** **Granular Roles:** Define IAM roles and policies with the principle of least privilege.
    * Avoid using wildcards (`*`) in `Action` or `Resource` blocks.
* **[IAC-08]** **Service-Linked Roles:** Prefer Service-Linked Roles or Managed Identities over creating long-lived IAM user access keys.
* **[IAC-09]** **Pipeline Permissions:** The CI/CD pipeline deploying the IaC should run with a role that has only the permissions necessary to provision the specific resources (not `AdministratorAccess`).

### Network Security
* **[IAC-10]** **Default Security Groups:** Ensure default security groups deny all ingress and egress traffic.
* **[IAC-11]** **Restricted Ingress:** Do not open SSH (22) or RDP (3389) to `0.0.0.0/0`.
    * Use Bastion hosts, VPNs, or Session Manager.
* **[IAC-12]** **VPC Flow Logs:** Enable VPC Flow Logs for all VPCs created via IaC to support network auditing.

### Policy as Code & Drift
* **[IAC-13]** **Pre-Deployment Scanning:** Integrate static analysis tools (e.g., `tfsec`, `Checkov`, `cfn-lint`) into the pipeline to catch misconfigurations before `apply`.
    * Block the build if high-severity violations are found.
* **[IAC-14]** **Policy Enforcement:** Use Policy-as-Code frameworks (e.g., OPA/Rego, Sentinel) to enforce organizational guardrails (e.g., "All S3 buckets must have versioning enabled").
* **[IAC-15]** **Drift Detection:** Regularly check for configuration drift (changes made manually in the console outside of IaC) and remediate immediately.
* **[IAC-16]** **Tagging Standards:** Enforce mandatory tagging (e.g., `Owner`, `CostCenter`, `Environment`) on all resources to ensure accountability and asset management.