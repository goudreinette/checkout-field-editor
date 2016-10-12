import React from 'react'
import Sortable from 'react-sortablejs'
import '../public/ExtraFields.css'
import Field from './Field.jsx'

export default function ExtraFields({fields, addField, updateField, moveField, removeField})
{
  return (
    <main id='extra-fields'>
      <Sortable onChange={(_, __, {oldIndex, newIndex}) => moveField(oldIndex, newIndex)}>
        {
          fields.map((field, i) => <Field {...field} updateField={updateField} removeField={removeField} key={i} i={i} />)
        } 
      </Sortable>

      <div className="field" id="add" onClick={addField} />
    </main>
  )
}
