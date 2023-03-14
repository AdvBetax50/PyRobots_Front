import ValidarSubirRobot from "../ValidarSubirRobot"

describe('datos validos', () => {

    let SRT


    beforeEach(() => {
        SRT = ValidarSubirRobot
    })


    it('nombre de robot invalido', async () => {
        const res = SRT("tester", "", null)

        expect(res.error).toBe("NOMBRE_ROBOT_INVALIDO")
    })

    it('archivo invalido', async () => {
        const res = SRT("tester", "tester", "")

        expect(res.error).toBe("CODIGO_ROBOT_INVALIDO")
    })

    //falta guardar datos de cache y probar, algo anda mal
    it('nombre de usuario invalido', async () => {
        const res = SRT("", "tester", "")

        expect(res.error).toBe("USUARIO_NO_ENCONTRADO") //
    })

    it('posibles valores OK', async () => {
        const res = SRT("tester", "tester", "test.py")

        expect(res.error).toBe()
    })
})