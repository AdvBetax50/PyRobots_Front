import CasoDeUsoUnirsePartida from "../CasoDeUsoUnirsePartida";

describe('comportamiento caso de uso unirse partida', () => {

    const mockService = jest.fn()
    let IUT


    beforeEach(() => {
        mockService.mockClear()
        IUT = new CasoDeUsoUnirsePartida(mockService)
    })


    it('Deberia devolver solicitud invalida', async () => {
        mockService.mockReturnValue({error : "SOLICITUD_INVALIDA"})

        const res = await IUT.execute(null, null, null)

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe(null)
        expect(mockService.mock.calls[0][1]).toBe(null)
        expect(mockService.mock.calls[0][2]).toBe(null)

        expect(res.error).toBe("SOLICITUD_INVALIDA")
    })

    it('deberia responder con error de partida', async () => {
      mockService.mockReturnValue({error : "PARTIDA_INVALIDA"})
      
      const res = await IUT.execute(null, "", 2)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(null)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(2)

      expect(res.error).toBe("PARTIDA_INVALIDA")
    })

    it('deberia responder con usuario invalido', async () => {
      mockService.mockReturnValue({error : "USUARIO_INVALIDO"})
      
      const res = await IUT.execute(1, "", 2)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(1)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(2)

      expect(res.error).toBe("USUARIO_INVALIDO")
    })

    it('deberia responder con error de partida llena', async () => {
      mockService.mockReturnValue({error : "PARTIDA_LLENA"})
      
      const res = await IUT.execute(1, "", 2)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(1)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(2)

      expect(res.error).toBe("PARTIDA_LLENA")
    })

    it('deberia responder con error si el usuario ya esta unido', async () => {
      mockService.mockReturnValue({error : "USUARIO_YA_UNIDO"})
      
      const res = await IUT.execute(1, "", 2)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(1)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(2)

      expect(res.error).toBe("USUARIO_YA_UNIDO")
    })

    it('deberia responder con error si el robot es invalido', async () => {
      mockService.mockReturnValue({error : "ROBOT_INVALIDO"})
      
      const res = await IUT.execute(1, "", null)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(1)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(null)

      expect(res.error).toBe("ROBOT_INVALIDO")
    })

    it('deberia responder con error si la contrasena es invalida', async () => {
      mockService.mockReturnValue({error : "CONTRASENA_INVALIDA"})
      
      const res = await IUT.execute(1, "", 2)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(1)
      expect(mockService.mock.calls[0][1]).toBe("")
      expect(mockService.mock.calls[0][2]).toBe(2)

      expect(res.error).toBe("CONTRASENA_INVALIDA")
    })

    it('deberia responder con error de conexion', async () => {
        mockService.mockReturnValue({error : "ERROR_DE_CONEXION"})
        
        const res = await IUT.execute(1, "", 2)

        expect(mockService.mock.calls.length).toBe(1)
        expect(mockService.mock.calls[0][0]).toBe(1)
        expect(mockService.mock.calls[0][1]).toBe("")
        expect(mockService.mock.calls[0][2]).toBe(2)

        expect(res.error).toBe("ERROR_DE_CONEXION")
    })

    it('deberia devolver un websocket', async () => {
        mockService.mockReturnValue({websocket: "ws_url"})

        const res = await IUT.execute(1, "", 2)

        expect(res.websocket).toBe("ws_url")
    })
})