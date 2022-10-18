const displayLast = document.querySelector('.display-last');
const displayCurrent = document.querySelector('.display-current');
const numButtons = document.querySelectorAll('.num-btn');
const operatorButtons = document.querySelectorAll('.op-btn');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalButton = document.getElementById('equals');

let displayCurrentValue;
let operator = "";
let displayLastValue;
let result;
let operatorClicked = false;
let resultNumber;
let numButtonClicked = false;
let equalClicked = false;

// need to disable multiple decimal points from being allowed

for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener("click", () => {
    if (displayCurrent.textContent === "0" || operatorClicked === true) {
      displayCurrent.textContent = numButtons[i].value;
      displayCurrentValue = displayCurrent.textContent;
    } else if (displayCurrent.textContent.length < 8) {
      displayCurrent.textContent += numButtons[i].value; 
      displayCurrentValue = displayCurrent.textContent;
    } else {
      return;
    }
    numButtonClicked = true;
    operatorClicked = false;
    equalClicked = false;
    console.log(`last value: ${displayLastValue}`)
    console.log(`current value: ${displayCurrentValue}`)
    console.log(`numButtonClicked: ${numButtonClicked}`)
    console.log(`operatorClicked: ${operatorClicked}`)
    console.log(`equalClicked: ${equalClicked}`)
  });
}

// we need to account for scenarios where we add on numbers to the current display value and then 
// press an operator -- we don't want to trigger the equal event in those cases, but rather add
// on an operator to the displayLast

// maybe need some change in behavior when we add a number to the displayCurrent?

// we only want equalEvent to activate upon push of the operator button if 

// we want pushing of numbers after pressing the equal button to still prohibit the operator
// buttons from calling equalEvent


for (let i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", () => {
    if (numButtonClicked) {
      equalEvent();
    }
    displayLastValue = displayCurrentValue;
    operator = operatorButtons[i].value;
    displayLast.textContent = displayCurrentValue + " " + operator;
    operatorClicked = true;
    numButtonClicked = false;
    equalClicked = false;
    console.log(`last value: ${displayLastValue}`)
    console.log(`current value: ${displayCurrentValue}`)
    console.log(`numButtonClicked: ${numButtonClicked}`)
    console.log(`operatorClicked: ${operatorClicked}`)
    console.log(`equalClicked: ${equalClicked}`)
  })

}

clearButton.addEventListener("click", () => {
  displayCurrent.textContent = "0";
  displayLast.textContent = "";
  displayCurrentValue = displayCurrent.textContent;
  displayLastValue = "";
  console.log(`last value: ${displayLastValue}`)
  console.log(`current value: ${displayCurrentValue}`)
  console.log(`numButtonClicked: ${numButtonClicked}`)
  console.log(`operatorClicked: ${operatorClicked}`)
  console.log(`equalClicked: ${equalClicked}`)
})

deleteButton.addEventListener("click", () => {
  displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
  displayCurrentValue = displayCurrent.textContent;
  console.log(`last value: ${displayLastValue}`)
  console.log(`current value: ${displayCurrentValue}`)
  console.log(`numButtonClicked: ${numButtonClicked}`)
  console.log(`operatorClicked: ${operatorClicked}`)
  console.log(`equalClicked: ${equalClicked}`)
})

equalButton.addEventListener("click", () => {
  if (numButtonClicked) {
    equalEvent();
    equalClicked = true;
    operatorClicked = false;
    numButtonClicked = false;
  } else return;
  console.log(`last value: ${displayLastValue}`)
  console.log(`current value: ${displayCurrentValue}`)
  console.log(`numButtonClicked: ${numButtonClicked}`)
  console.log(`operatorClicked: ${operatorClicked}`)
  console.log(`equalClicked: ${equalClicked}`)
})

function equalEvent() {
  if (displayLast.textContent) {
    displayLast.textContent += " " + displayCurrentValue;
    displayCurrentValue = Number(displayCurrentValue);
    displayLastValue = Number(displayLastValue);
    operate(operator, displayLastValue, displayCurrentValue);
    operatorClicked = false;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case "×":
      result = multiply(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;
  }
  result = Math.round(result * 10000) / 10000;
  resultString = result.toString();
  if (resultString.length >= 8) {
    shortenedResultString = resultString.slice(0, 9);
    result = Number(shortenedResultString);
    // need a better way to deal with long numbers
  }
  displayCurrent.textContent = result;
  displayCurrentValue = result;
}

