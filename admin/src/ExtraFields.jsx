import React from 'react'
import Sortable from 'react-sortablejs'
import '../public/ExtraFields.css'
import Field from './Field.jsx'

export default function ExtraFields({fields}) {
  console.log(fields)
  return (
    <main id='extra-fields'>
      <Sortable>
        {
          fields.map((field, i) => <Field {...field} key={i} />)
        }
      </Sortable>

      <div className="field" id="add" />
    </main>
  )
}