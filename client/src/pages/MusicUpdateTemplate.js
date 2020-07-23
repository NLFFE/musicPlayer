import React, { useState, useEffect,useCallback } from 'react';
import Axios, { get } from 'axios';
import { useForm } from 'react-hook-form';
import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import InfoGroup from '../styled/InfoGroup';
import HookInput from '../styled/HookInput';
import SubmitBtn from '../styled/SubmitBtn';
import FileHookInput from '../styled/FileHookInput';

const MusicUpdateTemplate = (props) => {
    const [musicData, setMusicData] = useState('');

    
    const getOriginalName = (url) => {
        let sp = url.split("/");
        return sp[sp.length - 1];
    }

    // 음악데이터 가져오기
    const getMusic = useCallback(async (musicId) => {
        const url = `/musics/${musicId}`;
        const formData = new FormData();
        let res = await get(url, formData);

        let getMusicData = res.data[0];
        
        if (!localStorage.getItem('userData')) {
            alert("로그인후 사용가능합니다.");
            props.history.push('/login');
            return;
        }
        console.log(getMusicData);
        if (getMusicData.userId !== (JSON.parse(localStorage.getItem('userData'))).userId) {
            alert("권한이없습니다.");
            props.history.push('/');
            return;
        }

        let data = {
            'musicFileName': getOriginalName(getMusicData.musicUrl),
            'imageName': getOriginalName(getMusicData.imageUrl),
            'musicName': getMusicData.musicName,
            'musicId': musicId,
        }
        setMusicData(data);
    },[props]);

    useEffect(() => {
        let musicId = props.match.params.id;
        getMusic(musicId);
    }, [props, getMusic])


    return (
        <MusicUpdateForm musicData={musicData} props={props} />
    );

}



const MusicUpdateForm = ({ musicData, props }) => {
    const { register, handleSubmit, errors, watch } = useForm({ mode: 'onBlur', validateCriteriaMode: "all" });

    //유효성검사
    const namePattern = {
        pattern: /^[a-zA-Z가-힣]+/g,
        message: '한글 또는 영어만 입력할 수 있습니다 ex:(홍길동)'
    }
    let [isSubmit, setIsSubmit] = useState(false);

    const onSubmit = async (data) => {
        if (isSubmit) {
            return;
        }
        setIsSubmit(true)
        try {
            const url = '/musics';
            const formData = new FormData();
            formData.append('musicId', musicData.musicId);
            formData.append('musicName', data.musicName);
            formData.append('musicFile', data.musicFile[0]);
            formData.append('imageFile', data.imageFile[0]);

            Axios.put(url, formData).then((data) => {
                props.history.push('/');
                alert("정상적으로 수정됬습니다.")
            });

        } catch (err) {
            console.log(err);
            alert("에러");
            props.history.push('/');
        }

    }

    //음악 삭제 
    const deleteMusic = async () => {
        const url = `/musics/${musicData.musicId}`;
        console.log(url);
        await Axios.delete(url);
        props.history.push('/');
        alert("정상적으로 삭제되었습니다.")
    }

    return (
        <Contents>
            <PageTitle>
                <TitleText>음악수정</TitleText>
            </PageTitle>
            <InfoGroup>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FileHookInput label="musicFile"
                        register={register} errors={errors}
                        accept="audio/*"
                        fileName={watch('musicFile') && watch('musicFile')[0] ? watch('musicFile')[0].name : `${musicData.musicFileName}`}
                        type="file" />



                    <FileHookInput label="imageFile"
                        register={register} errors={errors}
                        accept="image/*"
                        fileName={watch('imageFile') && watch('imageFile')[0] ? watch('imageFile')[0].name : `${musicData.imageName}`}
                        type="file" />


                    <HookInput label="musicName"
                        defaultValue={musicData && musicData.musicName}
                        register={register} errors={errors}
                        required='이름을 입력해주세요'
                        pattern={namePattern} />

                    <SubmitBtn>수정하기</SubmitBtn>
                </form>
                <SubmitBtn onClick={deleteMusic}>삭제</SubmitBtn>
            </InfoGroup>
        </Contents>
    );
}


export default MusicUpdateTemplate;