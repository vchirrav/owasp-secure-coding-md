# Data Protection (DATA)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Data Protection involves securing sensitive information at rest and in transit, ensuring least privilege, and preventing data leakage through client-side exposure or insecure storage.

## Checklist Rules

### Storage & Access
* **[DATA-01]** Implement least privilege; restrict users to only the functionality, data, and system information required to perform their tasks.
* **[DATA-02]** Protect all cached or temporary copies of sensitive data stored on the server from unauthorized access and purge them as soon as they are no longer required.
* **[DATA-03]** Encrypt highly sensitive stored information (e.g., authentication verification data) even on the server side.
    * Always use well-vetted algorithms.
* **[DATA-04]** Implement appropriate access controls for sensitive data stored on the server.
    * This includes cached data, temporary files, and data that should be accessible only by specific system users.
* **[DATA-05]** The application should support the removal of sensitive data (e.g., personal information or financial data) when it is no longer required.

### Client-Side Protection
* **[DATA-06]** Do not store passwords, connection strings, or other sensitive information in clear text or in any non-cryptographically secure manner on the client side.
    * Avoid embedding in insecure formats like MS ViewState, Flash, or compiled code.
* **[DATA-07]** Disable auto-complete features on forms expected to contain sensitive information, including authentication.
* **[DATA-08]** Disable client-side caching on pages containing sensitive information.
    * Use `Cache-Control: no-store`.
    * May use `Pragma: no-cache` for HTTP/1.0 compatibility.

### Information Leakage Prevention
* **[DATA-09]** Protect server-side source code from being downloaded by a user.
* **[DATA-10]** Remove comments in user-accessible production code that may reveal backend system details or other sensitive information.
* **[DATA-11]** Remove unnecessary application and system documentation as this can reveal useful information to attackers.
* **[DATA-12]** Do not include sensitive information in HTTP GET request parameters.