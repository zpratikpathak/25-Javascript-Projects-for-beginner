const decreaseButton = document.querySelector('.minusButton');
const increaseButton = document.querySelector('.plusButton');
const outputValue = document.querySelector('.outputValue');
const userInput = document.querySelector('.input-sty');
const resetButton = document.querySelector('.resetButton');

decreaseButton.addEventListener('click', () => {
  const resultValue = parseInt(outputValue.innerText);
  const userInputValue = parseInt(userInput.value);
  outputValue.innerText = resultValue - userInputValue;
});

increaseButton.addEventListener('click', () => {
  const resultValue = parseInt(outputValue.innerText);
  const userInputValue = parseInt(userInput.value);
  outputValue.innerText = resultValue + userInputValue;
});

resetButton.addEventListener('click', () => {
  outputValue.innerText = 0;
  userInput.value = 1;
});
