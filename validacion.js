"use strict"
// constantes
const formulario = document.getElementById("formulario");
const input = document.getElementById("email");
const eliminar = document.getElementById("formulario-validacion");
const mensaje = document.getElementById("mensaje");
// validacion de campos completos
const campos = {
    email: false,
    msg: false
}
// validacion de expresiones regulares
const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
// añadir y sacar las clases
const validarFormulario = (e)=>{
    if (expresiones.correo.test(e.target.value)) {
        document.querySelector("#formulario-grupo p").classList.remove("formulario-text__activo");
        campos.email= true;
    }else if (e.target.value === '') {
        eliminar.classList.remove("formulario-validacion__estado-activo");        
        document.querySelector("#formulario-grupo p").classList.remove("formulario-text__activo");
    }
    else {
        eliminar.classList.add("formulario-validacion__estado-activo");
        document.querySelector("#formulario-grupo p").classList.add("formulario-text__activo");
    }
} 
const validarTexto = (e)=>{
    if (e.target.value === '') {
        campos.msg = false;
    }else {
        campos.msg = true;
    }
} 

// boton de vaciar el correo
eliminar.addEventListener("click", ()=>{
    input.value = "";
    eliminar.classList.remove("formulario-validacion__estado-activo");
    document.querySelector("#formulario-grupo p").classList.remove("formulario-text__activo");        
});
input.addEventListener("keyup", validarFormulario);
input.addEventListener("blur", validarFormulario);
mensaje.addEventListener("keyup", validarTexto);

// enviar datos de email con api
async function handleSendEmail(e){
    e.preventDefault();
    const fd = new FormData(this)

    const response = await fetch("https://formspree.io/f/xgebrlal",
        {
        method: "POST",
        body: fd,
        headers: {
            Accept: "application/json"
            }
        });
        // comprobar que no este vacio el mensaje
        if (response.ok && campos.email && campos.msg) {
            document.getElementById("formulario-enviado").classList.add("formulario-enviado-activo")
            setTimeout(() => {
                document.getElementById("formulario-enviado").classList.remove("formulario-enviado-activo")
            }, 3000);
            this.reset()
            console.log(response)
        }else {
            console.log("error")
            document.getElementById("formulario-error").classList.add("formulario-error-activo")
            setTimeout(() => {
            document.getElementById("formulario-error").classList.remove("formulario-error-activo")
        }, 2000);
        }
}
formulario.addEventListener("submit", handleSendEmail);
//SMOOTH SCROLL

$(document).ready(function(){
    let move = $(".desplazar");

    move.click(function(e){
        e.preventDefault();
        $("body, html").animate({
            scrollTop: $(this.hash).offset().top,
        },1000);
    });
});