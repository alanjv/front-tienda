import { Component } from "react";
import { usuarioServicio } from "./servicios/usuarioServicio";
import { InputText } from 'primereact/inputtext';
import { defaultUser } from "./config/config";
import './App.css';
import { Button } from 'primereact/button';
import Swal from "sweetalert2";
import { Categorias } from "./components/Categorias";



export default class App extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [],
      usuario: '',
      contrasena: '',
      categorias: [],
      categoria: '',
      productos: [],
      producto: [],
      isAuth: false,
      errorPassword: false,
      errorUser: false,
      confirmButtonText: 'Acetpar'
    }
    this.usuarioServicio = new usuarioServicio()
    this.noAppiConect = true

  }

  componentWillUnmount = () => {
    if (this.noAppiConect) {
      this.setState({ usuarios: defaultUser })
    } else {
      this.usuarioServicio.obtenerUsuario().then(data => this.setState({ usuarios: data }))
    }
  }

  login = () => {

    return (
      <>
        <div className="App">
          <div className="p-field p-grid">
            <label htmlFor="user" className="p-col-fixed" style={{ width: '100px' }}>Usuario</label>
            <div className="p-col">
              <InputText id="user" onChange={(e) => this.handleUserChange(e)} type="text" />
            </div>
          </div>
          <div className="p-field p-grid">
            <label htmlFor="contrasena" className="p-col-fixed" style={{ width: '100px' }}>Contraseña</label>
            <div className="p-col">
              <InputText id="contrasena" onChange={(e) => this.handlePasswordChange(e)} type="password" />
            </div>
          </div>
          <div className="m-top">
            <Button label="Ingresar" onClick={() => this.validateUser()} />
          </div>
        </div>
      </>
    )
  }

  handleUserChange = (e) => {
    if (e.target.value != '') {
      this.setState({ usuario: e.target.value, errorUser: false })
    }
  }

  handlePasswordChange = (e) => {
    if (e.target.value != '') {
      this.setState({ contrasena: e.target.value, errorPassword: false })
    }
  }

  validateUser = () => {
    let validate
    let user = this.state.usuario
    let password = this.state.contrasena
    if (user != '') {
      if (password != '') {
        validate = true
      } else {
        this.setState({
          alertDialog: true,
          type: 'alert',
          message: 'Ingrese su contraseña',
          errorPassword: true
        })
        validate = false
      }

    } else {
      this.setState({
        alertDialog: true,
        type: 'alert',
        message: 'Ingrese un usuario',
        errorUser: true,

      })
      validate = false
    }

    if (validate) {
      let userExist = defaultUser.length > 0
      let findUser = userExist && defaultUser.find(usuario => usuario.usuario === user)



      let validatePassword = findUser && findUser.contrasena === password

      if (validatePassword) {
        this.setState({ isAuth: true })

      }

      if (!findUser) {
        this.setState({
          alertDialog: true,
          type: 'alert',
          message: 'usuaio no existe, desea crearlo',
          errorUser: true,
          confirmButtonText: 'Crear',
          cancelButonText: 'Cancelar'
        })
      }
    }
  }


  products = () => {
    return (
      <>
      </>
    )
  }

  alertDialog = () => {
    Swal.fire({
      title: 'Error!',
      text: this.state.message,
      icon: this.tipe,
      confirmButtonText: this.state.confirmButtonText,
      cancelButonText: this.state.cancelButonText,

    }).then(() => {
      this.setState({ alertDialog: false })
    }, (dismiss) => {
      if (dismiss == 'cancel') {
        // function when cancel button is clicked
      }
    });
  }

  render() {
    return (
      <>
        {this.state.alertDialog && this.alertDialog()}
        {!this.state.isAuth && this.login()}
        {this.state.isAuth && <Categorias />}
        {this.state.isAuth && this.products()}
      </>
    )
  }
}