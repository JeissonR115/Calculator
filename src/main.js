import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";
import {printExpression} from "./algebraic/algebraicPrinter.js";
import {AlgebraicCalculator} from "./algebraic/algebraicCalculator.js";
const radioInputList = document.querySelectorAll(".input-radio")
const calculatorInput = document.querySelector(".calculator__input");
const output =document.querySelector(".calculator__output");
calculatorInput.addEventListener("input",() => {
    output.innerHTML = "";
    const expression = calculatorInput.value;
    const polynomials = extractAlgebraicExpression(expression);
    const sum = AlgebraicCalculator.summer(polynomials);
    //output.append(printExpression(sum,"listPolynomial  "))
    output.append(printExpression(polynomials.derive(),"listPolynomial  "))
})

radioInputList.forEach(radioInput =>{
    radioInput.addEventListener("click",()=>{
        output.innerHTML = "";
        const expression = calculatorInput.value;
        const polynomial = extractAlgebraicExpression(expression);
        let element;
        switch (radioInput.id){
            case "derivative-radio":
                element =printExpression(polynomial.derive(),"derive-term")
                break;
            case "integral-radio":
                element= printExpression(polynomial,'integral-term')
                break;
            case "default-radio":
                element= printExpression(polynomial,'term')
                break
            default:console.log("error")
        }
        output.append(element)
    })
})
