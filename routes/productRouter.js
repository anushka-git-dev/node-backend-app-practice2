import express from 'express';
import { getAllProducts, saveProduct, deleteProductById, updateProductById } from '../controllers/productController.js';

const productRouter = express.Router();

// GET all products
productRouter.get('/', getAllProducts);

// POST (create) a new product
productRouter.post('/', saveProduct);

// DELETE a product by productID
productRouter.delete('/:productID', deleteProductById);

// PUT (update) a product by productID
productRouter.put('/:productID', updateProductById);

//export the productRouter
export default productRouter;
