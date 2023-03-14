class CasoDeUsoUnirsePartida {
  constructor(servicio) {
      this.servicio = servicio;
  }

  async execute(id, contrasena, robot) {
      const result = await this.servicio(id, contrasena, robot) || {}

      if (result.error) {
          return { error: result.error }
      }
      else if (result.websocket) {
          return { websocket: result.websocket }
      }
      else {
          return { error: "ERROR_INESPERADO" }
      }
      
      
  }
}

export default CasoDeUsoUnirsePartida;