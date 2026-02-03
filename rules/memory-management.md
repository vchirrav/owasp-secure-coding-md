# Memory Management (MEM)

> Source: OWASP Secure Coding Practices Quick Reference Guide v2.1

## Principles
Memory management rules prevent buffer overflows, memory leaks, and resource exhaustion. These practices are especially important in low-level languages and security-critical systems.

## Checklist Rules

### [MEM-01] Control Input and Output for Untrusted Data
**Identity:** MEM-01
**Rule:** Apply strict input and output controls for untrusted data.
**Rationale:** Untrusted data can trigger unsafe memory operations.
**Implementation:** Validate input sizes, types, and formats before processing.
**Verification:** Test with oversized and malformed inputs.
**Examples:**
1. Do: Enforce maximum input sizes.
2. Don't: Accept unbounded data for memory operations.

### [MEM-02] Verify Buffer Sizes
**Identity:** MEM-02
**Rule:** Ensure buffers are correctly sized for intended operations.
**Rationale:** Incorrect buffer sizing leads to overflows.
**Implementation:** Use safe APIs that track buffer sizes.
**Verification:** Review buffer allocations and copy operations.
**Examples:**
1. Do: Allocate buffers based on validated input length.
2. Don't: Assume buffers are large enough without checks.

### [MEM-03] Ensure Null Termination
**Identity:** MEM-03
**Rule:** Ensure strings are properly null-terminated when using bounded copy functions.
**Rationale:** Missing null termination can cause memory disclosure or crashes.
**Implementation:** Explicitly set null terminators when using `strncpy`-style functions.
**Verification:** Test string handling for proper termination.
**Examples:**
1. Do: Add `dest[size-1] = '\0'` after `strncpy`.
2. Don't: Assume `strncpy` always null-terminates.

### [MEM-04] Check Buffer Boundaries in Loops
**Identity:** MEM-04
**Rule:** Validate buffer boundaries in loops to prevent overflows.
**Rationale:** Iterative writes often cause boundary errors.
**Implementation:** Track indexes carefully and validate each write.
**Verification:** Use tests and static analysis for loop boundaries.
**Examples:**
1. Do: Check index < buffer_size on every iteration.
2. Don't: Increment pointers without boundary checks.

### [MEM-05] Truncate Input Strings Safely
**Identity:** MEM-05
**Rule:** Truncate input strings to safe lengths before copy/concat.
**Rationale:** Long inputs can exceed buffer sizes.
**Implementation:** Enforce max length and truncate safely with termination.
**Verification:** Ensure truncation happens before memory operations.
**Examples:**
1. Do: Enforce max input length before concatenation.
2. Don't: Concatenate unbounded strings.

### [MEM-06] Avoid Vulnerable Functions
**Identity:** MEM-06
**Rule:** Avoid known unsafe functions like `strcpy`, `strcat`, and unbounded `printf`.
**Rationale:** These functions are common sources of buffer overflows.
**Implementation:** Use safer alternatives like `snprintf`, `strlcpy`, or language-safe APIs.
**Verification:** Scan code for unsafe function usage.
**Examples:**
1. Do: Use bounded functions with explicit lengths.
2. Don't: Use legacy unsafe string functions.

### [MEM-07] Close Resources Explicitly
**Identity:** MEM-07
**Rule:** Close resources explicitly rather than relying on GC or finalizers.
**Rationale:** Unreleased resources lead to leaks and exhaustion.
**Implementation:** Use `finally` or equivalent to ensure closure.
**Verification:** Monitor for resource leaks under load.
**Examples:**
1. Do: Close file handles and connections promptly.
2. Don't: Rely on garbage collection for resource cleanup.

### [MEM-08] Free Memory on All Exit Paths
**Identity:** MEM-08
**Rule:** Free allocated memory at all exit points.
**Rationale:** Unfreed memory causes leaks and instability.
**Implementation:** Use RAII or structured cleanup patterns.
**Verification:** Run leak detection tools.
**Examples:**
1. Do: Free memory in `finally` or cleanup blocks.
2. Don't: Exit functions early without cleanup.

### [MEM-09] Use Non-Executable Stacks Where Supported
**Identity:** MEM-09
**Rule:** Enable non-executable stack protections.
**Rationale:** Prevents execution of injected shellcode.
**Implementation:** Use compiler and OS protections (NX, DEP).
**Verification:** Ensure binaries are built with NX/DEP enabled.
**Examples:**
1. Do: Compile with stack protection and NX flags.
2. Don't: Disable executable stack protections.
