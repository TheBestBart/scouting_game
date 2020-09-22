import React from 'react'
import Button from "../../commons/Button";
import Title from '../../commons/Title';
import Informer from '../../commons/Informer';

const ReportForm = ({ titleText = 'Dodawanie Raportu', buttonText = 'Dodaj Raport', formAction, handleChange = undefined, success, error, task = {}, groupDescription, existed = false, component }) => {
    
    const { description, number, maxRating } = task;

    return (  
        <form onSubmit={formAction} className='textarea box-border fade-in'>
            <Title title={titleText}/>

            {
                existed && component
            }

            {
                task && 
                <div style={{ width: '95%'}}>
                    <p className='p-text'><b>{number}:</b> {description} <b>({maxRating}pkt)</b></p>
                </div>
            }

            <Informer success={success} error={error} textSuccess={'Dodano raport'}  textError={'Coś poszło nie tak...'}/>

            <textarea
                value={groupDescription}
                className='inpt'
                rows='10'
                onChange={handleChange}
                name="groupDescription"
                style={{
                    width: '90%',
                    height: 'auto',
                }}
                placeholder='Tekst Raportu...'
                disabled={existed ? true : false}
            />

            <Button style={{ marginBottom: '20px'}} text={buttonText} type={'submit'}/>
        </form>
    );
}
 
export default ReportForm;