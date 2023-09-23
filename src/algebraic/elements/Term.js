import {Variable} from "./Variable.js";
import {Fraction} from "../../arithmetic/Fraction.js";
export class Term {
    constructor(coefficient = new Fraction(), variableList = [new Variable()] ) {
        this.coefficient = coefficient;
        this.literalPart = variableList;
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