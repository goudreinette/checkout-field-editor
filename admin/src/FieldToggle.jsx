import React from 'react'
import { noCase } from 'change-case'

export default props => (
    <button className={`${props.name} ${props.enabled ? 'enabled' : ''}`} onClick={_ => props.updateField(props.i, props.name, !props.enabled)}>
        {noCase(props.name)}
    </button>
)