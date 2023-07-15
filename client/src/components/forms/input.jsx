import React from 'react'

import Form from 'react-bootstrap/Form';

const Input = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.name || ''}>
      <Form.Label>{props.title || ''}</Form.Label>
      <Form.Control
        type={props.type || 'text'}
        name={props.name}
        placeholder={props.placeholder || ''}
        value={props.value}
        onChange={props.setValue}
      />
    </Form.Group>
  )
}

export default Input