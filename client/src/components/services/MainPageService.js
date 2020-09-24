import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BASIC_URL from '../../utils/BASIC_URL';
import { connect } from 'react-redux'
import basicAction from './../../redux/basic/duck/actions'

let defaultCharData = {
    labels: [],
    datasets:[
        {
            label:'Wynik z gry',
            data:[],
            backgroundColor:['lightgray', 'lightorange', 'purple','lightyellow','lightblue','lightskygreen','lightskyblue','lightgreen','lightpink','lemon', 'brown', 'blue', '#eaeaea', '#12d111']
        }
    ]
};

class MainPageService extends Component {
    
    static propTypes = {
        render: PropTypes.func.isRequired,
        resultsFlag: PropTypes.bool,
        setResultsFlag: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            chartData: defaultCharData,
            extended: false
        }

        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        this.uploadResults();
        this.intervalID = setInterval(this.uploadResults, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    timer = () => {
        console.log('wyswietlam sie co 5 sekund');
    }

    uploadResults = () => {
        fetch(BASIC_URL.POST.getResults, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ extended: this.state.extended })
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                this.props.setResultsFlag(data.success)
            } else {
                return this.props.setResultsFlag(data.success)
            }  

            this.setChartData(data.groups)
        })
        .catch(error => {
            console.log('ERROR', error);
        })   
    }

    setChartData = groups => {

        let labels = [];
        let points = [];
        groups.map(group => {
            labels.push(group.groupName);
            points.push(group.points);
        })
        
        this.setState({
            chartData: {
                ...this.state.chartData,
                labels: [...labels],
                datasets: [
                    {
                        label: this.state.extended ? 'Ogólny Wynik' : 'Wynik z Gry',
                        data: points,
                        backgroundColor: this.state.chartData.datasets[0].backgroundColor
                    }
                ]
            }
        })
    }

    setExtended = e => {
        this.setState({
            buttonActive: e.target.name.toString()
        })
    }

    render() {
        return this.props.render({ data: this.state.chartData, setExtended: this.setExtended, resultsFlag: this.props.resultsFlag })
    }
}

const mapStateToProps = state => ({
    resultsFlag: state.basicData.resultsFlag
})

const mapDispatchToProps = dispatch => ({ 
    setResultsFlag: isShown => dispatch(basicAction.setResultsFlag(isShown)) 
})


export default connect(mapStateToProps, mapDispatchToProps)(MainPageService)
