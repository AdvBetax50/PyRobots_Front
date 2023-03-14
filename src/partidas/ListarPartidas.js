import React, { useEffect } from 'react';

import CargaCircular from "../utilidades/CargaCircular";
import CacheLocal from "../utilidades/CacheLocal";

import TablaDeListarPartidas from './ui/TablaDeListarPartidas';
import ServicioListarPartidas from './datos/ServicioListarPartidas';

import { Box, IconButton, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { blue } from '@mui/material/colors';


export async function execute(token){
  const resultado = await ServicioListarPartidas(token) || {}
  return resultado
}

export default function ListarPartidas(props){

  const [error, setError] = React.useState({error: ""})
  const [estado, setEstado] = React.useState({ cargando: false })
  const [listaP, setListaP] = React.useState(undefined)
  const [recarga, setRecarga] = React.useState(0)


  const token = CacheLocal.cargar("token")
  const usuario = CacheLocal.cargar("usuario")

  const colorb = blue[500]
  const pstyle = {fontSize: 'h4.fontSize', justifyContent: 'flex-start',
    width: '30%'}

  useEffect(()=> {
    if ( token !== null && token !== ""){
      setEstado({cargando: true})
      
      execute(token).then(result => {
        console.log("Partidas? = ", result.lista)
        if (result.error){
          setError({ error: result.error})
        }
        else if (result.lista){
          setListaP(result.lista)
        }
      })
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[recarga])

  useEffect(() => {
    if (listaP !== undefined){
      setEstado({cargando: false})
    }
  }, [listaP,error])

  const onUnirsePartida = (id, contrasena, unido, unidos, maximos) => {
    props.UnirsePartida(id, contrasena, unido, unidos, maximos)
  }

  const onIniciarPartida = (id, creador, unidos, jugadoresMin, jugadoresMax) => {
    props.IniciarPartida(id, creador, unidos, jugadoresMin, jugadoresMax)
  }

  const onAbandonarPartida = (id, unido, propietario) => {
    props.AbandonarPartida(id, unido, propietario)
  }

  const onVerResultados = (id) => {
    props.ResultadosPartida(id)
  }

  const Table = <TablaDeListarPartidas 
                  lista={listaP} 
                  usuario={usuario}
                  onUnirsePartida={onUnirsePartida}
                  onIniciarPartida={onIniciarPartida}
                  onAbandonarPartida={onAbandonarPartida}
                  onVerResultados={onVerResultados}
                  />
  const Error = <Typography>Hubo un Error: {error.error}</Typography>

  return (
    <>      
      <Box>
        <Box sx={{display: 'flex'}}>
          <Typography sx={pstyle}>Partidas Disponibles</Typography>
          <IconButton sx={{color: colorb}} size='large'  
            onClick={() => {setRecarga(recarga+1)}}><RefreshIcon/>
          </IconButton>
        </Box>
          {error.error !== "" ? Error : (estado.cargando ? 
        <Box sx={{marginTop:'10%'}}>{CargaCircular()}</Box> : Table)}  
      </Box>
    </>
  );
}
