const keys = document.querySelector('.buttonContainer');
const prevDisplayNum = document.querySelector('#prevNum');
const currDisplayNum = document.querySelector('#currNum');
const numBtn = document.querySelectorAll('.numeric');
const operBtn = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');

let currNum = '';
let prevNum = '';
let operator = '';

function equationDisplay(num){
    currNum += num;
    currDisplayNum.textContent = currNum;
}

function saved(operator) {
    prevNum = currNum;
    prevDisplayNum.textContent = prevNum + operator;

    currNum = "";
    currDisplayNum.textContent = "";
}

// function calculate(num){
//     num1 = Number(num1);
//     currEquation = Number(currEquation);

//     if (operator === "+") {
//         num1 + num2;
//       } else if (operator === "-") {
//         return num1 - num2;
//       } else if (operator === "*") {
//         return num1 * num2;
//       } else if (operator === "/") {
//         return num1 / num2;
//       }
// }


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
    
        saved(key.innerText)
    });
});

equalBtn.addEventListener('click', calculate);