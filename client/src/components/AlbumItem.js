import React from 'react';
import styled from 'styled-components';
import defautImage from '../image/default.jpg';


const Card = styled.div`
    display: block;
	width: 100%;
	height: 100%;
	border: 1px solid #e0e0e0;
	position: relative;
`

const Gradient = styled.div`
    position: absolute;
	width: 100%;
	bottom: 0;
	height: 100px;
	background-color: #fff;
	overflow: hidden;
	padding: 10px;
`

const Musictitle = styled.p`
    font-weight: 700;
	font-size: 13px;
`

const MusicMusicUpdate = styled.button`
    cursor: pointer;

    font-size: 14px;
	border: 1px solid #e0e0e0;
	border-radius: 5px;
	display: inline-block;
	margin-top: 15px;
	font-weight: 600;
	padding: 10px;
	font-size: 12px;
`

const MusicImage = styled.img`
    width: 100%;
    height: 252px;
    cursor: pointer;
    background-position: center center;
    background-image : url(${props => props.image_url ? props.image_url : defautImage});
`

const Item = styled.div`
    height: 352px;
	min-width: 255px;
    &:hover ${MusicImage}{
        opacity:0.5;
    }
`

const clickAlbum = () =>{
    console.log("ㅎㅇ");
}

const AlbumItem = (props) => {
    const { album } = props;
    return (
        <Item>
            <Card>
                <MusicImage {...album.image_url} onClick={clickAlbum}></MusicImage>
                <Gradient>
                    <Musictitle>{album.albumName}</Musictitle>
                    <MusicMusicUpdate>삭제</MusicMusicUpdate>
                </Gradient>
            </Card>
        </Item>
    );
}






export default AlbumItem;