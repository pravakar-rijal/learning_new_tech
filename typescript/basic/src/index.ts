let myName: string;
let meaningOfLife: number;
let isLoading: boolean;
let album: string | number; //union type

myName = "Jonas";
meaningOfLife = 42;
isLoading = true;
album = "Ben allen";
album = 34;   

const sum = (a: number, b: number): number => a + b;

let postId: string | number = "";
let isActive: number | boolean;
let re: RegExp = /\w+/g;

const PI: number = 3.1415;
const radius:number = 2;

const area = PI * radius * radius;
console.log(area);