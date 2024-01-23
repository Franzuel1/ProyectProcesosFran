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
}