import Student_model from "../models/students.js";

export function getStudents(req, res) {
    Student_model.find()
        .then((data) => { res.send(data); })
        .catch((err) => { res.send(err); });
}

export function addStudent(req, res) {
    if(req.user == null){
        res.status(401).send("Unauthorized");
        return;   
    }

    if(req.user.role != "admin"){
        res.status(403).send("Forbidden");
        return;
    }

    const student = new Student_model(req.body);
    student.save()
        .then((data) => { res.send(req.body.name + "'s" + " data successfully saved"); })
        .catch((err) => { res.send(err); });
}
