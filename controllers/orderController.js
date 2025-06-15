import Order_model from "../models/orders.js";
import Product_model from "../models/products.js";

/// Function to create a new order
export async function createOrder(req, res) {
    // Check user login
    if (!req.user) {
        res.status(403).send("Please login to create an order");
        return;
    }

    const orderInfo = req.body;

    // Validate request body
    if (!orderInfo || Object.keys(orderInfo).length === 0) {
        res.status(400).json({ message: "Missing order data" });
        return;
    }

    // Generate orderId - Format: CBC00001
    let orderId = "CBC00001";
    try {
        const lastOrder = await Order_model.find().sort({ date: -1 }).limit(1);
        if (lastOrder.length > 0) {
            const lastId = lastOrder[0].orderId;
            const idNumber = parseInt(lastId.replace("CBC", ""));
            orderId = "CBC" + (idNumber + 1).toString().padStart(5, '0');
        }
    } catch (error) {
        res.status(500).json({ message: "Error generating order ID" });
        return;
    }

    // Process each product in the order
    try {
        let total = 0;
        let labelledTotal = 0;
        const products = [];

        for (let i = 0; i < orderInfo.products.length; i++) {
            const requestedProduct = orderInfo.products[i];
            const item = await Product_model.findOne({ productID: requestedProduct.productId });

            // Check if product exists and is available
            if (!item) {
                return res.status(404).json({ message: `Product with ID ${requestedProduct.productId} not found` });
            }
            if (!item.isAvailable) {
                return res.status(400).json({ message: `Product with ID ${requestedProduct.productId} is not available` });
            }

            const qty = requestedProduct.quantity;

            products.push({
                productId: item.productID,
                name: item.name,
                altNames: item.altName,
                description: item.description,
                images: item.images[0],
                labelPrice: item.labelledPrice,
                price: item.price,
                quantity: qty
            });

            total += item.price * qty;
            labelledTotal += item.labelledPrice * qty;
        }

        // Create a new order document
        const newOrder = new Order_model({
            orderId: orderId,
            name: `${req.user.firstName} ${req.user.lastName}`,
            email: req.user.email,
            phone: orderInfo.phone,
            address: orderInfo.address,
            status: "pending",
            labelledTotal: labelledTotal,
            total: total,
            products: products
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", orderId: orderId });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
}
