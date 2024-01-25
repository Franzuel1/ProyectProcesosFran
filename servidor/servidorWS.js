const moduloWS = require("./servidor/servidorWS.js");

let ws = new moduloWS.ServidorWS();
let io = new Server();

function WSServer(io) {
    this.lanzarServer = function (io) {
        io.on('connection', function (socket) {
            console.log("Capa WS activa");
        });
    }
}
module.exports.WSServer = WSServer;

httpServer.listen(PORT, () => {
    console.log(`App está escuchando en el puerto ${PORT}`);
    console.log('Ctrl+C para salir');
});
io.listen(httpServer);
ws.lanzarServidor(io,sistema);
