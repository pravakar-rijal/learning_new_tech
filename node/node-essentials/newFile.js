var name = "Max";
var age = 23;
var hasHobbies = true;

function summarizeUser(userName, userAge, userHasHobby){
    return 'Name is ' + userName + ', age is ' + userAge + ' and the has hobbies: ' + userHasHobby;
}

console.log(summarizeUser(name, age, hasHobbies));

const person = {
    name: "Pravakar Rijal",
    age: 23, 
    job: "Teacher",
    get hasDriverslicense(){
        return false;
    },
    summarize(){
        return `Iam ${this.name} and Iam ${this.age} years old. I am a ${this.job}. I ${this.hasDriverslicense ? "have a " : "don't have a "} drivers license. And I believe that i can do anything.ANYTHING!!!!!`
    }
}

console.log(person.hasDriverslicense);
console.log(person.summarize());
