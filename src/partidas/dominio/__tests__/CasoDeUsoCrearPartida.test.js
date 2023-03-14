import CasoDeUsoCrearPartida from "../CasoDeUsoCrearPartida";

describe('comportamiento caso de uso crear partida', () => {

    const mockService = jest.fn()
    let CPT


    beforeEach(() => {
        mockService.mockClear()
        CPT = new CasoDeUsoCrearPartida(mockService)
    })


    it('Deberia devolver solicitud invalida', async () => {
        mockService.mockReturnValue({error : "SOLICITUD_INVALIDA"})

        const res = await CPT.execute("", null, null, null, null)

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("")
        expect(mockService.mock.calls[0][1]).toBe(null)
        expect(mockService.mock.calls[0][2]).toBe(null)
        expect(mockService.mock.calls[0][3]).toBe(null)
        expect(mockService.mock.calls[0][4]).toBe(null)

        expect(res.error).toBe("SOLICITUD_INVALIDA")
    })

    it('deberia responder con error de conexion', async () => {
        mockService.mockReturnValue({error : "ERROR_DE_CONEXION"})
        
        const res = await CPT.execute("AS", 4, 2, 5, 6)

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe("AS")
        expect(mockService.mock.calls[0][1]).toBe(4)
        expect(mockService.mock.calls[0][2]).toBe(2)
        expect(mockService.mock.calls[0][3]).toBe(5)
        expect(mockService.mock.calls[0][4]).toBe(6)

        expect(res.error).toBe("ERROR_DE_CONEXION")
    })

    it('deberia devolver un id', async () => {
        mockService.mockReturnValue({id: 1})

        const res = await CPT.execute("A", 4, 2, 100, 100)

        expect(res.exito).toBe(1)
    })
})