import User_model from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to allow only admins to create new users
export function createNewUser(req, res) {
    // Ensure the request is authenticated
    if (!req.user) {
        return res.status(401).send("Unauthorized: Login required");
    }

    // Only allow 'admin' role to create users
    if (req.user.role !== "admin") {
        return res.status(403).send("Forbidden: Only admins can create new users");
    }

    // Hash the incoming password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // Create a new user object
    const newUser = new User_model({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
        isBlocked: req.body.isBlocked,
        img: req.body.img
    });

    // Save the user to the database
    newUser.save()
        .then(() => {
            res.send(`${req.body.firstName}'s data successfully saved`);
        })
        .catch((err) => {
            res.status(500).send("Database error: " + err.message);
        });
}

// Function to authenticate user and return token
export function authenticateUser(req, res) {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    // Find user by email
    User_model.findOne({ email: loginEmail })
        .then((existingUser) => {
            if (!existingUser) {
                return res.status(404).send("User not found");
            }

            // Validate password
            const isPasswordCorrect = bcrypt.compareSync(loginPassword, existingUser.password);
            if (!isPasswordCorrect) {
                return res.status(401).send("Incorrect password");
            }

            // Generate JWT token with user info
            const token = jwt.sign(
                {
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    role: existingUser.role,
                    img: existingUser.img
                },
                "secretkey123",
                { expiresIn: "1h" }
            );

            res.status(200).send({ message: "Login successful", token: token });
        })
        .catch((err) => {
            res.status(500).send("Login error: " + err.message);
        });
}

export function isAdmin(req) {
    // Return true if user is logged in and role is admin
    return req.user && req.user.role === "admin";
}