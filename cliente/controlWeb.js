function ControlWeb(){
    this.mostrarAgregarUsuario=function(){
        let cadena='<div class="form-group">';
        cadena=cadena+'<label for="nick">Introduce el nick:</label>';
        cadena=cadena+'<input type="text" class="form-control" id="nick">';
        cadena=cadena+'<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena=cadena+'</div>';

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click",function(){
            // recoger el valor del input text
            // llamar al servidor usando rest
            let nick=$("#nick").val();
            if(nick){
                $('#mAU').remove();
                rest.agregarUsuario(nick);
            }
        });
    }
    this.mostrarMsg=function(msg){
        $('#mMsg').remove();
        let cadena='<h2 id="mMsg">'+msg+'</h2>';
        $('msg').append(cadena);
    }
}