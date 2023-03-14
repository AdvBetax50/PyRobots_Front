import CacheLocal from '../../utilidades/CacheLocal'
import pyRobotsFetch from '../../utilidades/pyRobotsFetch';

async function ServicioLanzarSimulacion(rondas, id_robots) {
    const resultado = await pyRobotsFetch(
        `/simulacion/ejecutar`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "usuario": CacheLocal.cargar('usuario'),
                "rondas": rondas,
                "robots": id_robots
            })
        }
    )
    return {
        ...(resultado?.resultados),
        error: resultado?.error
    }
}

export default ServicioLanzarSimulacion;