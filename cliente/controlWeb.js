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
        cadena = cadena + '<div><a href="/auth/google"><img src="./cliente/img/web_neutral_sq_SI@1x.png" style="height:40px;"></a></div>';
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
            cw.mostrarMsg("Bienvenido al sistema, " + nick);
        }
        else {
            cw.mostrarLogin();
            cw.init();
        }
    }

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            //client_id:"",
            client_id: "162867793-krmekskd7524g7fph19coq973942ls8d.apps.googleusercontent.com", //prod
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
        if ($.cookie('nick')) {
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
        if ($.cookie('nick')) {
            return true;
        };
        $("#fmLogin").remove();
        $("#registro").load("./cliente/login.html", function () {
            $("#btnLogin").on("click", function () {
                let email = $("#email").val();
                let pwd = $("#pwd").val();
                if (email && pwd) {
                    rest.loginUsuario(email, pwd);
                    console.log(email + " " + pwd);
                }
            });
        });
    }

    this.salir = function () {
        //localStorage.removeItem("nick");
        $.removeCookie("nick");
        location.reload();
        rest.cerrarSesion();
    }

    this.limpiar=function(){
        $("#mAU").remove();
        $("#fmRegistro").remove();
        $("#fmLogin").remove();
    }
}