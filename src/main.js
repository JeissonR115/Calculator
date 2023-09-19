import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";

console.log(extractAlgebraicExpression("(-2x^2z^5 +10-12)()(2x)"))
console.log(extractAlgebraicExpression("ds()()"))
const a = extractAlgebraicExpression("");
console.log(a)
console.log(extractAlgebraicExpression("-3"))