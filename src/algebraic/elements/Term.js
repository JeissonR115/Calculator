import {Variable} from "./Variable.js";
import {Fraction} from "../../arithmetic/Fraction.js";
export class Term {
    constructor(coefficient = new Fraction(), variableList = [new Variable()] ) {
        this.coefficient = coefficient;
        this.literalPart = variableList;
    }
    multiply(other = new Term()) {
        const newCoefficient = this.coefficient.multiply(other.coefficient);
        const newLiteralPart = [...this.literalPart, ...other.literalPart ];
        return new Term(newCoefficient, Term.simplifyLiteralPart(newLiteralPart));
    }
    static simplifyLiteralPart(literalPart =  [new Variable()]){
        const variableMap = new Map();
        for (const variable of literalPart) {
            if (!variableMap.has(variable.letter)) {
                variableMap.set(variable.letter, variable);
            } else {
                const existingVariable = variableMap.get(variable.letter);
                existingVariable.exponent += variable.exponent;
            }
        }
        return [...variableMap.values()];
    }
    simplifyLiteralPart(){
        return Term.simplifyLiteralPart(this.literalPart);
    }
    derive(){
        const newTerm = new Term()
        if(this.literalPart[0]){
            const variable = this.literalPart[0];

            newTerm.coefficient = new Fraction(this.coefficient.num() * variable.exponent) ;
            newTerm.literalPart = [new Variable(variable.letter,variable.letter?variable.exponent -1 :0)]
        }

        return newTerm;
    }
    integrate(){
        const newTerm = new Term()
        if(this.literalPart[0]){
            const variable = this.literalPart[0];
            const integratedExponent = variable.exponent +1;
            const integratedCoefficient= new Fraction(this.coefficient.num(),integratedExponent);
            const integratedVar = new Variable(variable.letter,variable.letter?integratedExponent:0);
            newTerm.coefficient = integratedCoefficient.simplify();
            newTerm.literalPart = [integratedVar]
        }
        return newTerm;
    }
}