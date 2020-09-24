import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js';
import ExistedReportData from '../group/report_form/ExistedReportData';
import { connect } from 'react-redux'


const ReportUploaderService = ({ match, render, user, history, isEvaluated }) => {

    let { taskID, reportID } = match.params;
    let { type, login } = user;

    const INITIAL_UPLOAD_STATE = {
        rating: null,
        evaluatorName: login,
        evaluatorDescription: '',
        reportID: reportID,
        taskID: taskID
    }

    const [state, setState] = useState({ report: false, task: false });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [ ratingState, setRatingState] = useState({ ...INITIAL_UPLOAD_STATE });

    const handleChange = e => {
        let { name, value } = e.target;

        setRatingState({
            ...ratingState,
            [name]: value
        })
    }

    const uploadReport = () => {

        fetch(USER_URL.POST.uploadReport, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskID, reportID })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                setState({
                    report: data.report,
                    task: data.task
                });
                setSuccess(true);
            }
            else setError(true);
        })
        .catch(error => {
            console.log('Error', error);
        })
    }

    const rateReport = e => {
        e.preventDefault();
        alert('Rate')

        console.log('state', state)

        fetch(USER_URL.PUT.updateReport, {
            method:  'PUT',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...ratingState })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                setState({
                    report: data.report,
                    task: data.task
                });
                setSuccess(true);
            }
            else setError(true);
        })
        .catch(error => {
            console.log('Error', error);
        })
    }

    useEffect(() => {
        if(typeof user === 'object' && !ratingState.evaluatorName) {
            setRatingState({ ...ratingState, evaluatorName: login })
        }
     
        if(!success || !error) {
            uploadReport();
        }
    }, [success, error, state, user, setRatingState, ratingState, login, uploadReport])

    const redirect = () => history.push(`/auth/${type}/${login}`);

    const { task, report } = state;

    const component = <ExistedReportData handleChange={handleChange} ratingState={ratingState} report={report} maxRating={task && task.maxRating} kingOfRating={task && task.kingOfRating} isEvaluated={isEvaluated} />

    return render({ userType: user.type, titleText: task ?  `Raport do zadania ${task.number}` : "Raport", component, groupDescription: report && report.groupDescription, existed: true, task, formAction: isEvaluated ? rateReport : redirect, buttonText: isEvaluated ? "Zatwierdź ocenę" : 'Wróć' });
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(ReportUploaderService));
