import React from 'react'
import addIcon from 'svg-inline!../public/add.svg'
import InlineSVG from 'svg-inline-react'


export default props =>
<header>
      <h5>Extra Fields</h5>
      <button id="save" onClick={props.save}>
            <InlineSVG src={require('../public/save.svg')} />
      </button>
</header>
