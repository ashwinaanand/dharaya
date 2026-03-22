# Security Policy

## Reporting Security Vulnerabilities

We take security seriously. If you discover a security vulnerability in DHARAYA, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email your findings to: `security@example.com` (or create a private security advisory)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### Response

- We acknowledge receipt within 48 hours
- We work to verify and fix the issue quickly
- We keep you informed of progress
- Credit will be given to the reporter (unless you prefer anonymity)

## Security Best Practices

### API Keys & Credentials
- ✅ Always use environment variables (.env files)
- ✅ Never commit `.env` files to Git
- ✅ Rotate keys regularly
- ✅ Use strong, unique passwords

### Frontend
- ✅ Always validate user input
- ✅ Sanitize data before displaying
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

### Backend
- ✅ Validate all incoming requests
- ✅ Use CORS appropriately
- ✅ Implement rate limiting
- ✅ Keep Node.js and dependencies updated
- ✅ Use environment-based configuration

### Database
- ✅ Use strong MongoDB passwords
- ✅ Enable MongoDB authentication
- ✅ Regular backups
- ✅ Restrict database access

## Dependency Security

We regularly update dependencies to patch known vulnerabilities. To check for vulnerabilities:

```bash
npm audit
npm audit fix
```

Update dependencies regularly:
```bash
npm update
npm outdated
```

## Security Headers

In production, ensure you have:
- Content Security Policy (CSP)
- X-Frame-Options: DENY or SAMEORIGIN
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)

## Data Privacy

- User data is handled according to privacy policies
- No personal data is stored unless necessary
- Data is never shared with third parties without consent

## Compliance

- GDPR compliant data handling
- CCPA considerations for California users
- Privacy policy available on the website

## Version Support

- Report vulnerabilities for the latest version first
- We provide security updates for the last 2 major versions

---

Thank you for keeping DHARAYA secure! 🔒

