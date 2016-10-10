import React from 'react'
import '../public/ExtraFields.css'

export default function ExtraFields ({fields})
{
  console.log()
  return (
    <main id='extra-fields'>
      {
        Object.keys(fields).map(field => <div className="field">{fields[field].label}</div>)
      }
    </main>
  )
}
