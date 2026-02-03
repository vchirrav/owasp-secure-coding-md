# Cryptographic Practices (CRYP)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1 and more.

## Principles
Cryptographic practices cover encryption, hashing, signing, key management, randomness, and secure use of crypto libraries to protect confidentiality, integrity, and authenticity. These rules apply to any programming language and are intended to help developers avoid common cryptographic implementation flaws.

## Checklist Rules

### [CRYP-01] Server-Side Crypto for User Secrets
**Identity:** CRYP-01
**Rule:** Perform cryptographic operations that protect user secrets only on trusted systems (typically the server or a trusted enclave).
**Rationale:** Client-side code and devices are not trustworthy and can be tampered with, making secrets and keys vulnerable.
**Implementation:** Keep keys on the server; never ship secret keys to clients; send only ciphertext or signatures to clients.
**Verification:** Review client code and API responses for secret keys or raw key material.
**Examples:**
1. Do: Encrypt sensitive data on the server before storage.
2. Don't: Embed encryption keys in a mobile or browser app.

### [CRYP-02] Protect Master Secrets and Root Keys
**Identity:** CRYP-02
**Rule:** Protect root keys and master secrets against unauthorized access at rest and in memory.
**Rationale:** Compromise of a root key typically breaks the entire crypto system.
**Implementation:** Store root keys in HSM/KMS/OS keystores; restrict access with least privilege; use split knowledge or dual control when appropriate.
**Verification:** Confirm root keys are stored in managed key services or hardware and never appear in logs, configs, or source control.
**Examples:**
1. Do: Use cloud KMS with strict IAM and audit logging.
2. Don't: Store master keys in environment variables or config files.

### [CRYP-03] Fail Securely
**Identity:** CRYP-03
**Rule:** Cryptographic modules must fail closed and never return plaintext or accept unauthenticated data on error.
**Rationale:** Error paths are commonly exploited to bypass authentication or integrity checks.
**Implementation:** Treat crypto errors as fatal; ensure decrypt or verify failures stop processing; avoid fallback to weaker algorithms.
**Verification:** Simulate invalid ciphertext, tags, and signatures and ensure the operation fails with no data returned.
**Examples:**
1. Do: Reject requests when signature verification fails.
2. Don't: Continue processing if decryption fails.

### [CRYP-04] Use CSPRNG for Unpredictable Values
**Identity:** CRYP-04
**Rule:** Use a cryptographically secure random number generator for all security-sensitive values.
**Rationale:** Predictable randomness breaks keys, tokens, nonces, and session IDs.
**Implementation:** Use platform CSPRNG APIs; do not implement custom RNGs or manual seeding.
**Verification:** Audit all randomness sources; ensure no use of non-crypto RNGs for secrets.
**Examples:**
1. Do: Use `crypto.getRandomValues` or OS CSPRNG APIs.
2. Don't: Use `rand()` or time-based seeds for tokens.

### [CRYP-05] Use Approved Crypto Modules When Required
**Identity:** CRYP-05
**Rule:** Use cryptographic modules compliant with required standards such as FIPS 140-2/140-3 when mandated.
**Rationale:** Regulatory or contractual requirements may require validated modules.
**Implementation:** Select libraries and runtime builds validated for compliance; ensure approved mode is enabled.
**Verification:** Confirm module validation status and runtime configuration in build and deployment.
**Examples:**
1. Do: Use a FIPS-validated OpenSSL build in approved mode.
2. Don't: Assume standard builds are compliant.

### [CRYP-06] Establish and Enforce Key Management Policy
**Identity:** CRYP-06
**Rule:** Define and follow a documented key management policy covering generation, storage, use, rotation, and destruction.
**Rationale:** Weak key lifecycle practices are a primary source of crypto compromise.
**Implementation:** Define ownership, access controls, rotation intervals, backup policies, and incident response for keys.
**Verification:** Review policy adherence in CI/CD and operational audits.
**Examples:**
1. Do: Track key versions and rotation dates in a central registry.
2. Don't: Leave key rotation undefined or ad hoc.

### [CRYP-07] Use Vetted Libraries, Not Custom Crypto
**Identity:** CRYP-07
**Rule:** Use well-maintained cryptographic libraries and avoid implementing your own primitives or protocols.
**Rationale:** Crypto is easy to get subtly wrong; vetted libraries reduce risk.
**Implementation:** Use platform-provided libraries or widely adopted libraries with strong maintenance and audit history.
**Verification:** Ensure the codebase does not implement custom block ciphers, hash functions, or protocols.
**Examples:**
1. Do: Use a standard library AES-GCM API.
2. Don't: Implement AES or RSA manually.

### [CRYP-08] Prefer Modern Algorithms and AEAD Modes
**Identity:** CRYP-08
**Rule:** Use modern, standardized algorithms and authenticated encryption modes for confidentiality and integrity.
**Rationale:** Legacy algorithms and unauthenticated encryption are vulnerable to practical attacks.
**Implementation:** Prefer AES-GCM or ChaCha20-Poly1305; for hashing use SHA-256/384/512 or SHA-3; for signatures use Ed25519 or ECDSA/RSA with modern parameters.
**Verification:** Review crypto configurations for deprecated algorithms such as MD5, SHA-1, DES, 3DES, or RC4.
**Examples:**
1. Do: Encrypt data with AES-256-GCM.
2. Don't: Use AES-CBC without integrity protection.

### [CRYP-09] Use Appropriate Key Sizes and Parameters
**Identity:** CRYP-09
**Rule:** Select key sizes and parameters that meet current security recommendations for the algorithm.
**Rationale:** Small keys or weak parameters reduce security margins and may be breakable.
**Implementation:** Use at least 2048-bit RSA, 256-bit ECC, and 128-bit symmetric keys or stronger; choose KDF parameters based on current guidance and performance constraints.
**Verification:** Check key generation and algorithm parameters against current security guidelines.
**Examples:**
1. Do: Use RSA-3072 for long-lived keys.
2. Don't: Use RSA-1024 or 80-bit symmetric keys.

### [CRYP-10] Enforce Unique Nonces and IVs
**Identity:** CRYP-10
**Rule:** Ensure IVs and nonces are unique per key and algorithm requirements; never reuse them.
**Rationale:** Nonce reuse in AEAD modes can expose plaintexts and keys.
**Implementation:** Use library APIs that generate IVs; if manual, ensure uniqueness with counters or CSPRNG.
**Verification:** Confirm IV/nonce generation and storage prevents reuse across encryptions.
**Examples:**
1. Do: Use library-provided AEAD nonce generation.
2. Don't: Use a fixed IV or reuse a nonce.

### [CRYP-11] Use Salted, Slow Password Hashing
**Identity:** CRYP-11
**Rule:** Store passwords using a dedicated password hashing algorithm with unique salt and adequate work factor.
**Rationale:** Fast hashes enable offline cracking; salts prevent precomputed attacks.
**Implementation:** Use Argon2id, bcrypt, or scrypt; store salt and parameters with the hash; tune cost based on hardware and latency constraints.
**Verification:** Confirm no use of general-purpose hashes like SHA-256 for passwords.
**Examples:**
1. Do: Use Argon2id with a unique per-user salt.
2. Don't: Store `SHA-256(password)` without salt.

### [CRYP-12] Derive Subkeys with a KDF
**Identity:** CRYP-12
**Rule:** Use a key derivation function to derive subkeys for different purposes from a master key.
**Rationale:** Reusing a single key across purposes increases risk and can break security proofs.
**Implementation:** Use HKDF or a KDF recommended by the crypto library; use context-specific info strings.
**Verification:** Ensure separate keys are used for encryption, MAC, and signing.
**Examples:**
1. Do: Derive separate encryption and MAC keys via HKDF.
2. Don't: Use the same key for encryption and authentication.

### [CRYP-13] Authenticate Before Decrypting or Using Data
**Identity:** CRYP-13
**Rule:** Verify integrity and authenticity before processing decrypted or signed data.
**Rationale:** Processing unauthenticated data enables padding oracles and tampering.
**Implementation:** Use AEAD modes or verify MAC/signature prior to decryption or use.
**Verification:** Ensure code rejects unauthenticated data early.
**Examples:**
1. Do: Verify GCM tag and stop on failure.
2. Don't: Use plaintext output when tag verification fails.

### [CRYP-14] Use Constant-Time Comparisons for Secrets
**Identity:** CRYP-14
**Rule:** Compare secrets using constant-time operations to avoid timing leaks.
**Rationale:** Timing differences can reveal secret values such as MACs or tokens.
**Implementation:** Use library-provided constant-time comparison functions.
**Verification:** Search for direct string or byte comparisons on secrets.
**Examples:**
1. Do: Use `constant_time_compare(a, b)` for MACs.
2. Don't: Use `==` on MACs or tokens.

### [CRYP-15] Protect Secrets in Memory and Logs
**Identity:** CRYP-15
**Rule:** Minimize secret exposure in memory, logs, telemetry, and crash dumps.
**Rationale:** Secrets often leak through debugging artifacts and operational logs.
**Implementation:** Avoid logging secrets; zeroize buffers when possible; use secret types that prevent accidental serialization.
**Verification:** Audit logs and telemetry for key material, tokens, or plaintext.
**Examples:**
1. Do: Redact secrets in logs and traces.
2. Don't: Log decrypted payloads or raw keys.

### [CRYP-16] Version and Rotate Keys Safely
**Identity:** CRYP-16
**Rule:** Use key versioning and planned rotation; re-encrypt or re-sign data when required.
**Rationale:** Rotation limits exposure from key compromise and meets compliance requirements.
**Implementation:** Store key identifiers with ciphertext; support decrypting with prior keys; rotate on schedule or on compromise.
**Verification:** Confirm the system can read old data and write new data with current keys.
**Examples:**
1. Do: Include key IDs alongside ciphertexts.
2. Don't: Rotate keys without a migration plan.

### [CRYP-17] Centralize and Lock Down Crypto Configuration
**Identity:** CRYP-17
**Rule:** Keep cryptographic configuration in a single, secured location with secure defaults.
**Rationale:** Scattered settings lead to inconsistent security and downgrade risk.
**Implementation:** Centralize algorithm choices, key sizes, and modes; make weak options unavailable at runtime.
**Verification:** Validate that all crypto usage flows through approved configuration.
**Examples:**
1. Do: Maintain a single crypto configuration module.
2. Don't: Allow per-call overrides of algorithms in application code.

### [CRYP-18] Validate Crypto Inputs and Encodings
**Identity:** CRYP-18
**Rule:** Strictly validate formats, lengths, and encodings of crypto inputs.
**Rationale:** Malformed inputs can trigger errors, crashes, or side-channel leaks.
**Implementation:** Enforce canonical encodings; reject unexpected lengths; parse using safe library functions.
**Verification:** Fuzz crypto input handlers and confirm invalid inputs are rejected.
**Examples:**
1. Do: Reject non-canonical base64 or invalid key sizes.
2. Don't: Accept arbitrary-length keys without validation.

### [CRYP-19] Use Approved Protocols for Transport Security
**Identity:** CRYP-19
**Rule:** Use standard, well-maintained protocol implementations (such as TLS) for transport security.
**Rationale:** Implementing your own transport security is error-prone and insecure.
**Implementation:** Use TLS libraries with secure defaults; enforce certificate validation and hostname verification.
**Verification:** Ensure certificate validation is not disabled and weak protocol versions are not allowed.
**Examples:**
1. Do: Enforce TLS 1.2 or higher with certificate validation.
2. Don't: Disable certificate checks in production.

### [CRYP-20] Test Crypto with Known Vectors
**Identity:** CRYP-20
**Rule:** Validate cryptographic operations against known good test vectors and interoperability tests.
**Rationale:** Small implementation mistakes cause silent security failures.
**Implementation:** Use published test vectors for primitives and protocols; add regression tests for algorithm configurations.
**Verification:** CI should fail if crypto outputs deviate from known vectors.
**Examples:**
1. Do: Validate AES-GCM against NIST test vectors.
2. Don't: Ship untested crypto configuration changes.
