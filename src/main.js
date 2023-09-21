import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";
import {printPolynomials} from "./algebraic/algebraicPrinter.js";

const calculatorInput = document.querySelector(".calculator__input");
const calculatorButton = document.querySelector(".calculator__button");
const output =document.querySelector(".calculator__output");
calculatorButton.addEventListener("click",() => {
    output.innerHTML = "";
    const expression = calculatorInput.value;
    const polynomials = extractAlgebraicExpression(expression);
    output.append(printPolynomials(polynomials,"listPolynomial  "))
})


