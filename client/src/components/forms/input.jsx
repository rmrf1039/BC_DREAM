import React from 'react'

import { Input } from "nes-ui-react";

import Form from 'react-bootstrap/Form';
const InputT = (props) => {
  return (
    <Form.Group controlId={props.name || ''}>
      <Input
        type={props.type || 'text'}
        name={props.name}
        placeholder={props.placeholder || ''}
        value={props.value}
        label={props.title || ''}
        onChange={props.setValue}
      />
    </Form.Group>
  )
}

export default InputT