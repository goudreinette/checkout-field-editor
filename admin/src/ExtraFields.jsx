import React from 'react'
import Sortable from 'react-sortablejs'
import '../public/ExtraFields.css'
import Field from './Field.jsx'

export default function ExtraFields({fields, addField, updateField})
{
  console.log(fields)
  return (
    <main id='extra-fields'>
      <Sortable>
        {
          fields.map((field, i) => <Field {...field} updateField={updateField} key={i} i={i}/>)
        }
      </Sortable>

      <div className="field" id="add" onClick={addField} />
    </main>
  )
}
