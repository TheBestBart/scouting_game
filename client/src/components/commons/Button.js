import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ name, action = undefined, text, style = {}, type = undefined, className = 'btn' }) => {
    return (
        <button name={name} type={type && type} style={{...style}} className={className} onClick={action}>
            {text}
        </button>
    )
}

Button.propTypes = {
    action: PropTypes.func,
    text: PropTypes.string
}

export default Button;