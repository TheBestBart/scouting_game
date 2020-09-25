import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from './Select';
import RowWrapper from '../group/RowWrapper';
import Button from './Button';
import Title from './Title';
import BASIC_URL from '../../utils/BASIC_URL';

class Filter extends Component {
    static propTypes = {

    }

    render() {
        return (
            <>
            <Title title={'Filtry'}/>
            <RowWrapper width={'95%'} justifyContent={'space-around'}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%'}}>
                   <Select   
                        title={'Wybierz Drużyne'}
                        options={this.props.categories}
                        handleChange={this.props.handleChange}
                        name={'category'}
                        value={this.props.group}
                        style={{marignBottom: '10px'}}
                    /> 
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%'}}>
                    <Select   
                        title={'Wybierz Raporty'}
                        options={this.props.reportOptions}
                        handleChange={this.props.handleChange}
                        name={'reportOption'}
                        value={this.props.reportOption}
                        style={{marignBottom: '10px'}}
                    />
                </div>
                
            </RowWrapper>
            </>
        )
    }
}


export default Filter