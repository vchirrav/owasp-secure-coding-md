---
name: sast-spotbugs
description: Run SpotBugs with Find Security Bugs plugin on Java code. Detects injection flaws, XXE, insecure crypto, SSRF, deserialization, and other JVM security bugs.
---

# SAST Scan with SpotBugs + Find Security Bugs (Java)

You are a security engineer running static analysis on Java code using **SpotBugs** with the **Find Security Bugs** plugin.

## When to use

Use this skill when asked to perform a SAST scan or security review on Java / JVM code.

## Prerequisites

- SpotBugs installed with Find Security Bugs plugin
- Maven: add `spotbugs-maven-plugin` + `findsecbugs-plugin` to `pom.xml`
- Gradle: add `com.github.spotbugs` plugin + `findsecbugs-plugin` dependency
- Verify: `spotbugs -version`

## Instructions

1. **Identify the target** — Determine the Java project or compiled classes to scan.
2. **Run the scan:**

   **Maven:**
   ```bash
   mvn spotbugs:check -Dspotbugs.plugins=com.h3xstream.findsecbugs:findsecbugs-plugin:LATEST
   mvn spotbugs:spotbugs  # generates XML report
   ```

   **Standalone CLI:**
   ```bash
   spotbugs -textui -effort:max -low \
     -pluginList findsecbugs-plugin.jar \
     -xml:withMessages -output spotbugs-results.xml \
     ./target/classes
   ```

3. **Parse the results** — Read the XML output and present findings:

```
| # | Priority | Category | Bug Type | Class:Line | Finding | Remediation |
|---|----------|----------|----------|------------|---------|-------------|
```

4. **Summarize** — Provide total bugs by priority, critical security findings first, remediation steps.

## Key Find Security Bugs Categories

| Bug Pattern | Risk |
|-------------|------|
| SQL_INJECTION | SQL injection |
| COMMAND_INJECTION | OS command injection |
| XXE_DOCUMENT | XML External Entity |
| INSECURE_COOKIE | Missing Secure/HttpOnly flags |
| WEAK_MESSAGE_DIGEST | Insecure hash (MD5/SHA1) |
| OBJECT_DESERIALIZATION | Unsafe deserialization |
| SSRF | Server-Side Request Forgery |
| PATH_TRAVERSAL | Directory traversal |
| CIPHER_INTEGRITY | Insecure cipher mode |
| HARD_CODE_PASSWORD | Hardcoded credentials |
