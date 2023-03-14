import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog } from '@mui/material';

import ListarRobots from '../../robots/ListarRobots';

export default function PopUpUnirsePartida(props) {
  const [estado, setEstado] = 
    useState(
      { open: (!props.unido && props.unidos < props.maximos),
        error: {}, 
        contrasena: props.contrasena, 
        contrasena_validar: "", 
        robot: ""
      }
    )

  useEffect(() => {
    setEstado(
      { open: (!props.unido && props.unidos < props.maximos),
        error: {},
        contrasena: props.contrasena,
        contrasena_validar: "",
        robot: ""
      }
    )
    console.log(props)
  }, [props] )

  const handleContrasena = e => {
    setEstado({...estado, contrasena_validar: e.target.value})
  }

  const handleRobot = e => {
    setEstado({...estado, robot: e.target.value})
  }

  const handleClose = () => {
    setEstado({...estado, open: false})
  }

  const handleSend = () => {
    const valido = props.validador(
      props.id, estado.contrasena_validar, props.contrasena, props.unido,
      props.unidos, props.maximos, estado.robot
    )
    setEstado({...estado, error: valido})
    if (Object.keys(valido).length === 0) {
      handleClose()
      props.onSend({robot: estado.robot, contrasena_validar: estado.contrasena_validar})
    }
    else {
      console.log("ERROR: ", valido)
    }
  }

  const Contrasena_form = 
    <div>
      <DialogContentText>
        Ingrese la contraseña.
      </DialogContentText>
      <TextField
        autoFocus
        value={estado.contrasena_validar}
        margin="dense"
        id="contrasena"
        label="Contraseña"
        fullWidth
        variant="standard"
        onChange={handleContrasena}
        error={Boolean(estado.error.contrasena_validar)}
        helperText={estado.error.contrasena_validar}
      />
    </div>

  return (
    <div>
      <Dialog open={estado.open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>Unirse a partida</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor seleccione su robot.
          </DialogContentText>
          <ListarRobots required={true} onChange={handleRobot} robot={estado.robot}/>

          {estado.contrasena ? Contrasena_form : <></>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSend}>Unirse</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}