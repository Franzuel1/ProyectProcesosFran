require('dotenv').config();
const datos = require("./cad.js");
const correo = require("./email.js");
const bcrypt = require("bcrypt");

function Sistema() {
    this.usuarios = {};
    this.cad = new datos.CAD(); // Se crea una instancia de CAD

    // Método para conectar a la base de datos
    this.conectarBaseDatos = function () {
        // Verificar que la conexión no esté ya establecida
        if (!this.cad.estaConectado()) {
            // Conectar a la base de datos
            this.cad.conectar(function (db) {
                console.log("Conectado a Mongo Atlas");
            });
        } else {
            console.log("La conexión a la base de datos ya está establecida");
        }
    };

    // Llamar al método para conectar a la base de datos al instanciar el Sistema
    this.conectarBaseDatos();

    this.agregarUsuario = function (email) {
        let res = { "email": -1 };
        if (!this.usuarios[email]) {
            this.usuarios[email] = new Usuario(email);
            res.email = email;
            console.log("Nuevo usuario en el sistema: " + email);

            // Insertar registro de actividad
            let registro = {
                "tipo-operacion": "registroUsuario",
                "usuario": email,
                "fecha-hora": new Date()
            };
            this.cad.insertarLog(registro, function (err, result) {
                if (err) {
                    console.error("Error al insertar registro de actividad:", err);
                }
            });

        } else {
            console.log("El email " + email + " está en uso");
        }
        return res;
    };

    this.eliminarUsuario = function (email) {
        let res = { email: -1 };
        if (this.usuarios[email]) {
            delete this.usuarios[email];
            res.email = email;
            console.log("Usuario " + email + " eliminado");

            // Insertar registro de actividad
            let registro = {
                "tipo-operacion": "eliminarUsuario",
                "usuario": email,
                "fecha-hora": new Date()
            };
            this.cad.insertarLog(registro, function (err, result) {
                if (err) {
                    console.error("Error al insertar registro de actividad:", err);
                }
            });

        } else {
            console.log("El usuario no existe");
        }
        return res;
    };

    this.numeroUsuarios = function () {
        let lista = Object.keys(this.usuarios);
        let res = { num: lista.length };
        return res;
    };

    this.usuarioActivo = function (email) {
        let res = { activo: false };
        res.activo = (email in this.usuarios);
        return res;
    };

    this.obtenerUsuarios = function () {
        return this.usuarios;
    };

    this.obtenerTodosNick = function () {
        return Object.keys(this.usuarios);
    };

    this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (obj) {
            callback(obj);
        });
    };

    this.registrarUsuario = function (obj, callback) {
        let modelo = this;

        bcrypt.hash(obj.password, 10, function (err, hash) {
            if (err) {
                console.error(err);
                return callback({ "error": "Error al cifrar la clave" });
            }
            obj.password = hash;
            modelo.cad.buscarUsuario({ "email": obj.email }, function (usr) {
                if (!usr) {
                    obj.key = Date.now().toString();
                    obj.confirmada = false;
                    modelo.cad.insertarUsuario(obj, function (res) {
                        callback(res);
                    });
                    correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
                } else {
                    callback({ "email": -1 });
                }
            });
        });
    };

    this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": true }, function (usr) {
            if (usr) {
                bcrypt.compare(obj.password, usr.password, function (err, result) {
                    if (err) {
                        console.error(err);
                        return callback({ "error": "Error comparando las claves" });
                    }
                    if (result) {
                        callback(usr);
                    } else {
                        callback({ "email": -1 });
                    }
                });
            } else {
                callback({ "email": -1 });
            }
        });
    };

    this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario({ "email": obj.email, "confirmada": false, "key": obj.key }, function (usr) {
            if (usr) {
                usr.confirmada = true;
                modelo.cad.actualizarUsuario(usr, function (res) {
                    callback({ "email": res.email });
                });
            } else {
                callback({ "email": -1 });
            }
        });
    };

    this.crearPartida = function (email) {
        // Obtener el objeto usuario con el email proporcionado
        var usuario = this.usuarios.find(function (usuario) {
            return usuario.email === email;
        });

        // Si el usuario existe, procedemos
        if (usuario) {
            // Obtener un código único (puedes implementar la función obtenerCodigo() aquí)
            var codigoPartida = this.obtenerCodigo();

            // Crear una nueva partida con ese código
            var nuevaPartida = new Partida(codigoPartida);

            // Asignar al usuario como jugador de la partida
            nuevaPartida.jugadores.push(usuario);

            // Agregar la nueva partida a la colección de partidas
            this.partidas.push(nuevaPartida);
        }
    };

    this.unirAPartida = function (email, codigo) {
        // Obtener el usuario cuyo email es el proporcionado
        var usuario = this.usuarios.find(function (usuario) {
            return usuario.email === email;
        });

        // Obtener la partida cuyo código es el proporcionado
        var partida = this.partidas.find(function (partida) {
            return partida.codigo === codigo;
        });

        // Si existen el usuario y la partida, procedemos
        if (usuario && partida) {
            // Asignar al usuario a la partida
            partida.jugadores.push(usuario);
        } else {
            console.log("El usuario o la partida no existen.");
        }
    };

    // this.obtenerPartidasDisponibles = function () {
    //     let lista = [];
    //     for (var i = 0; i < this.partidas.length; i++) {
    //         var partida = this.partidas[i];
    //         // Comprobar si la partida está disponible (puedes definir tu lógica aquí)
    //         if (partida.jugadores.length < partida.maxJug) {
    //             // Obtener el email del creador de la partida
    //             var creador = ''; // Implementa la lógica para obtener el email del creador
    //             // Obtener el código de la partida
    //             var codigo = partida.codigo;
    //             // Crear un objeto JSON con esos dos datos
    //             var partidaInfo = {
    //                 creador: creador,
    //                 codigo: codigo
    //             };
    //             // Meter el objeto JSON en el array lista
    //             lista.push(partidaInfo);
    //         }
    //     }
    //     return lista;
    // };
}

function Usuario(usr) {
    this.nick = usr.nick;
    this.email = usr.email;
    this.clave;
}

module.exports.Sistema = Sistema;

function Partida(codigo) {
    this.codigo = codigo;
    this.jugadores = [];
    this.maxJug = 2;
}
