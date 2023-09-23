import {Variable} from "./Variable.js";
import {Fraction} from "../../arithmetic/Fraction.js";
export class Term {
    constructor(coefficient = new Fraction(), variableList = [new Variable()] ) {
        this.coefficient = coefficient;
        this.literalPart = variableList;
    }
}