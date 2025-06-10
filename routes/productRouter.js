import express from 'express';
import { getAllProducts, saveProduct, deleteProductById } from '../controllers/productController.js';

const productRouter = express.Router();

// GET all products
productRouter.get('/', getAllProducts);

// POST (create) a new product
productRouter.post('/', saveProduct);

// DELETE a product by productID
productRouter.delete('/:productID', deleteProductById); // <-- Add this line

//export the productRouter
export default productRouter;
