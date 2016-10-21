import React from 'react'
import Sortable from 'react-sortablejs'
import Option from './Option'
import {titleCase, snakeCase} from 'change-case'
import '../public/SelectEditor.css'

export default props =>
    <main id="select-editor" className={props.show ? 'show' : 'hidden'}>
        <input
            value={titleCase(props.field.name)}
            onChange={e => props.updateOptionName(snakeCase(e.target.value))}
        />
        <Sortable onChange={(_, __, {oldIndex, newIndex}) => props.moveOption(oldIndex, newIndex)}>
            {
                props.field.options ? props.field.options.map((value, i) =>
                    <Option
                        i={i}
                        key={i}
                        value={value}
                        updateOptionName={props.updateOptionName}
                        removeOption={props.removeOption}
                    />)
                    : null
            }
        </Sortable>
        <div className="field" id="add" onClick={props.addOption}/>
    </main>