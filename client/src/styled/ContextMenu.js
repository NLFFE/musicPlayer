import React from 'react';
import styled from 'styled-components';



const Menu = styled.div`
    border:1px solid #ccc;
    width:100px;
    height:auto;
    background-color:#fff;
    position: absolute;
    z-index: 2;
    border-radius:10px;
    top:${props=> props.y}px;
    left:${props=> props.x}px;
    display:${props=> props.hide ? 'block' : 'none'};
`


const ContextMenu = ({children, location,hide}) =>{
    return(
        <Menu x={location.x} y={location.y} hide={hide}>{children}</Menu>
    )
}


export default ContextMenu;