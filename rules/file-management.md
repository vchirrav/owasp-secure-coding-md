# File Management (FILE)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
File Management controls secure the interaction between the application code and the file system. This includes preventing unauthorized file access (LFI/RFI), ensuring safe file uploads, and preventing path traversal attacks.

## Checklist Rules

### File Uploads
* **[FILE-01]** Require authentication before allowing a file to be uploaded.
* **[FILE-02]** Limit the type of files that can be uploaded to only those types that are needed for business purposes.
* **[FILE-03]** Validate uploaded files are the expected type by checking file headers. Checking for file type by extension alone is not sufficient.
* **[FILE-04]** Do not save files in the same web context as the application. Files should either go to the content server or in the database.
* **[FILE-05]** Prevent or restrict the uploading of any file that may be interpreted by the web server.
* **[FILE-06]** Turn off execution privileges on file upload directories.
* **[FILE-07]** Implement safe uploading in UNIX by mounting the targeted file directory as a logical drive using the associated path or the chrooted environment.
* **[FILE-08]** Scan user uploaded files for viruses and malware.

### File Access & Handling
* **[FILE-09]** Do not pass user supplied data directly to any dynamic include function.
* **[FILE-10]** When referencing existing files, use a white list of allowed file names and types.
    * Validate the value of the parameter being passed.
    * If it does not match one of the expected values, either reject it or use a hard-coded default file value.
* **[FILE-11]** Do not pass directory or file paths; use index values mapped to a pre-defined list of paths.
* **[FILE-12]** Never send the absolute file path to the client.
* **[FILE-13]** Ensure application files and resources are read-only.
* **[FILE-14]** Do not pass user supplied data into a dynamic redirect.
    * If this must be allowed, the redirect should accept only validated, relative path URLs.