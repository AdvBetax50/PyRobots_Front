import { useState, useEffect } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Dialog } from '@mui/material';

export default function PopUpMensaje(props) {
  const [estado, setEstado] = useState({ open: props.open, titulo: props.titulo})

  useEffect(() => {
    setEstado({ open: props.open, titulo: props.titulo})
    console.log(props)
  }, [props])

  const handleClose = () => {
    setEstado({...estado, open: false})
  }

  return (
    <Dialog open={estado.open} onClose={handleClose} maxWidth={"xs"} fullWidth={true}>
      <DialogTitle>{estado.titulo}</DialogTitle>
      <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
    </Dialog>
  )
}