import React from 'react'
import RowWrapper from './RowWrapper';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const Row = ({ elements = [] }) => {
   
    return (
        <RowWrapper justifyContent={'flex-start'}>
            { elements }
        </RowWrapper>
    );
}

const mapStateToProps = state => ({
    user: state.basicData.user
})
 
export default connect(mapStateToProps)(withRouter(Row));