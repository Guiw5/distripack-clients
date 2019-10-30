import React from 'react'

const Button = props => {
  return (
    <button
      type="submit"
      className={`btn btn-${props.type} center-block col-md-5`}
      style={{ float: 'none', marginBottom: '15px' }}
      onClick={props.action}
    >
      {props.title}
    </button>
  )
}

export default Button
