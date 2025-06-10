import express from "express";
import { createNewUser, authenticateUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to create a new user (admin only)
userRouter.post("/", createNewUser);

// Route to login a user and return a JWT token
userRouter.post("/login", authenticateUser);

export default userRouter;
