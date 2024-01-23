function ClienteRest() {
    this.agregarUsuario = function (email) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + email, function (data) {
            let msg = "El email " + email + " está ocupado";
            if (data.email != -1) {
                console.log("Usuario " + email + " ha sido registrado");
                msg = "Bienvenido al sistema, " + email;
                //localStorage.setItem("email",email);
                $.cookie("email", email);
            }
            else {
                console.log("El email ya está ocupado");
            }
            cw.mostrarMsg(msg);
        });
    }

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: 'POST',
            url: '/enviarJwt',
            data: JSON.stringify({ "jwt": jwt }),
            success: function (data) {
                let msg = "El email está ocupado";
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha sido registrado");
                    msg = "Bienvenido al sistema, " + data.email;
                    $.cookie("email", data.email);
                }
                cw.limpiar();
                console.log(msg);
                cw.mostrarMsg(msg);
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

    this.agregarUsuario2 = function (email) {
        $.ajax({
            type: 'GET',
            url: '/agregarUsuario/' + email,
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + email + " ha sido registrado")
                }
                else {
                    console.log("El email ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }
    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios", function (data) {
            console.log(data);
        });
    }
    this.numeroUsuarios = function () {
        $.getJSON("/numeroUsuarios", function (data) {
            console.log('Número de usuarios en el sistema es: ' + data.num);
        });
    }
    this.usuarioActivo = function (email) {
        $.getJSON("/usuarioActivo/" + email, function (data) {
            if (data.activo) {
                console.log("El usuario " + email + " está activo");
            }
            else {
                console.log("El usuario " + email + " NO está activo")
            }
        });
    }
    this.eliminarUsuario = function (email) {
        $.getJSON("/eliminarUsuario/" + email, function (data) {
            if (data.email != -1) {
                console.log("El usuario " + email + " ha sido eliminado");
            }
            else {
                console.log("El usuario " + email + " no se ha podido eliminar")
            }
        });
    }

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: 'POST',
            url: '/registrarUsuario',
            data: JSON.stringify({ "email": email, "password": password }),
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha sido registrado");
                    // mostrar un mensaje diciendo: consulta tu email
                    //$.cookie("email",data.email);
                    cw.limpiar();
                    //cw.mostrarMensaje("Bienvenido al sistema, "+data.email);
                    cw.mostrarLogin();
                }
                else {
                    //console.log("El email está ocupado");
                    //cw.mostrarMsg("El email está ocupado");
                    console.log("Hay un usuario registrado con ese email");
                    cw.mostrarMensajeLogin("Hay un usuario registrado con ese email");
                    cw.mostrarModal("No se ha podido registrar el usuario");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.loginUsuario = function (email, password) {
        $.ajax({
            type: 'POST',
            url: '/loginUsuario',
            data: JSON.stringify({ "email": email, "password": password }),
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha iniciado sesión");
                    // mostrar un mensaje diciendo: consulta tu email
                    $.cookie("email", data.email);
                    cw.limpiar();
                    cw.mostrarMsg("Bienvenido al sistema, " + data.email);
                }
                else {
                    console.log("No se ha podido iniciar sesión");
                    cw.mostrarMsg("El email está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: 'application/json'
        });
    }

    this.cerrarSesion = function () {
        $.getJSON("/cerrarSesion", function () {
            console.log("Sesión cerrada");
            $.removeCookie("email");
        });
    }

}