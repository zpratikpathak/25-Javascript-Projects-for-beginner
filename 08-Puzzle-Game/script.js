//Initial References
const moves = document.getElementById("moves");
const container = document.querySelector(".container");
const startButton = document.getElementById("start-button");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
let currentElement = "";
let movesCount,
  imagesArr = [];
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops ad throw error)
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};
//Random number for image
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

//Get row and column value from data-position
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

//row1, col1 are image co-ordinates while row2 amd col2 are blank image co-ordinates
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    //left/right
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    //up/down
    if (row2 == row1 - 1 || row2 == row1 + 1) {
      return true;
    }
  }
  return false;
};

//Fill array with random value for images
const randomImages = () => {
  while (imagesArr.length < 8) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal)) {
      imagesArr.push(randomVal);
    }
  }
  imagesArr.push(9);
};

//Generate Grid
const gridGenerator = () => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", selectImage);
      div.classList.add("image-container");
      div.innerHTML = `<img src="./img/parts/image_part_00${
        imagesArr[count]
      }.jpg" class="image ${
        imagesArr[count] == 9 ? "target" : ""
      }" data-index="${imagesArr[count]}"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};

//Click the image
const selectImage = (e) => {
  e.preventDefault();
  //Set currentElement
  currentElement = e.target;
  //target(blank image)
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  //get row and col values for both elements
  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
    //Swap
    currentElement.remove();
    targetElement.remove();
    //Get image index(to be used later for manipulating array)
    let currentIndex = parseInt(currentElement.getAttribute("data-index"));
    let targetIndex = parseInt(targetElement.getAttribute("data-index"));
    //Swap Index
    currentElement.setAttribute("data-index", targetIndex);
    targetElement.setAttribute("data-index", currentIndex);
    //Swap Images
    currentParent.appendChild(targetElement);
    targetParent.appendChild(currentElement);
    //Array swaps
    let currentArrIndex = imagesArr.indexOf(currentIndex);
    let targetArrIndex = imagesArr.indexOf(targetIndex);
    [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
      imagesArr[targetArrIndex],
      imagesArr[currentArrIndex],
    ];

    //Win condition
    if (imagesArr.join("") == "123456789") {
      setTimeout(() => {
        //When games ends display the cover screen again
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        result.innerText = `Total Moves: ${movesCount}`;
        startButton.innerText = "RestartGame";
      }, 1000);
    }
    //Increment a display move
    movesCount += 1;
    moves.innerText = `Moves: ${movesCount}`;
  }
};

//Start button click should display the container
startButton.addEventListener("click", () => {
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  container.innerHTML = "";
  imagesArr = [];
  randomImages();
  gridGenerator();
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
});

//Display start screen first
window.onload = () => {
  coverScreen.classList.remove("hide");
  container.classList.add("hide");
};
