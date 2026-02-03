# System Configuration (SYS)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
System configuration ensures servers, frameworks, and infrastructure are hardened, updated, and configured securely. It reduces attack surface and enforces consistent security policies.

## Checklist Rules

### [SYS-01] Run Latest Approved Versions
**Identity:** SYS-01
**Rule:** Run the latest approved versions of servers, frameworks, and components.
**Rationale:** Newer versions include security fixes and improvements.
**Implementation:** Maintain version baselines and upgrade schedules.
**Verification:** Audit component versions against approved baselines.
**Examples:**
1. Do: Keep frameworks and runtimes within supported versions.
2. Don't: Run unsupported or end-of-life versions.

### [SYS-02] Apply Security Patches Promptly
**Identity:** SYS-02
**Rule:** Ensure all patches for deployed versions are applied.
**Rationale:** Unpatched systems are vulnerable to known exploits.
**Implementation:** Use patch management and automated updates where possible.
**Verification:** Review patch status and vulnerability scans.
**Examples:**
1. Do: Patch critical vulnerabilities quickly.
2. Don't: Delay patching indefinitely.

### [SYS-03] Disable Directory Listings
**Identity:** SYS-03
**Rule:** Turn off directory listings on web servers.
**Rationale:** Directory listings expose sensitive files and structure.
**Implementation:** Disable directory browsing in server configs.
**Verification:** Attempt to access a directory without an index file.
**Examples:**
1. Do: Disable directory browsing in web server settings.
2. Don't: Allow directory listings in production.

### [SYS-04] Enforce Least Privilege for Services
**Identity:** SYS-04
**Rule:** Run web server and service accounts with least privilege.
**Rationale:** Limits impact of service compromise.
**Implementation:** Use dedicated service accounts with minimal permissions.
**Verification:** Review service account privileges.
**Examples:**
1. Do: Restrict service accounts to required resources only.
2. Don't: Run services as admin/root.

### [SYS-05] Fail Securely on Exceptions
**Identity:** SYS-05
**Rule:** Ensure system exceptions fail securely.
**Rationale:** Failures should not bypass security controls.
**Implementation:** Deny access or halt operations on critical errors.
**Verification:** Simulate exceptions and confirm secure outcomes.
**Examples:**
1. Do: Deny access on security module failures.
2. Don't: Continue operations in an insecure state.

### [SYS-06] Remove Unnecessary Functionality
**Identity:** SYS-06
**Rule:** Remove unused features, services, and files.
**Rationale:** Reduces attack surface.
**Implementation:** Disable unused services and delete unused files.
**Verification:** Audit running services and filesystem for unused components.
**Examples:**
1. Do: Disable unused web server modules.
2. Don't: Leave sample apps or unused services enabled.

### [SYS-07] Remove Test Code Before Production
**Identity:** SYS-07
**Rule:** Remove test code and debug functionality before production.
**Rationale:** Test endpoints often bypass security checks.
**Implementation:** Use build-time flags to exclude test code.
**Verification:** Scan production for test endpoints or debug routes.
**Examples:**
1. Do: Remove test endpoints prior to deployment.
2. Don't: Leave debug routes in production.

### [SYS-08] Avoid Revealing Directory Structure in robots.txt
**Identity:** SYS-08
**Rule:** Do not disclose sensitive directories in `robots.txt`.
**Rationale:** Attackers read `robots.txt` for hidden paths.
**Implementation:** Place private directories under a parent and disallow parent.
**Verification:** Review `robots.txt` for sensitive entries.
**Examples:**
1. Do: Avoid listing sensitive paths in `robots.txt`.
2. Don't: List admin or backup paths in `robots.txt`.

### [SYS-09] Define Supported HTTP Methods
**Identity:** SYS-09
**Rule:** Explicitly define supported HTTP methods per endpoint.
**Rationale:** Unused methods can enable abuse or unexpected behavior.
**Implementation:** Configure servers and routers to allow only required methods.
**Verification:** Test endpoints with unsupported methods and confirm rejection.
**Examples:**
1. Do: Allow only GET/POST where needed.
2. Don't: Allow all HTTP methods by default.

### [SYS-10] Disable Unnecessary HTTP Methods
**Identity:** SYS-10
**Rule:** Disable unnecessary HTTP methods (e.g., WebDAV).
**Rationale:** Extra methods expand the attack surface.
**Implementation:** Disable unused methods at the server level.
**Verification:** Scan for enabled methods.
**Examples:**
1. Do: Disable TRACE, TRACK, and WebDAV if unused.
2. Don't: Leave extended methods enabled without need.

### [SYS-11] Align HTTP/1.0 and HTTP/1.1 Configuration
**Identity:** SYS-11
**Rule:** Ensure HTTP/1.0 and HTTP/1.1 are configured consistently.
**Rationale:** Differences can introduce bypasses or unexpected behavior.
**Implementation:** Audit configuration for both protocol versions.
**Verification:** Test behavior across protocol versions.
**Examples:**
1. Do: Apply the same method restrictions across versions.
2. Don't: Leave HTTP/1.0 less restricted than HTTP/1.1.

### [SYS-12] Minimize Information in Response Headers
**Identity:** SYS-12
**Rule:** Remove unnecessary server and framework details from response headers.
**Rationale:** Reduces information disclosure and fingerprinting.
**Implementation:** Disable `Server` and `X-Powered-By` headers where possible.
**Verification:** Inspect response headers in production.
**Examples:**
1. Do: Strip or minimize server banner headers.
2. Don't: Expose exact server versions in headers.

### [SYS-13] Maintain Human-Readable Security Configuration
**Identity:** SYS-13
**Rule:** Ensure security configuration is exportable in human-readable form for auditing.
**Rationale:** Auditing requires transparency into security settings.
**Implementation:** Maintain documented, versioned configuration outputs.
**Verification:** Confirm configuration can be exported and reviewed.
**Examples:**
1. Do: Provide human-readable security configuration snapshots.
2. Don't: Use opaque, undocumented configuration formats.

### [SYS-14] Implement Asset Management
**Identity:** SYS-14
**Rule:** Maintain an asset inventory for system components and software.
**Rationale:** Unknown assets cannot be secured or patched.
**Implementation:** Register assets in an inventory system.
**Verification:** Audit inventory coverage against actual deployments.
**Examples:**
1. Do: Track all servers and services in CMDB.
2. Don't: Operate untracked systems.

### [SYS-15] Isolate Development from Production
**Identity:** SYS-15
**Rule:** Isolate development and test environments from production networks.
**Rationale:** Reduces risk of lateral movement into production.
**Implementation:** Use network segmentation and access controls.
**Verification:** Confirm dev/test cannot access production networks.
**Examples:**
1. Do: Separate dev/test VPCs from production.
2. Don't: Allow open access between environments.

### [SYS-16] Use Change Control for Software Updates
**Identity:** SYS-16
**Rule:** Implement change control for code and configuration changes.
**Rationale:** Uncontrolled changes can introduce security regressions.
**Implementation:** Use approvals, reviews, and audit logs for changes.
**Verification:** Confirm change control processes are enforced.
**Examples:**
1. Do: Require approvals for production changes.
2. Don't: Allow ad hoc changes without tracking.
