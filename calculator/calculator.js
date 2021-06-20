let calculator = document.querySelector(".calculator");
let display = document.getElementById("display");
/**
 * Calculates the answer by addition,subraction,multiplication and division 
 * @param {number} firstNum - First Number for Calculation
 * @param {number} secondNum - Second Number for Calculation
 * @param {string} operator - Operator in string
 * @returns {number} Answer of calculation
 */
function calculate(firstNum,secondNum,operator){
    let ans;
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    if(isNaN(firstNum) || isNaN(secondNum)) return -1; 
    switch (operator) {
        case "+":
            ans = firstNum + secondNum;
            break;
        case "-":
            ans = firstNum - secondNum;
            break;
        case "x":
            ans = firstNum * secondNum;
            break;
        case "/":
            if(secondNum === 0){
                alert("Number cannot be divided by 0") 
                return -1;
            } 
            ans = firstNum / secondNum;
            break;
        case "^":
            if(firstNum === 0) return -1;
            ans = firstNum ** secondNum;
            break;
        default:
            throw new Error("Someting Went Wrong");
            break;
    }
    return ans;
}


calculator.addEventListener("click",init);

function init(e){
    let target = e.target;
    if(target.classList.contains("clear")){
        display.value = "";
    }
    else if(target.classList.contains("cut")){
        display.value = display.value.slice(0,display.value.length-1);
    }
    else if(target.classList.contains("number")){
       display.value === "0" ? display.value = target.textContent : display.value += target.textContent;
    }
    else if(target.classList.contains("operator")){
        findAns();
        let lastnum = display.value[display.value.length-1];
        if(!isNaN(+lastnum)){
            display.value += target.textContent;
        }
    } 
    else if(target.classList.contains("equal")){
        findAns();
    }
    else if(target.classList.contains("point")){
        let lastnum = display.value[display.value.length-1];
        if(!isNaN(+lastnum)){
            let operatorPresent = operatoris();
            if((operatorPresent === -1 && !display.value.includes(".")) || 
            (operatorPresent !== -1 && display.value.indexOf(".",display.value.indexOf(operatorPresent)) === -1)) 
            display.value += target.textContent;
        }
    }
    else if(target.classList.contains("power")){
        findAns();
        let lastnum = display.value[display.value.length-1];
        if(!isNaN(+lastnum)){
            display.value += "^";
        }
    }
}
/**
 * 
 * @returns Operator for calculation
 */
function operatoris(){
    if(display.value.includes("+")) return "+";
    else if(display.value.includes("-")) return "-";
    else if(display.value.includes("x")) return "x";
    else if(display.value.includes("/")) return "/";
    else if(display.value.includes("^")) return "^";
    else return -1;
}
function findAns(){
    let num1 = parseFloat(display.value);
    let operator = operatoris();
    let num2;
     if(operator !== -1){
         num2 = parseFloat(display.value.slice(display.value.indexOf(operator) + 1));
        if(num2 != undefined || !isNaN(num2)){
            let ans = calculate(num1,num2,operator);
            if(ans.length > 10) ans = ans.slice(0,10);
            else if(ans === -1) return;
            display.value = ans;
        }
     } 
}