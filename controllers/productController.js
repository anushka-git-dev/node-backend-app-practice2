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

//Function to update a product by productID
export const updateProductById = async (req, res) => {

    if (!isAdmin(req)) {
        return res.status(403).send("Forbidden: Only admins can update products");
    }

    const productID = req.params.productID;
    const updateData = req.body;

    try {
        const updatedProduct = await Product_model.findOneAndUpdate(
            { productID: productID },
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }

        res.send(`Product with ID ${productID} was updated successfully`);
    } catch (error) {
        res.status(500).send("Error updating product: " + error.message);
    }
};

//Function to get one product by productID
export async function getProductById(req, res) {
    const productID = req.params.productID;

    try {
        const product = await Product_model.findOne({ productID: productID });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        if (!product.isAvailable && !isAdmin(req)) {
            return res.status(403).send("Forbidden: Product is not available for public viewing");
        }
        res.send(product);
    } catch (error) {
        res.status(500).send("Error retrieving product: " + error.message);
    }
}
