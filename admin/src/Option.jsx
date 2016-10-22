import React from 'react'
import InlineSVG from 'svg-inline-react'

export default props =>
    <div className="option">
        <input
            className="value"
            placeholder="Option"
            value={props.value}
            onChange={e => props.updateOptionName(props.i, e.target.value)}
        />
        <button className="remove" onClick={_ => props.removeOption(props.i)}>
            <InlineSVG src={require('../public/remove.svg')}/>
        </button>
    </div>