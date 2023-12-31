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
        if(Array.isArray(polynomial)){
            polynomial.map(poly => this.summer(poly))
        }
        return polynomial;
    },
    multiply(polynomials =[ new Polynomial()]){
        let result;
        if (polynomials instanceof Polynomial){
           result = polynomials;
        }
        if(Array.isArray(polynomials)){
            result = polynomials[0]
            for (let i = 1; i < polynomials.length; i++) {
                const resultTermList = [];
                for (const termA of  result.termList) {
                    for (const termB of polynomials[i].termList) {
                        const newTerm  = termA.multiply(termB)
                        resultTermList.push(newTerm);
                    }
                }
                result = new Polynomial(resultTermList);
            }
        }
        return result;
    }
}