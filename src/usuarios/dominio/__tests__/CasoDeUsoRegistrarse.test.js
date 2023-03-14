import CasoDeUsoRegistrarse from "../CasoDeUsoRegistrarse"

describe('comportamiento caso de uso registrarse', () => {

    const mockService = jest.fn()
    let IUT

    beforeEach(() => {
        mockService.mockClear()
        IUT = new CasoDeUsoRegistrarse(mockService)
    })

    it('deberia llamar al servicio registrarse', async () => {
        mockService.mockReturnValue({error : "ERROR_INESPERADO"})
        const res = await IUT.execute("a", "b", "c", "d")

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("a")
        expect(mockService.mock.calls[0][1]).toBe("b")
        expect(mockService.mock.calls[0][2]).toBe("c")
        expect(mockService.mock.calls[0][3]).toBe("d")
        expect(res.error).toBe("ERROR_INESPERADO")
    })

    it('en caso de usuario invalido deberia responder apropiadamente', async () => {
        mockService.mockReturnValue({error: "NOMBRE_INVALIDO"})
        IUT = new CasoDeUsoRegistrarse(mockService)

        const res = await IUT.execute("", "", "", "")

        expect(res.error).toBe("NOMBRE_INVALIDO")
    })

    it('en caso de correo invalido deberia responder apropiadamente', async () => {
        mockService.mockReturnValueOnce({error: "CORREO_INVALIDO"})
        IUT = new CasoDeUsoRegistrarse(mockService)

        const res = await IUT.execute("asd", "", "", "")

        expect(res.error).toBe("CORREO_INVALIDO")
    })

    it('en caso de contrasena invalida deberia responder apropiadamente', async () => {
        mockService.mockReturnValueOnce({error: "CONTRASENA_INVALIDA"})
        IUT = new CasoDeUsoRegistrarse(mockService)

        const res = await IUT.execute("asd", "a@gmail.com", "", "")

        expect(res.error).toBe("CONTRASENA_INVALIDA")
    })

    it('deberia registrar el usuario si no se le manda avatar', async () => {
        mockService.mockReturnValue({exito: "USUARIO_REGISTRADO"})
        IUT = new CasoDeUsoRegistrarse(mockService)

        const res = await IUT.execute("A", "a@gmail.com", "Contra-1", "")

        expect(res.exito).toBe("USUARIO_REGISTRADO")
    })

    it('deberia registrar el usuario si se le manda avatar', async () => {
        mockService.mockReturnValue({exito: "USUARIO_REGISTRADO"})
        IUT = new CasoDeUsoRegistrarse(mockService)

        const res = await IUT.execute("A", "a@gmail.com", "Contra-1", "asd")

        expect(res.exito).toBe("USUARIO_REGISTRADO")
    })

})