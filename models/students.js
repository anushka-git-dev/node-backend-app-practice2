import mongoose from "mongoose";

//create "students" your model for the database
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    stream: String,
    email: String,
});

const Student_model = mongoose.model("students", studentSchema);

export default Student_model;