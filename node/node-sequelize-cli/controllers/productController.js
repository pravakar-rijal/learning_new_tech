const ProductService = require("../services/productService");

class ProductController {

    async getAllProducts(req, res){
        try{
            const products = await ProductService.getAllProducts();
            return res.status(200).json(products);

        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }

    async createProduct(req, res){
        try{
            const {productName, productPrice, userId} = req.body;
            const createdProduct = await ProductService.createProduct({productName, productPrice, userId});
            return res.status(201).json(createdProduct);
            
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = new ProductController();