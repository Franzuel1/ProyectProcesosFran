const modelo = require("./modelo.js");

describe('El sistema...', function () {
  let sistema;

  beforeEach(function () {
    sistema = new modelo.Sistema();
  });

  it('Inicialmente no hay usuarios', function () {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  });

  it('Agregar usuario', function () {
    let num = Object.keys(sistema.usuarios).length;
    expect(num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    //num=Object.keys(sistema.usuarios).length;
    //expect(num).toEqual(1);
    expect(sistema.usuarios["Pepe"].nick).toEqual("Pepe");
  });

  it("Eliminar usuario", function () {
    let res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
    sistema.agregarUsuario(usr);
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(1);
    let res2 = sistema.eliminarUsuario("pepe@pepe.es");
    expect(res2.nick).toEqual("Pepe");
    res2 = sistema.eliminarUsuario("Luis");
    expect(res2.nick).toEqual(-1);
    res = sistema.numeroUsuarios();
    expect(res.num).toEqual(0);
  });

  it("Usuario activo", function () {
    sistema.agregarUsuario(usr);
    let res = sistema.usuarioActivo("pepe@pepe.es");
    expect(res.activo).toEqual(true);
  });

  it("Obtener usuarios", function () {
    let lista = sistema.obtenerUsuarios();
    expect(Object.keys(lista).length).toEqual(0);
    sistema.agregarUsuario(usr);
    sistema.agregarUsuario("nick" = "Pepe1", "email" = "pepe1@pepe.es");
    lista = sistema.obtenerUsuarios();
    expect(Object.keys(lista).length).toEqual(2);
  });

  it("Número usuarios", function () {
    let res = sistema.numeroUsuarios();
    expect(res.num).toBe(0);
    sistema.agregarUsuario("Pepe");
    sistema.agregarUsuario("Pepe1");
    res = sistema.numeroUsuarios();
    expect(res.num).toBe(2);
  });

  //HECHO
  describe("Métodos que acceden a datos", function () {

    //let usrTest=("email":"test@test.es", "nick":"test")
    beforeEach(function (done) {
      sistema.cad.conectar(function () {
        sistema.cad.registrarUsuario(usrTest, function (res) {
          sistema.cad.ConfirmarCuenta(usrTest.email, function () {
            done();
          })
        })
        done();
      })
    })

    // Prueba para verificar el inicio de sesión correcto
    it("Inicio de sesión correcto", function (done) {
      // Simulamos un inicio de sesión con credenciales válidas
      sistema.iniciarSesion(usrTest.email, 'contraseñaCorrecta', function (resultado) {
        // Verificamos que el resultado sea verdadero, lo que indica que el inicio de sesión fue exitoso
        expect(resultado).toBeTruthy();
        // Indicamos que hemos terminado con la prueba
        done();
      });
    });

    // Prueba para verificar el inicio de sesión incorrecto
    it("Inicio de sesión incorrecto", function (done) {
      // Simulamos un inicio de sesión con credenciales incorrectas
      sistema.iniciarSesion(usrTest.email, 'contraseñaIncorrecta', function (resultado) {
        // Verificamos que el resultado sea falso, lo que indica que el inicio de sesión fue incorrecto
        expect(resultado).toBeFalsy();
        // Indicamos que hemos terminado con la prueba
        done();
      });
    });
  })

  //HECHO
  describe("Pruebas de las partidas", function () {
    let usr2;
    let usr3;
    beforeEach(function () {
      usr2 = { "nick": "Pepa", "email": "pepa@pepa.es" };
      usr3 = { "nick": "Pepo", "email": "pepo@pepo.es" };
      sistema.agregarUsuario(usr);
      sistema.agregarUsuario(usr2);
      sistema.agregarUsuario(usr3);
    });
    it("Usuarios y partidas en el sistema", function () {
      expect(sistema.numeroUsuarios()).toEqual(3);
      expect(sistema.obtenerPartidasDisponibles().length).toEqual(0);
    });

    it("Crear partida", function () {
      sistema.crearPartida(usr.email); // Suponiendo que usr es un usuario existente
      expect(sistema.obtenerPartidasDisponibles().length).toEqual(1);
    });

    it("Unir a partida", function () {
      sistema.crearPartida(usr.email); // Crear una partida
      var partidasDisponibles = sistema.obtenerPartidasDisponibles();
      sistema.unirAPartida(usr2.email, partidasDisponibles[0].codigo); // Unir al usuario 2 a la partida
      expect(sistema.partidas[0].jugadores.length).toEqual(2);
    });

    it("Un usuario no puede estar dos veces", function () {
      sistema.crearPartida(usr.email); // Crear una partida
      var partidasDisponibles = sistema.obtenerPartidasDisponibles();
      sistema.unirAPartida(usr.email, partidasDisponibles[0].codigo); // Intentar unir al mismo usuario a la partida nuevamente
      expect(sistema.partidas[0].jugadores.length).toEqual(1); // La longitud de jugadores no debe cambiar
    });

    it("Obtener partidas", function () {
      sistema.crearPartida(usr.email); // Crear una partida
      var partidasDisponibles = sistema.obtenerPartidasDisponibles();
      expect(partidasDisponibles.length).toEqual(1); // Debe haber una partida disponible
    });

  });
})
