const sudoku = document.getElementById("sudoku");
const message = document.getElementById("message");

const solution = [
  [1, 5, 3, 4, 2, 6],
  [2, 4, 6, 5, 3, 1],
  [3, 2, 4, 6, 1, 5],
  [5, 6, 1, 3, 4, 2],
  [6, 3, 2, 1, 5, 4],
  [4, 1, 5, 2, 6, 3],
];

const puzzle = [
  [1, 0, 0, 4, 0, 0],
  [2, 0, 0, 5, 0, 0],
  [3, 0, 0, 6, 0, 0],

  [0, 0, 1, 0, 0, 2],
  [0, 0, 2, 0, 0, 4],
  [0, 0, 5, 0, 0, 3],
];

function createSudoku() {
  sudoku.innerHTML = "";

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const cell = document.createElement("div");

      cell.classList.add("cell");
      if (puzzle[row][col] !== 0) {
        cell.innerText = puzzle[row][col];

        cell.classList.add("given");
      }
      else {
        const input = document.createElement("input");

        input.classList.add("input-cell");

        input.type = "text";
        input.maxLength = 1;
        input.inputMode = "numeric";
        
        input.setAttribute("aria-label", `Row ${row + 1}, Column ${col + 1}`);
        input.autocomplete = "off";

        input.addEventListener("input", function () {
          this.value = this.value.replace(/[^1-6]/g, "");
        });

        cell.appendChild(input);
      }

      sudoku.appendChild(cell);
    }
  }
}

function submitSudoku() {
  const inputs = document.querySelectorAll(".input-cell");

  let index = 0;
  let correct = true;
  let complete = true;

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (puzzle[row][col] === 0) {
        const value = inputs[index].value;
        if (value === "") {
          complete = false;
        }
        else if (Number(value) !== solution[row][col]) {
          correct = false;
        }

        index++;
      }
    }
  }

  if (!complete) {
    message.innerText = "Please fill all boxes.";
    message.style.color = "red";
  } else if (correct) {
    message.innerText = "Correct! Sudoku solved.";
    message.style.color = "green";
  } else {
    message.innerText = "Wrong answer. Try again.";
    message.style.color = "red";
  }
}
function resetSudoku() {
  createSudoku();

  message.innerText = "";
}
createSudoku();
document.getElementById("submitBtn").addEventListener("click", submitSudoku);
document.getElementById("resetBtn").addEventListener("click", resetSudoku);