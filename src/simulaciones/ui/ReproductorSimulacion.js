import { Box } from "@mui/system";
import Tablero from "./Tablero";

import { Stage, Layer, Text } from 'react-konva';
import { IconButton, Typography } from "@mui/material";
import { Misil, Robot,Id } from "./Objects";
import { EVENTO } from "../simulacionReducer";

import ResultadosSimulacion from "./ResultadosSimulacion";
import { useCallback } from "react";
import { useMemo } from "react";
import { ArrowCircleLeft, ArrowCircleRight, Close, FirstPage, PauseCircle, PlayCircle } from "@mui/icons-material";
import useInterval from "../../utilidades/hooks/useInterval";

const TILES=20
const TILE_SIZE=30
const TABLERO_SIZE=TILES*TILE_SIZE
const size = TILE_SIZE * TILES

const ROBOT_SIZE = 26
const ID_SIZE = 12

const FPS = 15
const INTERVAL = 1000/FPS

function ReproductorSimulacion(props) {
    const { estado, dispatch } = props
    const onClickAnterior = () => dispatch({ tipo: EVENTO.SIMULACION_ANTERIOR })
    const onClickSiguiente = useCallback(() => {
        dispatch({ tipo: EVENTO.SIMULACION_SIGUIENTE })
    }, [dispatch])

    useInterval(() => {
        if (estado.reproduciendo) {
            onClickSiguiente()
        }
    }, INTERVAL)

    const toggleReproductorAutomatico = () => {
        if (estado.reproduciendo) {
            dispatch({ tipo: EVENTO.SIMULACION_DETENER })
        } else {
            dispatch({ tipo: EVENTO.SIMULACION_REPRODUCIR })
        }
    }

    const onClickSalir = () => { dispatch({ tipo: EVENTO.SIMULACION_ELIMINAR }) }

    const memoTablero = useMemo(() => <>
        <Tablero style={{ position: "absolute" }} tile={TILE_SIZE} tiles={TILES} />
    </>, []);
    
    const transf = (pos) => {
        return pos * TABLERO_SIZE / 1000
    }

    return <Box style={{ width: size, height: size }}>
        <ResultadosSimulacion posiciones={estado.posiciones} robots={estado.robots} />
        <br />
        {memoTablero}
        <Stage style={{ position: "absoulte" }} width={size} height={size}>
            <Layer>
                {estado.simulacion[estado.ronda]
                    ? <>
                        {estado.simulacion[estado.ronda].robots.map((robot, i) => <Robot
                            estado={robot.estado}
                            key={i}
                            pos={{ x: transf(robot.pos_x) - ROBOT_SIZE / 2, y: transf(robot.pos_y) - ROBOT_SIZE / 2 }}
                        />)}
                        {estado.simulacion[estado.ronda].robots.map((robot, i) => <Id
                            id={i+1}
                            key={i}
                            pos={{ x: transf(robot.pos_x) - ID_SIZE / 2, y: transf(robot.pos_y) - ID_SIZE / 2 + 7}}
                        />)}
                        {estado.simulacion[estado.ronda].misiles.map((misil, i) => <Misil
                            explotado={misil.explotado}
                            key={i}
                            pos={{ x: transf(misil.pos_x), y: transf(misil.pos_y)  }}
                            orientacion={misil.orientacion}
                        />)}
                    </>
                    : <Text>Error</Text>
                }
            </Layer>
        </Stage>
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }} >
            <Typography sx={{ width: '180px', my: '16px' }} variant='h6'>
                Ronda: {estado.ronda + 1}
            </Typography>
            <Box>
                <IconButton
                    sx={{ mx: '10px' }}
                    color="primary"
                    onClick={() => dispatch({ tipo: EVENTO.SIMULACION_REBOBINAR })}>
                    <FirstPage />
                </IconButton>
                <IconButton
                    sx={{ mx: '10px' }}
                    color="primary"
                    onClick={toggleReproductorAutomatico}>
                    {estado.reproduciendo ? <PauseCircle /> : <PlayCircle /> }
                </IconButton>
                <IconButton sx={{ mx: '10px' }} color="primary" onClick={onClickAnterior} ><ArrowCircleLeft /></IconButton>
                <IconButton sx={{ mx: '10px' }} color="primary" onClick={onClickSiguiente} ><ArrowCircleRight /></IconButton>
                <IconButton sx={{ mx: '10px' }} color="primary" onClick={onClickSalir} ><Close /></IconButton>
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }} >
            <Layer>
                {estado.simulacion[estado.ronda]
                    ? <>
                    {estado.simulacion[estado.ronda].robots.map((robot, i) => 
                    
                    <Typography sx={{ width: '500px', my: '12px' }} variant='h6'>
                       ({i+1}) vida: {robot.estado}, x: {robot.pos_x}, y: {robot.pos_y}
                    </Typography>)}   
                    </>
                    : <Text>Error</Text>
                }
            </Layer>
        </Box>
    </Box>
}

export default ReproductorSimulacion