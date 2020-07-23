import React, { useState } from 'react';
import { post } from 'axios';
import { useForm} from 'react-hook-form';
import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import InfoGroup from '../styled/InfoGroup';
import SubmitBtn from '../styled/SubmitBtn';
import HookInput from '../styled/HookInput';

const LoginPageTemplate = (props) => {
    const { register, handleSubmit, errors} = useForm({mode: 'onBlur',validateCriteriaMode: 'all'});
    let [isSubmit, setIsSubmit] = useState(false);
    
    const onSubmit = async(data) => {
        if(isSubmit){
            return;
        }
        setIsSubmit(true);
        try{
            let {userEmail, userPassword} = data;
            let url = '/users/login';
            let formData = new FormData();
            formData.append('userEmail', userEmail);
            formData.append('userPassword', userPassword);
            
            let res = await post(url, formData);
            if(!res.data){
                alert('아이디 또는 비밀번호가 다릅니다.')
                props.history.push('/login');
                setIsSubmit(false);
                return;
            }
            window.localStorage.setItem('userData', JSON.stringify(res.data));
            alert('로그인 되었습니다.')
            props.history.push('/');
        }catch(e){
            alert("실패");
            console.log(e);
            props.history.push('/login');
        }   
    }

    return (
        <Contents>
             <PageTitle>
                <TitleText>로그인</TitleText>
            </PageTitle>
            <InfoGroup>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <HookInput label="userEmail" register={register} errors={errors} required='이메일을 입력해주세요.'/>
                    <HookInput label="userPassword" register={register} errors={errors} required='비밀번호를 입력해주세요.' type="password"/>
                    <SubmitBtn>로그인</SubmitBtn>
                </form>
            </InfoGroup>
        </Contents>
    );
}



export default LoginPageTemplate;