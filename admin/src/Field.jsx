import React from 'react'

export default function Field(props) {
  return (
    <div className='field'>
      <input placeholder="Field" />

      <div className="middle">
        <select className="type">
          <option value="input">Input</option>
          <option value="Textarea">Textarea</option>
          <option value="Checkbox">Checkbox</option>
          <option value="Select">Select</option>
        </select>
      </div>


      <div className="right">
        <button className="required">required</button>
        <button className="email">show on email</button>
      </div>

    </div>
  )
}
