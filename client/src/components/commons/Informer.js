import React from 'react'

const Informer = ({ success, error, textSuccess, textError }) => {
    return (  
        <div style={{display: 'flex', height: '15px', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '10px'}}>
            <p style={{margin: 0, color: success ? 'darkgreen' : 'darkred'}} className='show-hide'>
                { error ? textError : success ? textSuccess : ''}
            </p>
        </div>
    );
}
 
export default Informer;