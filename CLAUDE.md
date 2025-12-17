# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Conversy AI website repository with a React-based landing page featuring Firebase integration for visitor analytics, waitlist management, and real-time stats. The site includes animated backgrounds, carousels, and an admin panel.

**Current Branch**: `HomeSweetHome` (development)
**Main Branch**: `main` (production, currently hosts old static site)
**Tech Stack**: React 19, Vite 7, Tailwind CSS 4, Firebase, Framer Motion

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Deploy to GitHub Pages (from dist folder)
npm run deploy
```

## Build and Deployment

### Local Development
```bash
npm run dev  # Starts Vite dev server with HMR
```

### Production Build
```bash
npm run build  # Outputs to dist/ directory
npm run preview  # Preview built site before deployment
```

### Deploy to Production
When ready to replace the live site on `main` branch:
```bash
npm run build
git checkout main
cp -r dist/* .
git add .
git commit -m "Deploy new React website"
git push origin main
```

**Note**: The `main` branch serves the live site at www.conversyai.com via GitHub Pages. Always build and test thoroughly before deploying.

## Architecture

### Branch Strategy
- `main`: Live production site (currently old static HTML)
- `HomeSweetHome` / `new_version_static_page`: React app development
- Work on development branches, merge to `main` when ready to go live

### Application Structure

**Single Page Application (SPA)** with two routes:
- `/` - Main landing page with scrollable sections
- `/admin` - Admin dashboard for managing stats and content
- `/privacy` - Privacy policy page

**Main Page Flow** (App.jsx):
```
Navbar (fixed) → Hero → FeatureCards → Services → Stats →
About → Testimonials → Team → Waitlist → Footer
```

### Key Directories

```
src/
├── App.jsx                    # Main router & page layout
├── main.jsx                   # React entry point
├── firebase.js                # Firebase config & utility functions
├── index.css                  # Global styles & Tailwind imports
├── components/                # All React components
│   ├── Navbar.jsx            # Fixed navigation with smooth scroll
│   ├── AnimatedBackground.jsx # Particle/space background
│   ├── WelcomeOverlay.jsx    # Initial overlay with TTS
│   ├── Hero.jsx              # Landing section with typewriter
│   ├── FeatureCards.jsx      # Feature showcase cards
│   ├── Services.jsx          # Service offerings
│   ├── Stats.jsx             # Animated counters (Firebase)
│   ├── About.jsx             # Mission, vision, values
│   ├── Testimonials.jsx      # Auto-rotating carousel
│   ├── Team.jsx              # Team members & advisors
│   ├── Waitlist.jsx          # Form with Firebase integration
│   ├── Footer.jsx            # Links and social media
│   └── SplineViewer.jsx      # 3D graphics viewer
├── pages/
│   ├── Admin/                # Admin dashboard
│   └── Policy/               # Privacy policy
├── config/
│   ├── siteConfig.json       # Central config for content
│   └── README.md             # Config documentation
├── utils/
│   ├── analytics.js          # Visitor tracking with Fingerprint.js
│   ├── imageUtils.js         # Image loading utilities
│   └── scrollAnimations.js  # Intersection observer animations
└── assets/                   # Images, logos, team photos
```

### Firebase Integration

**Firestore Collections**:
- `waitlist` - Email submissions from the waitlist form
- `stats/main` - Real-time counters (linkedinFollowers, uniqueVisitors, waitlistCount)
- `visitors` - Unique visitor tracking via browser fingerprinting
- `interviews` - Admin-managed interview data

**Key Firebase Functions** (firebase.js):
- `getStats()` - Fetch current stats from Firestore
- `updateStats()` - Update specific stat fields
- `addToWaitlist()` - Add email to waitlist collection
- `trackVisitor()` - Log unique visitors using FingerprintJS
- Auth functions for admin panel access

**Security**: Firestore rules allow public read for stats, public write for waitlist/visitors, auth-required for admin operations.

### Configuration System

**src/config/siteConfig.json** - Central configuration for:
- Company info (name, tagline, email)
- Social media links
- Google Form URLs
- Team members and advisors
- Service descriptions
- Testimonials
- Feature cards

Update this file instead of hardcoding content in components. Most components read from this config.

### Styling Architecture

**Tailwind CSS 4** with custom theme:
- Brand colors defined in tailwind.config.js:
  - `brand-bg`: #0b0f19 (main background)
  - `brand-panel`: #0d1220 (card backgrounds)
  - `brand-text`: #eaf2ff (primary text)
  - `brand-muted`: #9aa4b2 (secondary text)
  - `brand-primary`: #6ee7ff (accent cyan)
  - `brand-secondary`: #8b5cf6 (accent purple)

**Custom animations**: float, spin-slow, pulse-slow

**Responsive design**: Mobile-first approach, components adapt to different screen sizes.

## Important Implementation Details

### Path Aliases
Vite configured with `@` alias pointing to `src/`:
```javascript
import Component from '@/components/Component';
```

### Animation Libraries
- **Framer Motion**: Used for page transitions and component animations
- **react-countup**: Animated number counters in Stats section
- **react-intersection-observer**: Trigger animations on scroll

### Visitor Tracking
- Uses `@fingerprintjs/fingerprintjs` to generate unique visitor IDs
- Non-blocking: runs in background 1s after page load
- Stored in Firestore `visitors` collection with timestamp

### Waitlist Flow
1. User submits name/email in Waitlist component
2. Data saved to Firebase `waitlist` collection
3. `stats/main` waitlistCount incremented
4. Google Form opens in new tab for additional info
5. Toast notification confirms success

### Admin Panel
Protected route at `/admin` with Firebase Auth:
- Login with email/password
- Manage stats (followers, visitors, waitlist count)
- View submissions
- Update testimonials

## Testing and Quality

### Before Deployment Checklist
- [ ] Test all sections load properly
- [ ] Verify Firebase connections work
- [ ] Check waitlist form submission flow
- [ ] Test on mobile devices
- [ ] Verify all images load
- [ ] Check social media links
- [ ] Test navigation smooth scroll
- [ ] Preview production build with `npm run preview`

### Common Issues

**Firebase Permission Errors**: Check firestore.rules file. Public collections (stats, waitlist, visitors) need `allow read: if true` or `allow create: if true`.

**Image Loading Issues**: Images in public/assets/ are referenced as `/assets/filename.jpg` (note leading slash).

**Build Errors**: Check Node version (requires Node 20) and clear node_modules if needed.

## Development Workflow

### Making Content Changes
1. Edit `src/config/siteConfig.json` for text, links, team members
2. Component-specific changes: Edit JSX files in `src/components/`
3. Styling: Update Tailwind classes or `index.css`
4. Test with `npm run dev`
5. Commit to development branch

### Adding New Sections
1. Create new component in `src/components/`
2. Import and add to App.jsx in desired order
3. Add navigation link to Navbar.jsx if needed
4. Update content in siteConfig.json if applicable

### Modifying Firebase Data
- Stats: Use Admin panel or directly update `stats/main` document
- Waitlist: View submissions in Firebase Console
- Security rules: Edit firestore.rules and publish via Firebase Console

## Key Files to Know

- `App.jsx` - Main routing and layout structure
- `firebase.js` - All Firebase operations and API keys
- `siteConfig.json` - Content management (edit here first!)
- `tailwind.config.js` - Custom theme and brand colors
- `vite.config.js` - Build config, path aliases, CSP headers
- `WORKFLOW.md` - Git branch workflow guide
- `FIREBASE_SETUP.md` - Firebase configuration instructions
- `WEBSITE_STRUCTURE.md` - Detailed section breakdown

## Node Version

This project requires **Node 20** (specified in package.json engines field).
