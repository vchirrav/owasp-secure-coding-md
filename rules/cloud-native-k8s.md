# Cloud-Native & Kubernetes Security (K8S)

> Source: OWASP Kubernetes Top 10, NSA/CISA Hardening Guide, & CIS Benchmarks

## Principles
Cloud-native security requires defense-in-depth across containers, orchestration, networking, and infrastructure. Core goals are least privilege, strong isolation, immutable workloads, and auditable control planes.

## Checklist Rules

### [K8S-01] Enforce Non-Root Containers
**Identity:** K8S-01
**Rule:** Run containers as non-root users.
**Rationale:** Root in containers increases the impact of a container escape.
**Implementation:** Set `runAsNonRoot: true` and define a non-root UID.
**Verification:** Inspect pod security contexts and ensure UID is not 0.
**Examples:**
1. Do: Use a non-root UID in the image and security context.
2. Don't: Run application containers as root.

### [K8S-02] Use Immutable Filesystems
**Identity:** K8S-02
**Rule:** Use read-only root filesystems for containers.
**Rationale:** Prevents attackers from writing tools or malware to the filesystem.
**Implementation:** Set `readOnlyRootFilesystem: true` and mount writable volumes only when needed.
**Verification:** Confirm pods fail to write to root filesystem.
**Examples:**
1. Do: Mount a dedicated writable volume for temp files.
2. Don't: Allow write access to the root filesystem by default.

### [K8S-03] Disable Privilege Escalation
**Identity:** K8S-03
**Rule:** Prevent privilege escalation within containers.
**Rationale:** Escalation allows processes to gain elevated capabilities.
**Implementation:** Set `allowPrivilegeEscalation: false`.
**Verification:** Inspect pod specs and ensure escalation is disabled.
**Examples:**
1. Do: Disable privilege escalation across all workloads.
2. Don't: Allow setuid binaries in containers without justification.

### [K8S-04] Drop Unnecessary Capabilities
**Identity:** K8S-04
**Rule:** Drop all Linux capabilities not required by the workload.
**Rationale:** Excess capabilities increase the attack surface.
**Implementation:** Set `capabilities.drop: ["ALL"]` and add back only minimal needs.
**Verification:** Review pod security contexts for unnecessary capabilities.
**Examples:**
1. Do: Add only `NET_BIND_SERVICE` when required.
2. Don't: Run with default or broad capability sets.

### [K8S-05] Avoid Host Namespace Sharing
**Identity:** K8S-05
**Rule:** Do not share host PID, IPC, or network namespaces unless required.
**Rationale:** Host namespace access breaks isolation.
**Implementation:** Set `hostPID`, `hostIPC`, and `hostNetwork` to `false` by default.
**Verification:** Check pod specs for host namespace usage.
**Examples:**
1. Do: Use host namespaces only for trusted system agents.
2. Don't: Enable host namespaces for general workloads.

### [K8S-06] Apply Seccomp and AppArmor/SELinux
**Identity:** K8S-06
**Rule:** Enforce default Seccomp profiles and AppArmor/SELinux policies.
**Rationale:** Limits system calls and reduces kernel attack surface.
**Implementation:** Use `seccompProfile: RuntimeDefault` and enable AppArmor/SELinux policies.
**Verification:** Ensure pods are running with enforced profiles.
**Examples:**
1. Do: Apply `RuntimeDefault` for all workloads.
2. Don't: Run without syscall restrictions.

### [K8S-07] Enforce Default-Deny Network Policies
**Identity:** K8S-07
**Rule:** Implement default-deny network policies for all namespaces.
**Rationale:** Prevents unintended lateral movement and data exfiltration.
**Implementation:** Apply baseline deny policies and allowlist required traffic.
**Verification:** Confirm pods cannot communicate without explicit policy.
**Examples:**
1. Do: Allow only required service-to-service traffic.
2. Don't: Allow unrestricted east-west traffic.

### [K8S-08] Use Service Mesh or mTLS
**Identity:** K8S-08
**Rule:** Enforce mTLS for service-to-service communication.
**Rationale:** Ensures confidentiality and integrity inside the cluster.
**Implementation:** Use a service mesh or explicit mTLS configuration.
**Verification:** Verify certificates are required and encrypted traffic is enforced.
**Examples:**
1. Do: Use mTLS for internal service traffic.
2. Don't: Assume internal networks are trusted.

### [K8S-09] Block Cloud Metadata Access
**Identity:** K8S-09
**Rule:** Block pod access to cloud metadata services.
**Rationale:** Metadata endpoints can leak cloud credentials.
**Implementation:** Use network policies or node firewall rules to block `169.254.169.254`.
**Verification:** Attempt to reach metadata IP from pods and confirm denial.
**Examples:**
1. Do: Block metadata IPs from workloads.
2. Don't: Allow unrestricted access to metadata services.

### [K8S-10] Enforce Least-Privilege RBAC
**Identity:** K8S-10
**Rule:** Assign minimal RBAC roles and avoid cluster-admin.
**Rationale:** Excess privileges increase impact of compromise.
**Implementation:** Use granular Roles and RoleBindings; review permissions regularly.
**Verification:** Audit RBAC for over-privileged accounts.
**Examples:**
1. Do: Grant namespace-scoped roles to services.
2. Don't: Use `cluster-admin` for application workloads.

### [K8S-11] Disable Unnecessary Service Account Tokens
**Identity:** K8S-11
**Rule:** Disable automatic mounting of service account tokens when not required.
**Rationale:** Mounted tokens can be stolen by compromised pods.
**Implementation:** Set `automountServiceAccountToken: false` for workloads that do not need API access.
**Verification:** Check pod specs for token mounts.
**Examples:**
1. Do: Disable token mounts for non-API workloads.
2. Don't: Mount tokens by default everywhere.

### [K8S-12] Separate Human and Service Identities
**Identity:** K8S-12
**Rule:** Do not use service accounts for human users.
**Rationale:** Service account tokens are not designed for human authentication and auditing.
**Implementation:** Use OIDC/SAML for users; restrict service accounts to workloads.
**Verification:** Ensure human access is via user identities and audited.
**Examples:**
1. Do: Use OIDC for cluster admin access.
2. Don't: Share service account tokens among humans.

### [K8S-13] Restrict API Server Exposure
**Identity:** K8S-13
**Rule:** Do not expose the Kubernetes API server to the public internet.
**Rationale:** Public exposure increases attack surface and brute force risk.
**Implementation:** Use private endpoints, VPNs, or bastion hosts.
**Verification:** Confirm API server is reachable only from trusted networks.
**Examples:**
1. Do: Keep API server private behind VPN.
2. Don't: Allow public API server access.

### [K8S-14] Encrypt Etcd at Rest
**Identity:** K8S-14
**Rule:** Enable encryption at rest for etcd.
**Rationale:** Protects secrets stored in the cluster state.
**Implementation:** Configure encryption providers and rotate keys.
**Verification:** Confirm encryption is enabled and tested.
**Examples:**
1. Do: Use envelope encryption with KMS.
2. Don't: Store secrets unencrypted in etcd.

### [K8S-15] Use Admission Controllers for Policy Enforcement
**Identity:** K8S-15
**Rule:** Enforce policy-as-code with admission controllers.
**Rationale:** Prevents insecure workloads from being deployed.
**Implementation:** Use OPA Gatekeeper or Kyverno to enforce security rules.
**Verification:** Attempt to deploy non-compliant resources and ensure rejection.
**Examples:**
1. Do: Block images from untrusted registries.
2. Don't: Allow privileged pods without policy checks.

### [K8S-16] Enable and Monitor Audit Logs
**Identity:** K8S-16
**Rule:** Enable Kubernetes audit logging and monitor for suspicious API activity.
**Rationale:** Audit logs provide visibility into cluster operations and attacks.
**Implementation:** Send audit logs to centralized logging and alert on critical events.
**Verification:** Confirm audit logs capture API events like `exec` and `secrets` access.
**Examples:**
1. Do: Alert on `kubectl exec` into production pods.
2. Don't: Disable audit logging in production.

### [K8S-17] Patch and Harden Nodes
**Identity:** K8S-17
**Rule:** Regularly patch and rotate worker nodes; use minimal OS images.
**Rationale:** Node vulnerabilities can compromise the entire cluster.
**Implementation:** Use minimal, hardened node images and automated patching.
**Verification:** Confirm nodes are patched and rotated regularly.
**Examples:**
1. Do: Use minimal OS images like COS or Bottlerocket.
2. Don't: Leave nodes unpatched for long periods.
