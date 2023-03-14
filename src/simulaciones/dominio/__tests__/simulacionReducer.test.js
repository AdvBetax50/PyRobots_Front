import { ESTADO, estadoInicial, EVENTO, simulacionReducer } from "../../simulacionReducer";


describe(`Prueba simulación reducer`, () => {

    const robotsValidos = ['a', 'b']

    const estadoEnFormulario = {
            ...estadoInicial,
            clase: ESTADO.FORMULARIO,
            robots: robotsValidos
        }
    const estadoEnSim = {
            ...estadoEnFormulario,
            clase: ESTADO.SIMULACION,
            simulacion: [1,2,3], posiciones: [], ronda: 0
        }

    const IUT = simulacionReducer
    
    it(`Al iniciarlo un usuario sin robots, debe transitar a error`, async () => {
        let result = IUT(estadoInicial, { tipo: EVENTO.ROBOTS_CARGADOS, robots: [] })
        expect(result.clase).toBe(ESTADO.ERROR)
    })

    it(`Al iniciar, si ocurre un error, debe transitar a error`, async () => {
        let result = IUT(estadoInicial, { tipo: EVENTO.ERROR, mensaje: '' })
        expect(result.clase).toBe(ESTADO.ERROR)
    })

    it(`Al iniciarlo un usuario con robots, debe transitar a FORMULARIO`, async () => {
        let result = IUT(estadoInicial, { tipo: EVENTO.ROBOTS_CARGADOS, robots: ['a'] })
        expect(result.clase).toStrictEqual(ESTADO.FORMULARIO)
        expect(result.robots[0]).toBe('a')
    })

    it(`En formulario, al ingresar datos, actualizarlos.`, async () => {
        let result = IUT(estadoEnFormulario, { tipo: EVENTO.ACTUALIZACION_FORMULARIO, actualizacion: {tito: "tito"} })
        expect(result.clase).toStrictEqual(ESTADO.FORMULARIO)
        expect(result.formulario.tito).toBe("tito")
    })

    it(`En formulario, al ingresar error, reflejarlo correctamente.`, async () => {
        let result = IUT(estadoEnFormulario, { tipo: EVENTO.ACTUALIZACION_FORMULARIO, actualizacion: {error: {tito: "e"}} })
        expect(result.clase).toStrictEqual(ESTADO.FORMULARIO)
        expect(result.formulario.error.tito).toBe("e")
    })

    it(`En formulario, al enviar, pasar a carga sim.`, async () => {
        let result = IUT(estadoEnFormulario, { tipo: EVENTO.SIMULACION_SOLICITADA })
        expect(result.clase).toStrictEqual(ESTADO.CARGA_SIM)
    })

    it(`En carga sim, al recibir sim, pasar a sim.`, async () => {
        let result = IUT({
            ...estadoEnFormulario,
            clase: ESTADO.CARGA_SIM
        }, { tipo: EVENTO.SIMULACION_OBTENIDA, data: {simulacion: [], posiciones: []}})
        expect(result.clase).toStrictEqual(ESTADO.SIMULACION)
        expect(result.simulacion).toBeDefined()
        expect(result.posiciones).toBeDefined()
    })

    it(`En carga sim, al recibir error, pasar a form con error.`, async () => {
        let result = IUT({
            ...estadoEnFormulario,
            clase: ESTADO.CARGA_SIM
        }, { tipo: EVENTO.SIMULACION_OBTENIDA, data: {error: "e"}})
        expect(result.clase).toStrictEqual(ESTADO.FORMULARIO)
        expect(result.error).toBe("e")
    })

    it(`En sim, al reproducir, cambiar estado apropiadamente.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_REPRODUCIR })
        expect(result.reproduciendo).toBeTruthy()
        let result2 = IUT(result, { tipo: EVENTO.SIMULACION_REPRODUCIR })
        expect(result2.reproduciendo).toBeTruthy()
    })

    it(`En sim, al detener, cambiar estado apropiadamente.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_DETENER })
        expect(result.reproduciendo).toBeFalsy()
        let result2 = IUT(result, { tipo: EVENTO.SIMULACION_REPRODUCIR })
        expect(result2.reproduciendo).toBeTruthy()
        let result3 = IUT(result2, { tipo: EVENTO.SIMULACION_DETENER })
        expect(result3.reproduciendo).toBeFalsy()
        let result4 = IUT(result3, { tipo: EVENTO.SIMULACION_DETENER })
        expect(result4.reproduciendo).toBeFalsy()
    })

    it(`En sim, al eliminar, volver a form.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_ELIMINAR })
        expect(result.clase).toBe(ESTADO.FORMULARIO)
        expect(result.simulacion).toBeUndefined()
    })

    it(`En sim, al avanzar ronda, avanzar apropiadamente.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_SIGUIENTE })
        expect(result.ronda).toBe(estadoEnSim.ronda + 1)
    })

    it(`En sim, al retroceder ronda, retroceder apropiadamente.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_ANTERIOR })
        expect(result.ronda).toBe(estadoEnSim.ronda)
        let result2 = IUT({...estadoEnSim, ronda: 2}, { tipo: EVENTO.SIMULACION_ANTERIOR })
        expect(result2.ronda).toBe(1)
    })

    it(`En sim, al rebobinar, retroceder apropiadamente.`, async () => {
        let result = IUT(estadoEnSim, { tipo: EVENTO.SIMULACION_REBOBINAR })
        expect(result.ronda).toBe(estadoEnSim.ronda)
        let result2 = IUT({...estadoEnSim, ronda: 2}, { tipo: EVENTO.SIMULACION_REBOBINAR })
        expect(result2.ronda).toBe(0)
    })

})