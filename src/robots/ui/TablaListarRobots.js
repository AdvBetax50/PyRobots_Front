import React from 'react';

import ValidarListarRobots from '../dominio/ValidarListarRobots'

// import { Button } from '@mui/material'; 
import { MenuItem } from '@mui/material';
import { FormControl, InputLabel, Select} from '@mui/material';
// import { CheckBox } from '@mui/material';
// import { Paper, Table, TableHead } from '@mui/material';
// import { TableContainer, TableBody, TableCell, TableRow } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

function crearFila(robot){

    const avatar = <SmartToyIcon/>
    const tcstyle = {display: 'flex', justifyContent: 'space-around', width: '100%'}
  
    return (
        <MenuItem style={tcstyle} value={robot.id} key={robot.id}>
            {avatar}{robot.nombre}
        </MenuItem>
    );
}

export default function TablaDeListarRobots(props){

  const [errors, setErrors] = React.useState({});
  console.log("Error: ", errors)

  const robot = props.robot

  return (
    <>
        <FormControl fullWidth>
            <InputLabel>Robot</InputLabel>
            <Select
                value={robot}
                label="robot"
                onChange={props.onChange}
                required={true}
            >
            {props.lista === undefined ? 
                <MenuItem>Error</MenuItem> :
                props.lista.map((r) => {
                    if (ValidarListarRobots(r) !== {}){
                        return crearFila(r)}
                    setErrors(ValidarListarRobots(r))
                        return (<></>);
                }
                )
            }
            </Select>
        </FormControl>
      <br/>
      {/* <div style={buttonstyle}>
        <Button variant="contained">Subir Robot</Button>
      </div> */}
    </>
  );
}