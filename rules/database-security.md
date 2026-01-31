# Database Security (DB)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Database Security focuses on protecting the database from unauthorized access, injection attacks (SQLi), and configuration weaknesses. [cite_start]It emphasizes the use of parameterized queries and least privilege[cite: 313, 314].

## Checklist Rules

### Query & Data Safety
* [cite_start]**[DB-01]** Use strongly typed parameterized queries[cite: 314].
* **[DB-02]** Utilize input validation and output encoding, specifically addressing meta characters. [cite_start]If these fail, do not run the database command[cite: 315, 316].
* [cite_start]**[DB-03]** Ensure that variables are strongly typed[cite: 317].
* [cite_start]**[DB-04]** Use stored procedures to abstract data access and allow for the removal of permissions to the base tables in the database[cite: 321].

### Authentication & Access
* [cite_start]**[DB-05]** The application should use the lowest possible level of privilege when accessing the database[cite: 318].
* [cite_start]**[DB-06]** Use secure credentials for database access[cite: 318].
* [cite_start]**[DB-07]** The application should connect to the database with different credentials for every trust distinction (e.g., user, read-only user, guest, administrators)[cite: 331].
* **[DB-08]** Connection strings should not be hard coded within the application. [cite_start]Store them in a separate configuration file on a trusted system and encrypt them[cite: 319, 320].
* [cite_start]**[DB-09]** Close the connection as soon as possible[cite: 322].
* **[DB-10]** Remove or change all default database administrative passwords. [cite_start]Utilize strong passwords/phrases or implement multi-factor authentication[cite: 323, 324].

### Configuration & Hardening
* **[DB-11]** Turn off all unnecessary database functionality (e.g., unnecessary stored procedures or services, utility packages). [cite_start]Install only the minimum set of features and options required (surface area reduction)[cite: 328].
* [cite_start]**[DB-12]** Remove unnecessary default vendor content (e.g., sample schemas)[cite: 329].
* [cite_start]**[DB-13]** Disable any default accounts that are not required to support business requirements[cite: 330].