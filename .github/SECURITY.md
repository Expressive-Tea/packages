# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported |
| ------- | --------- |
| 2.0.x   | ✅ Yes    |
| < 2.0   | ❌ No     |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

We take security seriously and appreciate your efforts to responsibly disclose your findings.

### How to Report

Please report security vulnerabilities via email to:

**📧 security@expressive-tea.io** or **support@expressive-tea.io**

### What to Include

To help us better understand and address the issue, please include:

1. **Package name and version** - Which package is affected
2. **Vulnerability description** - Clear explanation of the issue
3. **Steps to reproduce** - Detailed reproduction steps
4. **Potential impact** - What could an attacker achieve
5. **Suggested fix** - If you have ideas for a solution (optional)
6. **Proof of concept** - Code demonstrating the vulnerability (if applicable)

### What to Expect

1. **Acknowledgment** - You'll receive a response within **48 hours**
2. **Investigation** - We'll investigate and validate the report
3. **Resolution** - We'll develop and test a fix
4. **Release** - We'll release a patch version
5. **Disclosure** - We'll publicly disclose after the fix is available
6. **Credit** - We'll credit you in the security advisory (if desired)

## Security Best Practices

When using @expressive-tea packages:

### General Guidelines

- ✅ Always use the **latest stable version**
- ✅ Keep **Node.js and TypeScript** up to date
- ✅ Run `npm audit` or `yarn audit` regularly
- ✅ Review dependencies periodically
- ✅ Use **TypeScript strict mode** for type safety

### Plugin Development

- ✅ **Validate all user input** in plugin methods
- ✅ Follow the **principle of least privilege**
- ✅ Avoid executing arbitrary code from plugins
- ✅ Sanitize configuration settings
- ✅ Be cautious with file system operations

### Metadata & Decorators

- ✅ Only use metadata from **trusted sources**
- ✅ Validate metadata values before use
- ✅ Be aware that decorators execute at **design time**

## Known Security Considerations

### Reflect Metadata

This package uses `reflect-metadata` for decorator support. Be aware that:

- Metadata can be set on any object
- Metadata is stored in memory for the application lifetime
- Malicious code could potentially read or modify metadata

### Plugin Dependencies

When declaring plugin dependencies:

- Only depend on plugins from **trusted sources**
- Circular dependencies are not detected automatically
- Missing dependencies throw errors at runtime

## Security Updates

We will:

- Release security patches as **quickly as possible**
- Notify users via **GitHub Security Advisories**
- Document the issue in the **CHANGELOG**
- Follow **responsible disclosure** practices

## Contact

- **Security issues**: security@expressive-tea.io
- **General questions**: support@expressive-tea.io
- **GitHub Issues**: [Report a bug](https://github.com/Expressive-Tea/packages/issues/new/choose)

---

**Thank you for helping keep Expressive Tea and our community safe! 🙏**
