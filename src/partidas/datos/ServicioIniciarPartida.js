// import pyRobotsFetch from "../../utilidades/pyRobotsFetch";
import CacheLocal from "../../utilidades/CacheLocal";

export default async function ServicioIniciarPartida(id) {

  const token =  CacheLocal.cargar('token')
  const form = new FormData()
  form.append("partidaId", id)

  const resultado = await fetch(
    `${process.env.REACT_APP_HOST}/partida/iniciar/`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'token': token
      }, 
      body: form
    })
    .then(r => r.json())
    .catch(e => {
      console.log(e)
      switch(e.message){
        case "USUARIO_INVALIDO":
          return "USUARIO_INVALIDO"
        case "PARTIDA_INVALIDA":
          return "PARTIDA_INVALIDA"
        case "PARTIDA_TERMINADA":
          return "PARTIDA_TERMINADA"
        case "USUARIO_NO_CREADOR":
          return "USUARIO_NO_CREADOR"
        case "FALTAN_JUGADORES":
          return "FALTAN_JUGADORES"
        default:
          return "ERROR_DE_CONEXION"
      }
    })
  
  console.log("resultado servicio iniciar", resultado)
  if (resultado && resultado.exito){
    return {exito: resultado.exito}
  }
  else {
    return {error: resultado}
  }
}