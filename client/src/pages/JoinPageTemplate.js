import React, { useState } from 'react';
import { post, get } from 'axios';
import { useForm } from 'react-hook-form';

import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import HookInput from '../styled/HookInput';
import SubmitBtn from '../styled/SubmitBtn';
import InfoGroup from '../styled/InfoGroup';



const JoinPageTemplate = (props) => {
    const EmailPattern = {
        value : /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        message: '이메일 형식이 아닙니다.'
    }
    const namePattern = {
        value : /^[a-zA-Z가-힣]+$/i,
        message: '이름은 한글 영문만 입력할 수 있습니다.'
    };
    const passwordPattern = {
        value: '/^[a-zA-Z0-9]+$/i',
        message: '영문 숫자만 입력하실 수 있습니다.'
    };
    const { register, handleSubmit, errors, watch } = useForm({ mode: 'onBlur',validateCriteriaMode: "all" });
    let [isSubmit, setIsSubmit] = useState(false);

    const onSubmit  = async(data) =>{
        if(isSubmit){
            return;
        }
        setIsSubmit(true)
        
        try{            
            const url = '/users';
            const formData = new FormData();
            formData.append('userEmail', data.userEmail);
            formData.append('userName', data.userName);
            formData.append('userPassword', data.userPassword);

            let row = await post(url, formData);
            if(row.data){
                alert("회원가입되었습니다.");
                props.history.push('/');   
            }

        }catch(e){ 
            alert("실패");
            console.log(e);
            props.history.push('/user/join');
        }
    }

    return (
        <Contents>
            <PageTitle>
                <TitleText>회원가입</TitleText>
            </PageTitle>
            <InfoGroup> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HookInput label="userEmail" register={register} errors={errors} 
                                required='이메일을 입력해주세요.'
                                pattern = {EmailPattern}
                                validate = {async value => value && ((await (get(`/users/${value}`))).data[0] && '이미사용중인 이메일 입니다')} />

                    <HookInput label="userName" 
                                register={register} errors={errors} 
                                required='이름을 입력해주세요.'
                                pattern = {namePattern}/>

                    <HookInput label="userPassword" 
                                register={register} errors={errors} 
                                required='패스워드를 입력해주세요.'
                                type = "password"
                                pattern = {passwordPattern}/>

                    <HookInput label="passwordCfm" 
                                register={register} errors={errors} 
                                required='패스워드를 입력해주세요.'
                                pattern = {passwordPattern}
                                type = "password"
                                validate = {value => value === watch("userPassword") || '패스워드가 다릅니다' }/>
                    <SubmitBtn>회원가입</SubmitBtn>
                </form>
            </InfoGroup>
        </Contents>
    );
}




export default JoinPageTemplate;