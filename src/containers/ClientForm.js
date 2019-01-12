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
      errors: {
        firstName: { message: null, validated: false },
        lastName: { message: null, validated: false },
        email: { message: null, validated: false },
        celPhone: { message: null, validated: false },
        businessName: { message: null, validated: false },
        fantasyName: { message: null, validated: false },
        cuit: { message: null, validated: false },
        location: { message: null, validated: false },
        address: { message: null, validated: false },
        phone: { message: null, validated: false },
        dni: { message: null, validated: false },
        postalCode: { message: null, validated: false }
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

  validateInput = target => {
    if (target.validity.valueMissing)
      return 'Complete el campo ' + target.title.replace(':', '')
    if (target.validity.typeMismatch) return 'Formato inválido'
    if (target.validity.patternMismatch) return 'Formato inválido'
    return null
    // switch (name) {
    //   case 'email':
    //     message = validEmail(value)
    //   case 'cuit':
    //     message = validCuit(value)
    //   case 'celPhone':
    //     message = validCelPhone(value)
    //   case 'phone':
    //     message = validPhone(value)
    // }
  }

  onBlur = e => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'phone' && !value) return
    let message = this.validateInput(e.target)
    this.updateErrorsState(name, message)
  }

  updateErrorsState = (name, value) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [name]: { message: value, validated: true }
      }
    }))
  }

  updateClientState = (name, value) => {
    this.setState(prevState => ({
      client: { ...prevState.client, [name]: value }
    }))
  }

  handleFormSubmit = async e => {
    try {
      e.preventDefault()
      if (!e.target.checkValidity()) {
        var errors = this.validateForm(e)
        this.updateErrors(errors)
      } else {
        let client = this.state.client
        await http.put('/clients', client)
      }
    } catch (error) {
      console.log('error', error.message)
    }
  }

  updateErrors(errors) {
    this.setState(prevState => ({
      ...prevState,
      errors
    }))
  }

  validateForm(e) {
    var errors = {}
    for (let i = 0; i < e.target.length; i++) {
      const input = e.target[i]
      if (input.type !== 'button' && input.type !== 'radio') {
        if (input.name === 'phone' && !input.value) {
          errors[input.name] = { message: null, validated: false }
        } else {
          let message = this.validateInput(input)
          errors[input.name] = { message, validated: true }
        }
      }
    }
    return errors
  }

  render() {
    return (
      <div className="col-md-4">
        <h3 className="text-center">Bienvenido</h3>
        <h5 className="text-center">Rogamos, complete sus datos</h5>
        <br />
        <div className="container-fluid">
          <form
            className="form-horizontal"
            noValidate
            onSubmit={this.handleFormSubmit}
          >
            <Input
              tabIndex={1}
              title={'Email:'}
              name={'email'}
              inputType={'email'}
              value={this.state.client.email}
              placeholder={'ej: distripack@yahoo.com.ar'}
              onChange={this.handleInput}
              onBlur={this.onBlur}
              error={this.state.errors['email'].message}
              validated={this.state.errors['email'].validated}
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
              onBlur={this.onBlur}
              error={this.state.errors['firstName'].message}
              validated={this.state.errors['firstName'].validated}
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
              onBlur={this.onBlur}
              error={this.state.errors['lastName'].message}
              validated={this.state.errors['lastName'].validated}
              required
            />{' '}
            <Input
              tabIndex={4}
              title={'Celular:'}
              name={'celPhone'}
              inputType={'tel'}
              value={this.state.client.celPhone}
              placeholder={'ej: 2926454545'}
              pattern="[0-9]{10}"
              onKeyPress={this.formatcelPhone}
              onChange={this.handleInput}
              onBlur={this.onBlur}
              error={this.state.errors['celPhone'].message}
              validated={this.state.errors['celPhone'].validated}
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
              onBlur={this.onBlur}
              error={this.state.errors['fantasyName'].message}
              validated={this.state.errors['fantasyName'].validated}
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
              onBlur={this.onBlur}
              error={this.state.errors['businessName'].message}
              validated={this.state.errors['businessName'].validated}
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
                placeholder={'ej: 30-12345678-4 '}
                pattern="[0-9]{2}-[0-9]{8}-[0-9]{1}"
                required
                onBlur={this.onBlur}
                error={this.state.errors['cuit'].message}
                validated={this.state.errors['cuit'].validated}
                onKeyPress={this.formatCuit}
                onChange={this.handleInput}
              />
            )}{' '}
            {this.state.option === 'DNI' && (
              <Input
                tabIndex={9}
                title={'DNI:'}
                name={'dni'}
                inputType={'text'}
                value={this.state.client.dni}
                placeholder={'ej: 30.123.123 '}
                pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}"
                required
                onBlur={this.onBlur}
                error={this.state.errors['dni'].message}
                validated={this.state.errors['dni'].validated}
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
              placeholder={'seleccione localidad'}
              onChange={this.handleLocation}
              onBlur={this.onBlur}
              error={this.state.errors['location'].message}
              validated={this.state.errors['location'].validated}
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
              onBlur={this.onBlur}
              error={this.state.errors['address'].message}
              validated={this.state.errors['address'].validated}
              onChange={this.handleInput}
            />{' '}
            <Input
              tabIndex={12}
              title={'Teléfono fijo:'}
              name={'phone'}
              inputType={'tel'}
              value={this.state.client.phone}
              placeholder={'ej: 425566'}
              pattern="[0-9]{6}"
              onKeyPress={this.formatPhone}
              onChange={this.handleInput}
              onBlur={this.onBlur}
              error={this.state.errors['phone'].message}
              validated={this.state.errors['phone'].validated}
            />{' '}
            <Button type={'primary'} title={'Confirmar'} />
          </form>
        </div>
      </div>
    )
  }
}
