import CacheLocal from "../../utilidades/CacheLocal"

async function ServicioSubirRobot(nombre, avatar, codigo) {
    const file = new FileReader(codigo) 
    const formToUpload = new FormData()
    formToUpload.append("nombre", nombre)
    formToUpload.append("avatar", avatar)
    formToUpload.append("codigo", codigo)
    if (file.result === null){
        codigo = ""
    }
    else{
        codigo = file.result
    }
    const resultado = await fetch(
        `${process.env.REACT_APP_HOST}/robot/registrar/`,
        { method: "POST", 
        headers: {
            'token': CacheLocal.cargar('token'),
            'Accept': 'application/json'
        },
        body: formToUpload}
    ).then(r => r.json())
        .catch(e => ({ error: "ERROR_DE_CONEXION" }))

    if (resultado && resultado.id) {
        console.log(resultado.id)
        return {id: resultado.id}
    } else {
        return { error: "ERROR_DE_CONEXION" }
    }
}


export default ServicioSubirRobot;