import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array(),
    name: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    style: PropTypes.object
}

function Select({ style, width = '100%', height = '100px', required = false, disabled = false , name, options, handleChange = undefined, value, title = undefined }) {
 
    return (
        <div style={{ height: height, width: width}}>
            { title && <p className='inpt-title'>{title}</p>}
            <select 
                onChange={handleChange}
                value={value}
                name={name} 
                id={name}
                disabled={disabled}
                required={required}
                className='select'
                style={{
                    backgroundColor: value && 'white', 
                    ...style
                }} 
            >
                <option value=''>-</option>
                {
                    options && options.map((option, index) => {
                        
                        return <option className='ui-my-profile-content-aa-option'  key={index} value={option}>{option}</option>
                    })
                }
            </select>
        </div>
    )
}

Select.propTypes = propTypes

export default Select


