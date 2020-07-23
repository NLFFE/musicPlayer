import React, { Fragment, useState, useEffect } from 'react';
import Hangul from 'hangul-disassemble';
import { get} from 'axios';
import Contents from '../styled/Contents';
import PageTitle from '../styled/PageTitle';
import TitleText from '../styled/TitleText';
import AlbumItem from '../components/AlbumItem';
import styled from 'styled-components';


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


const MyAlbumsTemplate = (props) => {
    const [albums, setAlbums] = useState('');
    const [filterAlbums, setFilterAlbums] = useState('');
    const [serch, setSerch] = useState('');



    useEffect(() => {
        const info = async () => {
            if (!albums && !filterAlbums ) {
                let userId = JSON.parse(localStorage.getItem('userData')).userId;
                const url = `/albums?userId=${userId}`;
                let albumData = (await get(url)).data;

                setAlbums(albumData);
                setFilterAlbums(albumData);
            } else {
                serchFilter(albums);
            }
        }
        info();
    }, [albums, filterAlbums]);

    //초성검색 musics에 {ch:ㄱㄴㄷ, image_url:..} 초성 ch를 추가
    const serchFilter = async (albums) => {
        await albums.forEach((album) => {
            //초성
            let dis = Hangul.disassemble(album.albumName, true);
            let cho = "";
            for (let i = 0, l = dis.length; i < l; i++) {
                if (!dis[i].first) {
                    cho += dis[i];
                } else {
                    cho += dis[i].first
                }
            }
            album.ch = cho;
        });
    }

    const onChange = (e) => {
        setSerch(e.target.value);
    }


    //음악 검색을 했을때 
    const onChagneSerch = (e) => {
        if (e.key === "Enter") {
            if (!serch) {
                setFilterAlbums(albums);
            } else {
                let arr = [];
                albums.forEach(x => {
                    if (x.albumName.indexOf(serch) !== -1 || x.ch.indexOf(serch) !== -1) {
                        arr.push(x);
                    }
                });
                setFilterAlbums(arr);
            }

        }
    }


    return (
        <Fragment>
            <Contents>
                <PageTitle>
                    <TitleText>모든앨범</TitleText>
                </PageTitle> 
                <Input type="text" name="serch" value={serch} placeholder="앨범검색" onChange={onChange} onKeyPress={onChagneSerch} />

                <MusicList>
                    {filterAlbums.length > 0 ?  filterAlbums.map(album => { return (<AlbumItem  key={album.albumId} album={album} />) })	 : <h1>음악이 없습니다.</h1>}
                </MusicList>
            </Contents>
        </Fragment>

    );
}





export default MyAlbumsTemplate;