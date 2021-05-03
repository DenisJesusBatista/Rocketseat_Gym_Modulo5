const express = require('express'); /*Importar os arquivos*/
const routes = express.Router();

routes.get('/', function (req, res) {
    return res.redirect("/instructors")
});


routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
});

routes.get('/instructors/create', function (req, res) {
    return res.render('instructors/create')
});

routes.post("/instructors", function (req, res) {
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

    return res.send(req.body);

});

routes.get('/members', function (req, res) {
    return res.render("members")
});

/*Exportar os arquivos*/
module.exports = routes;