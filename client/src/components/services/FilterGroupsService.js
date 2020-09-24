import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BASIC_URL from '../../utils/BASIC_URL';
import Filter from '../commons/Filter';

export default class FilterGroupService extends Component {
    static propTypes = {
        getFilteredReport: PropTypes.func,
        reports: PropTypes.array
    }

    constructor(props) {
        super(props);

        this.state = {
            reportOption: '',
            reportOptions: ['', 'sprawdzone','niesprawdzone'],
            category: '',
            categories: [],
            isConfirmed: false,
            filtered: this.props.reports
        }
    }

    componentDidMount() {
        this.uploadCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.reports !== this.props.reports && !prevProps.reports) {
            this.setState({
                filtered: this.props.reports
            })
        }
        
        if(prevState.isConfirmed !== this.state.isConfirmed && this.state.isConfirmed) {
            this.setState({
                isConfirmed: false
            })
        }
    } 

    setCategory = e => {

    }   

    setReportsByRated = (reports) => {
        let { reportOption } = this.state;
        if(reportOption === 'sprawdzone') {
            return reports.filter(report => report.report.rated === true);
        } else if(reportOption === 'niesprawdzone') {
            return reports.filter(report => report.report.rated === false);
        } else return reports
    }

    setReportByCategory = (reports) => {
        let { category } = this.state;

        if(category !== '') {
            return reports.filter(report => report.taskNumber === category)
        } else return reports
    }

    uploadCategories = () => {
        fetch(BASIC_URL.GET.getTaskNumbers, {
            method:  'GET',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            data.success && this.setState({
                categories: data.categories
            });
        })
        .catch(error => {
            console.log('Error', error);
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    confirmFilter = () => {
        this.setState({
            isConfirmed: true
        })
    }

    render() {
        this.props.reports && this.props.reports.map(report => console.log(report))
        let filterComponet =  <Filter { ...this.state }  handleChange={this.handleChange}/>
        let children = this.props.setChildren(this.setReportByCategory(this.setReportsByRated(this.props.reports)))

        return this.props.render({ ...this.props, children: children,  filterComponent: filterComponet })
    }
}
