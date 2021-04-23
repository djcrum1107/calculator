window.onload = buttonStyleSetup;
const display = document.getElementById("display");
const buttons = document.querySelectorAll("input");
const buttonsArray = Array.from(buttons);
let numericalRe = /[1-9]/;
let operandRe = /\/|\*|\-|\+/;
let inputString = "";
let operand = "";

function buttonPressed(e){
    let value = e.target.value;
    if(numericalRe.test(value)){
        inputString += `${value}`;
        display.innerText = inputString;
    };
    if(operandRe.test(value)){
        operand = value;
        console.log(operand);
    };
};


// This is an initial function to dynamically add to the grid area based
// on the button id rather than individually in the css
function buttonStyleSetup(){
    buttons.forEach(button => {
        button.style.gridArea = button.id;
        button.addEventListener('click', buttonPressed);
    });
};

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    if(y == 0){
        display.innerText = "SNARKY ERROR";
        return 0;
    }
    return x / y;
}