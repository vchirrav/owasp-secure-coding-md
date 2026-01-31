# Input Validation (INPUT)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Input Validation is the first line of defense. It ensures that only properly formed data enters the software system, preventing malformed data from triggering vulnerabilities like injections or buffer overflows.

## Checklist Rules

### Validation Strategy
* **[INPUT-01]** Conduct all data validation on a trusted system (e.g., the server).
* **[INPUT-02]** Identify all data sources and classify them into trusted and untrusted. Validate all data from untrusted sources (e.g., Databases, file streams, etc.).
* **[INPUT-03]** There should be a centralized input validation routine for the application.
* **[INPUT-04]** All validation failures should result in input rejection.

### Encoding & Character Sets
* **[INPUT-05]** Specify proper character sets, such as UTF-8, for all sources of input.
* **[INPUT-06]** Encode data to a common character set before validating (Canonicalize).
* **[INPUT-07]** Determine if the system supports UTF-8 extended character sets and if so, validate after UTF-8 decoding is completed.
* **[INPUT-08]** Verify that header values in both requests and responses contain only ASCII characters.

### Data Validation Checks
* **[INPUT-09]** Validate all client-provided data before processing, including all parameters, URLs, and HTTP header content (e.g. Cookie names and values).
    * Be sure to include automated post-backs from JavaScript, Flash, or other embedded code.
* **[INPUT-10]** Validate data from redirects. (An attacker may submit malicious content directly to the target of the redirect).
* **[INPUT-11]** Validate for expected data types.
* **[INPUT-12]** Validate data range.
* **[INPUT-13]** Validate data length.
* **[INPUT-14]** Validate all input against a "white" list of allowed characters, whenever possible.
* **[INPUT-15]** If any potentially hazardous characters must be allowed as input, implement additional controls like output encoding, secure task-specific APIs, and usage accounting.
    * Common hazardous characters include: `< > " ' % ( ) & + \ ' "`

### Specific Attack Vector Checks
* **[INPUT-16]** If your standard validation routine cannot address the following inputs, they should be checked discretely:
    * Check for null bytes (`%00`).
    * Check for new line characters (`%0d`, `%0a`, `\r`, `\n`).
    * Check for "dot-dot-slash" (`../` or `..`) path alteration characters.
    * In cases where UTF-8 extended character set encoding is supported, address alternate representations (e.g., `%c0%ae%c0%ae/`).