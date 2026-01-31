# Error Handling and Logging (ERR)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Proper error handling prevents the leakage of sensitive system information to attackers. Comprehensive logging ensures that security-critical events are recorded, providing an audit trail for forensic analysis and intrusion detection.

## Checklist Rules

### Error Handling
* **[ERR-01]** Do not disclose sensitive information in error responses, including system details, session identifiers, or account information.
* **[ERR-02]** Use error handlers that do not display debugging or stack trace information.
* **[ERR-03]** Implement generic error messages and use custom error pages.
* **[ERR-04]** The application should handle application errors and not rely on the server configuration.
* **[ERR-05]** Properly free allocated memory when error conditions occur.
* **[ERR-06]** Error handling logic associated with security controls should deny access by default.

### Logging
* **[ERR-07]** All logging controls should be implemented on a trusted system (e.g., the server).
* **[ERR-08]** Logging controls should support both success and failure of specified security events.
* **[ERR-09]** Ensure logs contain important log event data.
* **[ERR-10]** Ensure log entries that include un-trusted data will not execute as code in the intended log viewing interface or software.
* **[ERR-11]** Restrict access to logs to only authorized individuals.
* **[ERR-12]** Utilize a master routine for all logging operations.
* **[ERR-13]** Do not store sensitive information in logs, including unnecessary system details, session identifiers, or passwords.
* **[ERR-14]** Ensure that a mechanism exists to conduct log analysis.
* **[ERR-15]** Use a cryptographic hash function to validate log entry integrity.

### Events to Log
* **[ERR-16]** Log all input validation failures.
* **[ERR-17]** Log all authentication attempts, especially failures.
* **[ERR-18]** Log all access control failures.
* **[ERR-19]** Log all apparent tampering events, including unexpected changes to state data.
* **[ERR-20]** Log attempts to connect with invalid or expired session tokens.
* **[ERR-21]** Log all system exceptions.
* **[ERR-22]** Log all administrative functions, including changes to the security configuration settings.
* **[ERR-23]** Log all backend TLS connection failures.
* **[ERR-24]** Log cryptographic module failures.