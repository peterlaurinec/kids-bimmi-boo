# Bimmi Match - Educational Matching Game 🎮

A colorful, Bimmi Boo-inspired matching game designed for 4-year-olds. Built as a Progressive Web App (PWA) that works offline and can be installed on any device.

## Features

- **3 Game Modes**: Emojis, Colors, Numbers
- **4 Emoji Themes**: Animals, Fruits, Vehicles, Sports
- **Adjustable Difficulty**: 2-8 pairs
- **Sound Effects**: Fun tones using Web Audio API (no audio files!)
- **Celebration Animations**: Confetti and victory sounds
- **PWA**: Install on iPad/tablet, works offline
- **Touch Optimized**: Large touch targets for small fingers

## Quick Start

### Option 1: Local Server (Recommended)
```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000
```

### Option 2: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

### Option 3: Just open the file
Double-click `index.html` (PWA features won't work, but game will!)

## Installing as PWA

### On iPad/iOS Safari:
1. Open the game in Safari
2. Tap the Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add"

### On Android Chrome:
1. Open the game in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"
4. Tap "Add"

### On Desktop Chrome:
1. Look for the install icon in the address bar
2. Click "Install"

## File Structure

```
kids-bimmi-boo/
├── index.html          # Complete game (single file!)
├── manifest.json       # PWA configuration
├── sw.js              # Service worker for offline
├── generate-icons.html # Tool to regenerate icons
├── icons/
│   ├── icon-72x72.png
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── README.md
```

## Customization

### Change Colors
In `index.html`, find the `:root` CSS section and modify:
```css
--color-pink: #FF6B9D;
--color-purple: #A855F7;
--bg-start: #FF6B9D;
--bg-end: #A855F7;
```

### Add New Emoji Themes
Find `EMOJI_SETS` in the JavaScript section:
```javascript
const EMOJI_SETS = {
    animals: ['🐶', '🐱', '🐭', ...],
    fruits: ['🍎', '🍌', '🍊', ...],
    // Add your own!
    food: ['🍕', '🍔', '🌭', '🍟', '🌮', '🍿', '🍩', '🍪'],
};
```

### Change Sound Frequencies
Find the `sounds` object to modify tones:
```javascript
select: () => playTone(440, 0.1, 'sine'),  // Change 440 to different Hz
```

## Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript** - No frameworks needed!
- **Web Audio API** - Sound generation
- **Service Worker** - Offline support
- **PWA Manifest** - Installable app

## Learning Concepts

This code demonstrates:
- Variables and data types
- Arrays and objects
- Functions
- Event listeners
- DOM manipulation
- CSS Grid layout
- CSS animations
- Web Audio API
- Service Workers
- PWA basics

Look for these comment markers in the code:
- `⭐ BEGINNER TIP` - Basic explanations
- `🎓 LEARN MORE` - Deeper concepts
- `💡 PRO TIP` - Advanced techniques
- `🎯 CHALLENGE` - Try it yourself!

## Browser Support

- Chrome/Edge (Desktop & Mobile) ✅
- Safari (Desktop & iOS) ✅
- Firefox ✅

## License

MIT - Feel free to modify and share!
