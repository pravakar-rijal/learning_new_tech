"use strict";
//export can be done in two ways:
// named export:
// export function ...
//export {add, subtract, ...}
//These are the ways by which named entities can be exported.
Object.defineProperty(exports, "__esModule", { value: true });
exports.addition = addition;
exports.subtraction = subtraction;
function addition(x, y) {
    return x + y;
}
function subtraction(x, y) {
    return x - y;
}
// export {addition, subtraction};  Either this can be done or the upper one can be done.
