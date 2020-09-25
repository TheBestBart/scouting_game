import React from 'react'
import Button from '../commons/Button';
import Chart from './Chart';
import Title from '../commons/Title';

const MainPage = ({ data = {}, setExtended, chartTitle,  }) => {

    return (  
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button style={{marginBottom: '10px'}} name={'false'} text={"Wynik z Gry"} action={() => setExtended(false)}/>
                <Button style={{marginBottom: '10px'}} name={'true'} text={"Ogólny wynik"} action={() => setExtended(true)}/>
            </div>
            <Title title = {chartTitle} />
            <Chart data={data} width={window.innerWidth * (9 / 10)} height={window.innerWidth * (9 / 10)}/>
        </div>
    );
}
 
export default MainPage;