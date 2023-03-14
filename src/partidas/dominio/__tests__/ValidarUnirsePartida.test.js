import ValidarUnirsePartida from "../ValidarUnirsePartida";

describe('datos validos', () => {

    let IUT


    beforeEach(() => {
        IUT = ValidarUnirsePartida
    })

    it('partida invalida', async () => {
      const res = IUT("", null, null, null, null, null, null)

      expect(res.error).toBe("Partida invalida")
    })

    it('partida inexistente', async () => {
      const res = IUT(-1, null, null, null, null, null, null)

      expect(res.error).toBe("Partida tiene id inexistente")
    })

    it('ya esta unido', async () => {
      const res = IUT(1, null, null, true, null, null, null)

      expect(res.error).toBe("Ya esta unido a la partida")
    })

    it('se requiere una contraseña', async () => {
      const res = IUT(1, null, true, false, null, null, null)

      expect(res.contrasena_validar).toBe("Se necesita una contraseña para unirse a la partida")
    })

    it('no se requiere una contraseña', async () => {
      const res = IUT(1, "contrasena", null, false, null, null, null)

      expect(res.contrasena_validar).toBe("No debería haber contraseña")
    })

    it('no se renvia el dato de cuantos jugadores estan unidos', async () => {
      const res = IUT(1, "contrasena", true, false, null, null, null)

      expect(res.error).toBe("No se sabe cuantos jugadores estan unidos a la partida")
    })

    it('no se renvia el dato de cuantos jugadores maximos son', async () => {
      const res = IUT(1, "contrasena", true, false, 2, null, null)

      expect(res.error).toBe("No se sabe cuantos jugadores entran en la partida")
    })

    it('la partida esta llena', async () => {
      const res = IUT(1, "contrasena", true, false, 2, 2, null)

      expect(res.error).toBe("Partida llena")
    })

    it('no se esta enviando un robot', async () => {
      const res = IUT(1, "contrasena", true, false, 2, 3, null)

      expect(res.robot).toBe("Debe seleccionar algún robot")
    })

    it('se esta enviando un robot que no existe', async () => {
      const res = IUT(1, "contrasena", true, false, 2, 3, 0)

      expect(res.robot).toBe("Ese robot no existe")
    })

    it('OK', async () => {
      const res = IUT(1, "contrasena", true, false, 2, 3, 1)

      expect(res.error).toBe()
    })

})