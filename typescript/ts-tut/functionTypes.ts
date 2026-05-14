function add(x: number, y: number){
    if(x > 6)
        return "Value must be less than 6";
    else if(y < 0)
        return "Value must be greater than 0";

    return x + y;
}

const functionResult = add(3,4); //don't have to see the function definition itself to know that it takes two parameters which are both numbers and returns number

function makeName(firstName: string, lastName: string, middleName?: string) {//middleName: string = "middle name" //Here optional parameters are specified as middlename using ? symbol
    if(middleName)
        return `${firstName} ${middleName} ${lastName}`;
    else
        return `${firstName} ${lastName}`;
}

const resultName = makeName("Pravakar", "Rijal");

function summary(firstName: string, lastName: string, age: number): string{
    return `Iam ${firstName} ${lastName} and Iam ${age} years old`;
}



function callFunc(func:(firstName: string,lastName: string, middleName?: string) => string, param1: string, param2: string){
    func(param1, param2);
}

callFunc(makeName, "Ramesh", "Rai"); //Here while defining the function itself the type of function that was to be put here was defined with same logic as putting all other variables as well. just for the function we have to write syntax as (param1: type, param2: type, ...) => returned type

function callAnotherFunc(func:(firstName: string, lastName: string, age: number) => string, param1: string, param2: string, param3: number){
    func(param1, param2, param3);
}


function multiply (x: number, y: number = 2): number{
    return x * y;
}

function divide(x: number, y: number = 2): number{
    return x / y;
}

function applyFunc(func: ((x:number, y: number)=>number)[], values: [number, number][]): number[]{
    
    const results: number[] = [];

    for(let i = 0; i < func.length; i++){
        const args = values[i];
        const result = func[i](args[0], args[1]);
        results.push(result);
    }

    return results;
}

applyFunc([multiply, divide], [[1,2], [4,5]]);

//Advanced Function Types
//Rest Parameters
function sum(...numbers: number[]): number{
    let result: number = 0;

    for(const number of numbers){
        result += number;
    }

    return result;
}

sum(1,3,5,6,34);
sum();
sum(4,56,34,65,3,2,54);

//Overloaded Function
function getItemLength(name: string): number;
function getItemLength(names: string[]): number;
function getItemLength(nameOrNames: unknown): number{
    if(typeof nameOrNames === 'string')
        return nameOrNames.length;
    if(Array.isArray(nameOrNames))
        return nameOrNames.length;
        
    return 0;
}

getItemLength("Pravakar");
getItemLength(["Hero", "Villian", "Fight"]);