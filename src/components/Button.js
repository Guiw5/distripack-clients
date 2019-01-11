import React from 'react'

const Button = props => {
  return (
    <button
      className={
        (props.type === 'primary' ? 'btn btn-primary' : 'btn btn-secondary') +
        ' center-block col-md-5'
      }
      style={{ float: 'none' }}
      onClick={props.action}
    >
      {props.title}
    </button>
  )
}

export default Button
