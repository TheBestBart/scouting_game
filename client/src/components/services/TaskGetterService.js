import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import BASIC_URL from '../../utils/BASIC_URL';
import { getJwt } from '../../helpers.js';

const TaskGetterService = ({ match, taskID = undefined, render = undefined }) => {
    taskID = taskID ? taskID : match.params.taskID;

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [task, setTask] = useState();

    const uploadTask = () => {
    
        fetch(BASIC_URL.POST.uploadTask, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({taskID: taskID})
        })
        .then(response => response.json())
        .then(({ success, task }) => {
            if(success) {
                setSuccess(true);
                setTask(task);
            }
            !success && setError(true);
        })
        .catch(error => {
            console.log('ERROR: ', error);
            setError(true);
        })
    }

    useEffect(() => {
        if(!success && !error && taskID) {

            uploadTask();
        }
    }, [task, setTask, taskID, success, error])
    
    
    return render({ task, success, error })
}
 
export default withRouter(TaskGetterService);