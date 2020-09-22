import React, { useState, useEffect } from 'react';
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js';
import Row from '../group/Row';
import TaskService from './TaskService';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
 

const GroupTableService = ({ render, history, match, user }) => {
    
    let { type, login } = user;
    let { groupID } = match.params
    
    const [tasksWithReports, setTasksWithReports] = useState([]);
    const [error, setError] = useState(false);
    const headerTexts = ['Zadanie', 'Liczba punktów', 'Maksymalna Liczba punktów', 'Raporty', 'Grupa Zadań'];

    const createObject = () => {

        if(type === 'EVALUATOR') {
            return {
                method:  'POST',
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers : {
                  'auth-token': `Bearer${getJwt()}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ groupID: groupID })
            }
        } 

        return {
            method:  'GET',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            }
        }
    }

    const uploadTasks = () => {

        fetch(USER_URL.GET.uploadTasks, createObject())
        .then(response => response.json())
        .then(data => {
            data.success && setTasksWithReports(data.tasks);
        })
        .catch(error => {
            console.log('Error', error);
            setError(true)
        })
    }

    useEffect(() => {
        if(tasksWithReports.length === 0 && !error) {
            uploadTasks();
        }
    })

    
    let children = tasksWithReports.map(task => {
        return <TaskService key={task._id} task={task} render={children => <Row { ...children } />} />
    })
    
    return render({ headerTexts, error, children }); 
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(GroupTableService));
