import mongoose from "mongoose";

//product database structure
const productSchema = mongoose.Schema({
    productID : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altName : [
        {type : String}
    ],
    description : {
        type : String,
        required : true
    },
    images : [
        {type : String}
    ],
    labelledPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    }
});

//creating product model using mongoose
const Product_model = mongoose.model("products", productSchema);

//exporting product model
export default Product_model;
