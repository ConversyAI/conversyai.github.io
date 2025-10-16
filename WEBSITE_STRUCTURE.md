# Website Structure Overview

Your website has **2 MAIN ROUTES/PAGES**:

---

## PAGE 1: Main Website (Route: `/`)

**File**: `App.jsx`

This is a **Single Page Application (SPA)** with scrollable sections:

### Navigation Bar (Always visible at top)
- **File**: `Navbar.jsx`
- **Links to**: Home, About Us, Services, Team, Testimonials, Join Waitlist

---

### Section 1: Hero (`#home`)
- **File**: `Hero.jsx`
- **Content**:
  - Badge: "We back your agentic future"
  - Centered animated logo
  - Main heading: "Conversy AI"
  - Typewriter subheading: "turns conversations into conversions..."
  - Description text
  - CTA buttons: "Join waitlist" & "Learn More"
  - Integration icons (Stripe, Razorpay, Telegram, WhatsApp, Google Calendar)

---

### Section 2: Stats (`#stats`)
- **File**: `Stats.jsx`
- **Content**:
  - Heading: "Growing Together"
  - 3 animated counters:
    - LinkedIn Followers
    - Unique Visitors
    - Waitlist Members
  - LinkedIn follow button

---

### Section 3: About (`#about`)
- **File**: `About.jsx`
- **Content**:
  - Heading: "About Conversy AI"
  - Mission & Vision cards (2 columns)
  - Core Values (4 cards): Move Fast, User-Centric, Innovation, Trust
  - Timeline/Journey (4 milestones): Company Founded → First Beta → 100+ Adopters → Public Launch

---

### Section 4: Services (`#services`)
- **File**: `Services.jsx`
- **Content**:
  - Heading: "Our Services"
  - 6 service cards:
    1. AI Chatbot
    2. Smart Booking System
    3. Payment Processing
    4. Automated Reminders
    5. Analytics Dashboard
    6. Spreadsheet Integration
  - CTA: "Get Started Today"

---

### Section 5: Testimonials (`#testimonials`)
- **File**: `Testimonials.jsx`
- **Content**:
  - Heading: "What Our Users Say"
  - Carousel with customer testimonials (4+ testimonials)
  - Auto-rotating every 5 seconds
  - Navigation dots

---

### Section 6: Team (`#team`)
- **File**: `Team.jsx`
- **Content**:
  - Heading: "Meet Our Team"
  - 4 team member cards: CEO, CTO, Head of Product, Head of Design
  - Advisory Panel section
  - 4 advisors in scrolling carousel

---

### Section 7: Waitlist (`#waitlist`)
- **File**: `Waitlist.jsx`
- **Content**:
  - Heading: "Join the Waitlist"
  - Form with name & email fields
  - Early access benefits list (4 items)
  - Submit button
  - Counter: "Join 387+ businesses already on the waitlist"

---

### Footer (Bottom of page)
- **File**: `Footer.jsx`
- **Content**:
  - Logo & tagline
  - Social media links (LinkedIn, Instagram, Twitter)
  - Quick Links menu
  - Contact info
  - Privacy Policy & Terms links

---

## PAGE 2: Admin Panel (Route: `/admin`)

- **File**: `Admin/index.jsx`
- **Content**: Dashboard for managing stats, waitlist, and testimonials

---

## Visual Flow

```
┌─────────────────────────────────────┐
│         NAVBAR (Fixed Top)          │
└─────────────────────────────────────┘
         ↓ (scroll down)
┌─────────────────────────────────────┐
│  1. HERO - Logo + Typewriter        │
│     (Hero.jsx)                      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  2. STATS - Counters                │
│     (Stats.jsx)                     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  3. ABOUT - Mission & Values        │
│     (About.jsx)                     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  4. SERVICES - 6 Service Cards      │
│     (Services.jsx)                  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  5. TESTIMONIALS - Reviews          │
│     (Testimonials.jsx)              │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  6. TEAM - Team & Advisors          │
│     (Team.jsx)                      │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  7. WAITLIST - Signup Form          │
│     (Waitlist.jsx)                  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         FOOTER                      │
│     (Footer.jsx)                    │
└─────────────────────────────────────┘
```

---

## Summary

- **1 Main Page** with **7 sections** that scroll vertically
- **1 Admin Page** (separate route)
- **Total**: 9 component files make up the main page + 1 admin page

---

## Component File Locations

```
conversy-app/
├── src/
│   ├── App.jsx                          # Main app with routes
│   ├── components/
│   │   ├── Navbar.jsx                   # Navigation bar
│   │   ├── AnimatedBackground.jsx       # Space background
│   │   ├── Hero.jsx                     # Section 1: Hero
│   │   ├── Stats.jsx                    # Section 2: Stats
│   │   ├── About.jsx                    # Section 3: About
│   │   ├── Services.jsx                 # Section 4: Services
│   │   ├── Testimonials.jsx             # Section 5: Testimonials
│   │   ├── Team.jsx                     # Section 6: Team
│   │   ├── Waitlist.jsx                 # Section 7: Waitlist
│   │   └── Footer.jsx                   # Footer
│   └── pages/
│       └── Admin/
│           └── index.jsx                # Admin dashboard
```
