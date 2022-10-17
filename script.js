const keys = document.querySelector('.buttonContainer');
const prevDisplayNum = document.querySelector('#prevNum');
const currDisplayNum = document.querySelector('#currNum');
const numBtn = document.querySelectorAll('.numeric');
const operBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');

let currNum = '';
let prevNum = '';
let operator = '';

function equationDisplay(num){
    currNum += num;
    currDisplayNum.textContent = currNum;
}

function savedOperator(op) {
    operator = op;
    prevNum = currNum;
    prevDisplayNum.textContent = prevNum + operator;

    currNum = "";
    currDisplayNum.textContent = "";
}

function calculate(){
    prevNum = Number(prevNum);
    currNum = Number(currNum);
    console.log(prevNum)
    console.log(currNum)
    console.log(operator)
    if (operator === "+") {
        prevNum += currNum;
      } else if (operator === "-") {
        prevNum -= currNum;
      } else if (operator === "x") {
        prevNum *= currNum;
      } else if (operator === "÷") {
        prevNum /= currNum;
      }
      prevDisplayNum.textContent = "";
      currDisplayNum.textContent = prevNum;
}

function ac(){
  console.log("here")
  currNum = "";
  prevNum = "";
  operator = "";
  currDisplayNum.textContent = "0";
  prevDisplayNum.textContent = "";
}


numBtn.forEach((btn) => {
    btn.addEventListener('click', event => {
        if(!event.target.closest('button')) return; //when pressing inbetween buttons, will select the buttonContainer so this will disable it
        const key = event.target;
    
        equationDisplay(key.innerText);
    });
});

operBtn.forEach((btn) => {
    btn.addEventListener('click', event => {
        if(!event.target.closest('button')) return; //when pressing inbetween buttons, will select the buttonContainer so this will disable it
        const key = event.target;
    
        savedOperator(key.innerText)
    });
});

equalBtn.addEventListener('click', () => {
  if(currNum != "" && prevNum != ""){
    calculate();
  }
});

clearBtn.addEventListener('click', ac);