class Persona {
    // private name: string;
    public name: string
    protected age: number = 23;

    constructor(name: string){
        this.name = name;
    }

    greet(){
        console.log(`Hello, my name is ${this.name}`);
    }

    get getName(){
        return this.name;
    }

    set setName(name: string){
        this.name = name;
    }
}

const p1 = new Persona("Ram");
p1.getName;
p1.setName = "Ramesh";


//Abstract classes are not instantiated but can be extended to extend the behaviours
abstract class Animal{
    abstract makeSound(duration: number): void;

    move(duration: number){
        console.log("Moving along...");
        this.makeSound(duration); //Since makeSound is abstract method, we know that makeSound must be implemented first to use this method.
    }
}

class Dog extends Animal{

    makeSound(duration: number): void {
        console.log("Woof woof");
    }
}

const d1 = new Dog();
d1.move(1);


//Classes and Interfaces
interface Animalia{
    speak(): void
}

class Doggo implements Animalia{
    private name:string;
    private color: string;

    constructor(name: string, color: string){
        this.name = name;
        this.color = color;
    }

    speak(): void {
        console.log("Woof woof");
    }

    move(): void{
        console.log("I am moving");
    }
}

class Cat implements Animalia{
    speak(): void {
        console.log("Meow");
    }
}

const d2: Animalia = new Doggo("Tommy", "Brown"); //When it is left without giving type, it assumes the type of doggo so the methods like move and speak both are available but when it is typed as animal, only speak is available
d2.speak();

const c1 = new Cat();

let animal = c1;
animal = d2; //This is possible because animal does not take Dog or Cat as type but Animalia interface as a type so both are treated equally.

function makeSound(animal: Animalia){ //Here any object cat or dog can be passed which then implements the speak 
    animal.speak();
}

//So abstract classes have behaviour also but interfaces don't and help in treating two classses the same way

//Static Attributes
class Fish{
    static numberOfInstances: number = 0;

    constructor(){
        Fish.numberOfInstances++;
    }

    static noOfInstances(): number{
        return this.numberOfInstances;
    }
}

const f1 = new Fish();
console.log(Fish.noOfInstances());
const f2 = new Fish();
console.log(Fish.noOfInstances());
const f3 = new Fish();
console.log(Fish.noOfInstances());

//Generics
class DataStore {
    private items: number[] = [];

    addItem(item: number): void{
        this.items.push(item);
    }

    getItem(index: number): number{
        return this.items[index];
    }

    removeItem(index: number):void{
        this.items.splice(index, 1);
    }

    getAllItems(): number[]{
        return this.items;
    }
}

//The given class works only with integer type data while the following works with all:
class DataStores<T> {
    private items: T[] = [];

    addItem(item: T): void{
        this.items.push(item);
    }

    getItem(index: number): T{
        return this.items[index];
    }

    removeItem(index: number):void{
        this.items.splice(index, 1);
    }

    getAllItems(): T[]{
        return this.items;
    }
}

const newStore = new DataStores<string>(); //Here type is defined so any type of data can be worked with
newStore.addItem("Item1");

//Another Example of Generics with the help of a function
function generics<K, V>(key: K, value1: V, value2: V): V{
    if(key)
        return value1;
    else
        return value2;
}

generics<string, number>("String", 1, 2);

//Advanced Types

// function Coordinates(p1: [number, number], p2: [number, number]): [number, number]{
//     return p1;
// }

//This definition of the function looks too complex instead make a type 
type Coordinate = [number, number]; //Type alias //Here if we were making type for a object we would rather use interface than type alias but since we are working with primitive types, using type aliases is good.

function findCoordinates(p1: Coordinate, p2: Coordinate): Coordinate{
    return p1;
}

//Union and Intersection
type StringOrNumber = string | number | boolean; //So any of these three types can be inserted into the function below:

function acceptVal(value: StringOrNumber){
    return "great";
}

//Now, FOr the intersection
interface BusinessPartner{
    name: string;
}

interface ContactDetails{
    email: string;
    phone: string;
}

//So, another interface can be made that has both. so we can either extend these interfaces into another interfaces or also do:
type BusinessContact = BusinessPartner & ContactDetails;

function acceptAnotherValue(value: BusinessContact){

}

acceptAnotherValue({name: "Ramesh", email: "ramesh@gmail.com", phone: "9832131213"}); //so all three types of property object must be given

//Type Guard
//Using typeof, instanceof , in to see the actual type being operated

//Type Narrowing
type StringOrBoolean = string | boolean;

function findType(value: StringOrBoolean){
    if(typeof value === 'string'){
        return `This is a string`;
    }
    return 'this is a boolean';
}

//custom type guard with is
class Carro{
    public firstName: string;
    public lastName: string;

    constructor(firstName: string, lastName: string){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Perro{
    public firstName: string;

    constructor(firstName: string){
        this.firstName = firstName;
    }
}

// function getName(animal: Carro | Perro){
//     if(animal instanceof Carro)
//         return animal.firstName;
//     else
//         return animal.firstName;
// }

//The upper one was using instance of and now with in

// function getNamo(animal: Carro | Perro){
//     if("lastName" in animal)
//         return animal.firstName;
//     else
//         return animal.firstName;
// }

//The upper one looks at if the attribute is present in the object and then evaluates the below one is with is example

function isCarro(pet: Carro | Perro): pet is Carro{
    return (pet as Carro).lastName != undefined;
}

function getName(animal: Carro | Perro){
    if(isCarro(animal))
        return `Name is ${animal.firstName} ${animal.lastName}`;
    else
        return `Name is ${animal.firstName}`;

}

const newPerro = new Perro("Meow");
getName(newPerro);

//Discriminated Unions
//Here like that other operators like typeof, instanceof, in ; A additional attribute like type is included and based on that the type attribute the value is discriminated.
type Log = Warning | Info | Success; 

interface Warning{
    type: "warning";
    msg: string;
}

interface Info{
    type: "info";
    text: string;
}

interface Success{
    type: "success";
    message: string;
}

function getLog(value: Log){
    switch(value.type){
        case "info":
            console.log(value.text);
            break;
        case "success":
            console.log(value.message);
            break;
        case "warning":
            console.log(value.msg);
            break;
    }
}

//Utility Types
//Partial Utility Types
//When using partial utility types, the type has the attributes become optional

interface Todo{
    title: string;
    description: string;
}

const updateTodo = (todo: Partial<Todo>) => {           //Unlike otherwise both the attribute of Todo does not have to be included
    todo.description = "This is the description of the sorts"
}

//Readonly utility types
//When specified with Readonly then the attributes can only be read and cannot be written into
interface Something{
    title: string;
    description: string;
}

const updateSomething = (value: Readonly<Something>) => {
    // value.title = "New Title";  This cannot be done due to the face that the value is readonly entity
}


//Next utility type is Record, which makes key value pair
interface PageInfo{
    title: string;
}

const pages: Record<number, PageInfo> = {
    1: {title: "home"}   //Here home signifies the number and right hand side signifies the PageInfo object containing title attribute
}
//This example signigies that what the pages contains.

//Next utility type: Pick Type
//This helps not to create another type which might contain some of the attributes which might already be available in some other interface or type or instead we can pick some of the attributes of that type and make another type

interface Todo{
    id: number;
    title: string;
    completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Hero",
    completed: true
}

//Utility Type: Omit Type
// Same thing as the pick type but does the reverse thing of that so instead of picking the values to be picked signified by putting in right side. The right side now signifies the attributes that is not to be picked.

type TodoOmit = Omit<Todo, "id">

// This does the same thing as the pick one since it is omitting the id so the rest ones are title and completed like the pick one.

