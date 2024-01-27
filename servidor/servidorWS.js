const moduloWS = require("./servidor/servidorWS.js");

let ws = new moduloWS.ServidorWS();
let io = new Server();

function WSServer(io) {
    this.lanzarServer = function (io) {
        io.on('connection', function (socket) {
            console.log("Capa WS activa");
        });
    }

    this.enviarAlRemitente = function (socket, mensaje, datos) {
        socket.emit(mensaje, datos);
    }
    this.enviarATodosMenosRemitente = function (socket, mens, datos) {
        socket.broadcast.emit(mens, datos);
    }
    this.enviarGlobal = function (io, mens, datos) {
        io.emit(mens, datos);
    }

}
module.exports.WSServer = WSServer;

httpServer.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});
io.listen(httpServer);
ws.lanzarServidor(io, sistema);

this.lanzarServidor = function(io, sistema) {
    io.on('connection', function(socket) {
        console.log("Capa WS activa");

        socket.on("crearPartida", function(datos) {
            let codigo = sistema.crearPartida(datos.email);
            if (codigo !== -1) {
                socket.join(codigo);
            }
            srv.enviarAlRemitente(socket, "partidaCreada", {"codigo": codigo});
            let lista = sistema.obtenerPartidasDisponibles();
            srv.enviarATodosMenosRemitente(socket, "listaPartidas", lista);
        });

        socket.on("unirAPartida", function(datos) {
            let codigo = datos.codigo;
            let resultado = sistema.unirAPartida(datos.email, codigo);
            if (resultado !== -1) {
                socket.join(codigo);
                srv.enviarAlRemitente(socket, "unidoAPartida", {"codigo": codigo});
                let lista = sistema.obtenerPartidasDisponibles();
                srv.enviarATodosMenosRemitente(socket, "listaPartidas", lista);
            }
        });
    });
};


