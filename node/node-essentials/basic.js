import { appendFile, writeFile, readFile } from 'fs';

writeFile('./hello.txt', 'Hello from server and In case, I dont see you good morning, good afternoon and good night.',(error) => {
    console.log(error);
});

readFile('./hello.txt','utf-8',(error, data) => {
    console.log(data);
})


