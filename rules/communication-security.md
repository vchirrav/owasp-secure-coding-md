# Communication Security (COM)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Communication Security ensures that data is protected during transit between the client, the server, and any external systems. It primarily focuses on encryption (TLS) and preventing data leakage in transmission headers.

## Checklist Rules

### TLS/Encryption
* **[COM-01]** Implement encryption for the transmission of all sensitive information.
    * This includes TLS for protecting the connection.
    * May be supplemented by discrete encryption of sensitive files or non-HTTP based connections.
* **[COM-02]** TLS certificates must be valid and have the correct domain name.
    * They must not be expired.
    * Intermediate certificates must be installed when required.
* **[COM-03]** Failed TLS connections should not fall back to an insecure connection.
* **[COM-04]** Utilize TLS connections for all content requiring authenticated access and for all other sensitive information.
* **[COM-05]** Utilize TLS for connections to external systems that involve sensitive information or functions.
* **[COM-06]** Utilize a single standard TLS implementation that is configured appropriately.

### Headers & Parameters
* **[COM-07]** Specify character encodings for all connections.
* **[COM-08]** Filter parameters containing sensitive information from the HTTP referer header when linking to external sites.