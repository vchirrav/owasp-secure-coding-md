# Client-Side Security (CLIENT)

> Source: OWASP Client-Side Security Cheat Sheet, MDN Web Docs & W3C Standards

## Principles
Client-side security protects users in the browser and reduces the impact of XSS, clickjacking, data exfiltration, and unsafe DOM usage. It relies on secure headers, safe JavaScript practices, and careful handling of browser APIs.

## Checklist Rules

### [CLIENT-01] Implement a Strict Content Security Policy (CSP)
**Identity:** CLIENT-01
**Rule:** Use a strict CSP to restrict sources of scripts, styles, and other resources.
**Rationale:** CSP reduces XSS impact and limits where code can be loaded from.
**Implementation:** Use nonces or hashes; avoid `unsafe-inline` and `unsafe-eval`; restrict `script-src` and `object-src`.
**Verification:** Test CSP enforcement and ensure violations are blocked and reported.
**Examples:**
1. Do: Use nonce-based CSP for inline scripts.
2. Don't: Allow `unsafe-inline` or `unsafe-eval` in production.

### [CLIENT-02] Prevent Clickjacking
**Identity:** CLIENT-02
**Rule:** Prevent framing via `X-Frame-Options` or CSP `frame-ancestors`.
**Rationale:** Clickjacking tricks users into unintended actions.
**Implementation:** Set `X-Frame-Options: DENY` or `SAMEORIGIN`, or use CSP `frame-ancestors`.
**Verification:** Attempt to frame the app in another site and ensure it is blocked.
**Examples:**
1. Do: Use `frame-ancestors 'none'` in CSP.
2. Don't: Allow framing of sensitive pages.

### [CLIENT-03] Enforce HSTS
**Identity:** CLIENT-03
**Rule:** Enforce HTTPS via HSTS with long `max-age` and `includeSubDomains`.
**Rationale:** HSTS prevents downgrade attacks and mixed-content exposure.
**Implementation:** Set `Strict-Transport-Security` with sufficient duration and preload if appropriate.
**Verification:** Confirm HTTP requests are redirected to HTTPS and HSTS is active.
**Examples:**
1. Do: Use `Strict-Transport-Security: max-age=31536000; includeSubDomains`.
2. Don't: Allow HTTP for authenticated sessions.

### [CLIENT-04] Set a Safe Referrer Policy
**Identity:** CLIENT-04
**Rule:** Configure `Referrer-Policy` to avoid leaking sensitive data via URLs.
**Rationale:** URLs may contain tokens or identifiers that can be leaked to third parties.
**Implementation:** Use `strict-origin-when-cross-origin` or stricter.
**Verification:** Inspect outgoing requests and confirm referrer headers are sanitized.
**Examples:**
1. Do: Use `Referrer-Policy: strict-origin-when-cross-origin`.
2. Don't: Allow full URL referrers on sensitive pages.

### [CLIENT-05] Restrict Browser Permissions
**Identity:** CLIENT-05
**Rule:** Use `Permissions-Policy` to disable unnecessary browser features.
**Rationale:** Reduces attack surface from unused sensitive APIs.
**Implementation:** Disable camera, microphone, geolocation, and other features not required.
**Verification:** Check browser features are blocked when not allowed.
**Examples:**
1. Do: Set `Permissions-Policy: camera=(), microphone=()`.
2. Don't: Leave powerful features enabled by default.

### [CLIENT-06] Avoid Dangerous DOM Sinks
**Identity:** CLIENT-06
**Rule:** Avoid unsafe DOM APIs like `innerHTML`, `outerHTML`, or `document.write` with untrusted data.
**Rationale:** These sinks enable DOM-based XSS.
**Implementation:** Use safe APIs like `textContent` or sanitize content.
**Verification:** Audit DOM writes and ensure untrusted data is sanitized or escaped.
**Examples:**
1. Do: Use `textContent` for user data.
2. Don't: Use `innerHTML` with untrusted input.

### [CLIENT-07] Avoid `eval` and String-Based Execution
**Identity:** CLIENT-07
**Rule:** Do not use `eval()`, `setTimeout(string)`, or `setInterval(string)`.
**Rationale:** Executing strings as code creates XSS and code injection risks.
**Implementation:** Use function references and safe parsing.
**Verification:** Search for string-based execution usage.
**Examples:**
1. Do: Use `setTimeout(fn, 1000)`.
2. Don't: Use `setTimeout("doStuff()", 1000)`.

### [CLIENT-08] Secure `postMessage` Usage
**Identity:** CLIENT-08
**Rule:** Use explicit `targetOrigin` and validate message origins for `postMessage`.
**Rationale:** Unrestricted messaging allows cross-origin data injection.
**Implementation:** Set a strict `targetOrigin` and validate `event.origin`.
**Verification:** Attempt cross-origin messages and ensure they are rejected.
**Examples:**
1. Do: Validate `event.origin` against an allowlist.
2. Don't: Use `*` as the target origin.

### [CLIENT-09] Parse JSON Safely
**Identity:** CLIENT-09
**Rule:** Use `JSON.parse()` instead of `eval()` to parse JSON.
**Rationale:** `eval()` can execute malicious code.
**Implementation:** Validate JSON schemas and parse with safe parsers.
**Verification:** Ensure no JSON parsing uses `eval`.
**Examples:**
1. Do: Use `JSON.parse()` for untrusted JSON.
2. Don't: Use `eval()` for JSON parsing.

### [CLIENT-10] Use Subresource Integrity (SRI)
**Identity:** CLIENT-10
**Rule:** Use SRI for external scripts and styles.
**Rationale:** SRI prevents loading tampered CDN resources.
**Implementation:** Add `integrity` and `crossorigin` attributes to external resources.
**Verification:** Confirm integrity attributes exist for all external assets.
**Examples:**
1. Do: Include `integrity` hashes for CDN scripts.
2. Don't: Load external scripts without integrity checks.

### [CLIENT-11] Sandbox Untrusted Iframes
**Identity:** CLIENT-11
**Rule:** Use `sandbox` on iframes that display untrusted content.
**Rationale:** Limits what embedded content can do.
**Implementation:** Use sandbox restrictions and add only necessary permissions.
**Verification:** Ensure iframe permissions are minimal.
**Examples:**
1. Do: Use `sandbox` with restricted flags.
2. Don't: Allow full privileges for untrusted content.

### [CLIENT-12] Avoid Storing Sensitive Data in Web Storage
**Identity:** CLIENT-12
**Rule:** Do not store secrets or session tokens in `localStorage` or `sessionStorage`.
**Rationale:** Web storage is accessible to any injected script.
**Implementation:** Store sensitive tokens in HTTP-only secure cookies or other protected storage.
**Verification:** Audit storage usage for sensitive data.
**Examples:**
1. Do: Store session tokens in HTTP-only cookies.
2. Don't: Store auth tokens in `localStorage`.

### [CLIENT-13] Secure Form Autocomplete
**Identity:** CLIENT-13
**Rule:** Disable autocomplete for sensitive fields in high-risk contexts.
**Rationale:** Browsers may store sensitive data on shared devices.
**Implementation:** Set appropriate `autocomplete` values and use secure input types.
**Verification:** Confirm browser does not persist sensitive values.
**Examples:**
1. Do: Disable autocomplete for banking forms on shared terminals.
2. Don't: Allow autocomplete for high-risk data on public devices.

### [CLIENT-14] Prevent Tabnabbing
**Identity:** CLIENT-14
**Rule:** Add `rel="noopener noreferrer"` to links that open new tabs.
**Rationale:** Prevents a new page from controlling the original tab via `window.opener`.
**Implementation:** Enforce rel attributes on `target="_blank"` links.
**Verification:** Scan for `target="_blank"` without `rel`.
**Examples:**
1. Do: Use `rel="noopener noreferrer"` with `target="_blank"`.
2. Don't: Open external links without `rel` protection.
