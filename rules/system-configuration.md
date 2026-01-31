# System Configuration (SYS)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
System Configuration controls ensure that the servers, frameworks, and supporting infrastructure are deployed securely. This involves hardening the environment, removing unnecessary features, and managing updates.

## Checklist Rules

### Hardening & Maintenance
* **[SYS-01]** Ensure servers, frameworks, and system components are running the latest approved version.
* **[SYS-02]** Ensure servers, frameworks, and system components have all patches issued for the version in use.
* **[SYS-03]** Turn off directory listings.
* **[SYS-04]** Restrict the web server, process, and service accounts to the least privileges possible.
* **[SYS-05]** When exceptions occur, fail securely.
* **[SYS-06]** Remove all unnecessary functionality and files.
* **[SYS-07]** Remove test code or any functionality not intended for production prior to deployment.
* **[SYS-08]** Prevent disclosure of your directory structure in the `robots.txt` file by placing private directories into an isolated parent directory and disallowing the parent.

### HTTP Configuration
* **[SYS-09]** Define which HTTP methods (GET, POST, etc.) the application will support and whether they will be handled differently in different pages.
* **[SYS-10]** Disable unnecessary HTTP methods, such as WebDAV extensions.
    * If an extended method is required, utilize a well-vetted authentication mechanism.
* **[SYS-11]** If the web server handles both HTTP 1.0 and 1.1, ensure both are configured similarly or understand any differences (e.g., handling of extended methods).
* **[SYS-12]** Remove unnecessary information from HTTP response headers related to the OS, web-server version, and application frameworks.

### Management & Process
* **[SYS-13]** The security configuration store for the application should be able to be output in human-readable form to support auditing.
* **[SYS-14]** Implement an asset management system and register system components and software in it.
* **[SYS-15]** Isolate development environments from the production network and provide access only to authorized development and test groups.
* **[SYS-16]** Implement a software change control system to manage and record changes to the code both in development and production.