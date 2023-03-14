import pyRobotsFetch from "../../utilidades/pyRobotsFetch";

async function ServicioInicioDeSesion(usuario, contrasena) {
    const form = new FormData()
    form.append("nombre", usuario)
    form.append("contrasena", contrasena)

    const resultado = await pyRobotsFetch(
        `/usuario/iniciarsesion`,
        { 
            method: "POST",
            body: form
        }
    )

    if (resultado && resultado.token) {
        return {token: resultado.token}
    } else if (resultado && resultado.error === "USUARIO_O_CONTRASENA_INCORRECTOS") {
        return { error: resultado.error }
    } else {
        // TODO: volver a ERROR_DE_CONEXION cuando se arregle backend.
        return { error: "USUARIO_O_CONTRASENA_INCORRECTOS" }
    }
}

// import sleep from "../../utilidades/sleep";

// async function ServicioMockInicioDeSesion(usuario, contrasena) {
//     await(sleep(2000))
//     console.log(`Se envia ${contrasena} y ${contrasena} al core.`)
//     if (contrasena === 'clave-maestra') return {token: "AAAAAA"}
//     else { return {error: "USUARIO_O_CONTRASENA_INCORRECTOS"}}
// }

export default ServicioInicioDeSesion;
