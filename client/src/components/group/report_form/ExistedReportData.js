import React from 'react'
import Textarea from './../../commons/Textarea';
import { getHour } from '../../../helpers.js';

const ExistedReportData = ({ ratingState, handleChange, kindOdRating, isEvaluated, report, maxRating = undefined, disabled = true}) => {
    let { rated = false, date , evaluatorName = '', evaluatorDescription, rating = 0 } = report;
    
    return (  
        <div style={{ color: '#262626',width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center'}}>

            <div style={{display: 'flex', justifyContent: 'space-between', width: '90%'}}>
                <p>Data dodania: <b>{date ? getHour(date) : 'brak danych'}</b></p>
                {rated && <p>Oceniający:  <b>{evaluatorName}</b></p>}
            </div>
            {
                rated ? 
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Komentarz do raportu:</p>
                    <Textarea 
                        value={evaluatorDescription}
                        disabled={disabled}
                        placeholder={'Komentarz oceniającego...'}
                        name={'evaluatorDescription'}
                    />
                    {   
                        isEvaluated
                        ? <select>
                            {
                                
                            }
                        </select>
                        <p>Przyznane punkty: <b>{rating}/{maxRating} pkt</b></p>
                    }
                </div>
                : <p>status: <b>{'Niesprawdzony'.toUpperCase()}</b></p>
            }
        </div>
    );
}
 
export default ExistedReportData;