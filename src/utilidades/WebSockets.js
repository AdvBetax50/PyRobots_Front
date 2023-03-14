import WebSocketConectar from "./WebSocketConectar"

export default class WebSockets {
  constructor () {
    this.wss = []
    this.fun = []
  }

  reconnect () {
    this.wss.forEach((ws,i) => {
      WebSocketConectar(ws,this.fun.i)
    })
  }

  add (ws,fun) {
    WebSocketConectar(ws,fun)
    this.wss.push(ws)
    this.fun.push(fun)
  }
}