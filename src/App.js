import Cabecera from './cabecera/Cabecera'
import Inicio from './inicio/Inicio'
import VerSimulacion from './simulaciones/VerSimulacion'
import CrearPartida from './partidas/CrearPartida'
import SubirRobot from './robots/SubirRobot'
import IniciarSesion from './usuarios/IniciarSesion'
import Registrarse from './usuarios/Registrarse'
import Lobby from './resultados_partida/Lobby'

import Box from '@mui/material/Box'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebSockets from './utilidades/WebSockets'
import { useEffect, useState } from 'react'
import Navegador from './utilidades/Navegador'

import PopUpMensaje from "./utilidades/PopUpMensaje"


function App() {
  const [navegar, setNavegar] = useState("/")
  const [popEstado, setPopEstado] = useState({open:false,titulo:""})
  const wss = new WebSockets()

  useEffect(() => {
    wss.reconnect()
    fun(false, "")
  }, [navegar])

  const fun = (open, titulo) => {
    setPopEstado({open: open, titulo:titulo})
  }

  const ws = (url) => {
    wss.add(url, fun)
  }

  return (
    <div className="App">
      <Router>
          <PopUpMensaje
              open={popEstado.open}
              titulo={popEstado.titulo}
          />
        <Cabecera nav={setNavegar}/>
        <Navegador url={navegar}/>
        <Box m={3}>
          <Routes>
            <Route path="/" element={<Inicio nav={setNavegar} ws={ws}/>} />
            <Route path="/iniciar-sesion" element={<IniciarSesion nav={setNavegar}/>} />
            <Route path="/registrarse" element={<Registrarse nav={setNavegar}/>} />
            <Route path="/robot/registrar/" element={<SubirRobot nav={setNavegar}/>} />
            <Route path="/ver-simulacion" element={<VerSimulacion nav={setNavegar}/>} />
            <Route path="/crear-partida" element={<CrearPartida nav={setNavegar} ws={ws}/>} />
            <Route path="/partida/resultado" element={<Lobby nav={setNavegar}/>} />
          </Routes>
        </Box>

      </Router>
    </div>
  );
}


export default App;
