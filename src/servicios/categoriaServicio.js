import axios from 'axios'
import { modeWeb, urlDeveloper, urlProduction } from '../config/config'

export class categoriasServicio {

    constructor() {
        this.baseUrl = modeWeb === 'dev' ? urlDeveloper : urlProduction
    }


    obtenerCategorias = () => {
        return axios.get(this.baseUrl).then(res => res.data);
    }

    crearCategoria = (categoria) => {
        return axios.post(this.baseUrl, categoria).then(res => res);
    }

    eliminarCategoria = (id) => {
        return axios.post(`${this.baseUrl}/${id}`).then(res => res);
    }
}