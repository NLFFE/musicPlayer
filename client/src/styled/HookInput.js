import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'react-hook-form';

const TitleText = styled.p`
    margin-bottom:0px;
	position: absolute;
	bottom: 25px;
	font-size: 14px;
    font-weight: 700;
`;

const InputLabel = styled(TitleText)`
    margin-bottom: 13px;
	position: relative;
	bottom: 0px;
	font-size: 14px;
    font-weight: 800;
    width: 80%;
	text-align: left;	
`


const Input = styled.input`
	width: 80%;
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

const InputErrorLabel = styled(InputLabel)`
    margin-bottom: 30px;
    color: #ef3b7d;
    overflow: hidden;
`

const HookInput = ({ type, label, register, errors, required = undefined,validate = undefined, pattern = undefined, defaultValue = undefined}) => ( 
    <>
      <InputLabel>{label}</InputLabel>
      <Input defaultValue={defaultValue} type={type} name={label} ref={register({ required, validate, pattern})}  />
      <ErrorMessage errors={errors} name={label}>
        {({ message }) => <InputErrorLabel>{message}</InputErrorLabel>} 
      </ErrorMessage>
    </>
);


export default HookInput;