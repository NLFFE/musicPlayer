import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
    padding: 50px 50px;
`;



const InfoGroup = ({children}) =>{
    return(
        <Group>{children}</Group>
    )
}


export default InfoGroup;