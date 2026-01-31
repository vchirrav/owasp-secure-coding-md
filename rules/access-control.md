# Access Control (AC)

> [cite_start]Source: OWASP Secure Coding Practices Quick Reference Guide v2.1 [cite: 1, 4]

## Principles
[cite_start]Access Control ensures that authenticated users have the correct permissions to access specific resources or perform actions[cite: 416, 417].

## Checklist Rules
* [cite_start]**[AC-01]** Use only trusted system objects, such as server-side session objects, for making access authorization decisions[cite: 202].
* [cite_start]**[AC-02]** Use a single site-wide component to check access authorization, including libraries that call external authorization services[cite: 203].
* [cite_start]**[AC-03]** Access controls must fail securely[cite: 204].
* [cite_start]**[AC-04]** Deny all access if the application cannot access its security configuration information[cite: 205].
* [cite_start]**[AC-05]** Enforce authorization controls on every request, including those made by server-side scripts, "includes", and requests from AJAX/Flash[cite: 206, 207].
* [cite_start]**[AC-06]** Segregate privileged logic from other application code[cite: 208].
* [cite_start]**[AC-07]** Restrict access to files, URLs, functions, and services to only authorized users[cite: 209, 210, 211, 212, 214].
* [cite_start]**[AC-08]** Restrict direct object references to only authorized users[cite: 213].
* [cite_start]**[AC-09]** Restrict access to application data, user attributes, and policy information used by access controls[cite: 215, 216].
* [cite_start]**[AC-10]** Restrict access to security-relevant configuration information to only authorized users[cite: 217].
* [cite_start]**[AC-11]** Ensure server-side implementation and presentation layer representations of access control rules match[cite: 218].
* [cite_start]**[AC-12]** If state data must be stored on the client, use encryption and integrity checking on the server-side to detect tampering[cite: 219].
* [cite_start]**[AC-13]** Enforce application logic flows to comply with business rules[cite: 220].
* [cite_start]**[AC-14]** Limit the number of transactions a single user or device can perform in a given period of time[cite: 221, 222].
* [cite_start]**[AC-15]** Use the "referer" header as a supplemental check only; it should never be the sole authorization check[cite: 223].
* [cite_start]**[AC-16]** For long sessions, periodically re-validate authorization; log the user out if privileges change[cite: 224].
* [cite_start]**[AC-17]** Implement account auditing and disable unused accounts (e.g., after 30 days of password expiration)[cite: 225].
* [cite_start]**[AC-18]** Support immediate disabling of accounts and termination of sessions when authorization ceases[cite: 229].
* [cite_start]**[AC-19]** Service accounts must use the principle of least privilege[cite: 230].
* [cite_start]**[AC-20]** Document all business rules and access criteria in a formal Access Control Policy[cite: 231, 232].