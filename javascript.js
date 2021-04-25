window.onload = buttonStyleSetup;
const display = document.getElementById("display");
const buttons = document.querySelectorAll("input");
const buttonsArray = Array.from(buttons);
let numericalRe = /[0-9]/;
let operandRe = /\/|\*|\-|\+/;
let inputString = "";
let operand = "";
let displayLength = 12;

document.addEventListener("keydown", keyDown);

// This is an initial function to dynamically add to the grid area based
// on the button id rather than individually in the css
function buttonStyleSetup(){
    buttons.forEach(button => {
        button.style.gridArea = button.id;
        button.addEventListener('click', buttonClicked);
    });
};

//All buttons pressed will add to the input string with the exception of backspace and clear
function buttonClicked(e){
    clicked(e.target.value)
}

//Hard coded exceptions to the event key value matching desired behavior
function keyDown(e){
    if(document.hasFocus()){
        let passedValue = "";
        if(e.key == " "){e.preventDefault();} //Prevents default space causing scroll down but does nothing to the calculator
        if(e.key == "Enter"){
            passedValue = "=";
        }else if(e.key == "Backspace"){
            passedValue = "backspace";
        }else if(e.key == "Delete"){
            passedValue = "clear";
        }else{
            passedValue = e.key;
        }
        clicked(passedValue);
    }
}
function clicked(value){
    //let value = target.value; (Left in to show when pulling e directly how to get the value)
    //If the button is a number only add it to the string that is in display
    if(numericalRe.test(value)){
        inputString += `${value}`;
        displayChange(inputString);
    };
    if(operandRe.test(value)){
        //Ignore if an operand is called before any number do nothing
        if(inputString.length == 0){
            return;
        }
        if(typeof(inputString) != "string"){
            inputString = inputString.toString();
        };
        //If a second operand is added the previous one is removed first
        if(operandRe.test(inputString[inputString.length - 1])){
            inputString = inputString.slice(0, -1)
        }
        //If there is already an operator but numbers on both sides equate before adding another operand
        if(inputString.match(operandRe)){
            equate()
        }
        //Operand is saved separately for equate use
        operand = value;
        inputString += `${value}`;
        displayChange(inputString);
    }
    if(value == "."){
        if(inputString.includes(".")){
            return;
        }
        inputString += `${value}`;
        displayChange(inputString);
    }
    if(value == "="){
        //If there is no operand no equation can be done
        if(operand == ""){return}
        if(typeof(inputString) == "number"){
            inputString = inputString.toString();
        }
        if(operandRe.test(lastChar(inputString)) || lastChar(inputString) == "="){
            inputString = inputString.slice(0, -1)
        }
        equate();
    };

    if(value == "clear"){
        clearCalc();
    };

    if(value == "backspace"){
        backspace();
    };
};

function lastChar(inputString){
    return inputString[inputString.length - 1]
}

function equate(){
    let [x, y] = inputString.split(operand);
    if(isNaN(x)){x = null}else{x = Number(x)};
    if(isNaN(y)){y = null}else{y = Number(y)};
    let result = 0;
    switch(operand){
        case "+":
            result = add(x, y);
            break;
        case "-":
            result = subtract(x, y);
            break;
        case "*":
            result = multiply(x, y);
            break;
        case "/":
            result = divide(x, y);
    };
    result = Math.round((result + Number.EPSILON) * 10000000000) / 10000000000;
    if(typeof(result) != "string"){
        inputString = result.toString();
    }else{
        inputString = result;
    };
    operand = "";
    displayChange(inputString);
};

function displayChange(inputString){
    if(typeof(inputString) != "string"){
        inputString.toString();
    }
    inputString = inputString.length > displayLength ? 
            inputString.substring(0, displayLength - 1) + "..." : 
            inputString;
    display.innerText = inputString;
}

//Clear the input string that everything works with and resets the display
function clearCalc(){
    inputString = "";
    display.innerText = 0;
}

//Removes the last character from the input string for each press
function backspace(){
    inputString = inputString.slice(0, -1);
    displayChange(inputString);
}

function add(x, y = 0){
    return x + y;
}

function subtract(x, y = 0){
    return x - y;
}

function multiply(x, y = 1){
    return x * y;
}

function divide(x, y = 1){
    if(y == 0){
        console.log("SNARKY ERROR for trying to divide by zero");
        alert("Halt! Stop in the name of the law! You shouldn't try to divide by zero!")
        return 0;
    }
    return x / y;
}