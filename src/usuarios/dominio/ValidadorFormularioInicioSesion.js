
function ValidadorFromularioInicioSesion(form) {
    if ((form.usuario || "") === "") {
        return { usuario: "Rellena este campo." }
    }
    if ((form.usuario).includes(" ")) {
        return { usuario: "Este campo no puede contener espacios." }
    }
    if ((form.contrasena || "") === "") {
        return { contrasena: "Rellena este campo." }
    }
    return {}
}
export default ValidadorFromularioInicioSesion;