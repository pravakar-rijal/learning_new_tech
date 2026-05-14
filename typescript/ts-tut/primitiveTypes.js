"use strict";
//Steps to create a typescript project
//npm init -y :Initialize a project with npm
//npm i -D typescript :Add typescript as a package as a dev dependency
//npx tsc --init :Creates a tsconfig.json file for compiler configuration
//Add a script like "dev": "tsc && node test" :Here tsc causes the compiler to invoke and compile all the .ts files to js files and then node test.js runs the js file since the ts file cannot be run by the node interpreter
//Create a file if not already appended with .ts and then write code that adheres to the rules from typescript that is having all the static typing logic.
//Number
let a = 23; //implicit
let b = 23; //explicit
//a = "No"; Error becaues a is already defined as a number
//String
let c = "Ramesh";
//Same logic as number to the string
//Boolean
let d = true;
//Same logic of value of other types not being able to replace continues
//undefined - When a value has to replace
//null - when nothing is coming, non exist
let e = null;
e = "NO";
e = 2; // This is valid because whenever the type is null or undefined the compiler does not do type checking for this variable. so any data type can be stored in it.
let f = undefined; //union types
f = 2;
// f = "Hello"  This gives error because when specified we saw that f can either be number or undefined.
//void type : Whenever function does not return any value
const area = function (x) {
    x = 34;
};
