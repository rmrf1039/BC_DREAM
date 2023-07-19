import Form from 'react-bootstrap/Form';

import { Select } from "nes-ui-react";

const SelectT = (props) => {

  return (
    <Form.Group className="mb-3" controlId={props.name || ''}>
      <Select
        name={props.name}
        value={props.value}
        label={props.title || ''}
        onChange={props.setValue}
        
      >
        <option value="" disabled hidden>Select...</option>
        {(props.options || []).map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Select>
    </Form.Group>
  )
}

export default SelectT;