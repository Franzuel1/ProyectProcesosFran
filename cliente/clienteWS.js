function ClienteWS() {
    this.socket = undefined;
    this.email = ""; 
    this.codigo = ""; 

    this.ini = function () {
        this.socket = io.connect();
    };

    this.ini();

    this.socket.on("partidaCreada", function(datos) {
        console.log(datos.codigo);
        this.codigo = datos.codigo;
        // Mostrar que se está esperando un rival
        // Por ejemplo: mostrarEsperandoRival();
    }.bind(this));

    this.socket.on("listaPartidas", function(lista) {
        console.log(lista);
        // Mostrar la lista de partidas
        // Por ejemplo: mostrarListaPartidas(lista);
    });

    this.crearPartida = function () {
        this.socket.emit("crearPartida", { "email": this.email });
    };

    this.unirAPartida = function(codigo) {
        this.socket.emit("unirAPartida", { "email": this.email, "codigo": codigo });
    };
}
