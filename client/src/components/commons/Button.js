import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ action = undefined, text, style = {}, type = undefined, className = 'btn' }) => {
    return (
        <button type={type && type} style={{...style}} className={className} onClick={action}>
            {text}
        </button>
    )
}

Button.propTypes = {
    action: PropTypes.func,
    text: PropTypes.string
}

export default Button;