const modelo = require("./modelo.js");

describe('El sistema...', function() {
    let sistema;
    
    beforeEach(function() {
      sistema=new modelo.Sistema()
    });
    
    it('Inicialmente no hay usuarios', function() {
      expect(sistema.numeroUsuarios()).toEqual(0);
    });
  
    it('Agregar usuario', function(){
      expect(sistema.numeroUsuarios()).toEqual(0);
      sistema.agregarUsuario("Pepe");
      expect(sistema.numeroUsuarios()).toEqual(1);
      expect(sistema.usuarios["Pepe"].nick).toEqual("Pepe");
    });
  
    it("Eliminar usuario", function(){
      expect(sistema.numeroUsuarios()).toEqual(0);
      sistema.agregarUsuario("Pepe");
      expect(sistema.numeroUsuarios()).toEqual(1);
      sistema.eliminarUsuario("Pepe");
      expect(sistema.numeroUsuarios()).toEqual(0);
    });
  
    it("Usuario activo", function(){
      sistema.agregarUsuario("Pepe");
      expect(sistema.usuarioActivo("Pepe")).toBeTrue();
    });
  
    it("Obtener usuarios", function(){
      let lista=sistema.obtenerUsuarios();
      expect(Object.keys(lista).length).toEqual(0);
      sistema.agregarUsuario("Pepe");
      sistema.agregarUsuario("Pepe1");
      lista=sistema.obtenerUsuarios();
      expect(Object.keys(lista).length).toEqual(2);
    });
  
    it("Numero usuarios", function(){
      let num=sistema.numeroUsuarios();
      expect(num).toBe(0);
      sistema.agregarUsuario("Pepe");
      sistema.agregarUsuario("Pepe1");
      num=sistema.numeroUsuarios();
      expect(num).toBe(2);
    });
  
  
  })