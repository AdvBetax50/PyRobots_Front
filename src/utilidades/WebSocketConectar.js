let reconnect = true

function addClientId(url) {
  const client_id = Date.now()
  console.log(client_id)
  return (`${url}/${client_id}`)
}

export default function WebSocketConectar(url,fun) {
  const to = addClientId(url)
  const ws = new WebSocket(to);

  ws.onopen = (e) => {
    // Hacer lo que se requiera al iniciar la conexion
    console.log("Escuchando websocket")
  }
  
  ws.onmessage = (e) => { 
    if(JSON.parse(e.data).unidos) {
      const partida = JSON.parse(e.data).partidas
      const unidos = JSON.parse(e.data).unidos
      const mensaje ="Partida: "+partida+" usuarios unidos: "+unidos
      fun(true, mensaje)
    }else{
      const partida = JSON.parse(e.data).partida
      const mensaje ="La partida: "+partida+" ya termino"
      fun(true, mensaje)
    }

    console.log(e)
    // Hacer lo que se requiera con el mensaje del web socket
  }
  
  ws.onerror = (error) => {
    // Manejo de errores del WS
    console.log(error)
  }

  ws.onclose = (e) => {
    // Abandonar partida
    setTimeout(WebSocketConectar(url), 10000)

    console.log(e)
  }
  
}