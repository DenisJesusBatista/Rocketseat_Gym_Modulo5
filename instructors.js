const fs = require('fs');
const data = require("./data.json");
const { age } = require("./utils");

exports.show = function (req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return id == instructor.id
    });

    if (!foundInstructor) return res.send("Instructors not found!")


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        create_at: ""
    }

    return res.render("instructors/show", { instructor })

}

//create
exports.post = function (req, res) {
    //req.query


    //requ.body
    // { "avatar_url": "http://google.com", "name": "Denis Jesus", "birth": "2021-05-03", "gender": "M", "services": "Teste" }


    //["avatar_url","name","birth","gender","services"]
    const keys = Object.keys(req.body)


    for (key of keys) {
        //requ.body.key == ""
        if (req.body[key] == "")
            return res.send("Please, fill all fields!")
    }

    req.body.birth = Date.parse(req.body.birth);

    req.body.create_at = Date.now();


    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!");

        return res.redirect("instructors")

    });

    // return res.send(req.body);

}

