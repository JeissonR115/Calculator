import {Polynomial, Term, Variable} from "./algebraicElements.js";
const extractCoefficient = (termStr = "") =>  {
    const regex = /((?<=^|[-+])[-+]?(?:\d*\.\d+|\d+)|[-+]?[a-zA-Z])/;
    // (?< =^|[-+]): Busca números al principio o después de los signos
    // [-+]?: Permite un signo opcional antes del número
    // \d+: Encuentra los dígitos
    // ([a-zA-Z]): Encuentra una letra.
    const matcher = termStr.replace(/\s/g, '').match(regex);
    let coefficient = 0;

    if (matcher) {
        const firstMatch = matcher[0];
        try {
            coefficient =  parseFloat(firstMatch)?parseFloat(firstMatch):1;
        } catch (e) {
            coefficient = firstMatch.charAt(0) === '-' ? -1 : 1;
        }
    }
    return coefficient;
}
const extractLiteralPart = (termStr = "") => {
    const variableList = [new Variable()];
    const regex = /([a-zA-Z])(\^([-+]?\d*\.?\d+))?/g;
    // ([a-zA-Z]): Encuentra una letra.
    // (\^([-+]?\d*\.?\d+))?: Encuentra un exponente opcional.
    const matches = termStr.matchAll(regex);
    if(matches){
        variableList.shift();
        for (const match of matches) {
            const letter = match[1];
            const exponentStr = match[3];
            const exponent = exponentStr !== undefined ? parseFloat(exponentStr) : 1;
            variableList.push(new Variable(letter, exponent));
        }
    }
    return variableList;
}
const extractTerm = (termSrc = "") => {
    const coefficient = extractCoefficient(termSrc);
    const literalPart = extractLiteralPart(termSrc);

    return new Term(coefficient,literalPart)
}
const extractPolynomial = (polynomialStr = "") => {
    const termList = [new Term()];
    const regex = /(?=[+-])/;
    const termStrArray = polynomialStr.split(regex);
    if (termStrArray){
        termList.shift();
        for (const termStr of termStrArray) {
            termList.push(extractTerm(termStr));
        }
    }

    return new Polynomial(termList);
}
const extractPolynomials = (equationStr = "") => {
    const polynomialList = [new Polynomial()];
    const regex = /\(.*?\)/g;
    const matches = equationStr.matchAll(regex);
    if (matches){
        polynomialList.shift()
        for (const match of matches) {
            const derivative = match[0];
            if (derivative.length >= 2) {
                // Eliminar paréntesis al principio y al final
                const polynomialStr = derivative.substring(1, derivative.length - 1);
                const polynomial = extractPolynomial(polynomialStr);
                polynomialList.push(polynomial);
            }
        }
    }


    return polynomialList;
}
export const extractAlgebraicExpression = (expression = "") => {
    {
        const polynomialList = extractPolynomials(expression);

        if (polynomialList.length <= 1) {
            const polynomial = extractPolynomial(expression);

            if (polynomial.termList.length <= 1) {
                return extractTerm(expression);
            } else {
                return polynomial;
            }
        } else {
            return polynomialList;
        }
    }
}