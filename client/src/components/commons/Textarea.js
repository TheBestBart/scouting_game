import React from 'react'

const Textarea = ({ name, value, handleChange, style = { width: '90%', height: 'auto' }, required = false,  placeholder, disabled = false, className = 'inpt'}) => {
    return (  
        <textarea
            value={value}
            className={className}
            rows='10'
            onChange={handleChange}
            name={name}
            style={{ ...style }}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
        />
    );
}

export default Textarea;