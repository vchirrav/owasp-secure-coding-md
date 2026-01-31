# API Security (API)

> Source: OWASP API Security Top 10 (2023) & Industry Best Practices

## Principles
API Security focuses on protecting the interface between clients and servers. The primary goals are to prevent unauthorized data access (BOLA/BOPLA), ensure robust authentication, manage resource consumption, and secure business flows against automated abuse.

## Checklist Rules

### Authorization & Access Control
* **[API-01]** **Broken Object Level Authorization (BOLA):** Enforce object-level authorization checks for every function that accesses a data source using an ID from the user.
    * Always validate that the authenticated user has permission to access the specific object ID requested (e.g., `GET /users/123`).
* **[API-02]** **Broken Function Level Authorization (BFLA):** Implement strict Role-Based Access Control (RBAC) on the server side.
    * Do not rely on the client to hide administrative functions.
    * Deny all access by default and explicitly grant permissions for sensitive endpoints (e.g., `DELETE`, `POST /admin`).
* **[API-03]** **Broken Object Property Level Authorization (BOPLA):** Prevent "Mass Assignment" and "Excessive Data Exposure".
    * **Input:** Use a whitelist (allowlist) of properties that can be updated by the client. Do not bind request data directly to internal objects.
    * **Output:** Filter response data to return only what is strictly necessary for the client. Do not rely on the client to filter sensitive fields (e.g., PII, passwords).

### Authentication & Tokens
* **[API-04]** **Broken Authentication:** Implement strong authentication mechanisms (e.g., OAuth 2.0, OpenID Connect).
    * Do not use API keys for user authentication; keys are for project/client identification only.
    * Never pass credentials or tokens in URL query parameters.
* **[API-05]** **Token Management:** Use short-lived access tokens and secure refresh token rotation.
    * Validate the JWT signature, expiration (`exp`), and audience (`aud`) on every request.
    * Ensure tokens are signed using strong algorithms (e.g., RS256) and secrets are kept secure.

### Resource Management & Availability
* **[API-06]** **Unrestricted Resource Consumption:** Implement strict rate limiting (throttling) per client/IP/token to prevent DoS and brute-force attacks.
* **[API-07]** Define and enforce maximum payload sizes, execution timeouts, and memory allocation limits.
* **[API-08]** **GraphQL Depth/Cost Limiting:** For GraphQL APIs, implement query depth limiting and query cost analysis to prevent deeply nested or expensive queries from exhausting server resources.

### Business Logic & Validation
* **[API-09]** **Unrestricted Access to Sensitive Business Flows:** Identify sensitive business flows (e.g., buying tickets, posting comments) and implement protections against automated abuse (bots).
    * Use CAPTCHA, device fingerprinting, or human-detection mechanisms for these flows.
* **[API-10]** **Server-Side Request Forgery (SSRF):** Validate and sanitize all user-supplied URLs before making backend requests.
    * Use a strict allowlist of permitted domains/protocols.
    * Disable HTTP redirections on the server-side HTTP client if not strictly required.
* **[API-11]** **Unsafe Consumption of APIs:** Validate and sanitize all data received from third-party or upstream APIs; do not trust external data implicitly.

### Inventory & Configuration
* **[API-12]** **Improper Inventory Management:** Maintain an up-to-date inventory of all API hosts and versions.
    * Decommission deprecated API versions and endpoints to prevent "Zombie APIs."
    * Do not expose production data on non-production (staging/dev) environments.
* **[API-13]** **Security Misconfiguration:** Disable unnecessary HTTP methods (e.g., `TRACE`, `TRACK`) and verbose error messages (stack traces).
* **[API-14]** **GraphQL Introspection:** Disable GraphQL introspection in production environments to prevent attackers from mapping your entire schema.