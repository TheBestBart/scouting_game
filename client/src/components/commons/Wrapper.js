import React from 'react'

const Wrapper = ({ className = 'wrpr', children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
 
export default Wrapper;