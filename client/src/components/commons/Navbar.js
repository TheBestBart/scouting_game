import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    static propTypes = {
    }

    render() {
        return (
            <div id='res-nav' className='nav fade-in'>
                {this.props.children}
            </div>
        )
    }
}



export default withRouter(Navbar)

