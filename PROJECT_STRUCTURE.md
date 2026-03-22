# DHARAYA Project Structure

## 📁 Root Directory

```
dharaya/
├── .github/                      # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/
│   │   ├── BUG_REPORT.md        # Bug report template
│   │   ├── FEATURE_REQUEST.md   # Feature request template
│   │   └── config.yml           # GitHub issue config
│   └── PULL_REQUEST_TEMPLATE.md # PR template
│
├── dharaya/                      # Backend (Node.js/Express)
│   ├── models/
│   │   └── Report.js            # Mongoose schema for pollution reports
│   ├── routes/
│   │   └── reports.js           # API route handlers
│   ├── node_modules/            # Dependencies (gitignored)
│   ├── server.js                # Express server entry point
│   ├── .env                      # Environment variables (gitignored)
│   ├── .env.example             # Environment template
│   ├── package.json             # Backend dependencies
│   └── package-lock.json        # Dependency lock file
│
├── frontend/                     # Frontend (Next.js/React)
│   ├── app/
│   │   ├── page.tsx             # Main page with Report form & tabs
│   │   ├── layout.tsx           # Root layout component
│   │   ├── globals.css          # Global styles
│   │   └── components/
│   │       ├── Dashboard.tsx    # Statistics dashboard
│   │       └── PollutionHeatmap.tsx  # Report heat map viewer
│   ├── public/                  # Static assets (images, icons)
│   ├── node_modules/            # Dependencies (gitignored)
│   ├── package.json             # Frontend dependencies
│   ├── package-lock.json        # Dependency lock file
│   ├── tsconfig.json            # TypeScript configuration
│   ├── next.config.ts           # Next.js configuration
│   └── tailwind.config.js       # Tailwind CSS configuration
│
├── .github/                      # GitHub configuration (see above)
├── .gitignore                   # Git ignore rules
├── README.md                    # Main project documentation
├── CONTRIBUTING.md              # Contributing guidelines
├── CODE_OF_CONDUCT.md          # Community guidelines
├── SECURITY.md                  # Security policy
├── LICENSE                      # MIT License
├── CHANGELOG.md                 # Version history
└── package.json                 # Root workspace configuration
```

## 📊 Component Architecture

### Backend (dharaya/)

```
server.js
  └── Express App
      ├── Middleware
      │   ├── CORS
      │   ├── Body Parser
      │   └── Error Handler
      ├── Routes (/api)
      │   └── reports.js
      │       ├── POST /report
      │       ├── GET /reports
      │       ├── GET /reports/:id
      │       ├── PUT /reports/:id
      │       ├── GET /eco-routes
      │       ├── GET /stats
      │       └── GET /health
      └── Database
          └── MongoDB (Mongoose)
              └── Report Model
```

### Frontend (frontend/)

```
App (page.tsx)
  ├── Header
  ├── Tab Navigation
  │   ├── Report Tab
  │   │   └── Form Component
  │   ├── Dashboard Tab
  │   │   └── Dashboard Component
  │   │       ├── Pie Chart (Severity)
  │   │       ├── Bar Chart (Categories)
  │   │       └── Stats Cards
  │   └── Heat Map Tab
  │       └── PollutionHeatmap Component
  │           └── Report List with Filters
  └── Footer
```

## 🗂️ Key Files

| File | Purpose |
|------|---------|
| `server.js` | Express server entry point |
| `models/Report.js` | Mongoose schema & validation |
| `routes/reports.js` | API endpoints |
| `app/page.tsx` | Main React component |
| `app/components/Dashboard.tsx` | Statistics visualization |
| `app/components/PollutionHeatmap.tsx` | Report listing |
| `.env` | Local environment config (gitignored) |
| `.env.example` | Environment template |
| `.gitignore` | Git ignore rules |
| `README.md` | Project documentation |
| `CONTRIBUTING.md` | Contribution guidelines |
| `LICENSE` | MIT License |

## 🔄 Data Flow

```
User Input (Form)
  ↓
Frontend (React)
  ↓
API Request (Axios)
  ↓
Backend (Express)
  ↓
MongoDB Database
  ↓
Response
  ↓
Frontend (Update State)
  ↓
Display (Dashboard/Heat Map)
```

## 📦 Dependencies

### Backend (dharaya/package.json)
- express - Web framework
- mongoose - MongoDB ODM
- cors - Cross-origin requests
- body-parser - Request parsing
- dotenv - Environment variables

### Frontend (frontend/package.json)
- next - React framework
- react - UI library
- typescript - Type safety
- tailwindcss - Styling
- chart.js - Data visualization
- react-chartjs-2 - Chart components
- axios - HTTP client

