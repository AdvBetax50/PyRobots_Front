export default function ValidarUnirsePartida(id, contrasena_validar, contrasena, 
    unido, unidos, maximos, robot){
    
    if (id === null || id === "") {
        return {error: "Partida invalida"}
    }

    if (!(id >= 1 )) {
        return {error: "Partida tiene id inexistente"}
    }

    if (unido) {
        return({error: "Ya esta unido a la partida"})
    }

    if (contrasena && (contrasena_validar === null || contrasena_validar === "")) {
        return({contrasena_validar: "Se necesita una contraseña para unirse a la partida"})
    }

    if (!contrasena && !(contrasena_validar === null || contrasena_validar === "")) {
        return {contrasena_validar: "No debería haber contraseña"}
    }

    if (unidos === null || unidos === "") {
        return {error: "No se sabe cuantos jugadores estan unidos a la partida"}
    }

    if (maximos === null || maximos === "") {
        return {error: "No se sabe cuantos jugadores entran en la partida"}
    }

    if (maximos <= unidos) {
        return {error: "Partida llena"}
    }

    if (robot === null || robot === "") {
        return {robot: "Debe seleccionar algún robot"}
    }

    if (!robot >= 1) {
        return {robot: "Ese robot no existe"}
    }

    return ({})
}