const http = require('http');
const PORT = 8000;

const server = http.createServer((req, res) => {
switch(req.url){
case '/home':
    res.end("Home Page");
    break;
case '/about':
    res.end('I was developed by Pravakar Rijal');
    break;
default:
    res.end("Resources Not Found");
    break;
}
res.end("This is the server talking...");
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});