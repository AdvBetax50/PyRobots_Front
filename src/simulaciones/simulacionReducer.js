
const EVENTO = {
    ROBOTS_CARGADOS: 'ROBS_CARG',
    SIMULACION_SOLICITADA: 'SIM_SOL',
    SIMULACION_OBTENIDA: 'SIM_FIN',
    SIMULACION_REPRODUCIR: 'REP',
    SIMULACION_DETENER: 'DET',
    SIMULACION_REBOBINAR: 'SIM_REB',
    SIMULACION_SIGUIENTE: 'SIG',
    SIMULACION_ANTERIOR: 'ANT',
    SIMULACION_ELIMINAR: 'SIM_ELI',
    ACTUALIZACION_FORMULARIO: 'ROB_SEL',
    ERROR: 'ERROR',
}

// Clases de estado
const ESTADO = {
    CARGA_INICIAL: 0,
    FORMULARIO: 1,
    CARGA_SIM: 2,
    SIMULACION: 3,
    ERROR: 4,
}

const ERROR = {
    NO_HAY_ROBOTS: 'NO_HAY_ROBOTS'
}

const estadoInicial = {
    clase: ESTADO.CARGA_INICIAL,
    simulacion: undefined,
    posiciones: undefined,
    formulario: undefined,
    robots: undefined,
    ronda: undefined,
    reproduciendo: false,
}

const simulacionReducer = (estado, evento) => {
    switch (estado.clase) {
        case ESTADO.CARGA_INICIAL:
            switch (evento.tipo) {
                case EVENTO.ROBOTS_CARGADOS:
                    if (evento.robots && evento.robots.length > 0) {
                        return {
                            ...estado,
                            clase: ESTADO.FORMULARIO,
                            robots: evento.robots
                        }
                    } else {
                        return {
                            clase: ESTADO.ERROR,
                            error: ERROR.NO_HAY_ROBOTS
                        }
                    }
                default:
                    break
            }
            break
        case ESTADO.FORMULARIO:
            switch (evento.tipo) {
                case EVENTO.ACTUALIZACION_FORMULARIO:
                    return {
                        ...estado,
                        formulario: {
                            ...estado.formulario,
                            ...evento.actualizacion
                        }
                    }
                case EVENTO.SIMULACION_SOLICITADA:
                    return { ...estado, clase: ESTADO.CARGA_SIM }
                default:
                    break
            }
            break
        case ESTADO.CARGA_SIM:
            switch (evento.tipo) {
                case EVENTO.SIMULACION_OBTENIDA:
                    const { error, simulacion, posiciones } = evento?.data
                    if (error || !simulacion || !posiciones) {
                        return {
                            ...estado,
                            clase: ESTADO.FORMULARIO,
                            error: evento.data.error ?? 'Error inesperado.'
                        }
                    } else {
                        return {
                            ...estado,
                            clase: ESTADO.SIMULACION,
                            simulacion: simulacion,
                            posiciones: posiciones,
                            ronda: 0
                        }
                    }
                default: break
            }
            break
        case ESTADO.SIMULACION:
            switch (evento.tipo) {
                case EVENTO.SIMULACION_ANTERIOR:
                    return avanzarRonda(estado, -1) || estado
                case EVENTO.SIMULACION_SIGUIENTE:
                    return avanzarRonda(estado, 1) || estado
                case EVENTO.SIMULACION_REBOBINAR:
                    return {
                        ...estado,
                        ronda: 0
                    }
                case EVENTO.SIMULACION_REPRODUCIR:
                    return {
                        ...estado,
                        reproduciendo: true
                    }
                case EVENTO.SIMULACION_DETENER:
                    return {
                        ...estado,
                        reproduciendo: false
                    }
                case EVENTO.SIMULACION_ELIMINAR:
                    return {
                        ...estado,
                        clase: ESTADO.FORMULARIO,
                        simulacion: undefined,
                        posiciones: undefined,
                        reproduciendo: false,
                        ronda: 0
                    }
                default: break
            }
            break
        default:
            break
    }
    if (evento.tipo === EVENTO.ERROR) {
        return {
            ...estado,
            clase: ESTADO.ERROR,
            error: evento.mensaje
        }
    } else {
        return estado
    }
}

const avanzarRonda = (estado, cuanto) => {
    if (estado.simulacion) {
        const nuevaRonda = estado.ronda + cuanto
        if (nuevaRonda >= 0 && nuevaRonda < estado.simulacion.length) {
            return {
                ...estado,
                ronda: nuevaRonda
            }
        } else {
            return estado
        }
    }
}


export { EVENTO, ESTADO, ERROR, estadoInicial, simulacionReducer }