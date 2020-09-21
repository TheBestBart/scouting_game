import React from 'react'

const Wrapper = props => {
    return (
        <div className='wrpr'>
            {props.children}
        </div>
    );
}
 
export default Wrapper;