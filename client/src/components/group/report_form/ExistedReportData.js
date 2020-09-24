import React from 'react'
import Textarea from './../../commons/Textarea';
import { getHour } from '../../../helpers.js';
import Input from '../../commons/Input';
import { connect } from 'react-redux'
import Title from '../../commons/Title';

const ExistedReportData = ({ user, ratingState = {}, handleChange, kindOfRating, isEvaluated, report, maxRating = undefined, disabled = true}) => {

    let { rated = false, date , evaluatorName = '', groupName, ratingDate } = report ? report : {};
    let { rating } = ratingState;
    let { type, login } = user;

    let options = [0, maxRating];

    if(kindOfRating === 'stopniowy') {
        for(let i = 1; i <= maxRating; i++) {
            options[i] = i;
        }
    }

    return (
        <React.Fragment>
        {
            type === 'EVALUATOR' && groupName && <Title style={{ border: 'none', fontSize: '18px' }} title={`"${groupName.toUpperCase()}"`}/>       
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
                            {rated || isEvaluated && <p style={{ display: 'flex', flex: 1}}><b>{isEvaluated ? 'Oceniający: ' + (login ? login : '') : 'Oceniający: ' + (evaluatorName ? evaluatorName : '')}</b></p>}
                            <Input 
                                title={'Dodaj ocene:'} 
                                value={rating} 
                                handleChange={handleChange} 
                                placeholder={"Dodaj ocene..."}
                                name={'rating'}
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

export default connect(mapStateToProps)(ExistedReportData);