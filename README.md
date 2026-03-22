# 🌍 DHARAYA - Environmental Pollution Monitoring Platform

A full-stack web application for monitoring, reporting, and visualizing environmental pollution data in real-time.

## Features

✅ **Pollution Reporting** - Submit pollution reports with category, location, severity, and coordinates  
✅ **Real-time Dashboard** - View statistics with Chart.js visualizations (Pie & Bar charts)  
✅ **Pollution Heat Map** - Filter and view all reports by pollution type  
✅ **Gamification** - Earn points for submitting reports (10-60 points per report)  
✅ **Category Filtering** - Air, Water, Soil, Noise, and Other pollutants  
✅ **MongoDB Integration** - Persistent data storage with MongoDB Atlas support  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  

## Tech Stack

### Frontend
- **Framework**: Next.js 16.2.1 with React 19
- **Styling**: Tailwind CSS v4.2.2
- **Visualization**: Chart.js & react-chartjs-2
- **HTTP Client**: Axios
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS, body-parser, dotenv

## Project Structure

```
dharaya/
├── dharaya/                    # Backend (Node.js/Express)
│   ├── models/
│   │   └── Report.js          # Mongoose schema for pollution reports
│   ├── routes/
│   │   └── reports.js         # API endpoints (CRUD, stats, eco-routes)
│   ├── server.js              # Express server (port 7777 by default)
│   ├── .env                   # Environment variables
│   └── package.json           # Backend dependencies
│
└── frontend/                   # Frontend (Next.js/React)
    ├── app/
    │   ├── page.tsx           # Main page with report form
    │   ├── layout.tsx         # Root layout
    │   ├── globals.css        # Global styles
    │   └── components/
    │       ├── Dashboard.tsx   # Stats dashboard with charts
    │       └── PollutionHeatmap.tsx  # Report list with filtering
    ├── public/                # Static assets
    ├── package.json           # Frontend dependencies
    └── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashwinaanand/dharaya.git
   cd dharaya
   ```

2. **Backend Setup**
   ```bash
   cd dharaya
   npm install
   ```
   
   Create `.env` file:
   ```env
   PORT=7777
   MONGODB_URI=mongodb://localhost:27017/dharaya
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

**Terminal 1 - Start Backend**
```bash
cd dharaya
node server.js
# Backend running on http://localhost:7777
```

**Terminal 2 - Start Frontend**
```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3000
```

Visit **http://localhost:3000** in your browser!

## API Endpoints

### Reports
- **POST** `/api/report` - Submit new pollution report
- **GET** `/api/reports` - Fetch all reports (supports filtering)
- **GET** `/api/reports/:id` - Get single report
- **PUT** `/api/reports/:id` - Update report status

### Statistics
- **GET** `/api/stats` - Get aggregated statistics (total reports, breakdown by category/severity/status, total points)

### Routes
- **GET** `/api/eco-routes` - Get eco-friendly route suggestions

### Health
- **GET** `/api/health` - Check backend status

## Form Fields

When submitting a pollution report, provide:
- **Category** (required): air, water, soil, noise, other
- **Location** (required): Street name, park, building, etc.
- **Severity** (required): low, medium, high
- **Description** (required): Detailed description of pollution
- **Latitude** (optional): GPS latitude coordinate
- **Longitude** (optional): GPS longitude coordinate

## Database Schema

### Report Collection
```javascript
{
  category: String (air|water|soil|noise|other),
  description: String,
  location: String,
  latitude: Number (optional),
  longitude: Number (optional),
  severity: String (low|medium|high),
  status: String (Pending|In Progress|Resolved),
  points: Number (10-60),
  imageUrl: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Dashboard Features

### Statistics Cards
- **Total Reports**: Count of all submitted reports
- **High Severity**: Count of high-severity reports
- **Total Points**: Aggregate points earned
- **Pending Status**: Count of pending reports

### Visualizations
- **Pie Chart**: Severity distribution (High/Medium/Low)
- **Bar Chart**: Report count by category (Air/Water/Soil/Noise/Other)

## Deployment

### Frontend (Vercel)
```bash
# Vercel auto-detects Next.js projects
npm i -g vercel
vercel
```

Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_BACKEND_URL=https://dharaya-backend.herokuapp.com
```

### Backend (Render/Heroku)

**Create Procfile:**
```
web: node server.js
```

**Set environment variables on Render/Heroku:**
```
PORT=7777
MONGODB_URI=<your-mongo-atlas-uri>
NODE_ENV=production
FRONTEND_URL=https://dharaya.vercel.app
```

**Deploy:**
```bash
# Heroku
git push heroku main

# Render - connect via Dashboard
```

## Environment Variables

### Backend (.env)
```env
PORT=7777                                          # Server port
MONGODB_URI=mongodb://localhost:27017/dharaya      # MongoDB connection
NODE_ENV=development                               # development|production
FRONTEND_URL=http://localhost:3000                 # CORS origin
```

### Frontend (next.config.ts)
Update BACKEND_URL in components:
```typescript
const BACKEND_URL = 'http://localhost:7777'; // Development
// For production, use environment variable
```

## Development Commands

### Backend
```bash
cd dharaya
npm install               # Install dependencies
node server.js           # Run server
npm run dev             # Run with hot-reload (if using nodemon)
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run start           # Run production build
npm run lint            # Run ESLint
```

## Testing

### Test Backend Health
```bash
curl http://localhost:7777/api/health
# Response: {"success": true, "message": "Backend is running!"}
```

### Submit Test Report
```bash
curl -X POST http://localhost:7777/api/report \
  -H "Content-Type: application/json" \
  -d '{
    "category": "air",
    "location": "Central Park",
    "severity": "high",
    "description": "Heavy smog detected",
    "latitude": 40.7829,
    "longitude": -73.9654
  }'
```

## Troubleshooting

### Port Already in Use
```bash
# Windows - Find and kill process on port 7777
Get-NetTCPConnection -LocalPort 7777 | Select-Object OwningProcess
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :7777
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB server is running locally: `mongod`
- Or use MongoDB Atlas connection string in `.env`
- Check `MONGODB_URI` format is correct

### CORS Issues
- Verify `FRONTEND_URL` in backend `.env` matches actual frontend URL
- Check CORS middleware in `server.js`

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

MIT License - feel free to use this project for personal or educational purposes.

## Contact & Support

- **GitHub**: [ashwinaanand/dharaya](https://github.com/ashwinaanand/dharaya)
- **Issues**: [Report bugs or request features](https://github.com/ashwinaanand/dharaya/issues)

## Roadmap

- [ ] Advanced filtering and searching
- [ ] User authentication and profiles
- [ ] Photo uploads for reports
- [ ] Real Google Maps integration
- [ ] Email notifications for high-severity reports
- [ ] Mobile app (React Native)
- [ ] AI-powered pollution prediction
- [ ] Community leaderboards

---

**Made with ❤️ for environmental monitoring**
