const express = require('express'); /*Importar os arquivos*/
const routes = express.Router();
const instructors = require('./instructors')

routes.get('/', function (req, res) {
    return res.redirect("/instructors")
});


routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
});

routes.get('/instructors/create', function (req, res) {
    return res.render('instructors/create')
});

routes.get('/instructors/:id', instructors.show);

routes.post("/instructors", instructors.post);

routes.get('/members', function (req, res) {
    return res.render("members")
});

/*Exportar os arquivos*/
module.exports = routes;