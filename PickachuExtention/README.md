# 🅿️ Letter P Replacer Chrome Extension

This Chrome extension replaces every letter **P** (uppercase and lowercase) on a webpage with an image.

## 📦 What's Included

- `manifest.json` – Extension configuration
- `content.js` – Script that replaces letters with the image
- `p.png` – The image that replaces the letter P
- `README.md` – This file

## 🚀 How to Install

1. Download or unzip the extension folder.
2. Open Chrome and go to `chrome://extensions`
3. Toggle **Developer Mode** on (top-right)
4. Click **"Load unpacked"**
5. Select the folder containing the extension files

That’s it! You should now see all the "P"s and "p"s replaced with your custom image.

## 🛠️ Customize

Want to use a different image?

1. Replace the `p.png` file with your own image (you can also use `.jpg`).
2. Make sure the filename matches in `content.js` and `manifest.json`:
   ```js
   const imageUrl = chrome.runtime.getURL("your-image-name.png");


Built with guidance from ChatGPT by OpenAI.
