import React from 'react';
import styled from 'styled-components';

const MainContents = styled.div`
    height: auto;
    margin-left: 200px;
    margin-top: 75px;
`;


const Contents = ({children}) =>{
    return(
        <MainContents>
            {children}
        </MainContents>

    )
}


export default Contents;