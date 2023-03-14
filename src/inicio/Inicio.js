import { Button, Box } from "@mui/material";

import ListarPartidas from "../partidas/ListarPartidas";
import UnirsePartida from "../partidas/UnirsePartida";
import IniciarPartida from "../partidas/IniciarPartida";
import AbandonarPartida from "../partidas/AbandonarPartida";
import CacheLocal from "../utilidades/CacheLocal"
import PopUpMensaje from "../utilidades/PopUpMensaje"
import React, {useState} from "react";

function Inicio(props) {
    const nav = props.nav

    //fb es un Dialog para enviar mensajes al usuario
    const [fb, setFb] = useState({open: false, titulo: ""})
    
    const [iniciar, setIniciar] = useState({id: "", creador: false, unidos: 0, 
        jugadoresMin: 0, jugadoresMax: 0})

    const feedback = <PopUpMensaje
        open={fb.open}
        titulo={fb.titulo}
    />

    const handleFeedback = (open, titulo) => {
        setFb({open: open, titulo: titulo})

        switch(titulo){
            case "Te has unido a la partida":
                nosUnimos(1, false, true, 1, 2)
                break;
            case "No te has unido a la partida":
                nosUnimos(1, false, true, 1, 2)
                break;
            case "Has iniciado la partida":
                console.log("se va a iniciar la partida")
            break;
            default:
                break; 
        }
    }

    const [partida, setPartida] = 
        useState({id: 1, contrasena: false, unido: true, unidos: 1, maximos: 2})

    const nosUnimos = (id, contrasena, unido, unidos, maximos) => {
        setPartida({id: id, contrasena: contrasena, unido: unido, unidos: unidos, maximos: maximos})
    }

    const iniciamos = (id, creador, unidos, jugadoresMin, jugadoresMax) => {
        setIniciar({id: id, creador: creador, unidos: unidos, 
            jugadoresMin: jugadoresMin, jugadoresMax: jugadoresMax});
        IniciarPartida(id, creador, unidos, jugadoresMin, jugadoresMax, handleFeedback)
    }

    const abandonamos = (id, unido, creador) => {
        AbandonarPartida(id, unido, creador, handleFeedback)
    }

    const Resultados = (id) => {
        nav(`/partida/resultado?id=${id}`)
    }

    let unirseInstance = <UnirsePartida
        id={partida.id} 
        contrasena={partida.contrasena}
        unido={partida.unido}
        unidos={partida.unidos}
        maximos={partida.maximos}
        handleFb={handleFeedback}
        ws={props.ws}
    />

    let iniciarInstance = <IniciarPartida
        id={iniciar.id} 
        creador={iniciar.creador}
        unido={iniciar.unido}
        unidos={iniciar.unidos}
        jugadoresMin={iniciar.jugadoresMin}
        jugadoresMax={iniciar.jugadoresMax}
        handleFb={handleFeedback}
    />

    const token = CacheLocal.cargar("token")

    const onClick = (url) => {
        props.nav(url)
    }

    const linksApagada = [
        {href: '/iniciar-sesion', nombre: 'Iniciar sesion'},
        {href: '/registrarse', nombre: 'Registrarse'},
    ]
    const linksIniciada = [
        {href: '/crear-partida', nombre: 'Crear Partida'},
        {href: '/robot/registrar', nombre: 'Subir Robot'},
        {href: '/ver-simulacion', nombre: 'Iniciar Simulacion'},
    ]

    const sesionApagada = <Box 
        sx={{ 
        display: "flex",
        justifyContent: "space-around",
        verticalAlign: "center",
        textAlign: "center"
        }}
        >
            {linksApagada.map((links => 
            <Button 
                key={links.href}
                type='submit' 
                color='primary' 
                variant='contained'
                onClick={() => onClick(links.href)}>
                {links.nombre}
            </Button>))}
        </Box>

    const sesionIniciada = <Box 
        sx={{ 
        display: "flex",
        justifyContent: "space-around",
        verticalAlign: "center",
        textAlign: "center"
        }}
        >
            {linksIniciada.map((links => 
            <Button 
                key={links.href}
                type='submit' 
                color='primary' 
                variant='contained'
                onClick={() => onClick(links.href)}>
                {links.nombre}
            </Button>))}
        </Box>

    return (<>
        <br/>
        <nav>
            {token ? sesionIniciada : sesionApagada}
        </nav>
        <br/>
            {feedback}
            {token ? 
                <ListarPartidas
                    UnirsePartida={nosUnimos}
                    IniciarPartida={iniciamos}
                    AbandonarPartida={abandonamos}
                    ResultadosPartida={Resultados}
                />
                : 
                <br />}
        <div>
          {unirseInstance}
          {iniciarInstance}
        </div>
    </>
    );
}


export default Inicio;
