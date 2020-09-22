import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import ReportUploaderService from '../services/ReportUploaderService';
import { getHour } from '../../helpers.js';
import AllReportsGetterService from '../services/AllReportsGetterService';

class ProtectedRouter extends Component {

    static propTypes = {
        user: PropTypes.object
    }

    render() {
        let { user } = this.props;
        let { type, login } = user;

        return (
            <AuthComponent>
                <Switch>
                    <Route exact path='/auth/:type/:login' >
                        {
                            type === 'EVALUATOR' 
                            ? <GroupsGetterService render={props => <Table { ...props } /> }/>
                            : <GroupTableService render={props => <Table { ...props } />} /> 
                        }
                    </Route>

                    <Route exact path='/auth/:type/:login/add-task'>
                           {
                               type === "EVALUATOR" 
                               ? <p><h1>Tu bedzie formularz tworzący zadanie</h1></p>
                               : <Route render={() => <Redirect to={`/auth/${type}/${login}`}/>} />
                           } 
                    </Route>

                    <Route exact path='/auth/:type/:login/groups/:groupID/reports' >
                        <GroupTableService render={props => <Table { ...props } />} />
                    </Route>

                    <Route exact path='/auth/:type/:login/groups'>
                        <GroupsGetterService render={props => <Table { ...props } /> }/>
                    </Route>

                    <Route exact path='/auth/:type/:login/reports'>
                        <AllReportsGetterService render={props => <Table { ...props }/>}/>
                    </Route>
                        {/* nie ma komponentu */}
                    <Route exact path='/auth/:type/:login/rate/:taskID/:reportID'>
                        <ReportUploaderService isEvaluated render={props => <ReportForm { ...props }/> } />
                    </Route> 

                    <Route exact path='/auth/:type/:login/existed/:taskID/:reportID'>
                        <ReportUploaderService toRate render={props => <ReportForm { ...props }/> } />
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


