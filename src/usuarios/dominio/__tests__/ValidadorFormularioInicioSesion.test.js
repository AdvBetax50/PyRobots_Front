import ValidadorFromularioInicioSesion from "../ValidadorFormularioInicioSesion"

describe('comportamiento validador inicio de sesion', () => {

    let IUT

    beforeEach(() => {
        IUT = ValidadorFromularioInicioSesion
    })

    it('si el form esta vacio, se debe pedir ingresar usuario.', async () => {
        const res = IUT({})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.contrasena).toBeUndefined()
    })

    it('si el form contiene elementos vacios, se debe pedir ingresar usuario.', async () => {
        const res = IUT({usuario: "", contrasena: ""})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.contrasena).toBeUndefined()
    })

    it('si el form contiene elementos nulos, se debe pedir ingresar usuario.', async () => {
        const res = IUT({usuario: null, contrasena: null})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.contrasena).toBeUndefined()
    })

    it('si el usuario contiene espacios, se debe pedir reintentar.', async () => {
        const res = IUT({usuario: "a a", contrasena: null})

        expect(res.usuario).toBe("Este campo no puede contener espacios.")
        expect(res.contrasena).toBeUndefined()
    })

    it('si el form solo contiene usuario, se deberia pedir ingresar contraseña.', async () => {
        const res = IUT({usuario: "a"})

        expect(res.contrasena).toBe("Rellena este campo.")
        expect(res.usuario).toBeUndefined()
    })

    it('si el form es correcto, se deberia retornar vacio.', async () => {
        const res = IUT({usuario: "a", contrasena: "b"})

        expect(res.contrasena).toBeUndefined()
        expect(res.usuario).toBeUndefined()
        expect(res).toStrictEqual({})
    })
})