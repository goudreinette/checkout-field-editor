import React from 'react'

export default function EditingCategory(props)
{
  return (
    <input
      className='category active'
      value={props.name}
      onChange={e => props.updateName(e.target.value)}
      onKeyDown={e => e.keyCode === 13 ? props.stopEditing() : null}
      autoFocus={true}
      />
  )
}
