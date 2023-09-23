import {Variable} from "./Variable.js";
export class Term {
    constructor(coefficient = 0, variableList = [new Variable()] ) {
        this.coefficient = coefficient;
        this.literalPart = variableList;
    }
}