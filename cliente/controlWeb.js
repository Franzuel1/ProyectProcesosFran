function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        $('#bnv').remove();
        $('#mAU').remove();
        let cadena = '<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="email">email:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="email" placeholder="introduce un email"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '<div><a href="/auth/google"><img src="./cliente/img/web_neutral_sq_SI@1x.png" style="height:40px;"></a></div>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>';

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click", function () {
            let email = $("#email").val();
            if (email) {
                $('#mAU').remove();
                rest.agregarUsuario(email);
            }
        });
    }
    this.mostrarMsg = function (msg) {
        $('#mMsg').remove();
        let cadena = '<h3 id="mMsg">' + msg + '</h3>';
        $('#msg').append(cadena);
    }

    this.comprobarSesion = function () {
        //let email=localStorage.getItem("email");
        let email = $.cookie("email");
        if (email) {
            cw.mostrarMsg("Bienvenido al sistema, " + email);
        }
        else {
            cw.mostrarLogin();
            cw.init();
        }
    }

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            //client_id:"162867793-5a0fuv1dntbo103eaer1car72h9ssrjd.apps.googleusercontent.com",//desplegable
            client_id: "162867793-krmekskd7524g7fph19coq973942ls8d.apps.googleusercontent.com", //local
            auto_select: false,
            callback: cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.handleCredentialsResponse = function (response) {
        //console.log(response);
        let jwt = response.credential;
        let user = JSON.parse(atob(jwt.split(".")[1]));
        console.log(user.name);
        console.log(user.email);
        console.log(user.picture);
        rest.enviarJwt(jwt);
    }

    this.mostrarRegistro = function () {
        if ($.cookie('email')) {
            return true;
        };
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html", function () {
            $("#btnRegistro").on("click", function () {
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    //$("#mRegistro").remove();
                    rest.registrarUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.mostrarLogin = function () {
        if ($.cookie('email')) {
            return true;
        };
        this.limpiar();
        $("#fmLogin").remove();
        $("#registro").load("./cliente/login.html", function () {
            $("#btnLogin").on("click", function (event) {
                event.preventDefault();
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    rest.loginUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.mostrarJuego = function () {
        //DESCOMENTAR AL FINAL
        if ($.cookie('email') == undefined) {
            return true;
        };
        //
        // Código para mostrar la vista del juego
        $("#board").load("./cliente/connect4.html");
        document.getElementById('content').style.display = 'none';
        document.getElementById('game').style.display = 'flex';
        createBoard();
    };

    // $("#jugar").on("click", function () {
    //     cw.mostrarJuego();
    // });

    this.mostrarModal = function (m) {
        $("#msg").remove();
        let cadena = "<div id='msg'>" + m + "</div>";
        $('#mBody').append(cadena)
        $('#miModal').modal();
        // $('#btnModal').on('click',function(){
        // })
    }

    this.salir = function () {
        //localStorage.removeItem("email");
        $.removeCookie("email");
        location.reload();
        rest.cerrarSesion();
    }

    this.limpiar = function () {
        $("#mAU").remove();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
    }

    this.mostrarCrearPartida = function () {
        $('#crearPartida').remove();
        let cadena = '<div id="crearPartida">';
        cadena += '<button id="btnCrearPartida" class="btn btn-primary">Crear Partida</button>';
        cadena += '<div id="esperandoRival" style="display: none;">Esperando rival...</div>';
        cadena += '</div>';
        $("#acciones").append(cadena);

        $("#btnCrearPartida").on("click", function () {
            ws.crearPartida();
            mostrarEsperandoRival();
        });
    }

    this.mostrarUnirsePartida = function (partidas) {
        $('#unirsePartida').remove();
        let cadena = '<div id="unirsePartida">';
        cadena += '<h3>Partidas Disponibles</h3>';
        cadena += '<ul id="listaPartidas"></ul>'; // Aquí puedes usar una lista para mostrar las partidas disponibles
        cadena += '</div>';
        $("#acciones").append(cadena);

        actualizarListaPartidas(partidas);
    }
}

// Función para mostrar la animación de "esperando rival" al crear una partida
function mostrarEsperandoRival() {
    $('#esperandoRival').show();
}

// Función para actualizar la lista de partidas disponibles en la interfaz gráfica
function actualizarListaPartidas(partidas) {
    // Limpiar la lista de partidas
    $('#listaPartidas').empty();
    // Recorrer la lista de partidas y agregarlas a la interfaz gráfica
    partidas.forEach(function (partida) {
        $('#listaPartidas').append('<li>' + partida.codigo + '</li>'); // Por ejemplo, mostrar el código de la partida
    });
}