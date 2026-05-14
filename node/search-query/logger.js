const http = require("http");
const fs = require("fs");
const url = require("url");

let data = "";

const myServer = http.createServer((req,res)=>{
    console.log("Request Received...");

    data += new Date().toISOString() + "    " + req.headers.host + "    " + req.url + "\n";

    fs.appendFile("./log.txt",data,(err)=>{
        switch(req.url)
        {
            case '/':
                res.end("HomePage");
                break;
            case "/about":
                res.end("Hello, I am Pravakar Rijal");
                break;
            default:
                res.end("404 Not Found");
                break;
        }
    });
});


myServer.listen(8000,()=>{
    console.log("Server is listening on the port 8000...");
})