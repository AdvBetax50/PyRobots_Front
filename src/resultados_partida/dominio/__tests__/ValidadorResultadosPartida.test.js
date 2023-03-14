import ValidadorResultadosPartida from "../ValidadorResultadosPartida"

describe('resultados de partida validos', () => {

  let IUT

  beforeEach(() => {
      IUT = ValidadorResultadosPartida
  })

  it('partida invalida', async () => {
    const res = IUT(null)

    expect(res.error).toBe("ID_INVALIDO")
  })

  it('partida inexistente', async () => {
    const res = IUT(-1)

    expect(res.error).toBe("ID_NO_EXISTE")
  })

 
  it('OK', async () => {
    const res = IUT(1)

    expect(res.error).toBe()
  })

})