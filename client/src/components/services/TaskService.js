import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Cell from '../group/Cell';
import Report from '../group/Report';


const TaskService = ({ task, user, history, render }) => {
    let { maxRating, number, reports = [], _id, group, ratingReport } = task;

    let { type, login } = user;

    // reports.map((report, index) => {
    //     ratingReport = index === 0 ? report.rating : report.rating > ratingReport ? report.rating : ratingReport;
    // })

    const redirect = () => history.push(`/auth/${type}/${login}/add-report/${_id}`);

    let report = reports.map(report => {
        return <Report report={report} taskID={_id} key={report._id}/>
    });

    type === 'GROUP' && report.push(<p onClick={redirect} style={{color: 'darkred', fontSize: '12px', cursor: 'pointer', margin: 0}}>Dodaj Raport</p>)

    let elements = [number, ratingReport ? ratingReport : '-', maxRating, report.length ? report : '-', group];

    let children = elements.map((element, index) => {
        return <Cell key={index} components={element}/>
    }) 

    return render( { elements: children } );
}

const mapStateToProps = state => ({
    user: state.basicData.user
})
 
export default connect(mapStateToProps)(withRouter(TaskService));