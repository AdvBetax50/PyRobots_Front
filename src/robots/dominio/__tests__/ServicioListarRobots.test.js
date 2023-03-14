import ServicioListarRobots from "../../datos/ServicioListarRobots";

describe('comportamiento servicio listar partida', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
        fetch.mockClear()
    })

    it('Deberia devolver error de conexion', async () => {
        fetch.mockReturnValueOnce(
            Promise.reject(new Error("Fallo to"))
        )

        const res = await ServicioListarRobots("TOKENFALSO")
        expect(res.error).toBe('ERROR_DE_CONEXION')
    })

    it('Deberia devolver una lista: robots', async () => {
        global.fetch.mockReturnValue(
            Promise.resolve({
                json: () => Promise.resolve({
                    lista: [{
                        id: "1",
                        nombre: "test"
                    }]
                })
            })
        )

        const res = await ServicioListarRobots("TOKENFALSO")
        expect(fetch.mock.calls.length).toBe(1)
        expect(res.lista).toStrictEqual({
            lista: [{
                id: "1",
                nombre: "test"
            }]
        })
    })
})
