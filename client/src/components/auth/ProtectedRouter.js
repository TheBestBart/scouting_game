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
import TaskFrom from '../commons/TaskFrom';
import MainPage from '../main-page/MainPage';
import MainPageService from '../services/MainPageService';
import FilterGroupsService from '../services/FilterGroupsService';

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

                    <Route exact path='/auth/:type/:login/results'>
                        <MainPageService render={props => <MainPage { ...props } />} /> 
                    </Route>
                    
                    <Route exact path='/auth/:type/:login/add-task'>
                           {
                               type === "EVALUATOR" 
                               ? <TaskFrom />
                               : <Route render={() => <Redirect to={`/auth/${type}/${login}`}/>} />
                           } 
                    </Route>

                    <Route exact path='/auth/:type/:login/groups/:groupLogin/:groupID/reports' >
                        <GroupTableService render={props => <Table { ...props } />} />
                    </Route>

                    <Route exact path='/auth/:type/:login/groups'>
                        <GroupsGetterService render={props => <Table { ...props } /> }/>
                    </Route>

                    <Route exact path='/auth/:type/:login/reports'>
                        <AllReportsGetterService render={props => <FilterGroupsService { ...props } render={ serviceProps => <Table { ...serviceProps }/> } /> }/>
                    </Route>
                        {/* nie ma komponentu */}
                    <Route exact path='/auth/:type/:login/rate/:taskID/:reportID'>
                        <ReportUploaderService isEvaluated render={props => <ReportForm { ...props }/> } />
                    </Route> 

                    <Route exact path='/auth/:type/:login/existed/:taskID/:reportID'>
                        <ReportUploaderService toRate render={props => <ReportForm { ...props }/> } />
                    </Route>

                    <Route path='/auth/:type/:login/add-report-as-evaluator/:taskID'>
                        <ReportUploaderService addAsEvaluator toRate render={props => <ReportForm addAsEvaluator { ...props }/> } />
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


