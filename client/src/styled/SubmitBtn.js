import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: ${props=> props.w ? '100%' : '80%'};
	display: block;
	padding: 10px;
	border: 0px;
	cursor: pointer;
	outline: 0;
	margin-top:30px;
`


const SubmitBtn = ({children, ...props}) =>{
    return(
        <Button {...props}>{children}</Button>
    )
}


export default SubmitBtn;