# Cloud-Native & Kubernetes Security (K8S)

> Source: OWASP Kubernetes Top 10, NSA/CISA Hardening Guide, & CIS Benchmarks

## Principles
Cloud-Native security requires a layered defense ("defense in depth") approach, securing the container lifecycle, the orchestration platform (Kubernetes), the network mesh, and the underlying cloud infrastructure. Key goals are isolation, least privilege, and immutability.

## Checklist Rules

### Pod Security Standards (PSS) & Workload Isolation
* **[K8S-01]** **Non-Root Containers:** Enforce `runAsNonRoot: true` in the Pod security context.
    * Containers should not run with UID 0 (root).
* **[K8S-02]** **Immutable Filesystems:** Set `readOnlyRootFilesystem: true` to prevent attackers from writing to the container's file system (prevents downloading malware/tools).
* **[K8S-03]** **Privilege Escalation:** Set `allowPrivilegeEscalation: false` to prevent a process from gaining more privileges than its parent process.
* **[K8S-04]** **Drop Capabilities:** Drop all unnecessary Linux capabilities (e.g., `ALL`) and only add back what is strictly needed (e.g., `NET_BIND_SERVICE`).
* **[K8S-05]** **Host Isolation:** Do not share the host's PID, IPC, or Network namespaces (`hostPID`, `hostIPC`, `hostNetwork`) unless absolutely necessary for system agents.
* **[K8S-06]** **Seccomp & AppArmor:** Apply default Seccomp profiles (`RuntimeDefault`) and AppArmor/SELinux profiles to restrict system calls.

### Network Security
* **[K8S-07]** **Network Policies:** Implement a "Default Deny" Network Policy for all namespaces.
    * Explicitly allowlist only necessary Ingress and Egress traffic between microservices.
* **[K8S-08]** **Service Mesh / mTLS:** Use a Service Mesh (e.g., Istio, Linkerd) to enforce mutual TLS (mTLS) for all service-to-service communication.
    * Do not rely solely on network perimeter defenses.
* **[K8S-09]** **Metadata Service Protection:** Block access to the cloud provider metadata service (e.g., `169.254.169.254`) from worker pods to prevent cloud credential theft.

### RBAC & Service Accounts
* **[K8S-10]** **Least Privilege RBAC:** Audit RoleBasedAccessControl (RBAC) roles regularly.
    * Avoid using `cluster-admin` for services.
    * Restrict access to sensitive resources like `Secrets` and `ConfigMaps`.
* **[K8S-11]** **Service Account Token Mounting:** Disable automatic mounting of Service Account tokens (`automountServiceAccountToken: false`) if the pod does not need to talk to the Kubernetes API Server.
* **[K8S-12]** **User vs. Service:** Differentiate between human users (OIDC/SAML) and service accounts. Humans should not use Service Account tokens.

### Cluster & Infrastructure Hardening
* **[K8S-13]** **API Server Security:** Ensure the Kubernetes API server is not exposed to the public internet. Use a bastion host or VPN.
* **[K8S-14]** **Etcd Encryption:** Enable encryption at rest for the Etcd datastore to protect Secrets stored within the cluster.
* **[K8S-15]** **Admission Controllers:** Use Policy-as-Code admission controllers (e.g., OPA Gatekeeper, Kyverno) to enforce security contexts and registry allowlists *before* deployment.
    * Prevent deployment of images from untrusted registries.

### Auditing & Logging
* **[K8S-16]** **Audit Logs:** Enable Kubernetes Audit Logging and forward logs to a secure, external backend.
    * Monitor for suspicious API calls (e.g., `exec` into pods, reading secrets).
* **[K8S-17]** **Node Security:** Regularly patch and rotate worker nodes. Use minimal OS images (e.g., Bottlerocket, COS) to reduce the node attack surface.