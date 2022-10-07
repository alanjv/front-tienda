import axios from 'axios'
import { modeWeb, urlDeveloper, urlProduction } from '../config/config'

export class usuarioServicio {

  constructor() {
    this.baseUrl = modeWeb === 'dev' ? urlDeveloper : urlProduction
  }


  obtenerUsuario = () => {
    fetch(`${this.baseUrl}usuarios`)
      .then(res => res.json())
      .then(
        (result) => {

          return result
        },
        (error) => {
          return error
        }
      )
  }

  crearUsuario = (usuario) => {
    return axios.post(this.baseUrl, usuario).then(res => res.data);
  }
}