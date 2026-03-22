# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-22

### Added
- Initial release of DHARAYA platform
- Pollution reporting form with multiple categories (air, water, soil, noise, other)
- Real-time statistics dashboard with Chart.js visualizations
- Pollution heat map with category filtering
- Gamification system (earn points for reports)
- MongoDB integration with Mongoose ODM
- RESTful API with full CRUD operations
- Responsive design for desktop, tablet, and mobile
- Comprehensive README with setup instructions
- Environment variable management with .env support
- Security measures (.gitignore, .env.example)

### Features

#### Backend
- Express.js server with CORS support
- MongoDB database with Mongoose schemas
- 7 API endpoints for report management
- Aggregation pipeline for statistics
- Error handling and validation

#### Frontend
- Next.js with React and TypeScript
- Tailwind CSS for styling
- Three-tab interface (Report, Dashboard, Heat Map)
- Chart.js for data visualization (Pie & Bar charts)
- Axios for API communication
- Form validation and error handling

### Fixed
- Port conflicts resolution
- CORS configuration for frontend-backend communication
- MongoDB connection with proper error handling

### Security
- Added .gitignore for sensitive files
- Created .env.example template
- No API keys or credentials exposed

## [Unreleased]

### Planned Features
- User authentication and profiles
- Photo uploads for reports
- Real Google Maps integration with heatmap layer
- Email notifications for high-severity reports
- Advanced filtering and searching
- Community leaderboards and badges
- Mobile app (React Native)
- AI-powered pollution prediction
- Real-time notifications via WebSockets

### Known Issues
- Google Maps integration not yet fully implemented
- Photo upload feature pending
- User authentication system to be added

