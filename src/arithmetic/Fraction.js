export class Fraction {
    constructor(numerator = 0, denominator=1) {
        this.numerator = numerator;
        if (denominator === 0){
            throw "El denominador debe ser distinto de 0"
        }
        this.denominator = denominator;
    }
    greatestCommonDivisor(a, b) {
        let temporal;
        while (b !== 0) {
            temporal = b;
            b = a % b;
            a = temporal;
        }
        return a;
    }
    leastCommonMultiple(a, b) {
        return (a * b) / this.greatestCommonDivisor(a, b);
    }
    summer(other = new Fraction()) {
        const lcm = this.leastCommonMultiple(this.denominator, other.denominator);
        const differenceFractionCurrent = lcm / this.denominator;
        const differenceOtherFraction = lcm / other.denominator;
        const resultado = new Fraction();
        resultado.numerator = (differenceFractionCurrent * this.numerator) + (differenceOtherFraction * other.numerator);
        resultado.denominator = lcm;
        return resultado;
    }
    product(other = new Fraction()) {
        return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
    }
    quotient(other = new Fraction()) {
        return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
    }
    pow(exponent = 1) {
        return new Fraction(Math.pow(this.numerator, exponent), Math.pow(this.denominator, exponent));
    }
    simplify() {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        return new Fraction(this.numerator / gcd, this.denominator / gcd);
    }
    num(){return this.numerator / this.denominator;}
}