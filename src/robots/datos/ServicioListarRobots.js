async function ServicioListarRobots(token) {
    
    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/robot/listar/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then(r => r.json())
            .catch(e => ({ error: "ERROR_DE_CONEXION" })) 
     
    if (resultado && !resultado.error) {
        return {lista: resultado}
    } else {
        return {error : "ERROR_DE_CONEXION"}
    }
}

export default ServicioListarRobots;