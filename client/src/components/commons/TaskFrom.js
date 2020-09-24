import React, { Component } from 'react'
import PropTypes from 'prop-types';
import USER_URL from '../../utils/USER_URL';
import { getJwt } from '../../helpers.js/index'
import Textarea from './Textarea';
import Select from './Select';
import Title from './Title';
import Button from './Button';
import Input from './Input';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import BASIC_URL from '../../utils/BASIC_URL';
import { throws } from 'assert';

class TaskForm extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            group: '',
            description: '',
            maxRating: 0,
            title: "",
            extended: false,
            categories: []
        }

        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        this.getTaskCategories()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.extended !== this.state.extended && !this.state.extended) {
            this.setState({
                group: ''
            })
        }
    }

    handleChange = e => {
        let { name, value, checked } = e.target

        this.setState({
            [name]: name === 'extended' ? checked : value
        })
    }
    
    addTask = e => {
        e.preventDefault();
   
        let body = { ...this.state, title: this.state.group }
        delete body.categories;

        fetch(USER_URL.POST.addTask, {
            method:  'POST',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'auth-token': `Bearer${getJwt()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...body })
        })
        .then(response => response.json())
        .then(({ success }) => {
            let { type, login } = this.props.user
            if(success) {
                this.props.history.push(`/auth/${type}/${login}/groups`)
            }
        })
        .catch(error => console.log(error))
    } 

    getTaskCategories = () => {

        fetch(BASIC_URL.GET.getTaskCategories, {
            method:  'GEt',
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers : {
              'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(({ success, categories }) => {
            if(success) {
                this.setState({
                    categories: categories
                })
            }
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <form className='textarea box-border' onSubmit={this.addTask}>
                <Title title={'Dodawanie Zadania'}/>
                <p  style={{width: "90%"}} className='inpt-title'>{'Opis Zadania'}</p>

                <Textarea 
                    placeholder={'Opis Zadania...'}
                    value={this.state.description}
                    name={'description'}
                    handleChange={this.handleChange}
                    required={true}
                />


                <label>
                    Czy zadanie jest do sobotniej gry?
                    <input name='extended' onChange={this.handleChange} checked={this.state.extended ? true : false} type="checkbox" />
                </label>

                <Select   
                    title={'Wybierz Kategorie Zadania'}
                    options={this.state.categories}
                    handleChange={this.handleChange}
                    name={'group'}
                    value={this.state.group}
                    style={{marignBottom: '10px'}}
                    disabled={this.state.extended}
                />

                <p  style={{width: "90%"}} className='inpt-title'>{'Kategoria Zadania'}</p>
                <Textarea 
                    placeholder={'Wpisz Kategorie Zadania'}
                    handleChange={this.state.extended ? this.handleChange : undefined}
                    value={this.state.group}
                    required={true}
                    name={'group'}
                    disabled={!this.state.extended}
                />

                <Input 
                    value={this.state.maxRating}
                    type={'number'}
                    name={'maxRating'}
                    handleChange={this.handleChange}
                    title={'Maksymalna liczba punktów'}
                    placeholder={'Liczba punktów...'}
                    divStyle={{width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    inputStyle={{width: '100%'}}
                    titleStyle={{width: '100%'}}
                    required={true}
                />

                <Input 
                    value={this.state.number}
                    type={'text'}
                    name={'number'}
                    handleChange={this.handleChange}
                    title={'Sygnatura zadania...'}
                    placeholder={'Wprowadź sygnature zadania...'}
                    divStyle={{width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    inputStyle={{width: '100%'}}
                    titleStyle={{width: '100%'}}
                    required={true}
                /> 

                <Button text={'Dodaj Zadanie'} type={'submit'} />
            </form>
        )
    }
}


const mapStateToProps = state => ({
    user: state.basicData.user
})

export default connect(mapStateToProps)(withRouter(TaskForm))
