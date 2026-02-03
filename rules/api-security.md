# API Security (API)

> Source: OWASP API Security Top 10 (2023) & Industry Best Practices

## Principles
API Security protects the interface between clients and services. The goals are to enforce strong authorization and authentication, minimize data exposure, prevent abuse of business flows, and ensure availability by controlling resource usage.

## Checklist Rules

### [API-01] Enforce Object-Level Authorization (BOLA)
**Identity:** API-01
**Rule:** Enforce object-level authorization checks for every request that accesses a data object by ID.
**Rationale:** Attackers can guess or enumerate IDs to access other users' data (IDOR/BOLA).
**Implementation:** Validate ownership or permissions for each object ID in the request; use policy checks on every data access.
**Verification:** Attempt to access another user's object ID and confirm it is denied.
**Examples:**
1. Do: Verify `object.ownerId == currentUser.id` before returning it.
2. Don't: Rely on client-side filtering or hidden IDs.

### [API-02] Enforce Function-Level Authorization (BFLA)
**Identity:** API-02
**Rule:** Implement strict server-side role or permission checks for every function and endpoint.
**Rationale:** Hidden or undocumented endpoints are still reachable and can be abused.
**Implementation:** Apply RBAC/ABAC for every route and action, especially administrative functions.
**Verification:** Try to call admin endpoints with a standard user token and ensure denial.
**Examples:**
1. Do: Require `admin` privilege for `DELETE` or `/admin` endpoints.
2. Don't: Trust the client to hide or disable admin features.

### [API-03] Prevent Object Property-Level Authorization Issues (BOPLA)
**Identity:** API-03
**Rule:** Prevent mass assignment and excessive data exposure by strictly controlling input and output properties.
**Rationale:** Attackers can over-post fields or receive sensitive data unintentionally.
**Implementation:** Use allowlists for updatable fields; map DTOs to internal models; filter response fields per role.
**Verification:** Attempt to set or retrieve fields not permitted for the user.
**Examples:**
1. Do: Map only approved fields from the request body.
2. Don't: Bind request payloads directly to ORM entities.

### [API-04] Use Strong Authentication
**Identity:** API-04
**Rule:** Implement strong authentication mechanisms (OAuth 2.0, OIDC, or equivalent) for user-facing APIs.
**Rationale:** Weak authentication enables account takeover and unauthorized access.
**Implementation:** Use standard auth flows; enforce MFA where appropriate; reject credentials or tokens in URL parameters.
**Verification:** Confirm token validation, expiration, and audience checks on every request.
**Examples:**
1. Do: Validate access tokens server-side on every call.
2. Don't: Use API keys as a substitute for user authentication.

### [API-05] Secure Token Management
**Identity:** API-05
**Rule:** Use short-lived access tokens with secure refresh token rotation and revocation.
**Rationale:** Long-lived or poorly managed tokens increase exposure if leaked.
**Implementation:** Use short TTLs; rotate refresh tokens on use; store tokens securely; revoke on compromise.
**Verification:** Ensure refresh token reuse is detected and invalidates the session.
**Examples:**
1. Do: Rotate refresh tokens and track token families.
2. Don't: Issue access tokens that never expire.

### [API-06] Rate-Limit Requests
**Identity:** API-06
**Rule:** Implement rate limiting per user, token, IP, or device for sensitive endpoints.
**Rationale:** Rate limits mitigate brute force, scraping, and DoS attacks.
**Implementation:** Use throttling with burst and sustained limits; return clear 429 responses.
**Verification:** Stress test endpoints and confirm rate limits engage.
**Examples:**
1. Do: Limit login attempts per account and IP.
2. Don't: Allow unlimited credential guesses.

### [API-07] Enforce Resource Usage Limits
**Identity:** API-07
**Rule:** Define and enforce limits on payload size, execution time, and memory use.
**Rationale:** Unbounded resource usage can cause denial of service.
**Implementation:** Enforce request size limits, timeouts, and pagination.
**Verification:** Send large payloads and confirm rejection.
**Examples:**
1. Do: Enforce max upload sizes and request timeouts.
2. Don't: Process unbounded input without limits.

### [API-08] Apply GraphQL Depth and Cost Limits
**Identity:** API-08
**Rule:** For GraphQL APIs, limit query depth and complexity.
**Rationale:** Deep or expensive queries can exhaust server resources.
**Implementation:** Implement depth limiting, cost analysis, and query timeouts.
**Verification:** Run deep nesting queries and confirm rejection.
**Examples:**
1. Do: Enforce a maximum query depth.
2. Don't: Allow arbitrary nested queries.

### [API-09] Protect Sensitive Business Flows
**Identity:** API-09
**Rule:** Identify sensitive business flows and implement protections against automated abuse.
**Rationale:** Attackers automate high-value workflows like purchasing, promo abuse, or account creation.
**Implementation:** Add step-up authentication, rate limits, anomaly detection, and bot mitigations.
**Verification:** Simulate automated abuse and confirm protections trigger.
**Examples:**
1. Do: Use bot detection on account creation and checkout.
2. Don't: Allow unlimited promo redemptions.

### [API-10] Prevent SSRF
**Identity:** API-10
**Rule:** Validate and sanitize all user-supplied URLs before server-side requests.
**Rationale:** SSRF allows access to internal services and metadata endpoints.
**Implementation:** Enforce allowlists for schemes, hosts, and IP ranges; disable redirects if not required.
**Verification:** Attempt requests to internal or metadata IPs and ensure they are blocked.
**Examples:**
1. Do: Allow only `https` and known domains.
2. Don't: Fetch arbitrary URLs provided by users.

### [API-11] Validate Upstream API Data
**Identity:** API-11
**Rule:** Validate and sanitize data received from third-party or upstream APIs.
**Rationale:** External data can be malformed, malicious, or inconsistent.
**Implementation:** Treat upstream data as untrusted; validate schema and lengths; enforce strict parsing.
**Verification:** Test with malformed or unexpected upstream responses.
**Examples:**
1. Do: Validate JSON schema for third-party responses.
2. Don't: Trust upstream data without checks.

### [API-12] Maintain API Inventory
**Identity:** API-12
**Rule:** Maintain an up-to-date inventory of all API endpoints and versions.
**Rationale:** Unknown or deprecated endpoints become unmonitored attack surfaces.
**Implementation:** Track API versions, owners, and environments; deprecate and remove old endpoints.
**Verification:** Confirm decommissioned endpoints are no longer reachable.
**Examples:**
1. Do: Document every API with ownership and version.
2. Don't: Leave old endpoints running in production.

### [API-13] Prevent Security Misconfiguration
**Identity:** API-13
**Rule:** Harden API configurations and disable insecure defaults.
**Rationale:** Misconfigurations expose data or allow unintended access.
**Implementation:** Disable unused HTTP methods; restrict CORS; hide stack traces and verbose errors.
**Verification:** Scan for open methods and verbose error responses.
**Examples:**
1. Do: Allow only required HTTP verbs.
2. Don't: Return stack traces to clients.

### [API-14] Restrict GraphQL Introspection in Production
**Identity:** API-14
**Rule:** Disable or restrict GraphQL introspection in production environments.
**Rationale:** Introspection reveals schema details useful to attackers.
**Implementation:** Disable introspection or require admin authentication for it.
**Verification:** Attempt introspection queries in production and confirm denial.
**Examples:**
1. Do: Block introspection in production.
2. Don't: Leave introspection open to anonymous users.
