# Software Supply Chain Security (CHAIN)

> Source: SLSA, NIST SSDF, OWASP SCVS, & CNCF Best Practices

## Principles
Software Supply Chain Security focuses on the integrity of the entire software lifecycle—from the code you write to the dependencies you consume and the build environment itself. The goal is to prevent tampering, ensure provenance, and maintain visibility into all components.

## Checklist Rules

### Dependency Management (SCA)
* **[CHAIN-01]** **Software Composition Analysis (SCA):** Implement automated SCA tools in the pipeline to detect known vulnerabilities (CVEs) in third-party dependencies.
    * Block builds that contain vulnerabilities with a severity above a defined threshold (e.g., High/Critical).
* **[CHAIN-02]** **Lock Files & Pinning:** Always use lock files (e.g., `package-lock.json`, `go.sum`, `poetry.lock`) to pin dependencies to specific versions and hashes.
    * Avoid "floating" versions (e.g., `latest` or `^1.2.0`) in production builds.
* **[CHAIN-03]** **Dependency Confusion Prevention:** Configure package managers to strictly prioritize your private registry over public registries (npm, PyPI) for internal namespaces.
* **[CHAIN-04]** **Vetting:** Establish a process for vetting new dependencies for maintenance activity, community health, and malicious indicators (e.g., typosquatting) before approval.

### SBOM & Transparency
* **[CHAIN-05]** **Generate SBOM:** Generate a Software Bill of Materials (SBOM) for every release artifact in a standard format (CycloneDX or SPDX).
    * The SBOM must enumerate all top-level and transitive dependencies.
* **[CHAIN-06]** **Publish SBOM:** Distribute the SBOM alongside the artifact to downstream consumers to facilitate vulnerability management.

### Build Integrity & Provenance (SLSA)
* **[CHAIN-07]** **Ephemeral Build Environments:** Run builds in ephemeral, isolated environments (e.g., fresh containers) that are destroyed after execution to prevent persistence of malicious code.
* **[CHAIN-08]** **Build as Code:** Define build pipelines in version control (e.g., GitHub Actions workflows, Jenkinsfiles) and restrict write access to these definitions.
* **[CHAIN-09]** **Generate Provenance:** The build system must generate authenticated provenance metadata describing *how* the artifact was built, *who* built it, and *what* inputs (source commit) were used.
* **[CHAIN-10]** **Hermetic Builds:** Strive for hermetic builds where all dependencies are declared explicitly, and network access is disabled or strictly allowlisted during the build step.

### Artifact Signing & Verification
* **[CHAIN-11]** **Code Signing:** Cryptographically sign all release artifacts (binaries, containers, libraries) using a trusted key or keyless signing infrastructure (e.g., Sigstore/Cosign).
* **[CHAIN-12]** **Verify Before Execution:** Downstream systems (e.g., Kubernetes admission controllers, deployment scripts) must verify the cryptographic signature and provenance of an artifact before running it.
    * Reject any artifact that lacks a valid signature from a trusted signer.
* **[CHAIN-13]** **Protect Signing Keys:** Store signing keys in a Hardware Security Module (HSM) or a secure cloud key management service (KMS). Never store signing keys in the repo.

### Pipeline Security
* **[CHAIN-14]** **Least Privilege Runners:** Ensure CI/CD runners operate with the minimum necessary permissions.
    * They should not have administrative access to the deployment environment or cloud account.
* **[CHAIN-15]** **Secret Injection:** Inject secrets (API keys, credentials) into the build environment only when strictly necessary and mask them in logs.
* **[CHAIN-16]** **Branch Protection:** Enforce branch protection rules on the main/release branches.
    * Require code review (PR approval) and passing status checks before merging.