const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")


/*Chamar a função pra dentro do servidor*/

const server = express()




/*Usando arquivos staticos*/
server.use(express.static('public'));

server.use(routes);

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});


/*Iniciar o servidor*/
server.listen(5000, function () {
    console.log("server is running")

});