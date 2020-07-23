import React, { useState } from 'react';
import {post} from 'axios';
import { useForm } from 'react-hook-form';
import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import InfoGroup from '../styled/InfoGroup';
import SubmitBtn from '../styled/SubmitBtn';
import HookInput from '../styled/HookInput';
import FileHookInput from '../styled/FileHookInput';
  
const MusicAddTemplate  = (props) => {
    const { register, handleSubmit, errors, watch } = useForm({validateCriteriaMode: "all" });

    //유효성검사 
    const namePattern ={
        pattern:/^[a-zA-Z가-힣]+/g,
        message:'한글 또는 영어만 입력할 수 있습니다 ex:(홍길동)'
    } 
    let [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = async(data, e) =>{
        if(isSubmit){
            return;
        }
        setIsSubmit(true)
        
        if(!JSON.parse(localStorage.getItem('userData'))){
            alert("로그인후 사용가능합니다.");
            props.history.push('/login');
            return;
        }

        let [musicFile] = data.musicFile;
        let [imageFile] = data.imageFile;
        let musicName = data.musicName;

        
        //s3 파일 업로드, 뮤직데이터 데이터베이스에 저장
        try{
            const url = '/musics';
            const formData = new FormData();
            formData.append('userId', JSON.parse(localStorage.getItem('userData')).userId);
            formData.append('musicName', musicName);
            formData.append('musicFile', musicFile);
            formData.append('imageFile', imageFile);
            
            const fileConfig = {
                headers:{
                    'content-type':'multipart/form-data'
                }
            }

            await post(url, formData, fileConfig);
            props.history.push('/');
            alert("정상적으로 업로드됬습니다.");
            
        }catch (e){
            alert("실패");
            console.log(e);
            props.history.push('/music/add');
        }
        
    }

    return (
        <Contents>
            <PageTitle>
                <TitleText>음악추가</TitleText>
            </PageTitle>
            <InfoGroup> 
                <form className="filebox" onSubmit={handleSubmit(onSubmit)}>
                    <FileHookInput  label="musicFile" 
                                register={register} errors={errors} 
                                required='음악을 추가해주세요'
                                accept="audio/*"
                                fileName={watch('musicFile') && watch('musicFile')[0] && watch('musicFile')[0].name}
                                type = "file"/>
                    
                
                    <FileHookInput  label="imageFile" 
                                register={register} errors={errors} 
                                required='이미지을 추가해주세요'
                                accept="image/*"
                                fileName={watch('imageFile') && watch('imageFile')[0] && watch('imageFile')[0].name}
                                type = "file"/>
                    
                    <HookInput label="musicName" 
                                register={register} errors={errors} 
                                required='이름을 입력해주세요'
                                pattern = {namePattern}/>
                    
                    <SubmitBtn>추가하기</SubmitBtn>
                </form>
            </InfoGroup>
        </Contents>
    );
}


export default MusicAddTemplate;