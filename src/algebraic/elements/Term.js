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
            console.log(variable)
            newTerm.coefficient = new Fraction(this.coefficient.num() * variable.exponent) ;
            newTerm.literalPart = [new Variable(variable.letter,variable.letter?variable.exponent -1 :0)]
        }

        return newTerm;
    }
}