import React, { useState, useEffect } from 'react'
import USER_URL from './../../utils/USER_URL'
import { getJwt } from '../../helpers.js';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const ReportFormService = ({ render, user, success, task = undefined, history }) => { 

    const { _id, type, login } = user;

    console.log(_id);

    const INITIAL_STATE = {
        groupDescription: '',
    }

    const [formState, setFormState] = useState({ ...INITIAL_STATE });
    const [reportError, setError] = useState(false);
    const [reportSuccess, setSuccess] = useState(false);

    const handleChange = e => {
        const { value } = e.target;

        setFormState({
            groupDescription: value
        })
    }

    const redirect = () => {
        history.push(`/auth/${type}/${login}`);
    }

    const addReport = e => {
        e.preventDefault();

        fetch(USER_URL.POST.addReport, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formState, taskID: task ? task._id : '', groupID: _id, groupName: login })
        })
        .then(response => response.json())
        .then(data => {
            data.success && setSuccess(true);
            !data.success && setError(true);
        })
        .catch(error => {
            console.log('ERROR: ', error);
            setError(true);
        })
    }
    
    useEffect(() => {
        if(reportSuccess) {
            setTimeout(() => {
                setSuccess(false);
                redirect();
            }, 3000);
        }

        if(reportError) {
            setTimeout(() => setError(false), 4000);
        }
    }, [reportSuccess, reportError])

    return  render({ formAction: addReport, handleChange, success: reportSuccess, error: reportError, task, groupDescription: formState.groupDescription })
}
 
const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(ReportFormService));