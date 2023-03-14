import { Avatar, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import React from "react";

function FormularioDeInicioDeSesion(props) {
    const avatarStyle = { backgroundColor: '#1976D2', margin: "0px 0px 15px" }
    const btnstyle = { margin: '18px 0' }
  
    const form = props.form || {}
    const [errors, setErrors] = React.useState({})
  
    const handleChange = e => props.setForm(prevForm => ({
      ...prevForm, [e.target.name]: e.target.value
    }));
  
    const onClickSubmit = () => {
      const validacion = props.validador(form) || {}
      setErrors(validacion)
      if (Object.keys(validacion).length === 0) {
        props.onSubmit(form.usuario, form.contrasena)
      }
    }
  
    return (<>
      <Grid align='center'>
        <Avatar style={avatarStyle}><SmartToyOutlinedIcon /></Avatar>
        <Typography variant="h5">Iniciar sesión</Typography>
      </Grid>
      <FormControl fullWidth>
        <TextField variant="standard" label='Usuario'
          name="usuario"
          value={form.usuario || ''} onChange={handleChange}
          placeholder='Ingresar usuario' fullWidth required
          error={Boolean(errors.usuario)}
          helperText={errors.usuario}
        />
        <TextField variant="standard" label='Contraseña'
          name="contrasena"
          value={form.contrasena || ''} onChange={handleChange}
          placeholder='Ingresar contraseña' type='password'
          fullWidth required
          error={Boolean(errors.contrasena)}
          helperText={errors.contrasena}
        />
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={onClickSubmit}>Ingresar</Button>
      </FormControl>
    </>)
  }

  export default FormularioDeInicioDeSesion