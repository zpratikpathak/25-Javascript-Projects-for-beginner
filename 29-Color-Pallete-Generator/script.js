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
  for(let i=0; i<6; i++) {
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
    navigator.clipboard.writeText(box.textContent);
    alert(`Copied ${box.textContent} to clipboard!`);
  });
});
