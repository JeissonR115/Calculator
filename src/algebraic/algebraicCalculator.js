import {Polynomial} from "./elements/Polynomial.js";
import {Term} from "./elements/Term.js";
import {Fraction} from "../arithmetic/Fraction.js";
export const AlgebraicCalculator = {
    summer(polynomial = new Polynomial()) {
        const simplifiedTerms = [new Term()];
        if (polynomial instanceof Polynomial) {
            simplifiedTerms.shift()
            for (const term of polynomial.termList) {
                // Convertimos en str la parte literal
                const key = JSON.stringify(term.literalPart);
                // Verificamos si el término ya existe
                if (!simplifiedTerms[key]) {
                    //Asignamos una propiedad al array utilizando una clave(parte literal)
                    simplifiedTerms[key] = new Term(new Fraction(), term.literalPart)
                }
                // Sumamos el coeficiente del término actual al término correspondiente en simplifiedTerms
                simplifiedTerms[key].coefficient = term.coefficient.summer(simplifiedTerms[key].coefficient);
            }
            // Devolvemos un nuevo polinomio construido a partir de los valores de simplifiedTerms
            return new Polynomial(Object.values(simplifiedTerms));
        }
        return polynomial;
    },
    multiply(polynomials =[ new Polynomial()]){
        if(polynomials instanceof Term){
            return polynomials
        }
        if (polynomials instanceof Polynomial){
            return this.summer(polynomials);
        }
        if (polynomials.length === 0) {
            return new Polynomial([new Term(new Fraction(1))]);
        }

        let result = polynomials[0];// Inicializar con el primer polinomio.
        for (let i = 1; i < polynomials.length; i++) {
            result = multiplyTwoPolynomials(result, polynomials[i]);
        }
        return this.summer(result);
    }
}
const multiplyTwoPolynomials = (polynomialA, polynomialB) => {
    const termListA = polynomialA.termList;
    const termListB = polynomialB.termList;

    const resultTermList = [];

    for (const termA of termListA) {
        for (const termB of termListB) {
            // Multiplica cada par de términos y agrega el resultado a la lista de términos del resultado.
            const coefficient = termA.coefficient.multiply(termB.coefficient);
            const variableList = Term.simplifyLiteralPart([...termA.literalPart, ...termB.literalPart]);
            resultTermList.push(new Term(coefficient,variableList ));
        }
    }
    // Crea un nuevo polinomio a partir de la lista de términos resultantes
    const product =  new Polynomial(resultTermList);
    return AlgebraicCalculator.summer(product);
}

