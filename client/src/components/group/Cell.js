import React from 'react'

const Cell = ({ first = false, components = [], action = undefined }) => {
    return ( 
        <div onClick={action} className='header-20 header-single'>
            {
                components
            }
        </div>
    );
}
 
export default Cell;