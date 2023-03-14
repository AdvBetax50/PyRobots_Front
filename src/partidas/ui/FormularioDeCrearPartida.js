import React from 'react';
import { FormControl, TextField, Slider, Typography, Button } from '@mui/material';
import ListarRobots from '../../robots/ListarRobots';


export default function FormularioDeCrearPartida(props) {
    const [errors, setErrors] = React.useState({});

    const [nombre, setNombre] = React.useState("");
    const handleNombre = (e) => {
        setNombre(e.target.value);
    }

    const [contra, setContra] = React.useState("");
    const handleContra = (e) => {
        setContra(e.target.value);
    }

    const [robot, setRobot] = React.useState("");
    const handleRobot = (e) => {
        setRobot(e.target.value);
    }

    const [jugadores, setJugadores] = React.useState([4, 2]);
    const handleJugadores = (e) => {
        setJugadores(e.target.value);
    };

    const [juegos, setJuegos] = React.useState(100);
    const handleJuegos = (e) => {
        const newValue = e.target.value;

        if (newValue.match(/^[0-9]*$/)) {
            if (newValue > 200) {
                setJuegos(200);
            } else {
                setJuegos(newValue);
            }
        } 
        if (newValue.match(/^$/)) {
            setJuegos(1);
        }
    };

    const [rondas, setRondas] = React.useState(1000);
    const handleRondas = (e) => {
        const newValue = e.target.value;

        if (newValue.match(/^[0-9]*$/)) {
            if (newValue > 10000) {
                setRondas(10000);
            } else {
                setRondas(newValue);
            }
        } 
        if (newValue.match(/^$/)) {
            setRondas(1);
        }
    };

    const onCrearPartida = (e) => {
        const jMax = Math.max(jugadores[0], jugadores[1]);
        const jMin = Math.min(jugadores[0], jugadores[1]);
    
        const validar = props.validar(nombre, contra, jMax, jMin, juegos, rondas)

        setErrors(validar)

        if (Object.keys(validar).length === 0) {
            props.onCrearPartida(nombre, contra, jMax, jMin, juegos, rondas, robot)
        }
        
        switch (validar.error) {
            case "MAX_JUGADORES_INVALIDO":
                window.location.reload();
                break;
            case "MIN_JUGADORES_INVALIDO":
                window.location.reload();
                break;
            case "MAX_MIN_JUGADORES_INVALIDOS":
                window.location.reload();
                break;
            case "JUEGOS_INVALIDOS":
                setJuegos(100);
                break;
            case "RONDAS_INVALIDAS":
                setRondas(1000);
                break;  
            default:
                break;
        }

    }

    return (
        <><FormControl sx={{ width: '50%'}}>
            <TextField label='Nombre de la partida'
                variant='standard'
                onChange={handleNombre}
                required={true}
                placeholder='Ingrese nombre de la partida'
                inputProps={{ maxLength: 20 }}
                error={errors.error === "NOMBRE_INVALIDO"}
                />
            <br/>
            <TextField label='Contraseña de la partida'
                variant='standard'
                onChange={handleContra}
                required={false}
                placeholder='Ingrese la contraseña (opcional)'
                inputProps={{ maxLength: 50 }}
                error={errors.error === "CONTRASENA_INVALIDA"}
                />
            <br/>
            <ListarRobots required={true} onChange={handleRobot} robot={robot}/>
            <Typography sx={{ padding: '2%'}}>
                Cantidad de jugadores
            </Typography>
            <br/>
            <Slider
                value={jugadores}
                onChange={handleJugadores}
                valueLabelDisplay="auto"
                min={2}
                max={4}
            />
            <br/>
            <TextField
                name="juegosT"
                variant='standard'
                label="Cantidad de juegos (1-200)"
                value={juegos}
                onChange={handleJuegos}
                error={errors.error === "JUEGOS_INVALIDOS"}
            />
            <br/>
            <TextField
                name="rondasT"
                variant='standard'
                label="Cantidad de rondas (1-10.000)"
                value={rondas}
                onChange={handleRondas}
                error={errors.error === "RONDAS_INVALIDAS"}
            />
            <br/>
            <Button 
                type='submit' 
                color='primary' 
                variant='contained' 
                onClick={onCrearPartida}>
                Crear partida
            </Button>

        </FormControl> </>
    )
}
