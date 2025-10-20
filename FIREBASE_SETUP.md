# Firebase Setup Instructions

## Fix the "Missing or insufficient permissions" Error

### Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `conversy-static-page`
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read statistics
    match /stats/{document=**} {
      allow read: if true;
      allow write: if true; // Allow updating stats for waitlist count
    }

    // Allow anyone to add to waitlist (write only, no read for privacy)
    match /waitlist/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow create: if true; // Anyone can add to waitlist
      allow update: if false; // No updates allowed
      allow delete: if false; // No deletes allowed
    }

    // Interviews - admin only
    match /interviews/{document=**} {
      allow read, write: if request.auth != null;
    }

    // Visitors tracking
    match /visitors/{document=**} {
      allow read: if request.auth != null;
      allow create: if true; // Anyone can create visitor records
      allow update, delete: if false;
    }
  }
}
```

5. Click **Publish** to apply the rules

### Step 2: Initialize Firestore Collections (if needed)

If the collections don't exist, create them:

1. In Firestore, click **Start collection**
2. Create these collections:
   - `waitlist` - leave empty
   - `stats` - add a document with ID `main` containing:
     ```json
     {
       "waitlistCount": 5,
       "linkedinFollowers": 43,
       "linkedinViews": 250,
       "instagramFollowers": 19,
       "uniqueVisitors": 17
     }
     ```

### Step 3: Test the Waitlist Form

1. Open your website
2. Go to the waitlist section
3. Enter a test name and email
4. Click "Join Waitlist Now"
5. You should see:
   - "Saving your information..." message
   - Google Form opens in new tab
   - Success message appears

## How the System Works

1. **User submits form** → Name/email saved to Firebase `waitlist` collection
2. **Count updates** → `stats/main` document's `waitlistCount` increments
3. **Google Form opens** → User completes additional details
4. **Data stored in two places**:
   - Basic info (name/email) in Firebase
   - Detailed info in Google Forms responses

## Troubleshooting

### If Google Form doesn't open:
- Check browser popup blocker settings
- Verify the URL in `src/config/siteConfig.json` under `forms.waitlist`

### If Firebase still shows permission errors:
- Wait 1-2 minutes for rules to propagate
- Check Firebase console for any error messages
- Ensure Firestore is in production mode (not locked mode)

### To view waitlist data:
1. Go to Firebase Console → Firestore
2. Click on `waitlist` collection
3. You'll see all submissions with timestamps

### To check current waitlist count:
1. Go to Firebase Console → Firestore
2. Click on `stats` → `main`
3. View the `waitlistCount` field