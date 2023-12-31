alert("Bem vindo à calculadora!\n\nUse ponto no separador decimal.");

const openModal = document.getElementById("btn-config");
const modal = document.getElementById("modal");
const mask = document.getElementById("mask");
const closeModal = document.getElementById("modal-close");
const modalInput = document.getElementById("modal-switch");
const decimalCharDiv = document.getElementById("decimalCharDiv");
const commaChar = ",";
const dotChar = ".";
let decimalChar = dotChar;
let auxiliarChar = commaChar;
let modalText = document.getElementById("modal-text");

const theme = window.localStorage.getItem("theme");

if (theme === "maurelio"){
    document.body.classList.add("maurelio");
    modalInput.checked = true;
}

modalInput.addEventListener('click', () => {
    document.body.classList.toggle("maurelio");
    if (theme === "maurelio") {
        window.localStorage.setItem("theme", null);
    } else{
        window.localStorage.setItem("theme", "maurelio");
    }
})

openModal.onclick = () => {
    modal.style.visibility = "visible";
    mask.style.display = "block";
}

closeModal.onclick = () => {
    modal.style.visibility = "collapse";
    mask.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal || event.target == mask) {
        modal.style.visibility = "collapse";
        mask.style.display = "none";
    }
}

const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

document.addEventListener("keydown", logKey);

let validInput = ["1","2","3","4","5","6","7","8","9","0","/","*","-","+","Enter","Backspace",",",".","%","Escape"];
let value;

function logKey(keyboardKey) {
    if(validInput.includes(keyboardKey.key)){
        ProcessLogic(keyboardKey.key);
    }else{
        return;
    }
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        ProcessLogic(key.dataset.key);
    })
})

function ProcessLogic(value){
    if(value == "clear" || value == "Escape"){
        input = "";
        displayInput.innerHTML = "";
        displayOutput.innerHTML = "";
    } else if(value == "backspace" || value == "Backspace"){
        input = input.slice(0, -1);
        displayInput.innerHTML = RearrangeInput(input);
    } else if(value == "=" || value == "Enter"){
        let result;
        try {
            result = eval(PrepareInput(input));
        } catch (error) {
            alert("Valor inválido!");
            result = "";
            displayInput.innerHTML = "";
        }

        displayOutput.innerHTML = RearrangeOutput(result);
    } else if(value == "brackets"){
        if(
            input.indexOf("(") == -1 ||
            input.indexOf("(") != -1 &&
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(") < input.lastIndexOf(")")
        ){
            input += "(";
        }else if(
            input.indexOf("(") != -1 &&
            input.indexOf(")") == -1 ||
            input.indexOf("(") != -1 &&
            input.indexOf("(") != -1 &&
            input.lastIndexOf("(") > input.lastIndexOf(")")
        ){
            input += ")";
        }

        displayInput.innerHTML = RearrangeInput(input);
    } else{
        if(ValidateInput(value)){
            input += value;
            displayInput.innerHTML = RearrangeInput(input);
        }
    }
}

function RearrangeInput(input){
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for(let i = 0; i < inputArrayLength; i++){
        if(inputArray[i] == "/"){
            inputArray[i] = ' <span class="operator">÷</span> ';
        } else if(inputArray[i] == "*"){
            inputArray[i] = ' <span class="operator">x</span> ';
        } else if(inputArray[i] == "-"){
            inputArray[i] = ' <span class="operator">−</span> ';
        } else if(inputArray[i] == "+"){
            inputArray[i] = ' <span class="operator">+</span> ';
        } else if(inputArray[i] == "("){
            inputArray[i] = '<span class="brackets">(</span>';
        } else if(inputArray[i] == ")"){
            inputArray[i] = '<span class="brackets">)</span>';
        } else if(inputArray[i] == "%"){
            inputArray[i] = '<span class="percent">%</span>';
        }
    }

    return inputArray.join("");
}

function RearrangeOutput(output){
    let outputString = output.toString();
    let decimal = outputString.split(decimalChar)[1];
    outputString = outputString.split(decimalChar)[0];
    let outputArray = outputString.split("");
    let outputArrayLength = outputArray.length;

    if(outputArrayLength > 3){
        for(let i = outputArray.length - 3; i > 0; i-= 3){
            outputArray.splice(i, 0, auxiliarChar);
        }
    }

    if(decimal){
        outputArray.push(decimalChar);
        outputArray.push(decimal);
    }

    return outputArray.join("");
}

function ValidateInput(value){
    let lastInput = input.slice(-1);
    let operators = ["/", "*", "-", "+", dotChar, commaChar];

    if(operators.includes(value)){
        if(operators.includes(lastInput)){
            return false;
        }else{
            return true;
        }
    }

    return true;
}

function PrepareInput(input){
    let inputArray = input.split("");

    for(let i = 0; i < inputArray.length; i++){
        if(inputArray[i] == "%"){
            inputArray[i] = "/100";
        }
    }

    return inputArray.join("");
}