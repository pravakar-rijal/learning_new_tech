"use strict";
class Persona {
    constructor(name) {
        this.age = 23;
        this.name = name;
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
}
const p1 = new Persona("Ram");
p1.getName;
p1.setName = "Ramesh";
//Abstract classes are not instantiated but can be extended to extend the behaviours
class Animal {
    move(duration) {
        console.log("Moving along...");
        this.makeSound(duration); //Since makeSound is abstract method, we know that makeSound must be implemented first to use this method.
    }
}
class Dog extends Animal {
    makeSound(duration) {
        console.log("Woof woof");
    }
}
const d1 = new Dog();
d1.move(1);
class Doggo {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    speak() {
        console.log("Woof woof");
    }
    move() {
        console.log("I am moving");
    }
}
class Cat {
    speak() {
        console.log("Meow");
    }
}
const d2 = new Doggo("Tommy", "Brown"); //When it is left without giving type, it assumes the type of doggo so the methods like move and speak both are available but when it is typed as animal, only speak is available
d2.speak();
const c1 = new Cat();
let animal = c1;
animal = d2; //This is possible because animal does not take Dog or Cat as type but Animalia interface as a type so both are treated equally.
function makeSound(animal) {
    animal.speak();
}
//So abstract classes have behaviour also but interfaces don't and help in treating two classses the same way
//Static Attributes
class Fish {
    constructor() {
        Fish.numberOfInstances++;
    }
    static noOfInstances() {
        return this.numberOfInstances;
    }
}
Fish.numberOfInstances = 0;
const f1 = new Fish();
console.log(Fish.noOfInstances());
const f2 = new Fish();
console.log(Fish.noOfInstances());
const f3 = new Fish();
console.log(Fish.noOfInstances());
//Generics
class DataStore {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getItem(index) {
        return this.items[index];
    }
    removeItem(index) {
        this.items.splice(index, 1);
    }
    getAllItems() {
        return this.items;
    }
}
//The given class works only with integer type data while the following works with all:
class DataStores {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getItem(index) {
        return this.items[index];
    }
    removeItem(index) {
        this.items.splice(index, 1);
    }
    getAllItems() {
        return this.items;
    }
}
const newStore = new DataStores(); //Here type is defined so any type of data can be worked with
newStore.addItem("Item1");
//Another Example of Generics with the help of a function
function generics(key, value1, value2) {
    if (key)
        return value1;
    else
        return value2;
}
generics("String", 1, 2);
function findCoordinates(p1, p2) {
    return p1;
}
function acceptVal(value) {
    return "great";
}
function acceptAnotherValue(value) {
}
acceptAnotherValue({ name: "Ramesh", email: "ramesh@gmail.com", phone: "9832131213" }); //so all three types of property object must be given
function findType(value) {
    if (typeof value === 'string') {
        return `This is a string`;
    }
    return 'this is a boolean';
}
//custom type guard with is
class Carro {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
class Perro {
    constructor(firstName) {
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
function isCarro(pet) {
    return pet.lastName != undefined;
}
function getName(animal) {
    if (isCarro(animal))
        return `Name is ${animal.firstName} ${animal.lastName}`;
    else
        return `Name is ${animal.firstName}`;
}
const newPerro = new Perro("Meow");
getName(newPerro);
function getLog(value) {
    switch (value.type) {
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
const updateTodo = (todo) => {
    todo.description = "This is the description of the sorts";
};
const updateSomething = (value) => {
    // value.title = "New Title";  This cannot be done due to the face that the value is readonly entity
};
const pages = {
    1: { title: "home" } //Here home signifies the number and right hand side signifies the PageInfo object containing title attribute
};
const todo = {
    title: "Hero",
    completed: true
};
// This does the same thing as the pick one since it is omitting the id so the rest ones are title and completed like the pick one.
