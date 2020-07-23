import React from 'react';
import styled from 'styled-components';



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

const PopupContent = styled.div`
    width:400px;
    height:300px;
    background-color:#fff;
    padding:40px 30px 64px 40px;
    position: fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
`

const H1 = styled.h2`
    color: #333;
    font-size: 18px;
    line-height: 24px;
    margin: 0 0 12px;
`


const Popup = ({children, ...props}) =>{
    return(
        <PopupBackground {...props}>
            <PopupContent>
                <H1>Add Album</H1>
                {children}
            </PopupContent>
        </PopupBackground>
    )
}


export default Popup;