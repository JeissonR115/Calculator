import {Term} from "./Term.js";
import {Fraction} from "../../arithmetic/Fraction.js";
import {Variable} from "./Variable.js";
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
    multiply(other = new Polynomial()){
        const termListA = this.termList;
        const termListB = other.termList;
        const resultTermList = [];
        termListA.forEach(termA => {
            termListB.forEach(termB => {
                const newTerm  = termA.multiply(termB)
                resultTermList.push(newTerm);
            })
        })
        return new Polynomial(resultTermList);
    }
}

const term1 = new Term(new Fraction(2), [new Variable('x', 2)]);//2x^2
const term2 = new Term(new Fraction(3), [new Variable('z', 1)]);//3z
const term3 = new Term(new Fraction(6), [new Variable('z', 1)]);//6z
const term4 = new Term(new Fraction(1), [new Variable('x', 1)]);//x

const polynomialA = new Polynomial([term1]);
const polynomialB = new Polynomial([term3,term4]);
const resultPolynomial = polynomialA.multiply(polynomialB);//( 2x^2 )(6z+x) =

console.log( resultPolynomial);
console.log(JSON.stringify(resultPolynomial, null, 4))