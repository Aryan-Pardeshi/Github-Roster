# GitHub Roaster - Project Summary

## ✅ Successfully Pushed to GitHub!

**Repository:** [Aryan-Pardeshi/Github-Roster](https://github.com/Aryan-Pardeshi/Github-Roster)  
**Commit:** `39db151` - "Add GitHub Roaster website - AI-powered GitHub profile roasting tool"

---

## 🎯 Project Overview

**GitHub Roaster** is an AI-powered web application that analyzes GitHub profiles and generates humorous roasts based on coding patterns, repository quality, and profile metrics.

### Key Features
- 🔥 **Three Roast Levels**: Mild (😊), Medium (😏), Savage (💀)
- 📊 **Customizable Analysis**: Users select what aspects to analyze
- 🎨 **Modern UI**: Fire-themed gradient design with dark mode
- ⚡ **Full-Stack**: Next.js frontend + Flask backend

---

## 📁 Project Structure

```
my-nextjs-template/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main landing page with RoastForm
│   │   ├── about/page.tsx     # About page
│   │   ├── layout.tsx         # Root layout with Navbar/Footer
│   │   ├── globals.css        # Global styles
│   │   └── api/
│   │       ├── health/        # Health check endpoint
│   │       └── roast/         # Roast API endpoint (proxy to Flask)
│   │
│   ├── components/
│   │   ├── RoastForm.tsx      # Main roasting dashboard form
│   │   ├── Navbar.tsx         # Fixed navigation bar
│   │   └── Footer.tsx         # Simplified footer with roast levels
│   │
│   ├── services/
│   │   └── api.ts             # API service layer
│   │
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   │
│   └── lib/
│       └── config.ts          # Application configuration
│
├── flask_backend/
│   ├── app.py                 # Flask server with roast endpoint
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend documentation
│
├── ROAST_OPTIONS.md           # Documentation of analysis options
├── DESIGN_SYSTEM.md           # Design system documentation
└── README.md                  # Main project documentation
```

---

## 🔥 Roast Form Features

### Analysis Options (Checkboxes)
✅ **Top Language** (Default: ON)
- Analyzes most-used programming language

✅ **Repository Count** (Default: ON)
- Evaluates number of repositories

⬜ **Followers** (Default: OFF)
- Analyzes follower count and ratios

⬜ **Following** (Default: OFF)
- Checks following/follower balance

⬜ **Commit Frequency** (Default: OFF)
- Reviews commit patterns over time

⬜ **Repo Descriptions** (Default: OFF)
- Analyzes repository description quality

### Roast Levels
- **😊 Mild**: Constructive feedback with humor
- **😏 Medium**: Sarcastic but fair critique
- **💀 Savage**: Absolutely brutal, no mercy

---

## 🎨 Design System

### Color Palette
**Fire Theme:**
- Primary: Red `#dc2626` to Orange `#ea580c`
- Gradient: Red → Orange → Yellow
- Neutral: Slate scale (50-900)

**Component Colors:**
- Mild: Green gradient (`from-green-500 to-emerald-500`)
- Medium: Yellow-Orange gradient (`from-yellow-500 to-orange-500`)
- Savage: Red-Rose gradient (`from-red-500 to-rose-600`)

### Typography
- Font Family: System font stack (optimized)
- Headings: Bold, extra bold weights
- Body: Regular weight

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Dark Mode** - Built-in theme support

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - CORS support
- **Requests** - GitHub API integration
- *Your ML Model* - (To be integrated)

---

## 🚀 Getting Started

### Frontend Setup
```bash
cd my-nextjs-template
npm install
npm run dev
```
Website runs on: `http://localhost:3000`

### Backend Setup
```bash
cd flask_backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Backend runs on: `http://localhost:5000`

---

## 📡 API Endpoints

### Next.js API Routes
- `POST /api/roast` - Proxy to Flask backend
- `GET /api/health` - Health check

### Flask Backend
- `POST /api/roast` - Generate roast from GitHub data
- `GET /health` - Backend health check

### Request Format
```json
{
  "username": "octocat",
  "roast_level": "medium",
  "options": {
    "top_language": true,
    "repo_count": true,
    "followers": false,
    "following": false,
    "commit_frequency": false,
    "repo_descriptions": false
  }
}
```

### Response Format
```json
{
  "roast": "Your roast text here...",
  "username": "octocat",
  "level": "medium",
  "success": true,
  "timestamp": "2024-10-15T12:00:00"
}
```

---

## 📝 Recent Changes

### What Was Removed
- ❌ Prediction page (`/predict`)
- ❌ PredictionForm component
- ❌ ML prediction API routes
- ❌ Spicy roast level
- ❌ Nuclear roast level
- ❌ Footer quick links section
- ❌ Footer resources section

### What Was Added
- ✅ GitHub Roaster branding
- ✅ RoastForm with analysis options
- ✅ Three roast levels (Mild, Medium, Savage)
- ✅ Roast API endpoint
- ✅ Simplified, focused footer
- ✅ Fire-themed color scheme
- ✅ ROAST_OPTIONS.md documentation

### What Was Updated
- 🔄 Navbar: Removed "Predict" link, updated colors to red theme
- 🔄 Footer: Centered layout with roast level badges
- 🔄 API routes: `/api/predict` → `/api/roast`
- 🔄 Flask backend: Prediction endpoint → Roast endpoint
- 🔄 Color scheme: Indigo/Purple → Red/Orange/Yellow

---

## 🎯 Next Steps

### For ML Integration
1. **Train Your Model**: Create a model that generates roasts based on GitHub data
2. **Update Flask Backend**: Replace mock roasts with model predictions
3. **Add GitHub API Token**: For higher rate limits
4. **Implement Data Fetching**: Complete `fetch_github_profile()` function

### For Deployment
1. **Frontend**: Deploy to Vercel
2. **Backend**: Deploy Flask to Heroku, Railway, or similar
3. **Environment Variables**: Set up API URLs and tokens
4. **CORS**: Configure for production domains

### Optional Enhancements
- Add more analysis options (see ROAST_OPTIONS.md)
- Implement roast history/saved roasts
- Add social sharing features
- Create user accounts for tracking roasts
- Add rate limiting to prevent abuse

---

## 📦 Dependencies

### Frontend (package.json)
- next: ^15.5.5
- react: ^19.0.0
- tailwindcss: ^4.0.0
- typescript: ^5.0.0

### Backend (requirements.txt)
- flask==3.0.0
- flask-cors==4.0.0
- requests==2.31.0

---

## 🌟 GitHub Repository

Your code is now live at:
**https://github.com/Aryan-Pardeshi/Github-Roster**

All 33 files (7,993 insertions) have been committed and pushed successfully!

---

## 💡 Tips for Development

1. **Testing Locally**: Run both Next.js and Flask servers simultaneously
2. **Hot Reload**: Both support hot reload for quick development
3. **TypeScript**: Use types for better IDE support and fewer bugs
4. **Dark Mode**: Test both light and dark themes
5. **Responsive**: Test on mobile, tablet, and desktop

---

**Created**: October 15, 2025  
**Version**: 1.0.0  
**Status**: ✅ Ready for ML model integration
