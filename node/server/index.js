const http = require("http");

const myServer = http.createServer((req,res)=>{
    console.log("Request Received");
    res.end("Hello from the server");
});

myServer.listen(8000,()=>{
    console.log("Server Started...");
});