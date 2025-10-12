const generateBtn = document.getElementById("generate-btn");
const colorBoxes = [
  document.getElementById("color1"),
  document.getElementById("color2"),
  document.getElementById("color3"),
  document.getElementById("color4"),
];

// Function to generate a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate a palette and update the UI
function generatePalette() {
  colorBoxes.forEach(box => {
    const color = getRandomColor();
    box.style.background = color;
    box.textContent = color;
  });

  // Optional: Change background gradient dynamically
  document.body.style.background = `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`;
}

// Event listener
generateBtn.addEventListener("click", generatePalette);

// Copy color on click
colorBoxes.forEach(box => {
  box.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(box.textContent)
        .then(() => {
          alert(`Copied ${box.textContent} to clipboard!`);
        })
        .catch((err) => {
          // Fallback to execCommand if available
          fallbackCopyTextToClipboard(box.textContent);
        });
    } else {
      // Fallback for unsupported browsers
      fallbackCopyTextToClipboard(box.textContent);
    }
  });
});
// Fallback function for copying text
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  // Avoid scrolling to bottom
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = "0";
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  document.body.appendChild(textArea);
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert(`Copied ${text} to clipboard!`);
    } else {
      alert('Failed to copy to clipboard.');
    }
  } catch (err) {
    alert('Failed to copy to clipboard.');
  }
  document.body.removeChild(textArea);
}