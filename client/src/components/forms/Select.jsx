const Select = (props) => {
  //value={this.state.value} onChange={this.handleChange}

  return (
    <div className="mb-3">
      <label htmlFor={props.name || ''} className="form-label">{props.title || ''}</label>
      <select
        className="form-select"
        aria-label="select"
        value={props.value}
        onChange={(event) => props.setValue(event.target.value)}
      >
        <option value="" disabled>Choose</option>
        {(props.options || []).map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;