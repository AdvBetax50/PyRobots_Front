async function ServicioRegistrarse(usuario, correo, contrasena, avatar) {
    const form = new FormData()
    form.append("nombre", usuario)
    form.append("correo", correo)
    form.append("contrasena", contrasena)
    form.append("avatar", avatar)

    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/usuario/registrar`,
        { 
            method: "POST",
            headers: {
                'Accept': 'application/json',
              },
            body: form
        }
    ).then(r => r.json())
        .catch(e => ({ error: "ERROR_DE_CONEXION" }))


    console.log(resultado)
    if (resultado && resultado.result && resultado.result === "USUARIO_REGISTRADO") {
        return { exito: resultado.result }
    } else if (resultado && resultado.result) {
        return { error: resultado.result }
    } else {
        return { error: "ERROR_DE_CONEXION" }
    }
}

export default ServicioRegistrarse;