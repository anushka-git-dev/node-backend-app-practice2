import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: "pending"
    },
    labelledTotal : {
        type: Number,
        required: true          
    },
    total : {
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        altNames: [String],
        description: {
            type: String,
            required: true
        },
        images: {
            type: String,
            required: true
        },
        labelPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
}],
    date: {
        type: Date,
        default: Date.now
    }
});

const Order_model = mongoose.model("Order", orderSchema);

export default Order_model;