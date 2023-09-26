/*
git add .
git commit -m"cambios"
git push
*/

const fs = require("fs");
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));

let sistema = new modelo.Sistema();

app.get("/", function (request, response) {
    var contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader("Content-type","text/html");
    response.send(contenido);
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});