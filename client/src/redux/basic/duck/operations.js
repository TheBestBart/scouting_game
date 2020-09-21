import basicAction from './actions'
import USER_URL from '../../../utils/USER_URL';

export const  getUserProfile = (jwt, history, user = undefined) => 
  async (dispatch) => {
    if(user) {
      return dispatch(basicAction.getUser(user));
    }
    else {
      fetch(USER_URL.GET.getUser, {
        method:  'GET',
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers : {
          'auth-token': `Bearer${jwt}`
        }
      })
      .then(response => response.json())
      .then(data => {
        data.token && localStorage.setItem('auth-token', data.token);

        if(!data.success) {
          localStorage.removeItem('auth-token');
          history.push('/');
          return dispatch(basicAction.setUser(false));
        }

        if(data.success){
          if(data.user) {
            return dispatch(basicAction.setUser(data.user));
          }
        }
      })
      .catch(error => console.log('to jest error', error));
    }

  return null;
}

export const logOut = history => 
  async (dispatch) => { 
    
  localStorage.removeItem('auth-token');
  dispatch(basicAction.setUser(false));
  return history.push('/');
}