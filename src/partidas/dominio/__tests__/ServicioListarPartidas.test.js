
import ServicioListarPartida from '../../datos/ServicioListarPartidas';


describe('comportamiento servicio listar partida', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
        fetch.mockClear()
    })

    it('Deberia devolver solicitud invalida', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("Fallo to"))
        )

        const res = await ServicioListarPartida("TOKENFALSO")
        expect(res.error).toBe('SOLICITUD_INVALIDA')
    })

    it('Deberia devolver una lista: diccionarios', async () => {
        global.fetch.mockReturnValue(
            Promise.resolve({
                json: () => Promise.resolve({
                    lista: [{
                        id: "1",
                        nombre: "test",
                        jugadoresMin: "2",
                        jugadoresMax: "4",
                        usuariosUnidos: "1",
                        juegosTotales: "1",
                        rondasTotales: "1"
                    }]
                })
            })
        )

        const res = await ServicioListarPartida("TOKENFALSO")
        console.log({res})
        expect(fetch.mock.calls.length).toBe(1)
        expect(res.lista).toStrictEqual([{
            id: "1",
            nombre: "test",
            jugadoresMin: "2",
            jugadoresMax: "4",
            usuariosUnidos: "1",
            juegosTotales: "1",
            rondasTotales: "1"
        }])
    })
})

