# Dockerfile Security (DOCKER)

> Source: Docker Docs - Best practices for writing Dockerfiles

## Principles
Dockerfile security focuses on minimizing the attack surface (image size, installed packages), managing privileges (root vs. non-root), and ensuring build integrity (official images, verifying dependencies).

## Checklist Rules

### Base Image & Instructions
* [cite_start]**[DOCKER-01]** Use current official images as the basis for your images whenever possible[cite: 1, 2].
    * [cite_start]Docker recommends Alpine images as they are tightly controlled and small (under 6 MB)[cite: 2].
* **[DOCKER-02]** Keep base images up-to-date.
    * [cite_start]Use tools (like Docker Scout) to check if pinned digests correspond to the latest versions[cite: 3].
* [cite_start]**[DOCKER-03]** Use `COPY` instead of `ADD` unless you specifically need to fetch remote URLs or extract tarballs automatically[cite: 4].
    * [cite_start]`ADD` can introduce unexpected risks by automatically extracting files or downloading from unchecked URLs[cite: 4].
    * [cite_start]If using `ADD` for remote resources, ensure checksum validation is used[cite: 4].

### Surface Area Reduction
* [cite_start]**[DOCKER-04]** Don't install unnecessary packages; avoid "nice-to-have" tools (e.g., text editors) in production images to reduce attack surface and dependencies[cite: 5].
* [cite_start]**[DOCKER-05]** Use a `.dockerignore` file to exclude files not relevant to the build (e.g., sensitive source files, markdown docs)[cite: 6].
* [cite_start]**[DOCKER-06]** Construct ephemeral containers that can be stopped, destroyed, and rebuilt with minimal setup[cite: 7].

### Secrets & Environment
* [cite_start]**[DOCKER-07]** Do not store secrets or sensitive information in `ENV` instructions[cite: 8].
    * [cite_start]`ENV` values persist in intermediate layers and can be dumped even if unset in a later layer[cite: 8].
* [cite_start]**[DOCKER-08]** To use temporary secrets during a build, use a single `RUN` command that sets, uses, and unsets the variable (e.g., `export KEY=val && ... && unset KEY`) or use build secret features[cite: 8].

### Command Execution & Shell Safety
* [cite_start]**[DOCKER-09]** When using pipes (`|`) in `RUN` instructions, prepend `set -o pipefail &&` to ensure the build fails if any stage in the pipe fails[cite: 9].
    * [cite_start]Without this, a build might succeed even if a download fails, leading to a compromised or incomplete image[cite: 9].
* [cite_start]**[DOCKER-10]** Use the "exec" form for `CMD` and `ENTRYPOINT` (e.g., `CMD ["executable", "param1"]`) to ensure signals are passed correctly[cite: 10].
* [cite_start]**[DOCKER-11]** Split long `RUN` statements into multiple lines with backslashes to improve readability and auditability[cite: 11].

### Cache & Package Management
* [cite_start]**[DOCKER-12]** Always combine `apt-get update` and `apt-get install` in the same `RUN` statement to prevent cache issues (Cache Busting)[cite: 12].
    * [cite_start]Example: `RUN apt-get update && apt-get install -y package-bar`[cite: 12].
* [cite_start]**[DOCKER-13]** Use version pinning for packages (e.g., `package-foo=1.3.*`) to ensure deterministic builds and prevent unanticipated changes[cite: 13].
* [cite_start]**[DOCKER-14]** Clean up package caches (e.g., `rm -rf /var/lib/apt/lists/*`) in the same `RUN` layer to reduce image size[cite: 14].

### User & Work Directory
* [cite_start]**[DOCKER-15]** Use the `USER` instruction to switch to a non-root user when the service does not require privileges (though not explicitly detailed in the "Best Practices" text, this is a standard security practice implied by "Isolate containers" sidebar)[cite: 15].
* [cite_start]**[DOCKER-16]** Use absolute paths for `WORKDIR` for clarity and reliability[cite: 16].