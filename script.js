const keys = document.querySelector(".buttonContainer");
const prevDisplayNum = document.querySelector("#prevNum");
const currDisplayNum = document.querySelector("#currNum");
const numBtn = document.querySelectorAll(".numeric");
const operBtn = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");
const delBtn = document.querySelector(".del");

let currNum = "";
let prevNum = "";
let operator = "";

function equationDisplay(num) {
  if (prevNum !== "" && currNum != "" && operator === "") {
    prevNum = "";
    currDisplayNum.textContent = currNum;
  }
  currNum += num;
  currDisplayNum.textContent = currNum;
}

function savedOperator(op) {
  if (prevNum === "") {
    prevNum = currNum;
    updateOperator(op);
  } else if (currNum === "") {
    updateOperator(op);
  } else {
    calculate();
    operator = op;
    currDisplayNum.textContent = "0";
    prevDisplayNum.textContent = prevNum + " " + operator;
  }
}

function updateOperator(op) {
  if (prevNum === "") {
    operator = op;
    prevDisplayNum.textContent = "0 " + operator;
    currDisplayNum.textContent = "0";
    currNum = "";
  } else {
    operator = op;
    prevDisplayNum.textContent = prevNum + " " + operator;
    currDisplayNum.textContent = "0";
    currNum = "";
  }
}

function calculate() {
  prevNum = Number(prevNum);
  currNum = Number(currNum);
  console.log(prevNum);
  console.log(currNum);
  console.log(operator);
  if (operator === "+") {
    prevNum += currNum;
  } else if (operator === "-") {
    prevNum -= currNum;
  } else if (operator === "x") {
    prevNum *= currNum;
  } else if (operator === "÷") {
    prevNum /= currNum;
  }
  currDisplayNum.textContent = prevNum;
  prevDisplayNum.textContent = "";
  operator = "";
  currNum = "";
}

function ac() {
  currNum = "";
  prevNum = "";
  operator = "";
  currDisplayNum.textContent = "0";
  prevDisplayNum.textContent = "";
}

function addDecimal() {
  if (!currNum.includes(".")) {
    currNum += ".";
    currDisplayNum.textContent = currNum;
  }
}

function del() {
  if(currNum !== "") {
    currNum = currNum.slice(0, -1);
    currDisplayNum.textContent = currNum;
    if(currNum === "") {
      currDisplayNum.textContent = "0";
    }
  }
  if(currNum === "" && prevNum != "" && operator === "") {
    prevNum = prevNum.slice(0, -1);
    currDisplayNum.textContent = prevNum;
  }
}

function keyPress(e) {
  console.log(e.key);
  if (e.key >= 0) {
    equationDisplay(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "+" || e.key === "-") {
    savedOperator(e.key);
  } else if (e.key === "*") {
    savedOperator("x");
  } else if (e.key === "/") {
    savedOperator("÷");
  } else if (e.key === "."){
    addDecimal();
  } else if (e.key === "Escape") {
    ac();
  } else if (e.key === "Backspace") {
    del();
  } else if (e.code.includes("Numpad")) {
    let keypadKey = e.code.slice(6);
    if (keypadKey >= 0) {
      equationDisplay(keypadKey);
    } else if (keypadKey === "Enter") {
      calculate();
    } else if (keypadKey === "Add") {
      savedOperator("+");
    } else if (keypadKey === "Subtract") {
      savedOperator("-");
    } else if (keypadKey === "Multiply") {
      savedOperator("x");
    } else if (keypadKey === "Divide") {
      savedOperator("÷");
    } else if(keypadKey === "Decimal") {
      addDecimal();
    }
  }
}

numBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.closest("button")) return; //when pressing inbetween buttons, will select the buttonContainer so this will disable it
    const key = event.target;

    equationDisplay(key.innerText);
  });
});

operBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.closest("button")) return; //when pressing inbetween buttons, will select the buttonContainer so this will disable it
    const key = event.target;

    savedOperator(key.innerText);
  });
});

equalBtn.addEventListener("click", () => {
  if (currNum != "") {
    calculate();
  }
});

clearBtn.addEventListener("click", ac);
decimalBtn.addEventListener("click", addDecimal);
delBtn.addEventListener("click", del)
window.addEventListener("keydown", keyPress);