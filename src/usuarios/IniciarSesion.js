
import { Alert, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CasoDeUsoIniciarSesion from "./dominio/CasoDeUsoIniciarSesion";
import ServicioInicioDeSesion from "./datos/ServicioInicioSesion";
import React from "react";
import ValidadorFromularioInicioSesion from "./dominio/ValidadorFormularioInicioSesion";
import CargaCircular from "../utilidades/CargaCircular";
import CacheLocal from "../utilidades/CacheLocal";
import CajaInicioSesion from "./ui/CajaInicioSesion";
import FormularioDeInicioDeSesion from "./ui/FormularioDeInicioDeSesion";

function IniciarSesion(props) {
  const iniciarSesion = new CasoDeUsoIniciarSesion(ServicioInicioDeSesion, CacheLocal)
  const validador = ValidadorFromularioInicioSesion

  const navigate = props.nav
  const [estado, setEstado] = React.useState({ cargando: false })

  const getErrorString = (e) => { switch(e) {
    case "USUARIO_O_CONTRASENA_INCORRECTOS":
      return "Usuario o contraseña incorrectos."
    case "ERROR_DE_CONEXION":
      return "Error de conexión."
    default:
      return "Error inesperado."
  }}

  const onSubmit = () => {
    setEstado({ ...estado, cargando: true })
    const form = estado.form
    iniciarSesion.execute(form.usuario, form.contrasena).then(resultado => {
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

  const Form = <FormularioDeInicioDeSesion
    form={estado.form}
    setForm={setFormEstado}
    onSubmit={onSubmit}
    validador={validador}
  />

  return (
    <CajaInicioSesion>
      {estado.cargando ? <CargaCircular /> : Form }
      {estado.error && <Alert severity="error">{estado.error}</Alert> }
      <LinksDeAyuda />
    </CajaInicioSesion>
  )
}
export default IniciarSesion;

function LinksDeAyuda() {
  return (<>
    <Typography>
      {/* <Link href="recuperar-cuenta">¿Has olvidado tu contraseña?</Link> */}
    </Typography>
    <Typography>
      ¿Aún no tienes cuenta? <Link to="/registrarse">Registrate</Link>
    </Typography>
  </>);
}


