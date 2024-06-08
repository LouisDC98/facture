import React from 'react'

function BtnCustom(props) {
    let {title, position, action} = props

    return (
        <button className={`${position} button-82-pushable elementToHide`} onClick={() => action()}>
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
            {title}
            </span>
        </button>
    )
}

export default BtnCustom