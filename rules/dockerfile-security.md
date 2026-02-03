# Dockerfile Security (DOCKER)

> Source: Docker Docs - Best practices for writing Dockerfiles

## Principles
Dockerfile security focuses on minimizing attack surface, ensuring build determinism, avoiding secret leakage, and running containers with least privilege.

## Checklist Rules

### [DOCKER-01] Use Official Base Images
**Identity:** DOCKER-01
**Rule:** Use current, official base images where possible.
**Rationale:** Official images are maintained and reduce risk from untrusted sources.
**Implementation:** Use images from trusted registries and maintainers.
**Verification:** Review base image sources and provenance.
**Examples:**
1. Do: Use official language runtime images.
2. Don't: Use unknown or unverified base images.

### [DOCKER-02] Keep Base Images Up to Date
**Identity:** DOCKER-02
**Rule:** Regularly update base images to include security patches.
**Rationale:** Outdated images contain known vulnerabilities.
**Implementation:** Rebuild images on a schedule and monitor for CVEs.
**Verification:** Scan images and confirm recent patch levels.
**Examples:**
1. Do: Rebuild weekly or on CVE alerts.
2. Don't: Pin to an old vulnerable image indefinitely.

### [DOCKER-03] Prefer COPY Over ADD
**Identity:** DOCKER-03
**Rule:** Use `COPY` instead of `ADD` unless you need specific `ADD` features.
**Rationale:** `ADD` can introduce unexpected behavior and risks.
**Implementation:** Use `COPY` for local files; validate if `ADD` is required.
**Verification:** Check Dockerfiles for `ADD` usage and validate necessity.
**Examples:**
1. Do: Use `COPY` for app source.
2. Don't: Use `ADD` for remote URLs without verification.

### [DOCKER-04] Minimize Installed Packages
**Identity:** DOCKER-04
**Rule:** Install only required packages in production images.
**Rationale:** Extra packages increase attack surface and vulnerability count.
**Implementation:** Use minimal base images and remove build tools from runtime images.
**Verification:** Review image contents for unnecessary packages.
**Examples:**
1. Do: Use multi-stage builds to exclude build tools.
2. Don't: Install editors or debugging tools in production images.

### [DOCKER-05] Use .dockerignore
**Identity:** DOCKER-05
**Rule:** Exclude unnecessary files from the build context.
**Rationale:** Reduces risk of leaking secrets and speeds up builds.
**Implementation:** Maintain a `.dockerignore` that excludes secrets and irrelevant files.
**Verification:** Inspect build context for unexpected files.
**Examples:**
1. Do: Exclude `.git`, `.env`, and secrets.
2. Don't: Send the entire repo by default.

### [DOCKER-06] Build Ephemeral Containers
**Identity:** DOCKER-06
**Rule:** Ensure containers are disposable and rebuildable.
**Rationale:** Ephemeral containers reduce persistence for attackers.
**Implementation:** Avoid storing state inside containers; use external volumes.
**Verification:** Confirm containers can be rebuilt without manual steps.
**Examples:**
1. Do: Use volumes for persistent data.
2. Don't: Store state in container filesystem.

### [DOCKER-07] Avoid Secrets in ENV
**Identity:** DOCKER-07
**Rule:** Do not store secrets in `ENV` instructions.
**Rationale:** ENV values persist in image layers and can be extracted.
**Implementation:** Use runtime secret injection or build secrets.
**Verification:** Scan images for embedded secrets.
**Examples:**
1. Do: Use secret managers or runtime environment injection.
2. Don't: Bake secrets into Dockerfile ENV.

### [DOCKER-08] Use Build Secrets Safely
**Identity:** DOCKER-08
**Rule:** Use build secrets properly and avoid leaving them in layers.
**Rationale:** Secrets in intermediate layers are recoverable.
**Implementation:** Use BuildKit secrets or a single RUN that sets/unsets secrets.
**Verification:** Inspect image layers for secret residue.
**Examples:**
1. Do: Use `--secret` with BuildKit.
2. Don't: Store secrets in files during build and forget to delete.

### [DOCKER-09] Use `pipefail` with Pipelines
**Identity:** DOCKER-09
**Rule:** Use `set -o pipefail` when chaining commands with pipes.
**Rationale:** Ensures failures in pipelines are detected.
**Implementation:** Prefix piped commands with `set -o pipefail &&`.
**Verification:** Confirm build fails when a piped command fails.
**Examples:**
1. Do: `RUN set -o pipefail && curl ... | tar ...`
2. Don't: Ignore failures in piped commands.

### [DOCKER-10] Use Exec Form for CMD/ENTRYPOINT
**Identity:** DOCKER-10
**Rule:** Use exec form for `CMD` and `ENTRYPOINT`.
**Rationale:** Ensures signals are handled correctly and avoids shell injection.
**Implementation:** Use JSON array form for commands.
**Verification:** Inspect Dockerfiles for shell-form CMD/ENTRYPOINT usage.
**Examples:**
1. Do: `CMD ["app", "--serve"]`
2. Don't: `CMD app --serve`

### [DOCKER-11] Keep RUN Instructions Readable
**Identity:** DOCKER-11
**Rule:** Split long `RUN` commands for readability and auditing.
**Rationale:** Complex commands are harder to review and secure.
**Implementation:** Use line continuations and comments where needed.
**Verification:** Review Dockerfiles for overly complex RUN statements.
**Examples:**
1. Do: Split long RUN chains across lines.
2. Don't: Use unreadable, single-line RUN commands.

### [DOCKER-12] Combine Update and Install
**Identity:** DOCKER-12
**Rule:** Combine `apt-get update` and `apt-get install` in the same layer.
**Rationale:** Prevents stale package index issues.
**Implementation:** Use `RUN apt-get update && apt-get install -y ...`.
**Verification:** Check for separate `apt-get update` layers.
**Examples:**
1. Do: Combine update and install in one RUN.
2. Don't: Run `apt-get update` alone.

### [DOCKER-13] Pin Package Versions
**Identity:** DOCKER-13
**Rule:** Pin package versions to improve build determinism.
**Rationale:** Floating versions can introduce unplanned changes.
**Implementation:** Specify version constraints or image digests.
**Verification:** Review package installs for unpinned versions.
**Examples:**
1. Do: Install `package=1.2.*`.
2. Don't: Use unbounded latest package versions.

### [DOCKER-14] Clean Package Caches
**Identity:** DOCKER-14
**Rule:** Remove package caches in the same layer after install.
**Rationale:** Reduces image size and attack surface.
**Implementation:** Use `rm -rf /var/lib/apt/lists/*` in the same RUN.
**Verification:** Inspect image size and contents.
**Examples:**
1. Do: Clean caches after installation.
2. Don't: Leave package caches in the image.

### [DOCKER-15] Run as Non-Root
**Identity:** DOCKER-15
**Rule:** Switch to a non-root user where possible.
**Rationale:** Limits impact of container compromise.
**Implementation:** Create and use a non-root user in the image.
**Verification:** Confirm container processes run as non-root.
**Examples:**
1. Do: Use `USER appuser`.
2. Don't: Run services as root by default.

### [DOCKER-16] Use Absolute WORKDIR Paths
**Identity:** DOCKER-16
**Rule:** Use absolute paths in `WORKDIR`.
**Rationale:** Avoids ambiguity and unintended directory changes.
**Implementation:** Specify absolute paths like `/app`.
**Verification:** Check Dockerfile for relative `WORKDIR`.
**Examples:**
1. Do: `WORKDIR /app`
2. Don't: `WORKDIR app`
