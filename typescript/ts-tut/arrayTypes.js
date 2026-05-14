"use strict";
//Array
// const arr = [2,4,5,6, "hello"];
// arr[0] + 1; This gives error even if the arr is type both string | number.
var _a;
const numberArray = [1, 3, 4]; //Indicates the arr of number 
const stringArray = [["Hello"], ["Hello"], ["Hello"]]; //Nested array should be specified like this
const emptyArray = []; //Dont do this because this specifies that type to any which we don't want.
const emtArray = []; //Do this instead
//Tuple
//Tuple are essentially a array of fixed length and type in ts
const coord = [1, 2]; //This makes it possible to type check the elements within the array as well.
const newCoord = [1, "str"];
newCoord[0];
newCoord[1]; //Here we can see that the type of each element can also be seen which was not the case with array
//Literals and enums
"hello";
23; //Theses are literals
let direction; //Can define the tuples that can be assigned 
direction = "east"; //Gives the options to choose between the values
let responseCodes; //Also the same logic
responseCodes = 200;
//Enums
//Collection of named constants linked with integer value
//Numeric Enums
var Size;
(function (Size) {
    Size[Size["Small"] = 0] = "Small";
    Size[Size["Medium"] = 1] = "Medium";
    Size[Size["Large"] = 2] = "Large";
})(Size || (Size = {}));
// We could have also done this with literal that is "small", "medium" and "large" but that would give no context like Size.Small does 
var size = Size.Small;
var Sizes;
(function (Sizes) {
    Sizes["M"] = "Medium";
    Sizes["XL"] = "Extra Large";
    Sizes["XXL"] = "Extra Extra Large";
})(Sizes || (Sizes = {}));
var shirtSizes = Sizes.M;
//Any and unknown types 
let anyThing = 1; //any causes the variable to ignore the type checking meaning any value can be assigned to the variable and so this should be used rarely and only in the situation when where there is confusion on the types to get.
let unknownThing = 1;
// unknownThing + 1; Here the unknown type gives error because it does not disable the type checking
// First, the type of the variable must be asserted that is known and only then the operation can be done with the variable
//We can also do type casting that is treat the variable as a type and then do the operations to the variable
const result = unknownThing + 1; //Here the unknownThing variable is type casted to a number
console.log(result); //typecast also does not see that if the operation being done is  valid or not so
// if(typeof unknownThing == 'number') This should be done instead.
function processFeedback(input) {
    console.log(`Processing: ${input}`);
}
function newProcessFeedback(input) {
    if (typeof input === 'number')
        console.log(`Processing Number: ${input}`);
    else if (typeof input === 'string') {
        console.log(`Processing String: ${input}`);
    }
    else if (input instanceof Blob) {
        console.log(`Processing Object: ${input}`);
    }
    else
        console.log(`Unsupported type`);
}
newProcessFeedback(5);
newProcessFeedback("This is good");
newProcessFeedback(new Blob());
newProcessFeedback([]);
const arr = [{ name: "tim" }, { name: "joe" }, { name: "jane" }];
const el = (_a = arr.pop()) === null || _a === void 0 ? void 0 : _a.name; //The question works by evaluating the code that is left of the ? and if it is undefined then gives undefined as a value without evaluting the .name parameter next //checking and moving forward
const ele = arr.pop().name; //This is bang operator which says that the operator will evaluate to the right value so the compiler does not have to worry. forcing and moving format
