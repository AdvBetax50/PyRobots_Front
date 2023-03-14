import { Alert, Typography } from "@mui/material"
import CargaCircular from "../../utilidades/CargaCircular"
import pyRobotsCoreErrorMap from "../../utilidades/datos/pyRobotsCoreErrorMap"
import { ERROR, ESTADO } from "../simulacionReducer"
import FormularioSimulacion from "./FormularioSimulacion"
import ReproductorSimulacion from "./ReproductorSimulacion"

    
export default function PaginaVerSimulacion(props) {
    const {estado, dispatch, onSimulacionSubmit } = props

    switch (estado.clase) {
        case ESTADO.CARGA_INICIAL:
            return <CargaCircular />
        case ESTADO.FORMULARIO:
            return <>
                <FormularioSimulacion
                    error={estado.error}
                    form={estado.formulario}
                    robots={estado.robots}
                    dispatch={dispatch}
                    onSubmit={onSimulacionSubmit}
                />
            </>
        case ESTADO.CARGA_SIM:
            return <>
                <Typography >Corriendo simulación. Esto puede tomar unos segundos.</Typography>
                <CargaCircular />
            </>
        case ESTADO.SIMULACION:
            return <ReproductorSimulacion
                estado={estado}
                dispatch={dispatch}
            />

        case ESTADO.ERROR:
            return <Alert severity="error">{simErrorMap(estado.error)}</Alert>
        default:
            debugger
            throw new Error("Estado inválido.")
    }
}

function simErrorMap(error) {
    const map = (e) => {switch(e){
        case ERROR.NO_HAY_ROBOTS:
            return 'No dispone de robots para ejecutar la simulación.'
        default:
            return e
    }}
    return pyRobotsCoreErrorMap(error) ?? map(error) ?? 'Error desconocido.'
}