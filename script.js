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
  if (prevNum === "") { //if user types out full equation
    prevNum = currNum;
    updateOperator(op);
  } else if (currNum === "") {  //if user presses = and then operator
    updateOperator(op);
  } else {  //if user does not press equal and presses operator
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
  if (operator === "+") {
    prevNum = (0 | (prevNum + currNum + .0000000001) * 100) / 100;
  } else if (operator === "-") {
    prevNum = (0 | (prevNum - currNum + .0000000001) * 100) / 100;
  } else if (operator === "x") {
    prevNum = (0 | (prevNum * currNum + .0000000001) * 100) / 100;
  } else if (operator === "÷") {
    prevNum = (0 | (prevNum / currNum + .0000000001) * 100) / 100;
  }

  if (prevNum === 0 && operator === ""){
    prevNum = currNum;
    currDisplayNum.textContent = currNum = prevNum;
    prevDisplayNum.textContent = "";
    operator = "";
    currNum = "";
  }
  else if (operator !== ""){
    currDisplayNum.textContent = prevNum;
    prevDisplayNum.textContent = "";
    operator = "";
    currNum = "";
  }
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
    typingSound();
  }
}

function del() {
  if (currNum !== "") {
    currNum = currNum.slice(0, -1);
    currDisplayNum.textContent = currNum;
    if (currNum === "") {
      currDisplayNum.textContent = "0";
    }
  }
  if (currNum === "" && prevNum != "" && operator === "") {
    prevNum = prevNum.toString().slice(0, -1);
    currDisplayNum.textContent = prevNum;
    if(prevNum === ""){
      currDisplayNum.textContent = "0";
    }
  }
}

function keyPress(e) {
  if (e.key >= 0 && e.key !== " ") {  //spacebar triggered this too apparently
    equationDisplay(e.key);
    typingSound();
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
    typingSound();
  } else if (e.key === "+" || e.key === "-") {
    savedOperator(e.key);
    typingSound();
  } else if (e.key === "*") {
    savedOperator("x");
    typingSound();
  } else if (e.key === "/") {
    savedOperator("÷");
    typingSound();
  } else if (e.key === ".") {
    addDecimal();
  } else if (e.key === "Escape") {
    ac();
    typingSound();
  } else if (e.key === "Backspace") {
    del();
    typingSound();
  } else if (e.code.includes("Numpad")) {
    let keypadKey = e.code.slice(6);
    if (keypadKey >= 0) {
      equationDisplay(keypadKey);
      typingSound();
    } else if (keypadKey === "Enter") {
      calculate();
      typingSound();
    } else if (keypadKey === "Add") {
      savedOperator("+");
      typingSound();
    } else if (keypadKey === "Subtract") {
      savedOperator("-");
      typingSound();
    } else if (keypadKey === "Multiply") {
      savedOperator("x");
      typingSound();
    } else if (keypadKey === "Divide") {
      savedOperator("÷");
      typingSound();
    } else if (keypadKey === "Decimal") {
      addDecimal();
    }
  }
}

function typingSound(){
  const audio = document.querySelector("#audioSound");
  audio.currentTime = 0;
  audio.play();
}

numBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.closest("button")) return; //when pressing inbetween buttons, will select the buttonContainer so this will disable it
    const key = event.target;

    equationDisplay(key.innerText);
    typingSound();
  });
});

operBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (!event.target.closest("button")) return;
    const key = event.target;

    savedOperator(key.innerText);
    typingSound();
  });
});

equalBtn.addEventListener("click", () => {
  if (currNum != "") {
    calculate();
  }
  typingSound();
});

clearBtn.addEventListener("click", () => {
  ac();
  typingSound();
});
decimalBtn.addEventListener("click", () => {
  addDecimal();
});
delBtn.addEventListener("click", () => {
  del();
  typingSound();
});
window.addEventListener("keydown", keyPress);