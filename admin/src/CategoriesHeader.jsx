import React, { Component, PropTypes } from 'react'
import InlineSVG from 'svg-inline-react'
import '../public/CategoriesHeader.css'
import Category from './Category'
import EditingCategory from './EditingCategory'
import addIcon from 'svg-inline!../public/add.svg'
import saveIcon from '../public/save.svg'



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

      <button id="add" onClick={props.addCategory}>
        <InlineSVG src={require('../public/add.svg')} />
      </button>
      <button id="save">
        <InlineSVG src={require('../public/save.svg')} />
      </button>
    </header>
  )
}
