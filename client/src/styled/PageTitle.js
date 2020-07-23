import React from 'react';
import styled from 'styled-components';

const PageTitle = styled.div`
    height: 70px;
	border-bottom: 1px solid #e0e0e0;
	padding: 0px 50px;
	position: relative;
`;



const Contents = ({children}) =>{
    return(
        <PageTitle>{children}</PageTitle>
    )
}


export default Contents;