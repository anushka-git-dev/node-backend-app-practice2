import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "student"   //Types: admin, reguser, comuser
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false
    },
    img : {
        type : String,
        required : false,
        default : "https://avatar.iran.liara.run/public/boy?username=ash"
    }
});

const User_model = mongoose.model("users", userSchema);

export default User_model;

//anushkab@gmail.com [admin123]
//bihanim@gmail.com [123] & others are used same password

