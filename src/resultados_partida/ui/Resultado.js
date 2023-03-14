import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

const paperStyle = { padding: "2%", width: "30%", margin: "20px auto" }

export default function Resultado(props) {
  const result = props.result
  console.log(result)
  
  if (result.lista) {
    return (UIResultado(result.lista.sort((a, b) => b.resultado - a.resultado)))
  }
  if (result.error) {
    console.log(result.error)
    return (ErrorResultado(result.error))
  }
  return (ErrorResultado("ERROR_INESPERADO"))
}

function ErrorResultado(error) {
  let message = "Hubo un problema"

  if (error === "PARTIDA_INVALIDA") {
    message = "Resultados no disponibles"
  }

  return (
    <Paper sx={paperStyle}>
      <Typography textAlign={"center"}>
        {message}
      </Typography>
    </Paper>
  )
}

function UIResultado(lista) {
  return (
    <Paper sx={paperStyle}>
      <Typography>
        {lista.map((e, i) => {
          return (
            <Box key={i}>
              <Box>
                <Typography textAlign={"center"}>
                  {e.resultado}: {e.robotNombre} 
                </Typography>
              </Box>
              <Box>
                <Typography textAlign={"center"}>
                  Gano {e.ganados} rondas
                </Typography>
              </Box>
              <Box>
                <Typography textAlign={"center"}>
                  Perdio {e.perdidos} rondas
                </Typography>
              </Box>
              <Box>
                <Typography textAlign={"center"}>
                  Empato {e.empatados} rondas
                </Typography>
              </Box>
              <br></br>
            </Box>
          )
        })}
      </Typography>
    </Paper>
  )
}