import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'


class Navbar extends Component {
 
    static propTypes = {
    }

    render() {
        let { user = {} } = this.props

        return (
            <>
            {user && user.type ? <p>{`Zalogowano jako: `}<b>{user.login}</b></p> : null} 
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

