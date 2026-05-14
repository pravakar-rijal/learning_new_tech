import { addition, subtraction} from './util';  //This is the way by which the named export can be imported. The drawback being that the function name that was in the util file cannot be changed here.

import div from './util';

// import div , {addition, subtraction } from './util'; This can also be done that is having both the default export and the named export

console.log(addition(1,3));
console.log(subtraction(4,2));

console.log(div(4,2));

//What happens when same named export is exported then the import will have something like
//import { simple } from './math/simple/util';
//import { simple } from './math/complex/util';

//In this case, a alias can be used. so instead of importing simple like in second line we can do 
//import { simple as complex } from './math/comlex/util';

//relative path ../

//Sometimes the constant can't be returned like
//export default const person = "tim";

// Instead
// const person = "tim";
// export default person;

//namespaces
//namespaces are not to be used instead use modules to import and export the function, codes, classes, variables
//To create namespace do

namespace CreatePerson{
    export function createNew(){
        return "This is cool";
    }

    export const NAME = "";

    export class MyClass{};

    export type newType = "";
}

//Now to use the function and other things with in the namespace we need to prefix those functions and things with namespace at the infront of it

const result = CreatePerson.MyClass; //Like this

//To use the namespace in another file, no need to export and import the namespace i.e, it can be accessed in another file and with in the namespace each entity needs to be exported


//So in larger projects a type file is created that includes all the type specification for all the different entities
//Since putting all the types in one file will get large in no time
//Typically, type for each directory is put in a file called types.ts file. 
//For example, for component there can be a ts type file designed only for the component directory