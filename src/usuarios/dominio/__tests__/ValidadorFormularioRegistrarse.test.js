import ValidadorFormularioRegistrarse from "../ValidadorFormularioRegistrarse"

describe('comportamiento validador registrarse', () => {

    let IUT

    beforeEach(() => {
        IUT = ValidadorFormularioRegistrarse
    })

    it('si el form esta vacio, se debe pedir ingresar usuario.', async () => {
        const res = IUT({})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form contiene elementos vacios, se debe pedir ingresar usuario.', async () => {
        const res = IUT({usuario: "", correo: "", contrasena: "", contrasena2: ""})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form contiene elementos nulos, se debe pedir ingresar usuario.', async () => {
        const res = IUT({usuario: null, correo: null, contrasena: null, contrasena2: null})

        expect(res.usuario).toBe("Rellena este campo.")
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el usuario contiene espacios, se debe pedir reintentar.', async () => {
        const res = IUT({usuario: "a a", correo: null, contrasena: null, contrasena2: null})

        expect(res.usuario).toBe("Este campo no puede contener espacios.")
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form solo contiene usuario, se deberia pedir ingresar correo.', async () => {
        const res = IUT({usuario: "a"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBe("Rellena este campo.")
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form no contiene un correo valido, se deberia pedir otro correo.', async () => {
        const res = IUT({usuario: "a", correo: "@"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBe("Ingrese un correo valido.")
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form solo tiene usuario y correo, se deberia pedir una contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("Rellena este campo.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena de tamaño muy corto, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "asx"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe tener entre 8 y 20 caracteres.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena de tamaño muy larga, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "asjioajdoijjdoafjsdiojfdijdsijfdsafix"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe tener entre 8 y 20 caracteres.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena no tiene alguna mayuscula, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "contrasena-1"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe tener alguna mayúscula.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena no tiene alguna minuscula, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "CONTRASENA-1"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe tener alguna minúscula.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena no tiene algun guion, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "Contrasena1"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe contener algun guión.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form tiene una contrasena no tiene algun numero, se deberia pedir otra contrasena.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "Contrasena-"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBe("La contraseña debe contener algun número.")
        expect(res.contrasena2).toBeUndefined()
    })

    it('si el form no tiene contrasena2, se deberia pedir una contrasena2.', async () => {
        const res = IUT({usuario: "a", correo: "a@x.com", contrasena: "Contrasena-1"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBe("Rellena este campo.")
    })
    it('si las contrasenas no coinciden, se deberia pedir que coincidan.', async () => {
        const res = 
            IUT({usuario: "a", correo: "a@x.com", contrasena: "Contrasena-1", contrasena2: "ads"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBe("Las contraseñas deben coincidir.")
    })

    it('si el form es correcto, se deberia retornar vacio.', async () => {
        const res = 
            IUT({usuario: "a", correo: "a@x.com", contrasena: "Contrasena-1", contrasena2: "Contrasena-1"})

        expect(res.usuario).toBeUndefined()
        expect(res.correo).toBeUndefined()
        expect(res.contrasena).toBeUndefined()
        expect(res.contrasena2).toBeUndefined()
        expect(res).toStrictEqual({})
    })
})