export class Variable {
    constructor(letter = '', exponent= 0 ) {
        this.letter = letter;
        this.exponent = exponent;
    }
}
export class Term {
    constructor(coefficient = 0, variableList = [new Variable()] ) {
        this.coefficient = coefficient;
        this.literalPart = variableList;

    }
}
export class Polynomial{
    constructor(termList = [new Term()]) {
        this.termList = termList;
    }
}
