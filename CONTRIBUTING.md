# Contributing to VidLoad.cc

Thank you for your interest in contributing to VidLoad.cc! We welcome contributions from the community and are grateful for your help in making this privacy-first video analysis tool even better.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** your changes
6. **Submit** a pull request

## 📋 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🛠️ Development Setup

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Git**

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/vidload.git
cd vidload

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Setup

```bash
# Copy environment variables (if needed)
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for type safety
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Code formatting is enforced by Prettier
- **Naming**: Use descriptive variable and function names

### Commit Messages

Use [Conventional Commits](https://conventionalcommits.org/) format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

**Examples:**
```
feat(video): add support for AV1 codec
fix(hls): resolve manifest parsing error
docs(readme): update installation instructions
```

### Branch Naming

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Browser and version** information
5. **Video file information** (format, size, etc.) if relevant
6. **Console errors** (if any)

### Feature Requests

For feature requests, please provide:

1. **Clear description** of the requested feature
2. **Use case** - why is this feature needed?
3. **Proposed solution** (if you have ideas)
4. **Alternatives considered**

## 🔍 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Update tests when modifying existing code
- Ensure all tests pass before submitting PR
- Aim for good test coverage

### Manual Testing

Before submitting, please test:

1. **Local file upload** with various formats
2. **HLS stream analysis** with different sources
3. **UI responsiveness** on different screen sizes
4. **Browser compatibility** (Chrome, Firefox, Safari)

## 📝 Documentation

### Code Documentation

- Add JSDoc comments for functions and classes
- Include parameter and return type descriptions
- Provide usage examples for complex functions

### README Updates

- Update README.md if adding new features
- Include new dependencies in the tech stack section
- Update browser compatibility if needed

## 🚀 Pull Request Process

### Before Submitting

1. **Rebase** your branch on the latest main
2. **Run tests** and ensure they pass
3. **Run linter** and fix any issues
4. **Update documentation** if needed
5. **Test manually** in different browsers

### PR Description

Include in your PR description:

1. **Summary** of changes
2. **Related issues** (if applicable)
3. **Testing performed**
4. **Screenshots** (for UI changes)
5. **Breaking changes** (if any)

### Review Process

1. At least one maintainer will review your PR
2. Address any requested changes
3. Ensure all CI checks pass
4. Once approved, your PR will be merged

## 🏷️ Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Notes

Each release includes:

- Summary of changes
- New features
- Bug fixes
- Breaking changes (if any)
- Upgrade instructions

## 🛡️ Security

### Reporting Security Issues

**Do not** report security vulnerabilities through public GitHub issues.

Instead:
1. Email: security@vidload.cc
2. Include detailed description
3. Provide steps to reproduce
4. Allow time for response before public disclosure

### Security Considerations

When contributing:

- Follow security best practices
- Avoid introducing XSS vulnerabilities
- Be careful with user input handling
- Respect privacy principles (no data collection)

## 🌍 Internationalization

### Adding Translations

To add a new language:

1. Create language file in `lib/translations/`
2. Add all required translation keys
3. Update language selector component
4. Test all UI elements in new language

### Translation Guidelines

- Keep translations concise and clear
- Maintain technical accuracy
- Consider cultural context
- Test UI layout with translated text

## 📊 Performance

### Performance Guidelines

- Optimize for browser performance
- Consider memory usage for large video files
- Minimize bundle size
- Use lazy loading where appropriate

### Profiling

Use browser dev tools to:
- Monitor memory usage
- Analyze performance bottlenecks
- Check for memory leaks
- Optimize rendering performance

## 🔗 External Dependencies

### Adding Dependencies

Before adding new dependencies:

1. Evaluate if it's truly necessary
2. Check license compatibility (prefer MIT/Apache)
3. Consider bundle size impact
4. Ensure it supports our browser targets
5. Discuss with maintainers for major additions

### Updating Dependencies

- Keep dependencies up to date
- Test thoroughly after updates
- Check for breaking changes
- Update lock files

## 💬 Communication

### GitHub Discussions

Use GitHub Discussions for:
- General questions
- Feature discussions
- Community feedback
- Sharing use cases

### Issues

Use GitHub Issues for:
- Bug reports
- Specific feature requests
- Documentation improvements

## 🎉 Recognition

Contributors will be recognized:

- In the project README
- In release notes
- On the project website
- Through GitHub contributor graphs

## 📚 Resources

### Helpful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [FFmpeg.wasm Documentation](https://ffmpegwasm.netlify.app/)
- [HLS.js Documentation](https://github.com/video-dev/hls.js/)

### Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [WebAssembly Documentation](https://webassembly.org/)
- [Video Technology Basics](https://developer.mozilla.org/en-US/docs/Web/Media)

## ❓ Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Review this guide thoroughly
3. Ask in GitHub Discussions
4. Contact maintainers if needed

---

Thank you for contributing to VidLoad.cc! Together, we're building the best privacy-first video analysis tool for everyone. 🚀
