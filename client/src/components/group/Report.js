import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Report = ({ report, history, user }) => {
    let { type, login } = user
    let { _id, date } = report;
    let reportDate =  new Date(date);

    const redirect = () => history.push(`/auth/${type}/${login}/${_id}`)
    
    return ( 
        <p style={{cursor: 'pointer'}} onClick={redirect}>
            Raport z {reportDate.getHours}
        </p>
    );
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(Report));