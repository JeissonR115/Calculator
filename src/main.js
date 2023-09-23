import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";
import {printExpression} from "./algebraic/algebraicPrinter.js";
import {AlgebraicCalculator} from "./algebraic/algebraicCalculator.js";


const calculatorInput = document.querySelector(".calculator__input");
const calculatorButton = document.querySelector(".calculator__button");
const output =document.querySelector(".calculator__output");
calculatorButton.addEventListener("click",() => {
    output.innerHTML = "";
    const expression = calculatorInput.value;
    const polynomials = extractAlgebraicExpression(expression);
    const sum = AlgebraicCalculator.summer(polynomials);
    output.append(printExpression(sum,"listPolynomial  "))
})
