import ValidadorFromularioInicioSesion from "../../../usuarios/dominio/ValidadorFormularioInicioSesion"
import { ValidadorFormularioSimulacion } from "../ValidadorFormularioSimulacion"

describe('comportamiento validador simulacion', () => {

    const validRobots = ['a', 'b']
    let IUT

    beforeEach(() => {
        IUT = ValidadorFormularioSimulacion
    })

    it('si el form esta vacio, se debe pedir ambos datos.', async () => {
        const res = IUT({})

        expect(res.rondas).toBe("Ingresa más de una ronda.")
        expect(res.robots).toBe("Selecciona entre 2 y 4 robots.")
    })

    it('si el form contiene elementos nulos, se debe pedir ambos datos.', async () => {
        const res = IUT({rondas: null, robots: null})

        expect(res.rondas).toBe("Ingresa más de una ronda.")
        expect(res.robots).toBe("Selecciona entre 2 y 4 robots.")
    })

    it('si rondas no es un numero, se debe pedir reintentar.', async () => {
        const res = IUT({rondas: "aa", robots: validRobots})

        expect(res.rondas).toBe("Ingresa un valor válido")
        expect(res.robots).toBeUndefined()
    })

    it('si el form solo contiene rondas, se deberia pedir ingresar contraseña.', async () => {
        const res = IUT({rondas: "200"})

        expect(res.robots).toBe("Selecciona entre 2 y 4 robots.")
        expect(res.rondas).toBeUndefined()
    })

    it('si el form es valido, se deberia retornar vacio.', async () => {
        const res = IUT({rondas: 200, robots: ['a', 'a']})

        expect(res.rondas).toBeUndefined()
        expect(res.robots).toBeUndefined()
        expect(res).toStrictEqual({})
    })

})
