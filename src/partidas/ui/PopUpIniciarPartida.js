import { useState, useEffect } from 'react';

// import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog } from '@mui/material';

export default function PopUpIniciarPartida(props) {
  const [estado, setEstado] = 
    useState(
      { open: props.creador,
        iniciable: props.unidos >= props.jugadoresMin,
        lleno: props.unidos === props.jugadoresMax,
        error: {}
      }
    )

  useEffect(() => {
    setEstado(
      { open: props.creador,
        iniciable: props.unidos >= props.jugadoresMin,
        lleno: props.unidos === props.jugadoresMax,
        error: {}
      }
    )
    console.log(props)
  }, [props] )

  const handleClose = () => {
    setEstado({...estado, open: false})
  }

  const handleSend = () => {
    handleClose()
    props.onSend()
  }

  return (
    <div>
      <Dialog open={estado.open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
        <DialogTitle>Quieres iniciar la partida?</DialogTitle>
          {!estado.lleno ? 
            estado.iniciable ? 
            <DialogContent>
              <DialogContentText>
                Todavia se pueden unir jugadores, desea continuar igualmente?
              </DialogContentText>
            </DialogContent> : <DialogContent>
            <DialogContentText>
              No se puede iniciar esta partida, no tiene los jugadores minimos necesarios
            </DialogContentText>
          </DialogContent>
            : <></>
          }
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {estado.iniciable ? <Button onClick={handleSend}>Iniciar</Button> : <></> }
        </DialogActions>
      </Dialog>
    </div>
  )
}