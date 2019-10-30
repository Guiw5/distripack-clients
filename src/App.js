import React, { Component } from 'react'
import EndStep, { FirstStep, SecondStep } from './containers/ClientForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const flexBox = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <div style={flexBox}>
          <Route path="/" exact component={FirstStep} />
          <Route path="/sign" component={FirstStep} />
          <Route path="/next" component={SecondStep} />
          <Route path="/end" component={EndStep} />
        </div>
      </Router>
    )
  }
}
/*
  1) El usuario crea un cliente minimo con email y alias  
    -> El link compartido por email, redirige a /sign?email=qweqwe
       Donde se verá el formulario con el email disabled
       para actualizar todos sus datos faltantas
  
  2) El cliente podra registrarse desde cero, accediento a

*/
