import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";

const expressionExtractor = (expressionSrc = '',typeExpression = '') =>{
    let expression;
    switch (typeExpression) {
        case "arithmetic":
            break;
        case "algebraic":
            expression = extractAlgebraicExpression(expressionSrc)
            break;
        default:
            expression = 0;
    }
    return expression

}