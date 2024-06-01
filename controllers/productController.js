const productModel = require('../models/productModel');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
});

const createProduct = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const newProduct = await productModel.createProduct(
            req.body.name,
            req.body.description,
            req.body.price,
            req.user.id
        );
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).send('Error creating product');
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await productModel.getProductsByUserId(req.user.id);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).send('Error fetching products');
    }
};

const updateProduct = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const updatedProduct = await productModel.updateProduct(
            req.params.id,
            req.body.name,
            req.body.description,
            req.body.price,
            req.user.id
        );
        if (!updatedProduct) return res.status(404).send('Product not found');
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).send('Error updating product');
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.deleteProduct(req.params.id, req.user.id);
        if (!deletedProduct) return res.status(404).send('Product not found');
        res.status(204).json(deletedProduct);
    } catch (err) {
        res.status(400).send('Error deleting product');
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};
