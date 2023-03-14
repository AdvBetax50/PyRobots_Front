import { Box, Button, FormControl, Grid, Input, TextField, Typography } from "@mui/material";
import React from "react";

function FormularioSubirRobot(props) {
  const btnstyle = { margin: '18px 0' }
  const [errors, setErrors] = React.useState({});

  const [nombre, setNombreRobot] = React.useState("");
  const handleNombreRobot = (e) => {
    setNombreRobot(e.target.value);
  }

  const [avatar, setAvatar] = React.useState("");

  const [codigo, setCodigo] = React.useState("");

  const getCodigo = async (e) => {
    const reader = new FileReader()
    reader.onerror = async (e) => {
      setCodigo("")
    }
    reader.onload = async (e) => { 
      setCodigo(e.target.result)
    };
    reader.readAsText(e.target.files[0])
  }

  const [codigoFile, setCodigoFile] = React.useState("");
  const handleCodigoFile = (e) => {
    const newValue = e.target.value;
    if (newValue.match(/^.*\.py$/)) {
      setCodigoFile(e.target.value);
      getCodigo(e)
    }
    else {

      return "NOMBRE_ROBOT_INVALIDO";
    }
  }

  const onSubirRobot = () => {

    const nombre_usuario = props.cache.cargar("usuario")
    const validar = props.validar(nombre_usuario, nombre, codigoFile)

    setErrors(validar)

    if (Object.keys(validar).length === 0) {
      props.onSubirRobot(nombre, avatar, codigo)
    }

    switch (validar.error) {
      case "USUARIO_NO_ENCONTRADO":
        props.nav("../../iniciar-sesion");
        break;
      case "NOMBRE_ROBOT_INVALIDO":
        return "Nombre de Robot es invalido."
      case "CODIGO_ROBOT_INVALIDO":
        return "Archivo para Codigo de Robot es Invalido."
      default:
        return "Error inesperado."
    }
  }

  return (<>
    <FormControl sx={{ width: '100%' }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "8%",
        marginTop: "1%"
      }}>
        <Typography variant="h4">Robot</Typography>
      </Box>

      <TextField variant="standard" label='Nombre'
        name="Nombre"
        value={nombre} onChange={handleNombreRobot}
        placeholder='Nombre' required={true}
        inputProps={{ maxLength: 20 }}
        error={errors.error === "NOMBRE_ROBOT_INVALIDO"}
      />

      <FileField
        selectedImage={avatar}
        setSelectedImage={setAvatar}
      />

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "8%",
        marginTop: "1%"
      }}>
        <Typography variant="h6" sx={{
          marginRight: "7%", marginTop: "2%",
          justifyContent: "center"
        }} >Inserta Codigo</Typography>

        <Input sx={{
          padding: 1, display: "flex",
          justifyContent: "center"
        }}
          label="Codigo Robot"
          name="Codigo Robot" value={codigoFile}
          placeholder='Codigo Python' onChange={handleCodigoFile}
          type="file"
          required={true}
        ></Input>
      </Box>

      <Button type='submit' color='primary' variant="contained"
        style={btnstyle} onClick={onSubirRobot}>Subir</Button>

    </FormControl>
  </>)
}

export default FormularioSubirRobot;

function FileField(props) {
  const { selectedImage, setSelectedImage } = props

  return (<Grid container
    justifyContent="center" alignItems="center"
    my={3} gap={5}
  >
    {selectedImage ? (<>
      <Grid item>
        <img alt="Imagen inválida" height={"100px"} src={URL.createObjectURL(selectedImage)} />
      </Grid>
      <Grid item>
        <Button onClick={() => setSelectedImage(null)} >
          Eliminar
        </Button>
      </Grid>
    </>) : (<>
      <Grid item>
        <FileUploadButton onImageSelected={setSelectedImage} >
          Subir avatar
        </FileUploadButton>
      </Grid>
    </>)}
  </Grid>)
}

function FileUploadButton(props) {
  return (<>
        <Button
          variant="contained"
          component="label"
        >
        {props.children}
          <input
            type="file"
            name="avatar"
            hidden
            onChange={(event) => {
              props.onImageSelected(event.target.files[0]);
            }}
          />
        </Button>
  </>)
}