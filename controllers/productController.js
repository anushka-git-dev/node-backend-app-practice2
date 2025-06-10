import Product_model from "../models/products.js";
import { isAdmin } from "./userController.js";


//create product controller
export const getAllProducts = async (req, res) => {
    try {
        if (isAdmin(req)) {
            // Admin gets all products
            const products = await Product_model.find();
            res.status(200).json(products);
        } else {
            // Public users only see available products
            const products = await Product_model.find({ isAvailable: true });
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to save a new product
export function saveProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).send("Forbidden: Only admins can add products");
    }

    const newProduct = new Product_model(req.body);
    newProduct.save()
        .then(() => {
            res.send(`${req.body.name}'s data successfully saved`);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

// Delete a product by productID
export const deleteProductById = async (req, res) => {
    const productID = req.params.productID;

    try {
        const result = await Product_model.findOneAndDelete({ productID: productID });

        if (!result) {
            return res.status(404).send("Product not found");
        }

        res.send(`Product with ID ${productID} was deleted successfully`);
    } catch (error) {
        res.status(500).send("Error deleting product: " + error.message);
    }
};