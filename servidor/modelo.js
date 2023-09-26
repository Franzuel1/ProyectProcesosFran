
function Sistema(){
    this.usuarios={}; //this.usuarios=[]
    this.agregarUsuario=function(nick){
        if (!this.usuarios[nick]){
            console.log("Nuevo usuario con nick: "+nick)
            this.usuarios[nick]=new Usuario(nick);
        }
        else{
            console.log("El nick "+nick+" esta en uso")
        }
    }
    this.obtenerUsuarios=function(){
        return this.usuarios;
    }
    this.obtenerTodosNick=function(){
        return Object.keys(this.usuarios)
    }
    this.usuarioActivo=function(nick){
        //return !(this.usuarios[nick]==undefined)
        return (nick in this.usuarios)
    }
    this.eliminarUsuario=function(nick){
        if(this.usuarios[nick]){
            delete this.usuarios[nick];
            console.log("Usuario "+nick+" eliminado");
        }
        else{
            console.log("El usuario no existe");
        }
    }
    this.numeroUsuarios=function(){
        //let lista=Object.keys(this.usuarios);
        //return lista.length;
        return Object.keys(this.usuarios).length;
    }
}

function Usuario(nick){
    this.nick=nick;
}

module.exports.Sistema=Sistema