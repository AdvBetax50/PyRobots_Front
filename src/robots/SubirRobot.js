import { Alert, Grid, Paper } from "@mui/material";

import CargaCircular from "../utilidades/CargaCircular";
import CacheLocal from "../utilidades/CacheLocal";

import FormularioSubirRobot from "./ui/FormularioSubirRobot";

import CasoDeUsoSubirRobot from "./dominio/CasoDeUsoSubirRobot";
import ValidarSubirRobot from "./dominio/ValidarSubirRobot";

import ServicioSubirRobot from "./datos/ServicioSubirRobot";

import React from "react";


function SubirRobot(props) {
  const subirRobot = new CasoDeUsoSubirRobot(ServicioSubirRobot)
  const validar = ValidarSubirRobot

  const navigate = props.nav
  const [estado, setEstado] = React.useState({ cargando: false })

  const onSubirRobot = async (nombre, avatar, codigo) => {
    console.log(nombre, avatar, codigo)
    setEstado({ cargando: true })
    subirRobot.execute(nombre, avatar, codigo).then(resultado => {
        if (resultado.exito) {
          navigate("/")
        } else {
          setEstado({ cargando: false })
        }
      })
  }
 
  const Form = <FormularioSubirRobot
    cache={CacheLocal}
    nav = {navigate}
    onSubirRobot={onSubirRobot}
    validar={validar}
  />
  
  const paperStyle = { padding: '7%', width: '70%', margin: "20px auto" }
    return (
      <>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            {estado.cargando ? <CargaCircular /> : Form }
            {estado.error && <Alert severity="error">{estado.error}</Alert> }
          </Paper>
        </Grid>
      </>
    )
  }
  
export default SubirRobot;
