import React, {Component} from 'react'
import update from 'immutability-helper'
import 'array.prototype.move'
import logo from '../public/logo.svg'
import '../public/Admin.css'
import CategoryList from './CategoryList'
import ExtraFields from './ExtraFields'
import SelectEditor from './SelectEditor'
import {Field, Category, initialCategories, categoryNames} from './Model'

window.initialCategories = initialCategories

update.extend('$move', ([a, b], arr) =>
{
    return [...arr.move(a, b)]
})

export default class Admin extends Component {
    constructor ()
    {
        super()
        this.state = {
            currentTab: 0,
            editingCategory: false,
            categories: window.categories || initialCategories,
            categoryNames: window.categoryNames || categoryNames,
            editingSelect: null, // index
            saving: false
        }
    }

    save ()
    {
        this.setState({saving: true})
        setTimeout(() => this.setState({saving: false}), 2200)

        window.jQuery.post(window.ajaxurl, {
            action: 'saveCheckoutFields',
            categories: this.state.categories,
        })
    }

    switchTab (index)
    {
        this.stopEditing()
        this.setState({currentTab: index})
    }

    addCategory ()
    {
        this.stopEditing()

        this.setState(
            update(this.state, {
                categories: {$push: [new Category()]},
                currentTab: {$set: this.state.categories.length},
                editingCategory: {$set: true}
            })
        )
    }

    editCategory (index)
    {
        this.stopEditing()
        this.setState({
            currentTab: index,
            editingCategory: true
        })
    }

    removeCategory (e, index)
    {
        e.stopPropagation()
        this.setState(
            update(this.state, {
                categories: {$splice: [[index, 1]]},
                editCategory: {$set: false},
                currentTab: {$set: (index - 1) >= 0 ? index - 1 : 0}
            })
        )
    }

    addField ()
    {
        this.setState(
            update(this.state, {categories: {[this.state.currentTab]: {extraFields: {$push: [new Field()]}}}})
        )
    }

    moveField (from, to)
    {
        this.setState(
            update(this.state, {categories: {[this.state.currentTab]: {extraFields: {$move: [from, to]}}}})
        )
    }

    removeField (index)
    {
        this.setState(
            update(this.state, {categories: {[this.state.currentTab]: {extraFields: {$splice: [[index, 1]]}}}})
        )
    }

    updateField (index, key, value)
    {
        this.setState(update(this.state, {
            categories: {[this.state.currentTab]: {extraFields: {[index]: {[key]: {$set: value}}}}}
        }))
    }

    updateName (name)
    {
        const categories                  = this.state.categories
        const category                    = categories[this.state.currentTab]
        category.name                     = name
        categories[this.state.currentTab] = category

        this.setState({
            categories
        })
    }


    stopEditing ()
    {
        this.setState({
            editingCategory: false,
            categories: this.filterEmptyCategories(this.state.categories)
        })
    }

    filterEmptyCategories (categories)
    {
        categories = categories.filter(c => c.name != '')
        if (categories.length == 0)
            categories.push(new Category())

        return categories
    }

    addOption ()
    {
        this.setState(update(this.state, {
            categories: {
                [this.state.currentTab]: {
                    extraFields: {[this.state.editingSelect]: {options: {$push: [['']]}}}
                }
            }
        }))
    }

    updateOptionName (index, name)
    {
        this.setState(update(this.state, {
            categories: {
                [this.state.currentTab]: {extraFields: {[this.state.editingSelect]: {options: {[index]: {$set: name}}}}}
            }
        }))
    }

    removeOption (index)
    {
        this.setState(update(this.state, {
            categories: {
                [this.state.currentTab]: {extraFields: {[this.state.editingSelect]: {options: {$splice: [[index, 1]]}}}}
            }
        }))
    }

    moveOption (from, to)
    {
        this.setState(update(this.state, {
            categories: {
                [this.state.currentTab]: {extraFields: {[this.state.editingSelect]: {options: {$move: [from, to]}}}}
            }
        }))
    }

    editSelect (index)
    {
        console.log(index)
        this.setState({
            editingSelect: index
        })
    }

    stopEditingSelect ()
    {
        console.log('here')
        this.setState({
            editingSelect: null
        })
    }

    render ()
    {
        return (
            <div id="admin">
                <CategoryList
                    categories={this.state.categories}
                    categoryNames={this.state.categoryNames}
                    editingCategory={this.state.editingCategory}
                    addCategory={this.addCategory.bind(this)}
                    toggleEditing={this.editCategory.bind(this)}
                    removeCategory={this.removeCategory.bind(this)}
                    currentTab={this.state.currentTab}
                    updateName={this.updateName.bind(this)}
                    stopEditing={this.stopEditing.bind(this)}
                    switchTab={this.switchTab.bind(this)}
                />
                <ExtraFields
                    fields={this.state.categories.length && this.state.currentTab !== null ? this.state.categories[this.state.currentTab]['extraFields'] : []}
                    editingSelect={this.state.editingSelect}
                    saving={this.state.saving}
                    addField={this.addField.bind(this)}
                    stopEditing={this.stopEditing.bind(this)}
                    updateField={this.updateField.bind(this)}
                    moveField={this.moveField.bind(this)}
                    removeField={this.removeField.bind(this)}
                    removeOption={this.removeOption.bind(this)}
                    updateOptionName={this.updateOptionName.bind(this)}
                    addOption={this.addOption.bind(this)}
                    moveOption={this.moveOption.bind(this)}
                    editSelect={this.editSelect.bind(this)}
                    stopEditingSelect={this.stopEditingSelect.bind(this)}
                    save={this.save.bind(this)}
                />
            </div>
        )
    }
}
