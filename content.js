

const imageUrl = chrome.runtime.getURL("p.png");
console.log("Resolved image URL:", imageUrl);

function replacePWithImage(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue || "";
        if (typeof text === "string" && /[pP]/.test(text) && !["INPUT", "TEXTAREA", "BUTTON", "A", "LABEL", "SCRIPT", "STYLE"].includes(node.parentNode.tagName)
        ) {
            const span = document.createElement("span");
            const parts = text.split(/(p|P)/);
            parts.forEach(part => {
                if (part === "p" || part === "P") {
                    const img = document.createElement("img");
                    img.src = imageUrl;
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
    node.childNodes.forEach(replacePWithImage);
  }
}


replacePWithImage(document.body);
