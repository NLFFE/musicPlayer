import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const StyledA = styled(Link)`
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        float: right;
        cursor: pointer;
        margin-right:${props => props.mr ? '20px' : '0px'};
`


const A = ({children, mr, to}) =>{
    
    return(
        <StyledA mr={mr} to={to}>{children}</StyledA>
    )
}


export default A;