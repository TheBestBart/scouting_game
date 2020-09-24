import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/basic/duck/operations';
import Button from './Button';
import { HamburgerMenu } from '../svg/SVG';
import Wrapper from './Wrapper';
import basicAction from './../../redux/basic/duck/actions'
import Popup from './Popup';

const NavButtons = ({ user, history, logOut, resultsFlag }) => {

    const { type, login } = user;
    let buttons = [];
    
    const [isActivePopup, setIsActivePopup] = useState(false);
    const toggleIsActivePopup = useCallback(() => setIsActivePopup(!isActivePopup));

    const [shown, toggleShown] = useState(false);

    if(type === "GROUP") {
        buttons = [
            <div className='hamburger-menu' style={{ width: '100%', textAlign: 'left' }}>
                <HamburgerMenu action={() => toggleShown(!shown)} width={'30px'} height={'28px'} className={'hamburger-menu'}/>
            </div>,
            <Wrapper className={shown ? 'res-wrpr' : 'res-wrpr hidden'}>
                <Button text={'Strona Główna'} style={{ marginRight: '10px'}} action={() => history.push(user ? `/auth/${type}/${login}/${type === 'EVALUATOR' ? 'groups' : ''}` : '/login') } className='fade-in btn-gray'/>
                <Button style={{marginRight: '10px'}} text={"Punkty"} action={() => history.push(`/auth/${type}/${login}/results`)} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={'Moje raporty'} action={() => history.push(`/auth/${type}/${login}/reports`)} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={'Wyloguj'} action={() => logOut(history)} className={'btn-gray'}/>
            </Wrapper>
        ]
    }
    
    if(type === 'EVALUATOR') {
        buttons = [
            <div className='hamburger-menu' style={{ width: '100%', textAlign: 'left' }}>
                <HamburgerMenu action={() => toggleShown(!shown)} width={'30px'} height={'28px'} className={'hamburger-menu'}/>
            </div>,
            <Wrapper className={shown ? 'res-wrpr' : 'res-wrpr hidden'}>
                <Button text={'Strona Główna'} style={{ marginRight: '10px' }} action={() => history.push(user ? `/auth/${type}/${login}/${type === 'EVALUATOR' ? 'groups' : ''}` : '/login') } className='fade-in btn-gray'/>
                <Button style={{marginRight: '10px'}} text={"Nowe Zadanie"} action={() => history.push(`/auth/${type}/${login}/add-task`)} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={resultsFlag ? "Ukryj Wykres" : 'Pokaż Wykres'} action={toggleIsActivePopup} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={"Drużyny"} action={() => history.push(`/auth/${type}/${login}/groups`)} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={'Raporty'} action={() => history.push(`/auth/${type}/${login}/reports`)} className={'btn-gray fade-in'}/>
                <Button style={{marginRight: '10px'}} text={'Wyloguj'} action={() => logOut(history)} className={'fade-in btn-gray'}/>
            </Wrapper>
        ]
    } 

    return ( 
        <>
        
        <div className='fade-in nav-container'>
            <div className='hidden login-box'>
            </div>
            <div className='nav-buttons'>
                {buttons}
            </div>
            
        </div>
        { isActivePopup && <Popup closePopup={toggleIsActivePopup} resultsFlag={resultsFlag}/>}
        </>
    );
}
 
const mapStateToProps = state => ({
    user: state.basicData.user,
    resultsFlag: state.basicData.resultsFlag
})

const mapDispatchToProps = dispatch => ({
    logOut: history => dispatch(logOut(history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavButtons));