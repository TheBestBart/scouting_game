import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/basic/duck/operations';
import Button from './Button';

const NavButtons = ({ user, history, logOut }) => {
    const { type, login } = user;
    let buttons = [];


    if(type === "GROUP") {
        buttons = [
            <Button style={{marginRight: '10px'}} text={"Zadania"} action={() => history.push(`/auth/${type}/${login}/tasks`)} className={'btn-gray fade-in'}/>,
            <Button style={{marginRight: '10px'}} text={'Moje raporty'} action={() => history.push(`/auth/${type}/${login}/reports`)} className={'btn-gray fade-in'}/>,
            <Button style={{marginRight: '10px'}} text={'Wyloguj'} action={() => logOut(history)} className={'btn-gray'}/>,
        ]
    }
    
    if(type === 'EVALUATOR') {
        buttons = [
            <Button style={{marginRight: '10px'}} text={"Zadania"} action={() => history.push(`/auth/${type}/${login}/tasks`)} className={'btn-gray fade-in'}/>,
            <Button style={{marginRight: '10px'}} text={"Drużyny"} action={() => history.push(`/auth/${type}/${login}/groups`)} className={'btn-gray fade-in'}/>,
            <Button style={{marginRight: '10px'}} text={'Raporty'} action={() => history.push(`/auth/${type}/${login}/reports`)} className={'btn-gray fade-in'}/>,
            <Button style={{marginRight: '10px'}} text={'Wyloguj'} action={() => logOut(history)} className={'btn-gray'}/>,
        ]
    } 

    return ( 
        <div 
            className='fade-in'
            style={{
                width: '95%', 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <p style={{margin: 0}} onClick={() => history.push(user ? `/auth/${type}/${login}` : '/login') } className='user-name'>{user ? login : 'Zaloguj'}</p>
            </div>
            <div style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center'
            }}>
                {buttons}
            </div>
            
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.basicData.user
})

const mapDispatchToProps = dispatch => ({
    logOut: history => dispatch(logOut(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavButtons));