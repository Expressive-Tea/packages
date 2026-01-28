# Support

Welcome to Expressive Tea Packages support! We're here to help you build amazing applications.

## 📚 Documentation

Start with our comprehensive documentation:

- **[Main Framework Docs](https://zero-oneit.github.io/expresive-tea/)** - Complete Expressive Tea documentation
- **[API Reference](https://zero-oneit.github.io/expresive-tea/api/)** - Detailed API documentation
- **[Migration Guide](../MIGRATION.md)** - Upgrading from v0.0.x to v2.0.0
- **[CHANGELOG](../CHANGELOG.md)** - What's new in each version

## 💬 Community

Get help from the community:

### Real-time Chat

- **[Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea)** - Live chat with maintainers and community members

### Discussions

- **[GitHub Discussions](https://github.com/Expressive-Tea/packages/discussions)** - Ask questions, share ideas, and discuss features
  - **Q&A** - Get help with your code
  - **Ideas** - Propose new features
  - **Show and Tell** - Share what you've built

### Stack Overflow

- **[Stack Overflow](https://stackoverflow.com/questions/tagged/expressive-tea)** - Ask questions with the tag `expressive-tea`

## 🐛 Bug Reports

Found a bug? We want to know about it!

1. **Check existing issues** - Search [existing issues](https://github.com/Expressive-Tea/packages/issues) first
2. **Create a bug report** - Use our [bug report template](https://github.com/Expressive-Tea/packages/issues/new?template=bug_report.yml)
3. **Provide details** - Include code samples, environment info, and steps to reproduce

## ✨ Feature Requests

Have an idea for a new feature?

1. **Check discussions** - See if it's already being discussed
2. **Submit a feature request** - Use our [feature request template](https://github.com/Expressive-Tea/packages/issues/new?template=feature_request.yml)
3. **Join the conversation** - Participate in the discussion

## 📧 Email Support

For private inquiries that don't fit public channels:

- **General support**: project@zero-oneit.com
- **Security issues**: security@expressive-tea.io (see [Security Policy](SECURITY.md))
- **Business inquiries**: projects@zero-oneit.com

## ⏱️ Response Times

We strive to respond as quickly as possible:

| Type | Expected Response Time |
|------|------------------------|
| 🔒 Critical security issues | 24-48 hours |
| 🐛 Bug reports | 3-5 business days |
| ✨ Feature requests | 1-2 weeks |
| ❓ General questions | Best effort |

*Note: These are community-maintained packages. Response times may vary based on maintainer availability.*

## 🤝 Contributing

Want to help improve Expressive Tea?

- **[Contributing Guide](../CONTRIBUTING.md)** - Learn how to contribute
- **[Code of Conduct](../CODE_OF_CONDUCT.md)** - Community guidelines
- **Good First Issues** - Look for issues tagged `good-first-issue`

## 📦 Package-Specific Help

### @expressive-tea/commons

For metadata utilities and shared types:
- Check the [JSDoc documentation](../packages/commons/src/classes/Metadata.ts)
- See examples in the [test files](../packages/commons/src/__test__/)

### @expressive-tea/plugin

For plugin development:
- Read the [Plugin class documentation](../packages/plugin/src/classes/Plugin.ts)
- Learn about [boot stages](../packages/plugin/src/constants.ts)
- Review [example plugins](../packages/plugin/src/__test__/)

## 🔍 Troubleshooting

### Common Issues

**TypeScript errors with decorators**
- Ensure `experimentalDecorators` and `emitDecoratorMetadata` are enabled in `tsconfig.json`
- Import `reflect-metadata` at the top of your entry file

**Module not found errors**
- Run `yarn install` or `npm install`
- Check that package versions are compatible (Node.js >= 18, TypeScript >= 5)

**Build errors**
- Clear node_modules: `rm -rf node_modules && yarn install`
- Clear build cache: `yarn clean && yarn build`

**Test failures**
- Update Jest and ts-jest to latest versions
- Ensure `reflect-metadata` is imported in test setup

### Still Need Help?

1. **Search documentation** - Use the search feature in our docs
2. **Check issues** - Someone may have had the same problem
3. **Ask the community** - Post in Discussions or Gitter
4. **Create an issue** - If it's a bug or feature request

## 📊 Project Status

- **Build Status**: ![Build](https://img.shields.io/github/actions/workflow/status/Expressive-Tea/packages/ci.yml)
- **Coverage**: ![Coverage](https://img.shields.io/codecov/c/github/Expressive-Tea/packages)
- **Version**: ![npm](https://img.shields.io/npm/v/@expressive-tea/commons)
- **License**: ![License](https://img.shields.io/github/license/Expressive-Tea/packages)

## 🙏 Thank You

Thank you for using Expressive Tea! Your feedback and contributions make this project better.

---

**Quick Links**:
[Documentation](https://zero-oneit.github.io/expresive-tea/) • 
[GitHub](https://github.com/Expressive-Tea/packages) • 
[npm](https://www.npmjs.com/package/@expressive-tea/commons) • 
[Gitter](https://gitter.im/Expressive-Tea/expresive-tea)
