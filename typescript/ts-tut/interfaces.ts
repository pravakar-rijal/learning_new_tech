interface Person{
    name: string;
    age: number;
    height?: number;

    move: () => void
}

const person:Person = {
    name: "Rahul",
    age: 23,

    move(){
        console.log("Move forward");
    }
};

person.height = 3;
person.move();

//A object that has some properties of class but includes some other as well
interface Employee extends Person{
    employeeId: number;
}

const employee: Employee = {
    name: "Rakesh",
    age: 23,
    employeeId: 32,

    move() {
        console.log("I am moving to the office");
    },
}

interface Manager extends Employee, Person{
    employees: Employee[]
}

const manager: Manager = {
    employees: [employee],
    employeeId: 25,
    name: "Ramesh",
    age: 45,
    move() {
        console.log("Make all employee move forward");
    },
}

//Type interface when making objects having properties

