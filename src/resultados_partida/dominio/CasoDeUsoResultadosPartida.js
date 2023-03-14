export default class CasoDeUsoResultadosPartida {
  constructor(servicio) {
    this.servicio = servicio
  }

  async execute(id) {
    const result = await this.servicio(id) || {}

    if (result && result.lista) {
      const lista = result.lista
      
      if (lista.length < 2) {
        return {error: "CANTIDAD_INVALIDA"}
      }
      
      const errors = lista.map(element => {
        if (element.robotId === undefined) {
          return "NO_ROBOT_ID"
        }
        if (element.resultado === undefined) {
          return `NO_RESULTADO_${element.robotId}`
        }
        if (element.ganados === undefined) {
          return `NO_GANADOS_${element.robotId}`
        }
        if (element.perdidos === undefined) {
          return `NO_PERDIDOS_${element.robotId}`
        }
        if (element.empatados === undefined) {
          return `NO_EMPATADOS_${element.robotId}`
        }
        return undefined
      })
      
      const error = errors.find(e => !(e === undefined))
      if (error) {
        return {error: error}
      }

      return {lista: result.lista}
    }
    if (result && result.error) {
      return {error: result.error}
    }
    return {error: "ERRRO_INESPERADO"}
  }
}