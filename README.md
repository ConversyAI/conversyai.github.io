# Conversy AI - Official Website

Landing page for Conversy AI - Agentic AI that turns conversations into conversions.

## 🌐 Live Site
[www.conversyai.com](https://www.conversyai.com) (or conversyai.github.io)

## 🌿 Branch Structure

This repository uses git branches to manage different versions:

### `main` Branch - **LIVE PRODUCTION SITE** 🟢
```
conversyai.github.io/
├── index.html       ← Currently live at www.conversyai.com
├── assets/          ← Live site assets
├── CNAME           ← Domain configuration
└── README.md
```
- **Status**: ✅ Active and live
- **Type**: Static HTML/CSS/JS
- **URL**: https://www.conversyai.com

### `new_version_static_page` Branch - **DEVELOPMENT** 🔨
```
conversyai.github.io/
├── conversy-app/              ← New React application
│   ├── src/components/
│   ├── public/assets/
│   ├── README.md
│   ├── FIREBASE_SETUP.md
│   └── DEPLOYMENT.md
├── WORKFLOW.md               ← Git workflow guide
└── README.md
```
- **Status**: 🔨 Development/testing
- **Type**: React + Vite + Tailwind CSS + Firebase
- **Features**:
  - Full responsive design
  - Animated counters with Firebase
  - Auto-rotating carousels
  - Waitlist form with database
  - Visitor tracking
  - Team, Services, About sections

---

## 🚀 Quick Start for Development

### Switch to Development Branch
```bash
git checkout new_version_static_page
```

### Work on New React App
```bash
cd conversy-app
npm install
npm run dev
```

### Make Changes and Commit
```bash
git add .
git commit -m "Your changes"
git push origin new_version_static_page
```

---

## 📖 Why This Structure?

### ❓ Why are files in root on `main` branch?
**GitHub Pages requires `index.html` in the root directory** to serve your site. It can't serve from subdirectories for user/org pages.

### ❓ Why use branches instead of folders?
**Branches are the proper git way to manage versions:**
- ✅ No duplicate files
- ✅ Full version history
- ✅ Easy to switch back and forth
- ✅ Can compare changes with `git diff`
- ✅ Live site is always safe on `main`
- ✅ Can restore instantly: `git checkout main`

**Folders would mean:**
- ❌ Cluttered repository
- ❌ Duplicate files
- ❌ Not properly version controlled
- ❌ Confusing structure

---

## 🔄 Deployment Process

When you're ready to make the new React app live:

### 1. Build the App
```bash
git checkout new_version_static_page
cd conversy-app
npm run build
```

### 2. Deploy to Main Branch
```bash
git checkout main
cp -r conversy-app/dist/* .
git add .
git commit -m "Deploy new React website"
git push origin main
```

**⚠️ This replaces your live site!**

For detailed instructions, see:
- [conversy-app/DEPLOYMENT.md](conversy-app/DEPLOYMENT.md)
- [WORKFLOW.md](WORKFLOW.md)

---

## 🛡️ Safety & Backup

### Your Original Site is Safe
- Preserved in `main` branch git history
- Can view all previous versions with `git log`
- Can restore any version with `git checkout`

### To Restore Original Site
```bash
# View history
git log

# Restore to specific commit
git checkout <commit-hash> -- index.html assets/

# Or revert recent changes
git revert HEAD
```

---

## 🛠️ Tech Stack

### Current Live Site (`main` branch)
- Static HTML/CSS/JavaScript
- Animated background with particles
- Coming soon landing page

### New React App (`new_version_static_page` branch)
- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore + Analytics)
- **Features**: CountUp animations, Intersection Observer
- **Build**: Optimized for production with code splitting

---

## 📚 Documentation

- **[WORKFLOW.md](WORKFLOW.md)** - Git branch workflow guide
- **[conversy-app/README.md](conversy-app/README.md)** - React app setup
- **[conversy-app/FIREBASE_SETUP.md](conversy-app/FIREBASE_SETUP.md)** - Firebase configuration
- **[conversy-app/DEPLOYMENT.md](conversy-app/DEPLOYMENT.md)** - Deployment guide

---

## 📋 Development Checklist

Before deploying the new site:

- [ ] Configure Firebase (see FIREBASE_SETUP.md)
- [ ] Update Firebase credentials in `src/firebase.js`
- [ ] Test locally with `npm run dev`
- [ ] Build successfully with `npm run build`
- [ ] Test production build with `npm run preview`
- [ ] Update content (team, services, testimonials)
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Deploy to `main` branch

---

## 🔗 Links

- **Website**: [www.conversyai.com](https://www.conversyai.com)
- **LinkedIn**: [linkedin.com/company/conversyai](https://www.linkedin.com/company/conversyai)
- **Instagram**: [@conversyai](https://instagram.com/conversyai)
- **GitHub Repo**: [github.com/ConversyAI/conversyai.github.io](https://github.com/ConversyAI/conversyai.github.io)

---

## 📄 License

© 2025 Conversy AI. All rights reserved.

---

## 💡 Quick Tips

- Work on `new_version_static_page` for development
- `main` branch = live site (don't edit directly)
- Use `git checkout <branch>` to switch between versions
- See [WORKFLOW.md](WORKFLOW.md) for complete git workflow

**Your live site on `main` branch is safe and will not be affected until you explicitly deploy!** 🛡️
