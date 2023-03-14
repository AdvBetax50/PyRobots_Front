import ServicioAbandonarPartida from "./datos/ServicioAbandonarPartida"
import CasoDeUsoAbandonarPartida from "./dominio/CasoDeUsoAbandonarPartida"
import ValidarAbandonarPartida from "./dominio/ValidarAbandonarPartida"


export default async function AbandonarPartida(id, unido, creador, handleFb) {
  const validador = ValidarAbandonarPartida(id, unido, creador)
  const caso_de_uso = new CasoDeUsoAbandonarPartida(ServicioAbandonarPartida)

  if (Object.keys(validador).length === 0) {
    caso_de_uso.execute(id).then(result => {
      if (result.error) {
        handleFb(true, result.error)
      }
      else if (result.exito) {
        handleFb(true, "Partida abandonada")
      }
      else {
        handleFb(true, "Error inesperado")
      }
    })
  }
  else {
    console.log(validador.error)
  }

}