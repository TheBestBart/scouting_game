import React, { useState, useEffect } from 'react'
import { getJwt, getHour } from '../../helpers.js';
import USER_URL from '../../utils/USER_URL';
import Row from '../group/Row.js';
import Cell from '../group/Cell.js';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const AllReportsGetterService = ({ render = undefined, user, history }) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [reports, setReports] = useState([]);
    const { type, login } = user;

    const uploadReports = () => {
    
        fetch(USER_URL.GET.getAllReports, {
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
        .then(({ success, reports }) => {
            console.log(reports);
            if(success) {
                setSuccess(true);
                setReports(reports);
            }
            !success && setError(true);
        })
        .catch(error => {
            console.log('ERROR: ', error);
            setError(true);
        })
    }

    useEffect(() => {
        if(!success && !error) {
            uploadReports();
        }
    }, [reports, setReports, success, error])

    const redirectToReport = (reportID, taskID) => history.push(`/auth/${type}/${login}/existed/${taskID}/${reportID}`);
    const redirectToRate = (reportID, taskID) => history.push(`/auth/${type}/${login}/rate/${taskID}/${reportID}`);
    

    const headerTexts = ['Zadanie', 'Drużyna', 'Data dodania', 'Ocena', 'Oceniający', 'Data oceny', ''];

    const children = reports.map(({ report, taskNumber, taskID }, index) => {
        let { groupName, date, evaluatorName, rating, rated, ratingDate, _id } = report
        const action = !rated && type === 'EVALUATOR' ? () => redirectToRate(_id, taskID) : () => redirectToReport(_id, taskID);
        const actionText = !rated && type === 'EVALUATOR' ? 'Oceń' : 'Zobacz';

        const cells = [
            <Cell key={index} components={[`${taskNumber}`]}/>,
            <Cell key={index} components={[`${groupName ? groupName : '-'}`]}/>,
            <Cell key={index} components={[`${getHour(date)}`]}/>,
            <Cell key={index} components={[`${rating ? rating : '-'}`]}/>,
            <Cell key={index} components={[`${evaluatorName ? evaluatorName : '-'}`]}/>,
            <Cell key={index} components={[`${ratingDate ? getHour(ratingDate) : '-'}`]}/>,
            <Cell key={index} components={[<p onClick={action} style={{color: 'darkred', fontSize: '12px', cursor: 'pointer'}}>{actionText}</p>]}/>
        ]
        return <Row elements={cells} />
    })

    console.log(children)
    
    return render({ headerTexts, children: [ ...children ] } )
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(AllReportsGetterService));