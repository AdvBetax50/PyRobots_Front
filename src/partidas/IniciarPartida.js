import PopUpIniciarPartida from './ui/PopUpIniciarPartida';
import ServicioIniciarPartida from './datos/ServicioIniciarPartida';

// import WebSocketConectar from '../utilidades/WebSocketConectar';

export async function execute(id){
    const resultado = await ServicioIniciarPartida(id) || {}
    console.log("Se llamo a iniciar partida = ", resultado)
    return resultado
  }


export default function IniciarPartida(props){
  
  const onSend = async () => {
    console.log("Se va a ejecturar el servicio simulacion")
    execute(props.id).then(result => {
      if (result.exito) {
        //WebSocketConectar(result.websocket)
        props.handleFb(true, "Has iniciado la partida, ya puedes ver los resultados")
        console.log("On send, dio exito = ", result.exito)
      } else if (result.error) {
        //parsear el tipo de error
        if (result.error === "USUARIO_INVALIDO"){
            props.handleFb(true, "Usuario no existe")
        }
        else if (result.error === "PARTIDA_INVALIDA"){
            props.handleFb(true, "Partida invalida, no se puede iniciar")
            console.log(result.error)
        }
        else if (result.error === "PARTIDA_TERMINADA"){
          props.handleFb(true, "La partida ya esta terminada")
          console.log(result.error)
        }
        else if (result.error === "USUARIO_NO_CREADOR"){
          props.handleFb(true, "No creaste la partida, no puedes iniciarla")
          console.log(result.error)
        }
        else if (result.error === "FALTAN_JUGADORES"){
          props.handleFb(true, "Faltan jugadores para poder iniciar la partida")
          console.log(result.error)
        }
      } else {
        props.handleFb(true, "No se ha iniciado la partida")
        console.log("ERROR_INESPERADO")
      }
    })
  }
  
  //props: id, creador, unidos, jMix, jMax
  const PopUp = <PopUpIniciarPartida
    onSend={onSend}
    id={props.id}
    creador={props.creador}
    unidos={props.unidos}
    jugadoresMin={props.jugadoresMin}
    jugadoresMax={props.jugadoresMax}
    />

  return (
    <div>
      {PopUp}
    </div>
  )
}

