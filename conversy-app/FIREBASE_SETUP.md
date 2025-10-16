# Firebase Setup Guide for Conversy AI

This guide will walk you through setting up Firebase for your Conversy AI website.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `conversy-ai` (or your preferred name)
4. Enable/Disable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Register Web App

1. In your Firebase project dashboard, click the **Web icon** `</>`
2. Register your app with a nickname (e.g., "Conversy AI Website")
3. **Don't** check "Firebase Hosting" (we're using GitHub Pages)
4. Click **"Register app"**
5. Copy the Firebase configuration object - you'll need this later

## Step 3: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll configure rules next)
4. Select your preferred location (choose closest to your users)
5. Click **"Enable"**

## Step 4: Configure Firestore Security Rules

1. Go to **"Firestore Database"** > **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow read access to stats for everyone
    match /stats/{document=**} {
      allow read: if true;
      allow write: if false; // Only update via admin SDK or console
    }

    // Allow anyone to add to waitlist, but not read others' entries
    match /waitlist/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }

    // Allow read access to interviews/testimonials for everyone
    match /interviews/{document=**} {
      allow read: if true;
      allow write: if false; // Only update via admin SDK or console
    }

    // Track visitors
    match /visitors/{document=**} {
      allow read: if false;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

3. Click **"Publish"**

## Step 5: Create Firestore Collections

### Create Stats Collection

1. Go to **"Firestore Database"** > **"Data"** tab
2. Click **"Start collection"**
3. Collection ID: `stats`
4. Click **"Next"**
5. Document ID: `main`
6. Add these fields:

| Field | Type | Value |
|-------|------|-------|
| linkedinFollowers | number | 0 |
| pageViews | number | 0 |
| waitlistCount | number | 0 |
| lastUpdated | timestamp | (auto) |

7. Click **"Save"**

### Create Interviews Collection (Optional)

1. Click **"Start collection"**
2. Collection ID: `interviews`
3. Add sample document:

| Field | Type | Value |
|-------|------|-------|
| name | string | "Sarah Johnson" |
| role | string | "CEO, TechStart Inc" |
| content | string | "Conversy AI transformed our business..." |
| image | string | "https://i.pravatar.cc/150?img=1" |
| rating | number | 5 |
| createdAt | timestamp | (auto) |

4. Click **"Save"**
5. Add more testimonials as needed

## Step 6: Configure Your App

1. Open `src/firebase.js` in your project
2. Replace the placeholder config with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};
```

3. Save the file

## Step 7: Enable Firebase Analytics (Optional)

1. In Firebase Console, go to **"Analytics"** > **"Dashboard"**
2. Follow the setup wizard if prompted
3. Your app will automatically start tracking page views

## Step 8: Test Your Setup

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. Try these features:
   - Page should load without errors
   - Stats section should display (even if 0)
   - Submit waitlist form - check Firestore console for new entry
   - Check if pageViews increments in stats collection

## Step 9: Update LinkedIn Follower Count

You can update the LinkedIn follower count in two ways:

### Method 1: Firebase Console (Manual)

1. Go to **Firestore Database** > **Data**
2. Navigate to `stats` > `main`
3. Edit the `linkedinFollowers` field
4. Enter your LinkedIn follower count
5. Click **"Update"**

### Method 2: Using App Function (Programmatic)

Create an admin page or script:

```javascript
import { updateLinkedInCount } from './firebase';

// Update to your actual count
await updateLinkedInCount(1250);
```

## Step 10: Set Up Page Visitor Tracking

The app automatically tracks page visits when users load the site. To view visitor data:

1. Go to **Firestore Database** > **Data**
2. Check the `stats` collection
3. The `pageViews` field increments with each visit

## Maintenance & Updates

### Update Testimonials

Add new testimonials via Firebase Console:

1. Go to `interviews` collection
2. Click **"Add document"**
3. Fill in the fields
4. The carousel will automatically display new entries

### Monitor Waitlist

To export waitlist entries:

1. Go to `waitlist` collection
2. Click the **"Export"** button
3. Download as JSON or CSV

### Analytics Dashboard

View Firebase Analytics to track:
- Page views
- User engagement
- Geographic data
- Device types

## Troubleshooting

### Error: "Permission denied"

- Check Firestore security rules
- Ensure rules allow read access for public collections

### Stats not updating

- Verify Firebase config in `firebase.js`
- Check browser console for errors
- Ensure Firestore is enabled

### Waitlist form not working

- Check network tab in browser dev tools
- Verify Firebase config is correct
- Check Firestore rules allow `create` for waitlist collection

## Security Best Practices

1. **Never commit** Firebase config with sensitive values to public repos
2. Use **environment variables** for production
3. Regularly review **Firestore security rules**
4. Monitor **Firebase usage** to prevent abuse
5. Enable **App Check** for additional security (optional but recommended)

## Cost Considerations

Firebase offers a generous free tier:

- **Firestore**: 50K reads, 20K writes, 20K deletes per day
- **Hosting**: 10 GB storage, 360 MB/day data transfer
- **Analytics**: Unlimited

For a small website with ~1000 daily visitors:
- Estimated reads: ~2000/day (well within free tier)
- Estimated writes: ~50/day (well within free tier)

## Next Steps

1. ✅ Configure Firebase project
2. ✅ Set up Firestore collections
3. ✅ Update app configuration
4. ✅ Test all features locally
5. 🚀 Deploy to GitHub Pages
6. 📊 Monitor analytics and usage

---

Need help? Check [Firebase Documentation](https://firebase.google.com/docs) or contact the team.
