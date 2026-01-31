# Client-Side Security (CLIENT)

> Source: OWASP Client-Side Security Cheat Sheet, MDN Web Docs & W3C Standards

## Principles
Client-Side Security focuses on protecting the user within the browser environment. It involves leveraging browser security mechanisms (headers, policies) to mitigate attacks like XSS, Clickjacking, and data exfiltration, and ensuring safe interaction with DOM APIs.

## Checklist Rules

### Browser Security Headers
* **[CLIENT-01]** **Content Security Policy (CSP):** Implement a strict CSP to restrict the sources of executable scripts, styles, and other resources.
    * Use nonces or hashes for inline scripts; avoid `unsafe-inline` and `unsafe-eval`.
* **[CLIENT-02]** **Anti-Clickjacking:** Use the `X-Frame-Options` header (`DENY` or `SAMEORIGIN`) or CSP `frame-ancestors` directive to prevent the application from being framed by malicious sites.
* **[CLIENT-03]** **Strict Transport Security (HSTS):** Enforce HSTS (`Strict-Transport-Security`) with a long `max-age` (e.g., 1 year) and `includeSubDomains` to force HTTPS connections.
* **[CLIENT-04]** **Referrer Policy:** Set a `Referrer-Policy` (e.g., `strict-origin-when-cross-origin`) to prevent leakage of sensitive data in URLs to third-party domains.
* **[CLIENT-05]** **Permissions Policy:** Use the `Permissions-Policy` header (formerly Feature Policy) to disable sensitive browser features (e.g., camera, microphone, geolocation) that the application does not need.

### DOM & JavaScript Safety
* **[CLIENT-06]** **Safe DOM Manipulation:** Avoid using dangerous sinks like `innerHTML`, `outerHTML`, or `document.write` with untrusted data.
    * Use safer alternatives like `textContent` or `innerText` which automatically escape content.
* **[CLIENT-07]** **Avoid Eval:** Do not use `eval()`, `setTimeout(string)`, or `setInterval(string)`. These functions execute text as code and are major vectors for DOM-based XSS.
* **[CLIENT-08]** **Cross-Window Communication:** When using `window.postMessage`, always specify the exact target origin (`targetOrigin`) rather than `*`.
    * Validate the `origin` of any incoming message events before processing the data.
* **[CLIENT-09]** **JSON Handling:** When parsing JSON from untrusted sources, use `JSON.parse()` rather than `eval()`.

### Third-Party Integrity
* **[CLIENT-10]** **Subresource Integrity (SRI):** Use SRI attributes (`integrity="sha384-..."`) for all scripts and stylesheets loaded from CDNs or external sources.
    * This ensures the browser blocks the file if it has been tampered with.
* **[CLIENT-11]** **Sandboxed Iframes:** If embedding untrusted content (e.g., user-generated HTML, ads), use the `iframe` `sandbox` attribute to restrict permissions (e.g., block scripts, forms, and popups).

### Client-Side Data Protection
* **[CLIENT-12]** **Local Storage Sensitivity:** Do not store sensitive session identifiers, PII, or authentication tokens in `localStorage` or `sessionStorage`, as these are accessible to any script running on the page (XSS).
* **[CLIENT-13]** **Form Security:** Use `autocomplete="off"` for sensitive fields (e.g., banking info) to prevent the browser from caching values on public terminals (though modern browsers may ignore this for passwords).
* **[CLIENT-14]** **Tab Nabbing Protection:** When using `target="_blank"` links to external sites, always add `rel="noopener noreferrer"` to prevent the opened page from hijacking the original window via `window.opener`.