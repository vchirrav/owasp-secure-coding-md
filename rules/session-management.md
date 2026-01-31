# Session Management (SESS)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Session Management controls allow the application to identify a user across multiple requests. Secure management of session IDs and cookies is vital to prevent Session Hijacking and Fixation attacks.

## Checklist Rules

### Session ID Generation & Handling
* **[SESS-01]** Use the server or framework's session management controls. The application should only recognize these session identifiers as valid.
* **[SESS-02]** Session identifier creation must always be done on a trusted system (e.g., the server).
* **[SESS-03]** Session management controls should use well-vetted algorithms that ensure sufficiently random session identifiers.
* **[SESS-04]** Generate a new session identifier on any re-authentication.
* **[SESS-05]** Do not expose session identifiers in URLs, error messages, or logs.
    * Session identifiers should only be located in the HTTP cookie header.
    * Do not pass session identifiers as GET parameters.
* **[SESS-06]** Protect server-side session data from unauthorized access by other users of the server.
* **[SESS-07]** Generate a new session identifier and deactivate the old one periodically to mitigate hijacking scenarios.
* **[SESS-08]** Generate a new session identifier if the connection security changes from HTTP to HTTPS.

### Cookies & Transport Security
* **[SESS-09]** Set the domain and path for cookies containing authenticated session identifiers to an appropriately restricted value for the site.
* **[SESS-10]** Set the "secure" attribute for cookies transmitted over a TLS connection.
* **[SESS-11]** Set cookies with the `HttpOnly` attribute, unless you specifically require client-side scripts to read/set the cookie.

### Lifecycle & Termination
* **[SESS-12]** Logout functionality should fully terminate the associated session or connection.
* **[SESS-13]** Logout functionality should be available from all pages protected by authorization.
* **[SESS-14]** Establish a session inactivity timeout that is as short as possible (usually no more than several hours).
* **[SESS-15]** Disallow persistent logins and enforce periodic session terminations, especially for critical systems.
* **[SESS-16]** If a session was established before login, close that session and establish a new session after a successful login.
* **[SESS-17]** Do not allow concurrent logins with the same user ID.

### CSRF & Advanced Protection
* **[SESS-18]** Supplement standard session management for sensitive server-side operations (like account management) by utilizing per-session strong random tokens to prevent Cross-Site Request Forgery (CSRF).
* **[SESS-19]** Supplement standard session management for highly sensitive operations by utilizing per-request strong random tokens.