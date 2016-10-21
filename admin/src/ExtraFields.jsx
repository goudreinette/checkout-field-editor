import React from 'react'
import Sortable from 'react-sortablejs'
import '../public/ExtraFields.css'
import Field from './Field.jsx'
import ExtraFieldsHeader from './ExtraFieldsHeader'
import SelectEditor from './SelectEditor'

export default function ExtraFields ({fields, addField, updateField, moveField, removeField, save, saving})
{
    return (
        <main id='extra-fields'>
            <ExtraFieldsHeader save={save} saving={saving}/>
            <SelectEditor/>
            <div id='extra-fields-wrapper'>
                <Sortable onChange={(_, __, {oldIndex, newIndex}) => moveField(oldIndex, newIndex)}>
                    {
                        fields.map((field, i) => <Field {...field} updateField={updateField} removeField={removeField}
                                                        key={i} i={i}/>)
                    }
                </Sortable>
                <div className="field" id="add" onClick={addField}/>
            </div>
        </main>
    )
}
