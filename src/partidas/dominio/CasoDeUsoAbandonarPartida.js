export default class CasoDeUsoAbandonarPartida {
    constructor(servicio) {
        this.servicio = servicio;
    }
  
    async execute(id) {
        const result = await this.servicio(id) || {}
  
        if (result.error) {
            return { error: result.error }
        }
        else if (result.exito) {
            return { exito: result.exito }
        }
        else {
            return { error: "ERROR_INESPERADO" }
        }
        
        
    }
}