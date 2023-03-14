import PopUpUnirsePartida from './ui/PopUpUnirsePartida';
import ValidarUnirsePartida from './dominio/ValidarUnirsePartida';
import ServicioUnirsePartida from './datos/ServicioUnirsePartida';
import CasoDeUsoUnirsePartida from './dominio/CasoDeUsoUnirsePartida';

export default function UnirsePartida(props){
  
  const validador = ValidarUnirsePartida
  const caso_de_uso = new CasoDeUsoUnirsePartida(ServicioUnirsePartida)

  const onSend = async (data) => {
    caso_de_uso.execute(props.id, data.contrasena_validar, data.robot).then(result => {
      if (result.websocket) {
        props.ws(result.websocket)
        props.handleFb(true, "Te has unido a la partida")
      } else if (result.error) {
        props.handleFb(true, "No te has unido a la partida")
        console.log(result.error)
      } else {
        props.handleFb(true, "No te has unido a la partida")
        console.log("ERROR_INESPERADO")
      }
    })
  }
  
  const PopUp = <PopUpUnirsePartida
    onSend={onSend}
    id={props.id}
    unido={props.unido}
    contrasena={props.contrasena}
    unidos={props.unidos}
    maximos={props.maximos}
    validador={validador}
    />

  return (
    <div>
      {PopUp}
    </div>
  )
}

