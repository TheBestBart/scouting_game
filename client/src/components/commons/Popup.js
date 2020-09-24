import React, { useCallback } from 'react';
import { connect } from 'react-redux'
import basicAction from './../../redux/basic/duck/actions'
import Title from './Title';
import Button from './Button';
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js/index'


const Popup = ({ closePopup, setResultsFlag, resultsFlag = true }) => {

    const hideChart = useCallback(() => {
        fetch(USER_URL.POST.setResultsFlag, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ option: !resultsFlag })
        })
        .then(response => response.json())
        .then(({ success }) => {
            success && setResultsFlag(!resultsFlag);
            setTimeout(() => closePopup(), 1000);
        })
        .catch(error => console.log(error))
    })

    return (  
        <div className='popup-box'>
            <div className='box-border popup-child'>
                <Title title={!resultsFlag ? 'Ujawnić Wykres?' : "Ukryć Wykres?" }/>
                <div>
                    <Button style={{margin: 0, marginRight: '10px', width: '150px' }} text={'Wykonaj'} action={hideChart}/>
                    <Button style={{margin: 0, width: '150px' }}  text={'Wróć'} action={closePopup}/>
                </div>

                
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setResultsFlag: isShown => dispatch(basicAction.setResultsFlag(isShown))
})

export default connect(null, mapDispatchToProps)(Popup);