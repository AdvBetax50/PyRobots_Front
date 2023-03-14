export default function ValidarCrearPartida(nombre,
                                            contra,
                                            jMax,
                                            jMin,
                                            juegos,
                                            rondas) {
    
    if (nombre === null || nombre === "") {
        return { error: "NOMBRE_INVALIDO"}
    }

    if (jMax == null || jMax < 2 || 4 < jMax) {
        return { error: "MAX_JUGADORES_INVALIDO"}
    }

    if (jMin == null || jMin < 2 || 4 < jMin) {
        return { error: "MIN_JUGADORES_INVALIDO"}
    }

    if (jMin > jMax) {
        return { error: "MAX_MIN_JUGADORES_INVALIDOS"}
    }

    if (juegos < 1 || juegos > 200) {
        return { error: "JUEGOS_INVALIDOS"}
    }

    if (rondas < 1 || rondas > 10000) {
        return { error: "RONDAS_INVALIDAS"}
    }

    return {}   
}
