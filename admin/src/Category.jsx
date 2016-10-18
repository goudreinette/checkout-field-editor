import React from 'react'
import InlineSVG from 'svg-inline-react'

export default props => (
    <div
        className={`category ${props.active ? 'active' : ''}`}
        onClick={_ => props.active ? props.toggleEditing(props.i) : props.switchTab(props.i)
        }>
        {props.name}

        <button className="remove" onClick={_ => _} >
            <InlineSVG src={require('../public/remove.svg')} />
        </button>
    </div>
)
