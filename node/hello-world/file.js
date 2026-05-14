const fs = require('fs');

//fs.writeFileSync("./test.txt","Hello World");

// fs.writeFile("test.txt","This is also fine.",(err)=>console.log(err));

// let data;
// let contactNumber = "";
// let foundPlus = false;
// let splitString = '-';

// data = fs.readFileSync("./contact.txt","utf-8");
// console.log(data);

// for(let i = 0; i < data.length; i++)
// {
//     if(data.charAt(i) === splitString)
//     {
//         foundPlus = true;
//         continue;
//     }
        
//     if(foundPlus)
//         contactNumber += data.charAt(i);
// }

// console.log(contactNumber);

fs.appendFileSync("./test.txt",new Date().toLocaleDateString());

// console.log(fs.statSync("./test.txt"));

const os = require("os");

console.log(os.cpus().length);