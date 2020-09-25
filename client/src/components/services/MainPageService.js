import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BASIC_URL from '../../utils/BASIC_URL';
import { connect } from 'react-redux'
import basicAction from './../../redux/basic/duck/actions'

// let defaultCharData = {
//     labels: [],
//     datasets:[
//         {
//             label:'Wynik z gry',
//             data:[],
//             backgroundColor:['lightgray', 'lightorange', 'purple','lightyellow','lightblue','lightskygreen','lightskyblue','lightgreen','lightpink','lemon', 'brown', 'blue', '#eaeaea', '#12d111']
//         }
//     ]
// };


const backgroundColor = ['lightgray', 'lightorange', 'purple','lightyellow','lightblue','lightskygreen','lightskyblue','lightgreen','lightpink','lemon', 'brown', 'blue', '#eaeaea', '#12d111']

class MainPageService extends Component {
    
    static propTypes = {
        render: PropTypes.func.isRequired,
        resultsFlag: PropTypes.bool,
        setResultsFlag: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            points: [],
            labels: [],
            totalPoints: [],
            extended: false,

        }
    }

    componentDidMount() {
        this.uploadResults();
        this.intervalID = setInterval(this.uploadResults, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    uploadResults = () => {
        fetch(BASIC_URL.GET.getResults, {
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
            if(data.success) {
                this.setDataToChart(data.groups);
            } else {
                return this.props.setResultsFlag(data.success)
            }  

            this.setChartData(data.groups)
        })
        .catch(error => {
            console.log('ERROR', error);
        })   
    }

    createDataSets = (label = '', data = [], backgroundColor = []) => {
        return [{
            label: label,
            data: [...data],
            backgroundColor: [...backgroundColor] 
        }]
    }

    createDataChart = (labels, datasets) => {
        return {
            labels,
            datasets
        }
    }

    setDataToChart = groups => {

        let labels = [];
        let points = [];
        let totalPoints = [];

        groups.map(group => {
            labels.push(group.groupName);
            points.push(group.points);
            totalPoints.push(group.extendedPoints)
        })

        this.setState({
            labels,
            points,
            totalPoints
        })
    }

    setExtended = value => {
        this.setState({
            extended: value
        })
    }

    render() {
        let { extended, points, totalPoints, labels } = this.state; 
        let label = extended ? 'Ogólny Wynik' : 'Wynik z gry';
        let datasets = this.createDataSets(label, extended ? totalPoints : points, backgroundColor);
        return this.props.render({ data: this.createDataChart(labels, datasets), setExtended: this.setExtended, resultsFlag: this.props.resultsFlag })
    }
}

const mapStateToProps = state => ({
    resultsFlag: state.basicData.resultsFlag
})

const mapDispatchToProps = dispatch => ({ 
    setResultsFlag: isShown => dispatch(basicAction.setResultsFlag(isShown)) 
})


export default connect(mapStateToProps, mapDispatchToProps)(MainPageService)
