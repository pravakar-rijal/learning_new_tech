const http = require("http");

const myServer = http.createServer((req,res)=>{
    console.log("Request Received...");

    res.end("Hello from server...");
});

myServer.listen(8000,()=>{
    console.log("Server is running on port 8000...");
})

module.exports = myServer;