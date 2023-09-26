import {Term} from "./Term.js";
export class Polynomial{
    constructor(termList = [new Term()]) {
        this.termList = termList;
    }
    derive(){
        const newTermList = this.termList.map(term =>term.derive())
        return new Polynomial(newTermList)
    }
    integrate(){
        const newTermList = this.termList.map(term =>term.integrate())
        return new Polynomial(newTermList)
    }
}