import React from 'react'
import Spinner from 'react-spinkit'
import InlineSVG from 'svg-inline-react'


export default props =>
    <header>
        <h5>Extra Fields</h5>
        {
            props.saving
                ?
                <div id="save">
                    <Spinner spinnerName="wave" overrideSpinnerClassName="saving"/>
                </div>

                :
                <button id="save" onClick={props.save}>
                    <InlineSVG src={require('../public/save.svg')}/>
                </button>
        }
    </header>
