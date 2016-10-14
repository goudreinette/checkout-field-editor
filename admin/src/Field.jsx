import React from 'react'
import InlineSVG from 'svg-inline-react'
import { title, snakeCase } from 'change-case'
import FieldToggle from './FieldToggle'
import removeIcon from '../public/remove.svg'

export default function Field({name, type, required, showOnEmails, updateField, removeField, i})
{
  console.log(showOnEmails)
  return (
    <div className='field'>
      <input
        placeholder="Field"
        value={title(name)}
        onChange={e => updateField(i, 'name', snakeCase(e.target.value))}
        />

      <div className="middle">
        <select className="type" value={type} onChange={e => updateField(i, 'type', e.target.value)}>
          <option value="input">Input</option>
          <option value="Textarea">Textarea</option>
          <option value="Checkbox">Checkbox</option>
          <option value="Select">Select</option>
        </select>
      </div>


      <div className="right">
        <FieldToggle updateField={updateField} name='showOnEmails' enabled={showOnEmails} i={i} />
        <FieldToggle updateField={updateField} name='required' enabled={required} i={i} />
      </div>

      <button className="remove" onClick={_ => removeField(i)} >
        <InlineSVG src={require('../public/remove.svg')} />
      </button>

    </div>
  )
}
