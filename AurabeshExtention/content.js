

const letterImages = {};
const letters = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";

letters.split("").forEach(letter => {
  letterImages[letter] = chrome.runtime.getURL(`${letter}.png`);
  letterImages[letter.toUpperCase()] = chrome.runtime.getURL(`${letter}.png`);
});

digits.split("").forEach(digit => {
  letterImages[digit] = chrome.runtime.getURL(`${digit}.png`);
});

function replaceWithImage(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue || "";
        if (typeof text === "string" && /([a-zA-Z0-9]|\s|[.,!?'"-])/.test(text) && !["INPUT", "TEXTAREA", "BUTTON", "LABEL", "SCRIPT", "STYLE"].includes(node.parentNode.tagName)
        ) {
            const span = document.createElement("span");
            const parts = text.split(/([a-zA-Z0-9]|\s|[.,!?'"-])/);

            parts.forEach(part => {
                if (letterImages[part]) {
                    const img = document.createElement("img");
                    img.src = letterImages[part];
                    img.style.width = "1em";
                    img.style.height = "1em";
                    img.style.verticalAlign = "middle";
                    span.appendChild(img);
                  } else {
                    span.appendChild(document.createTextNode(part));
                  }
            });

            node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(replaceWithImage);
  }
}

// Create a floating popup
const popup = document.createElement("div");
popup.style.position = "fixed";
popup.style.bottom = "20px";
popup.style.right = "20px";
popup.style.background = "white";
popup.style.border = "1px solid #ccc";
popup.style.padding = "10px";
popup.style.borderRadius = "8px";
popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
popup.style.zIndex = "9999";
popup.style.display = "none";
document.body.appendChild(popup);

// Extract character from image src (assumes filenames like a.png, 1.png)
function getCharFromImage(imgSrc) {
  const match = imgSrc.match(/\/([^\/]+)\.png$/);
  return match ? match[1] : "";
}

// When the user selects a bunch of images (i.e., your translation)
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

// Only trigger if the selection includes images
if (range && range.cloneContents) {
  const cloned = range.cloneContents();
  const imgs = cloned.querySelectorAll("img");

  if (imgs.length > 0) {
    let decodedText = "";
    imgs.forEach(img => {
      decodedText += getCharFromImage(img.src);
    });

    popup.textContent = "Translation: " + decodedText;
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}
});


replaceWithImage(document.body);
