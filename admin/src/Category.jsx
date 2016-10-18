import React from 'react'
import InlineSVG from 'svg-inline-react'
import {includesLoose} from './Utils'


export default props => (
    <div
        className={`category ${props.active ? 'active' : ''} ${props.categoryNames.includes(props.name) ? 'exists' : ''}`}
        onClick={_ => props.active ? props.toggleEditing(props.i) : props.switchTab(props.i)
        }>
        {props.name}

        <button className="remove" onClick={_ => _} >
            <InlineSVG src={require('../public/remove.svg')} />
        </button>
    </div>
)
