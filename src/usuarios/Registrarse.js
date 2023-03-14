import { Alert } from "@mui/material";
import CasoDeUsoRegistrarse from "./dominio/CasoDeUsoRegistrarse";
import ServicioRegistrarse from "./datos/ServicioRegistrarse";
import React from "react";
import ValidadorFormularioRegistrarse from "./dominio/ValidadorFormularioRegistrarse";
import CargaCircular from "../utilidades/CargaCircular";
import CajaRegistrarse from "./ui/CajaRegistrarse";
import FormularioRegistrarse from "./ui/FormularioRegistrarse";

function Registrarse(props) {
  const registrarse = new CasoDeUsoRegistrarse(ServicioRegistrarse)
  const validador = ValidadorFormularioRegistrarse

  const navigate = props.nav
  const [estado, setEstado] = React.useState({ cargando: false })

  const getErrorString = (e) => { switch(e) {
    case "NOMBRE_INVALIDO":
      return "Usuario invalido."
    case "CORREO_INVALIDO":
      return "Correo invalido."
    case "CONTRASENA_INVALIDA":
      return "Contraseña invalida."
    case "ERROR_DE_CONEXION":
      return "Error de conexión."
    case "USUARIO_YA_REGISTRADO":
      return "El usuario ya está registrado."
    default:
      return "Error inesperado."
  }}

  const onSubmit = async () => {
    setEstado({ ...estado, cargando: true })
    const form = estado.form

    registrarse.execute(form.usuario, form.correo, form.contrasena, form.avatar)
      .then(resultado => {
        if (resultado.exito) {
          navigate("/", {replace: true})
        } else {
          setErrorEstado(resultado.error)
        }
      })
  }

  const setErrorEstado = (error) => setEstado({
    ...estado, cargando: false, error: getErrorString(error)
  })

  const setFormEstado = (change) => setEstado(prevEstado => ({
    ...prevEstado, error: null,
    form: change(prevEstado.form)
  }))

  const Form = <FormularioRegistrarse
    form={estado.form}
    setForm={setFormEstado}
    onSubmit={onSubmit}
    validador={validador}
  />

  return (
    <CajaRegistrarse>
      {estado.cargando ? <CargaCircular /> : Form }
      {estado.error && <Alert severity="error">{estado.error}</Alert> }
    </CajaRegistrarse>
  )
}

export default Registrarse;