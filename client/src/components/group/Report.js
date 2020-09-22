import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getHour } from '../../helpers.js';

const Report = ({ report, history, user, taskID }) => {
    let { type, login } = user
    let { _id, date, rated } = report;
    
    const redirectToReport = () => history.push(`/auth/${type}/${login}/existed/${taskID}/${_id}`);
    const redirectToRate = () => history.push(`/auth/${type}/${login}/rate/${taskID}/${_id}`);

    let action = type === 'EVALUATOR' && !rated ? redirectToRate : redirectToReport 

    
    return ( 
        <p className='report' onClick={action}>
            Raport z {getHour(date)}{type === 'EVALUATOR' && <b>{rated ? ' (Zobacz)' : ' (Oceń)'}</b> } 
        </p>
    );
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(Report));