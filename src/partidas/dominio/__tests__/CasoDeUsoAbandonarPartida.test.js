import CasoDeUsoAbandonarPartida from "../CasoDeUsoAbandonarPartida"

describe('comportamiento caso de uso abandonar partida', () => {

  const mockService = jest.fn()
  let IUT


  beforeEach(() => {
      mockService.mockClear()
      IUT = new CasoDeUsoAbandonarPartida(mockService)
  })


  it('Deberia devolver partida invalida', async () => {
      mockService.mockReturnValue({error: "PARTIDA_INVALIDA"})

      const res = await IUT.execute(null)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(null)

      expect(res.error).toBe("PARTIDA_INVALIDA")
  })

  it('deberia responder con error de usuario', async () => {
    mockService.mockReturnValue({error: "USUARIO_INVALIDO"})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("USUARIO_INVALIDO")
  })

  it('deberia responder si el usuario es el creador crea', async () => {
    mockService.mockReturnValue({error: "USUARIO_CREADOR"})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("USUARIO_CREADOR")
  })

  it('deberia responder si el usuario no esta unido', async () => {
    mockService.mockReturnValue({error: "USUARIO_NO_UNIDO"})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("USUARIO_NO_UNIDO")
  })

  it('deberia devolver un {exito: true}', async () => {
      mockService.mockReturnValue({exito: true})

      const res = await IUT.execute(1)

      expect(res.exito).toBe(true)
  })
})