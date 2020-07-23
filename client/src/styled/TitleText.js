import React from 'react';
import styled from 'styled-components';



const TitleText = styled.p`
    margin-bottom:0px;
	position: absolute;
	bottom: 25px;
	font-size: 14px;
    font-weight: 700;
`;



const Contents = ({children}) =>{
    return(
        <TitleText>{children}</TitleText>
    )
}


export default Contents;