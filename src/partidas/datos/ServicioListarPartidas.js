async function ServicioListarPartida(token) {
    
    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/partida/listar/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(r => r.json())
            .catch(e => ({ error: "ERROR_DE_CONEXION" }))

    console.log("Resultado de servicio = ", resultado) 
    
    if (resultado && resultado.lista) {
        return { lista: resultado.lista }
    } 
    // else if (resultado.error === "ERROR_DE_CONEXION"){
    //     return resultado
    // }
    else {
        return {error : "SOLICITUD_INVALIDA"}
    }
}

export default ServicioListarPartida;
      