class CasoDeUsoCrearPartida {
    constructor(servicio) {
        this.servicio = servicio;
    }

    async execute(nombre, contra, jMax, jMin, juegos, rondas, robot) {
        const result = await this.servicio(nombre, contra, jMax, jMin, juegos, rondas, robot) || {}

        if (result.error) {
            return { error: result.error }
        }
        else if (result.websocket) {
            return { exito: result.websocket }
        }
        else {
            return { error: "ERROR_INESPERADO" }
        }
        
        
    }
}

export default CasoDeUsoCrearPartida;
