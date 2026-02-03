# Input Validation (INPUT)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Input validation ensures only properly formed data enters the system. It reduces injection risks, malformed data handling, and security control bypasses.

## Checklist Rules

### [INPUT-01] Validate on Trusted Systems
**Identity:** INPUT-01
**Rule:** Perform all input validation on trusted systems (server-side).
**Rationale:** Client-side validation can be bypassed.
**Implementation:** Enforce validation in server code for every request.
**Verification:** Bypass client validation and confirm server rejects invalid input.
**Examples:**
1. Do: Validate inputs server-side for all endpoints.
2. Don't: Rely on client-side validation only.

### [INPUT-02] Classify and Validate Untrusted Sources
**Identity:** INPUT-02
**Rule:** Identify trusted vs untrusted sources and validate all untrusted input.
**Rationale:** Data from external sources can be malicious or malformed.
**Implementation:** Treat databases, file streams, and external APIs as untrusted unless explicitly validated.
**Verification:** Ensure validation exists for all external data sources.
**Examples:**
1. Do: Validate data from external APIs before use.
2. Don't: Trust database content without validation.

### [INPUT-03] Centralize Validation Logic
**Identity:** INPUT-03
**Rule:** Use a centralized input validation routine.
**Rationale:** Centralization ensures consistent enforcement.
**Implementation:** Use shared validators or middleware.
**Verification:** Confirm validation is not reimplemented inconsistently.
**Examples:**
1. Do: Use common validation libraries across services.
2. Don't: Duplicate validation logic per endpoint.

### [INPUT-04] Reject Invalid Input
**Identity:** INPUT-04
**Rule:** All validation failures must result in input rejection.
**Rationale:** Accepting invalid input leads to undefined behavior or exploitation.
**Implementation:** Return explicit validation errors and stop processing.
**Verification:** Attempt invalid input and confirm rejection.
**Examples:**
1. Do: Return 400 for invalid input.
2. Don't: Auto-correct unsafe input silently.

### [INPUT-05] Specify Character Sets
**Identity:** INPUT-05
**Rule:** Specify and enforce character sets (e.g., UTF-8) for all input.
**Rationale:** Ambiguous encodings can enable injection or bypass validation.
**Implementation:** Set encoding headers and enforce in parsers.
**Verification:** Ensure server rejects invalid encodings.
**Examples:**
1. Do: Require UTF-8 for request bodies.
2. Don't: Accept mixed or unknown encodings.

### [INPUT-06] Canonicalize Before Validation
**Identity:** INPUT-06
**Rule:** Normalize/encode input to a canonical form before validation.
**Rationale:** Attackers use alternate encodings to bypass filters.
**Implementation:** Decode and normalize input before applying validation rules.
**Verification:** Test with double-encoded input and confirm rejection.
**Examples:**
1. Do: Decode percent-encoded values before validation.
2. Don't: Validate encoded input without normalization.

### [INPUT-07] Validate After UTF-8 Decoding
**Identity:** INPUT-07
**Rule:** If UTF-8 extended characters are supported, validate after decoding.
**Rationale:** Encoded characters can hide malicious payloads.
**Implementation:** Decode first, then validate.
**Verification:** Test with UTF-8 encoded variants of disallowed characters.
**Examples:**
1. Do: Validate decoded Unicode input.
2. Don't: Validate raw byte sequences only.

### [INPUT-08] Restrict Header Values to ASCII
**Identity:** INPUT-08
**Rule:** Verify headers contain only ASCII characters.
**Rationale:** Non-ASCII headers can enable injection or parsing issues.
**Implementation:** Enforce ASCII validation on headers.
**Verification:** Send non-ASCII headers and confirm rejection.
**Examples:**
1. Do: Reject headers with control characters.
2. Don't: Accept arbitrary header encodings.

### [INPUT-09] Validate All Client-Supplied Data
**Identity:** INPUT-09
**Rule:** Validate all client-provided parameters, URLs, and headers.
**Rationale:** Any client input can be malicious.
**Implementation:** Apply validation to query params, bodies, headers, and cookies.
**Verification:** Attempt malformed inputs across all channels.
**Examples:**
1. Do: Validate cookie values and header content.
2. Don't: Assume headers are safe.

### [INPUT-10] Validate Redirect Inputs
**Identity:** INPUT-10
**Rule:** Validate input received after redirects.
**Rationale:** Attackers can bypass validation by targeting redirect destinations.
**Implementation:** Re-validate data on final endpoints.
**Verification:** Send malicious payloads directly to redirect targets.
**Examples:**
1. Do: Validate payloads on every endpoint.
2. Don't: Assume redirects are trusted.

### [INPUT-11] Validate Data Types
**Identity:** INPUT-11
**Rule:** Validate that inputs match expected data types.
**Rationale:** Type mismatches can trigger logic errors or bypass controls.
**Implementation:** Enforce strict type checking and schema validation.
**Verification:** Provide wrong types and confirm rejection.
**Examples:**
1. Do: Require numeric types for IDs.
2. Don't: Accept any string as an ID.

### [INPUT-12] Validate Data Ranges
**Identity:** INPUT-12
**Rule:** Validate input ranges for numeric values.
**Rationale:** Out-of-range values can cause errors or overflow.
**Implementation:** Enforce min/max bounds for numeric inputs.
**Verification:** Test boundary values.
**Examples:**
1. Do: Enforce age between 0 and 120.
2. Don't: Allow negative or extreme values.

### [INPUT-13] Validate Data Length
**Identity:** INPUT-13
**Rule:** Enforce minimum and maximum length constraints.
**Rationale:** Prevents buffer overflows and DoS via large inputs.
**Implementation:** Set size limits on fields and payloads.
**Verification:** Test with oversized payloads.
**Examples:**
1. Do: Limit comments to a maximum length.
2. Don't: Accept unbounded input sizes.

### [INPUT-14] Use Allowlists for Characters
**Identity:** INPUT-14
**Rule:** Validate input against allowlists of permitted characters.
**Rationale:** Allowlists reduce risk from dangerous characters.
**Implementation:** Define allowed character sets per field.
**Verification:** Attempt to input disallowed characters.
**Examples:**
1. Do: Allow only alphanumerics for usernames.
2. Don't: Allow arbitrary characters where unnecessary.

### [INPUT-15] Add Controls When Hazardous Characters Are Needed
**Identity:** INPUT-15
**Rule:** If hazardous characters must be allowed, apply additional controls.
**Rationale:** Certain characters are required in some inputs but increase risk.
**Implementation:** Use output encoding, context-aware escaping, and strict parsing.
**Verification:** Ensure hazardous characters are safely handled downstream.
**Examples:**
1. Do: Encode output when allowing `<` or `>`.
2. Don't: Allow dangerous characters without additional protection.

### [INPUT-16] Detect Dangerous Encodings and Sequences
**Identity:** INPUT-16
**Rule:** Detect null bytes, newlines, and traversal sequences; handle alternate encodings.
**Rationale:** These sequences are commonly used to bypass validation.
**Implementation:** Reject `\0`, `\r`, `\n`, `../`, and encoded equivalents.
**Verification:** Test with encoded traversal and null byte inputs.
**Examples:**
1. Do: Reject `../` and `%00` in file inputs.
2. Don't: Allow encoded path traversal sequences.
