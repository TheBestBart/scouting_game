import React from 'react'

const RowWrapper = props => {
    let { justifyContent,  backgroundColor = 'white'} = props;

    return ( 
        <div className='header-container fade-in' style={{ marginTop: '5px', justifyContent: justifyContent ? justifyContent : 'space-between', backgroundColor: backgroundColor }}>
            {props.children}
        </div> 
    );
}
 
export default RowWrapper;