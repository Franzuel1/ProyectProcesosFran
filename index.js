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

app.get("/agregarUsuario/:nick",function(request,response){
    let nick=request.params.nick; 
    let res=sistema.agregarUsuario(nick);
    response.send(res);
    });

app.get("/obtenerUsuario/:nick",function(request,response){
    let lista=sistema.obtenerUsuarios();
    response.send(lista);
});

app.get("/eliminarUsuario/:nick", function(request,response){
    
});

app.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});