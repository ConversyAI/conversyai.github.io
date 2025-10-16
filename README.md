# Conversy AI - Official Website

Landing page for Conversy AI - Agentic AI that turns conversations into conversions.

## 🌐 Live Site
[www.conversyai.com](https://www.conversyai.com) (or conversyai.github.io)

## 📁 Repository Structure

```
conversyai.github.io/
├── index.html                 # 🟢 CURRENT LIVE SITE (original static page)
├── assets/                    # Assets for live site
├── CNAME                      # Domain configuration
│
├── conversy-app/              # 🆕 NEW REACT APP (not yet deployed)
│   ├── src/
│   ├── public/
│   ├── README.md             # Setup instructions
│   ├── FIREBASE_SETUP.md     # Firebase configuration guide
│   └── DEPLOYMENT.md         # Deployment instructions
│
└── original-static-site/      # 📦 BACKUP of original files
    ├── index.html
    ├── assets/
    └── BACKUP_INFO.md
```

## 🚀 Current Status

### Live Site (Active)
- **Location**: `index.html` in root directory
- **Type**: Static HTML/CSS/JS
- **Status**: ✅ Currently active and live
- **URL**: https://www.conversyai.com

### New React App (Development)
- **Location**: `conversy-app/` folder
- **Type**: React + Vite + Tailwind CSS + Firebase
- **Status**: 🔨 Built and ready to deploy
- **Features**:
  - Full responsive design
  - Animated counters with Firebase
  - Auto-rotating carousels
  - Waitlist form with database
  - Visitor tracking
  - Team, Services, About sections

## 🔄 To Deploy New React App

1. **Configure Firebase**
   ```bash
   cd conversy-app
   # Follow instructions in FIREBASE_SETUP.md
   ```

2. **Test Locally**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   ```bash
   # Copy build files to root
   cp -r dist/* ../

   # Commit and push
   git add .
   git commit -m "Deploy new React website"
   git push origin main
   ```

   **⚠️ Warning**: This will replace your current live site!

For detailed instructions, see [conversy-app/DEPLOYMENT.md](conversy-app/DEPLOYMENT.md)

## 📦 Backup

Original static site files are backed up in `original-static-site/` folder.

To restore original site if needed:
```bash
cp original-static-site/index.html .
git add .
git commit -m "Restore original site"
git push origin main
```

## 🛠️ Tech Stack

### Current Site (Live)
- HTML
- CSS
- Vanilla JavaScript

### New App (Ready to Deploy)
- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- Firebase (Firestore + Analytics)
- React CountUp
- React Intersection Observer

## 📚 Documentation

- [New App Setup Guide](conversy-app/README.md)
- [Firebase Setup Guide](conversy-app/FIREBASE_SETUP.md)
- [Deployment Guide](conversy-app/DEPLOYMENT.md)
- [Original Site Backup Info](original-static-site/BACKUP_INFO.md)

## 🔗 Links

- Website: [www.conversyai.com](https://www.conversyai.com)
- LinkedIn: [linkedin.com/company/conversyai](https://www.linkedin.com/company/conversyai)
- Instagram: [@conversyai](https://instagram.com/conversyai)

## 📄 License

© 2025 Conversy AI. All rights reserved.

---

**Note**: The repository currently contains both the live static site (root files) and the new React app (conversy-app folder). The Next.js folder has been removed as it's not needed.
