const CacheLocal = {
    guardar: function (clave, valor) {
        localStorage.setItem(clave, valor)
    },
    cargar: function (clave) {
        return localStorage.getItem(clave)
    }
}
export default CacheLocal