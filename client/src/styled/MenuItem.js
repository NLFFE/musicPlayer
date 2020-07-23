import React from 'react';
import styled from 'styled-components';



const Item = styled.div`
    width:100%;
    height:40px;
    border-bottom:1px solid #ddd;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
    font-weight:bold;
    cursor: pointer;
    padding:10px;
`


const MenuItem = ({children, onClick}) =>{
    return(
        <Item onClick={onClick}>{children}</Item>
    )
}


export default MenuItem;