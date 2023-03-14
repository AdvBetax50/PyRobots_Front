import { useReducer } from "react";
import ServicioLanzarSimulacion from "./datos/ServicioLanzarSimulacion";
import CacheLocal from "../utilidades/CacheLocal";
import { estadoInicial, EVENTO, simulacionReducer } from "./simulacionReducer";
import ServicioListarRobots from "../robots/datos/ServicioListarRobots";
import useEffectOnlyOnce from "../utilidades/hooks/useEffectOnlyOnce";
import { ValidadorFormularioSimulacion } from "./dominio/ValidadorFormularioSimulacion";
import isObjectEmpty from "../utilidades/funciones/isObjectEmpty";
import PaginaVerSimulacion from "./ui/PaginaVerSimulacion";
import { Container, Grid } from "@mui/material";

function VerSimulacion() {

  const [estado, dispatch] = useReducer(simulacionReducer, estadoInicial)

  useEffectOnlyOnce(() => {
    ServicioListarRobots(CacheLocal.cargar('token'))
      .then((data) => {
        if (data.error) {
          dispatch({ tipo: EVENTO.ERROR, mensaje: data.error })
        } else {
          dispatch({ tipo: EVENTO.ROBOTS_CARGADOS, robots: data.lista })
        }
      })
    })

  const onSimulacionSubmit = () => {
    const errores = ValidadorFormularioSimulacion(estado.formulario || {})
    if (isObjectEmpty(errores)) {
      dispatch({ tipo: EVENTO.SIMULACION_SOLICITADA })
      ServicioLanzarSimulacion(
        estado.formulario.rondas,
        estado.formulario.robots.map((robot) => robot.id)
      ).then((data) => {
        dispatch({ tipo: EVENTO.SIMULACION_OBTENIDA, data })
      })
    } else {
      dispatch({ tipo: EVENTO.ACTUALIZACION_FORMULARIO, actualizacion: { errores: errores } })
    }
  }

  return (<Container>
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <PaginaVerSimulacion
          estado={estado}
          dispatch={dispatch}
          onSimulacionSubmit={onSimulacionSubmit}
        />
      </Grid>
    </Grid>
  </Container>)

}

export default VerSimulacion
