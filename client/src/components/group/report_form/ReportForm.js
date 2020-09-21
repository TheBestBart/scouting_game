import React from 'react'
import Button from "../../commons/Button";
import Title from '../../commons/Title';
import Informer from '../../commons/Informer';

const ReportForm = ({ addReport, handleChange = undefined, success, error, task = {}, groupDescription }) => {
    
    const { description, number, maxRating } = task;

    return (  
        <form onSubmit={addReport} className='textarea box-border fade-in'>
            <Title title={'Dodawanie Raportu'}/>

            <div style={{ width: '95%'}}>
                <p className='p-text'><b>{number}:</b> {description} <b>({maxRating}pkt)</b></p>
            </div>

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
            />

            <Button style={{ marginBottom: '20px'}} text={'Dodaj Raport'} type={'submit'}/>
        </form>
    );
}
 
export default ReportForm;