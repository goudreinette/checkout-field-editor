import React from 'react'
import {filterSuggestions, includesLoose} from './Utils'

export default function EditingCategory(props)
{
  return (
    <div>
      <input
        className={'category active ' + (props.categoryNames.includes(props.name) ? 'exists' : '')}
        value={props.name}
        onChange={e => props.updateName(e.target.value)}
        onKeyDown={e => e.keyCode === 13 ? props.stopEditing() : null}
        autoFocus={true}
      />
      <ul id="suggestions">
        {
          filterSuggestions(props.name, props.categoryNames).map(categoryName =>
            <li
              className={"suggestion " + (categoryName == props.name ? 'active' : '')}
              key={categoryName}
            >
              {categoryName}
            </li>)
        }
      </ul>
    </div>
  )
}
