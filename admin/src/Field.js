import React from 'react'

export default function Field (props)
{
  return (
    <div className='field'>
      <input placeholder="Field"/>

      <button className="required">*</button>
      <button className="email"></button>

    </div>
  )
}
