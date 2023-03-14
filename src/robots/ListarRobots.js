import React, { useEffect } from 'react';

import CargaCircular from "../utilidades/CargaCircular";
import CacheLocal from "../utilidades/CacheLocal";

import TablaListarRobots from './ui/TablaListarRobots';
import ServicioListarRobots from './datos/ServicioListarRobots';

import { Box, Typography } from '@mui/material';

async function execute(id_robot){
  const resultado = await ServicioListarRobots(id_robot) || {}

  //resultado = lista de lista: [ {id: int, nombre: str} ]
  console.log("Execute llamando Servicio = ", resultado.lista)
  return resultado
}

export default function ListarRobots(props){

  // tengo mas de un error?
  const [error, setError] = React.useState({error: ""})
  const [estado, setEstado] = React.useState({ cargando: false })
  const [listaR, setListaR] = React.useState(undefined)

  const token = CacheLocal.cargar("token")

  useEffect(()=> {
    if ( token !== null && token !== ""){
      setEstado({cargando: true})
      
      execute(token).then(result => {
        console.log("ROBOTS? = ", result.lista)
        if (result.error){
          setError({ error: result.error})
        }
        else if (result.lista){
          setListaR(result.lista)
        }
      })
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  useEffect(() => {
    if (listaR !== undefined){
      setEstado({cargando: false})
    }
  }, [listaR,error])

  const Table = <TablaListarRobots lista={listaR} robot={props.robot} onChange={props.onChange}/>
  const Error = <Typography>Hubo un Error: {error.error}</Typography>

  return (
    <>      
      <Box>
        <br/>
        {error.error !== "" ? Error : (estado.cargando ? 
            <Box sx={{marginTop:'10%'}}>{CargaCircular()}</Box> : Table)}
        <br/>
      </Box>
    </>
  );
}
