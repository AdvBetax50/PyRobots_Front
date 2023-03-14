
const validators = {
    rondas: (value) => {
        if (isNaN(value)) {
            return "Ingresa un valor válido"
        }
        if (value < 1) {
            return "Ingresa más de una ronda."
        }
        if (value > 10000) {
            return "Ingresa menos de 10000 rondas."
        }
    },
    robots: (value) => {
        if (value.length < 2 || value.length > 4) {
            return "Selecciona entre 2 y 4 robots."
        }
    }
}

function ValidadorFormularioSimulacion({rondas, robots}) {
    const respuesta = {}
    let erroresRondas = validators.rondas(rondas || 0)
    let erroresRobots = validators.robots(robots || [])
    if (erroresRondas) { respuesta.rondas = erroresRondas }
    if (erroresRobots) { respuesta.robots = erroresRobots }
    return respuesta
}
function ValidadorCampoSimulacion(name, value) {
    return validators[name](value)
}

export { ValidadorCampoSimulacion, ValidadorFormularioSimulacion }