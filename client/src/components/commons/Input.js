import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    index: PropTypes.number,
    handleChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    upperCase: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    required: PropTypes.bool,
    height: PropTypes.string,
    success: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    inputPadding: PropTypes.string,
    inputHeight: PropTypes.string
}

const Input = ({ height, required = false, disabled = false, title = undefined, handleChange, name, value, placeholder, type = 'text' }) => {
    return (
        <div style={{ width: '100%', height: height, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            { title && <p className='inpt-title'>{title}</p>}
                <input 
                    type={type} 
                    className='inpt' 
                    name={name} 
                    onChange={handleChange} 
                    value={value}
                    placeholder={placeholder ? placeholder : ""}
                    disabled={disabled}
                    required={required}
                />
        </div>
    )
}

Input.propTypes = propTypes


export default Input;