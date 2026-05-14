const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', './views/add-product.html'));
});

router.post('/add-product', (req, res) => {
    let product = req.body.product;
    let htmlData;
    fs.readFile(path.join(__dirname, '..', 'views', 'shop.html'),'utf-8',(err, data) => {
        htmlData = data.toString();
        console.log(product);
        htmlData = htmlData.replace("[PRODUCT]",product);
        fs.writeFile(path.join(__dirname, '..', 'views', 'shop.html'), htmlData, (err) => {
            if(!err)
                console.log("File Written Successfully");
            res.status(301).redirect('/');
        });
    });
});

module.exports = router;