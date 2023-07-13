import React from 'react'

const Input = (props) => {
  return (
    <div className="mb-3">
        <label htmlFor={props.id || ''} className="form-label">{props.title || ''}</label>
        <input
          type={props.type || 'text'}
          className="form-control"
          id={props.id || ''}
          placeholder={props.placeholder || ''}
          value={props.value}
          onChange={(event) => props.setValue(event.target.value)}
        />
    </div>
  )
}

export default Input