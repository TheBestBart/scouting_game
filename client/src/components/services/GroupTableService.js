import React, { useState, useEffect } from 'react';
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js';
import Row from '../group/Row';
import TaskService from './TaskService';

const GroupTableService = props => {

    const [tasksWithReports, setTasksWithReports] = useState([]);
    const [error, setError] = useState(false);
    const headerTexts = ['Zadanie', 'Liczba punktów', 'Maksymalna Liczba punktów', 'Raporty', 'Grupa Zadań']
    
    const uploadTasks = () => {

        fetch(USER_URL.GET.uploadTasks, {
            method:  'GET',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            }
        })
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
    
    return props.render({ headerTexts, error, children }); 
}
 
export default GroupTableService;
