import CasoDeUsoIniciarSesion from "../CasoDeUsoIniciarSesion"

describe('comportamiento caso de uso iniciar sesion', () => {

    const mockService = jest.fn()
    const mockCacheGuardar = jest.fn()
    let IUT

    beforeEach(() => {
        mockService.mockClear()
        mockCacheGuardar.mockClear()
        IUT = new CasoDeUsoIniciarSesion(mockService, { guardar: mockCacheGuardar })
    })

    it('deberia llamar al servicio inicio de sesion', async () => {
        const res = await IUT.execute("", "")

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("")
        expect(mockService.mock.calls[0][1]).toBe("")
        expect(res.error).toBe("ERROR_INESPERADO")
    })

    it('en caso de usuario incorrecto deberia responder apropiadamente', async () => {
        mockService.mockReturnValueOnce({error: "USUARIO_O_CONTRASENA_INCORRECTOS"})
        IUT = new CasoDeUsoIniciarSesion(() => ({ error: "USUARIO_O_CONTRASENA_INCORRECTOS" }), { guardar: mockCacheGuardar })

        const res = await IUT.execute("", "")

        expect(res.error).toBe("USUARIO_O_CONTRASENA_INCORRECTOS")
    })

    it('deberia guardar en cache el token y el nobmre de usuario', async () => {
        mockService.mockReturnValueOnce({token: "TEST_TOKEN"})

        const res = await IUT.execute("A", "B")

        expect(mockCacheGuardar.mock.calls.length).toBe(2)
        expect(mockCacheGuardar.mock.calls).toContainEqual(["usuario", "A"])
        expect(mockCacheGuardar.mock.calls).toContainEqual(["token", "TEST_TOKEN"])
    })

})