# Output Encoding (OUT)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Output Encoding transforms user input into a safe form for the specific interpreter (HTML, JavaScript, SQL, etc.) where it will be displayed or executed. This is the primary defense against Cross-Site Scripting (XSS).

## Checklist Rules

### Encoding Strategy
* **[OUT-01]** Conduct all encoding on a trusted system (e.g., the server).
* **[OUT-02]** Utilize a standard, tested routine for each type of outbound encoding.
* **[OUT-03]** Contextually output encode all data returned to the client that originated outside the application's trust boundary.
    * HTML entity encoding is one example, but does not work in all cases.
* **[OUT-04]** Encode all characters unless they are known to be safe for the intended interpreter.

### Context-Specific Sanitization
* **[OUT-05]** Contextually sanitize all output of un-trusted data to queries for SQL, XML, and LDAP.
* **[OUT-06]** Sanitize all output of un-trusted data to operating system commands.