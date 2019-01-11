import React from 'react'

const Input = props => {
  let { name, title, message, inputType, onChange, ...inputProps } = props
  return (
    <div className="form-group">
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
          title={message}
          id={name}
          name={name}
          type={inputType}
          onChange={onChange}
          {...inputProps}
        />
      </div>
      <span className="validity" />
    </div>
  )
}

export default Input
