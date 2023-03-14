import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import CargaCircular from "../utilidades/CargaCircular"
import ServicioResultadosPartida from "./datos/ServicioResultadosPartida"
import CasoDeUsoResultadosPartida from "./dominio/CasoDeUsoResultadosPartida"
import ValidadorResultadosPartida from "./dominio/ValidadorResultadosPartida"
import Resultado from "./ui/Resultado"

export default function Lobby() {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")

  const [estado, setEstado] = useState({cargando: false, terminado: false, result: {}})

  const validador = ValidadorResultadosPartida(id)
  const caso_de_uso = new CasoDeUsoResultadosPartida(ServicioResultadosPartida)
  
  if (Object.keys(validador).length === 0 
    && !estado.cargando
    && !estado.terminado) {

    setEstado({...estado, cargando: true})

    caso_de_uso.execute(id).then(result => {
      if (result) {
        setEstado(
          {...estado, terminado: true, cargando: false, result: result}
        )
      }
      else {
        setEstado(
          {...estado, terminado: true, cargando: false, result: {error: "ERROR_INESPERADO"}}
        )
      }
    })
  }

  return (
    <div>
      {estado.cargando ? 
        <CargaCircular></CargaCircular> :
        <Resultado result={estado.result}/>
      }
    </div>
  )
}

