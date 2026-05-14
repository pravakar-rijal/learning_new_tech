const http = require("http");
const fs = require("fs");

let data = "Date"+"       "+ "Request From"+"     "+ "Requested URL"+"\n";
let hasHeaders = false;

const myServer = http.createServer((req,res)=>{
    console.log("Request is Received.");

    switch(req.url)
    {
        case '/':
            res.end("HomePage");
            break;

        case "/about":
            res.end("Hello!, Iam Pravakar Rijal");
            break;
        
        default:
            res.end("404 Not Found");
            break;
    }

    if(!hasHeaders)
    {
        if(req.url !== "/favicon.ico")
        {
            data += new Date().toLocaleDateString()+"   "+req.headers.host+"   "+req.url+"\n";
            hasHeaders = true;
        }
        else
            data = "";
    }
    else
        {
            if(req.url != "/favicon.ico")
            {
                data = new Date().toLocaleDateString()+"   "+req.headers.host+"   "+req.url+"\n";
            }
            else
                data = "";
        }
    fs.appendFile("log.txt",data,()=>{
        res.end("Hello from the server...");
    })
    
});

myServer.listen(8000,()=>{
    console.log("Server is started..");
})
