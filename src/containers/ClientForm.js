import React, { Component } from 'react'

import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import { http } from '../http'
import queryString from 'query-string'
import Radio from '../components/Radio'

export class ClientForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      client: {
        firstName: '',
        lastName: '',
        email: '',
        celPhone: '',
        businessName: '',
        fantasyName: '',
        cuit: '',
        location: '',
        address: '',
        phone: '',
        dni: '',
        postalCode: ''
      },
      emailDisable: false,
      option: 'CUIT',
      radioOptions: ['DNI', 'CUIT'],
      locationOptions: {
        'Coronel Suárez': 7540,
        'Pueblo Santa Trinidad': 7541,
        'Pueblo San José': 7541,
        'Pueblo Santa María': 7541
      }
    }
  }

  componentDidMount() {
    let { email } = queryString.parse(this.props.location.search)
    if (email) {
      this.setState(prevState => ({
        ...prevState,
        emailDisable: true,
        client: { ...prevState.client, email }
      }))
    }
  }

  formatCuit = e => {
    let value = e.target.value
    let name = e.target.name

    if (e.charCode >= 48 && e.charCode <= 57) {
      if (value.length === 13) {
        e.preventDefault()
        return
      }

      if (value.length === 11) {
        value = value.replace(/^(\d{2})-(\d{8}).*/, '$1-$2-')
      }

      if (value.length === 2) {
        value = value.replace(/^(\d{2}).*/, '$1-')
      }

      this.updateClientState(name, value)
    } else {
      e.preventDefault()
    }
  }

  formatDni = e => {
    let value = e.target.value
    let name = e.target.name

    if (e.charCode >= 48 && e.charCode <= 57) {
      if (value.length === 10) {
        e.preventDefault()
        return
      }

      if (value.length === 6) {
        value = value.replace(/^(\d{2}).(\d{3}).*/, '$1.$2.')
      }

      if (value.length === 2) {
        value = value.replace(/^(\d{2}).*/, '$1.')
      }

      this.updateClientState(name, value)
    } else {
      e.preventDefault()
    }
  }

  formatcelPhone = e => {
    let value = e.target.value
    if (e.charCode >= 48 && e.charCode <= 57) {
      if (value.length === 10) {
        e.preventDefault()
        return
      }
    } else {
      e.preventDefault()
    }
  }

  formatPhone = e => {
    let value = e.target.value
    if (e.charCode >= 48 && e.charCode <= 57) {
      if (value.length === 6) {
        e.preventDefault()
        return
      }
    } else {
      e.preventDefault()
    }
  }

  handleRadioChange = e => {
    let value = e.target.value
    let name = e.target.name

    this.setState(prevState => ({ ...prevState, [name]: value }))
  }

  handleLocation = e => {
    let value = e.target.value
    let name = e.target.name
    let postalCode = this.state.locationOptions[value]

    this.setState(prevState => ({
      client: { ...prevState.client, [name]: value, postalCode }
    }))
  }

  handleInput = e => {
    let value = e.target.value
    let name = e.target.name

    this.updateClientState(name, value)
  }

  updateClientState = (name, value) => {
    this.setState(prevState => ({
      client: { ...prevState.client, [name]: value }
    }))
  }

  handleFormSubmit = async e => {
    try {
      e.preventDefault()
      let client = this.state.client
      await http.put('/clients', client)
    } catch (error) {
      console.log('error', error.message)
    }
  }

  render() {
    return (
      <div className="col-md-4">
        <h3 className="text-center">Bienvenido</h3>
        <h5 className="text-center">Rogamos, complete sus datos</h5>
        <br />
        <div className="container-fluid">
          <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
            <Input
              tabIndex={1}
              title={'Email:'}
              name={'email'}
              inputType={'email'}
              value={this.state.client.email}
              placeholder={'Ingrese su email'}
              onChange={this.handleInput}
              required
              disabled={this.state.emailDisable}
            />{' '}
            <Input
              tabIndex={2}
              title={'Nombre:'}
              name={'firstName'}
              inputType={'text'}
              value={this.state.client.firstName}
              placeholder={'Ingrese su nombre'}
              onChange={this.handleInput}
              required
            />{' '}
            <Input
              tabIndex={3}
              title={'Apellido:'}
              name={'lastName'}
              inputType={'text'}
              value={this.state.client.lastName}
              placeholder={'Ingrese su apellido'}
              onChange={this.handleInput}
              required
            />{' '}
            <Input
              tabIndex={4}
              title={'Celular:'}
              name={'celPhone'}
              inputType={'tel'}
              value={this.state.client.celPhone}
              placeholder={'Ingrese los 10 digitos: 2926454545'}
              pattern="[0-9]{10}"
              onKeyPress={this.formatcelPhone}
              onChange={this.handleInput}
              required
            />{' '}
            <Input
              tabIndex={5}
              title={'Nombre Fantasía:'}
              name={'fantasyName'}
              inputType={'text'}
              value={this.state.client.fantasyName}
              placeholder={'Ingrese nombre del local'}
              onChange={this.handleInput}
              required
            />{' '}
            <Input
              tabIndex={6}
              title={'Razón Social:'}
              name={'businessName'}
              inputType={'text'}
              value={this.state.client.businessName}
              placeholder={'Ingrese razón social'}
              onChange={this.handleInput}
              required
            />{' '}
            <Radio
              tabIndex={7}
              title={'Seleccione'}
              name={'option'}
              options={this.state.radioOptions}
              selectedOption={this.state.option}
              onChange={this.handleRadioChange}
              required
            />
            {this.state.option === 'CUIT' && (
              <Input
                tabIndex={8}
                title={'CUIT:'}
                name={'cuit'}
                inputType={'text'}
                value={this.state.client.cuit}
                placeholder={'Ingrese CUIT: 30-12345678-4 '}
                pattern="[0-9]{2}-[0-9]{8}-[0-9]{1}"
                required
                onKeyPress={this.formatCuit}
                onChange={this.handleInput}
              />
            )}{' '}
            {this.state.option === 'DNI' && (
              <Input
                tabIndex={9}
                title={'DNI:'}
                name={'cuit'}
                inputType={'text'}
                value={this.state.client.cuit}
                placeholder={'Ingrese DNI: 30.123.123 '}
                pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}"
                required
                onKeyPress={this.formatDni}
                onChange={this.handleInput}
              />
            )}{' '}
            <Select
              tabIndex={10}
              title={'Localidad:'}
              name={'location'}
              options={Object.keys(this.state.locationOptions)}
              value={this.state.client.location}
              inputType={'text'}
              placeholder={'seleccione localidad'}
              onChange={this.handleLocation}
              required
            />{' '}
            <Input
              tabIndex={11}
              title={'Dirección:'}
              name={'address'}
              inputType={'text'}
              value={this.state.client.address}
              placeholder={'Ingrese dirección del local: av casey 2345'}
              required
              onChange={this.handleInput}
            />{' '}
            <Input
              tabIndex={12}
              title={'Teléfono fijo:'}
              name={'phone'}
              inputType={'tel'}
              value={this.state.client.phone}
              placeholder={'Ingrese los 6 digitos: 425566'}
              pattern="[0-9]{6}"
              onKeyPress={this.formatPhone}
              onChange={this.handleInput}
            />{' '}
            <Button type={'primary'} title={'Confirmar'} />
          </form>
        </div>
      </div>
    )
  }
}
