const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write("<html>");
        res.write("<head><title>Form</title></head>");
        res.write("<body>");
        res.write("<form action='/create-user' method='POST'><label>Username: </label><input type='text' name='username'><button>Submit</button></form>")
        res.write("</body>");
        res.write("</html>");
        res.end();
    }
    if(url === '/users')
        res.end("<html><head><title>User</title></head><body><ul><li>User1</li><li>User2</li></ul></body></html>");
    if(url === '/create-user' && method === 'POST'){
        const body = [];

        req.on('data',(chunk)=>{
            body.push(chunk);
        });

        req.on('close',() =>{
            const parsedText = Buffer.concat(body).toString();
            const username = parsedText.split('=')[1];
            res.end(`Welcome ${username}`);
            console.log(username);
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
