# Conversy AI - Website

Modern, responsive website for Conversy AI built with React, Vite, Tailwind CSS, and Firebase.

## Features

- 🎨 **Beautiful UI** with animated backgrounds and smooth transitions
- 📱 **Fully Responsive** design for all devices
- 🔥 **Firebase Integration** for data storage and analytics
- 📊 **Animated Counter** showing LinkedIn followers with scroll-triggered animation
- 🎠 **Automated Carousels** for testimonials, team, and advisory panel
- 📝 **Waitlist Form** with Firebase backend
- 📈 **Visitor Tracking** and analytics
- ⚡ **Fast & Optimized** with Vite build system

## Project Structure

```
conversy-app/
├── public/
│   └── assets/          # Images and icons
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── AnimatedBackground.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Team.jsx
│   │   ├── Waitlist.jsx
│   │   └── Footer.jsx
│   ├── firebase.js      # Firebase configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        # Global styles
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd conversy-app
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 3. Firestore Database Structure

Create the following collections in Firestore:

```
stats/ (document: main)
  - linkedinFollowers: number
  - pageViews: number
  - waitlistCount: number
  - lastUpdated: timestamp

waitlist/
  - email: string
  - name: string
  - timestamp: timestamp
  - status: string

interviews/
  - name: string
  - role: string
  - content: string
  - image: string
  - rating: number
  - createdAt: timestamp
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

### Build the project

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Preview Production Build Locally

```bash
npm run preview
```

## Deployment to GitHub Pages

### Method 1: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy contents of `dist/` folder to the root of your GitHub Pages repository

3. Commit and push:
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```

### Method 2: Automated Deployment with GitHub Actions

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd conversy-app
          npm install

      - name: Build
        run: |
          cd conversy-app
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./conversy-app/dist
```

## Customization

### Update Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'brand': {
    bg: '#0b0f19',      // Background
    panel: '#0d1220',   // Panel background
    text: '#eaf2ff',    // Text color
    muted: '#9aa4b2',   // Muted text
    primary: '#6ee7ff', // Cyan (primary brand color)
    secondary: '#8b5cf6', // Purple (secondary brand color)
  }
}
```

### Update Content

- **Team Members**: Edit `src/components/Team.jsx`
- **Services**: Edit `src/components/Services.jsx`
- **Testimonials**: Edit `src/components/Testimonials.jsx` or add to Firebase
- **Advisory Panel**: Edit `src/components/Team.jsx`

### Update Stats

You can update stats directly in Firebase or use the helper function:

```javascript
import { updateLinkedInCount } from './firebase';

// Update LinkedIn followers count
await updateLinkedInCount(1500);
```

## Firebase Functions

### Available Functions

- `addToWaitlist(email, name)` - Add user to waitlist
- `getInterviews(limit)` - Get user testimonials
- `getStats()` - Get analytics stats
- `trackPageVisit()` - Track page visitor
- `updateLinkedInCount(count)` - Update LinkedIn followers

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Firebase** - Backend and database
- **React Countup** - Animated counters
- **React Intersection Observer** - Scroll animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2025 Conversy AI. All rights reserved.
