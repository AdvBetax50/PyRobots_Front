import React from 'react';

import ValidarListarPartidas from '../dominio/ValidarListarPartidas'

import { Alert, Button, Paper, Table, TableHead, Stack } from '@mui/material';
import { TableContainer, TableBody, TableCell, TableRow } from '@mui/material';
import { IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneIcon from '@mui/icons-material/Done';

function CrearFila(partida, usuario){

  const pStyle = {textAlign: "center"}
  
  let jugadores = ""
  return (
  <>
    <TableCell sx={pStyle}>{partida.id}</TableCell>
    <TableCell sx={pStyle}>{partida.nombre}</TableCell>
    <TableCell sx={pStyle}>{partida.creador === usuario ? <PersonPinIcon/> : <></>}</TableCell>
    <TableCell sx={pStyle}>{partida.estaUnido ? <CheckCircleIcon/> : <></>}</TableCell>
    <TableCell sx={pStyle}>{partida.contrasena ? <LockIcon/> : <LockOpenIcon/>}</TableCell>
    <TableCell sx={pStyle}>{partida.terminado ? <DoneIcon/> : <HourglassEmptyIcon/>}</TableCell>
    <TableCell sx={pStyle}>{jugadores.concat(partida.usuariosUnidos, "/" , partida.jugadoresMax)}</TableCell>
    <TableCell sx={pStyle}>{partida.jugadoresMin}</TableCell>
    <TableCell sx={pStyle}>{partida.juegosTotales}</TableCell>
    <TableCell sx={pStyle}>{partida.rondasTotales}</TableCell>
  </>);
}

export default function TablaDeListarPartidas(props){

  const usuario = props.usuario
  const [errors, setErrors] = React.useState({error: ""});
  const [select, setSelect] = React.useState({seleccionado: false, id: "",
    contrasena: "", unido: false, unidos: 0, propietario: false})
  const [open, setOpen] = React.useState(true);

  const onSelect = (p) => {
    setSelect({...select, seleccionado: true, id: p.id, nombre: p.nombre, contrasena: p.contrasena,
      unido: p.estaUnido, unidos: p.usuariosUnidos,
      maximos: p.jugadoresMax, minimos: p.jugadoresMin, propietario: p.creador === usuario})
      setOpen(true)
  }
  
  const onClickUnirsePartida = (select) => {
    if (select.seleccionado){
      props.onUnirsePartida(select.id, select.contrasena, select.unido, select.unidos, select.maximos)
      setSelect({...select, seleccionado: false})
    }
  }

  const onClickIniciarPartida = (select) => {
    if (select.seleccionado){
      props.onIniciarPartida(select.id, select.propietario, select.unidos, select.minimos, select.maximos)
      setSelect({...select, seleccionado: false})
    }
  }

  const onClickAbandonarPartida = (select) => {
    if (select.seleccionado){
      props.onAbandonarPartida(select.id, select.unido, select.propietario)
      setSelect({...select, seleccionado: false})
    }
  }

  const OnClickVerResultados = (select) => {
    if (select.seleccionado){
      props.onVerResultados(select.id)
      setSelect({...select, seleccionado: false})
    }
  }

  const paperstyle = { width: '100%', marginTop: '1%' }

  const tcstyle = {width: '90%'}

  const stackstyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const actionAlert = 
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setOpen(false);
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  

  const columnas = [
    {id: 'col0', label: 'Nro'},
    {id: 'col1', label: 'Nombre'},
    {id: 'col2', label: 'Creador'},
    {id: 'col3', label: 'Unido'},
    {id: 'col4', label: 'Privada'},
    {id: 'col5', label: 'Terminada'},
    {id: 'col6', label: 'Jugadores Actuales'},
    {id: 'col7', label: 'Jugadores Minimos'},
    {id: 'col8', label: 'Juegos'},
    {id: 'col9', label: 'Rondas'}
  ]

  return (
    <>
      <Paper elevation={10} sx={paperstyle} error={toString(Boolean(errors.error))}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{width: "80%"}}>
                {columnas.map((col) => 
                  <TableCell style={{textAlign: "center", width: "10%"}} key={col.id}>{col.label}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.lista === undefined ? 
                <TableRow>
                  <TableCell>Error</TableCell>
                </TableRow> :
                props.lista.map((p) => {
                  if (ValidarListarPartidas(p) !== {}){
                    return (
                      <TableRow hover key={p.id} sx={tcstyle} onClick={() => onSelect(p)}>
                        {CrearFila(p,usuario)}
                      </TableRow>
                    )
                  }
                    setErrors(ValidarListarPartidas(p))
                    return (<></>);
                  }
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br/>
      <div>
        <Collapse in={open}>
          {select.seleccionado ? <Alert icon={false} action={actionAlert}
                    severity="success" sx={{marginBottom: "5%"}}>
            Partida Seleccionada: {select.nombre}
            </Alert> : <></>}
        </Collapse>
      </div>
      <Stack direction="row" sx={stackstyle}>
        <div>
          <Button  variant="contained" onClick={() => onClickIniciarPartida(select)}>
            Iniciar Partida
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={() => onClickUnirsePartida(select)}>
            Unirse a Partida
          </Button>
        </div>
        <div>
          <Button  variant="contained" onClick={() => OnClickVerResultados(select)}>
            Ver Resultados
          </Button>
        </div>
        <div>
          <Button  variant="contained" onClick={() => onClickAbandonarPartida(select)}>
            Abandonar Partida
          </Button>
        </div>
      </Stack>
    </>
  );
}
