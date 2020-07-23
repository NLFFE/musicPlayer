import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'react-hook-form';
const Input = styled.input`
	width: ${props=> props.w ? '100%' : '80%'};
	height: 40px;
	padding: 10px;
    border:0px;
	border-bottom: 1px solid #e0e0e0;
    margin-bottom:  10px;
    transition: all .3s;
    &:focus{
        outline:none;
        border-bottom: 1px solid black;
    }
`
const InputErrorLabel = styled.p`
    border:0px;
	position: relative;
	font-size: 14px;
    font-weight: 800;
    width: 80%;
	text-align: left;	
    color: #ef3b7d;
`

const StyledInput = ({ type, label, register, errors, required = undefined,validate = undefined, pattern = undefined, defaultValue = undefined,w}) => ( 
    <>
      <Input w defaultValue={defaultValue} type={type} name={label} ref={register({ required, validate, pattern})}  />
      <ErrorMessage errors={errors} name={label}>
        {({ message }) => <InputErrorLabel>{message}</InputErrorLabel>} 
      </ErrorMessage>
    </>
);

export default StyledInput;