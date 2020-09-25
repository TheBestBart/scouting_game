import React, { useCallback, useState } from 'react'
import Textarea from './../../commons/Textarea';
import { getHour, getJwt } from '../../../helpers.js';
import Input from '../../commons/Input';
import { connect } from 'react-redux'
import Title from '../../commons/Title';
import USER_URL from '../../../utils/USER_URL';
import { withRouter } from 'react-router-dom'


const ExistedReportData = ({ history, addAsEvaluator, user = {}, ratingState = {}, handleChange, kindOfRating, isEvaluated, report, maxRating = undefined, disabled = true}) => {

    let { rated = false, date , evaluatorName = '', groupName, ratingDate } = report ? report : {};
    let { rating } = ratingState;
    let { type, login } = user;
    let [editingRating, setEditingRating] = useState(rating);

    isEvaluated = !addAsEvaluator ? isEvaluated : addAsEvaluator

    let editingRatingOption = type === 'EVALUATOR' && rated;

    let options = [0, maxRating];

    if(kindOfRating === 'stopniowy') {
        for(let i = 1; i <= maxRating; i++) {
            options[i] = i;
        }
    }

    const changeRating = useCallback(e => {
            e.preventDefault();
    
            fetch(USER_URL.PUT.updateReport, {
                method:  'PUT',
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers : {
                  'auth-token': `Bearer${getJwt()}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reportID: report._id, rating: editingRating, editOption: true })
            })
            .then(response => response.json())
            .then(data => {
                data.success = history.push(`/auth/${type}/${login}/groups`)
            })
            .catch(error => {
                console.log('ERROR: ', error);
            })
    })


    return (
        <React.Fragment>
        {
            type === 'EVALUATOR' && groupName && <Title style={{ border: 'none', fontSize: '18px' }} title={`"${groupName.toUpperCase()}"`}/>       
        }    
        {
            addAsEvaluator && groupName && <Title style={{ border: 'none', fontSize: '18px' }} title={`"${groupName.toUpperCase()}"`}/>       
        }  
        <div className='evaluated-report'>

            <div style={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                <p>Data dodania: <b>{date ? getHour(date) : 'brak danych'}</b></p>
                {rated && ratingDate && <p>Data oceny: <b>{ratingDate ? getHour(ratingDate) : 'brak danych'}</b></p>}
            </div>
            {
                rated || isEvaluated ? 
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column', alignItems: 'center'}}>

                    <p>Komentarz do raportu:</p>
                    <Textarea 
                        value={isEvaluated ? ratingState.evaluatorDescription : report.evaluatorDescription}
                        disabled={isEvaluated ? false : disabled}
                        placeholder={'Komentarz oceniającego...'}
                        name={'evaluatorDescription'}
                        handleChange={handleChange}
                    />
                    {   
                        isEvaluated
                        ? <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {rated && <p style={{ display: 'flex', flex: 1}}><b>{'Oceniający: ' + (login ? login : '')}</b></p>}
                            <Input 
                                title={'Dodaj ocene:'} 
                                value={editingRating} 
                                handleChange={handleChange} 
                                placeholder={"Zmień ocene..."}
                                name={'editinRating'}
                                type={'number'}
                                max={maxRating}
                                width={'30%'}
                                titleStyle={{ width: '125px', marginBottom: 0}}
                                inputStyle={{ width: '110px'}}
                                divStyle={{ height: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column', flex: 1 }}
                            />
                        </div>
                        :<p>Przyznane punkty: <b>{report && report.rating}/{maxRating} pkt</b></p>
                    }
                    {   
                        editingRatingOption &&
                        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {rated || isEvaluated && <p style={{ display: 'flex', flex: 1}}><b>{isEvaluated ? 'Oceniający: ' + (login ? login : '') : 'Oceniający: ' + (evaluatorName ? evaluatorName : '')}</b></p>}
                            <Input 
                                title={'Dodaj ocene:'} 
                                value={editingRating} 
                                handleChange={e => setEditingRating(e.target.value)} 
                                placeholder={"Dodaj ocene..."}
                                name={'rating'}
                                type={'number'}
                                max={maxRating}
                                width={'30%'}
                                titleStyle={{ width: '125px', marginBottom: 0}}
                                inputStyle={{ width: '110px'}}
                                divStyle={{ height: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column', flex: 1 }}
                            />

                            <button onClick={changeRating} >dodaj zmiany</button>
                        </div>
                    }   
                </div>
                : <p>status: <b>{'Niesprawdzony'.toUpperCase()}</b></p>
            }
        </div>
        </React.Fragment> 
    );
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(ExistedReportData));