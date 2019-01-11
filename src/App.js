import React, { Component } from 'react'
import { ClientForm } from './containers/ClientForm'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const flexBox = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}

export default class App extends Component {
  render() {
    return (
      <div style={flexBox}>
        <Router>
          <Route path="/" component={ClientForm} />
        </Router>
      </div>
    )
  }
}
