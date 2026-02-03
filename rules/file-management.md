# File Management (FILE)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
File management security prevents unauthorized file access, path traversal, and malicious uploads. It ensures safe handling of file paths, storage locations, and user-controlled file inputs.

## Checklist Rules

### [FILE-01] Require Authentication for File Uploads
**Identity:** FILE-01
**Rule:** Require authentication before allowing file uploads.
**Rationale:** Prevents anonymous abuse and reduces malicious uploads.
**Implementation:** Enforce authentication on upload endpoints.
**Verification:** Attempt unauthenticated uploads and ensure denial.
**Examples:**
1. Do: Require login before upload.
2. Don't: Allow anonymous file uploads.

### [FILE-02] Restrict Upload File Types
**Identity:** FILE-02
**Rule:** Allow only file types required for business needs.
**Rationale:** Reduces risk from executable or unsafe file types.
**Implementation:** Use allowlists for MIME types and extensions.
**Verification:** Attempt uploads of disallowed types and confirm rejection.
**Examples:**
1. Do: Allow only images for profile photos.
2. Don't: Allow arbitrary file types.

### [FILE-03] Validate File Type by Content
**Identity:** FILE-03
**Rule:** Validate file types using file headers or content, not just extensions.
**Rationale:** Extensions can be spoofed easily.
**Implementation:** Use magic bytes or trusted content scanners.
**Verification:** Upload a renamed executable and ensure detection.
**Examples:**
1. Do: Check file signatures and MIME type.
2. Don't: Trust file extension alone.

### [FILE-04] Store Uploads Outside Web Root
**Identity:** FILE-04
**Rule:** Store uploaded files outside the application web root or in a dedicated content store.
**Rationale:** Prevents direct execution or access to uploaded files.
**Implementation:** Use a separate storage location or object storage.
**Verification:** Confirm uploads are not directly accessible via URL.
**Examples:**
1. Do: Store uploads in object storage with controlled access.
2. Don't: Save uploads in the app's static file directory.

### [FILE-05] Block Executable Uploads
**Identity:** FILE-05
**Rule:** Prevent upload of files that could be executed by the server.
**Rationale:** Executable uploads can enable remote code execution.
**Implementation:** Block scripts, binaries, and server-executable types.
**Verification:** Attempt to upload a script and ensure rejection.
**Examples:**
1. Do: Block `.php`, `.jsp`, `.exe` uploads.
2. Don't: Allow script files in upload directories.

### [FILE-06] Disable Execution in Upload Directories
**Identity:** FILE-06
**Rule:** Disable execution permissions in upload directories.
**Rationale:** Prevents uploaded files from being executed by the server.
**Implementation:** Configure server to treat upload directories as static content only.
**Verification:** Ensure scripts in upload directories cannot execute.
**Examples:**
1. Do: Set upload folders to non-executable.
2. Don't: Allow CGI or script execution in upload paths.

### [FILE-07] Isolate Upload Storage in UNIX
**Identity:** FILE-07
**Rule:** Isolate upload directories using chroot or dedicated mounts.
**Rationale:** Limits lateral access if uploads are compromised.
**Implementation:** Use chroot jails or separate mount points for uploads.
**Verification:** Confirm uploads cannot access other filesystem areas.
**Examples:**
1. Do: Mount uploads on a separate filesystem.
2. Don't: Store uploads with application binaries.

### [FILE-08] Scan Uploads for Malware
**Identity:** FILE-08
**Rule:** Scan user-uploaded files for malware.
**Rationale:** Uploaded files can carry malicious payloads.
**Implementation:** Use antivirus or sandbox scanning for uploads.
**Verification:** Test malware detection on uploaded files.
**Examples:**
1. Do: Scan uploads before making them available.
2. Don't: Serve uploads without scanning.

### [FILE-09] Avoid Dynamic Includes from User Input
**Identity:** FILE-09
**Rule:** Do not pass user input to dynamic include functions.
**Rationale:** Prevents LFI/RFI and path traversal.
**Implementation:** Use static includes or allowlists.
**Verification:** Attempt to include arbitrary paths and ensure rejection.
**Examples:**
1. Do: Use fixed include paths.
2. Don't: Include files from user-supplied paths.

### [FILE-10] Allowlist File Names for Access
**Identity:** FILE-10
**Rule:** Use allowlists for file names and types when referencing files.
**Rationale:** Prevents unauthorized file access and traversal.
**Implementation:** Map requested IDs to known file names.
**Verification:** Attempt to access files outside allowlist.
**Examples:**
1. Do: Map file IDs to safe file paths.
2. Don't: Accept arbitrary file names from users.

### [FILE-11] Use Indexes Instead of Paths
**Identity:** FILE-11
**Rule:** Use index values mapped to predefined paths instead of user-supplied paths.
**Rationale:** Prevents path traversal and unauthorized access.
**Implementation:** Resolve file IDs to pre-approved paths.
**Verification:** Attempt to provide `../` paths and confirm rejection.
**Examples:**
1. Do: Use `fileId` mapped to a known path.
2. Don't: Use raw file paths from user input.

### [FILE-12] Do Not Expose Absolute Paths
**Identity:** FILE-12
**Rule:** Never send absolute file paths to clients.
**Rationale:** Path disclosure aids attackers in reconnaissance.
**Implementation:** Use opaque identifiers or relative references.
**Verification:** Inspect responses for filesystem paths.
**Examples:**
1. Do: Return file IDs instead of paths.
2. Don't: Include `/var/app/data/...` in responses.

### [FILE-13] Make Application Files Read-Only
**Identity:** FILE-13
**Rule:** Ensure application files and resources are read-only in production.
**Rationale:** Prevents attackers from modifying code or assets.
**Implementation:** Set file permissions and use immutable infrastructure where possible.
**Verification:** Confirm app files cannot be modified by runtime user.
**Examples:**
1. Do: Mount application code as read-only.
2. Don't: Allow write access to application binaries.

### [FILE-14] Avoid User-Controlled Redirects
**Identity:** FILE-14
**Rule:** Do not pass user-supplied data into dynamic redirects; if required, allowlist relative paths.
**Rationale:** Prevents open redirect and phishing attacks.
**Implementation:** Use allowlisted paths or strict validation.
**Verification:** Attempt external redirects and ensure rejection.
**Examples:**
1. Do: Redirect only to known internal paths.
2. Don't: Allow arbitrary URLs in redirect parameters.
