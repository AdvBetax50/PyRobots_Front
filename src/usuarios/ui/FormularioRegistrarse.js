import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import React from "react";

function FormularioRegistrarse(props) {
    const btnstyle = { margin: '4% 0' }
  
    const form = props.form || {}
    const [errors, setErrors] = React.useState({})
  

    const handleChange = e => props.setForm(prevForm => ({
      ...prevForm, [e.target.name]: e.target.value
    }));
  
    const handleAvatar = e => props.setForm(prevForm => ({
      ...prevForm, [e.target.name]: e.target.files[0]
    }));


    const onClickSubmit = () => {
      const validacion = props.validador(form) || {}
      setErrors(validacion)
      if (Object.keys(validacion).length === 0) {
        props.onSubmit(form.usuario, form.correo, form.contrasena, form.avatar)
      }
    }

    return (<>
      <Grid align='center'>
        <Typography variant="h5">Registrarse</Typography>
      </Grid>
      <FormControl fullWidth>
        <TextField variant="standard" label='Usuario'
          name="usuario"
          value={form.usuario || ''} onChange={handleChange}
          placeholder='Ingresar usuario' fullWidth required
          error={Boolean(errors.usuario)}
          helperText={errors.usuario}
        />

        <TextField variant="standard" label='Correo'
          name="correo"
          value={form.correo || ''} onChange={handleChange}
          placeholder='Ingresar correo' 
          fullWidth required
          error={Boolean(errors.correo)}
          helperText={errors.correo}
        />
        

        <TextField variant="standard" label='Contraseña'
          name="contrasena"
          value={form.contrasena || ''} onChange={handleChange}
          placeholder='Ingresar contraseña' type='password'
          fullWidth required
          error={Boolean(errors.contrasena)}
          helperText={errors.contrasena}
        />
        <TextField variant="standard" label='Repetir contraseña'
          name="contrasena2"
          value={form.contrasena2 || ''} onChange={handleChange}
          placeholder='Ingresar contraseña nuevamente' type='password'
          fullWidth required
          error={Boolean(errors.contrasena2)}
          helperText={errors.contrasena2}
        />

        <Grid 
          sx={{ m:"3%", display:"flex", 
          justifyContent:'space-between', alignItems:"center" }}
          >
          <Button variant="contained" component="label">
            Subir avatar
            <input hidden accept="image/*" type="file" 
              name="avatar"
              onChange={handleAvatar}/>
          </Button>
          <Typography color={errors.avatar && !form.avatar ? 'red' : 'black'}>
            {form.avatar ? 'Avatar cargado' : 'No hay avatar'}
          </Typography>
        </Grid>

        <Button type='submit' color='primary' 
          variant="contained" style={btnstyle} 
          fullWidth onClick={onClickSubmit}>
            Registrarse
        </Button>
      </FormControl>
    </>)
  }

  export default FormularioRegistrarse;