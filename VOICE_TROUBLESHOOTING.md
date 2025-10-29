# Voice Not Working? Troubleshooting Guide

## Where Are the Voice Controls?

Open `src/components/WelcomeOverlay.jsx` and look for **Lines 37-40**:

```javascript
// ===== VOICE SETTINGS - CUSTOMIZE HERE =====
utterance.rate = 0.9;    // Speed: 0.1 (slow) to 10 (fast), default 1
utterance.pitch = 1.0;   // Pitch: 0 (low) to 2 (high), default 1  
utterance.volume = 1.0;  // Volume: 0 (silent) to 1 (loud), default 1
// ===========================================
```

## Why Voice Might Not Work

### 1. **Browser Autoplay Policy** (Most Common)
Modern browsers block autoplay audio until user interacts with the page.

**Solution:**
- Click anywhere on the page first
- Or add a "Click to Enter" button before the overlay

### 2. **No Voices Available**
Some systems don't have text-to-speech voices installed.

**Check in Browser Console:**
```javascript
// Open DevTools (F12) and run:
window.speechSynthesis.getVoices()
```

If it returns empty array `[]`, no voices are available.

### 3. **Browser Compatibility**
- ✅ Chrome/Edge: Best support
- ✅ Safari: Good support
- ⚠️ Firefox: Limited voices
- ❌ Some older browsers: Not supported

### 4. **System Volume/Mute**
- Check if system volume is up
- Check if browser tab is muted
- Check if laptop speakers are working

## How to Test Voice

### Method 1: Browser Console Test
1. Open DevTools (F12)
2. Go to Console tab
3. Paste and run:
```javascript
const utterance = new SpeechSynthesisUtterance('Hello World');
utterance.volume = 1.0;
window.speechSynthesis.speak(utterance);
```

If this doesn't work, the issue is with your browser/system, not the code.

### Method 2: Check Console Logs
When the overlay loads, check for these logs:
- `🔊 Available voices: X` - Shows how many voices are available
- `🎤 Using voice: [name]` - Shows which voice is being used
- `🔊 Speech started` - Confirms speech began
- `✅ Speech ended` - Confirms speech completed
- `❌ Speech error: [error]` - Shows any errors

## Solutions

### Solution 1: Add User Interaction (Recommended)
Add a "Click to Enter" button that user must click before overlay shows:

```javascript
// In WelcomeOverlay.jsx, add:
const [userInteracted, setUserInteracted] = useState(false);

// Show button first, then overlay after click
{!userInteracted ? (
  <button onClick={() => setUserInteracted(true)}>
    Click to Enter
  </button>
) : (
  // ... existing overlay code
)}
```

### Solution 2: Increase Volume
Change line 40 in `WelcomeOverlay.jsx`:
```javascript
utterance.volume = 1.0;  // Maximum volume
```

### Solution 3: Test Different Voice
Add this after line 40:
```javascript
// Force a specific voice
const voices = window.speechSynthesis.getVoices();
utterance.voice = voices[0]; // Try first available voice
```

### Solution 4: Disable Voice (Keep Visual Only)
Comment out the entire text-to-speech section (lines 28-85):
```javascript
// if (!hasPlayed && 'speechSynthesis' in window) {
//   ... all the voice code ...
// }
```

## Testing Checklist

- [ ] System volume is up
- [ ] Browser tab is not muted
- [ ] Speakers/headphones are working
- [ ] Tested in Chrome/Edge (best support)
- [ ] Checked browser console for errors
- [ ] Ran console test (Method 1 above)
- [ ] Clicked on page before overlay appears

## Still Not Working?

### Option A: Make Voice Optional
The overlay will still look great without sound. The visual animation is the main feature.

### Option B: Add Manual Play Button
Add a speaker icon that users can click to hear the voice:

```javascript
<button onClick={() => {
  const utterance = new SpeechSynthesisUtterance('Welcome to the Future of Business');
  window.speechSynthesis.speak(utterance);
}}>
  🔊 Play Voice
</button>
```

### Option C: Use Different Audio Method
Instead of text-to-speech, use a pre-recorded audio file:

```javascript
const audio = new Audio('/path/to/welcome.mp3');
audio.play();
```

## Common Error Messages

### "not-allowed"
- Browser blocked autoplay
- Need user interaction first

### "synthesis-failed"
- No voices available
- System doesn't support TTS

### "synthesis-unavailable"
- TTS engine not ready
- Try adding delay before speaking

## Need More Help?

1. Share your browser console logs
2. Tell me which browser/OS you're using
3. Run the console test and share results
