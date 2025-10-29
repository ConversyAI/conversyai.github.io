# Welcome Overlay with Text-to-Speech Guide

## Overview
A premium entry animation that displays "Welcome to the Future of Business" with text-to-speech when users first visit the website.

## Features
- ✨ Full-screen animated overlay with glowing text
- 🔊 Automatic text-to-speech using browser's native API
- 🎨 Premium dark theme matching your website
- ⚡ Smooth fade-in/fade-out animations
- 🎯 Animated particles and glowing effects
- 📱 Fully responsive design

## Configuration

### Testing Mode (Shows on Every Refresh)
Open `src/components/WelcomeOverlay.jsx` and set:
```javascript
const SHOW_ON_EVERY_LOAD = true; // Shows on every page load
```

### Production Mode (Shows Once Per Session)
Open `src/components/WelcomeOverlay.jsx` and set:
```javascript
const SHOW_ON_EVERY_LOAD = false; // Shows once per browser session
```

## How It Works

### Current Settings (Testing Mode)
- **SHOW_ON_EVERY_LOAD = true**
- Overlay appears on every page refresh
- Perfect for testing and development
- Text-to-speech plays each time

### Production Settings
- **SHOW_ON_EVERY_LOAD = false**
- Overlay appears once per browser session
- Refresh = No overlay (same session)
- Close browser and reopen = Shows again (new session)
- Better user experience for returning visitors

## Customization Options

### Change Duration
In `WelcomeOverlay.jsx`, line 42:
```javascript
const timer = setTimeout(() => {
  setIsVisible(false);
}, 2000); // Change 2000 to desired milliseconds (e.g., 3000 = 3 seconds)
```

### Change Text
Line 27:
```javascript
const utterance = new SpeechSynthesisUtterance('Welcome to the Future of Business');
// Change the text inside quotes
```

### Change Voice Settings
Lines 28-30:
```javascript
utterance.rate = 0.9;   // Speed (0.1 to 10, default 1)
utterance.pitch = 1.0;  // Pitch (0 to 2, default 1)
utterance.volume = 0.8; // Volume (0 to 1, default 1)
```

### Change Text Content
Lines 119-131 in the JSX:
```javascript
<span>Welcome to the</span>
<br />
<span>Future of Business</span>
```

## Browser Compatibility

### Text-to-Speech Support
- ✅ Chrome/Edge: Excellent
- ✅ Safari: Good
- ✅ Firefox: Good
- ⚠️ Older browsers: Gracefully degrades (no sound, but animation works)

### Animation Support
- ✅ All modern browsers
- Uses Framer Motion for smooth animations

## Testing Checklist

- [ ] Set `SHOW_ON_EVERY_LOAD = true`
- [ ] Run `npm run dev`
- [ ] Open website in browser
- [ ] Verify overlay appears
- [ ] Verify text-to-speech plays
- [ ] Verify overlay fades out after 2 seconds
- [ ] Refresh page to test again
- [ ] Test on mobile devices
- [ ] Test with sound on/off

## Production Deployment

Before deploying to production:

1. Open `src/components/WelcomeOverlay.jsx`
2. Change line 10:
   ```javascript
   const SHOW_ON_EVERY_LOAD = false; // 👈 Set to false
   ```
3. Build and deploy:
   ```bash
   npm run build
   ```

## Troubleshooting

### Sound Not Playing
- Check browser sound settings
- Some browsers block autoplay audio
- User may need to interact with page first
- Check browser console for errors

### Overlay Not Showing
- Clear browser cache
- Check `SHOW_ON_EVERY_LOAD` setting
- Clear sessionStorage: `sessionStorage.clear()` in console

### Animation Issues
- Check browser compatibility
- Ensure Framer Motion is installed
- Check for CSS conflicts

## Files Modified

1. **src/components/WelcomeOverlay.jsx** - Main component
2. **src/App.jsx** - Integrated into main app
3. **src/index.css** - Added gradient animation

## Support

For issues or questions, check:
- Browser console for errors
- Network tab for loading issues
- Ensure all dependencies are installed: `npm install`
