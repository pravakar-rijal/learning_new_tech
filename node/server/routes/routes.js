const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write("<html>");
        res.write("<head><title>Find Resources</title></head>");
        res.write("<body><form action='/cart' method='POST'><label>Url: </label><input autofocus type='text' name='url'><input type='submit' value='submit'></form></body>")
        res.write("</html>");
        res.write("")
        return res.end();
    }
    if(url === '/cart' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedText = Buffer.concat(body).toString();
            const parsedMessage = parsedText.split('=')[1];
            fs.writeFile('cartItems.txt', parsedMessage, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        });
    }
        return;
        res.setHeader('Content-Type','text/html');
        res.write('<html><head><title>Cart</title></head><body><h1>Cart</h1><p>There are 4 items in the cart.</p></body></html>');
        res.end();
};

module.exports = requestHandler;