import React from 'react'

export default props => (
    <div
        className={`category ${props.active ? 'active' : ''}`}
        onClick={_ => props.active ? props.toggleEditing(props.i) : props.switchTab(props.i)
        }>
        {props.name}
    </div>
)