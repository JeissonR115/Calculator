import {Polynomial, Term, Variable} from "./algebraicElements.js";

export const printCoefficient = (coefficient = 0,id ="")=>{
    const coefficientElement = document.createElement("span")
    coefficientElement.className = "term__coefficient";
    coefficientElement.id = id;
    coefficientElement.textContent = coefficient.toString();
    return coefficientElement
}
const printVariable = (variable = new Variable(),id = "") => {
    const variableElement = document.createElement("span");
    variableElement.className = "term__variable";
    variableElement.id = id;

    const letterElement = document.createElement("span")
    letterElement.className = "variable__letter";
    let letterStr;

    const exponentElement = document.createElement("sup")
    exponentElement.className = "variable__exponent";
    let exponentStr;

    switch (variable.exponent) {
        case 0:
            letterStr = "(1)"
            exponentStr = "";
            break;
        case 1:
            letterStr = variable.letter
            exponentStr = "";
            break;
        default:
            letterStr = variable.letter;
            exponentStr = variable.exponent.toString();
    }

    letterElement.textContent = letterStr;
    exponentElement.textContent = exponentStr;
    variableElement.append(letterElement,exponentElement);

    return variableElement;
}
export const printLiteralPart = (literalPart = [new Variable()],id = "") => {
    const literalPartElement = document.createElement("span");
    literalPartElement.className = "term__literalPart";
    literalPartElement.id = id;
    literalPart.forEach((variable,i) =>{
        literalPartElement.append(printVariable(variable,id+"--"+i))
    } );
    return literalPartElement;
}
export  const printTerm = (term = new Term(),id = "") =>{
    const termElement = document.createElement("span");
    termElement.className = "polynomial__term";
    termElement.id = id;
    if (term.coefficient !== 0) {
        if (term.coefficient !== 1 || term.literalPart.length < 1) {
            termElement.append(printCoefficient(term.coefficient,id+"__coefficient"));
        }
        const literalPartElement = printLiteralPart(term.literalPart,id +"__literalPart");
        if (term.literalPart.length >1){
            literalPartElement.insertAdjacentHTML("afterbegin", '(');
            literalPartElement.insertAdjacentHTML("beforeend", ')')
        }

        termElement.append(literalPartElement);
    } else {
            termElement.append(printCoefficient(term.coefficient,id+"__coefficient"));
    }


    return termElement;
}
export  const printPolynomial = (polynomial = new polynomial(),id = "")=>{
    const polynomialElement = document.createElement("span")
    polynomialElement.className = "polynomial";
    polynomialElement.id= id;
    polynomial.termList.forEach((term,i) => {
        const newTerm = new Term(term.coefficient<0?term.coefficient * -1:term.coefficient,term.literalPart)
        polynomialElement.append(
            (i === 0) ?"": (term.coefficient <0) ?" - ":" + ",
            printTerm(newTerm,id+"__term--"+i)
        )
    });
    if (polynomial.termList.length > 0) {
        polynomialElement.insertAdjacentHTML("afterbegin",'[');
        polynomialElement.insertAdjacentHTML("beforeend",']');
    }
    return polynomialElement;
}
export  const printPolynomials = (polynomials = [new Polynomial()],id = '') => {
    const polynomialsElement = document.createElement("div");
    polynomialsElement.className = "polynomial-container";
    polynomialsElement.id = id;
    polynomials.forEach((polynomial,i) => {
        polynomialsElement.append(printPolynomial(polynomial,id+"--polinomial--"+i))
    });
    return polynomialsElement;
}

export const printExpression = (expression,id = "") => {
    if (Array.isArray(expression)) {
        return printPolynomials(expression,id);
    } else if (expression instanceof Polynomial) {
        return printPolynomial(expression,id);
    } else if (expression instanceof Term) {
        return printTerm(expression,id);
    } else {
        const messageError = document.createElement("span");
        messageError.textContent = "Lo Siento pero no pude reconocer la expression que acabas de escribir";
        return messageError;
    }
}