import pyRobotsFetch from "../../utilidades/pyRobotsFetch";

export default async function ServicioUnirsePartida(id, contrasena, robot) {
  if (contrasena === ""){
    contrasena = undefined
  }
  const form = new FormData()
  form.append("partidaId", id)
  form.append("robotUsuario", robot)

  if (contrasena === "") {
    form.append("contrasena", " ")
  }
  else {
    form.append("contrasena", contrasena)
  }

  const resultado = await pyRobotsFetch(
   `/partida/unirse/`,
    { 
      method: "POST",
      body: form
    }
  )

  if (resultado && resultado.websocket){
    return {websocket: resultado.websocket}
  }
  if (resultado && resultado.error) {
    return {error: resultado.error}
  }

  return {error: "ERROR_INESPERADO"}

  }