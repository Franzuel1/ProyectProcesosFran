function ControlWeb() {
    this.mostrarAgregarUsuario = function () {
        $('#bnv').remove();
        $('#mAU').remove();
        let cadena = '<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="nick">Nick:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="introduce un nick"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena = cadena + '<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_focus_web@2x.png" style="height:40px;"></a></div>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>';

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            if (nick) {
                $('#mAU').remove();
                rest.agregarUsuario(nick);
            }
        });
    }
    this.mostrarMsg = function (msg) {
        $('#mMsg').remove();
        let cadena = '<h3 id="mMsg">' + msg + '</h3>';
        $('#msg').append(cadena);
    }

    this.comprobarSesion = function () {
        //let nick=localStorage.getItem("nick");
        let nick = $.cookie("nick");
        if (nick) {
            cw.mostrarMensaje("Bienvenido al sistema, " + nick);
        }
        else {
            cw.mostrarRegistro();
            cw.init();
        }
    }

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            client_id: "xxxxxxxxxxx", //prod
            auto_select: false,
            callback: cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.handleCredentialsResponse = function (response) {
        let jwt = response.credential;
        let user = JSON.parse(atob(jwt.split(".")[1]));
        console.log(user.name);
        console.log(user.email);
        console.log(user.picture);
        //rest.enviarJwt(jwt);
    }

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: 'POST',
            url: '/enviarJwt',
            data: JSON.stringify({ "jwt": jwt }),
            success: function (data) {
                let msg = "El nick " + nick + " está ocupado";
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    msg = "Bienvenido al sistema, " + data.nick;
                    $.cookie("nick", data.nick);
                }
                else {
                    console.log("El nick ya está ocupado");
                }
                cw.limpiar();
                cw.mostrarMensaje(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(JSON.parse(xhr.responseText));
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
            //dataType:'json'
        });
    }

    this.mostrarRegistro = function () {
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html", function () {
            $("#btnRegistro").on("click", function () {
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    //rest.registrarUsuario(nick);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: 'POST',
            url: '/registrarUsuario',
            data: JSON.stringify({ "email": email, "password": password }),
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    $.cookie("nick", data.nick);
                    cw.limpiar();
                    cw.mostrarMensaje("Bienvenido al sistema, " + data.nick);
                    //cw.mostrarLogin();
                }
                else {
                    console.log("El nick está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }


    this.salir = function () {
        $.removeCookie("nick");
        location.reload();
    }
}