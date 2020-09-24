import React from 'react'
import Header from "./Header";
import Wrapper from '../commons/Wrapper';

const Table = ({ children = [], headerTexts = [], error = false, filterComponent = undefined }) => {
    
    return (
        <>
        { filterComponent && filterComponent }
        <Wrapper>
            <div className='table-container'>
                <Header texts={headerTexts}/>
                {children}
            </div>
        </Wrapper>
        </>
    )
}
 
export default Table;