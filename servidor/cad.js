const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios;

    this.buscarOCrearUsuario = function (usr, callback) {
        buscarOCrear(this.usuarios, usr, callback);
    }

    function buscarOCrear(coleccion, criterio, callback) {
        coleccion.findOneAndUpdate(criterio, { $set: criterio }, { upsert: true, returnDocument: "after", projection: { email: 1 } }, function (err, doc) {
            if (err) { throw err; }
            else {
                console.log("Elemento actualizado");
                console.log(doc.value.email);
                //console.log(doc);
                callback({ email: doc.value.email });
            }
        });
    }

    this.buscarUsuario = function (criterio, callback) {
        buscar(this.usuarios, criterio, callback);
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

    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
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

    this.actualizarUsuario = function (obj, callback) {
        actualizar(this.usuarios, obj, callback);
    }

    function actualizar(coleccion, obj, callback) {
        coleccion.findOneAndUpdate({ _id: ObjectId(obj._id) }, { $set: obj }, { upsert: false, returnDocument: "after", projection: { email: 1 } }, function (err, doc) {
            if (err) { throw err; }
            else {
                console.log("Elemento actualizado");
                //console.log(doc);
                //console.log(doc);
                callback({ email: doc.value.email });
            }
        });
    }



    this.conectar = async function (callback) {
        let cad = this;
        let cliente = new mongo("mongodb+srv://franzuel:scipio@cluster0.ahptciy.mongodb.net/?retryWrites=true&w=majority");
        await cliente.connect();
        const database = cliente.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
    }
}

module.exports.CAD = CAD;
