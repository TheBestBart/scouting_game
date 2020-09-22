import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js';
import ExistedReportData from '../group/report_form/ExistedReportData';
import { connect } from 'react-redux'


const ReportUploaderService = ({ isEvaluated = false, match, render, user, history }) => {

    let { taskID, reportID } = match.params;
    let { type, login } = user;

    const [state, setState] = useState({ report: false, task: false });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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

    useEffect(() => {
        if(!success || !error) {
            uploadReport();
        }
    }, [success, error, state])

    const redirect = () => history.push(`/auth/${type}/${login}`);

    const { task, report } = state;

    const component = <ExistedReportData report={report} maxRating={task.maxRating} />

    return render({ titleText: task ?  `Raport do zadania ${task.number}` : "Raport", component, groupDescription: report.groupDescription, existed: true, task, formAction: redirect, buttonText: "Wróć do Strony Głównej" });
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(ReportUploaderService));
