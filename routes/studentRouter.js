import express from "express";
import { getStudents, addStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", getStudents);
studentRouter.post("/", addStudent);

export default studentRouter;

