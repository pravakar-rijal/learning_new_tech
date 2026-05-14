const { Product } = require("../models");

class ProductService{
    async getAllProducts(){
        try{
            const products = await Product.findAll();
            return products;

        }catch(error){
            throw error;
        }
    }

    async createProduct({productName, productPrice, userId}){
        try{
            const createdProduct = await Product.create({productName, productPrice, userId});
            return createdProduct;

        }catch(error){
            throw error;
        }
    }
}


module.exports = new ProductService();