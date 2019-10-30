import React from 'react'

const Input = props => {
  const {
    name,
    title,
    message,
    error,
    validated,
    inputType,
    onChange,
    ...inputProps
  } = props
  const success = validated && !error
  return (
    <div
      className={`form-group
       ${success ? 'has-success has-feedback' : ''} 
       ${error ? 'has-error has-feedback' : ''}
       `}
    >
      <label
        htmlFor={name}
        className="control-label col-sm-4"
        style={{ paddingRight: 0 }}
      >
        {title}
      </label>
      <div className="col-sm-7">
        <input
          className="form-control"
          title={title}
          id={name}
          name={name}
          type={inputType}
          onChange={onChange}
          {...inputProps}
        />
        <span
          className={`
          ${error ? 'glyphicon glyphicon-remove form-control-feedback' : ''}
          ${success ? 'glyphicon glyphicon-ok form-control-feedback' : ''}
          `}
          aria-hidden="true"
        />
        {error ? <div className="invalid-feedback">{error}</div> : null}
      </div>
    </div>
  )
}

export default Input
