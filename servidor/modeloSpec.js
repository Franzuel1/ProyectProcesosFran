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
    sistema.agregarUsuario("nick"="Pepe1", "email"="pepe1@pepe.es");
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

  describe("Métodos que acceden a datos", function(){

    //let usrTest=("email":"test@test.es", "nick":"test")
    beforeEach(function(done){
      sistema.cad.conectar(function(){
        sistema.cad.registrarUsuario(usrTest, function(res){
          sistema.cad.ConfirmarCuenta(usrTest.email,function(){
            done();
          })
        })
        done();
      })
    })

    xit("Inicio de sesión correcto",function(){

    });

    xit("Inicio de sesión incorrecto",function(){

    });
  })
})
