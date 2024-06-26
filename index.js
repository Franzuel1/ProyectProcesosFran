/*
git add .
git commit -m"cambios"
git push
*/

const fs = require("fs");
const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').Server(app);
const { Server } = require("socket.io");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");
const bodyParser = require("body-parser");

//
const haIniciado = function (request, response, next) {
    if (request.user) {
        next();
    }
    else {
        response.redirect("/")
    }
}
//
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/"));
app.use(cookieSession({
    name: 'Sistema',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let sistema = new modelo.Sistema();

app.get("/", function (request, response) {
    let contenido = fs.readFileSync(__dirname + "/cliente/index.html");
    response.setHeader("Content-type", "text/html");
    response.send(contenido);
});

app.get("/agregarUsuario/:email", function (request, response) {
    let email = request.params.email;
    let res = sistema.agregarUsuario(email); response.send(res);
});

app.get("/obtenerUsuarios", function (request, response) {
    let lista = sistema.obtenerUsuarios();
    response.send(lista);
});

app.get("/usuarioActivo/:email", function (request, response) {
    let email = request.params.email;
    let res = sistema.usuarioActivo(email);
    response.send(res);
});

app.get("/numeroUsuarios", function (request, response) {
    let res = sistema.numeroUsuarios();
    response.send(res);
});

app.get("/eliminarUsuario/:email", function (request, response) {
    let email = request.params.email;
    let res = sistema.eliminarUsuario(email);
    response.send(res);
});

app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));



app.get("/", function(request,response){
    let contenido=fs.readFileSync(__dirname+"/cliente/index.html");
    response.setHeader('Content-Type', 'text/html');
    response.send(contenido);
});

app.get("/agregarUsuario/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.agregarUsuario(email);
    response.send(res);
});

app.get("/obtenerUsuarios",function(request,response){  //app.get("/obtenerUsuarios",haIniciado,function(request,response){
    let lista=sistema.obtenerUsuarios();
    response.send(lista);
});    

app.get("/usuarioActivo/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.usuarioActivo(email);
    response.send(res);
});

app.get("/numeroUsuarios",function(request,response){
    let res=sistema.numeroUsuarios();
    response.send(res);
});

app.get("/eliminarUsuario/:email",function(request,response){
    let email=request.params.email;
    let res=sistema.eliminarUsuario(email);
    response.send(res);
})

app.listen(PORT, () => {
console.log('App está escuchando en el puerto ${PORT}');
console.log('Ctrl+C para salir');
});

app.get('/google/callback', 
 passport.authenticate('google', { failureRedirect: '/fallo' }),
 function(req, res) {
 res.redirect('/good');
});


app.get("/good", function(request,response){
    let email=request.user.emails[0].value;
    sistema.usuarioGoogle({'email':email},function(obj){
        response.cookie('email',obj.email);
        response.redirect('/');
    });
});

app.get("/fallo",function(request,response){
    response.send({email:"-1"})
});

app.post('/enviarJwt',function(request,response){
    let jwt=request.body.jwt;
    let user=JSON.parse(atob(jwt.split(".")[1]));
    let email=user.email;
    sistema.usuarioGoogle({'email':email},function(obj){  //sistema.buscarOCrearUsuario(email,function(obj){
        console.log({obj});
        response.send({'email':obj.email});
    })
});

app.post("/registrarUsuario", function (request, response) {
    sistema.registrarUsuario(request.body, function (res) {
        response.send({ "email": res.email });
    });
});


app.post("/loginUsuario", function (request, response) {
    sistema.loginUsuario(request.body, function (res) {
        response.send({ "email": res.email });
    });
});


app.post('/loginUsuario',passport.authenticate("local",{failureRedirect:"/fallo",successRedirect: "/ok"})
);

app.get("/ok",function(request,response){
    response.send({email:request.user.email})
});

app.get("/cerrarSesion",haIniciado,function(request,response){
    let email=request.user.email;
    request.logout();
    response.redirect("/");
    if (email){
        sistema.eliminarUsuario(email);
    }
});

app.get("/confirmarUsuario/:email/:key", function (request, response) {
    let email = request.params.email;
    let key = request.params.key;
    sistema.confirmarUsuario({ "email": email, "key": key }, function (usr) {
        if (usr.email != -1) {
            response.cookie('email', usr.email);
        }
        response.redirect('/');
    });
});