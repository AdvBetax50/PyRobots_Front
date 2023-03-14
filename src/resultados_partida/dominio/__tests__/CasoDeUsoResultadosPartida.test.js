import CasoDeUsoResultadosPartida from "../CasoDeUsoResultadosPartida"

describe('comportamiento caso de uso resultados de partida', () => {

  const mockService = jest.fn()
  let IUT


  beforeEach(() => {
      mockService.mockClear()
      IUT = new CasoDeUsoResultadosPartida(mockService)
  })


  it('Deberia devolver solicitud invalida', async () => {
      mockService.mockReturnValue({error : "SOLICITUD_INVALIDA"})

      const res = await IUT.execute(null)

      expect(mockService.mock.calls.length).toBe(1)
      expect(mockService.mock.calls[0][0]).toBe(null)

      expect(res.error).toBe("SOLICITUD_INVALIDA")
  })

  it('deberia responder con error de partida', async () => {
    mockService.mockReturnValue({error : "PARTIDA_INVALIDA"})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("PARTIDA_INVALIDA")
  })

  it('deberia responder con usuario invalido', async () => {
    mockService.mockReturnValue({error : "USUARIO_INVALIDO"})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("USUARIO_INVALIDO")
  })

  it('deberia responder con cantidad invalida de la lista', async () => {
    mockService.mockReturnValue({lista : [{}]})
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("CANTIDAD_INVALIDA")
  })

  it('deberia responder con no existe robotId', async () => {
    mockService.mockReturnValue({lista: 
      [
        {},
        {}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("NO_ROBOT_ID")
  })

  it('deberia responder con no existe resultado', async () => {
    mockService.mockReturnValue({lista: 
      [
        {robotId: 1},
        {}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("NO_RESULTADO_1")
  })

  it('deberia responder con no existe ganados', async () => {
    mockService.mockReturnValue({lista: 
      [
        {robotId: 1, resultado: "Empate"},
        {}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("NO_GANADOS_1")
  })

  it('deberia responder con no existe perdidos', async () => {
    mockService.mockReturnValue({lista: 
      [
        {robotId: 1, resultado: "Empate", ganados: 1},
        {}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("NO_PERDIDOS_1")
  })

  it('deberia responder con no existe empatados', async () => {
    mockService.mockReturnValue({lista: 
      [
        {robotId: 1, resultado: "Empate", ganados: 1, perdidos: 1},
        {}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res.error).toBe("NO_EMPATADOS_1")
  })

  it('deberia devolver la lista', async () => {
    mockService.mockReturnValue({lista: 
      [
        {robotId: 1, resultado: "Empate", ganados: 1, perdidos: 1, empatados: 1},
        {robotId: 2, resultado: "Empate", ganados: 1, perdidos: 1, empatados: 1}
      ]
    })
    
    const res = await IUT.execute(1)

    expect(mockService.mock.calls.length).toBe(1)
    expect(mockService.mock.calls[0][0]).toBe(1)

    expect(res).toStrictEqual({lista: 
      [
        {robotId: 1, resultado: "Empate", ganados: 1, perdidos: 1, empatados: 1},
        {robotId: 2, resultado: "Empate", ganados: 1, perdidos: 1, empatados: 1}
      ]
    })
  })
})