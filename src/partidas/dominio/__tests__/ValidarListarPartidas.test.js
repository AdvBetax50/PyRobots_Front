import ValidarListarPartidas from "../ValidarListarPartidas";

function partida_default(){
    let partida = {
        id: "1",
        nombre: "test",
        jugadoresMin: "2",
        jugadoresMax: "4",
        usuariosUnidos: "1",
        juegosTotales: "1",
        rondasTotales: "1"
    }
    return partida
}

describe('datos validos', () => {

    let partida 

    let LPT

    beforeEach(() => {
        LPT = ValidarListarPartidas
    })

    it('id de partida invalido', async () => {

        partida = partida_default()
        partida.id = -1
        const res = LPT(partida)

        expect(res.error).toBe("ID_INVALIDO")
    })

    it('nombre de partida invalido', async () => {

        partida = partida_default()
        partida.nombre = '' 
        const res = LPT(partida)

        expect(res.error).toBe("NOMBRE_INVALIDO")
    })

    it('jugador minimo fuera de rango', async () => {

        partida = partida_default()
        partida.jugadoresMin = 0
        const res = LPT(partida)

        expect(res.error).toBe("MIN_JUGADORES_INVALIDO")
    })

    it('jugador maximo fuera de rango', async () => {

        partida = partida_default()
        partida.jugadoresMax = 0
        const res = LPT(partida)

        expect(res.error).toBe("MAX_JUGADORES_INVALIDO")
    })

    it('jugador minimo es mayor al jugador maximo', async () => {

        partida = partida_default()
        partida.jugadoresMin = 3
        partida.jugadoresMax = 2
        const res = LPT(partida)

        expect(res.error).toBe("MAX_MIN_JUGADORES_INVALIDOS")
    })
    
    it('cantidad de juegos fuera de rango', async () => {

        partida = partida_default()
        partida.juegosTotales = 0
        const res = LPT(partida)

        expect(res.error).toBe("JUEGOS_INVALIDOS")
    })

    it('cantidad de rondas fuera de rango', async () => {

        partida = partida_default()
        partida.rondasTotales = 0
        const res = LPT(partida)

        expect(res.error).toBe("RONDAS_INVALIDAS")
    })

    it('deberia de devolver un OK', async () => {
        partida = partida_default()
        const res = LPT(partida)

        expect(res.error).toBe()
    })
})