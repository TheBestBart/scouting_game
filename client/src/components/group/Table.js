import React from 'react'
import Header from "./Header";
import Wrapper from '../commons/Wrapper';
import Title from '../commons/Title';
import { withRouter } from 'react-router-dom'

const Table = ({ match, children = [], headerTexts = [], error = false, filterComponent = undefined, groupTitle }) => {
    
    return (
        <>
        { filterComponent && filterComponent }
        {groupTitle && <Title title={`raporty drużyny: ${match.params.groupLogin}`}/>}
        <Wrapper>
            <div className='table-container'>
                <Header texts={headerTexts}/>
                {children}
            </div>
        </Wrapper>
        </>
    )
}
 
export default withRouter(Table);