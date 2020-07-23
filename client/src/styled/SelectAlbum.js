import styled from 'styled-components';
import React from 'react';

const AlbumContainer = styled.div`
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:300px;
    height:auto;
    overflow-y:auto;
    border: 1px solid #ccc;
    border-radius:12px;
    z-index: 2;
    background-color:#fff;
`;

const PopupBackground = styled.div`
    z-index: 999;
    background-color:rgba(0,0,0,0.4);
    top:0;
    left:0;
    width:100%;
    height:100vh;
    position: fixed;
    display:${props=> props.hide ? 'block' : 'none'};
`



const SelectAlbum = ({children,hide}) =>{
    
    return(
        <PopupBackground hide = {hide}><AlbumContainer>{children}</AlbumContainer></PopupBackground>
    )
}



export default SelectAlbum;