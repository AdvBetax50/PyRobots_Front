import CacheLocal from "./CacheLocal";

function getHeadersPorDefecto() {
    const opcionesPorDefecto = {
        'Accept': 'application/json',
    }
    const token =  CacheLocal.cargar('token')
    if (token) {
        opcionesPorDefecto.token = token
    }
    return opcionesPorDefecto
}

function pyRobotsOptions(options) {
    const opciones = { ...options };
    opciones.headers = {
    ...getHeadersPorDefecto(),
    ...opciones.headers
    }
    return opciones;
}

export default function pyRobotsFetch(url, options) {
    return fetch(`${process.env.REACT_APP_HOST}${url}`, pyRobotsOptions(options))
        .then(r => r.json())
        .catch(e => ({ error: "ERROR_DE_CONEXION" }))
  }
