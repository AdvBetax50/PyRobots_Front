export default function ValidadorFormularioRegistrarse(form) {
    if ((form.usuario || "") === "") {
        return { usuario: "Rellena este campo." }
    }
    if ((form.usuario).includes(" ")) {
        return { usuario: "Este campo no puede contener espacios." }
    }

    if ((form.correo || "") === "") {
        return { correo: "Rellena este campo." }
    }
    if (!(form.correo.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
        return { correo: "Ingrese un correo valido."}
    }
    
    if ((form.contrasena || "") === "") {
        return { contrasena: "Rellena este campo." }
    }
    if (!(form.contrasena.length <= 20 && 8 <= form.contrasena.length)) {
        return {contrasena: "La contraseña debe tener entre 8 y 20 caracteres."}
    }
    if ((form.contrasena === (form.contrasena).toLowerCase())) {
        return { contrasena: "La contraseña debe tener alguna mayúscula."}
    }
    if ((form.contrasena === (form.contrasena).toUpperCase())) {
        return { contrasena: "La contraseña debe tener alguna minúscula."}
    }
    if (!(form.contrasena.includes("-"))) {
        return { contrasena: "La contraseña debe contener algun guión."}
    }
    if (!(/\d/.test(form.contrasena))) {
        return { contrasena: "La contraseña debe contener algun número."}
    }

    if ((form.contrasena2 || "") === "") {
        return { contrasena2: "Rellena este campo." }
    }
    if (!(form.contrasena === form.contrasena2)) {
        return { contrasena2: "Las contraseñas deben coincidir." }
    }

    return {}
}
