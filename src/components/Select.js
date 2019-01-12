import React from 'react'

const Select = props => {
  let {
    name,
    title,
    message,
    error,
    validated,
    onChange,
    options,
    placeholder,
    ...selectProps
  } = props
  let success = validated && !error

  return (
    <div
      className={`form-group has-feedback
       ${success ? 'has-success' : ''} 
       ${error ? 'has-error' : ''}
       `}
    >
      <label
        htmlFor={name}
        className="control-label col-sm-4"
        style={{ paddingRight: 0 }}
      >
        {' '}
        {props.title}{' '}
      </label>
      <div className="col-sm-7">
        <select
          tabIndex={props.tabIndex}
          className="form-control"
          title={title}
          id={name}
          name={name}
          onChange={onChange}
          {...selectProps}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => {
            return (
              <option key={option} value={option} label={option}>
                {option}
              </option>
            )
          })}
        </select>
        {/* <span
          className={`
          ${error ? 'glyphicon glyphicon-remove form-control-feedback' : ''}
          ${success ? 'glyphicon glyphicon-ok form-control-feedback' : ''}
          `}
          style={{ marginRight: '5px' }}
          aria-hidden="true"
        /> */}
        {error ? <div className="invalid-feedback">{error}</div> : null}
      </div>
    </div>
  )
}

export default Select
