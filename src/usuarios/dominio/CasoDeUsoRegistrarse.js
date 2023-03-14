class CasoDeUsoRegistrarse {
    constructor(servicioRegistrarse) {
        this.servicioRegistrarse = servicioRegistrarse
    }

    async execute(usuario, correo, contrasena, avatar) {
        const result = 
            await this.servicioRegistrarse(usuario, correo, contrasena, avatar) || {}

        if (result.error) {
            return { error: result.error }
        }
        else if (result.exito) {
            return { exito: result.exito }
        } else {
            return { error: "ERROR_INESPERADO" }
        }
    }
}

export default CasoDeUsoRegistrarse;