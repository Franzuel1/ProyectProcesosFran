function Sistema() {
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

    const datos = require("./cad.js");
    this.cad = new datos.CAD();
    this.cad.conectar(function (db) {
        console.log("Conectado a Mongo Atlas");
    });

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
                modelo.cad.insertarUsuario(obj, function (res) {
                    callback(res);
                });
            }
            else {
                callback({ "email": -1 });
            }
        });
    }

    this.buscarUsuario = function (obj, callback) {
        buscar(this.usuarios, { "email": obj.email }, callback);
    }

    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
    }

}

function Usuario(nick) {
    this.nick = nick;
    this.email;
    this.clave;
}

function buscar(coleccion, criterio, callback) {
    let col = coleccion;
    coleccion.find(criterio).toArray(function (error, usuarios) {
        if (usuarios.length == 0) {
            callback(undefined);
        }
        else {
            callback(usuarios[0]);
        }
    });
}

function insertar(coleccion, elemento, callback) {
    coleccion.insertOne(elemento, function (err, result) {
        if (err) {
            console.log("error");
        }
        else {
            console.log("Nuevo elemento creado");
            callback(elemento);
        }
    });
}

module.exports.Sistema = Sistema;