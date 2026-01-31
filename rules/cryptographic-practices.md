# Cryptographic Practices (CRYP)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Cryptographic practices involve the secure implementation of encryption, hashing, and random number generation to protect sensitive data and secrets.

## Checklist Rules
* [cite_start]**[CRYP-01]** All cryptographic functions used to protect secrets from the application user must be implemented on a trusted system (e.g., the server)[cite: 234].
* [cite_start]**[CRYP-02]** Protect master secrets from unauthorized access[cite: 235].
* [cite_start]**[CRYP-03]** Cryptographic modules should fail securely[cite: 236].
* [cite_start]**[CRYP-04]** All random numbers, random file names, random GUIDs, and random strings should be generated using the cryptographic module's approved random number generator when these values are intended to be un-guessable[cite: 237].
* [cite_start]**[CRYP-05]** Cryptographic modules used by the application should be compliant to FIPS 140-2 or an equivalent standard[cite: 238].
* [cite_start]**[CRYP-06]** Establish and utilize a policy and process for how cryptographic keys will be managed[cite: 239].