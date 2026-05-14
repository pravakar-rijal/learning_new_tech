"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util"); //This is the way by which the named export can be imported. The drawback being that the function name that was in the util file cannot be changed here.
console.log((0, util_1.addition)(1, 3));
console.log((0, util_1.subtraction)(4, 2));
