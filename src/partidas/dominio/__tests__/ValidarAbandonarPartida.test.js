import ValidarAbandonarPartida from "../ValidarAbandonarPartida"

describe('datos validos', () => {

  let IUT

  beforeEach(() => {
      IUT = ValidarAbandonarPartida
  })

  it('partida invalida', async () => {
    const res = IUT(null, null, null)

    expect(res.error).toBe("ID_INVALIDO")
  })

  it('unido es invalido', async () => {
    const res = IUT(1, null, null)

    expect(res.error).toBe("UNIDO_INVALIDO")
  })

  it('no esta unido', async () => {
    const res = IUT(1, false, null)

    expect(res.error).toBe("USUARIO_NO_UNIDO")
  })

  it('creador es invalido', async () => {
    const res = IUT(1, true, null)

    expect(res.error).toBe("CREADOR_INVALIDO")
  })

  it('es el creador de la partida', async () => {
    const res = IUT(1, true, true)

    expect(res.error).toBe("USUARIO_ES_CREADOR")
  })

  it('OK', async () => {
    const res = IUT(1, true, false)

    expect(res.error).toBe()
  })
})