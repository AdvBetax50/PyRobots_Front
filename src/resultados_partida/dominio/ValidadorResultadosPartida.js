export default function ValidadorResultadosPartida(id) {

  if (id === null || id === "") {
    return {error: "ID_INVALIDO"}
  }
  if (id < 1) {
    return {error: "ID_NO_EXISTE"}
  }

  return {}
}