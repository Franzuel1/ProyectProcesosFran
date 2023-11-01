const datos = require("./cad.js");
function Sistema() {
    this.cad = new datos.CAD();
    this.usuarios = {}; //this.usuarios=[]
    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
            console.log("Nuevo usuario en el sistem: " + nick);
        }
        else {
            console.log("el nick " + nick + " está en uso");
        } return res;
    }
    this.obtenerUsuarios = function () {
        return this.usuarios;
    }
    this.obtenerTodosNick = function () {
        return Object.keys(this.usuarios);
    }
    this.usuarioActivo = function (nick) {
        //return !(this.usuarios[nick]==undefined)
        let res = { activo: false };
        res.activo = (nick in this.usuarios);
        return res;
    }
    this.eliminarUsuario = function (nick) {
        let res = { nick: -1 };
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
            res.nick = nick;
            console.log("Usuario " + nick + " eliminado");
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

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
            obj.nick = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) {
            if (!usr) {
                //el usuario no existe, luego lo puedo registrar
                obj.key = Date.now().toString();
                obj.confirmada = false;
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
                //correo.enviarEmail(obj.email,obj.key,"Confirmar cuenta");
                                        //correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            }
            else {
                callback({ "email": -1 });
            }
        });
    }

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

function Usuario(nick) {
    this.nick = nick;
    this.email;
    this.clave;
}

module.exports.Sistema = Sistema;