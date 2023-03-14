import ValidarCrearPartida from "../ValidarCrearPartida";

describe('datos validos', () => {

    let CPT


    beforeEach(() => {
        CPT = ValidarCrearPartida
    })


    it('nombre de partida invalido', async () => {
        const res = CPT("", "", null, null, null, null)

        expect(res.error).toBe("NOMBRE_INVALIDO")
    })

    it('jugador minimo fuera de rango', async () => {
        const res = CPT("asd","", 3, null, null, null)

        expect(res.error).toBe("MIN_JUGADORES_INVALIDO")
    })

    it('jugador maximo fuera de rango', async () => {
        const res = CPT("asd","", null, null, null, null)

        expect(res.error).toBe("MAX_JUGADORES_INVALIDO")
    })

    it('jugador minimo es mayor al jugador maximo', async () => {
        const res = CPT("asd","", 2, 3, null, null)

        expect(res.error).toBe("MAX_MIN_JUGADORES_INVALIDOS")
    })
    
    it('cantidad de juegos fuera de rango', async () => {
        const res = CPT("dfasf","", 4, 2, null, null)

        expect(res.error).toBe("JUEGOS_INVALIDOS")
    })

    it('cantidad de rondas fuera de rango', async () => {
        const res = CPT("asdasd","", 3, 3, 12, null)

        expect(res.error).toBe("RONDAS_INVALIDAS")
    })

    it('deberia de devolver un OK', async () => {
        const res = CPT("asd","", 3, 3, 3, 3)

        expect(res.error).toBe()
    })
})