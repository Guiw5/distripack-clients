import React from 'react'

const Select = props => {
  return (
    <div className="form-group">
      <label
        htmlFor={props.name}
        className="control-label col-sm-4"
        style={{ paddingRight: 0 }}
      >
        {' '}
        {props.title}{' '}
      </label>
      <div className="col-sm-7">
        <select
          tabIndex={props.tabIndex}
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className="form-control"
        >
          <option value="" disabled>
            {props.placeholder}
          </option>
          {props.options.map(option => {
            return (
              <option key={option} value={option} label={option}>
                {option}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Select
