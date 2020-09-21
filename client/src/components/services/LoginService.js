import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import basicAction from './../../redux/basic/duck/actions';
import BASIC_URL from '../../utils/BASIC_URL';

const LoginService = props => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorState, setError] = useState({ error: false, message: '' });
    const setInputValue = e => {
        if(e.target.name ==='login') setLogin(e.target.value);
        if(e.target.name ==='password') setPassword(e.target.value);
    }

    const logIn = e => {
        e.preventDefault();

        fetch(BASIC_URL.POST.LOG_IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                if(data.token) {
                    localStorage.setItem('auth-token', data.token);
                }

                return props.history.push(`/auth/${data.user.type}/${data.user.login}`);

            } else {
                setError({ error: true, message: data.message });
            }
        }) 
        .catch(error => {
            console.log('error: ', error)
            setError({ error: true, message: 'coś poszło nie tak...' })
        });    
    }
    
    return props.render({ logIn, login, errorState, password, setInputValue });
    
}


const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(basicAction.setUser(user))
})

export default withRouter(LoginService); 
