const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/products', authenticateToken, productController.createProduct);
router.get('/products', authenticateToken, productController.getProducts);
router.put('/products/:id', authenticateToken, productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
