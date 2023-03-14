class CasoDeUsoSubirRobot{
    constructor(servicioSubirRobot){
        this.servicioSubirRobot = servicioSubirRobot
    }

    async execute(nombre_usuario, nombre, avatar, codigo) {
        const result = await this.servicioSubirRobot(nombre_usuario, nombre, avatar, codigo) || {}
        
        if (result.error) {
            return { error: result.error }
        }
        else if (result.id) {
            return { exito: result.id }
        } else {
            return { error: "ERROR_INESPERADO" }
        }
    }
}

export default CasoDeUsoSubirRobot;
