import { Paper, Typography } from "@mui/material"

export default function ResultadosSimulacion(props) {
  const { robots } = props
  const paperStyle = { padding: "2%", width: "50% auto", align: 'center' }
  const posiciones = props.posiciones

  //posiciones.sort((a, b) => a.posicion - b.posicion)

  return (
    <Paper elevation={10} style={paperStyle} key={'paper'}>
      {posiciones.map((v, i) => {
        return (
          <Typography key={i} align='center'>
            ({i+1}) {robots.find((r) => r.id === v.id).nombre} salió en la posición {v.posicion}
          </Typography>
        )
      })}
    </Paper>
  )
}