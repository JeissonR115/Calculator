import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";
import {printExpression} from "./algebraic/algebraicPrinter.js";
import {AlgebraicCalculator} from "./algebraic/algebraicCalculator.js";
const radioInputList = document.querySelectorAll(".input-radio")
const calculatorInput = document.querySelector(".calculator__input");
const output =document.querySelector(".calculator__output");
const defaultMode = document.querySelector("#default-radio")
let mode = "normal";
let element;
defaultMode.checked = true;
calculatorInput.value = ''
const showExpression = (outputElement,inputElement) =>{
    outputElement.innerHTML = "";
    const expression = inputElement.value;
    const polynomials = extractAlgebraicExpression(expression);
    switch (mode) {
        case "normal":
            element = printExpression(AlgebraicCalculator.summer(polynomials),"term")
            break;
        case "derivative":
            element = printExpression(AlgebraicCalculator.summer(polynomials.derive()),"derive-term")
            break;
        case "integral":
            element= printExpression(AlgebraicCalculator.summer(polynomials.integrate()),"integral-term");
            break;
        default:
            element= document.createElement("p");
            element.textContent = 'error no se que esta pasando'

    }
    outputElement.append(element)
}
calculatorInput.addEventListener("input",() => showExpression(output,calculatorInput))
radioInputList.forEach(radioInput =>{
    radioInput.addEventListener("click",()=>{
        switch (radioInput.id){
            case "derivative-radio":
                mode = "derivative"
                // element =printExpression(polynomial.derive(),"derive-term")
                break;
            case "integral-radio":
                mode = "integral"
                break;
            case "default-radio":
                mode = "normal"
                break
            default:console.log("error")
        }
        showExpression(output,calculatorInput)
    })
})
