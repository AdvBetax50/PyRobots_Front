import CacheLocal from "../../utilidades/CacheLocal"


export default async function ServicioResultadosPartida(id) {
  const token = CacheLocal.cargar("token")

  const resultado = await fetch(
    `${process.env.REACT_APP_HOST}/partida/resultado/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    })
      .then(r => r.json())
      .catch(e => ({ error: "ERROR_DE_CONEXION" }))
  
  if (resultado && Array.isArray(resultado)) {
    return {lista: resultado}
  }
  if (resultado) {
    return {error: resultado}
  }
  return  {error: "ERROR_INESPERADO"}
}