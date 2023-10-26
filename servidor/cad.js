const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios;

    this.buscarOCrearUsuario = function (usr, callback) {
        obtenerOCrear(this.usuarios, usr, callback);
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




    this.conectar = async function (callback) {
        let cad = this;
        let cliente = new mongo("mongodb+srv://franzuel:scipio@cluster0.ahptciy.mongodb.net/?retryWrites=true&w=majority");
        await cliente.connect();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
    }
}

module.exports.CAD = CAD;
