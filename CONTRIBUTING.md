# Contributing to DHARAYA

Thank you for your interest in contributing to DHARAYA! We welcome contributions from everyone.

## How to Contribute

### 1. Fork the Repository
```bash
git clone https://github.com/ashwinaanand/dharaya.git
cd dharaya
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes
- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly

### 4. Commit Your Changes
```bash
git commit -m "Add amazing feature"
```

Use clear, descriptive commit messages:
- ✅ `Add user authentication to dashboard`
- ❌ `fixed stuff`

### 5. Push and Create a Pull Request
```bash
git push origin feature/amazing-feature
```

Then open a Pull Request with:
- Clear title describing the changes
- Detailed description of what and why
- Screenshots or demos if applicable
- Reference any related issues

## Code Style Guidelines

### JavaScript/TypeScript
- Use 2-space indentation
- Use const/let, avoid var
- Use arrow functions where appropriate
- Write meaningful variable names
- Add JSDoc comments for functions

### React Components
- Use functional components with hooks
- Component names should be PascalCase
- Props should be destructured
- Use TypeScript interfaces for props

### Git Commit Messages
Use the following format:
```
<type>: <subject>

<body>

<footer>
```

Types:
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation
- **style**: Code style changes
- **refactor**: Code refactoring
- **test**: Tests
- **chore**: Build/dependencies

Example:
```
feat: Add email notifications for high severity reports

- Implement email service integration
- Add notification preferences to user settings
- Create email templates for different report categories

Fixes #123
```

## Issues

### Reporting Bugs
1. Check if the bug already exists
2. Provide detailed steps to reproduce
3. Include expected vs actual behavior
4. Attach screenshots/logs if applicable
5. State your environment (OS, Node version, etc.)

### Requesting Features
1. Describe the feature and use case
2. Explain why it would be useful
3. Suggest implementation approach (if applicable)
4. Link to any related issues

## Development Setup

```bash
# Clone repository
git clone https://github.com/ashwinaanand/dharaya.git
cd dharaya

# Setup backend
cd dharaya
npm install
cp .env.example .env
# Edit .env with your settings

# Setup frontend
cd ../frontend
npm install

# Run development servers
cd ../dharaya && node server.js  # Terminal 1
cd frontend && npm run dev        # Terminal 2
```

## Testing

Before submitting a PR:
1. Test your changes locally
2. Verify no console errors or warnings
3. Test on different browsers/screen sizes
4. Run the backend API tests

```bash
# Run backend tests (if available)
cd dharaya
npm test

# Run frontend tests (if available)
cd ../frontend
npm test
```

## Pull Request Process

1. Update README.md if needed
2. Update CHANGELOG.md with your changes
3. Ensure no linting errors
4. Add screenshots/GIFs for UI changes
5. Get approval from maintainers
6. Squash commits if requested

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on issues, not personalities
- Help others learn and grow

## Questions?

- Open an issue with the `question` label
- Check existing discussions
- Email: ashwin@example.com (optional)

Thank you for contributing to DHARAYA! 🌍

