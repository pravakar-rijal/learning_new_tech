"use strict";
function add(x, y) {
    if (x > 6)
        return "Value must be less than 6";
    else if (y < 0)
        return "Value must be greater than 0";
    return x + y;
}
const functionResult = add(3, 4); //don't have to see the function definition itself to know that it takes two parameters which are both numbers and returns number
function makeName(firstName, lastName, middleName) {
    if (middleName)
        return `${firstName} ${middleName} ${lastName}`;
    else
        return `${firstName} ${lastName}`;
}
const resultName = makeName("Pravakar", "Rijal");
function summary(firstName, lastName, age) {
    return `Iam ${firstName} ${lastName} and Iam ${age} years old`;
}
function callFunc(func, param1, param2) {
    func(param1, param2);
}
callFunc(makeName, "Ramesh", "Rai"); //Here while defining the function itself the type of function that was to be put here was defined with same logic as putting all other variables as well. just for the function we have to write syntax as (param1: type, param2: type, ...) => returned type
function callAnotherFunc(func, param1, param2, param3) {
    func(param1, param2, param3);
}
function multiply(x, y = 2) {
    return x * y;
}
function divide(x, y = 2) {
    return x / y;
}
function applyFunc(func, values) {
    const results = [];
    for (let i = 0; i < func.length; i++) {
        const args = values[i];
        const result = func[i](args[0], args[1]);
        results.push(result);
    }
    return results;
}
applyFunc([multiply, divide], [[1, 2], [4, 5]]);
//Advanced Function Types
//Rest Parameters
function sum(...numbers) {
    let result = 0;
    for (const number of numbers) {
        result += number;
    }
    return result;
}
sum(1, 3, 5, 6, 34);
sum();
sum(4, 56, 34, 65, 3, 2, 54);
function getItemLength(nameOrNames) {
    if (typeof nameOrNames === 'string')
        return nameOrNames.length;
    if (Array.isArray(nameOrNames))
        return nameOrNames.length;
    return 0;
}
getItemLength("Pravakar");
getItemLength(["Hero", "Villian", "Fight"]);
