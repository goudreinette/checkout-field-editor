import React from 'react'
import Sortable from 'react-sortablejs'
import '../public/ExtraFields.css'
import Field from './Field.jsx'
import ExtraFieldsHeader from './ExtraFieldsHeader'
import SelectEditor from './SelectEditor'

export default function ExtraFields ({
    fields, addField, updateField, moveField,
    removeField, save, saving, editingSelect, editSelect,
    addOption, updateOptionName, removeOption, moveOption, stopEditingSelect
})
{
    return (
        <main id='extra-fields'>
            <ExtraFieldsHeader save={save} editingSelect={editingSelect} saving={saving}
                               stopEditingSelect={stopEditingSelect}/>
            <SelectEditor
                editingSelect={editingSelect}
                show={editingSelect != null}
                field={editingSelect != null ? fields[editingSelect] : {}}
                addOption={addOption}
                updateOptionName={updateOptionName}
                removeOption={removeOption}
                moveOption={moveOption}
                updateField={updateField}
            />

            <div id='extra-fields-wrapper'>
                <Sortable onChange={(_, __, {oldIndex, newIndex}) => moveField(oldIndex, newIndex)}>
                    {
                        fields.map((field, i) => <Field {...field} updateField={updateField} removeField={removeField}
                                                        editSelect={editSelect}
                                                        key={i} i={i}/>)
                    }
                </Sortable>
                <div className="field" id="add" onClick={addField}/>
            </div>
        </main>
    )
}
