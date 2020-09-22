import React from 'react'

const Informer = ({ success, error, textSuccess, textError }) => {
    let text;
    
    if(success){
        text = textSuccess;
    } else if(error) {
        text = textError;
    } else {
        text = ""
    }

    return (  
        <div style={{display: 'flex', height: '15px', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '10px'}}>
            { success || error &&
                <p style={{margin: 0, color: success ? 'darkgreen' : 'darkred'}} className='show-hide'>
                    {text}
                </p>
            }
        </div>
    );
}
 
export default Informer;