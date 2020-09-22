import React from 'react'
import Header from "./Header";
import Wrapper from '../commons/Wrapper';

const Table = ({ children = [], headerTexts = [], error = false }) => {

    return (
        <Wrapper>
            <div className='table-container'>
                <Header texts={headerTexts}/>
                {children}
            </div>
        </Wrapper>
    )
}
 
export default Table;