import {Term} from "./Term.js";
export class Polynomial{
    constructor(termList = [new Term()]) {
        this.termList = termList;
    }
}