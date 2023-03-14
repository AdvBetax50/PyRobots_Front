import pyRobotsFetch from "../../utilidades/pyRobotsFetch"

export default async function ServicioAbandonarPartida(id) {
  const form = new FormData()
  form.append("partidaId", id)

  const resultado = await pyRobotsFetch(
   `/partida/abandonar/`,
    { 
      method: "POST",
      body: form
    }
  )

  if (resultado && resultado.exito){
    return {exito: resultado.exito}
  }
  if (resultado && resultado.error) {
    return {error: resultado.error}
  }

  return {error: "ERROR_INESPERADO"}

}