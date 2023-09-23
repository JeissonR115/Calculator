import {Polynomial} from "./elements/Polynomial.js";
import {Term} from "./elements/Term.js";
import {Variable} from "./elements/Variable.js";
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
                    simplifiedTerms[key] = new Term(0, term.literalPart)
                }
                // Sumamos el coeficiente del término actual al término correspondiente en simplifiedTerms
                simplifiedTerms[key].coefficient += term.coefficient;
            }
            // Devolvemos un nuevo polinomio construido a partir de los valores de simplifiedTerms
            return new Polynomial(Object.values(simplifiedTerms));
        }
        return polynomial;
    },
}


