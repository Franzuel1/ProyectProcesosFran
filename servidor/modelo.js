const datos = require("./cad.js");
const correo = require("./email.js");
const bcrypt = require("bcrypt");
function Sistema() {
    this.cad = new datos.CAD();
    this.usuarios = {}; //this.usuarios=[]
    this.agregarUsuario = function (email) {
        let res = { "email": -1 };
        if (!this.usuarios[email]) {
            this.usuarios[email] = new Usuario(email);
            res.email = email;
            console.log("Nuevo usuario en el sistem: " + email);
        }
        else {
            console.log("el email " + email + " está en uso");
        } return res;
    }
    this.obtenerUsuarios = function () {
        return this.usuarios;
    }
    this.obtenerTodosNick = function () {
        return Object.keys(this.usuarios);
    }
    this.usuarioActivo = function (email) {
        //return !(this.usuarios[email]==undefined)
        let res = { activo: false };
        res.activo = (email in this.usuarios);
        return res;
    }
    this.eliminarUsuario = function (email) {
        let res = { email: -1 };
        if (this.usuarios[email]) {
            delete this.usuarios[email];
            res.email = email;
            console.log("Usuario " + email + " eliminado");
        }
        else {
            console.log("El usuario no existe");
        }
        return res;
    }
    this.numeroUsuarios = function () {
        let lista = Object.keys(this.usuarios);
        let res = { num: lista.length };
        return res;
    }

    this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (obj) {
            callback(obj);
        });
    }

    this.registrarUsuario=function(obj,callback){
        let modelo=this; 

        // if (!obj.email){ 
        //     obj.email=obj.email;
        // }

        bcrypt.hash(obj.password, 10, function (err, hash) {
            if (err) {
              console.error(err);
              return callback({ "error": "Error al cifrar la clave" });
            }
            obj.password = hash;
            modelo.cad.buscarUsuario({"email":obj.email}, function(usr){
            if (!usr) {
                obj.key = Date.now().toString();
                obj.confirmada = false;
                modelo.cad.insertarUsuario(obj,function(res){
                    callback(res);
                });
                correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
            }
            else {
                callback({"email":-1}); 
            } 
        }); 
    });
    }

/*
    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.email) {
            obj.email = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) { //({"email":obj.email}, async function (usr)
            if (!usr) {
                //el usuario no existe, luego lo puedo registrarc
                obj.key = Date.now().toString();
                obj.confirmada = false;
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
                correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            }
            else {
                callback({ "email": -1 });
            }
        });
    }
*/
    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario({"email":obj.email,"confirmada":true},function(usr){
            if (usr){
                bcrypt.compare(obj.password, usr.password, function (err, result) {
                    if (err) {
                        console.error(err);
                        return callback({ "error": "Error comparando las claves" });
                    }
                    if (result) {
                        callback(usr);
                    }
                    else {
                        callback({ "email": -1 });
                    }
                });
            } else {
                callback({ "email": -1 });
            }
        });
    }
/*
    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": true }, function (usr) {
            if (usr && usr.password == obj.password) {
                callback(usr);
            }
            else {
                callback({ "email": -1 });
            }
        });
    }
*/
    this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": false, "key": obj.key }, function (usr) {
            if (usr) {
                usr.confirmada = true;
                modelo.cad.actualizarUsuario(usr, function (res) {
                    callback({ "email": res.email }); //callback(res)
                })
            }
            else {
                callback({ "email": -1 });
            }
        })
    }

    this.cad.conectar(function (db) {
        console.log("Conectado a Mongo Atlas");
    });
}

function Usuario(usr) {
    this.nick = usr.nick;
    this.email = usr.email;
    this.clave;
}

module.exports.Sistema = Sistema;