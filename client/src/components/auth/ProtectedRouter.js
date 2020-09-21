import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Table from '../group/Table';
import GroupTableService from '../services/GroupTableService';
import TaskGetterService from '../services/TaskGetterService';
import ReportFormServie from '../services/ReportFormService';
import ReportForm from '../group/report_form/ReportForm';
import NavButtons from '../commons/NavButtons';
import GroupsGetterService from '../services/GroupsGetterService';

class ProtectedRouter extends Component {

    static propTypes = {
        user: PropTypes.object
    }

    render() {
        let { user } = this.props;

        return (
            <AuthComponent>
                <Switch>
                    <Route exact path='/auth/:type/:login' >
                        <GroupTableService render={props => <Table { ...props } />} /> 
                    </Route>
                    <Route exact path='/auth/:type/:login/groups'>
                        <GroupsGetterService render={props => <Table { ...props } /> }/>
                    </Route>
                    <Route exact path='/auth/:type/:login/raports' />
                    <Route exact path='/auth/:type/:login/:reportID'>
                        <p>Tutaj bedzie podgląd raportu</p>
                    </Route>
                    <Route exact path='/auth/:type/:login/add-report/:taskID'>
                        <TaskGetterService render={props => <ReportFormServie { ...props } render={reportProps => <ReportForm { ...reportProps } /> } />} />  
                    </Route>
                </Switch>
            </AuthComponent>           
        )
    }
}

const mapStateToProps = state => ({
    index: state.basicData.lang,
    langs: state.basicData.langsArray,
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(ProtectedRouter))


