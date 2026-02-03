# Software Supply Chain Security (CHAIN)

> Source: SLSA, NIST SSDF, OWASP SCVS, & CNCF Best Practices

## Principles
Software supply chain security protects integrity from code to dependencies to build artifacts. It ensures provenance, tamper resistance, and transparency across the entire pipeline.

## Checklist Rules

### [CHAIN-01] Run Software Composition Analysis (SCA)
**Identity:** CHAIN-01
**Rule:** Use automated SCA tools to detect vulnerable dependencies.
**Rationale:** Vulnerable third-party components are a common attack vector.
**Implementation:** Scan dependencies in CI and block builds above a severity threshold.
**Verification:** Confirm pipeline fails on critical CVEs.
**Examples:**
1. Do: Enforce SCA checks on every build.
2. Don't: Ship with known critical vulnerabilities.

### [CHAIN-02] Use Lock Files and Pin Versions
**Identity:** CHAIN-02
**Rule:** Use lock files and pin dependencies to fixed versions and hashes.
**Rationale:** Floating versions allow unexpected changes and attacks.
**Implementation:** Commit lock files and enforce them in builds.
**Verification:** Ensure builds fail without lock file consistency.
**Examples:**
1. Do: Use `package-lock.json` or `go.sum`.
2. Don't: Use `latest` or unpinned version ranges in production.

### [CHAIN-03] Prevent Dependency Confusion
**Identity:** CHAIN-03
**Rule:** Configure package managers to prioritize private registries for internal namespaces.
**Rationale:** Attackers can publish packages with internal names to public registries.
**Implementation:** Use scoped registries and strict registry settings.
**Verification:** Confirm internal packages resolve only from private registries.
**Examples:**
1. Do: Configure registry scopes for internal packages.
2. Don't: Allow public registry fallback for internal namespaces.

### [CHAIN-04] Vet New Dependencies
**Identity:** CHAIN-04
**Rule:** Vet dependencies for maintenance, community health, and security history.
**Rationale:** Unmaintained or malicious packages increase risk.
**Implementation:** Review dependency metadata and security reputation before approval.
**Verification:** Ensure new dependencies pass review gates.
**Examples:**
1. Do: Review dependency activity and maintainers.
2. Don't: Accept new packages without review.

### [CHAIN-05] Generate an SBOM
**Identity:** CHAIN-05
**Rule:** Generate an SBOM for every release artifact.
**Rationale:** SBOMs provide transparency and enable vulnerability management.
**Implementation:** Use CycloneDX or SPDX in CI.
**Verification:** Confirm SBOMs include all direct and transitive dependencies.
**Examples:**
1. Do: Produce an SBOM for each release.
2. Don't: Ship artifacts without dependency inventories.

### [CHAIN-06] Publish SBOMs with Artifacts
**Identity:** CHAIN-06
**Rule:** Distribute SBOMs alongside release artifacts.
**Rationale:** Downstream consumers need SBOMs for risk assessment.
**Implementation:** Attach SBOMs to releases or artifact registries.
**Verification:** Confirm SBOMs are available for consumers.
**Examples:**
1. Do: Publish SBOMs in release assets.
2. Don't: Keep SBOMs internal only.

### [CHAIN-07] Use Ephemeral Build Environments
**Identity:** CHAIN-07
**Rule:** Run builds in ephemeral, isolated environments.
**Rationale:** Prevents persistence of compromised build systems.
**Implementation:** Use fresh containers or VMs for each build.
**Verification:** Confirm build environments are destroyed after use.
**Examples:**
1. Do: Use disposable CI runners.
2. Don't: Reuse long-lived build machines for sensitive builds.

### [CHAIN-08] Define Build as Code
**Identity:** CHAIN-08
**Rule:** Store build pipeline definitions in version control and protect them.
**Rationale:** Prevents unauthorized changes to build steps.
**Implementation:** Require reviews for pipeline file changes.
**Verification:** Ensure pipeline configs are protected with branch rules.
**Examples:**
1. Do: Use PR reviews for pipeline changes.
2. Don't: Allow direct edits to build configs.

### [CHAIN-09] Generate Build Provenance
**Identity:** CHAIN-09
**Rule:** Generate authenticated provenance metadata for builds.
**Rationale:** Provenance proves how and from which inputs artifacts were built.
**Implementation:** Use SLSA-compatible provenance generation.
**Verification:** Validate provenance metadata is attached and signed.
**Examples:**
1. Do: Generate provenance for each artifact.
2. Don't: Release artifacts without provenance.

### [CHAIN-10] Strive for Hermetic Builds
**Identity:** CHAIN-10
**Rule:** Make builds hermetic with explicit dependencies and restricted network access.
**Rationale:** Prevents dependency tampering during build.
**Implementation:** Use offline or allowlisted dependency sources.
**Verification:** Confirm builds succeed without unrestricted network access.
**Examples:**
1. Do: Use cached, verified dependencies.
2. Don't: Allow arbitrary network access during builds.

### [CHAIN-11] Sign Release Artifacts
**Identity:** CHAIN-11
**Rule:** Cryptographically sign release artifacts.
**Rationale:** Signing ensures integrity and authenticity.
**Implementation:** Use Sigstore/Cosign or traditional signing keys.
**Verification:** Verify signatures before distributing artifacts.
**Examples:**
1. Do: Sign container images and binaries.
2. Don't: Publish unsigned artifacts.

### [CHAIN-12] Verify Signatures and Provenance Before Use
**Identity:** CHAIN-12
**Rule:** Validate artifact signatures and provenance before execution or deployment.
**Rationale:** Prevents running tampered artifacts.
**Implementation:** Use admission controls or deployment checks.
**Verification:** Ensure deployments fail on unsigned or untrusted artifacts.
**Examples:**
1. Do: Enforce signature verification in CI/CD or admission controllers.
2. Don't: Deploy artifacts without verification.

### [CHAIN-13] Protect Signing Keys
**Identity:** CHAIN-13
**Rule:** Store signing keys in HSMs or secure KMS systems.
**Rationale:** Compromised signing keys invalidate trust.
**Implementation:** Use hardware-backed or managed key services.
**Verification:** Confirm keys are not stored in repos or local disks.
**Examples:**
1. Do: Store signing keys in KMS or HSM.
2. Don't: Keep signing keys in plaintext files.

### [CHAIN-14] Apply Least Privilege to CI/CD Runners
**Identity:** CHAIN-14
**Rule:** Limit CI/CD runner permissions to only what is required.
**Rationale:** Over-privileged runners increase blast radius of compromise.
**Implementation:** Use scoped credentials and network restrictions.
**Verification:** Audit runner permissions and access paths.
**Examples:**
1. Do: Use minimal IAM roles for runners.
2. Don't: Grant admin access to CI runners.

### [CHAIN-15] Inject Secrets Securely into Builds
**Identity:** CHAIN-15
**Rule:** Inject secrets only when necessary and mask them in logs.
**Rationale:** Build environments can leak secrets via logs or artifacts.
**Implementation:** Use secret managers and log masking.
**Verification:** Ensure secrets are not printed or stored.
**Examples:**
1. Do: Use masked secret variables in CI.
2. Don't: Print secrets to build logs.

### [CHAIN-16] Enforce Branch Protection
**Identity:** CHAIN-16
**Rule:** Protect main and release branches with required reviews and checks.
**Rationale:** Prevents unreviewed changes from being released.
**Implementation:** Require approvals and passing checks before merge.
**Verification:** Confirm branch protection rules are enforced.
**Examples:**
1. Do: Require two approvals for release branches.
2. Don't: Allow force-pushes to protected branches.
