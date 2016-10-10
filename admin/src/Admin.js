import React, { Component } from 'react'
import logo from '../public/logo.svg'
import '../public/Admin.css'
import CategoriesHeader from './CategoriesHeader'
import ExtraFields from './ExtraFields'


function Category (name)
{
  this.name = ''
  this.extraFields = []
}

export default class Admin extends Component
{
  constructor ()
  {
    super()
    this.state = {
      currentTab: 0,
      editingCategory: false,
      categories: [
        {
          name: 'tickets',
          extraFields: [
            {
              label: 'Ticket Notes',
              name: 'ticket_notes',
              placeholder: 'Leave your notes here...',
              required: false
            }
          ]
        }
      ]
    }
  }

  addCategory ()
  {
    const categories = this.filterEmptyCategories()
      .concat([new Category()])

    this.stopEditing()
    this.setState({
      categories,
      editingCategory: true,
      currentTab: categories.length - 1
    })
  }

  updateName (name)
  {
    const categories = this.state.categories
    const category = categories[this.state.currentTab]
    category.name = name
    categories[this.state.currentTab] = category

    this.setState({
      categories
    })
  }

  stopEditing ()
  {
    const categories = this.filterEmptyCategories()

    this.setState({
      editingCategory: false,
      categories: categories,
      currentTab: categories.length - 1
    })
  }

  filterEmptyCategories ()
  {
    const categories = this.state.categories.filter(c => c.name != '')
    this.setState({categories})
    return categories
  }

  render ()
  {
    return (
      <div id="admin">
        <CategoriesHeader
          editingCategory={this.state.editingCategory}
          categories={this.state.categories}
          addCategory={this.addCategory.bind(this)}
          toggleEditing={i => this.setState({editingCategory: !this.state.editingCategory, currentTab: i, categories: this.state.categories.filter(c => c.name != '')})}
          currentTab={this.state.currentTab}
          updateName={this.updateName.bind(this)}
          stopEditing={this.stopEditing.bind(this)}
          switchTab={i => this.setState({currentTab: i, editingCategory: false,  categories: this.state.categories.filter(c => c.name != '')})}
        />
        <ExtraFields
          stopEditing={this.stopEditing.bind(this)}
          fields={this.state.categories[this.state.currentTab].extraFields}
        />
      </div>
    )
  }
}
