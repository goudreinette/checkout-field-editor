import React, { Component } from 'react'
import update from 'immutability-helper'
import 'array.prototype.move'
import logo from '../public/logo.svg'
import '../public/Admin.css'
import CategoryList from './CategoryList'
import ExtraFields from './ExtraFields'
import {Field, Category, initialCategories, categoryNames} from './Model'


update.extend('$move', ([a, b], arr) =>
{
  return [...arr.move(a, b)]
})

export default class Admin extends Component
{
  constructor()
  {
    super()
    this.state = {
      currentTab: 0,
      editingCategory: false,
      categories: window.initialCategories || initialCategories,
      categoryNames: window.categoryNames || []
    }
  }

  save()
  {
    window.jQuery.post(window.ajaxurl, {
      action: 'saveCheckoutFields',
      categories: this.state.categories,
    }, (res) =>
    {
      console.log(res)
    })
  }

  switchTab(index)
  {
    this.stopEditing()
    this.setState({ currentTab: index })
  }

  addCategory()
  {
    this.stopEditing()

    this.setState(
      update(this.state, {
        categories: { $push: [new Category()] },
        currentTab: { $set: this.state.categories.length },
        editingCategory: { $set: true }
      })
    )
  }

  editCategory(index)
  {
    this.stopEditing()
    this.setState({
      currentTab: index,
      editingCategory: true
    })
  }

  removeCategory(e, index)
  {
    e.stopPropagation()
    this.stopEditing()
    this.setState(
      update(this.state, {
        categories: { $splice: [[index, 1]] },
        editCategory: {$set: false},
        currentTab: {$set: (index - 1) >= 0 ? index - 1 : 0 }
      })
    )
  }

  addField()
  {
    this.setState(
      update(this.state, { categories: { [this.state.currentTab]: { extraFields: { $push: [new Field()] } } } })
    )
  }

  moveField(indexA, indexB)
  {
    this.setState(
      update(this.state, { categories: { [this.state.currentTab]: { extraFields: { $move: [indexA, indexB] } } } })
    )
  }

  removeField(index)
  {
    this.setState(
      update(this.state, { categories: { [this.state.currentTab]: { extraFields: { $splice: [[index, 1]] } } } })
    )
  }

  updateField(index, key, value)
  {
    this.setState(update(this.state, {
      categories: { [this.state.currentTab]: { extraFields: { [index]: { [key]: { $set: value } } } } }
    }))
  }

  updateName(name)
  {
    console.log(this.__proto__)

    const categories = this.state.categories
    const category = categories[this.state.currentTab]
    category.name = name
    categories[this.state.currentTab] = category

    this.setState({
      categories
    })
  }


  stopEditing()
  {
    this.setState({
      editingCategory: false,
      categories: this.filterEmptyCategories(this.state.categories)
    })
  }

  filterEmptyCategories(categories)
  {
    console.log(categories)
    return categories.filter(c => c.name != '')
  }

  render()
  {
    return (
      <div id="admin">
        <CategoryList
          editingCategory={this.state.editingCategory}
          categories={this.state.categories}
          categoryNames={this.state.categoryNames}
          addCategory={this.addCategory.bind(this)}
          toggleEditing={this.editCategory.bind(this)}
          removeCategory={this.removeCategory.bind(this)}
          currentTab={this.state.currentTab}
          updateName={this.updateName.bind(this)}
          stopEditing={this.stopEditing.bind(this)}
          switchTab={this.switchTab.bind(this)}
          save={this.save.bind(this)}
        />
        <ExtraFields
          fields={this.state.categories.length ? this.state.categories[this.state.currentTab].extraFields : []}
          addField={this.addField.bind(this)}
          stopEditing={this.stopEditing.bind(this)}
          updateField={this.updateField.bind(this)}
          moveField={this.moveField.bind(this)}
          removeField={this.removeField.bind(this)}
        />
      </div>
    )
  }
}
