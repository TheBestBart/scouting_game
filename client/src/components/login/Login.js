import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '../commons/Button';
import Input from '../commons/Input';
import Wrapper from '../commons/Wrapper'
import Informer from '../commons/Informer';
import Title from '../commons/Title';

const Login = ({ logIn, login, errorState, password, setInputValue }) => {

    return (
        <Wrapper>
            <form onSubmit={logIn} className='box-col box-border'>
                <Title title={'Dodawanie Raportu'}/>
                <Informer error={errorState.error} textError={errorState.message}/>
                <Input type={'text'} name={'login'} handleChange={e => setInputValue(e)} value={login} placeholder={'login...'} title={'Podaj login'}/>
                <Input handleChange={setInputValue} name={'password'} value={password} placeholder={'hasło...'} title={'Podaj hasło'}/>
                <Button type={'submit'} text={'Zaloguj'}/>
            </form> 
        </Wrapper>        
    ) 
}


export default withRouter(Login);
