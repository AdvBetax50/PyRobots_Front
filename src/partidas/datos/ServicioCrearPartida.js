import CacheLocal from "../../utilidades/CacheLocal"

async function ServicioCrearPartida(nombre,
                                    contra, 
                                    jMax, 
                                    jMin, 
                                    jTotaltes,
                                    rTotales, robotUsuario) {
    const form = new FormData()
        form.append("nombre", nombre)
        form.append("jugadoresMax", jMax)
        form.append("jugadoresMin", jMin)
        form.append("juegosTotales", jTotaltes)
        form.append("rondasTotales", rTotales)
        form.append("robotUsuario", robotUsuario)
    if (contra === ""){
        form.append("contrasena", " ")
    }else{
        form.append("contrasena", contra)
    }

    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/partida/crear/`, {
        method: "POST",
        headers: {
            'token': CacheLocal.cargar('token'),
            'Accept': 'application/json',
        },
        body: form
        }
    ).then(r => r.json())
        .catch(e => ({ error: "ERROR_DE_CONEXION"}))

    if (resultado && resultado.websocket){
        return {websocket: resultado.websocket}
    } else {
        return {error : "SOLICITUD_INVALIDA"}
    }
}

export default ServicioCrearPartida;
