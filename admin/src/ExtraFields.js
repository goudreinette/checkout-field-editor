import React from 'react'
import '../public/ExtraFields.css'
import Field from './Field'

export default function ExtraFields ({fields})
{
  console.log(fields)
  return (
    <main id='extra-fields'>
      {
        fields.map((field, i) => <Field {...field} key={i}/>)
      }
    </main>
  )
}
