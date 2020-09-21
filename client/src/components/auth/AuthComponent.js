import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getJwt } from '../../helpers.js/index';
import { getUserProfile } from '../../redux/basic/duck/operations';

class AuthComponent extends Component {
    
    static propTypes = {
        lang: PropTypes.string,
        logOut: PropTypes.func,
        getUser: PropTypes.func
    }

    componentDidMount() {
        const jwt = getJwt();
        
        if(!jwt) {
            this.props.logOut();
            this.props.history.push('/');
        } else {
            this.props.getUser(jwt, this.props.history)
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            const jwt = getJwt();

            if(!jwt) {
                this.props.logOut();
                this.props.history.push(`/login`);
            } 
        }
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
} 


const mapDispatchToProps = dispatch => ({
    getUser: (token, history) => dispatch(getUserProfile(token, history)),
    // logOut: () => dispatch(basicActions.logOut()),
})

export default connect(null, mapDispatchToProps)(withRouter(AuthComponent));