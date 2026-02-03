# Access Control (AC)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Access control ensures authenticated subjects can only access authorized resources and actions. These rules apply across applications, services, APIs, and infrastructure, and aim to prevent broken access control, privilege escalation, and unauthorized data access.

## Checklist Rules

### [AC-01] Authorize Using Trusted Server-Side State
**Identity:** AC-01
**Rule:** Use only trusted, server-side objects for authorization decisions.
**Rationale:** Client-controlled data can be tampered with and must never determine access rights.
**Implementation:** Base authorization on server-side session/user records and verified claims, not user-provided parameters.
**Verification:** Review access checks to ensure they do not rely on request parameters, cookies, or client storage alone.
**Examples:**
1. Do: Authorize using user ID from a server session or verified token claims.
2. Don't: Use a `role` parameter from the request body to grant access.

### [AC-02] Centralize Authorization
**Identity:** AC-02
**Rule:** Use a single, centralized component for authorization checks.
**Rationale:** Scattered authorization logic is inconsistent and error-prone.
**Implementation:** Implement an authorization service, middleware, or policy engine used by all endpoints.
**Verification:** Confirm no endpoint bypasses the central authorization layer.
**Examples:**
1. Do: Enforce policies through shared middleware.
2. Don't: Implement ad hoc access checks in random controllers.

### [AC-03] Fail Securely
**Identity:** AC-03
**Rule:** Access controls must fail closed.
**Rationale:** Errors should not result in unintended access.
**Implementation:** Deny on errors, timeouts, or missing policy configuration.
**Verification:** Induce policy retrieval failures and confirm access is denied.
**Examples:**
1. Do: Default to deny when policy lookup fails.
2. Don't: Allow access when authorization cannot be evaluated.

### [AC-04] Deny if Security Configuration is Unavailable
**Identity:** AC-04
**Rule:** Deny all access if security configuration cannot be loaded.
**Rationale:** Operating without policy configuration is equivalent to disabling security.
**Implementation:** Treat missing/invalid configuration as fatal; block startup or deny requests.
**Verification:** Simulate missing policy file/DB and ensure access is denied.
**Examples:**
1. Do: Fail startup if policy config is missing.
2. Don't: Allow requests with empty policy rules.

### [AC-05] Enforce Authorization on Every Request
**Identity:** AC-05
**Rule:** Apply authorization checks to every request, including background and internal calls.
**Rationale:** Gaps in request coverage are a common source of unauthorized access.
**Implementation:** Apply checks to all routes, includes, AJAX calls, and internal service calls.
**Verification:** Enumerate endpoints and verify each is protected.
**Examples:**
1. Do: Enforce policies on every API route.
2. Don't: Skip checks for internal endpoints.

### [AC-06] Segregate Privileged Logic
**Identity:** AC-06
**Rule:** Isolate privileged actions into dedicated, tightly controlled code paths.
**Rationale:** Mixing privileged and unprivileged logic increases the chance of bypass.
**Implementation:** Create separate admin or privileged service layers with strict checks.
**Verification:** Review privileged functions for clear isolation and explicit authorization.
**Examples:**
1. Do: Separate admin handlers from user handlers.
2. Don't: Mix privileged actions into general handlers.

### [AC-07] Restrict Access to Resources by Default
**Identity:** AC-07
**Rule:** Restrict access to files, URLs, functions, and services to authorized users only.
**Rationale:** Overexposed resources are frequently exploited.
**Implementation:** Use deny-by-default policies and explicit allow lists for resources.
**Verification:** Attempt to access resources without the required role and ensure denial.
**Examples:**
1. Do: Use allow lists for admin routes.
2. Don't: Rely on hidden URLs for security.

### [AC-08] Protect Direct Object References
**Identity:** AC-08
**Rule:** Enforce authorization for every direct object reference.
**Rationale:** IDOR vulnerabilities allow data access by guessing identifiers.
**Implementation:** Check ownership or permissions for object IDs in every request.
**Verification:** Attempt to access another user's object by ID and ensure denial.
**Examples:**
1. Do: Verify `resource.ownerId == currentUser.id`.
2. Don't: Trust object IDs provided by the client.

### [AC-09] Restrict Access to Authorization Data
**Identity:** AC-09
**Rule:** Limit access to application data and attributes used for authorization.
**Rationale:** Manipulation or exposure of policy data undermines access control.
**Implementation:** Protect roles, groups, entitlements, and policies with strict access controls.
**Verification:** Ensure only authorized admins can modify authorization data.
**Examples:**
1. Do: Protect role assignment APIs.
2. Don't: Let standard users edit their own roles.

### [AC-10] Protect Security Configuration
**Identity:** AC-10
**Rule:** Restrict access to security-relevant configuration data.
**Rationale:** Configuration changes can disable or weaken access control.
**Implementation:** Limit write access to config; audit changes; store securely.
**Verification:** Confirm only privileged accounts can modify config.
**Examples:**
1. Do: Require admin approval for policy updates.
2. Don't: Store policy files in publicly writable storage.

### [AC-11] Keep Server and UI Rules Consistent
**Identity:** AC-11
**Rule:** Ensure server-side access control matches UI representations.
**Rationale:** UI-only restrictions can be bypassed by direct requests.
**Implementation:** Enforce rules server-side; use UI to reflect server policies.
**Verification:** Bypass UI and confirm server denies unauthorized actions.
**Examples:**
1. Do: Enforce checks on the API regardless of UI state.
2. Don't: Assume hidden buttons prevent access.

### [AC-12] Protect Client-Stored State
**Identity:** AC-12
**Rule:** If state must be stored on the client, protect it with encryption and integrity checks.
**Rationale:** Client data is tamperable and can be manipulated to gain privileges.
**Implementation:** Use signed/encrypted tokens with server-side validation.
**Verification:** Modify client state and verify the server detects tampering.
**Examples:**
1. Do: Sign session data in a token with a server key.
2. Don't: Store raw privileges in local storage.

### [AC-13] Enforce Business Logic Flows
**Identity:** AC-13
**Rule:** Enforce correct application flow and business rules.
**Rationale:** Attackers can bypass normal workflows to gain advantage.
**Implementation:** Validate workflow state transitions server-side.
**Verification:** Attempt to skip required steps and ensure denial.
**Examples:**
1. Do: Enforce payment before order fulfillment.
2. Don't: Allow order status changes without required steps.

### [AC-14] Rate-Limit Transactions
**Identity:** AC-14
**Rule:** Limit the number of transactions a user or device can perform in a given time.
**Rationale:** Rate limits reduce brute force and abuse.
**Implementation:** Apply throttling by account, IP, or device with sensible limits.
**Verification:** Simulate high-rate actions and confirm throttling triggers.
**Examples:**
1. Do: Limit password resets to a small number per hour.
2. Don't: Allow unlimited sensitive transactions.

### [AC-15] Do Not Rely on Referrer for Authorization
**Identity:** AC-15
**Rule:** Use the `Referer` header only as a supplemental signal, never as a primary authorization check.
**Rationale:** Referrer is missing or spoofable and not a reliable security control.
**Implementation:** Enforce proper authorization independent of referrer presence.
**Verification:** Remove or spoof referrer and confirm access control still works.
**Examples:**
1. Do: Validate access based on user identity and policy.
2. Don't: Grant access if `Referer` matches a URL.

### [AC-16] Re-Validate Authorization for Long Sessions
**Identity:** AC-16
**Rule:** For long-lived sessions, periodically re-validate authorization and terminate sessions if privileges change.
**Rationale:** Privilege changes must take effect promptly to avoid over-privilege.
**Implementation:** Re-check roles/entitlements on a schedule or on sensitive actions.
**Verification:** Change a user's role and ensure ongoing sessions are downgraded or terminated.
**Examples:**
1. Do: Re-check entitlements before sensitive operations.
2. Don't: Let users retain revoked privileges indefinitely.

### [AC-17] Audit and Disable Unused Accounts
**Identity:** AC-17
**Rule:** Audit accounts and disable inactive accounts after a defined period.
**Rationale:** Dormant accounts are a common attack vector.
**Implementation:** Establish inactivity thresholds and automated disablement.
**Verification:** Confirm stale accounts are disabled according to policy.
**Examples:**
1. Do: Disable accounts after 30 days of inactivity or per policy.
2. Don't: Leave unused accounts active indefinitely.

### [AC-18] Support Immediate Account and Session Revocation
**Identity:** AC-18
**Rule:** Allow immediate disabling of accounts and termination of active sessions.
**Rationale:** Rapid response is required after compromise or policy violations.
**Implementation:** Implement server-side session invalidation and token revocation.
**Verification:** Revoke an account and ensure all sessions are invalidated promptly.
**Examples:**
1. Do: Maintain a token revocation list or short-lived tokens with re-auth.
2. Don't: Wait for tokens to expire naturally after compromise.

### [AC-19] Apply Least Privilege to Service Accounts
**Identity:** AC-19
**Rule:** Service accounts must use the least privilege required.
**Rationale:** Over-privileged service accounts magnify impact of compromise.
**Implementation:** Assign minimal roles and isolate service accounts by function.
**Verification:** Review service account permissions against required operations.
**Examples:**
1. Do: Create purpose-specific service accounts with narrow scopes.
2. Don't: Use a single admin account for all services.

### [AC-20] Document Business Rules and Access Criteria
**Identity:** AC-20
**Rule:** Document all business rules and access criteria in a formal access control policy.
**Rationale:** Clear documentation ensures consistency and auditability.
**Implementation:** Maintain a policy document tied to roles, resources, and actions; version changes.
**Verification:** Confirm policy documentation matches implemented checks.
**Examples:**
1. Do: Keep an updated access control policy with role-action mappings.
2. Don't: Rely on tribal knowledge for authorization rules.
