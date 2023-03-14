
class CasoDeUsoIniciarSesion {
    constructor(servicioInicioSesion, cacheLocal) {
        this.servicioInicioSesion = servicioInicioSesion
        this.cacheLocal = cacheLocal
    }

    async execute(usuario, contrasena) {
        const result = await this.servicioInicioSesion(usuario, contrasena) || {}

        if (result.error) {
            return { error: result.error }
        }
        else if (result.token) {
            this.cacheLocal.guardar("token", result.token)
            this.cacheLocal.guardar("usuario", usuario)
            return {
                exito: true
            }
        } else {
            return { error: "ERROR_INESPERADO" }
        }
    }
}

export default CasoDeUsoIniciarSesion;