import React from "react";

import CargaLinear from "../utilidades/CargaLinear";
import CacheLocal from "../utilidades/CacheLocal";

import ServicioCrearPartida from "./datos/ServicioCrearPartida";

import CasoDeUsoCrearPartida from "./dominio/CasoDeUsoCrearPartida";
import ValidarCrearPartida from "./dominio/ValidarCrearPartida";

import CajaDeCrearPartida from "./ui/CajaDeCrearPartida";
import FormularioDeCrearPartida from "./ui/FormularioDeCrearPartida";

export default function CrearPartida(props) {

    const casoDeUso = new CasoDeUsoCrearPartida(ServicioCrearPartida)
    const validar = ValidarCrearPartida

    const [estado, setEstado] = React.useState({ cargando: false })

    const onCrearPartida = async (nombre, contra, jMax, jMin, juegos, rondas, robot) => {
        setEstado({ cargando: true })

        casoDeUso.execute(nombre, contra, jMax, jMin, juegos, rondas, robot).then(result => {
            console.log(result)
            if (result.exito) {
                props.ws(result.exito)
                props.nav("/")
            } else if (result.error) {
                console.log(result.error)
            } else {
                console.log("ERROR_INESPERADO")
            }
        })
        setEstado({ cargando: false })
    }

    const Form = <FormularioDeCrearPartida
        cache = {CacheLocal}
        validar = {validar}
        onCrearPartida = {onCrearPartida}
        nav = {props.nav}
    />

    return (
        <> 
            
            <CajaDeCrearPartida>
                <h2>Crear Partida:</h2>
                {estado.cargando ? <CargaLinear /> : Form}
            </CajaDeCrearPartida>
        </>
    
    );
}
