# Error Handling and Logging (ERR)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Secure error handling prevents information disclosure and ensures failures are handled safely. Logging provides an audit trail for detection, investigation, and compliance, while protecting logs from tampering and leakage.

## Checklist Rules

### [ERR-01] Do Not Disclose Sensitive Error Details
**Identity:** ERR-01
**Rule:** Error responses must not expose system details, session IDs, or account data.
**Rationale:** Detailed errors aid attackers in reconnaissance and exploitation.
**Implementation:** Use generic messages and log details server-side only.
**Verification:** Review error responses for sensitive details.
**Examples:**
1. Do: Return "An error occurred" to users.
2. Don't: Return stack traces or database errors to clients.

### [ERR-02] Suppress Debugging Information
**Identity:** ERR-02
**Rule:** Do not display debugging or stack trace information to users.
**Rationale:** Debug details reveal code paths, libraries, and configuration.
**Implementation:** Disable debug mode in production.
**Verification:** Trigger exceptions and confirm no stack traces are exposed.
**Examples:**
1. Do: Log stack traces internally only.
2. Don't: Show stack traces in production responses.

### [ERR-03] Use Generic Error Pages
**Identity:** ERR-03
**Rule:** Use custom, generic error pages and messages.
**Rationale:** Consistent responses reduce information leakage.
**Implementation:** Configure global error handlers and custom error views.
**Verification:** Confirm error responses are consistent and generic.
**Examples:**
1. Do: Use a standard 500 error page.
2. Don't: Expose framework default error pages.

### [ERR-04] Handle Errors in Application Logic
**Identity:** ERR-04
**Rule:** Handle errors within the application rather than relying solely on server defaults.
**Rationale:** Application-level handling ensures consistent secure responses.
**Implementation:** Use centralized error handlers and exception middleware.
**Verification:** Verify errors are routed through app handlers.
**Examples:**
1. Do: Catch and handle exceptions centrally.
2. Don't: Rely on default server error pages.

### [ERR-05] Free Resources on Error
**Identity:** ERR-05
**Rule:** Release allocated resources and memory on errors.
**Rationale:** Prevents leaks, exhaustion, and instability.
**Implementation:** Use `finally` blocks or RAII patterns.
**Verification:** Test for resource leaks under failure conditions.
**Examples:**
1. Do: Close files and DB connections on error.
2. Don't: Leak resources when exceptions occur.

### [ERR-06] Fail Securely on Security Errors
**Identity:** ERR-06
**Rule:** Security control failures must deny access by default.
**Rationale:** Failing open enables bypass of security checks.
**Implementation:** Default to deny if authorization or validation fails.
**Verification:** Simulate failures and confirm access is denied.
**Examples:**
1. Do: Deny access if auth service is down.
2. Don't: Allow access when checks fail.

### [ERR-07] Log on Trusted Systems
**Identity:** ERR-07
**Rule:** Implement logging on trusted systems (server-side).
**Rationale:** Client-side logs are untrusted and tamperable.
**Implementation:** Centralize logs on server infrastructure.
**Verification:** Ensure logs are generated server-side.
**Examples:**
1. Do: Log server events to a central log store.
2. Don't: Rely on client-side logging for security events.

### [ERR-08] Log Success and Failure Events
**Identity:** ERR-08
**Rule:** Log both successful and failed security-relevant actions.
**Rationale:** Failure-only logs can hide suspicious activity patterns.
**Implementation:** Log authentication successes and failures.
**Verification:** Confirm logs include both outcomes.
**Examples:**
1. Do: Log successful and failed logins.
2. Don't: Log only failures.

### [ERR-09] Include Key Event Metadata in Logs
**Identity:** ERR-09
**Rule:** Ensure logs contain essential metadata (timestamp, user, action, result, source).
**Rationale:** Detailed metadata is required for investigations.
**Implementation:** Standardize log fields and formats.
**Verification:** Review logs for required fields.
**Examples:**
1. Do: Include user ID, IP, and event ID.
2. Don't: Log events without context.

### [ERR-10] Prevent Log Injection
**Identity:** ERR-10
**Rule:** Ensure logs containing untrusted data cannot execute as code or alter log structure.
**Rationale:** Log injection can hide attacks or mislead analysts.
**Implementation:** Sanitize log data and use structured logging formats.
**Verification:** Attempt to inject newlines or control characters and confirm safe handling.
**Examples:**
1. Do: Use JSON logging with proper escaping.
2. Don't: Write raw user input into logs.

### [ERR-11] Restrict Log Access
**Identity:** ERR-11
**Rule:** Limit log access to authorized personnel only.
**Rationale:** Logs often contain sensitive data.
**Implementation:** Apply RBAC and secure storage for logs.
**Verification:** Confirm access control policies on log systems.
**Examples:**
1. Do: Restrict log access to security/ops teams.
2. Don't: Expose logs to general users.

### [ERR-12] Centralize Logging Operations
**Identity:** ERR-12
**Rule:** Use a master routine for all logging operations.
**Rationale:** Centralization ensures consistent formatting and security controls.
**Implementation:** Use a shared logging library or service.
**Verification:** Review code for direct, inconsistent logging calls.
**Examples:**
1. Do: Use a common logging framework.
2. Don't: Implement custom log formats per module.

### [ERR-13] Do Not Log Sensitive Data
**Identity:** ERR-13
**Rule:** Avoid logging secrets, passwords, session IDs, or sensitive payloads.
**Rationale:** Logs are often widely accessible and long-lived.
**Implementation:** Redact or mask sensitive fields.
**Verification:** Scan logs for sensitive values.
**Examples:**
1. Do: Mask tokens in logs.
2. Don't: Log raw passwords or secrets.

### [ERR-14] Enable Log Analysis
**Identity:** ERR-14
**Rule:** Ensure a mechanism exists for log analysis and alerting.
**Rationale:** Logs must be actionable to detect incidents.
**Implementation:** Use SIEM or monitoring with alerts on critical events.
**Verification:** Confirm alerts trigger on test events.
**Examples:**
1. Do: Alert on repeated login failures.
2. Don't: Store logs without monitoring.

### [ERR-15] Protect Log Integrity
**Identity:** ERR-15
**Rule:** Use cryptographic hashing or signing to detect log tampering.
**Rationale:** Attackers may alter logs to hide activity.
**Implementation:** Use append-only logs, hashing chains, or WORM storage.
**Verification:** Validate log integrity during audits.
**Examples:**
1. Do: Use signed log entries.
2. Don't: Store logs in mutable, unprotected files.

### [ERR-16] Log Input Validation Failures
**Identity:** ERR-16
**Rule:** Log all input validation failures.
**Rationale:** Repeated failures indicate probing or attacks.
**Implementation:** Record validation errors with context.
**Verification:** Confirm validation errors are logged.
**Examples:**
1. Do: Log rejected payloads with reason codes.
2. Don't: Ignore validation errors silently.

### [ERR-17] Log Authentication Attempts
**Identity:** ERR-17
**Rule:** Log all authentication attempts, especially failures.
**Rationale:** Helps detect brute force and credential stuffing.
**Implementation:** Log user ID, IP, and outcome.
**Verification:** Confirm login attempts are logged.
**Examples:**
1. Do: Log both success and failure.
2. Don't: Skip logging failed logins.

### [ERR-18] Log Access Control Failures
**Identity:** ERR-18
**Rule:** Log all access control failures.
**Rationale:** Repeated failures may indicate privilege escalation attempts.
**Implementation:** Record denied actions with user and resource details.
**Verification:** Confirm unauthorized access attempts are logged.
**Examples:**
1. Do: Log forbidden actions with resource IDs.
2. Don't: Discard access denial events.

### [ERR-19] Log Tampering Attempts
**Identity:** ERR-19
**Rule:** Log apparent tampering events or unexpected state changes.
**Rationale:** Tampering is a strong indicator of compromise.
**Implementation:** Detect and log unexpected integrity check failures.
**Verification:** Trigger tampering scenarios and verify logging.
**Examples:**
1. Do: Log checksum mismatches.
2. Don't: Ignore integrity check failures.

### [ERR-20] Log Invalid Session Token Use
**Identity:** ERR-20
**Rule:** Log attempts to use invalid or expired session tokens.
**Rationale:** Indicates session hijacking attempts or replay.
**Implementation:** Record token failures with user/IP context.
**Verification:** Use invalid tokens and confirm logs.
**Examples:**
1. Do: Log expired token usage.
2. Don't: Silently drop invalid sessions.

### [ERR-21] Log System Exceptions
**Identity:** ERR-21
**Rule:** Log all system exceptions with context.
**Rationale:** Exceptions can indicate attacks or system instability.
**Implementation:** Capture exceptions centrally with stack traces in secure logs.
**Verification:** Trigger exceptions and confirm logging.
**Examples:**
1. Do: Log exception type, message, and stack trace internally.
2. Don't: Ignore unhandled exceptions.

### [ERR-22] Log Administrative Actions
**Identity:** ERR-22
**Rule:** Log all administrative functions and security configuration changes.
**Rationale:** Admin actions are high risk and must be auditable.
**Implementation:** Record admin changes with user identity and timestamps.
**Verification:** Confirm admin changes are logged and monitored.
**Examples:**
1. Do: Log role changes and policy updates.
2. Don't: Allow admin changes without audit logs.

### [ERR-23] Log TLS Connection Failures
**Identity:** ERR-23
**Rule:** Log backend TLS connection failures.
**Rationale:** TLS failures may indicate misconfiguration or attack.
**Implementation:** Capture TLS error details in secure logs.
**Verification:** Simulate TLS errors and confirm logging.
**Examples:**
1. Do: Log failed TLS handshakes with endpoint context.
2. Don't: Suppress TLS errors.

### [ERR-24] Log Cryptographic Module Failures
**Identity:** ERR-24
**Rule:** Log cryptographic module failures.
**Rationale:** Crypto failures can indicate attacks or misconfiguration.
**Implementation:** Log key errors, verification failures, and decryption errors.
**Verification:** Trigger crypto failures and confirm logs.
**Examples:**
1. Do: Log signature verification failures.
2. Don't: Ignore crypto errors silently.
