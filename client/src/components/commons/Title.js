import React from 'react'

const Title = ({ title , style = {} }) => {
    return (  
        <p style={{ ...style }} className='title'>
            {title}
        </p>
    );
}
 
export default Title;