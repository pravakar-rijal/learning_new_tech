const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/add-product',(req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '../views/add-product.html'));
    fs
});

router.post('/add-product', (req, res, next) => {
    let htmlData;
    const product = req.body.product;
    console.log(product);
    const filePath = path.join(__dirname, '../views/shop.html');

    fs.readFile(filePath, (err, data) => {
        htmlData = data.toString();
        htmlData = htmlData.replaceAll("[PRODUCT]", `${product}`);
        console.log(htmlData);
        fs.writeFile(filePath, htmlData, () => {
            console.log("File written successfully");
            res.status(301).redirect('/');
        });
    })
});

module.exports = router;
