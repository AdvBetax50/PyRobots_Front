import { Grid, Paper } from "@mui/material"

function CajaInicioSesion(props) {
    const paperStyle = { padding: 70, width: 280, margin: "20px auto" }
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          {props.children}
        </Paper>
      </Grid>
    )
  }
export default CajaInicioSesion