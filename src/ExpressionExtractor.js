import {extractAlgebraicExpression} from "./algebraic/algebraicExtractor.js";

const expressionExtractor = (expressionStr = '',typeExpression = '') =>{
    let expression;
    switch (typeExpression) {
        case "arithmetic":
            break;
        case "algebraic":
            expression = extractAlgebraicExpression(expressionStr)
            break;
        default:
            expression = 0;
    }
    return expression

}