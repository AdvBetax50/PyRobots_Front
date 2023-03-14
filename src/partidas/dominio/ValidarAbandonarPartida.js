export default function ValidarAbandonarPartida(id, unido, creador) {
  // Partida invalida
  if (id === null || id === "") {
    return {error: "ID_INVALIDO"}
  }
  // Unido no es un dato valido
  if (!(unido === true || unido === false)) {
    return {error: "UNIDO_INVALIDO"}
  }
  // No esta unido
  if (!unido) {
    return {error: "USUARIO_NO_UNIDO"}
  }
  // Creador no es un dato valido
  if (!(creador === true || creador === false)) {
    return {error: "CREADOR_INVALIDO"}
  }
  // Es el creador
  if (creador) {
    return {error: "USUARIO_ES_CREADOR"}
  }

  return {}
}