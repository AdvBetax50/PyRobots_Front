
export default function pyRobotsCoreErrorMap(error) {
  switch(error) {
    case 'ERROR_DE_CONEXION':
      return 'Ocurrió un error de conexión'
    case 'SOLICITUD_INVALIDA':
      debugger // Esto no deberia ocurrir nunca.
      return 'Error desconocido.'
    default:
      return null
  }
}
