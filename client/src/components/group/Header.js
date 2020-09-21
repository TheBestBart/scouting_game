import React from 'react'
import Cell from './Cell';
import RowWrapper from './RowWrapper';

const Header = ({ texts }) => {

    return (  
        <RowWrapper backgroundColor={'lightgray'}>
            {
                texts.map(text => <Cell key={text} components={[text]}/>)
            }
        </RowWrapper>
    );
}
 
export default Header;