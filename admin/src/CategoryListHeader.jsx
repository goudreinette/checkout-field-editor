import React from 'react'
import addIcon from 'svg-inline!../public/add.svg'
import InlineSVG from 'svg-inline-react'


export default props =>
<header>
  <h5>Categories</h5>
  <button id="add" onClick={props.addCategory}>
    <InlineSVG src={require('../public/add.svg')} />
  </button>
</header>
