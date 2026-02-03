# Authentication and Password Management (AUTH)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Authentication verifies identity; password management ensures credentials are stored, transmitted, and rotated securely. These rules focus on strong authentication flows, secure credential handling, and resilience to brute force and account takeover.

## Checklist Rules

### [AUTH-01] Require Authentication by Default
**Identity:** AUTH-01
**Rule:** Require authentication for all pages and resources except explicitly public ones.
**Rationale:** Unauthenticated exposure is a common source of data leakage and unauthorized actions.
**Implementation:** Use a default-deny access policy; explicitly mark public endpoints.
**Verification:** Enumerate endpoints and confirm protected routes require authentication.
**Examples:**
1. Do: Protect all routes except `/health` and `/login`.
2. Don't: Assume unlisted routes are protected.

### [AUTH-02] Enforce Authentication on Trusted Systems
**Identity:** AUTH-02
**Rule:** Enforce authentication controls on a trusted system (server-side).
**Rationale:** Client-side checks can be bypassed or altered.
**Implementation:** Validate credentials and sessions on the server; never rely on client checks.
**Verification:** Confirm server denies access when client-side logic is bypassed.
**Examples:**
1. Do: Authenticate requests on the server for every call.
2. Don't: Use only client-side checks before accessing data.

### [AUTH-03] Use Standard, Tested Authentication Services
**Identity:** AUTH-03
**Rule:** Use standard, vetted authentication services or frameworks.
**Rationale:** Custom authentication logic is prone to subtle errors.
**Implementation:** Use platform auth libraries, IdPs, or standard protocols like OIDC.
**Verification:** Confirm custom code does not reimplement auth protocols.
**Examples:**
1. Do: Use a well-maintained auth library.
2. Don't: Build a custom password storage scheme.

### [AUTH-04] Centralize Authentication Controls
**Identity:** AUTH-04
**Rule:** Use a centralized implementation for all authentication checks.
**Rationale:** Centralization reduces inconsistencies and bypasses.
**Implementation:** Use middleware or gateway-based authentication for all routes.
**Verification:** Ensure every entry point uses the centralized auth logic.
**Examples:**
1. Do: Enforce auth via a shared middleware.
2. Don't: Implement per-controller ad hoc auth.

### [AUTH-05] Segregate Authentication Logic
**Identity:** AUTH-05
**Rule:** Segregate authentication logic from the requested resource and use redirection or middleware.
**Rationale:** Separation reduces bypass opportunities and improves maintainability.
**Implementation:** Use dedicated auth endpoints and middleware.
**Verification:** Confirm that resources are not directly accessible without the auth flow.
**Examples:**
1. Do: Redirect unauthenticated users to a login route.
2. Don't: Combine authentication and data access in a single handler.

### [AUTH-06] Fail Securely
**Identity:** AUTH-06
**Rule:** Authentication controls must fail closed.
**Rationale:** Errors should not permit access.
**Implementation:** Deny on errors, timeouts, or missing configuration.
**Verification:** Simulate auth service failures and confirm access is denied.
**Examples:**
1. Do: Deny if auth service is unavailable.
2. Don't: Permit access during auth outages.

### [AUTH-07] Secure Admin and Account Management
**Identity:** AUTH-07
**Rule:** Administrative and account management functions must be at least as secure as primary authentication.
**Rationale:** Weak admin flows enable privilege escalation.
**Implementation:** Require strong auth, MFA, and step-up verification for admin actions.
**Verification:** Attempt admin actions without proper auth and verify denial.
**Examples:**
1. Do: Require MFA for admin actions.
2. Don't: Expose admin panels with weaker auth.

### [AUTH-08] Store Passwords with Strong One-Way Hashes
**Identity:** AUTH-08
**Rule:** Store only cryptographically strong, salted, one-way password hashes.
**Rationale:** Weak or reversible storage enables credential theft.
**Implementation:** Use Argon2id, bcrypt, or scrypt with unique salts; restrict write access to credential store.
**Verification:** Verify storage uses strong hashes and salts; confirm no MD5/SHA-1.
**Examples:**
1. Do: Store `argon2id(salt, password)`.
2. Don't: Store plaintext or MD5 hashes.

### [AUTH-09] Hash Passwords on Trusted Systems
**Identity:** AUTH-09
**Rule:** Perform password hashing only on trusted systems (server-side).
**Rationale:** Client-side hashing can be bypassed and reused.
**Implementation:** Always hash passwords on the server with a secret salt.
**Verification:** Ensure server validates and hashes credentials independent of client.
**Examples:**
1. Do: Hash on the server before storing.
2. Don't: Accept pre-hashed passwords from clients.

### [AUTH-10] Validate Credentials After Full Input
**Identity:** AUTH-10
**Rule:** Validate authentication data only after all input is received.
**Rationale:** Partial validation can leak information or allow bypass.
**Implementation:** Collect all required fields before validation.
**Verification:** Confirm authentication is processed only after full input.
**Examples:**
1. Do: Validate after full username/password input.
2. Don't: Validate partial inputs incrementally.

### [AUTH-11] Use Generic Authentication Error Messages
**Identity:** AUTH-11
**Rule:** Authentication failure responses must not indicate which part of the data was incorrect.
**Rationale:** Specific errors enable username enumeration.
**Implementation:** Use a generic message like "Invalid username or password."
**Verification:** Confirm errors are identical for wrong username vs wrong password.
**Examples:**
1. Do: Return a single generic failure message.
2. Don't: Reveal "user not found" or "wrong password."

### [AUTH-12] Send Credentials via POST
**Identity:** AUTH-12
**Rule:** Transmit authentication credentials only in the body of HTTP POST (or equivalent) requests.
**Rationale:** Query parameters can be logged or cached.
**Implementation:** Use POST over TLS and disable credential logging.
**Verification:** Confirm credentials never appear in URLs or logs.
**Examples:**
1. Do: Send credentials in POST body over TLS.
2. Don't: Put credentials in query strings.

### [AUTH-13] Protect Password Transmission
**Identity:** AUTH-13
**Rule:** Send non-temporary passwords only over encrypted connections.
**Rationale:** Unencrypted transmission enables interception.
**Implementation:** Enforce TLS for authentication endpoints.
**Verification:** Ensure HTTP is redirected to HTTPS and HSTS is enabled where appropriate.
**Examples:**
1. Do: Enforce HTTPS for login.
2. Don't: Allow HTTP for credential submission.

### [AUTH-14] Obscure Password Entry
**Identity:** AUTH-14
**Rule:** Obscure password entry on user screens.
**Rationale:** Prevents shoulder-surfing and casual observation.
**Implementation:** Use password input fields that hide characters by default.
**Verification:** Confirm password fields mask input.
**Examples:**
1. Do: Use password input types.
2. Don't: Display passwords in plain text by default.

### [AUTH-15] Disable "Remember Me" for Password Fields
**Identity:** AUTH-15
**Rule:** Disable "remember me" or auto-fill for password fields when inappropriate.
**Rationale:** Stored passwords on shared devices can be compromised.
**Implementation:** Set `autocomplete="off"` or appropriate policy for sensitive contexts.
**Verification:** Check browser autofill behavior for login forms.
**Examples:**
1. Do: Disable password autofill on shared kiosks.
2. Don't: Enable remember-me on high-risk apps.

### [AUTH-16] Enforce Password Complexity
**Identity:** AUTH-16
**Rule:** Enforce password complexity requirements suitable for the application's risk level.
**Rationale:** Complexity reduces the risk of easy guessing.
**Implementation:** Require a mix of character classes or use passphrase policies with strength checks.
**Verification:** Attempt weak passwords and ensure rejection.
**Examples:**
1. Do: Enforce complexity or strong passphrase rules.
2. Don't: Accept trivial passwords like "password123".

### [AUTH-17] Enforce Password Length Requirements
**Identity:** AUTH-17
**Rule:** Enforce minimum password length requirements; prefer longer passphrases.
**Rationale:** Length provides more security than complexity alone.
**Implementation:** Set minimum length (e.g., 12+); allow long passphrases.
**Verification:** Confirm short passwords are rejected.
**Examples:**
1. Do: Require 12+ characters or passphrases.
2. Don't: Allow 6-character passwords.

### [AUTH-18] Lock Out After Repeated Failures
**Identity:** AUTH-18
**Rule:** Disable or throttle accounts after a defined number of failed login attempts.
**Rationale:** Limits brute force attacks.
**Implementation:** Use account lockout or exponential backoff with alerting.
**Verification:** Attempt repeated failures and confirm lockout or throttling.
**Examples:**
1. Do: Lock or throttle after 5 failed attempts.
2. Don't: Allow unlimited failed logins.

### [AUTH-19] Enforce Password Changes by Policy
**Identity:** AUTH-19
**Rule:** Enforce password changes based on policy for high-risk systems.
**Rationale:** Periodic changes can reduce exposure from leaked credentials.
**Implementation:** Define rotation cadence for sensitive accounts; avoid forced rotation for low-risk accounts without evidence.
**Verification:** Confirm policy is enforced for targeted roles.
**Examples:**
1. Do: Require periodic changes for privileged accounts.
2. Don't: Apply disruptive rotation without risk justification.

### [AUTH-20] Prevent Password Reuse
**Identity:** AUTH-20
**Rule:** Prevent users from reusing recent passwords.
**Rationale:** Reuse undermines password change effectiveness.
**Implementation:** Maintain a password history; compare against last N hashes.
**Verification:** Attempt to reuse an old password and confirm rejection.
**Examples:**
1. Do: Block reuse of the last 5 passwords.
2. Don't: Allow immediate reuse after change.

### [AUTH-21] Prevent Rapid Password Cycling
**Identity:** AUTH-21
**Rule:** Require a minimum password age before another change.
**Rationale:** Prevents cycling through old passwords to bypass reuse limits.
**Implementation:** Enforce minimum time (e.g., 24 hours) before change.
**Verification:** Attempt immediate changes and ensure rejection.
**Examples:**
1. Do: Enforce a minimum change interval.
2. Don't: Allow instant multiple changes.

### [AUTH-22] Secure Password Reset and Change Flows
**Identity:** AUTH-22
**Rule:** Apply the same level of security to password reset/change as to authentication.
**Rationale:** Weak reset flows bypass strong login controls.
**Implementation:** Require identity verification and secure tokens for resets.
**Verification:** Attempt reset without adequate verification and ensure denial.
**Examples:**
1. Do: Use verified email or MFA for reset.
2. Don't: Reset solely on a known username.

### [AUTH-23] Use Strong Reset Questions (If Used)
**Identity:** AUTH-23
**Rule:** If using security questions, require answers that are not easily guessable.
**Rationale:** Common answers are easy to research or guess.
**Implementation:** Prefer not using security questions; if used, allow custom questions and enforce entropy.
**Verification:** Evaluate reset flows for guessable answers.
**Examples:**
1. Do: Use high-entropy recovery methods over security questions.
2. Don't: Use "mother's maiden name" as a primary factor.

### [AUTH-24] Use Pre-Registered Email for Resets
**Identity:** AUTH-24
**Rule:** Send reset links only to pre-registered email addresses.
**Rationale:** Prevents reset to attacker-controlled addresses.
**Implementation:** Use verified email addresses and avoid showing whether an email exists.
**Verification:** Attempt reset with unverified email and ensure denial.
**Examples:**
1. Do: Send reset links only to verified emails.
2. Don't: Allow reset to arbitrary email input.

### [AUTH-25] Set Short Expiration on Reset Tokens
**Identity:** AUTH-25
**Rule:** Temporary reset links or passwords must expire quickly.
**Rationale:** Short windows limit exposure if links are intercepted.
**Implementation:** Set expiration times (e.g., 15-60 minutes) and single-use tokens.
**Verification:** Use expired tokens and ensure rejection.
**Examples:**
1. Do: Use one-time reset links with short TTL.
2. Don't: Use long-lived reset links.

### [AUTH-26] Force Change of Temporary Passwords
**Identity:** AUTH-26
**Rule:** Require changing temporary passwords at next login.
**Rationale:** Temporary credentials should not remain active.
**Implementation:** Force password update on first successful login with a temp password.
**Verification:** Confirm accounts cannot continue without resetting.
**Examples:**
1. Do: Force update after temporary login.
2. Don't: Allow continued use of temporary passwords.

### [AUTH-27] Notify Users of Password Resets
**Identity:** AUTH-27
**Rule:** Notify users when a password reset occurs.
**Rationale:** Enables users to detect unauthorized resets.
**Implementation:** Send email or in-app notifications on reset events.
**Verification:** Confirm notifications are sent on reset.
**Examples:**
1. Do: Notify on reset attempts and completion.
2. Don't: Reset silently without notification.

### [AUTH-28] Authenticate External Connections
**Identity:** AUTH-28
**Rule:** Use authentication for connections to external systems that process sensitive information.
**Rationale:** Unauthenticated external access exposes data.
**Implementation:** Use mutual TLS, API keys, or OAuth for external system access.
**Verification:** Confirm external system access requires valid credentials.
**Examples:**
1. Do: Require mTLS for service-to-service access.
2. Don't: Allow anonymous access to sensitive services.

### [AUTH-29] Protect External Credentials
**Identity:** AUTH-29
**Rule:** Encrypt and store external credentials in a protected location; never store them in source code.
**Rationale:** Hardcoded or exposed credentials are easily compromised.
**Implementation:** Use secret managers or vaults; restrict access and audit use.
**Verification:** Scan repos and configs for embedded secrets.
**Examples:**
1. Do: Store credentials in a secret manager.
2. Don't: Commit API keys to source control.

### [AUTH-30] Review Third-Party Authentication Code
**Identity:** AUTH-30
**Rule:** Review and validate third-party authentication code or libraries.
**Rationale:** Compromised or vulnerable auth dependencies are high-risk.
**Implementation:** Vet dependencies, pin versions, and monitor for CVEs.
**Verification:** Run SCA scans and code review for auth integrations.
**Examples:**
1. Do: Use trusted, maintained auth libraries.
2. Don't: Integrate unreviewed auth plugins.

### [AUTH-31] Report Last Account Use
**Identity:** AUTH-31
**Rule:** Report the last successful or unsuccessful account activity at next login.
**Rationale:** Users can detect suspicious access.
**Implementation:** Store last login metadata and display it securely.
**Verification:** Confirm the UI shows last login time/IP.
**Examples:**
1. Do: Display last login timestamp and IP.
2. Don't: Hide account activity from users.

### [AUTH-32] Monitor Password Reuse Attacks
**Identity:** AUTH-32
**Rule:** Monitor for attacks against multiple accounts using the same password.
**Rationale:** Credential stuffing uses known password lists across accounts.
**Implementation:** Detect repeated password failures across accounts and trigger alerts.
**Verification:** Simulate credential stuffing and confirm detection.
**Examples:**
1. Do: Trigger alerts on repeated password reuse patterns.
2. Don't: Ignore cross-account attack patterns.

### [AUTH-33] Change Vendor Defaults
**Identity:** AUTH-33
**Rule:** Change or disable all vendor-supplied default credentials.
**Rationale:** Default credentials are widely known and easily exploited.
**Implementation:** Enforce default credential changes during setup.
**Verification:** Ensure default accounts cannot authenticate.
**Examples:**
1. Do: Require new credentials at first use.
2. Don't: Leave default admin passwords in place.

### [AUTH-34] Re-Authenticate for Critical Operations
**Identity:** AUTH-34
**Rule:** Re-authenticate users before sensitive actions.
**Rationale:** Prevents session hijacking from enabling high-risk changes.
**Implementation:** Require password re-entry or MFA before critical changes.
**Verification:** Confirm critical operations trigger re-authentication.
**Examples:**
1. Do: Re-authenticate before changing email or payout settings.
2. Don't: Allow critical changes without confirmation.

### [AUTH-35] Use Multi-Factor Authentication (MFA)
**Identity:** AUTH-35
**Rule:** Use MFA for high-value or sensitive accounts and transactions.
**Rationale:** MFA reduces risk of credential compromise.
**Implementation:** Support TOTP, push, or hardware keys; require MFA for admins.
**Verification:** Ensure MFA is required and enforced for high-risk actions.
**Examples:**
1. Do: Require MFA for admin and privileged accounts.
2. Don't: Allow privileged access with passwords only.
