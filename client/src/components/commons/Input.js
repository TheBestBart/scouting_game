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
    disabled: PropTypes.bool,
    min: PropTypes.number,
    required: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string
}

const Input = ({ width = '100%', divStyle = {}, inputStyle = {}, titleStyle = {}, max = undefined, min = undefined, height, required = false, disabled = false, title = undefined, handleChange, name, value, placeholder, type = 'text' }) => {
    let propStyle = { width: width, height: height, display: 'flex', alignItems: 'center', flexDirection: 'column' };
    return (
        <div style={ divStyle ? divStyle : propStyle }>
            { title && <p style={{ ...titleStyle}} className='inpt-title'>{title}</p>}
                <input 
                    type={type} 
                    className='inpt' 
                    name={name} 
                    onChange={handleChange} 
                    value={value}
                    min={min}
                    placeholder={placeholder ? placeholder : ""}
                    disabled={disabled}
                    required={required}
                    style={{ ...inputStyle }}
                />
        </div>
    )
}

Input.propTypes = propTypes


export default Input;