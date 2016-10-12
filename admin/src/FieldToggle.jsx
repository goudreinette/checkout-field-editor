import React from 'react'

export default props => (
    <button className={`${props.name} ${props.enabled ? 'enabled' : ''}`} onClick={_ => props.updateField(props.i, props.name, !props.enabled)}>
        {props.name}
    </button>
)