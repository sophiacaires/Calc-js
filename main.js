// modal config - selecionar ponto ou virgula
const openModal = document.getElementById("btn-config");
const modal = document.getElementById("modal");
const mask = document.getElementById("mask");
const closeModal = document.getElementById("modal-close");
const modalInput = document.getElementById("modal-switch");
let defaultDecimalRule = false;

console.log(modalInput.value);

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

modalInput.onclick = () => {
    console.log(modalInput.checked);
    if(modalInput.checked == true){
        defaultDecimalRule = true;
    }else{
        defaultDecimalRule = false;
    }
}

console.log(defaultDecimalRule);

const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = "";

keys.forEach(key => {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if(value == "clear"){
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if(value == "backspace"){
            input = input.slice(0, -1);
            displayInput.innerHTML = RearrangeInput(input);
        } else if(value == "="){
            let result = eval(PrepareInput(input));

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
    })
})

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
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputArray = outputString.split("");
    
    if(outputArray.length > 3){
        for(let i = outputArray.length - 3; i > 0; i-= 3){
            outputArray.splice(i, 0, ",");
        }
    }

    if(decimal){
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");
}

function ValidateInput(value){
    let lastInput = input.slice(-1);
    let operators = ["/", "*", "-", "+"];

    if(value == "." && lastInput == "."){
        return false;
    }

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