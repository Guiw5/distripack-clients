import React from 'react'

const Radio = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="control-label col-sm-4">
        {props.title}
      </label>
      <div className="col-sm-7">
        {props.options.map(option => {
          return (
            <label key={option} className="radio-inline">
              <input
                tabIndex={props.tabIndex}
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                value={option}
                checked={props.selectedOption === option}
                type="radio"
              />
              {option}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default Radio
