export default function ValidarSubirRobot(usuario,
    nombre_robot, codigo_robot) {

    if (usuario === null || usuario === "") {
        return { error: "USUARIO_NO_ENCONTRADO"}
    }

    if (nombre_robot === null || nombre_robot === "") {
        return { error: "NOMBRE_ROBOT_INVALIDO"}
    }

    if (codigo_robot === null || codigo_robot === "" || !codigo_robot.match(/^.*\.py$/)) {
        return { error: "CODIGO_ROBOT_INVALIDO"}
    }

    return {}   
}
