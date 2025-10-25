# Site Configuration Guide

## Overview
The `siteConfig.json` file is the centralized configuration for the entire website. Update this single file to change content across all components.

## Structure

### Company Information
```json
"company": {
  "name": "Conversy AI",
  "tagline": "Your tagline here",
  "description": "Company description",
  "website": "https://www.conversyai.com",
  "email": "contact@conversyai.com"
}
```

### Social Media Links
```json
"social": {
  "linkedin": "https://www.linkedin.com/company/conversyai",
  "instagram": "https://www.instagram.com/conversy_ai/",
  "twitter": null,  // Set to null if no account
  "github": "https://github.com/ConversyAI"
}
```

### Statistics
Update these numbers to reflect current metrics:
```json
"stats": {
  "linkedinFollowers": 43,
  "linkedinViews": 250,
  "instagramFollowers": 28,
  "uniqueVisitors": 17,
  "waitlistCount": 5
}
```

**How Statistics Work:**
1. **Firebase First**: The app tries to fetch stats from Firebase database
2. **Fallback to Config**: If Firebase fails or data doesn't exist, it uses values from `siteConfig.json`
3. **Update Anywhere**: You can update stats either:
   - In Firebase (real-time updates)
   - In `siteConfig.json` (requires deployment)

### Team Members
Each team member can have multiple social links. Set to `null` if not available:
```json
{
  "name": "John Doe",
  "role": "CEO",
  "image": "/assets/john.jpeg",
  "bio": "Brief biography",
  "linkedin": "https://linkedin.com/in/johndoe",
  "twitter": null,  // Will not show Twitter icon
  "github": "https://github.com/johndoe",
  "instagram": null
}
```

### Advisors
```json
{
  "name": "Jane Smith",
  "role": "Legal Advisor",
  "company": "CEO at Company",
  "image": "/assets/jane.jpeg"
}
```

## How to Update

1. Open `src/config/siteConfig.json`
2. Edit the values you want to change
3. Save the file
4. The changes will reflect immediately in development
5. Deploy to see changes in production

## Important Notes

- Social media icons only appear if the link is provided (not `null`)
- Images should be placed in the `public/assets/` folder
- All URLs should be complete (include https://)
- Statistics can be updated manually or through Firebase integration

## Components Using This Config

- **Team.jsx** - Team members and advisors
- **Stats.jsx** - Statistics and social links
- **Services.jsx** - All features/services with descriptions
- **Hero.jsx** - Company tagline and description
- **Footer.jsx** - Social media links
- **Features.jsx** - Feature highlights
- **Testimonials.jsx** - Customer testimonials and early adopter feedback

## Features/Services Configuration

The features section contains both simple highlights and detailed service descriptions:

```json
"features": {
  "detailedFeatures": [
    {
      "id": "unique-id",
      "title": "Feature Title",
      "description": "Feature description",
      "icon": "chat",  // Options: chat, calendar, payment, bell, chart, spreadsheet
      "features": [
        "Feature point 1",
        "Feature point 2"
      ]
    }
  ]
}
```

## Testimonials Configuration

The testimonials section includes both section headers and testimonial items:

```json
"testimonials": {
  "sectionTitle": "What Early Adopters Are Saying",
  "sectionSubtitle": "Real voices from businesses joining us...",
  "items": [
    {
      "id": "unique-id",
      "name": "Customer Name",
      "role": "Job Title",
      "Company": "Company Name",
      "content": "Testimonial text here",
      "rating": 5,
      "website": "https://example.com" // Optional
    }
  ]
}
```

**How Testimonials Work:**
1. **Firebase First**: Component tries to fetch testimonials from Firebase `interviews` collection
2. **Config Fallback**: If Firebase is empty/fails, uses testimonials from `siteConfig.json`
3. **Default Message**: If both are empty, shows a single message about joining early adopters
4. **Section Headers**: Title and subtitle are always read from config (customizable)

## Adding New Fields

To add new configuration options:
1. Add the field to `siteConfig.json`
2. Import and use in your component: `import siteConfig from '../config/siteConfig.json'`
3. Access: `siteConfig.yourNewField`