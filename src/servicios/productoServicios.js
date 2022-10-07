import axios from 'axios'
import { modeWeb, urlDeveloper, urlProduction } from '../config/config'

export class productosServicio {

    constructor() {
        this.baseUrl = modeWeb === 'dev' ? urlDeveloper : urlProduction
    }


    obtenerProductos = () => {
        return axios.get(this.baseUrl).then(res => res.data);
    }

    obtenerProducto = (id) => {
        return axios.get(`${this.baseUrl}/${id}`).then(res => res.data);
    }

    obtenerProductosPorCategoria = (idCategoria) => {
        return axios.get(`${this.baseUrl}/${idCategoria}`).then(res => res.data);
    }

    obtenerProductosPorDescripcion = (descripcion) => {
        return axios.get(`${this.baseUrl}/${descripcion}`).then(res => res.data);
    }

    crearProducto = (producto) => {
        return axios.post(this.baseUrl, producto).then(res => res);
    }

    eliminarProducto = (id) => {
        return axios.post(`${this.baseUrl}/${id}`).then(res => res);
    }
}