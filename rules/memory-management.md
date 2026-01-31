# Memory Management (MEM)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Memory Management controls focus on preventing common vulnerabilities related to buffer manipulation, resource leaks, and execution flow. These practices are critical for preventing buffer overflows and denial-of-service conditions.

## Checklist Rules

### Buffer & String Safety
* **[MEM-01]** Utilize input and output control for un-trusted data.
* **[MEM-02]** Double check that the buffer is as large as specified.
* **[MEM-03]** When using functions that accept a number of bytes to copy (e.g., `strncpy()`), be aware that if the destination buffer size is equal to the source buffer size, it may not NULL-terminate the string.
* **[MEM-04]** Check buffer boundaries if calling the function in a loop and make sure there is no danger of writing past the allocated space.
* **[MEM-05]** Truncate all input strings to a reasonable length before passing them to the copy and concatenation functions.
* **[MEM-06]** Avoid the use of known vulnerable functions (e.g., `printf`, `strcat`, `strcpy`, etc.).

### Resource & Execution Control
* **[MEM-07]** Specifically close resources, don't rely on garbage collection (e.g., connection objects, file handles, etc.).
* **[MEM-08]** Properly free allocated memory upon the completion of functions and at all exit points.
* **[MEM-09]** Use non-executable stacks when available.