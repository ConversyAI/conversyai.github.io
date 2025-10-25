# Deployment Guide - GitHub Pages

This guide explains how to deploy your Conversy AI website to GitHub Pages.

## Prerequisites

- Git installed on your computer
- GitHub account
- Completed Firebase setup (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

## Option 1: Manual Deployment (Recommended for First Deploy)

### Step 1: Build the Project

```bash
cd conversy-app
npm run build
```

This creates a `dist/` folder with your production-ready files.

### Step 2: Copy Files to Repository Root

```bash
# Copy built files to parent directory (repository root)
cp -r dist/* ../
```

Or on Windows:
```bash
xcopy dist\* ..\ /E /Y
```

### Step 3: Commit and Push

```bash
# Go to repository root
cd ..

# Add all files
git add .

# Commit changes
git commit -m "Deploy Conversy AI website"

# Push to GitHub
git push origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at `https://conversyai.github.io/`

## Option 2: Automated Deployment with GitHub Actions

### Step 1: Create Workflow File

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'conversy-app/**'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: conversy-app/package-lock.json

      - name: Install dependencies
        run: |
          cd conversy-app
          npm ci

      - name: Build project
        run: |
          cd conversy-app
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./conversy-app/dist
          publish_branch: gh-pages
```

### Step 2: Configure GitHub Pages

1. Go to **Settings** > **Pages**
2. Under "Source", select **gh-pages** branch
3. Click **Save**

### Step 3: Push Changes

```bash
git add .github/workflows/deploy.yml
git commit -m "Add automated deployment workflow"
git push origin main
```

The workflow will automatically build and deploy your site when you push changes to the `conversy-app/` directory.

## Option 3: Deploy to Custom Domain

### Step 1: Configure Domain

1. Update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/', // Keep as '/' for custom domain
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

2. Create `public/CNAME` file with your domain:

```
www.conversyai.com
```

### Step 2: Update DNS Settings

Add these DNS records at your domain registrar:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | conversyai.github.io |

### Step 3: Enable HTTPS

1. Go to **Settings** > **Pages**
2. Check **"Enforce HTTPS"**
3. Wait a few minutes for SSL certificate to provision

## Deployment Checklist

Before deploying, ensure:

- ✅ Firebase is configured with correct credentials
- ✅ All environment-specific URLs are updated
- ✅ Assets are in the `public/` folder
- ✅ Build completes without errors (`npm run build`)
- ✅ Test production build locally (`npm run preview`)
- ✅ CNAME file is in `public/` folder (if using custom domain)
- ✅ Social media links are updated
- ✅ Analytics is configured

## Updating the Site

### For Manual Deployment

```bash
# Make your changes
# ...

# Build and deploy
cd conversy-app
npm run build
cp -r dist/* ../
cd ..
git add .
git commit -m "Update website"
git push origin main
```

### For Automated Deployment

Just push your changes:

```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Actions will automatically build and deploy.

## Testing Production Build Locally

Before deploying, test the production build:

```bash
cd conversy-app
npm run build
npm run preview
```

Open http://localhost:4173 to preview.

## Troubleshooting

### Site Shows 404

- Check that GitHub Pages is enabled
- Verify source branch is correct (main or gh-pages)
- Wait a few minutes - deployment can take time

### Assets Not Loading

- Check `base` path in `vite.config.js`
- Ensure assets are in `public/` folder
- Check browser console for errors

### Firebase Not Working

- Verify Firebase config in `firebase.js`
- Check browser console for errors
- Ensure Firestore rules are correct

### Build Fails

- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Check for syntax errors in components
- Verify all dependencies are installed

## Rollback

If something goes wrong:

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

Or restore from a specific commit:

```bash
git reset --hard <commit-hash>
git push origin main --force
```

## Performance Optimization

After deployment:

1. **Test Performance**
   - Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - Use [GTmetrix](https://gtmetrix.com/)

2. **Enable Caching**
   - GitHub Pages automatically sets cache headers
   - Consider using a CDN for assets

3. **Monitor Analytics**
   - Check Firebase Analytics dashboard
   - Monitor Firestore usage

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive API keys
   - Use GitHub Secrets for sensitive data

2. **Firestore Rules**
   - Regularly review security rules
   - Monitor for unusual activity

3. **Domain Security**
   - Always use HTTPS
   - Consider adding CAA DNS records

## Support

- [Vite Documentation](https://vitejs.dev/guide/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Firebase Documentation](https://firebase.google.com/docs)

---

Happy deploying! 🚀
