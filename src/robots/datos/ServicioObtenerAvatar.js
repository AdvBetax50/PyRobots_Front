async function ServicioObtenerAvatar(id_robot) {
    
    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/robot/avatar/obtener/${id_robot}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(r => r.json())
            .catch(e => ({ error: "ERROR_DE_CONEXION" }))

    console.log("Resultado de servicio = ", resultado)    
     
    if (resultado) {
        return resultado
    } else {
        return {error : "SOLICITUD_INVALIDA"}
    }
}

export default ServicioObtenerAvatar;