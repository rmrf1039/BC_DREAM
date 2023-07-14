import React from 'react'

const Input = (props) => {
  return (
    <div className="mb-3">
        <label htmlFor={props.name || ''} className="form-label">{props.title || ''}</label>
        <input
          type={props.type || 'text'}
          className="form-control"
          id={props.name || ''}
          name={props.name}
          placeholder={props.placeholder || ''}
          value={props.value}
          onChange={props.setValue}
        />
    </div>
  )
}

export default Input