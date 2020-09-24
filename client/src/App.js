import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRouter from './components/auth/ProtectedRouter'
import { withRouter } from 'react-router-dom'
import Login from './components/login/Login';
import LoginService from './components/services/LoginService';
import Navbar from './components/commons/Navbar';
import NavButtons from './components/commons/NavButtons';
import MainPage from './components/main-page/MainPage';
import MainPageService from './components/services/MainPageService';

class App extends React.Component
{  

  render() {
    // let { user } = this.props;
    // let isUser = !user || !Object.values(user ? user : {}).length ? false : true;
    
    return (
        
        <div className='App'>
          
          <Navbar>
            <NavButtons />
          </Navbar>
          <Switch>
            <Route path='/login' exact>
              <LoginService render={props => <Login { ...props }/> }/> 
            </Route>
            <Route path='/auth' component={ProtectedRouter} />
            <Route exact path='/'>
              <MainPageService render={props => <MainPage { ...props } />} /> 
            </Route>
            <Route path='/' render={() => <Redirect to={'/'} />} />
          </Switch>
        </div>     
    )
  }
}

const mapStateToProps = state  => ({
  // user: state.loggedData.user
})

export default withRouter(App)



