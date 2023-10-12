function ControlWeb(){
    this.mostrarAgregarUsuario=function(){
        $('#mAU').remove();
        let cadena='<div id="mAU" class="form-group">';
        cadena=cadena+'<label for="nick">Introduce el nick:</label>';
        cadena=cadena+'<input type="text" class="form-control" id="nick">';
        cadena=cadena+'<button id="btnAU" type="submit" class="btn btn-primary">Submit</button>';
        cadena=cadena+'</div>';

        $("#au").append(cadena); //au = agregar usuario

        $("#btnAU").on("click",function(){
            let nick=$("#nick").val();
            if (nick){
                $('#mAU').remove();
                rest.agregarUsuario(nick);
            }
        });
    }
    this.mostrarMsg=function(msg){
        $('#mMsg').remove();
        let cadena='<h3 id="mMsg">'+msg+'</h3>';
        $('#msg').append(cadena);
    }
}