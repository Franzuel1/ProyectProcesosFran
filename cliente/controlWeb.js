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
        });
    }
}