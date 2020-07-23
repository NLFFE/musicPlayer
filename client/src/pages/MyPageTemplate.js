import React, { Fragment, useState, useEffect } from 'react';
import MusicItem from '../components/MusicItem';
import Hangul from 'hangul-disassemble';
import Footer from '../components/Footer';
import { get,post } from 'axios';
import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import ContextMenu from '../styled/ContextMenu';
import styled from 'styled-components';
import MenuItem from '../styled/MenuItem';
import SelectAlbum from '../styled/SelectAlbum';
import StyledInput from '../styled/StyledInput';
import Popup from '../styled/Popup';
import SubmitBtn from '../styled/SubmitBtn';
import { useForm} from 'react-hook-form';


const Input = styled.input`
    width: 100%;
	border: 0px;
	background-color: #f5f5f5;
	padding: 14px 50px;
	border-bottom: 1px solid #e0e0e0;
`

const MusicList = styled.div`
    width: 80%;
	position: relative;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 50px;
	padding: 40px 100px;
`


const MyPageTemplate = (props) => {
    const { register, handleSubmit, errors,reset } = useForm({mode: 'onBlur',validateCriteriaMode: 'all'});
    const [musics, setMusics] = useState('');
    const [filterMusics, setFilterMusics] = useState('');
    const [serch, setSerch] = useState('');
    const [selectMusic, setSelectMusic] = useState(null);

    const [location, setLocation] = useState(0);

    const [isContextMenu, setIsContextMenu] = useState(false);
    const [isSelectAlbum, setIsSelectAlbum] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [AlbumItem, setAlbumItem] = useState(null);

    useEffect(()=>{
        document.getElementsByTagName("html")[0].addEventListener("click", function(){
            setIsContextMenu(false);
        });
    },[]);

    useEffect(() => {
        const info = async () => {
            if (!musics && !filterMusics) {
                let userId = JSON.parse(localStorage.getItem('userData')).userId;
                let url = `/musics?userId=${userId}`;
                let musicData = (await get(url)).data;
                setMusics(musicData);
                setFilterMusics(musicData);
            } else {
                serchFilter(musics);
            }
        }
        info();
    }, [musics, filterMusics]);

    // 초성검색 musics에 {ch:ㄱㄴㄷ, image_url:..} 초성 ch를 추가
    const serchFilter = async (musics) => {
        await musics.forEach((music) => {
            //초성
            console.log(music);
            let dis = Hangul.disassemble(music.musicName, true);
            let cho = "";
            for (let i = 0, l = dis.length; i < l; i++) {
                if (!dis[i].first) {
                    cho += dis[i];
                } else {
                    cho += dis[i].first
                }
            }
            music.ch = cho;
        });
    }

    const onChange = (e) => {
        setSerch(e.target.value);
    }


    //음악 검색을 했을때 
    const onChagneSerch = (e) => {
        if (e.key === "Enter") {
            if (!serch) {
                setFilterMusics(musics);
            } else {
                let arr = [];
                musics.forEach(x => {
                    if (x.musicName.indexOf(serch) !== -1 || x.ch.indexOf(serch) !== -1) {
                        arr.push(x);
                    }
                });
                setFilterMusics(arr);
            }

        }
    }

    //음악을 클릭했을때 음악 실행
    const DoubleClickmusic = (selectMusic) => {
        setSelectMusic(selectMusic);
    }

    const handleContextMenu = (location) => {
        setLocation(location);
        setIsContextMenu(true);
    }

    const addAlbum = async() => {
        let userId = JSON.parse(localStorage.getItem('userData')).userId;
        let musicData = (await get(`/albums?userId=${userId}`)).data;
        setAlbumItem(musicData);
        setIsSelectAlbum(true);
    }

    const onSubmit = async(data) =>{
        let url = '/albums';
        let formData = new FormData();

        let userId = JSON.parse(localStorage.getItem('userData')).userId;
        let albumName = data.albumName;


        formData.append('userId', userId);
        formData.append('albumName', albumName);
        await post(url, formData);
        alert("앨범을 추가했습니다.");
        setIsSelectAlbum(false);
        setIsPopup(false);
        reset();
    }

    const addMusic = async(albumId) =>{
        let url = '/albumMusics';
        let formData = new FormData();
        let musicId = location.music.musicId;
        formData.append('musicId', musicId);
        formData.append('albumId', albumId);
        let res = await post(url, formData);
        alert("음악을 추가했습니다.");
        setIsSelectAlbum(false);
    }


    return (
        <Fragment>
            <Contents>
                <PageTitle>
                    <TitleText>모든음악</TitleText>
                </PageTitle> 
                <Input type="text" name="serch" value={serch} placeholder="음악검색" onChange={onChange} onKeyPress={onChagneSerch} />

                <ContextMenu location={location} hide = {isContextMenu}>
                    <MenuItem onClick={addAlbum}>앨범에 넣기</MenuItem>
                </ContextMenu>

                <SelectAlbum hide={isSelectAlbum}>
                    {AlbumItem && AlbumItem.map(item => { return (<MenuItem onClick={()=> addMusic(item.albumId)} key={item.albumId}>{item.albumName}</MenuItem>) })}
                    <MenuItem onClick ={()=> setIsPopup(true)}>앨범추가</MenuItem>
                    <MenuItem onClick ={()=> setIsSelectAlbum(false)}>취소</MenuItem>
                </SelectAlbum>

                <Popup hide={isPopup}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StyledInput w label="albumName" register={register} errors={errors} required='앨범 이름 입력해주세요.'/>
                        <SubmitBtn w>확인</SubmitBtn>
                    </form>
                    <SubmitBtn w onClick={()=> {setIsSelectAlbum(false);setIsPopup(false)}}>취소</SubmitBtn>
                </Popup>

                <MusicList>
                    {filterMusics.length > 0 ? filterMusics.map(music => { return (<MusicItem onContextMenu={handleContextMenu} onDoubleClick={DoubleClickmusic} key={music.musicId} music={music} />) }) : <h1>음악이 없습니다.</h1>}
                </MusicList>
            </Contents>
            {selectMusic && <Footer props={props} selectMusic={selectMusic} />}
        </Fragment>

    );
}





export default MyPageTemplate;