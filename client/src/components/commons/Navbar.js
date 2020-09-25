import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js';
import PropTypes from 'prop-types';


class Navbar extends Component {
 
    static propTypes = {
        user: PropTypes.object
    }

    constructor(props) {
        super(props);
        
        this.state = {
            points: 0,
            extendedPoints: 0
        }
    }

    componentDidMount() {
        let { user } = this.props;
        user && user.type === 'GROUP' && this.getPoints();
        this.intervalID = user && user.type === 'GROUP' ?  setInterval(this.getPoints, 10000) : null
    }

    componentDidUpdate(prevProps) {
        let { user } = this.props;
        if(prevProps.user !== this.props.user &&  !prevProps.user){
            user && user.type === 'GROUP' && this.getPoints();
            this.intervalID = user && user.type === 'GROUP' ? setInterval(this.getPoints, 10000) : null 
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getPoints = () => {
        fetch(USER_URL.GET.getGroupResult, {
            method:  'GET',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
                'auth-token': `Bearer${getJwt()}`,
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.success) {
                this.setState({
                    extendedPoints: data.groupResult.extendedPoints,
                    points: data.groupResult.points
                })
            }
        })
        .catch(error => console.log('ERROR:', error))
    }

    render() {
        let { user = {} } = this.props

        return (
            <>
            {user && user.type ? <p>{`Zalogowano jako: `}<b>{user.login}</b> { user.type === "GROUP" && <><span>Punkty z gry</span> <b>{`: ${this.state.points} `}</b><span>Total</span> <b>{`: ${this.state.extendedPoints}`}</b></>}</p> : null} 
            <div id='res-nav' className='nav fade-in'>
                {this.props.children}
            </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(Navbar));

