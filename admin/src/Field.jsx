import React from 'react'
import FieldToggle from './FieldToggle'
import { title, snakeCase } from 'change-case'

export default function Field({name, type, required, showOnEmail, updateField, i})
{
  return (
    <div className='field'>
      <input placeholder="Field" onChange={e => updateField(i, 'name', snakeCase(e.target.value))} value={title(name)} />

      <div className="middle">
        <select className="type">
          <option value="input">Input</option>
          <option value="Textarea">Textarea</option>
          <option value="Checkbox">Checkbox</option>
          <option value="Select">Select</option>
        </select>
      </div>


      <div className="right">
        <FieldToggle updateField={updateField} name='required' enabled={required} i={i} />
      </div>

    </div>
  )
}
