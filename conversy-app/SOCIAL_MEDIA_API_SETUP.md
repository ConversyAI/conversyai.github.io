# Social Media API Integration Guide

This guide explains how to integrate LinkedIn and Instagram APIs to automatically fetch follower counts and page views.

## Overview

The application now supports fetching social media statistics from:
- **LinkedIn**: Follower count and page views
- **Instagram**: Follower count

By default, the app uses manually updated values stored in Firebase. To enable automatic API fetching, follow the setup instructions below.

## Current Implementation

### Files Modified/Created:

1. **`src/services/socialMediaApi.js`** - API service for fetching social media stats
2. **`src/components/Stats.jsx`** - Updated to display Instagram followers and fetch from API
3. **`src/firebase.js`** - Updated to include Instagram follower fields
4. **`src/pages/Admin/StatsManager.jsx`** - Added Instagram controls to admin panel

## How It Works

1. **Stats Component** fetches data from both Firebase and the social media API service
2. **API data takes precedence** - If API returns data, it's used; otherwise, Firebase fallback is used
3. **Admin Panel** allows manual updates for when API is not configured or as a backup

## LinkedIn API Setup

### Prerequisites:
- LinkedIn Company Page (not personal profile)
- LinkedIn Developer Account
- OAuth 2.0 Application

### Steps:

1. **Create a LinkedIn App**
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
   - Click "Create app"
   - Fill in required information (app name, company page, etc.)
   - Agree to terms and create app

2. **Configure App Permissions**
   - Navigate to "Products" tab
   - Request access to "Community Management API" or "Marketing Developer Platform"
   - Wait for approval (can take a few days)

3. **Get Access Token**
   - LinkedIn uses OAuth 2.0
   - You'll need to implement a backend OAuth flow to get an access token
   - **Important**: Never expose access tokens in frontend code

4. **Find Your Organization ID**
   ```bash
   # Use LinkedIn API to find your organization ID
   GET https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=YOUR_COMPANY_NAME
   ```

5. **API Endpoint for Follower Count**
   ```
   GET https://api.linkedin.com/v2/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:{ORGANIZATION_ID}
   ```

### Backend Implementation Required:

```javascript
// Example Node.js/Express endpoint
app.get('/api/social/linkedin/followers', async (req, res) => {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const orgId = process.env.LINKEDIN_ORG_ID;

  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${orgId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    const data = await response.json();
    const followerCount = data.elements[0]?.followerCounts?.organicFollowerCount || 0;

    res.json({ followerCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LinkedIn data' });
  }
});
```

## Instagram API Setup

### Prerequisites:
- Instagram Business Account (not personal account)
- Facebook Developer Account
- Facebook Page connected to Instagram account

### Steps:

1. **Convert to Business Account**
   - Go to Instagram settings
   - Select "Switch to Professional Account"
   - Choose "Business"
   - Connect to a Facebook Page

2. **Create Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com)
   - Click "Create App"
   - Select "Business" type
   - Fill in app details

3. **Add Instagram Graph API**
   - In your app dashboard, click "Add Product"
   - Select "Instagram Graph API"
   - Follow setup instructions

4. **Get Access Token**
   - Use Facebook's Graph API Explorer
   - Select your app
   - Request permissions: `instagram_basic`, `pages_read_engagement`
   - Generate access token
   - Exchange for long-lived token (60 days)

5. **Find Your Instagram Business Account ID**
   ```bash
   GET https://graph.facebook.com/v18.0/me/accounts?access_token={YOUR_ACCESS_TOKEN}
   ```
   Then:
   ```bash
   GET https://graph.facebook.com/v18.0/{PAGE_ID}?fields=instagram_business_account&access_token={YOUR_ACCESS_TOKEN}
   ```

6. **API Endpoint for Follower Count**
   ```
   GET https://graph.instagram.com/{INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=followers_count,media_count&access_token={ACCESS_TOKEN}
   ```

### Backend Implementation Required:

```javascript
// Example Node.js/Express endpoint
app.get('/api/social/instagram/followers', async (req, res) => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  try {
    const response = await fetch(
      `https://graph.instagram.com/${accountId}?fields=followers_count,media_count&access_token=${accessToken}`
    );

    const data = await response.json();

    res.json({
      followerCount: data.followers_count || 0,
      mediaCount: data.media_count || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram data' });
  }
});
```

## Configuration

### 1. Update `src/services/socialMediaApi.js`

```javascript
const API_CONFIG = {
  linkedin: {
    enabled: true, // Set to true when ready
    apiUrl: 'https://api.linkedin.com/v2/organizationalEntityFollowerStatistics',
    organizationId: 'YOUR_ORG_ID',
  },
  instagram: {
    enabled: true, // Set to true when ready
    apiUrl: 'https://graph.instagram.com',
    accountId: 'YOUR_ACCOUNT_ID',
  },
};
```

### 2. Update Backend Endpoints

Ensure your backend has the following endpoints:
- `GET /api/social/linkedin/followers`
- `GET /api/social/linkedin/pageviews`
- `GET /api/social/instagram/followers`

### 3. Environment Variables

Create a `.env` file in your backend:

```bash
# LinkedIn
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_ACCESS_TOKEN=your_access_token
LINKEDIN_ORG_ID=your_organization_id

# Instagram
INSTAGRAM_ACCESS_TOKEN=your_access_token
INSTAGRAM_ACCOUNT_ID=your_account_id
FACEBOOK_PAGE_ID=your_facebook_page_id
```

## Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use environment variables** for all credentials
3. **Implement rate limiting** on your backend endpoints
4. **Cache API responses** to reduce API calls (e.g., update every 6-24 hours)
5. **Handle token expiration** gracefully
6. **Use HTTPS** for all API communications
7. **Validate and sanitize** all data from external APIs

## Caching Strategy (Recommended)

To avoid hitting API rate limits, implement caching:

```javascript
// Example caching with Redis or in-memory cache
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

let cache = {
  linkedin: { data: null, timestamp: 0 },
  instagram: { data: null, timestamp: 0 }
};

function getCachedData(platform) {
  const cached = cache[platform];
  if (cached.data && (Date.now() - cached.timestamp < CACHE_DURATION)) {
    return cached.data;
  }
  return null;
}

function setCachedData(platform, data) {
  cache[platform] = {
    data,
    timestamp: Date.now()
  };
}
```

## Alternative: Scheduled Updates

Instead of real-time API calls, you can use a cron job to update Firebase:

1. **Create a cron job** (Node.js with node-cron):

```javascript
const cron = require('node-cron');
const admin = require('firebase-admin');

// Run every 6 hours
cron.schedule('0 */6 * * *', async () => {
  const linkedinFollowers = await fetchLinkedInFollowers();
  const instagramFollowers = await fetchInstagramFollowers();

  await admin.firestore()
    .collection('stats')
    .doc('main')
    .update({
      linkedinFollowers,
      instagramFollowers,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
});
```

2. **Deploy cron job** to your server or use cloud functions

## Testing

### Manual Testing:
1. Update values in Firebase via Admin Panel
2. Verify they display correctly on the main page
3. Test API endpoints directly (when configured)
4. Check fallback behavior when API is disabled

### API Testing:
```bash
# Test LinkedIn endpoint
curl http://localhost:3000/api/social/linkedin/followers

# Test Instagram endpoint
curl http://localhost:3000/api/social/instagram/followers
```

## Troubleshooting

### LinkedIn Issues:
- **401 Unauthorized**: Access token expired or invalid
- **403 Forbidden**: Missing permissions or app not approved
- **404 Not Found**: Check organization ID
- **Rate Limited**: Implement caching

### Instagram Issues:
- **Invalid OAuth Token**: Token expired (refresh it)
- **Unsupported Get Request**: Using personal account instead of business
- **Missing Permissions**: Add required permissions in Facebook app
- **Account Not Found**: Verify Instagram Business Account ID

## Fallback Behavior

The app is designed to gracefully handle API failures:

1. **API Disabled**: Uses Firebase values
2. **API Fails**: Catches error and uses Firebase values
3. **Firebase Fails**: Uses hardcoded defaults

This ensures the website always displays statistics, even if APIs are down.

## Admin Panel Usage

Non-technical users can update stats manually:

1. Log in to admin panel at `/admin`
2. Navigate to "Stats Manager"
3. Update follower counts manually
4. Click "Update Stats"
5. Changes reflect immediately on the website

## Future Enhancements

Consider adding:
- Twitter/X follower count
- YouTube subscriber count
- TikTok follower count
- Engagement metrics (likes, comments, shares)
- Historical tracking and charts
- Automated daily reports
- Email alerts for significant follower changes

## Support

For issues or questions:
- Check the [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- Check the [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- Review error logs in your backend
- Use the Admin Panel for manual updates as a fallback

## License

This integration is part of the Conversy AI platform.
