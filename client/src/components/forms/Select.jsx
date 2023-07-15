import Form from 'react-bootstrap/Form';

const Select = (props) => {

  return (
    <Form.Group className="mb-3" controlId={props.name || ''}>
      <Form.Label>{props.title || ''}</Form.Label>
      <Form.Select
        aria-label="select input"
        name={props.name}
        value={props.value}
        onChange={props.setValue}
      >
        <option value="" disabled>Choose</option>
        {(props.options || []).map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default Select;