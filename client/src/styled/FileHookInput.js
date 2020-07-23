import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'react-hook-form';



const Input = styled.input`
    display: none;
`

const InputErrorLabel = styled.p`
    width: 80%;
    text-align: left;	
    margin-bottom: 30px;
    color: #ef3b7d;
    float: left;
    position: relative;
	bottom: 0px;
	font-size: 14px;
    font-weight: 800;
`

const FileLabel = styled.label`
    display: inline-block;
 	 padding: .5em .75em;
 	 font-size: inherit;
 	 cursor: pointer;
 	 border: 1px solid #ebebeb; 
 	 border-bottom-color: #e2e2e2; 
    border-radius: .25em;
    float: left;
`

const FileInput = styled.span`
    float:left;
    width: 80%;
    height: auto;
    display: block;
    height:38px;
    border:0px;
    border: 1px solid #ebebeb;
    transition: all .3s;
    padding: 10px;
    font-size: 12px;
`

const Div = styled.div`
    width: 1330px;
    height: 100px;
`

const FileHookInput = ({ type, label, register, errors, required = undefined, defaultValue = undefined, accept = undefined, fileName = undefined }) => (
    <>
        <Div>
            <FileLabel htmlFor={label}>{label}</FileLabel>
            <FileInput>{fileName}</FileInput>
            <Input defaultValue={defaultValue} type={type} accept={accept} id={label} name={label} ref={register({ required })} />

            <ErrorMessage errors={errors} name={label}>
                {({ message }) => <InputErrorLabel>{message}</InputErrorLabel>}
            </ErrorMessage>
        </Div>
        
        
    </>
);


export default FileHookInput;