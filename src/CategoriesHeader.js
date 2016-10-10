import React, {Component, PropTypes} from 'react'
import '../public/CategoriesHeader.css'
import EditingCategory from './EditingCategory'

export default function CategoriesHeader (props)
{
  return (
    <header id='categories'>
      {
        props.categories.map((category, i) =>

        props.editingCategory && props.currentTab == i
          ?  <EditingCategory
            name={category.name}
            key={i}
            updateName={props.updateName}
            stopEditing={props.stopEditing}
             />
        :  <div className={`category ${props.currentTab == i ? 'active' : ''}`} key={i} onClick={_ => props.currentTab == i ? props.toggleEditing(i) : props.switchTab(i)}>
          {category.name}
        </div>
        )
      }

      <div id="add" onClick={props.addCategory}/>
    </header>
  )
}
