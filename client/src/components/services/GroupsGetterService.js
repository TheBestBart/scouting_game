import React, { useState, useEffect } from 'react'
import { getJwt } from '../../helpers.js';
import USER_URL from '../../utils/USER_URL';
import Row from '../group/Row.js';
import Cell from '../group/Cell.js';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const GroupsGetterService = ({ render = undefined, user, history }) => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [groups, setGroups] = useState([]);
    const { type, login } = user;

    const uploadGroups = () => {
    
        fetch(USER_URL.GET.getGroups, {
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
        .then(({ success, groups }) => {
            if(success) {
                setSuccess(true);
                setGroups(groups);
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
            uploadGroups();
        }
    }, [groups, setGroups, success, error])

    const redirect = groupID => history.push(`/auth/${type}/${login}/groups/${groupID}/reports`)
    

    const headerTexts = ['login', 'Nazwa Drużyny', 'Raporty'];

    const children = groups.map(({ _id, name, login}) => {
        const cells = [
            <Cell components={[`${login}`]}/>,
            <Cell components={[`${name}`]}/>,
            <Cell components={[<p onClick={() => redirect(_id)} style={{color: 'darkred', fontSize: '12px', cursor: 'pointer'}}>Raporty</p>]}/>
        ]
        return <Row elements={cells} />
    })
    
    return render({ headerTexts, children })
}

const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(GroupsGetterService));