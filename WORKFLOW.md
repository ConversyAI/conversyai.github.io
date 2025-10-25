# Git Workflow Guide for Conversy AI Website

This guide explains how to work with branches for your website development.

## 🌿 Branch Structure

```
main                          ← 🟢 LIVE SITE (production)
  └── index.html              ← Your current static page (active)
  └── assets/

new_version_static_page       ← 🔨 DEVELOPMENT (new React app)
  └── conversy-app/           ← New React website
```

---

## 📋 Current Setup

### `main` Branch
- **Purpose**: Production/Live site
- **URL**: https://www.conversyai.com
- **Contains**: Original static HTML page
- **Status**: ✅ Currently live and active

### `new_version_static_page` Branch
- **Purpose**: Development of new React app
- **Contains**: New React + Vite + Tailwind + Firebase app
- **Status**: 🔨 Development, not live yet
- **Location**: `conversy-app/` folder

---

## 🚀 How to Work on the New Version

### Currently Active Branch
You're already on `new_version_static_page` ✅

### To Work on New Version:

```bash
# Make sure you're on the right branch
git checkout new_version_static_page

# Work in the conversy-app folder
cd conversy-app

# Make your changes, then commit
git add .
git commit -m "Your commit message"
git push origin new_version_static_page
```

---

## 🔄 Typical Workflow

### 1. Develop on `new_version_static_page` Branch

```bash
# Switch to development branch
git checkout new_version_static_page

# Pull latest changes
git pull origin new_version_static_page

# Work on your app
cd conversy-app
npm run dev

# Make changes, test, then commit
git add .
git commit -m "Add new feature"
git push origin new_version_static_page
```

### 2. When Ready to Deploy New Site

**Option A: Direct Deploy (Quick)**

```bash
# 1. Build the app
cd conversy-app
npm run build

# 2. Switch to main branch
git checkout main

# 3. Copy built files to root
cp -r ../new_version_static_page/conversy-app/dist/* .

# 4. Commit and push
git add .
git commit -m "Deploy new React website"
git push origin main
```

**Option B: Merge via Pull Request (Recommended)**

1. Push your changes to `new_version_static_page`
2. Go to GitHub: https://github.com/ConversyAI/conversyai.github.io
3. Create a Pull Request from `new_version_static_page` → `main`
4. Review changes
5. Merge when ready
6. Build and deploy

---

## 📦 Why Branches > Backup Folders?

### ❌ Backup Folder Approach:
```
conversyai.github.io/
├── index.html
├── original-static-site/     ← Extra folder
│   └── index.html            ← Duplicate
```
**Problems:**
- Takes up extra space
- Can get out of sync
- Clutters repository
- Not version controlled separately

### ✅ Branch Approach:
```
main branch                    ← Original site
new_version_static_page branch ← New site
```
**Benefits:**
- ✅ Full version history
- ✅ Easy to switch back and forth
- ✅ No duplicate files
- ✅ Can compare changes with git diff
- ✅ Standard git workflow
- ✅ Easy to restore: `git checkout main`

---

## 🔍 Useful Git Commands

### Check Which Branch You're On
```bash
git branch
```

### Switch Branches
```bash
# Switch to main (live site)
git checkout main

# Switch to development
git checkout new_version_static_page
```

### See Differences Between Branches
```bash
git diff main new_version_static_page
```

### View Branch History
```bash
# See commits on current branch
git log

# See commits on specific branch
git log new_version_static_page
```

### Compare Files Between Branches
```bash
# Compare index.html between branches
git diff main:index.html new_version_static_page:conversy-app/src/App.jsx
```

---

## 🛡️ Safety Tips

### Your Live Site is Safe Because:

1. **`main` branch = Live site**
   - GitHub Pages only serves from `main`
   - Changes on other branches don't affect it

2. **Easy to Restore**
   ```bash
   # If something goes wrong, just switch back
   git checkout main
   ```

3. **Can Test Before Deploy**
   ```bash
   # Test on new_version_static_page branch
   git checkout new_version_static_page
   cd conversy-app
   npm run build
   npm run preview
   ```

---

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Check current branch | `git branch` |
| Switch to development | `git checkout new_version_static_page` |
| Switch to production | `git checkout main` |
| Save changes | `git add . && git commit -m "message"` |
| Push changes | `git push origin <branch-name>` |
| Pull latest | `git pull origin <branch-name>` |
| See branch history | `git log` |

---

## 🎯 Your Workflow Summary

### Daily Development:
```bash
cd conversyai.github.io
git checkout new_version_static_page  # Make sure you're on dev branch
cd conversy-app
npm run dev                           # Develop your app
# ... make changes ...
git add .
git commit -m "Your changes"
git push origin new_version_static_page
```

### When Ready to Go Live:
```bash
# 1. Build
cd conversy-app
npm run build

# 2. Deploy to main branch
git checkout main
cp -r conversy-app/dist/* .
git add .
git commit -m "Deploy new website"
git push origin main
```

### If You Need to Revert:
```bash
# Your old site is always safe in main branch history
git checkout main
git log                               # Find the commit before deploy
git revert <commit-hash>              # Or reset to that commit
git push origin main
```

---

## ✅ Best Practices

1. **Always work on `new_version_static_page` for development**
2. **Only merge/deploy to `main` when ready to go live**
3. **Test thoroughly before deploying to `main`**
4. **Keep commits small and descriptive**
5. **Pull before you push** to avoid conflicts

---

## 🚫 What NOT to Do

- ❌ Don't edit files directly on `main` branch (unless quick fixes)
- ❌ Don't delete branches without backing up important work
- ❌ Don't force push to `main` branch
- ❌ Don't mix development work across branches

---

**Your live site on `main` branch will remain safe and unchanged until you explicitly deploy to it!** 🛡️
