# Session Management (SESS)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Session management securely identifies users across requests and prevents session hijacking, fixation, and replay. It requires secure session ID generation, protection, and lifecycle controls.

## Checklist Rules

### [SESS-01] Use Framework Session Controls
**Identity:** SESS-01
**Rule:** Use the server or framework's session management mechanisms.
**Rationale:** Custom session logic is error-prone and insecure.
**Implementation:** Rely on vetted session libraries and configuration.
**Verification:** Confirm the app uses the framework session store and IDs.
**Examples:**
1. Do: Use built-in session middleware.
2. Don't: Implement custom session ID generation.

### [SESS-02] Create Session IDs on Trusted Systems
**Identity:** SESS-02
**Rule:** Generate session identifiers on trusted servers only.
**Rationale:** Client-generated IDs can be predicted or manipulated.
**Implementation:** Generate IDs server-side with strong randomness.
**Verification:** Ensure clients never supply session IDs.
**Examples:**
1. Do: Generate session IDs server-side.
2. Don't: Accept session IDs from client input.

### [SESS-03] Use Strong Random Session Identifiers
**Identity:** SESS-03
**Rule:** Use cryptographically strong algorithms for session IDs.
**Rationale:** Predictable IDs enable hijacking.
**Implementation:** Use CSPRNG-based session IDs.
**Verification:** Audit session ID generation for CSPRNG usage.
**Examples:**
1. Do: Use 128-bit or larger random session IDs.
2. Don't: Use incremental or guessable session IDs.

### [SESS-04] Regenerate Session ID on Re-Authentication
**Identity:** SESS-04
**Rule:** Generate a new session ID on re-authentication.
**Rationale:** Prevents session fixation.
**Implementation:** Regenerate IDs after login or privilege changes.
**Verification:** Confirm ID changes on re-authentication.
**Examples:**
1. Do: Rotate session IDs after login.
2. Don't: Keep the same session ID after re-auth.

### [SESS-05] Do Not Expose Session IDs
**Identity:** SESS-05
**Rule:** Do not expose session IDs in URLs, logs, or error messages.
**Rationale:** Exposure allows session hijacking.
**Implementation:** Store session IDs only in HTTP cookies.
**Verification:** Search logs and URLs for session IDs.
**Examples:**
1. Do: Use cookies for session IDs.
2. Don't: Pass session IDs via query parameters.

### [SESS-06] Protect Server-Side Session Data
**Identity:** SESS-06
**Rule:** Protect session data from unauthorized server-side access.
**Rationale:** Session data often contains sensitive information.
**Implementation:** Secure session stores with access controls and encryption.
**Verification:** Confirm session stores are restricted.
**Examples:**
1. Do: Restrict session store access to the app.
2. Don't: Store session data in publicly accessible caches.

### [SESS-07] Rotate Session IDs Periodically
**Identity:** SESS-07
**Rule:** Regenerate session IDs periodically to reduce hijacking risk.
**Rationale:** Long-lived IDs increase exposure.
**Implementation:** Rotate IDs based on time or risk events.
**Verification:** Confirm periodic rotation occurs.
**Examples:**
1. Do: Rotate session IDs every few hours.
2. Don't: Keep a single session ID indefinitely.

### [SESS-08] Regenerate IDs on TLS Changes
**Identity:** SESS-08
**Rule:** Generate a new session ID when switching from HTTP to HTTPS.
**Rationale:** Prevents fixation during protocol upgrades.
**Implementation:** Regenerate session IDs after secure connection establishment.
**Verification:** Confirm ID changes on protocol upgrade.
**Examples:**
1. Do: Rotate session IDs after HTTPS upgrade.
2. Don't: Maintain the same ID across protocol changes.

### [SESS-09] Restrict Cookie Domain and Path
**Identity:** SESS-09
**Rule:** Set session cookie domain and path to the most restrictive values.
**Rationale:** Limits exposure to subdomains and paths.
**Implementation:** Use exact domain and path scoping for session cookies.
**Verification:** Inspect cookie attributes in responses.
**Examples:**
1. Do: Scope cookies to the specific app domain.
2. Don't: Use wide `Domain=.example.com` unnecessarily.

### [SESS-10] Set Secure Cookie Attribute
**Identity:** SESS-10
**Rule:** Mark session cookies as `Secure`.
**Rationale:** Prevents cookies from being sent over HTTP.
**Implementation:** Set `Secure` on cookies for TLS-only transmission.
**Verification:** Confirm `Secure` attribute is present.
**Examples:**
1. Do: Set `Secure` for session cookies.
2. Don't: Allow session cookies over HTTP.

### [SESS-11] Set HttpOnly Attribute
**Identity:** SESS-11
**Rule:** Mark session cookies as `HttpOnly` unless client-side access is required.
**Rationale:** Prevents JavaScript access in XSS scenarios.
**Implementation:** Use `HttpOnly` by default.
**Verification:** Inspect cookies for HttpOnly attribute.
**Examples:**
1. Do: Use `HttpOnly` for session cookies.
2. Don't: Expose session cookies to JS.

### [SESS-12] Terminate Session on Logout
**Identity:** SESS-12
**Rule:** Logout must fully terminate the session.
**Rationale:** Ensures sessions cannot be reused after logout.
**Implementation:** Invalidate session server-side and delete cookies.
**Verification:** Confirm old session IDs are invalid after logout.
**Examples:**
1. Do: Invalidate session tokens on logout.
2. Don't: Only clear client cookies without server invalidation.

### [SESS-13] Provide Logout on Protected Pages
**Identity:** SESS-13
**Rule:** Make logout available from all protected pages.
**Rationale:** Users need a clear way to terminate sessions.
**Implementation:** Provide a visible logout option in authenticated UI.
**Verification:** Confirm logout is accessible across protected routes.
**Examples:**
1. Do: Provide a logout option in navigation.
2. Don't: Hide logout in obscure settings.

### [SESS-14] Enforce Inactivity Timeouts
**Identity:** SESS-14
**Rule:** Set session inactivity timeouts to reduce exposure.
**Rationale:** Idle sessions are vulnerable to hijacking.
**Implementation:** Expire sessions after a defined idle period.
**Verification:** Test idle session expiration.
**Examples:**
1. Do: Timeout sessions after inactivity.
2. Don't: Allow indefinite idle sessions.

### [SESS-15] Avoid Persistent Logins for Critical Systems
**Identity:** SESS-15
**Rule:** Disallow long-lived persistent sessions for high-risk systems.
**Rationale:** Persistent sessions increase exposure window.
**Implementation:** Use short-lived sessions with re-authentication.
**Verification:** Ensure persistent login is disabled where required.
**Examples:**
1. Do: Require periodic re-authentication.
2. Don't: Use "remember me" for admin accounts.

### [SESS-16] Regenerate Session After Login
**Identity:** SESS-16
**Rule:** If a session existed before login, invalidate it and create a new one after login.
**Rationale:** Prevents session fixation attacks.
**Implementation:** Always rotate session IDs at login.
**Verification:** Confirm session IDs change post-login.
**Examples:**
1. Do: Regenerate session IDs after authentication.
2. Don't: Keep anonymous session IDs after login.

### [SESS-17] Restrict Concurrent Logins
**Identity:** SESS-17
**Rule:** Do not allow concurrent logins with the same user ID where policy requires.
**Rationale:** Reduces hijacking and credential sharing risk.
**Implementation:** Track active sessions and revoke old ones on new login.
**Verification:** Log in from two devices and confirm policy enforcement.
**Examples:**
1. Do: Enforce single active session for sensitive accounts.
2. Don't: Allow unlimited concurrent sessions where not intended.

### [SESS-18] Use Per-Session CSRF Tokens
**Identity:** SESS-18
**Rule:** Use per-session strong random tokens to prevent CSRF.
**Rationale:** CSRF tokens tie requests to authenticated sessions.
**Implementation:** Generate CSRF tokens per session and validate on state-changing actions.
**Verification:** Attempt CSRF without token and ensure denial.
**Examples:**
1. Do: Require CSRF tokens on POST/PUT/DELETE.
2. Don't: Accept state changes without CSRF validation.

### [SESS-19] Use Per-Request Tokens for High-Risk Actions
**Identity:** SESS-19
**Rule:** Use per-request strong random tokens for highly sensitive operations.
**Rationale:** One-time tokens further reduce CSRF and replay risk.
**Implementation:** Generate one-time tokens for critical actions (e.g., transfers).
**Verification:** Attempt replay of a token and confirm rejection.
**Examples:**
1. Do: Use one-time tokens for fund transfers.
2. Don't: Reuse tokens for high-risk actions.
