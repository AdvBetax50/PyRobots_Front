import { Button, FormControl, Grid, TextField } from "@mui/material"
import { EVENTO } from "../simulacionReducer";
import MultiAutocompletado from "../../utilidades/componentes/MultiAutocompletado";
import { ValidadorCampoSimulacion } from "../dominio/ValidadorFormularioSimulacion";
import { Alert } from "@mui/material";
import pyRobotsCoreErrorMap from "../../utilidades/datos/pyRobotsCoreErrorMap";


export default function FormularioSimulacion(props) {
    const { form, robots, dispatch, onSubmit, error } = props

    const handleChange = (event) => {
        const {name, value} = event.target
        const errores = {[name]: ValidadorCampoSimulacion(name, value)}
        dispatch({ tipo: EVENTO.ACTUALIZACION_FORMULARIO, actualizacion: {[name]: value, errores}})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit()
    }

    return (<>
        <form onSubmit={handleSubmit} >
            <FormControl fullWidth>
                <Grid container gap={2} direction="column">
                    <Grid item>
                        <TextField
                            name="rondas"
                            label="Cantidad de rondas (1-10.000)"
                            value={form?.rondas || []}
                            onChange={handleChange}
                            error={Boolean(form?.errores?.rondas)}
                            helperText={form?.errores?.rondas || ''}
                            fullWidth
                        />
                    </Grid>

                    <Grid item>
                        <MultiAutocompletado
                            lista={robots || []}
                            name='robots'
                            value={form?.robots || []}
                            label='Robots a participar'
                            placeholder='Selecciona los robots'
                            onChange={handleChange}
                            error={Boolean(form?.errores?.robots)}
                            helperText={form?.errores?.robots || ''}
                        />
                    </Grid>

                    <Grid item>
                        {error &&
                            <Alert severity="error">{pyRobotsCoreErrorMap(error) || 'Error inesperado.'}</Alert>
                        }
                    </Grid>

                    <Button sx={{ mt: 1, mr: 1 }} type="submit">EJECUTAR</Button>
                </Grid>
            </FormControl>
        </form>
    </>)
}
