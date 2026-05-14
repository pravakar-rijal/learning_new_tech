"use strict";
const person = {
    name: "Rahul",
    age: 23,
    move() {
        console.log("Move forward");
    }
};
person.height = 3;
person.move();
const employee = {
    name: "Rakesh",
    age: 23,
    employeeId: 32,
    move() {
        console.log("I am moving to the office");
    },
};
const manager = {
    employees: [employee],
    employeeId: 25,
    name: "Ramesh",
    age: 45,
    move() {
        console.log("Make all employee move forward");
    },
};
//Type interface when making objects having properties
