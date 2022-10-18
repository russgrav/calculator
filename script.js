const displayLast = document.querySelector('.display-last');
const displayCurrent = document.querySelector('.display-current');
const numButtons = document.querySelectorAll('.num-btn');
const operatorButtons = document.querySelectorAll('.op-btn');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');

decimalButton.disabled = false;

let displayCurrentValue;
let operator = "";
let displayLastValue;
let result;
let operatorClicked = false;
let resultNumber;
let numButtonClicked = false;
let equalClicked = false;
let opResult;

// next task -- add keyboard support

for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener("click", () => {
    if ((numButtons[i].value === ".") && (
      displayCurrent.textContent.includes("."))) {
        decimalButton.disabled = true;
    } else if (displayCurrent.textContent === "0" || operatorClicked === true || 
    equalClicked === true) {
      displayCurrent.textContent = numButtons[i].value;
      displayCurrentValue = displayCurrent.textContent;
      if (equalClicked === true) {
        displayLastValue = "";
        displayLast.textContent = displayLastValue;
      }
    } else if (displayCurrent.textContent.length < 8) {
      displayCurrent.textContent += numButtons[i].value; 
      displayCurrentValue = displayCurrent.textContent;
    }
    numButtonClicked = true;
    operatorClicked = false;
    equalClicked = false;
    decimalButton.disabled = false;
    console.log(displayCurrent.textContent);
  });
}

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
  })

}

clearButton.addEventListener("click", clearEvent)

deleteButton.addEventListener("click", () => {
  displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
  displayCurrentValue = displayCurrent.textContent;
})

equalButton.addEventListener("click", () => {
  if (numButtonClicked) {
    equalEvent();
    equalClicked = true;
    operatorClicked = false;
    numButtonClicked = false;
  } else return;
})

function equalEvent() {
  if (displayLast.textContent) {
    displayLast.textContent += " " + displayCurrentValue + " =";
    displayCurrentValue = Number(displayCurrentValue);
    displayLastValue = Number(displayLastValue);
    opResult = operate(operator, displayLastValue, displayCurrentValue);
    operatorClicked = false;
  }
}

function clearEvent() {
  displayCurrent.textContent = "0";
  displayLast.textContent = "";
  displayCurrentValue = displayCurrent.textContent;
  displayLastValue = "";
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
  if (b === 0) {
    alert("You can't divide by zero, silly!")
    clearEvent();
    return false;
  } else {
    return a / b;
  }
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
  if (result) {
    result = Math.round(result * 10000) / 10000;
    resultString = result.toString();
    if (resultString.length >= 8) {
      result = result.toExponential(5);
    }
    displayCurrent.textContent = result;
    displayCurrentValue = result;
    return result;
  } else return;
}

