import React, { Component, PropTypes } from 'react'
import '../public/CategoriesHeader.css'
import Category from './Category'
import EditingCategory from './EditingCategory'

export default function CategoriesHeader(props)
{
  return (
    <header id='categories'>
      {
        props.categories.map((category, i) =>

          props.editingCategory && props.currentTab == i
            ? <EditingCategory
              name={category.name}
              key={i}
              updateName={props.updateName}
              stopEditing={props.stopEditing}
              />
            : <Category
              i={i}
              key={i}
              active={props.currentTab == i}
              name={category.name}
              toggleEditing={props.toggleEditing}
              switchTab={props.switchTab}
              />
        )
      }

      <button id="add" onClick={props.addCategory} />
      <button id="save" />
    </header>
  )
}
