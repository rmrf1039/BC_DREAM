import React from 'react'

const Input = (props) => {
  return (
    <input
      value={props.value}
      onChange={(event) => props.setValue(event.target.value)}
    />
  )
}

export default Input