import CasoDeUsoSubirRobot from "../CasoDeUsoSubirRobot";

describe('comportamiento caso de uso subir robot', () => {

    const mockService = jest.fn()
    let SRT


    beforeEach(() => {
        mockService.mockClear()
        SRT = new CasoDeUsoSubirRobot(mockService)
    })


    it('Deberia devolver solicitud invalida', async () => {
        mockService.mockReturnValue({error : "SOLICITUD_INVALIDA"})

        const res = await SRT.execute("", "", null, "")

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("")
        expect(mockService.mock.calls[0][1]).toBe("")
        expect(mockService.mock.calls[0][2]).toBe(null)
        expect(mockService.mock.calls[0][3]).toBe("")

        expect(res.error).toBe("SOLICITUD_INVALIDA")
    })

    it('deberia responder con error de conexion', async () => {
        mockService.mockReturnValue({error : "ERROR_DE_CONEXION"})
        
        const res = await SRT.execute("A", "A", "", "a.txt")

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("A")
        expect(mockService.mock.calls[0][1]).toBe("A")
        expect(mockService.mock.calls[0][2]).toBe("")
        expect(mockService.mock.calls[0][3]).toBe("a.txt")

        expect(res.error).toBe("ERROR_DE_CONEXION")
    })

    it('deberia devolver un id', async () => {
        mockService.mockReturnValue({id: 1})

        const res = await SRT.execute("A", "A", "", "a.txt")

        expect(res.exito).toBe(1)
    })
})