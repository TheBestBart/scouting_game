import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import Button from '../commons/Button';
import Input from '../commons/Input';
import Wrapper from '../commons/Wrapper'



const Login = ({ logIn, login, errorState, password, setInputValue }) => {

    return (
        <Wrapper>
            <form onSubmit={logIn} className='box-col box-border'>
                { errorState.error && <p className='hide-show'>{errorState.message}</p>}
                <Input type={'text'} name={'login'} handleChange={e => setInputValue(e)} value={login} placeholder={'login...'} title={'Podaj login'}/>
                <Input handleChange={setInputValue} name={'password'} value={password} placeholder={'hasło...'} title={'Podaj hasło'}/>
                <Button type={'submit'} text={'Zaloguj'}/>
            </form> 
        </Wrapper>        
    ) 
}


export default withRouter(Login);
