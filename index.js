import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

//create express app
const app = express();

//set up middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
    const tokenString = req.header("Authorization");
    if(tokenString != null) {
        const token = tokenString.replace("Bearer ", "");

        jwt.verify(token, "secretkey123", (err, decoded) => {
            if (err) {
                res.status(401).send("Invalid token");
            } else {
                req.user = decoded;
                next();
            }
        })
    }
    else {next();}
});

//set up routes
app.use("/students", studentRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);


//Connect to database
//mongodb+srv://admin:<db_password>@cluster0.5vbrfis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb+srv://admin:admin@cluster0.5vbrfis.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to database");
}).catch(() => {
    console.log("Connection to database failed");
});


//listen to port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});



