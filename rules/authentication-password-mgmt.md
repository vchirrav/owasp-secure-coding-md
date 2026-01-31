# Authentication and Password Management (AUTH)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Authentication is the verification of the identity of a user or entity. Strong password management ensures that credentials are handled, stored, and managed securely throughout their lifecycle.

## Checklist Rules

### General Authentication
* [cite_start]**[AUTH-01]** Require authentication for all pages and resources, except those specifically intended to be public[cite: 122].
* [cite_start]**[AUTH-02]** All authentication controls must be enforced on a trusted system (e.g., the server)[cite: 123].
* [cite_start]**[AUTH-03]** Establish and utilize standard, tested authentication services whenever possible[cite: 124].
* [cite_start]**[AUTH-04]** Use a centralized implementation for all authentication controls, including libraries that call external services[cite: 125].
* [cite_start]**[AUTH-05]** Segregate authentication logic from the resource being requested and use redirection to/from the centralized control[cite: 126].
* [cite_start]**[AUTH-06]** All authentication controls should fail securely[cite: 127].
* [cite_start]**[AUTH-07]** All administrative and account management functions must be at least as secure as the primary authentication mechanism[cite: 128].

### Password Storage & Handling
* [cite_start]**[AUTH-08]** If managing a credential store, ensure only cryptographically strong one-way salted hashes are stored[cite: 129].
    * [cite_start]The write access to the password table/file should be restricted to the application only[cite: 129].
    * [cite_start]Do not use MD5[cite: 130].
* [cite_start]**[AUTH-09]** Password hashing must be implemented on a trusted system (e.g., the server)[cite: 131].
* [cite_start]**[AUTH-10]** Validate authentication data only on completion of all data input[cite: 132].
* [cite_start]**[AUTH-11]** Authentication failure responses should not indicate which part of the data was incorrect (e.g., use "Invalid username and/or password")[cite: 133, 134].
    * [cite_start]Error responses must be identical in both display and source code[cite: 135].
* [cite_start]**[AUTH-12]** Use HTTP POST requests to transmit authentication credentials[cite: 139].
* [cite_start]**[AUTH-13]** Only send non-temporary passwords over an encrypted connection (e.g., HTTPS) or as encrypted data[cite: 140].
* [cite_start]**[AUTH-14]** Password entry should be obscured on the user's screen[cite: 146].
* [cite_start]**[AUTH-15]** Disable "remember me" functionality for password fields[cite: 162].

### Password Policy
* [cite_start]**[AUTH-16]** Enforce password complexity requirements (e.g., mix of alphanumeric and special characters)[cite: 141, 143].
* **[AUTH-17]** Enforce password length requirements; [cite_start]8 characters is common, but 16 or multi-word passphrases are better[cite: 144, 145].
* [cite_start]**[AUTH-18]** Enforce account disabling after an established number of invalid login attempts (e.g., five)[cite: 147].
    * [cite_start]Lockout duration must be sufficient to discourage brute force but prevent denial-of-service[cite: 148].
* [cite_start]**[AUTH-19]** Enforce password changes based on policy; critical systems may require more frequent changes[cite: 160].
* [cite_start]**[AUTH-20]** Prevent password re-use[cite: 158].
* [cite_start]**[AUTH-21]** Passwords should be at least one day old before they can be changed to prevent cycling attacks[cite: 159].

### Password Resets & Account Management
* [cite_start]**[AUTH-22]** Password reset and changing operations require the same level of controls as account creation/authentication[cite: 149].
* [cite_start]**[AUTH-23]** Password reset questions should support sufficiently random answers (avoid common answers like "favorite book")[cite: 150].
* [cite_start]**[AUTH-24]** If using email resets, only send to a pre-registered address with a temporary link/password[cite: 151].
* [cite_start]**[AUTH-25]** Temporary passwords and links should have a short expiration time[cite: 152].
* [cite_start]**[AUTH-26]** Enforce the changing of temporary passwords on the next use[cite: 153].
* [cite_start]**[AUTH-27]** Notify users when a password reset occurs[cite: 157].

### External & Third-Party Auth
* [cite_start]**[AUTH-28]** Utilize authentication for connections to external systems that involve sensitive information[cite: 136].
* [cite_start]**[AUTH-29]** Encrypt and store external credentials in a protected location on a trusted system; do NOT store in source code[cite: 137, 138].
* [cite_start]**[AUTH-30]** If using third-party code for authentication, inspect it carefully for malicious code[cite: 168].

### Monitoring & Advanced Controls
* [cite_start]**[AUTH-31]** Report the last use of a user account (successful or unsuccessful) at the next successful login[cite: 163].
* [cite_start]**[AUTH-32]** Implement monitoring to identify attacks against multiple accounts utilizing the same password[cite: 164].
* [cite_start]**[AUTH-33]** Change all vendor-supplied default passwords and user IDs or disable the associated accounts[cite: 166].
* [cite_start]**[AUTH-34]** Re-authenticate users prior to performing critical operations[cite: 166].
* [cite_start]**[AUTH-35]** Use Multi-Factor Authentication (MFA) for highly sensitive or high-value transactional accounts[cite: 167].