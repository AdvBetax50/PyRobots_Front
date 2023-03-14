import ServicioIniciarPartida from '../../datos/ServicioIniciarPartida';


describe('comportamiento servicio iniciar partida', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
        fetch.mockClear()
    })

    it('Deberia devolver usuario invalido', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("USUARIO_INVALIDO"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('USUARIO_INVALIDO')
    })

    it('Deberia devolver partida invalida', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("PARTIDA_INVALIDA"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('PARTIDA_INVALIDA')
    })

    it('Deberia devolver partida terminada', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("PARTIDA_TERMINADA"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('PARTIDA_TERMINADA')
    })

    it('Deberia devolver usuario no creador', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("USUARIO_NO_CREADOR"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('USUARIO_NO_CREADOR')
    })

    it('Deberia devolver faltan jugadores', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("FALTAN_JUGADORES"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('FALTAN_JUGADORES')
    })

    it('Deberia devolver error de conexion', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("ERROR_DE_CONEXION"))
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.error).toBe('ERROR_DE_CONEXION')
    })

    it('Deberia devolver resultado exitoso', async () => {
        global.fetch.mockReturnValue(
            Promise.resolve({
                json: () => Promise.resolve({ exito: true })
            })
        )
        const res = await ServicioIniciarPartida(1)
        expect(res.exito).toBe(true)
    })
})

